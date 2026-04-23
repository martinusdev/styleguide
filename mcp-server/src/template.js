/*
 * Tiny template + parameter-validation helpers used by the `get_component`
 * MCP tool. Extracted so the logic can be unit-tested without spinning up
 * the full StyleguideServer.
 */

export function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export function isTruthy(value) {
  return value !== undefined && value !== null && value !== false && value !== '';
}

/**
 * Tiny Mustache-subset template engine.
 * Supports: {{var}} (escaped), {{{var}}} (raw), {{#var}}…{{/var}} (if truthy),
 * {{^var}}…{{/var}} (if falsy). No nested blocks with the same key.
 */
export function renderTemplate(tpl, data) {
  let out = tpl;

  const blockRe = /\{\{([#^])(\w+)\}\}([\s\S]*?)\{\{\/\2\}\}/g;
  let prev;
  do {
    prev = out;
    out = out.replace(blockRe, (_, op, key, body) => {
      const truthy = isTruthy(data[key]);
      const keep = op === '#' ? truthy : !truthy;
      return keep ? body : '';
    });
  } while (out !== prev);

  out = out.replace(/\{\{\{(\w+)\}\}\}/g, (_, key) => {
    const v = data[key];
    return v == null ? '' : String(v);
  });
  out = out.replace(/\{\{(\w+)\}\}/g, (_, key) => {
    const v = data[key];
    return v == null ? '' : escapeHtml(v);
  });

  return out;
}

export function validateParams(component, name, args) {
  const schema = component.params || {};
  const normalized = {};
  const unknownKeys = Object.keys(args).filter(
    (k) => !Object.prototype.hasOwnProperty.call(schema, k)
  );
  if (unknownKeys.length) {
    throw new Error(
      `Unknown parameter(s) for component "${name}": ${unknownKeys.join(', ')}. `
      + `Allowed: ${Object.keys(schema).join(', ') || '(none)'}`
    );
  }
  for (const [key, spec] of Object.entries(schema)) {
    const provided = Object.prototype.hasOwnProperty.call(args, key);
    let value = provided ? args[key] : spec.default;

    if (!provided && spec.required) {
      throw new Error(`Missing required parameter "${key}" for component "${name}".`);
    }
    if (value === undefined || value === null) {
      normalized[key] = spec.type === 'boolean' ? false : '';
      continue;
    }
    if (spec.type === 'enum') {
      // JSON-RPC preserves JS types (a schema value `'6'` and a caller arg `6`
      // are distinct), so compare loosely — stringify both sides — to accept
      // either. The normalized value is stored as the exact match from the
      // schema list, preserving the original type for consumers.
      const stringValue = String(value);
      const matched = (spec.values || []).find((v) => String(v) === stringValue);
      if (matched === undefined) {
        throw new Error(
          `Invalid value "${value}" for "${key}". Allowed: ${(spec.values || []).join(', ')}.`
        );
      }
      value = matched;
    }
    if (spec.type === 'boolean') {
      value = value === true || value === 'true';
    }
    if (spec.type === 'string' && typeof value !== 'string') {
      value = String(value);
    }
    normalized[key] = value;
  }
  return normalized;
}

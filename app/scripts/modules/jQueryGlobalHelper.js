/**
 * jQuery Global Helper
 * 
 * This module exports jQuery to the global scope for legacy compatibility.
 * Consider migrating away from jQuery when possible for better performance.
 */
import jQuery from 'jquery';

// Export jQuery to global scope for legacy compatibility
// This is not recommended for new code, but maintained for backward compatibility
Object.defineProperties(window, {
  $: { value: jQuery, writable: true, configurable: true },
  jQuery: { value: jQuery, writable: true, configurable: true }
});

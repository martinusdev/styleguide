# Martinus Styleguide MCP Server
# Provides tools to query styleguide components, classes, and assets

FROM node:20-alpine

# Security: Use non-root user
RUN addgroup -g 1001 -S nodejs && adduser -S nodejs -u 1001

WORKDIR /mcp-server

# Copy package files
COPY package.json ./

# Install dependencies
RUN yarn install --frozen-lockfile --prefer-offline

# Copy MCP server source
COPY src/ ./src/

# Change ownership
RUN chown -R nodejs:nodejs /mcp-server

# Switch to non-root user
USER nodejs

# The MCP server runs on stdio, so no ports to expose

# Default command
CMD ["yarn", "start"]

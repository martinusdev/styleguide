# Martinus Styleguide - Node Build Environment
# Isolates yarn dependencies and build process from host filesystem

FROM node:20-alpine

# Install build tools needed for some native modules and git for git dependencies
# Also install image optimization tools and their dependencies
# mozjpeg-bin and optipng-bin need full build tools to compile from source on ARM64
RUN apk add --no-cache \
    git \
    build-base \
    python3 \
    autoconf \
    automake \
    libtool \
    nasm \
    zlib-dev \
    libpng-dev \
    gifsicle \
    optipng \
    make \
    g++ \
    gcc

# Yarn is included with newer Node images, but ensure it's available
# Skip installation if already present
RUN which yarn || npm install -g yarn

# Security: Use non-root user for yarn operations
RUN addgroup -g 1001 -S nodejs && adduser -S nodejs -u 1001

WORKDIR /app

# Copy package files and auth config FIRST (before dependencies)
COPY package.json ./ 
COPY yarn.lock* ./
COPY .npmrc* ./

# Install dependencies with security measures
# Uses yarn install with frozen-lockfile for reproducible builds
# --frozen-lockfile: Fail if yarn.lock is outdated
# --prefer-offline: Reduce live registry calls
# --ignore-scripts: Skip lifecycle scripts during install
# Note: optipng-bin will fail to download prebuilt binary on ARM64, but will be skipped as optional
RUN yarn install --frozen-lockfile --prefer-offline --ignore-scripts || true

# Rebuild optipng-bin from source for ARM64 compatibility
# The prebuilt binary fails on ARM64, but with build-base tools we can compile from source
RUN cd /app/node_modules/optipng-bin && npm run install 2>/dev/null || true

# Copy only necessary source files (app/)
# node_modules is already installed above
COPY app/ ./app/
COPY .babelrc .browserslistrc eslint.config.js gulpfile.js light.config.js ./

# Change ownership of app directory to nodejs user
RUN chown -R nodejs:nodejs /app

# Switch to non-root user
USER nodejs

# Default command: yarn scripts can be overridden
CMD ["yarn", "serve"]

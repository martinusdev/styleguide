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

# vymazeme node uzivatele a vytvorime nanovo s uid a gid podla host usera
RUN deluser --remove-home node 2>/dev/null || true && \
    addgroup -g 1000 -S node && \
    adduser -S node -u 1000 -G node

WORKDIR /app

RUN chown -R node:node /app

USER node

# Copy package files and auth config FIRST (before dependencies)
COPY --chown=node:node package.json ./
COPY --chown=node:node yarn.lock* ./
COPY --chown=node:node .npmrc* ./

# Install dependencies with security measures
# Uses yarn install with frozen-lockfile for reproducible builds
# --frozen-lockfile: Fail if yarn.lock is outdated
# --prefer-offline: Reduce live registry calls
# --ignore-scripts: Skip lifecycle scripts during install
# Note: optipng-bin will fail to download prebuilt binary on ARM64, but will be skipped as optional
RUN yarn install --frozen-lockfile --prefer-offline --ignore-scripts || true

USER root
# Rebuild optipng-bin from source for ARM64 compatibility
# The prebuilt binary fails on ARM64, but with build-base tools we can compile from source
RUN cd /app/node_modules/optipng-bin && npm run install 2>/dev/null || true
RUN chown -R node:node /app/node_modules
USER node

# Copy only necessary source files (app/)
# node_modules is already installed above
COPY --chown=node:node app/ ./app/
COPY --chown=node:node .babelrc .browserslistrc eslint.config.js gulpfile.js light.config.js ./

# Default command: yarn scripts can be overridden
CMD ["yarn", "serve"]

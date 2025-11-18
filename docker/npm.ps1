# Martinus Styleguide - Docker Yarn Helper
# Convenient wrapper for running yarn commands in Docker

# Get the directory of this script
$SCRIPT_DIR = Split-Path -Parent $MyInvocation.MyCommand.Path

# If this script is in the docker/ subdirectory, parent is styleguide root
# If called via symlink from root, we need to resolve to actual script location
if ($SCRIPT_DIR -like "*\docker") {
    $STYLEGUIDE_ROOT = Split-Path -Parent $SCRIPT_DIR
} else {
    # Script is being run from root as symlink, find docker directory
    $STYLEGUIDE_ROOT = $SCRIPT_DIR
}

# Check if Docker is running
try {
    docker info | Out-Null
} catch {
    Write-Host "Error: Docker is not running" -ForegroundColor Red
    exit 1
}

# Check if docker-compose.yml exists
if (-not (Test-Path "$STYLEGUIDE_ROOT\docker\docker-compose.yml")) {
    Write-Host "Error: docker-compose.yml not found in $STYLEGUIDE_ROOT\docker\" -ForegroundColor Red
    exit 1
}

# Show usage
function Show-Usage {
    Write-Host "Martinus Styleguide - Docker Yarn Helper" -ForegroundColor Green
    Write-Host ""
    Write-Host "Usage: .\npm.ps1 [command] [args...]"
    Write-Host ""
    Write-Host "Common commands:"
    Write-Host "    .\npm.ps1 build              # yarn build (production)"
    Write-Host "    .\npm.ps1 serve              # yarn serve (development server)"
    Write-Host "    .\npm.ps1 install            # yarn install"
    Write-Host "    .\npm.ps1 images             # yarn images"
    Write-Host "    .\npm.ps1 clear-cache        # yarn clear-cache"
    Write-Host "    .\npm.ps1 prepare            # yarn prepare"
    Write-Host "    .\npm.ps1 lint               # yarn lint-staged"
    Write-Host "    .\npm.ps1 shell              # Interactive shell in container"
    Write-Host "    .\npm.ps1 <any-yarn-cmd>     # Any yarn command"
    Write-Host ""
    Write-Host "Examples:"
    Write-Host "    .\npm.ps1 build"
    Write-Host "    .\npm.ps1 add lodash"
    Write-Host "    .\npm.ps1 upgrade"
    Write-Host "    .\npm.ps1 outdated"
    Write-Host ""
    Write-Host "For more help, see docker/README.md"
}

# Main logic
$command = $args[0]
switch ($command) {
    { $_ -in @("help", "-h", "--help", $null) } {
        Show-Usage
    }
    "shell" {
        Write-Host "Starting interactive shell in container..." -ForegroundColor Yellow
        Set-Location $STYLEGUIDE_ROOT
        docker-compose -f docker/docker-compose.yml run --rm styleguide /bin/sh
    }
    "serve" {
        Write-Host "Starting development server..." -ForegroundColor Yellow
        Set-Location $STYLEGUIDE_ROOT
        docker-compose -f docker/docker-compose.yml up styleguide
    }
    { $_ -in @("build", "install", "images", "clear-cache", "prepare", "lint") } {
        Write-Host "Running: yarn $command" -ForegroundColor Yellow
        Set-Location $STYLEGUIDE_ROOT
        docker-compose -f docker/docker-compose.yml run --rm styleguide yarn $command
    }
    default {
        # Pass through any yarn command
        Write-Host "Running: yarn $($args -join ' ')" -ForegroundColor Yellow
        Set-Location $STYLEGUIDE_ROOT
        docker-compose -f docker/docker-compose.yml run --rm styleguide yarn @args
    }
}

# Development server wrapper
# Starts BrowserSync server inside Docker container
# Server will be accessible at http://localhost:3000

# Resolve the actual script location (handles symlinks)
$SCRIPT_PATH = $MyInvocation.MyCommand.Path
while ((Get-Item $SCRIPT_PATH).LinkType -eq "SymbolicLink") {
    $SCRIPT_DIR = Split-Path -Parent $SCRIPT_PATH
    $SCRIPT_PATH = (Get-Item $SCRIPT_PATH).Target
    if (-not [System.IO.Path]::IsPathRooted($SCRIPT_PATH)) {
        $SCRIPT_PATH = Join-Path $SCRIPT_DIR $SCRIPT_PATH
    }
}
$SCRIPT_DIR = Split-Path -Parent $SCRIPT_PATH
$STYLEGUIDE_ROOT = Split-Path -Parent $SCRIPT_DIR

Write-Host "Starting development server in Docker..."
Write-Host ""
Write-Host "Server will be available at: http://localhost:3000" -ForegroundColor Green
Write-Host "   (Browser will not auto-open - visit URL manually)"
Write-Host ""
Write-Host "Note: Changes are compiled in the container." -ForegroundColor Yellow
Write-Host "   To persist dist/ to host, run ./docker/build.ps1 after stopping the server."
Write-Host ""
Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Red
Write-Host ""

Set-Location $STYLEGUIDE_ROOT

# Run serve command with port mapping
# Use --service-ports to expose ports defined in docker-compose.yml
docker-compose -f docker/docker-compose.yml run --rm --service-ports styleguide yarn serve
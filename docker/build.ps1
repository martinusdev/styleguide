# Build wrapper - builds in container without dist mount, then copies output to host
# This avoids EBUSY errors when gulp tries to delete the mounted dist directory

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

Write-Host "Building in Docker..."
Set-Location $STYLEGUIDE_ROOT

# Run build without --rm so we can copy files from container afterward
$CONTAINER_ID = docker-compose -f docker/docker-compose.yml run --no-deps -T -d styleguide yarn build

# Wait for build to complete
docker wait $CONTAINER_ID | Out-Null

# Check if build succeeded
$BUILD_EXIT_CODE = docker inspect $CONTAINER_ID --format '{{.State.ExitCode}}'
if ($BUILD_EXIT_CODE -ne "0") {
    Write-Host "Build failed with exit code $BUILD_EXIT_CODE"
    docker logs $CONTAINER_ID
    docker rm $CONTAINER_ID | Out-Null
    exit $BUILD_EXIT_CODE
}

# Copy dist output from container to host
Write-Host ""
Write-Host "Copying build output to host..."

# Remove existing dist directory
if (Test-Path "$STYLEGUIDE_ROOT\dist") {
    Remove-Item -Recurse -Force "$STYLEGUIDE_ROOT\dist"
}

# Copy from container
docker cp "${CONTAINER_ID}:/app/dist" "$STYLEGUIDE_ROOT\"

# Clean up container
docker rm $CONTAINER_ID | Out-Null

Write-Host "Build output copied to host"
Write-Host ""
Write-Host "Build complete!"
Write-Host "Build complete! Output in dist/" -ForegroundColor Green
Get-ChildItem "$STYLEGUIDE_ROOT\dist" | Select-Object -First 10 | Format-Table -AutoSize

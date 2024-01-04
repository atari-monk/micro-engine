param(
    [string]$path,
    [string]$fileName
)

# Combine the path and filename
$fullPath = Join-Path $path $fileName

# Check if the file exists
if (Test-Path $fullPath) {
    # Get the file extension
    $fileExtension = [System.IO.Path]::GetExtension($fullPath)

    # Build the new file name with "new_" prefix
    $newFileName = "New" + [System.IO.Path]::GetFileNameWithoutExtension($fileName) + $fileExtension

    # Combine the path and the new filename
    $newFilePath = Join-Path $path $newFileName

    # Copy the file with the new name
    Copy-Item -Path $fullPath -Destination $newFilePath

    Write-Host "File copied successfully. New file path: $newFilePath"
} else {
    Write-Host "File not found: $fullPath"
}

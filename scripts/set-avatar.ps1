# Foolproof avatar setup: tries 3 ways in order
#   1. If you pass -Path, copies that file
#   2. Otherwise tries clipboard
#   3. Otherwise opens a file-picker dialog
#
# Usage (any of these):
#   powershell -ExecutionPolicy Bypass -File scripts\set-avatar.ps1
#   powershell -ExecutionPolicy Bypass -File scripts\set-avatar.ps1 -Path "C:\path\to\photo.jpg"

param(
    [string]$Path = ""
)

$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $PSScriptRoot
$dst  = Join-Path $root "public\images\imran.jpg"
$cfg  = Join-Path $root "lib\site-config.ts"

Add-Type -AssemblyName System.Windows.Forms
Add-Type -AssemblyName System.Drawing

# Ensure target dir exists
$dstDir = Split-Path $dst -Parent
if (-not (Test-Path $dstDir)) {
    New-Item -ItemType Directory -Force -Path $dstDir | Out-Null
}

function Save-FromFile($src) {
    Write-Host ("Reading: " + $src) -ForegroundColor Cyan
    if (-not (Test-Path $src)) {
        Write-Host "ERROR: File not found." -ForegroundColor Red
        return $false
    }
    Copy-Item -Path $src -Destination $dst -Force
    return $true
}

function Save-FromClipboard() {
    if (-not [System.Windows.Forms.Clipboard]::ContainsImage()) {
        return $false
    }
    $img = [System.Windows.Forms.Clipboard]::GetImage()
    if ($null -eq $img) { return $false }

    $jpegCodec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() |
        Where-Object { $_.MimeType -eq "image/jpeg" } | Select-Object -First 1
    $encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
    $encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter(
        [System.Drawing.Imaging.Encoder]::Quality, [long]92
    )
    $img.Save($dst, $jpegCodec, $encoderParams)
    $img.Dispose()
    Write-Host "Read image from clipboard." -ForegroundColor Cyan
    return $true
}

function Save-FromPicker() {
    Write-Host "Opening file picker - select your photo..." -ForegroundColor Yellow
    $dialog = New-Object System.Windows.Forms.OpenFileDialog
    $dialog.Title = "Select your portrait photo"
    $dialog.Filter = "Image files|*.jpg;*.jpeg;*.png;*.webp;*.bmp|All files|*.*"
    $dialog.InitialDirectory = [Environment]::GetFolderPath("MyPictures")
    $dialog.Multiselect = $false
    if ($dialog.ShowDialog() -eq [System.Windows.Forms.DialogResult]::OK) {
        Copy-Item -Path $dialog.FileName -Destination $dst -Force
        Write-Host ("Selected: " + $dialog.FileName) -ForegroundColor Cyan
        return $true
    }
    return $false
}

$ok = $false

if ($Path -and $Path.Length -gt 0) {
    $ok = Save-FromFile $Path
} else {
    $ok = Save-FromClipboard
    if (-not $ok) {
        Write-Host "No image in clipboard - opening file picker..." -ForegroundColor Yellow
        $ok = Save-FromPicker
    }
}

if (-not $ok) {
    Write-Host "ABORTED: no image was saved." -ForegroundColor Red
    exit 1
}

$bytes = (Get-Item $dst).Length
Write-Host ("Saved: {0} ({1:N0} bytes)" -f $dst, $bytes) -ForegroundColor Green

# Patch site-config.ts to use the JPG
if (Test-Path $cfg) {
    $cfgText = Get-Content $cfg -Raw -Encoding utf8
    if ($cfgText -match '"/images/imran\.svg"') {
        $cfgText = $cfgText -replace '"/images/imran\.svg"', '"/images/imran.jpg"'
        [System.IO.File]::WriteAllText($cfg, $cfgText, (New-Object System.Text.UTF8Encoding $false))
        Write-Host "Patched lib/site-config.ts -> avatar = /images/imran.jpg" -ForegroundColor Green
    } elseif ($cfgText -match '"/images/imran\.jpg"') {
        Write-Host "site-config.ts already points at /images/imran.jpg" -ForegroundColor Cyan
    }
}

Write-Host ""
Write-Host "DONE - your photo is wired in. Refresh http://localhost:3000/about" -ForegroundColor Green

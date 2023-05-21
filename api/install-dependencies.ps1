# Define installation paths
$phpPath = "C:\PHP"
$composerPath = "C:\Composer"

# Download PHP 8.2
$phpUrl = "https://windows.php.net/downloads/releases/php-8.2.0-nts-Win32-vs16-x64.zip"
$phpZipPath = "$env:TEMP\php.zip"
$phpExtractPath = "$env:TEMP\php"

Write-Host "Downloading PHP 8.2..."
Invoke-WebRequest -Uri $phpUrl -OutFile $phpZipPath

Write-Host "Extracting PHP 8.2..."
Expand-Archive -Path $phpZipPath -DestinationPath $phpExtractPath

Write-Host "Moving PHP files to $phpPath..."
Move-Item -Path "$phpExtractPath\*" -Destination $phpPath

# Add PHP to the system PATH
$envPath = [Environment]::GetEnvironmentVariable("Path", "Machine")
[Environment]::SetEnvironmentVariable("Path", "$envPath;$phpPath", "Machine")

# Download and install Composer
$composerUrl = "https://getcomposer.org/installer"
$composerInstallerPath = "$env:TEMP\composer-setup.php"

Write-Host "Downloading Composer..."
Invoke-WebRequest -Uri $composerUrl -OutFile $composerInstallerPath

Write-Host "Installing Composer..."
php $composerInstallerPath --install-dir=$composerPath --filename=composer

Write-Host "Cleaning up temporary files..."
Remove-Item -Path $phpZipPath -Force
Remove-Item -Path $phpExtractPath -Recurse -Force
Remove-Item -Path $composerInstallerPath -Force

Write-Host "PHP 8.2 and Composer installation completed."

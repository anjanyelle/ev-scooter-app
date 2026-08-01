@echo off
setlocal enabledelayedexpansion
set GRADLE_VERSION=9.3.1
set GRADLE_SHA256=b266d5ff6b90eada6dc3b20cb090e3731302e553a27c5d3e4df1f0d76beaff06
if "%GRADLE_USER_HOME%"=="" set GRADLE_USER_HOME=%USERPROFILE%\.gradle
set CACHE_DIR=%GRADLE_USER_HOME%\wrapper\manual\gradle-%GRADLE_VERSION%
set GRADLE_BIN=%CACHE_DIR%\gradle-%GRADLE_VERSION%\bin\gradle.bat
if not exist "%GRADLE_BIN%" (
  if not exist "%CACHE_DIR%" mkdir "%CACHE_DIR%"
  set ZIP_FILE=%CACHE_DIR%\gradle-%GRADLE_VERSION%-bin.zip
  powershell -NoProfile -ExecutionPolicy Bypass -Command "$ErrorActionPreference='Stop'; $ProgressPreference='SilentlyContinue'; $zip='%CACHE_DIR%\gradle-%GRADLE_VERSION%-bin.zip'; Invoke-WebRequest -Uri 'https://services.gradle.org/distributions/gradle-%GRADLE_VERSION%-bin.zip' -OutFile $zip; $actual=(Get-FileHash -Algorithm SHA256 $zip).Hash.ToLowerInvariant(); if ($actual -ne '%GRADLE_SHA256%') { Remove-Item $zip -Force; throw 'Gradle distribution checksum verification failed.' }; Expand-Archive -Path $zip -DestinationPath '%CACHE_DIR%' -Force"
  if errorlevel 1 exit /b 1
)
call "%GRADLE_BIN%" %*

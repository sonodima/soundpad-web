:: Script Author: https://github.com/DanielHeringer
@echo off
start "" "steam://rungameid/629520"
for /f "delims=[] tokens=2" %%a in ('ping -4 -n 1 %ComputerName% ^| findstr [') do set NetworkIP=%%a
echo Network IP: %NetworkIP%
npm run dev
if %errorlevel% neq 0 pause

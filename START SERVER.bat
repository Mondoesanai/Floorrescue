@echo off
cd /d "%~dp0"
if not exist node_modules (
    echo Installing dependencies for the first time, this may take a minute...
    call npm install
)
echo Starting Floor Rescue dev server at http://localhost:3000 ...
start "" http://localhost:3000
call npm run dev
pause

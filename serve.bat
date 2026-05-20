@echo off
REM Change to the folder where this bat file lives (the project root)
cd /d "%~dp0"

echo =======================================================
echo         DSA Mastery Suite - Starting Server
echo =======================================================
echo.

REM Kill any existing Python server on port 8000
echo Checking for existing server on port 8000...
for /f "tokens=5" %%a in ('netstat -aon 2^>nul ^| findstr /R "0\.0\.0\.0:8000 "') do (
    echo Stopping existing server (PID %%a)...
    taskkill /f /pid %%a >nul 2>&1
)
timeout /t 1 /nobreak >nul

REM Start Python server from this folder
echo Starting server from: %~dp0
start "DSA Mastery Server" /MIN cmd /c "python -m http.server 8000"

REM Give it time to bind the port
echo Waiting for server to start...
timeout /t 2 /nobreak >nul

REM Open browser
echo Opening http://localhost:8000 in browser...
start "" "http://localhost:8000/index.html"

echo.
echo -------------------------------------------------------
echo  Server running at http://localhost:8000/index.html
echo  Close the "DSA Mastery Server" window to stop it.
echo -------------------------------------------------------
echo.
pause

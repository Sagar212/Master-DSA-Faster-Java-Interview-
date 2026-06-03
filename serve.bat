@echo off
REM Change to the folder where this bat file lives (the project root)
cd /d "%~dp0"

echo =======================================================
echo         DSA Mastery Suite - Starting Server
echo =======================================================
echo.

REM Check if port 8000 is already listening
netstat -aon | findstr :8000 | findstr LISTENING >nul 2>&1
if %ERRORLEVEL% equ 0 (
    echo Server is already running on port 8000.
    goto open_browser
)

echo Port 8000 is free. Starting Python server...
start "DSA Mastery Server" /MIN cmd /c "python -m http.server 8000"

REM Give it time to bind the port
echo Waiting for server to start...
ping -n 3 127.0.0.1 >nul

:open_browser
echo Opening http://localhost:8000/index.html in browser...
start "" "http://localhost:8000/index.html"
echo Opening http://localhost:8000/algorithm-story-visualizer.html in browser...
start "" "http://localhost:8000/algorithm-story-visualizer.html"

echo.
echo -------------------------------------------------------
echo  Server running at http://localhost:8000/index.html
echo -------------------------------------------------------
echo.
pause

@echo off
echo =======================================================
echo         DSA Pattern Visualizer - Starting Server
echo =======================================================
echo.
echo Launching local server on port 8000...
echo Opening http://localhost:8000/index.html in your default browser...
echo.
start "" http://localhost:8000/index.html
python -m http.server 8000
pause

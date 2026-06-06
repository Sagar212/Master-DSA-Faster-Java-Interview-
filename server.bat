@echo off
title DSA Mastery Server
echo ================================
echo  Java Streams Mastery - Server
echo ================================
echo.
echo Starting server on http://localhost:5500
echo Opening browser...
echo.
start "" http://localhost:5500/java-streams-mastery.html
python -m http.server 5500
pause

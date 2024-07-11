@echo off
cd %~dp0
start cmd /c "npm start"
timeout /t 5 /nobreak > NUL


@echo off
title LegalMet AI: Compliance Station
echo =================================================================
echo   LEGALMET AI: COMPLIANCE STATION
echo   Starting local workstation server on http://localhost:8080 ...
echo =================================================================
start http://localhost:8080
python -m http.server 8080
pause

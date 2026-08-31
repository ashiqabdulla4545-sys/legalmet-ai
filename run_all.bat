@echo off
title LegalMet AI: Compliance Station (Full Stack Launcher)
echo =====================================================================
echo   LEGALMET AI: COMPLIANCE STATION - FULL STACK LAUNCHER
echo =====================================================================
echo.
echo 1. Starting FastAPI Backend (Port 8000)...
start "LegalMet Backend (FastAPI)" cmd /k "python -m uvicorn backend.main:app --host 127.0.0.1 --port 8000 --reload"

echo 2. Starting Frontend Web App (Port 8080)...
start "LegalMet Frontend" cmd /k "python -m http.server 8080"

timeout /t 2 >nul
echo 3. Opening Workstation in Browser...
start http://localhost:8080
start http://localhost:8000/docs

echo.
echo =====================================================================
echo   Workstation is live!
echo   - Frontend:    http://localhost:8080
echo   - Backend API: http://localhost:8000
echo   - Swagger UI:  http://localhost:8000/docs
echo =====================================================================
pause

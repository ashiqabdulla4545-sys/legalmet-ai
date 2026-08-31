@echo off
title LegalMet AI: Backend API (FastAPI)
echo =====================================================================
echo  LEGALMET AI: COMPLIANCE STATION - FASTAPI BACKEND SERVER
echo  Jurisdiction: Delhi NCT Enforcement Node 01
echo =====================================================================
echo.
echo Starting FastAPI server at http://127.0.0.1:8000 ...
echo Swagger UI Docs will open at: http://127.0.0.1:8000/docs
echo.
start http://127.0.0.1:8000/docs
python -m uvicorn backend.main:app --host 127.0.0.1 --port 8000 --reload
pause

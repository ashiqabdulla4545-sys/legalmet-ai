@echo off
echo =====================================================================
echo  LEGALMET AI: COMPLIANCE STATION - FASTAPI BACKEND SERVER
echo  Jurisdiction: Delhi NCT Enforcement Node 01
echo =====================================================================
echo.
echo Starting FastAPI server at http://127.0.0.1:8000 ...
echo Swagger UI Docs will be available at: http://127.0.0.1:8000/docs
echo.
python -m uvicorn backend.main:app --host 0.0.0.0 --port 8000 --reload
pause

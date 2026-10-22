@echo off
chcp 65001 >nul
title Desafío Eco-Park U'wa
cd /d "%~dp0"

where npm >nul 2>nul
if errorlevel 1 goto sin_node

if not exist "node_modules\" (
  echo Instalando dependencias, solo la primera vez...
  call npm install --no-fund --no-audit
  if errorlevel 1 goto error
)

echo Preparando el juego...
call npm run build --silent
if errorlevel 1 goto error
goto abrir

:sin_node
if not exist "dist\index.html" (
  echo No se encontró Node.js y el juego todavía no está compilado.
  echo Instálalo desde https://nodejs.org y vuelve a ejecutar este archivo.
  pause
  exit /b 1
)
echo Node.js no está instalado: se abre la última versión compilada.

:abrir
start "" "%~dp0dist\index.html"
exit /b 0

:error
echo.
echo Algo salió mal. Revisa el mensaje de arriba.
pause
exit /b 1

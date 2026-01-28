# ---------------------------------------------
# Script para instalar y correr backend + frontend en Windows
# ---------------------------------------------

Write-Host "----------------------------"
Write-Host "INSTALANDO DEPENDENCIAS BACKEND"
Write-Host "----------------------------"

Set-Location -Path ".\backend"
npm install

Write-Host "----------------------------"
Write-Host "CREANDO BASE DE DATOS"
Write-Host "----------------------------"

# Crea archivo db.sqlite si no existe
if (-Not (Test-Path "db.sqlite")) { New-Item "db.sqlite" -ItemType File }

Write-Host "----------------------------"
Write-Host "CORRIENDO BACKEND"
Write-Host "----------------------------"

# Ejecuta backend en segundo plano
Start-Process "npm" "run start:dev"

Set-Location -Path "..\frontend"

Write-Host "----------------------------"
Write-Host "INSTALANDO DEPENDENCIAS FRONTEND"
Write-Host "----------------------------"

npm install

Write-Host "----------------------------"
Write-Host "CORRIENDO FRONTEND"
Write-Host "----------------------------"

npm start
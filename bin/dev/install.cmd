@ECHO OFF
cd "%~dp0"
cd "files"
"../../../vendor/bin/npm.bat" update
"../../../vendor/bin/npm.bat" install

mode con:cols=1 lines=1
echo MSGBOX "Realize o pull no repositorio do cliente antes de subir no gihub!", vbExclamation > %temp%\TEMPmessage.vbs
call %temp%\TEMPmessage.vbs
del %temp%\TEMPmessage.vbs /f /q
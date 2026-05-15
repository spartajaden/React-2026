@echo off
REM Docker 컨테이너 정리 스크립트

echo.
echo ========================================
echo Docker 컨테이너 정리
echo ========================================
echo.

echo [1/3] 실행 중인 컨테이너 중지 중...
docker-compose down

echo.
echo [2/3] 볼륨 삭제 중 (주의!)...
echo 데이터베이스 데이터가 삭제됩니다.
set /p confirm="계속하시겠습니까? (y/n): "

if /i "%confirm%"=="y" (
    docker-compose down -v
    echo [2/3] 볼륨 삭제 완료
) else (
    echo [2/3] 볼륨 삭제 취소
)

echo.
echo [3/3] 정리 완료
echo.
echo 다시 시작하려면:
echo   start.bat
echo.

pause

#!/bin/bash

# Unix/Linux/Mac용 빠른 시작 스크립트

echo ""
echo "========================================"
echo "Flask-React-CRUD Docker 설치 및 실행"
echo "========================================"
echo ""

# 1. React 빌드 확인
if [ ! -d "frontend/dist" ]; then
    echo "[1/3] React 빌드 중..."
    cd frontend
    npm install
    npm run build
    cd ..
    echo "[1/3] React 빌드 완료"
else
    echo "[1/3] React 빌드 파일 이미 존재"
fi

echo ""

# 2. Docker 컨테이너 시작
echo "[2/3] Docker Compose로 컨테이너 시작 중..."
docker-compose up -d
echo "[2/3] 컨테이너 시작 완료"

echo ""

# 3. 접속 정보 출력
echo "[3/3] 접속 정보"
echo ""
echo "========================================"
echo "애플리케이션이 시작되었습니다!"
echo ""
echo "웹 브라우저에서 접속:"
echo "  http://localhost:5000"
echo ""
echo "API 서버:"
echo "  http://localhost:5000/api/items"
echo ""
echo "로그 확인:"
echo "  docker-compose logs -f"
echo ""
echo "컨테이너 중지:"
echo "  docker-compose down"
echo "========================================"
echo ""

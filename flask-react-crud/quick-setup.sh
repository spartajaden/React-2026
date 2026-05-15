#!/bin/bash

################################################################################
# Flask-React-MySQL CRUD - Ubuntu 빠른 설치 스크립트 (최소 구성)
# 
# 사용법:
#   sudo ./quick-setup.sh
#
# 소요 시간: 5-10분
################################################################################

set -e

# 색상
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${BLUE}=== Flask-React-CRUD 빠른 설치 ===${NC}\n"

# 권한 확인
if [[ $EUID -ne 0 ]]; then
    echo -e "${RED}sudo 권한으로 실행하세요${NC}"
    exit 1
fi

# 1. 시스템 업데이트
echo -e "${BLUE}[1/7] 시스템 업데이트...${NC}"
apt-get update && apt-get upgrade -y > /dev/null 2>&1

# 2. Docker 설치
echo -e "${BLUE}[2/7] Docker 설치...${NC}"
apt-get install -y apt-transport-https ca-certificates curl gnupg lsb-release > /dev/null 2>&1
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg 2>/dev/null
echo "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null
apt-get update && apt-get install -y docker-ce docker-ce-cli containerd.io > /dev/null 2>&1
curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose 2>/dev/null
chmod +x /usr/local/bin/docker-compose
systemctl start docker && systemctl enable docker > /dev/null 2>&1

# 3. Node.js 설치
echo -e "${BLUE}[3/7] Node.js 설치...${NC}"
curl -fsSL https://deb.nodesource.com/setup_18.x | bash - > /dev/null 2>&1
apt-get install -y nodejs > /dev/null 2>&1

# 4. Git 설치
echo -e "${BLUE}[4/7] Git 및 기타 도구 설치...${NC}"
apt-get install -y git wget curl > /dev/null 2>&1

# 5. 프로젝트 설정
echo -e "${BLUE}[5/7] 프로젝트 설정...${NC}"
mkdir -p /opt/flask-react-crud
cd /opt/flask-react-crud

# 저장소가 없으면 현재 디렉토리에서 복사
if [ ! -f "docker-compose.yml" ]; then
    if [ -f "$(pwd)/../flask-react-crud/docker-compose.yml" ]; then
        cp -r $(pwd)/../flask-react-crud/* /opt/flask-react-crud/ 2>/dev/null || true
    fi
fi

# .env 파일 생성
if [ ! -f "backend/.env" ]; then
    cp backend/.env.example backend/.env 2>/dev/null || true
    chmod 600 backend/.env
fi

# 6. React 빌드
echo -e "${BLUE}[6/7] React 빌드 중 (2-3분)...${NC}"
cd /opt/flask-react-crud/frontend
npm install --legacy-peer-deps > /dev/null 2>&1
npm run build > /dev/null 2>&1

# 7. Docker 실행
echo -e "${BLUE}[7/7] Docker 컨테이너 시작...${NC}"
cd /opt/flask-react-crud
docker-compose up -d > /dev/null 2>&1
sleep 5

# 완료
echo -e "${GREEN}✓ 설치 완료!${NC}\n"
echo "📌 접속 정보:"
echo "   웹: http://localhost:5000"
echo "   API: http://localhost:5000/api/items"
echo ""
echo "📌 유용한 명령어:"
echo "   docker-compose ps                  # 상태 확인"
echo "   docker-compose logs -f             # 로그 확인"
echo "   docker-compose down                # 중지"
echo ""

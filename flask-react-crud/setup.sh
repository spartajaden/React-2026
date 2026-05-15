#!/bin/bash

################################################################################
# Flask-React-MySQL CRUD 애플리케이션 - Ubuntu 자동 설치 스크립트
# 
# 사용법:
#   chmod +x setup.sh
#   ./setup.sh
#
# 요구사항: Ubuntu 20.04 이상, sudo 권한
################################################################################

set -e  # 에러 발생시 스크립트 중단

# 색상 정의
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 로그 함수
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# 헤더 출력
print_header() {
    echo ""
    echo "==============================================="
    echo "  Flask-React-MySQL CRUD 자동 설치"
    echo "  Ubuntu Server 환경"
    echo "==============================================="
    echo ""
}

# 권한 확인
check_sudo() {
    if [[ $EUID -ne 0 ]]; then
        log_error "이 스크립트는 sudo 권한으로 실행되어야 합니다."
        echo "다시 실행: sudo ./setup.sh"
        exit 1
    fi
}

# 시스템 업데이트
update_system() {
    log_info "시스템 패키지 업데이트 중..."
    apt-get update
    apt-get upgrade -y
    log_success "시스템 업데이트 완료"
}

# Docker 설치
install_docker() {
    log_info "Docker 설치 중..."
    
    if command -v docker &> /dev/null; then
        log_warning "Docker가 이미 설치되어 있습니다"
        return
    fi
    
    # Docker 의존성 설치
    apt-get install -y \
        apt-transport-https \
        ca-certificates \
        curl \
        gnupg \
        lsb-release
    
    # Docker GPG 키 추가
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
    
    # Docker 저장소 추가
    echo \
        "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu \
        $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null
    
    # Docker 설치
    apt-get update
    apt-get install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin
    
    # docker-compose (스탠드얼론) 설치
    curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    chmod +x /usr/local/bin/docker-compose
    
    # Docker 데몬 시작
    systemctl start docker
    systemctl enable docker
    
    log_success "Docker 설치 완료"
}

# Docker 그룹 설정 (sudo 없이 docker 명령 실행)
setup_docker_group() {
    log_info "Docker 그룹 설정 중..."
    
    # docker 그룹 생성 (이미 있으면 무시)
    groupadd docker 2>/dev/null || true
    
    # 현재 사용자를 docker 그룹에 추가
    if [ -n "$SUDO_USER" ]; then
        usermod -aG docker $SUDO_USER
        log_success "사용자 '$SUDO_USER'가 docker 그룹에 추가되었습니다"
    fi
    
    # docker 소켓 권한 설정
    newgrp docker || true
}

# Node.js 설치
install_nodejs() {
    log_info "Node.js 설치 중..."
    
    if command -v node &> /dev/null; then
        log_warning "Node.js가 이미 설치되어 있습니다: $(node --version)"
        return
    fi
    
    # Node.js 설치
    curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
    apt-get install -y nodejs
    
    log_success "Node.js 설치 완료: $(node --version)"
}

# Python 설치
install_python() {
    log_info "Python 설치 중..."
    
    if command -v python3 &> /dev/null; then
        log_warning "Python3이 이미 설치되어 있습니다: $(python3 --version)"
    else
        apt-get install -y python3 python3-pip python3-venv
        log_success "Python3 설치 완료"
    fi
}

# Git 설치
install_git() {
    log_info "Git 설치 중..."
    
    if command -v git &> /dev/null; then
        log_warning "Git이 이미 설치되어 있습니다: $(git --version)"
        return
    fi
    
    apt-get install -y git
    log_success "Git 설치 완료"
}

# 기타 유용한 도구 설치
install_utilities() {
    log_info "유틸리티 도구 설치 중..."
    apt-get install -y \
        wget \
        curl \
        vim \
        nano \
        htop \
        tree
    log_success "유틸리티 설치 완료"
}

# 프로젝트 디렉토리 생성 및 설정
setup_project() {
    log_info "프로젝트 디렉토리 설정 중..."
    
    PROJECT_DIR="/opt/flask-react-crud"
    
    # 디렉토리 생성
    mkdir -p $PROJECT_DIR
    
    # 저장소 클론 (Git이 필요)
    if [ -d "$PROJECT_DIR/.git" ]; then
        log_warning "저장소가 이미 존재합니다"
        cd $PROJECT_DIR
        git pull
    else
        log_info "GitHub에서 저장소 클론 중..."
        cd /opt
        # 실제 저장소 URL로 변경 필요
        git clone https://github.com/yourname/flask-react-crud.git 2>/dev/null || \
        log_warning "저장소 클론 실패 - 수동으로 파일을 복사하세요"
    fi
    
    cd $PROJECT_DIR
    log_success "프로젝트 디렉토리 설정 완료: $PROJECT_DIR"
    
    echo "PROJECT_DIR=$PROJECT_DIR"
}

# React 빌드
build_react() {
    log_info "React 애플리케이션 빌드 중..."
    
    if [ -z "$PROJECT_DIR" ]; then
        PROJECT_DIR="/opt/flask-react-crud"
    fi
    
    cd $PROJECT_DIR/frontend
    
    if [ ! -d "node_modules" ]; then
        log_info "npm 의존성 설치 중..."
        npm install --legacy-peer-deps
    fi
    
    log_info "빌드 실행 중..."
    npm run build
    
    if [ -d "dist" ]; then
        log_success "React 빌드 완료: $PROJECT_DIR/frontend/dist"
    else
        log_error "React 빌드 실패"
        exit 1
    fi
}

# 환경 설정
setup_environment() {
    log_info "환경 변수 설정 중..."
    
    if [ -z "$PROJECT_DIR" ]; then
        PROJECT_DIR="/opt/flask-react-crud"
    fi
    
    cd $PROJECT_DIR/backend
    
    if [ ! -f ".env" ]; then
        cp .env.example .env
        log_success ".env 파일 생성됨"
    else
        log_warning ".env 파일이 이미 존재합니다"
    fi
    
    # 권한 설정
    chmod 600 .env
}

# Docker Compose 환경 확인
verify_docker() {
    log_info "Docker 설정 확인 중..."
    
    docker --version
    docker-compose --version
    
    log_success "Docker 확인 완료"
}

# Docker 이미지 빌드
build_docker_images() {
    log_info "Docker 이미지 빌드 중 (5-10분 소요)..."
    
    if [ -z "$PROJECT_DIR" ]; then
        PROJECT_DIR="/opt/flask-react-crud"
    fi
    
    cd $PROJECT_DIR
    
    docker-compose build
    
    log_success "Docker 이미지 빌드 완료"
}

# Docker 컨테이너 시작
start_containers() {
    log_info "Docker 컨테이너 시작 중..."
    
    if [ -z "$PROJECT_DIR" ]; then
        PROJECT_DIR="/opt/flask-react-crud"
    fi
    
    cd $PROJECT_DIR
    
    docker-compose up -d
    
    # 컨테이너 상태 확인
    sleep 5
    docker-compose ps
    
    log_success "Docker 컨테이너 시작 완료"
}

# 데이터베이스 초기화
init_database() {
    log_info "데이터베이스 초기화 중..."
    
    if [ -z "$PROJECT_DIR" ]; then
        PROJECT_DIR="/opt/flask-react-crud"
    fi
    
    # 컨테이너에서 DB 초기화 실행
    docker-compose exec -T app python init_db.py
    
    log_success "데이터베이스 초기화 완료"
}

# Systemd 서비스 파일 생성
create_systemd_service() {
    log_info "Systemd 서비스 파일 생성 중..."
    
    if [ -z "$PROJECT_DIR" ]; then
        PROJECT_DIR="/opt/flask-react-crud"
    fi
    
    cat > /etc/systemd/system/flask-react-crud.service << EOF
[Unit]
Description=Flask-React-CRUD Application
After=docker.service
Requires=docker.service

[Service]
Type=simple
WorkingDirectory=$PROJECT_DIR
ExecStart=/usr/local/bin/docker-compose up
ExecStop=/usr/local/bin/docker-compose down
Restart=on-failure
RestartSec=10
StandardOutput=journal
StandardError=journal

[Install]
WantedBy=multi-user.target
EOF

    # 권한 설정
    chmod 644 /etc/systemd/system/flask-react-crud.service
    
    # Systemd 리로드
    systemctl daemon-reload
    
    # 서비스 활성화 (부팅시 자동 시작)
    systemctl enable flask-react-crud.service
    
    log_success "Systemd 서비스 생성 완료"
    echo "서비스 명령어:"
    echo "  systemctl start flask-react-crud"
    echo "  systemctl stop flask-react-crud"
    echo "  systemctl restart flask-react-crud"
    echo "  systemctl status flask-react-crud"
    echo "  journalctl -u flask-react-crud -f"
}

# Nginx 리버스 프록시 설정 (선택사항)
setup_nginx() {
    log_info "Nginx 리버스 프록시 설정 중..."
    
    if ! command -v nginx &> /dev/null; then
        apt-get install -y nginx
        systemctl start nginx
        systemctl enable nginx
    fi
    
    cat > /etc/nginx/sites-available/flask-react-crud << 'EOF'
server {
    listen 80;
    server_name _;

    client_max_body_size 10M;

    location / {
        proxy_pass http://127.0.0.1:5000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # API 요청
    location /api/ {
        proxy_pass http://127.0.0.1:5000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # 정적 파일 캐싱
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 365d;
        add_header Cache-Control "public, immutable";
    }
}
EOF

    # 심볼릭 링크 생성
    ln -sf /etc/nginx/sites-available/flask-react-crud /etc/nginx/sites-enabled/ 2>/dev/null || true
    
    # 기본 설정 제거
    rm -f /etc/nginx/sites-enabled/default 2>/dev/null || true
    
    # Nginx 문법 확인
    nginx -t
    
    # Nginx 재시작
    systemctl restart nginx
    
    log_success "Nginx 설정 완료"
}

# SSL 인증서 설정 (Certbot)
setup_ssl() {
    log_info "SSL 인증서 설정 중..."
    
    read -p "도메인명을 입력하세요 (예: example.com): " domain
    
    if [ -z "$domain" ]; then
        log_warning "도메인명이 입력되지 않았습니다. SSL 설정을 건너뜁니다."
        return
    fi
    
    if ! command -v certbot &> /dev/null; then
        apt-get install -y certbot python3-certbot-nginx
    fi
    
    certbot --nginx -d $domain
    
    log_success "SSL 인증서 설정 완료"
}

# 방화벽 설정
setup_firewall() {
    log_info "방화벽 설정 중..."
    
    apt-get install -y ufw
    
    # HTTP/HTTPS 포트 허용
    ufw allow 22/tcp
    ufw allow 80/tcp
    ufw allow 443/tcp
    
    # 방화벽 활성화
    ufw --force enable
    
    ufw status
    
    log_success "방화벽 설정 완료"
}

# 설치 완료 정보 출력
print_completion_info() {
    echo ""
    echo "==============================================="
    echo -e "${GREEN}설치가 완료되었습니다!${NC}"
    echo "==============================================="
    echo ""
    echo "📌 접속 정보:"
    echo "   웹 브라우저: http://your-server-ip"
    echo "   API: http://your-server-ip/api/items"
    echo ""
    echo "📌 주요 디렉토리:"
    echo "   프로젝트: /opt/flask-react-crud"
    echo "   데이터베이스: Docker 볼륨"
    echo ""
    echo "📌 Docker 명령어:"
    echo "   docker-compose ps"
    echo "   docker-compose logs -f"
    echo "   docker-compose restart"
    echo ""
    echo "📌 시스템 서비스:"
    echo "   systemctl status flask-react-crud"
    echo "   systemctl logs flask-react-crud -f"
    echo ""
    echo "📌 다음 단계:"
    echo "   1. 방화벽 설정 확인: sudo ufw status"
    echo "   2. 도메인 연결 (선택)"
    echo "   3. SSL 인증서 설정 (선택)"
    echo ""
    echo "==============================================="
    echo ""
}

# 메인 설치 함수
main() {
    print_header
    check_sudo
    
    # 설치 단계
    update_system
    install_git
    install_docker
    setup_docker_group
    install_nodejs
    install_python
    install_utilities
    setup_project
    setup_environment
    build_react
    verify_docker
    build_docker_images
    start_containers
    
    # 선택적 설정
    echo ""
    read -p "데이터베이스를 초기화하시겠습니까? (y/n): " init_db
    if [ "$init_db" = "y" ]; then
        sleep 10  # MySQL 시작 대기
        init_database
    fi
    
    echo ""
    read -p "Nginx 리버스 프록시를 설정하시겠습니까? (y/n): " setup_nginx_choice
    if [ "$setup_nginx_choice" = "y" ]; then
        setup_nginx
        
        read -p "SSL 인증서를 설정하시겠습니까? (y/n): " setup_ssl_choice
        if [ "$setup_ssl_choice" = "y" ]; then
            setup_ssl
        fi
    fi
    
    echo ""
    read -p "방화벽을 설정하시겠습니까? (y/n): " setup_firewall_choice
    if [ "$setup_firewall_choice" = "y" ]; then
        setup_firewall
    fi
    
    echo ""
    read -p "Systemd 서비스를 생성하시겠습니까? (y/n): " create_service
    if [ "$create_service" = "y" ]; then
        create_systemd_service
    fi
    
    # 완료 정보 출력
    print_completion_info
}

# 스크립트 실행
main

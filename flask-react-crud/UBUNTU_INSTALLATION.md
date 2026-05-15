# Ubuntu 서버 자동 설치 가이드

## 📋 개요

이 가이드는 Ubuntu 서버에 Flask-React-MySQL CRUD 애플리케이션을 완전히 자동 설치하는 방법을 설명합니다.

## ⚙️ 요구사항

- **OS**: Ubuntu 20.04 이상
- **최소사양**: 2GB RAM, 20GB 스토리지
- **권한**: sudo 권한 필요
- **네트워크**: 인터넷 연결 필수

## 🚀 빠른 시작 (3단계)

### Step 1: 프로젝트 다운로드

```bash
cd /tmp
git clone https://github.com/yourname/flask-react-crud.git
cd flask-react-crud
```

또는 파일을 직접 업로드한 경우:

```bash
cd /path/to/flask-react-crud
```

### Step 2: 설치 스크립트 실행

```bash
# 스크립트 권한 설정
chmod +x setup.sh

# 설치 실행 (sudo 필요)
sudo ./setup.sh
```

### Step 3: 설치 완료 후 접속

```
웹 브라우저: http://your-server-ip
또는: http://your-domain-name
```

---

## 📝 설치 스크립트 상세 설명

### `setup.sh` 기능

| 기능                | 설명                                  |
| ------------------- | ------------------------------------- |
| **시스템 업데이트** | apt 패키지 업데이트 및 업그레이드     |
| **Docker 설치**     | Docker 및 Docker Compose 설치         |
| **Node.js 설치**    | React 빌드를 위한 Node.js 18 설치     |
| **Python 설치**     | Flask 실행을 위한 Python 3 설치       |
| **프로젝트 설정**   | 프로젝트 디렉토리 생성 및 저장소 클론 |
| **React 빌드**      | React 애플리케이션 빌드               |
| **Docker 빌드**     | 이미지 빌드 및 컨테이너 시작          |
| **DB 초기화**       | MySQL 데이터베이스 초기화 (선택)      |
| **Nginx 설정**      | 리버스 프록시 설정 (선택)             |
| **SSL 설정**        | HTTPS 인증서 설정 (선택)              |
| **방화벽**          | UFW 방화벽 설정 (선택)                |
| **Systemd 서비스**  | 자동 시작 서비스 설정 (선택)          |

---

## 🔧 수동 설치 (커스터마이제이션)

각 단계를 개별적으로 실행하려면:

### 1. 시스템 업데이트

```bash
sudo apt-get update
sudo apt-get upgrade -y
```

### 2. Docker 설치

```bash
# 의존성
sudo apt-get install -y apt-transport-https ca-certificates curl gnupg lsb-release

# GPG 키
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

# 저장소
echo "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# 설치
sudo apt-get update
sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin

# Docker Compose 설치
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# 시작
sudo systemctl start docker
sudo systemctl enable docker

# 권한 설정 (현재 사용자가 docker 사용 가능하도록)
sudo groupadd docker 2>/dev/null || true
sudo usermod -aG docker $USER
newgrp docker
```

### 3. Node.js 설치

```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### 4. Python 설치

```bash
sudo apt-get install -y python3 python3-pip python3-venv
```

### 5. Git 설치

```bash
sudo apt-get install -y git
```

### 6. 프로젝트 클론

```bash
# 저장소 클론
cd /opt
sudo git clone https://github.com/yourname/flask-react-crud.git
cd flask-react-crud

# 권한 설정
sudo chown -R $USER:$USER /opt/flask-react-crud
```

### 7. 환경 설정

```bash
cd backend
cp .env.example .env

# 환경 변수 수정 (필요시)
nano .env
```

### 8. React 빌드

```bash
cd frontend
npm install
npm run build
```

### 9. Docker 이미지 빌드

```bash
cd /opt/flask-react-crud
docker-compose build
```

### 10. 컨테이너 시작

```bash
docker-compose up -d
```

---

## 🐳 Docker Compose 명령어

```bash
# 상태 확인
docker-compose ps

# 로그 확인
docker-compose logs -f

# 특정 서비스 로그
docker-compose logs -f app
docker-compose logs -f mysql

# 컨테이너 재시작
docker-compose restart

# 컨테이너 중지
docker-compose stop

# 컨테이너 시작
docker-compose start

# 컨테이너 삭제 (데이터 보존)
docker-compose down

# 컨테이너 및 데이터 삭제 (주의!)
docker-compose down -v

# 재빌드
docker-compose up -d --build
```

---

## 🌐 Nginx 리버스 프록시 설정

포트 80/443으로 접속 가능하도록 Nginx를 설정하는 경우:

```bash
# Nginx 설치
sudo apt-get install -y nginx

# 설정 파일 생성
sudo nano /etc/nginx/sites-available/flask-react-crud
```

다음 내용 추가:

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

활성화:

```bash
# 심볼릭 링크 생성
sudo ln -s /etc/nginx/sites-available/flask-react-crud /etc/nginx/sites-enabled/

# 문법 확인
sudo nginx -t

# 재시작
sudo systemctl restart nginx
```

---

## 🔒 SSL 인증서 설정 (Certbot)

HTTPS를 설정하려면:

```bash
# Certbot 설치
sudo apt-get install -y certbot python3-certbot-nginx

# 인증서 발급
sudo certbot --nginx -d your-domain.com

# 자동 갱신 확인
sudo certbot renew --dry-run
```

---

## 🛡️ 방화벽 설정 (UFW)

```bash
# UFW 활성화
sudo ufw enable

# 포트 허용
sudo ufw allow 22/tcp   # SSH
sudo ufw allow 80/tcp   # HTTP
sudo ufw allow 443/tcp  # HTTPS

# 상태 확인
sudo ufw status
```

---

## 🔄 자동 시작 설정 (Systemd)

서버 재부팅시 자동으로 애플리케이션이 시작되도록 설정:

```bash
# 서비스 파일 생성
sudo nano /etc/systemd/system/flask-react-crud.service
```

다음 내용 추가:

```ini
[Unit]
Description=Flask-React-CRUD Application
After=docker.service
Requires=docker.service

[Service]
Type=simple
WorkingDirectory=/opt/flask-react-crud
ExecStart=/usr/local/bin/docker-compose up
ExecStop=/usr/local/bin/docker-compose down
Restart=on-failure
RestartSec=10

[Install]
WantedBy=multi-user.target
```

활성화:

```bash
# systemd 리로드
sudo systemctl daemon-reload

# 서비스 활성화
sudo systemctl enable flask-react-crud

# 서비스 시작
sudo systemctl start flask-react-crud

# 상태 확인
sudo systemctl status flask-react-crud

# 로그 확인
sudo journalctl -u flask-react-crud -f
```

---

## 📊 시스템 모니터링

```bash
# CPU/메모리 사용량
htop

# 디스크 사용량
df -h

# Docker 이미지/컨테이너 용량
docker system df

# 로그 확인
docker-compose logs -f

# 특정 시간 이후 로그
docker-compose logs --since 1h -f
```

---

## 🔧 문제 해결

### Docker 권한 오류

```bash
# 그룹 다시 설정
sudo usermod -aG docker $USER
newgrp docker

# 또는
sudo chown $USER:$USER /var/run/docker.sock
```

### MySQL 연결 실패

```bash
# MySQL 컨테이너 상태 확인
docker-compose ps mysql

# MySQL 로그 확인
docker-compose logs mysql

# 컨테이너 재시작
docker-compose restart mysql

# 완전 초기화
docker-compose down -v
docker-compose up -d
```

### React 빌드 오류

```bash
cd /opt/flask-react-crud/frontend

# npm 캐시 제거
npm cache clean --force

# node_modules 삭제
rm -rf node_modules package-lock.json

# 재설치 및 빌드
npm install
npm run build
```

### 포트 충돌

```bash
# 5000 포트 사용 상황 확인
sudo lsof -i :5000

# 프로세스 강제 종료 (필요시)
sudo kill -9 <PID>

# docker-compose.yml 포트 변경
sudo nano docker-compose.yml
# ports: ["8000:5000"]  변경
```

### 디스크 부족

```bash
# 사용량 확인
df -h

# Docker 정리
docker system prune -a

# 오래된 로그 정리
sudo journalctl --vacuum=500M
```

---

## 📋 체크리스트

설치 후 확인 사항:

- [ ] Docker 컨테이너 정상 실행 중 (`docker-compose ps`)
- [ ] MySQL 데이터베이스 정상 작동
- [ ] Flask API 응답 (`curl http://localhost:5000/api/health`)
- [ ] React UI 접속 가능 (`http://localhost:5000`)
- [ ] CRUD 기능 테스트
- [ ] 백업 설정 확인
- [ ] 모니터링 설정 확인
- [ ] 로그 로테이션 설정 확인

---

## 📞 유용한 명령어 모음

```bash
# 전체 상태 확인
docker-compose ps
docker system df

# 로그 확인
docker-compose logs -f
sudo journalctl -u flask-react-crud -f

# 서비스 제어
sudo systemctl start flask-react-crud
sudo systemctl stop flask-react-crud
sudo systemctl restart flask-react-crud
sudo systemctl status flask-react-crud

# 업데이트
cd /opt/flask-react-crud
git pull
docker-compose up -d --build

# 백업
sudo tar -czf /backup/flask-react-crud-$(date +%Y%m%d).tar.gz /opt/flask-react-crud

# 복구
sudo tar -xzf /backup/flask-react-crud-20240101.tar.gz -C /
```

---

## 🔐 보안 권장사항

1. **환경 변수 보안**

   ```bash
   # .env 파일 권한 제한
   chmod 600 backend/.env
   ```

2. **방화벽 설정**

   ```bash
   sudo ufw default deny incoming
   sudo ufw default allow outgoing
   ```

3. **정기 백업**

   ```bash
   # crontab에 추가
   0 2 * * * /opt/flask-react-crud/backup.sh
   ```

4. **SSL/TLS 활성화**
   - Certbot으로 Let's Encrypt 인증서 설정

5. **로그 모니터링**
   ```bash
   sudo tail -f /var/log/syslog
   ```

---

## 📚 추가 문서

프로젝트 루트의 문서:

- `README.md` - 전체 프로젝트 문서
- `QUICKSTART.md` - 빠른 시작 가이드
- `API_TESTING.md` - API 테스트 방법
- `COMPLETE_GUIDE.md` - 완전 설정 가이드

---

**마지막 업데이트**: 2024년 1월
**상태**: ✅ Production Ready

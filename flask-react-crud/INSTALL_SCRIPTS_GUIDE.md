# Ubuntu 자동 설치 스크립트 사용 가이드

## 📦 설치 스크립트 종류

| 스크립트      | 파일명           | 소요시간 | 대상             |
| ------------- | ---------------- | -------- | ---------------- |
| **빠른 설치** | `quick-setup.sh` | 5-10분   | 빠른 배포 필요시 |
| **완전 설치** | `setup.sh`       | 15-30분  | 프로덕션 환경    |

---

## 🚀 방법 1: 빠른 설치 (권장)

가장 빠르게 설치하는 방법입니다. Docker만 포함되며, Nginx/SSL은 나중에 수동 설정 가능합니다.

### 단계

```bash
# 1. 스크립트 다운로드
wget https://raw.githubusercontent.com/yourname/flask-react-crud/main/quick-setup.sh

# 또는 파일 복사
cd /opt
git clone https://github.com/yourname/flask-react-crud.git
cd flask-react-crud

# 2. 권한 설정
chmod +x quick-setup.sh

# 3. 설치 실행
sudo ./quick-setup.sh
```

### 완료 후

```
웹 브라우저: http://your-server-ip:5000
API: http://your-server-ip:5000/api/items
```

---

## 🔧 방법 2: 완전 설치 (권장)

모든 기능을 포함한 설치입니다. Nginx, SSL, 방화벽, Systemd 서비스까지 자동 설정합니다.

### 단계

```bash
# 1. 스크립트 권한 설정
chmod +x setup.sh

# 2. 설치 실행
sudo ./setup.sh
```

### 설치 중 대화형 선택

스크립트 실행 중 다음과 같이 선택할 수 있습니다:

```
데이터베이스를 초기화하시겠습니까? (y/n): y
Nginx 리버스 프록시를 설정하시겠습니까? (y/n): y
SSL 인증서를 설정하시겠습니까? (y/n): y
방화벽을 설정하시겠습니까? (y/n): y
Systemd 서비스를 생성하시겠습니까? (y/n): y
```

### 완료 후

```
웹 브라우저: http://your-domain.com
또는: http://your-server-ip
API: http://your-domain.com/api/items
```

---

## 📋 설치 후 필수 확인

### 1. 컨테이너 상태 확인

```bash
docker-compose ps
```

출력 예시:

```
NAME          COMMAND             SERVICE   STATUS
crud_mysql    docker-entrypoint   mysql     Up 2 minutes
crud_app      python app.py       app       Up 2 minutes
```

### 2. API 테스트

```bash
# 헬스 체크
curl http://localhost:5000/api/health

# 항목 조회
curl http://localhost:5000/api/items
```

### 3. 브라우저 접속

- http://localhost:5000 (로컬)
- http://your-server-ip (원격)
- http://your-domain.com (도메인 설정 시)

### 4. 데이터베이스 확인

```bash
# MySQL 접속
docker exec -it crud_mysql mysql -u root -ppassword crud_db

# 테이블 확인
SHOW TABLES;
DESCRIBE items;
```

---

## 🔄 설치 후 초기 설정

### 1. 환경 변수 수정

```bash
sudo nano /opt/flask-react-crud/backend/.env
```

중요 설정:

```env
MYSQL_PASSWORD=복잡한_비밀번호로_변경  # 보안!
MYSQL_DB=crud_db
FLASK_ENV=production                 # 프로덕션 환경
```

변경 후 재시작:

```bash
docker-compose restart
```

### 2. 도메인 연결 (선택사항)

DNS에서 A 레코드 설정:

```
your-domain.com  A  your-server-ip
```

### 3. SSL 인증서 설정 (HTTPS)

```bash
sudo certbot --nginx -d your-domain.com
```

### 4. 방화벽 확인

```bash
sudo ufw status
```

---

## ⚠️ 설치 실패시 조치

### 네트워크 연결 오류

```bash
# DNS 확인
cat /etc/resolv.conf

# 인터넷 연결 확인
ping 8.8.8.8

# apt 캐시 초기화
sudo apt clean
sudo apt update
```

### Docker 설치 실패

```bash
# 기존 Docker 제거
sudo apt-get remove docker docker.io containerd runc

# 다시 실행
sudo ./setup.sh
```

### Node.js 빌드 오류

```bash
# Node 버전 확인
node --version

# node_modules 삭제
rm -rf /opt/flask-react-crud/frontend/node_modules

# 메모리 부족이면 스왑 설정
sudo fallocate -l 2G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
```

### MySQL 연결 실패

```bash
# 컨테이너 로그 확인
docker-compose logs mysql

# 컨테이너 재시작
docker-compose restart mysql

# 완전 초기화
docker-compose down -v
docker-compose up -d
```

---

## 📊 시스템 요구사항 확인

### CPU/메모리

```bash
# CPU 정보
nproc

# 메모리 확인
free -h

# 추천: 최소 2GB RAM, 2 CPU
```

### 디스크

```bash
# 디스크 사용량
df -h

# 추천: 최소 20GB 여유 공간
```

### 네트워크

```bash
# 인터넷 속도 테스트
speedtest-cli

# 포트 확인
sudo netstat -tlnp | grep 5000
```

---

## 🛠️ 운영 가이드

### 매일 실행 명령어

```bash
# 상태 확인
docker-compose ps

# 용량 확인
docker system df

# 백업
docker-compose exec -T mysql mysqldump -u root -ppassword crud_db > backup.sql
```

### 주간 실행

```bash
# 시스템 업데이트
sudo apt update && sudo apt upgrade -y

# Docker 정리
docker system prune -a

# 로그 정리
sudo journalctl --vacuum=1G
```

### 월간 실행

```bash
# 보안 업데이트 확인
sudo unattended-upgrade --dry-run

# 전체 백업
sudo tar -czf /backup/flask-react-crud-$(date +%Y%m%d).tar.gz /opt/flask-react-crud

# 인증서 갱신 확인 (자동 설정되어야 함)
sudo certbot renew --dry-run
```

---

## 🔐 보안 체크리스트

설치 후 다음을 반드시 확인하세요:

- [ ] MySQL 기본 비밀번호 변경
- [ ] Flask 환경 변수 설정 (FLASK_ENV=production)
- [ ] 방화벽 활성화 (SSH, HTTP, HTTPS만 허용)
- [ ] SSL 인증서 설정 (Let's Encrypt)
- [ ] 정기 백업 스케줄 설정
- [ ] 로그 모니터링 설정
- [ ] fail2ban 설치 (SSH 보호)

```bash
# fail2ban 설치 (선택사항)
sudo apt-get install -y fail2ban
sudo systemctl start fail2ban
sudo systemctl enable fail2ban
```

---

## 📞 트러블슈팅

### 자주 발생하는 문제

#### 문제: "docker: permission denied"

```bash
# 해결
sudo usermod -aG docker $USER
newgrp docker
# 새 터미널에서 다시 시도
```

#### 문제: "port 5000 is already in use"

```bash
# 포트 확인
sudo lsof -i :5000

# 프로세스 종료
sudo kill -9 <PID>

# 또는 포트 변경 (docker-compose.yml)
ports: ["8000:5000"]
```

#### 문제: "MySQL container exited"

```bash
# 로그 확인
docker-compose logs mysql

# 완전 초기화
docker-compose down -v
docker-compose up -d
```

#### 문제: "npm install 실패"

```bash
# 캐시 제거
npm cache clean --force

# node_modules 삭제
rm -rf /opt/flask-react-crud/frontend/node_modules
rm /opt/flask-react-crud/frontend/package-lock.json

# 다시 설치
npm install
```

---

## 📚 다음 단계

1. **커스터마이제이션**: 애플리케이션 코드 수정
2. **모니터링**: Prometheus + Grafana 추가
3. **CDN**: CloudFlare 연결
4. **이메일**: SMTP 설정
5. **백업**: 자동 백업 스크립트 설정

---

## 📞 지원

### 로그 확인 방법

```bash
# Docker 로그
docker-compose logs -f

# 시스템 로그
sudo journalctl -u flask-react-crud -f

# 특정 서비스 로그
docker-compose logs -f app
docker-compose logs -f mysql
```

### 정보 수집

문제 보고시 다음 정보를 포함하세요:

```bash
# 우분투 버전
lsb_release -a

# 설치된 패키지 버전
docker --version
docker-compose --version
node --version
python3 --version

# 컨테이너 상태
docker-compose ps
docker system df

# 최근 로그
docker-compose logs --tail 50
```

---

**버전**: 1.0.0
**마지막 업데이트**: 2024년 1월
**상태**: ✅ Production Ready

# Ubuntu 설치 스크립트 - 빠른 참조

## 🎯 한눈에 보기

```
Flask-React-CRUD Ubuntu 설치 스크립트
├── quick-setup.sh              (⚡ 빠른 설치: 5-10분)
├── setup.sh                    (🔧 완전 설치: 15-30분)
├── UBUNTU_INSTALLATION.md      (📖 상세 가이드)
└── INSTALL_SCRIPTS_GUIDE.md    (📋 스크립트 가이드)
```

---

## ⚡ 빠른 설치 (추천)

```bash
# Ubuntu 서버에서
cd /opt
git clone https://github.com/yourname/flask-react-crud.git
cd flask-react-crud
chmod +x quick-setup.sh
sudo ./quick-setup.sh
```

**5-10분 후:**

```
✓ Docker 설치
✓ Node.js 설치
✓ React 빌드
✓ 컨테이너 실행 완료

👉 http://your-server-ip:5000
```

---

## 🔧 완전 설치 (Nginx + SSL 포함)

```bash
cd /opt/flask-react-crud
chmod +x setup.sh
sudo ./setup.sh
```

**설치 중 선택:**

```
✓ 데이터베이스 초기화? (y)
✓ Nginx 설정? (y)
✓ SSL 인증서? (y) - 도메인 필요
✓ 방화벽? (y)
✓ Systemd 서비스? (y)
```

**완료 후:**

```
👉 http://your-domain.com
또는 http://your-server-ip
```

---

## 📌 설치 후 필수 확인

```bash
# 1. 컨테이너 상태
docker-compose ps

# 2. API 테스트
curl http://localhost:5000/api/health

# 3. 웹 접속
# 브라우저: http://server-ip:5000
```

---

## 🛠️ 자주 사용하는 명령어

| 작업          | 명령어                   |
| ------------- | ------------------------ |
| **상태 확인** | `docker-compose ps`      |
| **로그 보기** | `docker-compose logs -f` |
| **재시작**    | `docker-compose restart` |
| **중지**      | `docker-compose down`    |
| **시작**      | `docker-compose up -d`   |
| **초기화**    | `docker-compose down -v` |

---

## ⚠️ 문제 해결

| 문제             | 해결                                             |
| ---------------- | ------------------------------------------------ |
| Docker 권한 오류 | `sudo usermod -aG docker $USER && newgrp docker` |
| MySQL 안 뜸      | `docker-compose logs mysql`                      |
| 포트 충돌        | `sudo lsof -i :5000`                             |
| 느린 설치        | 메모리 확인: `free -h`                           |

---

## 📖 더 자세한 정보

- **UBUNTU_INSTALLATION.md** - 수동 설치 및 상세 설명
- **INSTALL_SCRIPTS_GUIDE.md** - 스크립트 사용 가이드
- **QUICKSTART.md** - 빠른 시작
- **README.md** - 전체 문서

---

## ✅ 설치 완료 체크리스트

```
[ ] Docker 설치됨
[ ] Node.js 설치됨
[ ] React 빌드됨
[ ] 컨테이너 실행 중
[ ] MySQL 데이터베이스 작동
[ ] Flask API 응답
[ ] React UI 접속 가능
[ ] CRUD 기능 테스트 완료
```

---

## 📞 긴급 명령어

```bash
# 로그 보기
docker-compose logs -f

# 컨테이너 재시작
docker-compose restart

# 모든 컨테이너 중지
docker-compose down

# 모든 데이터 삭제 (주의!)
docker-compose down -v

# 시스템 용량 확인
df -h

# 메모리 확인
free -h
```

---

**설치 시간**: ⚡ 5-10분 (빠른 설치)
**준비 상태**: ✅ Production Ready
**지원**: Ubuntu 20.04+

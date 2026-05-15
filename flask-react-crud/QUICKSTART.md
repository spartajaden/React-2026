# 빠른 시작 가이드

## Windows에서 빠르게 시작하기

### 1단계: React 빌드

PowerShell에서:

```powershell
cd frontend
npm install
npm run build
```

### 2단계: Docker Compose 실행

```powershell
# 프로젝트 루트에서
docker-compose up -d
```

### 3단계: 접속

브라우저에서 `http://localhost:5000` 열기

---

## 로컬 개발 (Docker 없이)

### MySQL 설치 필요:

- Windows: MySQL Community Server 설치
- 또는 Docker로만 MySQL 실행:
  ```powershell
  docker run -d --name crud_mysql -e MYSQL_ROOT_PASSWORD=password -e MYSQL_DATABASE=crud_db -p 3306:3306 mysql:8.0
  ```

### 백엔드 실행

```powershell
cd backend
python -m venv venv
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt

# .env 파일 생성
cp .env.example .env

# 실행
python app.py
```

### 프론트엔드 실행 (새 터미널)

```powershell
cd frontend
npm install
npm run dev
```

브라우저: `http://localhost:3000`

---

## 일반적인 명령어

```powershell
# 컨테이너 상태 확인
docker-compose ps

# 로그 확인
docker-compose logs -f app
docker-compose logs -f mysql

# 컨테이너 중지
docker-compose down

# 데이터 삭제
docker-compose down -v

# 재구축
docker-compose up -d --build
```

## 문제 해결

| 문제             | 해결책                                            |
| ---------------- | ------------------------------------------------- |
| MySQL 연결 오류  | `docker-compose logs mysql` 확인, 컨테이너 재시작 |
| 포트 사용 중     | `docker-compose.yml` 에서 포트 번호 변경          |
| React 빌드 실패  | `npm install` 재실행, node_modules 삭제 후 재설치 |
| React 앱이 안 뜸 | 빌드 확인: `ls frontend/dist`                     |

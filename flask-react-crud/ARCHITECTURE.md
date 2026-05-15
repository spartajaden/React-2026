# Flask-React-CRUD 애플리케이션

이 프로젝트는 Flask 백엔드, React 프론트엔드, MySQL 데이터베이스를 Docker로 통합한 완전한 CRUD 애플리케이션입니다.

## 핵심 기능

- ✅ **완전한 CRUD 기능**: Create, Read, Update, Delete
- ✅ **RESTful API**: Flask로 구현된 REST API
- ✅ **반응형 UI**: React로 구현된 현대적 사용자 인터페이스
- ✅ **MySQL 데이터베이스**: 영구 데이터 저장소
- ✅ **Docker 통합**: docker-compose로 쉬운 배포
- ✅ **같은 네트워크 통신**: 컨테이너들이 안전하게 통신
- ✅ **정적 파일 서빙**: Flask에서 React 빌드 파일 서빙

## 아키텍처

```
┌─────────────────────────────────────────────────────┐
│                   Docker Network                     │
├─────────────────────────────────────────────────────┤
│                                                      │
│  ┌──────────────┐    ┌──────────────┐   ┌────────┐│
│  │   Frontend   │    │   Backend    │   │ MySQL  ││
│  │  (Port 80)   │    │ (Port 5000)  │   │(3306)  ││
│  │  - React App │───▶│  - Flask API │──▶│  Data  ││
│  │  - Vite Dev  │    │  - REST      │   │ Store  ││
│  │  - Dist      │    │  - Serve     │   │        ││
│  └──────────────┘    │    Static    │   └────────┘│
│                      └──────────────┘               │
│                                                      │
└─────────────────────────────────────────────────────┘
```

## 빠른 시작

### 최소 요구사항

- Docker & Docker Compose
- 또는 Python 3.11+ & Node.js 18+

### Docker로 실행 (권장)

1. **React 빌드**:

   ```bash
   cd frontend
   npm install
   npm run build
   cd ..
   ```

2. **Docker Compose 실행**:

   ```bash
   docker-compose up -d
   ```

3. **접속**:
   - 브라우저: `http://localhost:5000`

### 로컬에서 실행 (개발용)

#### 백엔드

```bash
cd backend
pip install -r requirements.txt
python app.py
# http://localhost:5000
```

#### 프론트엔드 (새 터미널)

```bash
cd frontend
npm install
npm run dev
# http://localhost:3000
```

## 프로젝트 구조

```
flask-react-crud/
├── backend/
│   ├── app.py                  # Flask 애플리케이션
│   ├── config.py               # 설정
│   ├── requirements.txt         # Python 의존성
│   ├── Dockerfile              # Flask 이미지
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── components/
│   │   │   ├── ItemForm.jsx
│   │   │   └── ItemList.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── Dockerfile
│   └── dist/                   # 빌드 결과 (자동 생성)
├── docker-compose.yml
├── README.md
└── QUICKSTART.md
```

## API 엔드포인트

### 항목 조회

```http
GET /api/items
```

### 단일 항목 조회

```http
GET /api/items/:id
```

### 항목 생성

```http
POST /api/items
Content-Type: application/json

{
  "title": "항목 제목",
  "description": "항목 설명",
  "status": "pending"
}
```

### 항목 수정

```http
PUT /api/items/:id
Content-Type: application/json

{
  "title": "수정된 제목",
  "description": "수정된 설명",
  "status": "in-progress"
}
```

### 항목 삭제

```http
DELETE /api/items/:id
```

### 헬스 체크

```http
GET /api/health
```

## 상태 종류

- `pending` - 대기중
- `in-progress` - 진행중
- `completed` - 완료

## 기술 스택

### 백엔드

- **Flask** 3.0.0 - Python 웹 프레임워크
- **Flask-CORS** - Cross-Origin 요청 처리
- **Flask-MySQLdb** - MySQL 데이터베이스 연결
- **python-dotenv** - 환경 변수 관리

### 프론트엔드

- **React** 18.2 - UI 라이브러리
- **Vite** 5.0 - 빌드 도구
- **Axios** - HTTP 클라이언트

### 데이터베이스

- **MySQL** 8.0

### DevOps

- **Docker** - 컨테이너화
- **Docker Compose** - 오케스트레이션

## 개발 가이드

### 로컬 백엔드 개발

```bash
cd backend
pip install -r requirements.txt
pip install -e .  # 개발 모드

# .env 파일 생성
cp .env.example .env

python app.py
```

### 로컬 프론트엔드 개발

```bash
cd frontend
npm install
npm run dev
```

Vite의 프록시 설정으로 `/api/*` 요청이 자동으로 Flask로 전달됩니다.

### 데이터베이스 테이블 구조

```sql
CREATE TABLE items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

## Docker 명령어

```bash
# 컨테이너 시작
docker-compose up -d

# 로그 확인
docker-compose logs -f

# 특정 서비스 로그
docker-compose logs -f app
docker-compose logs -f mysql

# 컨테이너 중지
docker-compose stop

# 컨테이너 삭제
docker-compose down

# 볼륨까지 삭제 (주의!)
docker-compose down -v

# 재빌드
docker-compose up -d --build

# 컨테이너 상태 확인
docker-compose ps
```

## 문제 해결

### MySQL 연결 실패

```bash
# 1. 컨테이너 확인
docker-compose ps

# 2. 로그 확인
docker-compose logs mysql

# 3. 재시작
docker-compose restart mysql
```

### React 빌드 실패

```bash
# 1. node_modules 재설치
cd frontend
rm -rf node_modules
npm install

# 2. 빌드 재실행
npm run build
```

### 포트 충돌

`docker-compose.yml`에서 포트 번호 변경:

```yaml
ports:
  - "8000:5000" # 호스트 포트 변경
```

## 배포

### 프로덕션 빌드

```bash
cd frontend
npm run build

cd ../backend
# production 환경 변수 설정
```

### Docker 이미지 배포

```bash
# 이미지 빌드
docker build -f frontend/Dockerfile -t myapp:latest .

# 레지스트리에 푸시
docker tag myapp:latest myregistry/myapp:latest
docker push myregistry/myapp:latest
```

## 라이선스

MIT

## 기여

이슈 제출 및 Pull Request를 환영합니다.

## 추가 리소스

- [Flask 문서](https://flask.palletsprojects.com/)
- [React 문서](https://react.dev/)
- [Vite 문서](https://vitejs.dev/)
- [Docker 문서](https://docs.docker.com/)

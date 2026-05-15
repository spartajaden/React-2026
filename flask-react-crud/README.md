# Flask + React + MySQL CRUD 애플리케이션

## 프로젝트 구조

```
flask-react-crud/
├── backend/                   # Flask 서버
│   ├── app.py                # 메인 애플리케이션
│   ├── config.py             # 설정 파일
│   ├── requirements.txt       # Python 의존성
│   ├── Dockerfile            # Flask 도커 이미지
│   └── .env.example          # 환경 변수 예제
├── frontend/                  # React 애플리케이션
│   ├── src/
│   │   ├── App.jsx           # 메인 React 컴포넌트
│   │   ├── components/
│   │   │   ├── ItemForm.jsx  # 입력 폼 컴포넌트
│   │   │   └── ItemList.jsx  # 항목 목록 컴포넌트
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── Dockerfile            # React + 빌드 도커 이미지
│   └── dist/                 # 빌드 결과물 (자동 생성)
├── docker-compose.yml        # Docker Compose 설정
└── README.md                 # 이 파일

```

## 기능 설명

### 백엔드 (Flask)

- **REST API 엔드포인트**:
  - `GET /api/items` - 모든 항목 조회
  - `GET /api/items/<id>` - 특정 항목 조회
  - `POST /api/items` - 새 항목 생성
  - `PUT /api/items/<id>` - 항목 수정
  - `DELETE /api/items/<id>` - 항목 삭제
  - `GET /api/health` - 헬스 체크

- **정적 파일 서빙**: React 빌드된 dist 폴더의 파일들을 서빙

### 프론트엔드 (React)

- 항목 목록 조회
- 새 항목 추가
- 항목 수정
- 항목 삭제
- 상태 관리 (pending, in-progress, completed)

### 데이터베이스 (MySQL)

- `items` 테이블:
  - `id` - 항목 ID (자동 증가)
  - `title` - 항목 제목
  - `description` - 항목 설명
  - `status` - 항목 상태 (pending, in-progress, completed)
  - `created_at` - 생성 시간
  - `updated_at` - 수정 시간

## 설치 및 실행

### 사전 요구사항

- Docker
- Docker Compose

### 1단계: React 빌드

```bash
cd frontend
npm install
npm run build
```

빌드된 파일은 `frontend/dist` 폴더에 생성됩니다.

### 2단계: Docker Compose로 실행

```bash
# 프로젝트 루트 디렉토리에서
docker-compose up -d
```

또는 로그를 보면서 실행:

```bash
docker-compose up
```

### 3단계: 접속

브라우저에서 `http://localhost:5000` 으로 접속합니다.

## 개발 모드 (로컬에서)

### 백엔드 개발

```bash
cd backend

# 환경 설정
cp .env.example .env

# 의존성 설치
pip install -r requirements.txt

# 실행
python app.py
```

Flask 서버는 `http://localhost:5000` 에서 실행됩니다.

### 프론트엔드 개발

```bash
cd frontend

# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

React 개발 서버는 `http://localhost:3000` 에서 실행됩니다.
Vite 설정의 프록시로 인해 `/api/*` 요청은 Flask 서버로 자동 전달됩니다.

## 환경 변수

`backend/.env` 파일에서 설정:

```
MYSQL_HOST=mysql          # Docker 네트워크에서는 'mysql', 로컬에서는 'localhost'
MYSQL_USER=root
MYSQL_PASSWORD=password
MYSQL_DB=crud_db
MYSQL_PORT=3306
```

## Docker 컨테이너 관리

### 로그 확인

```bash
docker-compose logs -f app
docker-compose logs -f mysql
```

### 컨테이너 중지

```bash
docker-compose down
```

### 데이터 삭제 (주의!)

```bash
docker-compose down -v  # 볼륨도 함께 삭제
```

## 문제 해결

### MySQL 연결 오류

- MySQL 컨테이너가 정상 구동 중인지 확인:
  ```bash
  docker-compose ps
  ```
- 헬스 체크 로그 확인:
  ```bash
  docker-compose logs mysql
  ```

### React 빌드 오류

- node_modules 제거 후 재설치:
  ```bash
  cd frontend
  rm -rf node_modules
  npm install
  npm run build
  ```

### 포트 충돌

- 이미 사용 중인 포트가 있으면 `docker-compose.yml` 에서 포트 번호 변경
- 예: `"8000:5000"` (호스트:컨테이너)

## API 사용 예제

### 항목 조회

```bash
curl http://localhost:5000/api/items
```

### 항목 생성

```bash
curl -X POST http://localhost:5000/api/items \
  -H "Content-Type: application/json" \
  -d '{
    "title": "새 항목",
    "description": "항목 설명",
    "status": "pending"
  }'
```

### 항목 수정

```bash
curl -X PUT http://localhost:5000/api/items/1 \
  -H "Content-Type: application/json" \
  -d '{
    "title": "수정된 항목",
    "description": "수정된 설명",
    "status": "in-progress"
  }'
```

### 항목 삭제

```bash
curl -X DELETE http://localhost:5000/api/items/1
```

## 배포 고려사항

프로덕션 배포 시:

1. **Flask 서버**:
   - `debug=False` 설정
   - Gunicorn 같은 WSGI 서버 사용
   - 환경 변수 안전하게 관리

2. **React 빌드**:
   - 이미 docker-compose의 빌드 단계에서 생성됨

3. **데이터베이스**:
   - 강력한 비밀번호 설정
   - 정기적인 백업 설정
   - 볼륨 마운트 위치 보안 검토

4. **네트워크**:
   - HTTPS 활성화
   - CORS 정책 검토
   - 방화벽 규칙 설정

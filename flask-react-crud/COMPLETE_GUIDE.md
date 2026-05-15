# Flask-React-CRUD 프로젝트 완성 가이드

## 📋 프로젝트 개요

Flask 백엔드와 React 프론트엔드를 Docker로 통합한 완전한 CRUD 애플리케이션입니다. MySQL 데이터베이스와 함께 같은 네트워크에서 통신합니다.

## 🎯 주요 기능

✅ **REST API** - Flask로 구현된 완전한 CRUD API
✅ **React UI** - 현대적인 사용자 인터페이스
✅ **MySQL 데이터베이스** - 안정적인 데이터 저장소
✅ **Docker 통합** - 컨테이너화된 배포
✅ **정적 파일 서빙** - Flask에서 React dist 폴더 서빙

## 📁 프로젝트 구조

```
flask-react-crud/
├── backend/
│   ├── app.py                 # Flask 메인 애플리케이션
│   ├── config.py              # 설정
│   ├── init_db.py             # DB 초기화 스크립트
│   ├── requirements.txt        # Python 의존성
│   ├── Dockerfile             # Flask 도커 이미지
│   ├── .env.example
│   └── tests/
│       └── test_api.py
├── frontend/
│   ├── src/
│   │   ├── App.jsx            # 메인 컴포넌트
│   │   ├── components/
│   │   │   ├── ItemForm.jsx   # 입력 폼
│   │   │   └── ItemList.jsx   # 목록 표시
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── Dockerfile             # 프로덕션 빌드
│   ├── Dockerfile.dev         # 개발 환경
│   ├── .eslintrc
│   └── dist/                  # 빌드 결과 (자동 생성)
├── docker-compose.yml         # 프로덕션
├── docker-compose.dev.yml     # 개발 환경
├── start.bat / start.sh       # 빠른 시작 스크립트
├── clean.bat / clean.sh       # 정리 스크립트
├── README.md
├── QUICKSTART.md
├── ARCHITECTURE.md
├── API_TESTING.md
├── CONTRIBUTING.md
└── .gitignore
```

## 🚀 빠른 시작

### Windows

```powershell
# React 빌드
cd frontend
npm install
npm run build
cd ..

# Docker 실행
docker-compose up -d

# 브라우저에서 접속
# http://localhost:5000
```

또는 자동 스크립트 실행:

```powershell
start.bat
```

### Mac/Linux

```bash
cd frontend
npm install
npm run build
cd ..

docker-compose up -d

# 브라우저에서 접속
# http://localhost:5000
```

또는:

```bash
chmod +x start.sh
./start.sh
```

## 🛠 개발 환경 설정

### 백엔드 (Flask)

```bash
cd backend

# 가상 환경 생성
python -m venv venv

# 활성화 (Windows)
venv\Scripts\activate

# 활성화 (Mac/Linux)
source venv/bin/activate

# 의존성 설치
pip install -r requirements.txt

# .env 파일 생성
cp .env.example .env

# DB 초기화 (선택사항)
python init_db.py
python init_db.py seed  # 샘플 데이터 추가

# 실행
python app.py
```

### 프론트엔드 (React)

```bash
cd frontend

# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 또는 빌드
npm run build

# 또는 미리보기
npm run preview
```

## 🐳 Docker 명령어

```bash
# 컨테이너 시작 (백그라운드)
docker-compose up -d

# 컨테이너 시작 (로그 보면서)
docker-compose up

# 로그 확인
docker-compose logs -f

# 특정 서비스 로그
docker-compose logs -f app
docker-compose logs -f mysql

# 컨테이너 중지
docker-compose stop

# 컨테이너 제거
docker-compose down

# 볼륨 포함 제거 (주의!)
docker-compose down -v

# 재빌드
docker-compose up -d --build

# 상태 확인
docker-compose ps

# 개발 환경으로 실행
docker-compose -f docker-compose.dev.yml up
```

## 📡 API 엔드포인트

### 기본 URL

```
http://localhost:5000/api
```

### 엔드포인트 목록

| Method | Endpoint     | 설명           |
| ------ | ------------ | -------------- |
| GET    | `/items`     | 모든 항목 조회 |
| GET    | `/items/:id` | 특정 항목 조회 |
| POST   | `/items`     | 새 항목 생성   |
| PUT    | `/items/:id` | 항목 수정      |
| DELETE | `/items/:id` | 항목 삭제      |
| GET    | `/health`    | 헬스 체크      |

### 예제

**모든 항목 조회:**

```bash
curl http://localhost:5000/api/items
```

**새 항목 생성:**

```bash
curl -X POST http://localhost:5000/api/items \
  -H "Content-Type: application/json" \
  -d '{
    "title": "항목 제목",
    "description": "항목 설명",
    "status": "pending"
  }'
```

**항목 수정:**

```bash
curl -X PUT http://localhost:5000/api/items/1 \
  -H "Content-Type: application/json" \
  -d '{
    "title": "수정된 제목",
    "status": "in-progress"
  }'
```

**항목 삭제:**

```bash
curl -X DELETE http://localhost:5000/api/items/1
```

## 🗄 데이터베이스 구조

### items 테이블

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

### 상태 종류

- `pending` - 대기중
- `in-progress` - 진행중
- `completed` - 완료

## 🔧 환경 변수

`backend/.env` 파일:

```env
MYSQL_HOST=mysql          # Docker: mysql, 로컬: localhost
MYSQL_USER=root
MYSQL_PASSWORD=password
MYSQL_DB=crud_db
MYSQL_PORT=3306
```

## 📝 테스트

### API 테스트

```bash
# 방법 1: cURL 사용 (API_TESTING.md 참고)
curl http://localhost:5000/api/items

# 방법 2: Python
python
>>> import requests
>>> response = requests.get('http://localhost:5000/api/items')
>>> print(response.json())

# 방법 3: 자동 테스트
cd backend
pytest tests/
```

## 📊 네트워크 아키텍처

```
┌─────────────────────────────────────────┐
│      Docker Network (crud_network)      │
├─────────────────────────────────────────┤
│                                         │
│  Frontend              Backend          │
│  (React + Dist)    (Flask API)          │
│  :80        ◄─────────────►  :5000      │
│             │                │          │
│             ├────────────────┤          │
│                    │          │         │
│             MySQL Database   │         │
│             :3306 ◄──────────┘         │
│                                         │
└─────────────────────────────────────────┘
```

## 🐛 문제 해결

### MySQL 연결 오류

```bash
# MySQL 상태 확인
docker-compose ps

# 로그 확인
docker-compose logs mysql

# 재시작
docker-compose restart mysql

# 완전 재구축
docker-compose down -v
docker-compose up -d --build
```

### React 빌드 오류

```bash
cd frontend

# node_modules 재설치
rm -rf node_modules
npm install

# 캐시 제거
npm cache clean --force

# 재빌드
npm run build
```

### 포트 충돌

`docker-compose.yml`에서 포트 변경:

```yaml
ports:
  - "8000:5000" # 호스트 포트 변경
```

### Flask 앱이 실행 안 됨

```bash
# 1. 의존성 확인
pip install -r requirements.txt

# 2. DB 연결 확인
python -c "from app import get_db_connection; print(get_db_connection())"

# 3. 환경 변수 확인
cat .env
```

## 📚 추가 문서

- [README.md](README.md) - 상세 문서
- [QUICKSTART.md](QUICKSTART.md) - 빠른 시작
- [ARCHITECTURE.md](ARCHITECTURE.md) - 아키텍처 설명
- [API_TESTING.md](API_TESTING.md) - API 테스트 가이드
- [CONTRIBUTING.md](CONTRIBUTING.md) - 기여 가이드

## 🔐 보안 고려사항

### 개발 환경

- Flask `debug=True` 설정 (현재 설정)
- 기본 비밀번호 사용

### 프로덕션 환경 (배포 시)

1. **Flask 설정**

   ```python
   app.run(debug=False)  # 디버그 모드 비활성화
   ```

2. **Gunicorn 사용**

   ```bash
   pip install gunicorn
   gunicorn -w 4 app:app
   ```

3. **환경 변수 보안**

   ```bash
   export MYSQL_PASSWORD=strongpassword
   export FLASK_SECRET_KEY=randomkey
   ```

4. **CORS 제한**

   ```python
   CORS(app, origins=["https://yourdomain.com"])
   ```

5. **HTTPS 설정**
   - Nginx로 리버스 프록시 구성
   - SSL 인증서 설정

## 🤝 기여하기

1. Fork 저장소
2. Feature 브랜치 생성: `git checkout -b feature/amazing`
3. 변경사항 커밋: `git commit -m 'Add amazing feature'`
4. 브랜치에 Push: `git push origin feature/amazing`
5. Pull Request 생성

## 📄 라이선스

MIT License

## 📞 지원

문제나 질문이 있으시면:

1. GitHub Issues 확인
2. API_TESTING.md의 문제 해결 섹션 참고
3. 세부 로그 확인: `docker-compose logs -f`

---

**마지막 업데이트**: 2024년 1월
**프로젝트 버전**: 1.0.0

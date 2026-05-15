# Flask-React-CRUD 기여 가이드

## 개발 환경 설정

### 1. 저장소 클론

```bash
git clone <repository-url>
cd flask-react-crud
```

### 2. 백엔드 설정

```bash
cd backend

# 가상 환경 생성
python -m venv venv

# 활성화
# Windows:
venv\Scripts\activate
# Unix/Mac:
source venv/bin/activate

# 의존성 설치
pip install -r requirements.txt

# 개발 서버 실행
python app.py
```

### 3. 프론트엔드 설정

```bash
cd frontend

# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

## 코드 스타일

### Python

- PEP 8 준수
- 함수와 클래스 위에 docstring 작성
- Type hints 사용 권장

### JavaScript/React

- ESLint 설정 준수
- 구조적 props 검증
- 함수형 컴포넌트 사용

## 커밋 메시지 규칙

```
<타입>: <설명>

<본문>

<푸터>
```

### 타입

- `feat`: 새 기능
- `fix`: 버그 수정
- `docs`: 문서 수정
- `style`: 코드 스타일 변경
- `refactor`: 코드 리팩토링
- `test`: 테스트 추가/수정
- `chore`: 빌드, 패키지 관리 등

### 예시

```
feat: 항목 검색 기능 추가

사용자가 항목을 검색할 수 있는 기능을 추가했습니다.
검색 창이 ItemList 컴포넌트에 추가되었습니다.

Closes #123
```

## Pull Request 프로세스

1. Fork 저장소
2. 기능 브랜치 생성: `git checkout -b feature/AmazingFeature`
3. 변경사항 커밋: `git commit -m 'feat: Add AmazingFeature'`
4. 브랜치에 Push: `git push origin feature/AmazingFeature`
5. Pull Request 생성

## 테스트

### 백엔드 테스트

```bash
cd backend
pytest tests/
```

### 프론트엔드 테스트

```bash
cd frontend
npm test
```

## 버그 리포트

GitHub Issues에서:

1. 상세한 설명 작성
2. 재현 단계 명시
3. 기대 동작 vs 실제 동작 비교
4. 스크린샷/로그 첨부

## 기능 요청

GitHub Issues에서:

1. 명확한 제목
2. 상세한 설명
3. 사용 사례
4. 예상 구현 방법

## 추가 정보

- [Flask 공식 문서](https://flask.palletsprojects.com/)
- [React 공식 문서](https://react.dev/)
- [Vite 공식 문서](https://vitejs.dev/)

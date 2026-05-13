# create React App (CRA) - 개요

## 📚 목적

create React App (CRA) 은 React 를 쉽게 시작할 수 있도록 돕기 위해 만들어진 템플릿 도구입니다. 복잡한 설정 없이 바로 개발할 수 있는 환경을 제공합니다.

---

## 🎯 대상 독자

- React 를 처음 배우는 학생
- 프로젝트 구조가 필요한 개발자
- Webpack 등 불필요한 설정을 피하고 싶은 경우

---

## ⚙️ 준비물

- Node.js 설치 (v14 이상 권장)
- 명령 프롬프트 터미널

---

## 📖 핵심 개념

### 1. What is Create React App?

```bash
create-react-app`은 스탬프 프로젝트 템플릿 도구입니다. React 와 관련 도구들을 자동으로 설치하고 프로젝트 구조를 만들 수 있습니다.
```

- **왜 필요할까?**
  - React 를 설치하고 설정하는 과정이 매우 복잡하고 번거롭습니다.
  - Webpack, Babel, ESLint, Prettier 등 여러 도구를 설정해야 합니다.
  - 오류 발생 시 해결하기 어려울 수 있습니다.

- **CRA 가 어떻게 도와줄까?**
  - 자동으로 모든 도구와 설정을 만들어 줍니다.
  - 복잡한 설정을 피하고 바로 개발할 수 있습니다.
  - 많은 실수를 방지합니다.

---

### 2. How Does it Work?

```bash
# 1. 프로젝트 생성
npx create-react-app my-app

# 2. 프로젝트 이동
cd my-app

# 3. 설치 완료
npm install

# 4. 개발 시작
npm start
```

---

### 3. What's Inside?

```
my-app/
├── node_modules/          # 설치된 패키지
├── public/                # 정적 파일 (CSS, 이미지, 등)
│   ├── index.html         # 기본 HTML 파일
├── src/                   # 소스 코드
│   ├── App.js             # 주요 컴포넌트
│   ├── App.css            # 스타일
│   ├── index.js           # 진입점
│   ├── index.css          # 전역 스타일
│   └── logo.svg           # 로고
├── package.json           # 프로젝트 설정
├── public/                # 스탬프 파일
├── .gitignore             # Git 만 거부할 파일
└── README.md              # 프로젝트 설명
```

---

### 4. Why CRA?

```text
- 번거로운 설정 없이 바로 개발 가능
- 많은 개발자가 사용하는 표준
- React 공식 권장 방법
- 간단한 개발 워크플로우
```

---

## 🛠️ 단계별 절차

### 1단계: CRA 설치 및 프로젝트 생성

```bash
# create-react-app 는 npx 를 통해 실행합니다.
npx create-react-app my-app
```

**설명:**

- `npx` 는 Node.js 실행 도구입니다.
- `create-react-app` 은 CRA 를 실행할 수 있는 패키지를 실행합니다.
- `my-app` 은 프로젝트 이름입니다.

**중요 사항:**

```
- `npx` 를 사용해야 합니다. 직접 설치하지 않아도 됩니다.
- 프로젝트 이름은 영문 소문자, 공백, 특수 문자를 사용하지 마세요.
- 생성하는 시간이 약 2 ~ 5 분입니다.
```

### 2단계: 프로젝트 이동 및 의존성 설치

```bash
# 프로젝트 폴더로 이동
cd my-app

# 의존성 설치 (자동)
npm install
```

**설명:**

- `npm install`은 프로젝트가 정상적으로 작동하도록 필요한 모든 파일을 설치합니다.
- 설치 완료 후 모든 의존성 패키지가 필요합니다.

### 3단계: 개발 시작

```bash
# 개발 서버 시작
npm start

# 브라우저에서 확인
# http://localhost:3000
```

**설명:**

- `npm start`는 development 서버를 시작합니다.
- Hot Reload 기능이 있습니다. 코드를 변경하면 브라우저가 자동으로 업데이트됩니다.
- `npm start`를 시작하면 브라우저에서 자동으로 엽니다.

### 4단계: 빌드

```bash
# 개발 완료 후 빌드
npm run build

# 빌드 결과물 확인
cd build
```

**설명:**

- `npm run build`는 production 에 최적화된 빌드를 생성합니다.
- 빌드 결과물은 `build` 폴더에 저장됩니다.
- `build` 폴더를 `http://localhost:80/` 로 업로드할 수 있습니다.

### 5단계: 테스트 및 실행

```bash
# 테스트
npm test

# 프로덕션 빌드
npm run build

# 프로덕션 서버 시작
npm run serve
```

---

## ✅ 확인 방법

```bash
# 프로젝트 상태 확인
npm list

# 개발 서버 시작 후 브라우저 확인
# http://localhost:3000

# 빌드 결과물 확인
ls build
```

---

## ⚠️ 주의사항

1. **CRA 의 한계**

```
- CRA 는 단순 프로젝트에만 적합합니다.
- 대규모 프로젝트에는 CRA 가 적합하지 않습니다.
- React Native, React Webpack 등 다른 도구와 함께 사용은 가능합니다.
```

2. **대안 도구**

```bash
# 더 많은 통제력을 원한다면
npx create-react-app my-app --template typescript
npx create-react-app my-app --template default
```

3. **CRA 의 한계점**

```
- 커스텀 설정이 어렵습니다.
- 대규모 프로젝트에는 React + Webpack + Babel 조합을 사용합니다.
- CRA 는 React 공식 권장 방법이 아닙니다.
```

---

## 💡 실무 적용

### 1. 개인 프로젝트

```bash
# 개인 프로젝트
npx create-react-app my-personal-project
cd my-personal-project
npm install
npm start
```

**실무 활용:**

- 간단한 웹 애플리케이션 개발
- 포트폴리오 프로젝트
- 개인 공부용

### 2. 팀 프로젝트

```bash
# 팀 프로젝트
npx create-react-app my-team-project
cd my-team-project
npm install
```

**실무 활용:**

- 간단한 팀 프로젝트
- 초기 프로토타입
- 팀원 간 개발 협업

### 3. 프로덕션 배포

```bash
# 프로덕션 빌드
npm run build

# CDN 배포
# build 폴더를 업로드합니다.
```

**실무 활용:**

- production 서버 배포
- Webpack 의 최적화된 빌드
- CDN 사용

---

## 📈 트렌드 및 전망

### 현재 상황

```text
- CRA 는 여전히 많이 사용됩니다.
- 새로운 프로젝트는 React + Webpack 조합을 사용합니다.
- CRA 는 개인 개발에 여전히 유용합니다.
```

### 과거 vs 현재 vs 미래

| 기간      | 도구             | 특징           |
| --------- | ---------------- | -------------- |
| 2014-2019 | CRA              | 가장 많이 사용 |
| 2020-2024 | React + Webpack  | 더 많은 통제력 |
| 2025+     | Next.js, Vite 등 | 더 빠른 성능   |

### 주요 트렌드

```
1. Vite 의 부상
   - CRA 보다 더 빠릅니다.
   - Webpack 의 문제를 해결했습니다.

2. Next.js 의 성장
   - SSR/SSG 지원.
   - 더 많은 개발자 중 Next.js 를 사용합니다.

3. CRA 의 지속
   - 개인 개발에는 여전히 유용합니다.
   - 간단한 프로젝트에 적합합니다.
```

### 2025+ 전망

```text
- CRA 는 감소하는 추세입니다.
- Vite, Next.js, Remix 등의 도구로 대체되고 있습니다.
- 하지만 CRA 는 아직 많이 사용됩니다.
```

---

## 🔧 대안 도구 비교

| 도구            | 장점               | 단점                      | 적합도              |
| --------------- | ------------------ | ------------------------- | ------------------- |
| CRA             | 간편, 표준         | 느림, 제한적 커스터마이징 | 개인, 단순 프로젝트 |
| Vite            | 빠름, 유연함       | 학습 곡선                 | 대규모 프로젝트     |
| Next.js         | SSR/SSG            | 학습 곡선, 커스텀 제한    | Web/Serverless      |
| React + Webpack | 완전한 통제력      | 설정 복잡함               | 대규모 프로젝트     |
| Remix           | SSR/SSG, 타입 안전 | 커스터마이징 제한         | 서버 렌더링         |

---

## 📚 추가 참고

### 공식 문서

```bash
- https://create-react-app.dev/
- https://react.dev/learn
```

### 추가 리소스

```text
- CRA 공식 가이드: https://create-react-app.dev/docs/getting-started
- React 공식 가이드: https://react.dev/learn
- Vite 공식 가이드: https://vitejs.dev/
- Next.js 공식 가이드: https://nextjs.org/learn
```

---

## 📝 요약

```text
create React App (CRA) 은 React 개발을 쉽게 시작할 수 있도록 도와주는 템플릿 도구입니다.
간단하고 빠른 개발에 유용하지만, 대규모 프로젝트에서는 Vite 나 Next.js 가 더 적합한 대안입니다.
CRA 는 여전히 많이 사용되지만, 트렌드는 감소하고 있습니다.
```
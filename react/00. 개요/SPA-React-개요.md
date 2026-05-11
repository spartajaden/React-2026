# SPA (Single Page Application)란?

## 정의

**SPA (Single Page Application)** 는 하나의 HTML 페이지로 전체 웹 애플리케이션을 동작시키는 방식입니다.

전통적인 **MPA (Multi Page Application)** 방식은 페이지를 이동할 때마다 서버에서 새로운 HTML을 받아와서 화면을 새로 렌더링합니다.

반면, **SPA**는 최초 한 번만 페이지를 로드하고, 이후에는 JavaScript가 동적으로 콘텐츠를 교체하여 마치 여러 페이지가 있는 것처럼 동작합니다.

---

## SPA의 핵심 특징

| 항목 | 설명 |
|------|------|
| 초기 로딩 | 한 번에 필요한 리소스(HTML, CSS, JS)를 모두 다운로드 |
| 페이지 전환 | 서버 요청 없이 JavaScript로 DOM을 변경하여 화면 전환 |
| 라우팅 | 클라이언트 사이드에서 URL을 관리 (React Router 등 사용) |
| 사용자 경험 | 페이지 깜빡임 없이 부드러운 전환 |

---

## SPA의 장점

1. **빠른 화면 전환** - 서버 요청 없이 클라이언트에서 즉시 전환
2. **부드러운 사용자 경험** - 깜빡임 없는 네이티브 앱 같은 느낌
3. **서버 부하 감소** - API 통신만으로 데이터 교환 가능
4. **프론트엔드와 백엔드 분리** - 독립적인 개발과 유지보수 가능

## SPA의 단점

1. **초기 로딩 속도** - 첫 로딩 시 모든 리소스를 받아야 함
2. **SEO 문제** - 검색 엔진이 JavaScript 렌더링 결과를 제대로 크롤링하지 못할 수 있음 (단, SSR로 해결 가능)
3. **JavaScript 필수** - JS가 비활성화된 환경에서는 동작하지 않음
4. **메모리 관리** - 오래 사용하면 메모리 누수 위험

---

# React란?

**React**는 Facebook(Meta)에서 개발한 **UI 라이브러리**입니다.

SPA를 구현하는 대표적인 도구 중 하나로, **컴포넌트(Component)** 단위로 화면을 구성합니다.

> React는 프레임워크가 아니라 **라이브러리**입니다.
> 라우팅, 상태 관리, HTTP 통신 등은 별도 라이브러리를 함께 사용합니다.

---

## React의 핵심 개념

### 1. 컴포넌트 (Component)
- 화면을 작은 단위로 나누어 재사용 가능하게 만든 것
- 함수 컴포넌트가 현재 표준 방식

```jsx
function Hello() {
  return <h1>안녕하세요!</h1>;
}
```

### 2. 가상 DOM (Virtual DOM)
- 실제 DOM을 직접 조작하지 않고, 가상 DOM에서 변경사항을 비교(diff)한 후
- 최소한의 실제 DOM 업데이트만 수행
- 성능 최적화의 핵심

### 3. JSX (JavaScript XML)
- JavaScript 안에 HTML과 유사한 문법을 사용할 수 있는 확장 문법

```jsx
const element = <h1>Hello, React!</h1>;
```

### 4. 단방향 데이터 흐름
- 부모 → 자식 방향으로만 데이터 전달 (Props)
- 데이터 흐름 예측이 쉬움

### 5. 상태 관리 (State)
- 컴포넌트가 가지는 동적 데이터
- 상태가 변경되면 자동으로 리렌더링

---

## React의 장점

### 1. 컴포넌트 기반 아키텍처
- UI를 독립적인 컴포넌트로 분리하여 개발
- 컴포넌트 재사용으로 개발 생산성 향상
- 유지보수성과 테스트 용이성

### 2. 선언형 프로그래밍
- "어떻게(How)"가 아니라 "무엇을(What)" 그릴지 선언
- 코드가 직관적이고 가독성이 좋음

### 3. 풍부한 생태계
- React Router (라우팅)
- Redux, Zustand, Recoil (상태 관리)
- React Query, SWR (데이터 페칭)
- Next.js (프레임워크)

### 4. 강력한 커뮤니티
- 전 세계적으로 가장 많이 사용되는 UI 라이브러리
- 수많은 튜토리얼, 문서, 오픈소스
- Stack Overflow 등에서 문제 해결이 쉬움

### 5. 다양한 환경 지원
- 웹 (React DOM)
- 모바일 (React Native)
- 데스크톱 (Electron + React)

### 6. 뛰어난 성능
- 가상 DOM을 통한 효율적인 렌더링
- 불필요한 리렌더링 방지 (React.memo, useMemo 등)

---

## React의 단점

1. **높은 학습 곡선** - JSX, 상태 관리, 라우팅 등 추가 학습 필요
2. **빠른 버전 업데이트** - 지속적인 학습 필요 (v16 → v17 → v18 → v19)
3. **프레임워크가 아님** - 필요한 도구를 직접 선택하고 조합해야 함
4. **보일러플레이트** - 초기 설정에 필요한 코드가 많을 수 있음

---

## React를 사용하는 기업 예시

| 기업 | 사용 사례 |
|------|----------|
| Facebook (Meta) | 메인 웹, Instagram |
| Netflix | 사용자 프로필, UI |
| Airbnb | 검색 페이지, 예약 시스템 |
| Discord | 데스크톱 및 웹 앱 |
| Dropbox | 파일 관리 UI |
| Tesla | 차량 생산 관리 대시보드 |

---

## SPA + React 선택 가이드

- **소규모 프로젝트** → CDN 방식으로 간단히 시작
- **중규모 프로젝트** → Vite + React 조합 추천
- **대규모 프로젝트** → Next.js (SSR/SSG 지원) 고려
- **모바일 앱도 함께 개발** → React Native + React DOM

---

## 참고 자료

- [React 공식 문서 (한국어)](https://ko.react.dev/)
- [React GitHub 저장소](https://github.com/facebook/react)
- [Vite 공식 문서](https://ko.vitejs.dev/)
- [Next.js 공식 문서](https://nextjs.org/)
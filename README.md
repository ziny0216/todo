# TODO PROJECT
<hr>

https://todo-list-one-flax.vercel.app

React와 Ts를 사용하여 개발한 TODO입니다. <br>
이메일 로그인을 통해 회원별 TODO CURD를 할 수 있도록 구성되어있습니다.<br/>일간,주간으로 TODO 리스팅되고 월간을 통해 달성률을 확인할 수 있는 TODO입니다.




### 기술 스택
- **프론트엔드**
  - Vite
  - React
  - TypeScript
  - SCSS (Sass)
- **백엔드**:
    - Supabase


### 필요 조건
- Node.js (버전 18 이상 권장)
- npm
### 설치 단계

1. **프로젝트 클론하기**
2. 의존성 설치하기

```sh
npm install
```

3.eslint, prettier 설치 및 적용

```sh
npm install eslint --save-dev
npm install --save-dev prettier
```

### 배포

- **Vercel**을 이용하여 자동 배포
  -  Github 레퍼지토리와 연동하여 **main** 브랜치 푸시시 자동으로 빌드 및 배포

### 파일 구조 
```
src/
├── assets/           # 이이콘, 더미 이미지 
├── components/       # 재사용 가능한 React 컴포넌트
├── hooks/            # 커스텀 훅
├── pages/            # 페이지 컴포넌트
├── services/         # API 호출 로직
├── styles/           # SCSS 스타일 파일
├── types/            # 공통 타입 및 db 타입 파일
├── utils/            # 유틸리티 함수
└── App.tsx           # 애플리케이션 진입점
```
### css 파일구조
- 언더스코어(_)는 이 파일이 부분 파일임을 나타내먀 부분 파일은 다른 SCSS 파일로 import 해서 사용
```
styles/
  |- abstracts/
      |- _mixins.scss     // 반복 스타일 재사용 가능하도록 정의
      |- _variables.scss  // 전역 사용 변수
  |- base/
      |- common.scss      // 공통 scss
      |- _typography.scss // 폰트 변수
  |- main.scss            // 메인 SCSS 파일 ,rest.scss와 common.scss 포함
  |- global.scss          // 부분 파일을 모아놓은 파일
```

### 구현화면
- 등록&일간 | 주간 | 월간 순
<p align="center">
<img src="https://github.com/user-attachments/assets/be7cd50a-38cc-4087-abf8-93206d0c42d6" alt="add" width="30%">
<img src="https://github.com/user-attachments/assets/36e88332-e833-47fe-960d-4e6003275eea" alt="weeks" width="30%">
<img src="https://github.com/user-attachments/assets/a258e145-2790-4e8b-843f-587daca0a8fc" alt="monthly" width="30%">
<p>
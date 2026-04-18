# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@docs/skills/apps-in-toss.md

## 프로젝트 개요

**우리 사이 궁합은?** — 두 사람의 이름과 카테고리(연인/친구/사업)를 입력받아 결정론적 궁합 점수(0~10)를 보여주는 앱인토스(Apps in Toss) 미니앱. 자세한 기획은 `PRD.md` 참조.

기술 스택: React 19, TypeScript, Vite, Zustand, Framer Motion, Lucide React, @apps-in-toss/web-framework (Granite/Bedrock).

## 명령어

```bash
npm run dev       # 개발 서버 실행 (granite dev, localhost:5173)
npm run build     # 프로덕션 빌드 (ait build → dist/)
npm run deploy    # 앱인토스 콘솔에 배포 (ait deploy, API 키 필요)
npm run lint      # ESLint 실행
npm run format    # Prettier 포맷
```

## 아키텍처

### 진입점 흐름
`index.html` → `src/main.tsx` (React 루트 마운트) → `src/App.tsx` (앱 전체)

### 앱인토스 프레임워크 설정
`granite.config.ts` — appName, 브랜드 색상/아이콘, 로컬 포트, 권한 목록을 관리. 배포 대상과 빌드 커맨드가 여기서 결정된다.

### 단일 화면(Single Screen) 설계 원칙
PRD에 따라 **화면 전환 없이** 입력(Input Stage) ↔ 결과(Result Stage)를 상태로만 토글. `zustand` 스토어로 `nameA`, `nameB`, `category`, `stage`(input | result) 를 관리하고, `framer-motion`으로 스테이지 전환 애니메이션 처리.

### 운명 점수 산출 로직 (순수 함수, 클라이언트 전용)
```
score = (sum of Unicode values of nameA+nameB + categorySalt) % 11
categorySalt: 연인=7, 친구=3, 사업=1
```
서버 통신 없이 브라우저에서만 계산하며 데이터를 저장하지 않는다.

### 스타일
전역 CSS는 `src/index.css`, 컴포넌트 CSS는 `src/App.css`. 배경은 비비드 퍼플(`#8E2DE2`) → 핫 핑크(`#FF416C`) 그라데이션, 100vh 고정 레이아웃으로 모바일 뷰포트에 최적화.

# Project Plan

**Status**: Awaiting Integration
**Created**: 2026-10-17
**Mode**: NEW

---

## 1. Project Overview

**Goal**: 사용자의 운동 경험, 선호 카테고리, 난이도, 가용 시간과 선택적 건강 주의사항을 반영해 초보자도 시작하기 쉬운 운동을 추천하고 타이머를 제공하는 웹 MVP입니다. 개인 프로필은 브라우저 메모리에서만 처리하고 SQLite에는 건강정보와 분리된 운동 카탈로그만 저장합니다. The project is designed so that every module is independently testable.

**App Type**: SPA + API

**API Login**: No

**Mode**: NEW

**Deployment Plan**: No deployment plan found

---

## 2. Backend — Exercise API

| Component | Technology |
|-----------|-----------|
| **Language** | TypeScript |
| **Runtime** | Node |
| **Package Manager** | npm |
| **Test Runner** | vitest |
| **Mocking Library** | vi.mock |
| **Test Command** | npm test |
| **Orchestration** | docker-compose |

Express API는 운동 카탈로그와 카테고리 메타데이터만 제공합니다. SQLite 파일은 읽기 전용 카탈로그로 사용하고, 이름·체중·키·나이·건강 상태 등 개인 입력은 API 요청이나 저장소에 포함하지 않습니다. 운동 적합성 필터와 개인화는 프런트엔드 메모리에서 수행합니다.

## 3. Frontend — Exercise Web App

| Component | Technology |
|-----------|-----------|
| **Language** | TypeScript |
| **Framework** | React + Vite |
| **Package Manager** | npm |
| **Test Runner** | vitest |
| **Mocking Library** | vi.mock |
| **Test Command** | npm test |

## 4. Services Required

| Azure Service | Role in App | Environment Variable | Default Value (Local) | Classification |
|---------------|------------|---------------------|----------------------|----------------|
| Azure Static Web Apps | React SPA 호스팅 및 HTTPS 제공 | VITE_API_BASE_URL | http://localhost:3000 | Essential |
| Azure App Service | Express 운동 카탈로그 API 호스팅 | PORT | 3000 | Essential |

SQLite는 API와 함께 배포되는 읽기 전용 운동 카탈로그 파일이며 별도 Azure 데이터베이스로 운영하지 않습니다. 개인 건강 프로필을 영속 저장하지 않습니다.

## 5. Prerequisites

### Run

| Tool | Service(s) | Installed | Version |
|------|------------|-----------|---------|
| Node.js | * | ✅ | v24.15.0 |
| npm | * | ✅ | 11.12.1 |

### Debug

| Tool | Service(s) | Installed | Version |
|------|------------|-----------|---------|
| Docker | exercise-api, exercise-web | ❓ | CLI 29.4.3; engine readiness unconfirmed |
| Docker Compose | exercise-api, exercise-web | ✅ | v5.1.3 |
| Microsoft Edge | exercise-web | ✅ | 155.0.4283.45 |

Docker CLI와 Compose 명령은 확인했지만 현재 Docker 엔진 응답은 확인되지 않았습니다. 진행 전 `docker info`로 엔진이 실행 중인지 확인해 주세요. 표시된 `❓` 도구는 설치 여부가 확정되지 않았으므로 환경에서 다시 확인해야 합니다.

## 6. Design System & UI

**Component Library**: Fluent UI v9
**Style Direction**: 운동 초보자를 위한 집중형 트레이닝 콘솔입니다. 잉크색 다크 표면과 산뜻한 라임 포인트로 활력을 주고, 산호색은 안전 경고에만 사용합니다. 간결한 폼과 비교하기 쉬운 추천 목록을 우선하며 모서리는 6px 이하로 절제합니다.
**Typography**: Bahnschrift, Segoe UI Variable, sans-serif

### Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `primary` | `#B7F34A` | 운동 추천 생성, 선택된 난이도와 핵심 진행 상태 |
| `accent` | `#FF806E` | 건강 주의 및 타이머 종료 경고 |
| `surface` | `#151C18` | 운동 입력·추천·타이머 화면의 기본 배경 |
| `text` | `#F2F5EF` | 운동명, 폼 라벨, 결과 설명 |
| `muted` | `#A0ADA3` | 보조 설명, 시간·난이도 메타데이터 |
| `border` | `#36433A` | 입력 경계, 추천 행 구분, 패널 구획 |

### Pages

| Page | Route | Purpose | Layout |
|------|-------|---------|--------|
| 운동 정보 | `/` | 신체 정보와 운동 선호·시간을 입력하고 추천 조건을 설정 | `header + nav + main + form + actions + footer` |
| 추천 결과 | `/recommendations` | 조건에 맞는 운동을 비교하고 루틴 타이머를 시작 | `header + nav + main + tabs + card-list + actions + footer` |
| 운동 타이머 | `/timer` | 선택한 운동의 카운트다운을 시작·일시정지·초기화 | `header + nav + main + action-bar + footer` |

### Sample Content

운동 정보 — 입력 기본값:
| 필드 | 예시 값 |
|------|---------|
| 체중 · 키 · 나이 | 68 kg · 170 cm · 28세 |
| 운동 경험 · 난이도 | 입문 · 쉬움 |
| 선호 카테고리 · 가용 시간 | 격투 운동 · 20분 |
| 건강 주의사항 | 무릎 불편함 있음 (선택) |

추천 결과 — 운동:
| 운동 | 카테고리 | 난이도 | 시간 | 안내 |
|------|-----------|--------|------|------|
| 평지 빠르게 걷기 | 저충격 유산소 | 쉬움 | 20분 | 대화 가능한 속도로 시작 |
| 저강도 실내 사이클 | 실내 운동 | 쉬움 | 18분 | 편안한 저항으로 진행 |
| 초급 섀도복싱 | 격투 운동 | 보통 | 15분 | 점프 없이 기본 동작 연습 |
| 초급 자유형 수영 | 수상 운동 | 보통 | 25분 | 수영장 환경에서 무리 없이 진행 |
| 눈 위 평지 걷기 | 겨울 스포츠 | 쉬움 | 20분 | 미끄럼 방지 장비와 환경 확인 |

추천 결과의 빈 상태는 “조건에 맞는 운동이 없어요”와 “조건 바꾸기” 동작을 표시합니다. 로딩 상태는 추천 목록의 스켈레톤으로, 오류 상태는 재시도 동작이 있는 인라인 배너로 표현합니다. 운동 타이머 — 선택 운동: 평지 빠르게 걷기 · 설정 시간: 20분 · 시작 시 남은 시간: 20:00.

## 7. Project Structure

```text
10project/
├── .azure/
│   └── project-plan.md
├── package.json
├── .env.example
├── services/
│   ├── exercise-api/
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   ├── src/
│   │   │   ├── app.ts
│   │   │   ├── routes/
│   │   │   ├── catalog/
│   │   │   └── db/exercises.sqlite
│   │   └── tests/
│   └── exercise-web/
│       ├── package.json
│       ├── vite.config.ts
│       └── src/
│           ├── api/
│           ├── components/
│           ├── pages/
│           ├── recommendation/
│           └── timer/
└── packages/
    └── shared/
        ├── package.json
        └── src/
```

## 8. Route Definitions

| # | Method | Path | Description | Request Body | Response Body | Status Codes |
|---|--------|------|-------------|-------------|--------------|-------------|
| 1 | GET | `/api/health` | API 상태 확인 | — | `{ status: "ok" }` | 200, 503 |
| 2 | GET | `/api/categories` | 운동 카테고리 목록 조회 | — | `{ categories: [{ id, name }] }` | 200, 500 |
| 3 | GET | `/api/exercises` | 운동 카탈로그 검색. 카테고리·난이도·최대 시간으로만 필터링하며 개인 프로필은 받지 않음 | — | `{ exercises: [{ id, name, category, difficulty, durationMinutes, description, cautions }] }` | 200, 422, 500 |

모든 오류 응답은 `{ "error": { "code": "VALIDATION_ERROR", "message": "요청 값을 확인해 주세요", "details": null } }` 형태를 사용합니다. 추천에 필요한 사용자 건강 정보는 브라우저에서만 처리하고 API 오류 로그에도 포함하지 않습니다.

## 9. Next Steps

1. Run **azure-project-scaffold** to execute this plan
2. Run **azure-project-integrate** to wire the frontend to live data, smoke-test the backend, and create the migrations
3. Run **azure-debug-plan** → **azure-debug-generate** for Docker emulators and VS Code debugging
4. Run the **azure-deploy** agent when ready; it uses **azure-app-onboard** for architecture, cost estimation, IaC generation, provisioning, and health verification

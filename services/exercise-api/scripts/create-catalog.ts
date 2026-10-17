import { DatabaseSync } from 'node:sqlite';
import { mkdirSync } from 'node:fs';
import path from 'node:path';

const databasePath = path.resolve(process.env.EXERCISE_DB_PATH ?? 'src/db/exercises.sqlite');
mkdirSync(path.dirname(databasePath), { recursive: true });
const database = new DatabaseSync(databasePath);

database.exec(`
  PRAGMA journal_mode = DELETE;
  CREATE TABLE IF NOT EXISTS categories (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL UNIQUE
  );
  CREATE TABLE IF NOT EXISTS exercises (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    category_id TEXT NOT NULL REFERENCES categories(id),
    difficulty TEXT NOT NULL CHECK (difficulty IN ('easy', 'moderate', 'challenging')),
    duration_minutes INTEGER NOT NULL CHECK (duration_minutes > 0),
    description TEXT NOT NULL,
    cautions_json TEXT NOT NULL,
    image_url TEXT NOT NULL
  );
`);

const insertCategory = database.prepare('INSERT OR IGNORE INTO categories (id, name) VALUES (?, ?)');
const categories = [
  ['low-impact-cardio', '저충격 유산소'],
  ['indoor', '실내 운동'],
  ['combat', '격투 운동'],
  ['water', '수상 운동'],
  ['winter', '겨울 스포츠'],
  ['summer-sports', '여름 스포츠'],
  ['racket-sports', '라켓 스포츠'],
  ['ball-sports', '구기 운동'],
  ['outdoor-sports', '야외 스포츠'],
] as const;
for (const category of categories) insertCategory.run(...category);

const insertExercise = database.prepare(`
  INSERT OR REPLACE INTO exercises
    (id, name, category_id, difficulty, duration_minutes, description, cautions_json, image_url)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?)
`);
const exercises = [
  ['flat-fast-walk', '평지 빠르게 걷기', 'low-impact-cardio', 'easy', 20, '대화 가능한 속도로 시작', [], 'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?auto=format&fit=crop&w=900&q=85'],
  ['indoor-cycle', '저강도 실내 사이클', 'indoor', 'easy', 18, '편안한 저항으로 진행', [], 'https://images.unsplash.com/photo-1541625602330-2277c4c46182?auto=format&fit=crop&w=900&q=85'],
  ['shadow-boxing', '초급 섀도복싱', 'combat', 'moderate', 15, '점프 없이 기본 동작 연습', ['무릎 불편함이 있으면 점프 동작을 피하세요'], 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?auto=format&fit=crop&w=900&q=85'],
  ['beginner-swim', '초급 자유형 수영', 'water', 'moderate', 25, '수영장 환경에서 무리 없이 진행', ['수영장 안전 규칙을 지켜주세요'], 'https://images.unsplash.com/photo-1530549387789-4c1017266635?auto=format&fit=crop&w=900&q=85'],
  ['snow-walk', '눈 위 평지 걷기', 'winter', 'easy', 20, '미끄럼 방지 장비와 환경 확인', ['미끄러운 환경에서는 진행하지 마세요'], 'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&w=900&q=85'],
  ['beach-frisbee', '해변 프리스비 던지기', 'summer-sports', 'easy', 20, '넓고 안전한 장소에서 가볍게 주고받기', ['햇볕이 강한 시간에는 휴식과 수분 섭취를 챙기세요'], 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=900&q=85'],
  ['beginner-paddleboard', '초급 패들보드', 'summer-sports', 'moderate', 30, '잔잔한 물과 안전 장비를 갖춘 환경에서 진행', ['구명조끼를 착용하고 안전 요원의 안내를 따르세요'], 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=900&q=85'],
  ['beach-volleyball', '가벼운 비치발리볼', 'summer-sports', 'moderate', 30, '점프를 줄이고 기본 패스부터 연습', ['더운 날에는 충분히 쉬고 수분을 보충하세요'], 'https://images.unsplash.com/photo-1505666287802-931dc83948e9?auto=format&fit=crop&w=900&q=85'],
  ['beginner-badminton', '초급 배드민턴', 'racket-sports', 'easy', 20, '가벼운 랠리로 풋워크와 타이밍 익히기', ['주변 공간을 확인하고 준비 운동을 하세요'], 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=900&q=85'],
  ['table-tennis', '탁구 기초 랠리', 'racket-sports', 'easy', 15, '편안한 속도로 짧은 랠리 이어가기', [], 'https://images.unsplash.com/photo-1611251135345-18c56206b863?auto=format&fit=crop&w=900&q=85'],
  ['beginner-tennis', '테니스 벽치기 연습', 'racket-sports', 'moderate', 30, '가까운 거리에서 천천히 기본 스트로크 연습', ['팔과 어깨에 불편감이 있으면 쉬어 주세요'], 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?auto=format&fit=crop&w=900&q=85'],
  ['basketball-shooting', '가벼운 농구 슈팅', 'ball-sports', 'easy', 20, '가까운 거리에서 슛 동작과 공 다루기 연습', ['무릎 불편함이 있으면 점프 동작을 피하세요'], 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=900&q=85'],
  ['soccer-passing', '축구 패스 연습', 'ball-sports', 'easy', 20, '가벼운 패스와 공 컨트롤 연습', ['평평하고 장애물이 없는 장소에서 진행하세요'], 'https://images.unsplash.com/photo-1521412644187-c49fa049e84d?auto=format&fit=crop&w=900&q=85'],
  ['beginner-futsal', '초급 풋살 드리블', 'ball-sports', 'moderate', 30, '천천히 방향 전환과 공 컨트롤 연습', ['운동화를 착용하고 무리한 방향 전환은 피하세요'], 'https://images.unsplash.com/photo-1574629810360-7efbb5c4f6b4?auto=format&fit=crop&w=900&q=85'],
  ['trail-hiking', '초급 숲길 걷기', 'outdoor-sports', 'moderate', 30, '완만하고 익숙한 코스를 천천히 걷기', ['날씨와 코스 상태를 확인하고 물을 챙기세요'], 'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=900&q=85'],
  ['outdoor-cycling', '평지 야외 자전거', 'outdoor-sports', 'easy', 30, '자전거 도로에서 편안한 속도로 주행', ['헬멧을 착용하고 교통 규칙을 지켜주세요'], 'https://images.unsplash.com/photo-1541625602330-2277c4c46182?auto=format&fit=crop&w=900&q=85'],
] as const;
for (const exercise of exercises) {
  insertExercise.run(exercise[0], exercise[1], exercise[2], exercise[3], exercise[4], exercise[5], JSON.stringify(exercise[6]), exercise[7]);
}

database.exec('PRAGMA query_only = ON');
database.close();
console.info(`Exercise catalog created at ${databasePath}`);

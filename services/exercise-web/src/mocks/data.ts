import type { Exercise, ExerciseCategory } from '@fitmotion/shared';

export const categories: ExerciseCategory[] = [
  { id: 'low-impact-cardio', name: '저충격 유산소' },
  { id: 'indoor', name: '실내 운동' },
  { id: 'combat', name: '격투 운동' },
  { id: 'water', name: '수상 운동' },
  { id: 'winter', name: '겨울 스포츠' },
  { id: 'summer-sports', name: '여름 스포츠' },
  { id: 'racket-sports', name: '라켓 스포츠' },
  { id: 'ball-sports', name: '구기 운동' },
  { id: 'outdoor-sports', name: '야외 스포츠' },
];

export const exercises: Exercise[] = [
  { id: 'flat-fast-walk', name: '평지 빠르게 걷기', category: categories[0], difficulty: 'easy', durationMinutes: 20, description: '대화 가능한 속도로 시작', cautions: [], imageUrl: 'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?auto=format&fit=crop&w=900&q=85' },
  { id: 'indoor-cycle', name: '저강도 실내 사이클', category: categories[1], difficulty: 'easy', durationMinutes: 18, description: '편안한 저항으로 진행', cautions: [], imageUrl: 'https://images.unsplash.com/photo-1541625602330-2277c4c46182?auto=format&fit=crop&w=900&q=85' },
  { id: 'shadow-boxing', name: '초급 섀도복싱', category: categories[2], difficulty: 'moderate', durationMinutes: 15, description: '점프 없이 기본 동작 연습', cautions: ['무릎 불편함이 있으면 점프 동작을 피하세요'], imageUrl: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?auto=format&fit=crop&w=900&q=85' },
  { id: 'beginner-swim', name: '초급 자유형 수영', category: categories[3], difficulty: 'moderate', durationMinutes: 25, description: '수영장 환경에서 무리 없이 진행', cautions: ['수영장 안전 규칙을 지켜주세요'], imageUrl: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?auto=format&fit=crop&w=900&q=85' },
  { id: 'snow-walk', name: '눈 위 평지 걷기', category: categories[4], difficulty: 'easy', durationMinutes: 20, description: '미끄럼 방지 장비와 환경 확인', cautions: ['미끄러운 환경에서는 진행하지 마세요'], imageUrl: 'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&w=900&q=85' },
  { id: 'beach-frisbee', name: '해변 프리스비 던지기', category: categories[5], difficulty: 'easy', durationMinutes: 20, description: '넓고 안전한 장소에서 가볍게 주고받기', cautions: ['햇볕이 강한 시간에는 휴식과 수분 섭취를 챙기세요'], imageUrl: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=900&q=85' },
  { id: 'beginner-paddleboard', name: '초급 패들보드', category: categories[5], difficulty: 'moderate', durationMinutes: 30, description: '잔잔한 물과 안전 장비를 갖춘 환경에서 진행', cautions: ['구명조끼를 착용하고 안전 요원의 안내를 따르세요'], imageUrl: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=900&q=85' },
  { id: 'beach-volleyball', name: '가벼운 비치발리볼', category: categories[5], difficulty: 'moderate', durationMinutes: 30, description: '점프를 줄이고 기본 패스부터 연습', cautions: ['더운 날에는 충분히 쉬고 수분을 보충하세요'], imageUrl: 'https://images.unsplash.com/photo-1505666287802-931dc83948e9?auto=format&fit=crop&w=900&q=85' },
  { id: 'beginner-badminton', name: '초급 배드민턴', category: categories[6], difficulty: 'easy', durationMinutes: 20, description: '가벼운 랠리로 풋워크와 타이밍 익히기', cautions: ['주변 공간을 확인하고 준비 운동을 하세요'], imageUrl: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=900&q=85' },
  { id: 'table-tennis', name: '탁구 기초 랠리', category: categories[6], difficulty: 'easy', durationMinutes: 15, description: '편안한 속도로 짧은 랠리 이어가기', cautions: [], imageUrl: 'https://images.unsplash.com/photo-1611251135345-18c56206b863?auto=format&fit=crop&w=900&q=85' },
  { id: 'beginner-tennis', name: '테니스 벽치기 연습', category: categories[6], difficulty: 'moderate', durationMinutes: 30, description: '가까운 거리에서 천천히 기본 스트로크 연습', cautions: ['팔과 어깨에 불편감이 있으면 쉬어 주세요'], imageUrl: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?auto=format&fit=crop&w=900&q=85' },
  { id: 'basketball-shooting', name: '가벼운 농구 슈팅', category: categories[7], difficulty: 'easy', durationMinutes: 20, description: '가까운 거리에서 슛 동작과 공 다루기 연습', cautions: ['무릎 불편함이 있으면 점프 동작을 피하세요'], imageUrl: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=900&q=85' },
  { id: 'soccer-passing', name: '축구 패스 연습', category: categories[7], difficulty: 'easy', durationMinutes: 20, description: '가벼운 패스와 공 컨트롤 연습', cautions: ['평평하고 장애물이 없는 장소에서 진행하세요'], imageUrl: 'https://images.unsplash.com/photo-1521412644187-c49fa049e84d?auto=format&fit=crop&w=900&q=85' },
  { id: 'beginner-futsal', name: '초급 풋살 드리블', category: categories[7], difficulty: 'moderate', durationMinutes: 30, description: '천천히 방향 전환과 공 컨트롤 연습', cautions: ['운동화를 착용하고 무리한 방향 전환은 피하세요'], imageUrl: 'https://images.unsplash.com/photo-1574629810360-7efbb5c4f6b4?auto=format&fit=crop&w=900&q=85' },
  { id: 'trail-hiking', name: '초급 숲길 걷기', category: categories[8], difficulty: 'moderate', durationMinutes: 30, description: '완만하고 익숙한 코스를 천천히 걷기', cautions: ['날씨와 코스 상태를 확인하고 물을 챙기세요'], imageUrl: 'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=900&q=85' },
  { id: 'outdoor-cycling', name: '평지 야외 자전거', category: categories[8], difficulty: 'easy', durationMinutes: 30, description: '자전거 도로에서 편안한 속도로 주행', cautions: ['헬멧을 착용하고 교통 규칙을 지켜주세요'], imageUrl: 'https://images.unsplash.com/photo-1541625602330-2277c4c46182?auto=format&fit=crop&w=900&q=85' },
];

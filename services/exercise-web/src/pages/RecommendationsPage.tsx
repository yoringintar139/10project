import { Body1, Button, Card, CardFooter, CardHeader, MessageBar, MessageBarBody, Skeleton, SkeletonItem, Tab, TabList, Text, Title1, Title2 } from '@fluentui/react-components';
import { ArrowLeftRegular, ClockRegular, PlayRegular, SparkleRegular, WarningRegular } from '@fluentui/react-icons';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Exercise } from '@fitmotion/shared';
import type { ExerciseCategory } from '@fitmotion/shared';
import { api } from '../api';
import { subscribePreviewState } from '../api/previewState';
import type { ExerciseProfile } from '../state/profile';
import { filterExercises } from '../recommendation/filterExercises';
const labels: Record<Exercise['difficulty'], string> = { easy: '쉬움', moderate: '보통', challenging: '도전' };

export function RecommendationsPage({ profile, onChoose }: { profile: ExerciseProfile; onChoose: (exercise: Exercise) => void }) {
  const navigate = useNavigate();
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [categoryList, setCategoryList] = useState<ExerciseCategory[]>([]);
  const [status, setStatus] = useState<'loading' | 'error' | 'data'>('loading');
  const [category, setCategory] = useState('all');
  async function load() { setStatus('loading'); try { const [items, availableCategories] = await Promise.all([api.listExercises({ maxDurationMinutes: profile.availableMinutes }), api.getCategories()]); setExercises(items); setCategoryList(availableCategories); setStatus('data'); } catch { setStatus('error'); } }
  useEffect(() => { const unsubscribe = subscribePreviewState(() => void load()); void load(); return unsubscribe; }, [profile.availableMinutes]);
  const recommended = useMemo(() => filterExercises(exercises, profile), [exercises, profile]);
  const shown = (category === 'all' ? recommended : recommended.filter((item) => item.category.id === category));
  function start(item: Exercise) { onChoose(item); navigate(`/timer?id=${encodeURIComponent(item.id)}`); }

  return <main className="page-shell">
    <div className="page-heading"><div><p className="eyebrow"><SparkleRegular /> FITMOTION · 추천 결과</p><Title1>오늘의 추천 운동</Title1><Body1 className="page-intro">부담 없이 시작할 수 있는 운동을 골랐어요. 지금 컨디션에 맞춰 하나씩 살펴보세요.</Body1></div></div>
    <Card className="conditions-panel" appearance="filled-alternative"><div className="section-heading compact-heading"><div><p className="section-kicker">YOUR CONDITIONS</p><Title2>선택한 조건</Title2></div><Text size={200} className="muted-copy">이번 추천에 반영했어요</Text></div><div className="condition-chips"><span className="condition-chip condition-chip--primary">입문</span><span className="condition-chip">{labels[profile.difficulty]}</span><span className="condition-chip">{profile.availableMinutes}분</span><span className="condition-chip">{profile.kneeDiscomfort ? '무릎 주의 반영' : '주의사항 없음'}</span></div><Text className="muted-copy">{profile.kneeDiscomfort ? '무릎 부담이 있는 운동은 제외했어요. 불편감이 생기면 중단하세요.' : '편안한 강도로 진행하고 몸의 신호를 살펴보세요.'}</Text></Card>
    <TabList selectedValue={category} onTabSelect={(_event, data) => setCategory(String(data.value))}><Tab value="all" icon={<SparkleRegular />}>추천 운동 <span className="tab-count">{recommended.length}</span></Tab>{categoryList.map((item) => <Tab key={item.id} value={item.id}>{item.name} ({recommended.filter((exercise) => exercise.category.id === item.id).length})</Tab>)}</TabList>
    <section><div className="section-heading list-title-row"><div><p className="section-kicker">MATCHED FOR YOU</p><Title2>추천 운동</Title2></div><Text size={200} className="muted-copy">{shown.length}가지 · 시간과 난이도를 비교해 보세요</Text></div>
      {status === 'loading' && <div className="exercise-grid" aria-busy="true" aria-label="추천 운동 불러오는 중">{[0, 1, 2].map((n) => <Card key={n} className="exercise-card"><Skeleton><SkeletonItem size={128} /><SkeletonItem size={24} /><SkeletonItem size={14} /></Skeleton></Card>)}</div>}
      {status === 'error' && <MessageBar intent="error"><MessageBarBody>추천 운동을 불러오지 못했어요. <Button appearance="subtle" onClick={() => void load()}>다시 시도</Button></MessageBarBody></MessageBar>}
      {status === 'data' && shown.length === 0 && <Card className="empty-state" appearance="filled-alternative"><WarningRegular className="empty-icon" /><Title2>조건에 맞는 운동이 없어요</Title2><Body1>가용 시간이나 난이도를 조정해 다시 찾아보세요.</Body1><Button appearance="primary" icon={<ArrowLeftRegular />} onClick={() => navigate('/')}>조건 바꾸기</Button></Card>}
      {status === 'data' && shown.length > 0 && <div className="exercise-grid">{shown.map((item) => <Card key={item.id} className="exercise-card" appearance="filled-alternative"><CardHeader header={<Text weight="semibold">{item.name}</Text>} description={<Text size={200} className="muted-copy">{item.description}</Text>} /><div className="exercise-meta"><span className="condition-chip condition-chip--primary">{item.category.name}</span><span className="condition-chip">{labels[item.difficulty]}</span><span className="meta-time"><ClockRegular /> {item.durationMinutes}분</span></div>{item.cautions.length > 0 && <p className="exercise-caution"><WarningRegular /> {item.cautions[0]}</p>}<CardFooter><Button appearance="primary" icon={<PlayRegular />} onClick={() => start(item)}>{item.name} 시작</Button></CardFooter></Card>)}</div>}
    </section>
    <div className="page-actions"><Button appearance="subtle" icon={<ArrowLeftRegular />} onClick={() => navigate('/')}>조건 수정</Button>{recommended[0] && <Button appearance="primary" icon={<PlayRegular />} onClick={() => start(recommended[0])}>{recommended[0].name} 시작</Button>}</div>
  </main>;
}

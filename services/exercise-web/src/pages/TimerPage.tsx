import { Body1, Button, Card, MessageBar, MessageBarBody, ProgressBar, Text, Title1, Title2 } from '@fluentui/react-components';
import { ArrowResetRegular, PauseRegular, PlayRegular, TimerRegular, WarningRegular } from '@fluentui/react-icons';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { Exercise } from '@fitmotion/shared';

export function TimerPage({ exercise }: { exercise: Exercise | null }) {
  const [params] = useSearchParams();
  const duration = (exercise?.durationMinutes ?? 20) * 60;
  const [left, setLeft] = useState(duration);
  const [running, setRunning] = useState(true);
  const [finished, setFinished] = useState(false);
  useEffect(() => { if (!running || left <= 0) return; const timer = window.setInterval(() => setLeft((value) => Math.max(0, value - 1)), 1000); return () => window.clearInterval(timer); }, [running, left]);
  useEffect(() => { if (left === 0) { setRunning(false); setFinished(true); } }, [left]);
  function reset() { setLeft(duration); setRunning(false); setFinished(false); }
  const elapsed = duration - left;
  return <main className="page-shell timer-page"><div className="page-heading"><div><p className="eyebrow"><TimerRegular /> 오늘의 루틴</p><Title1>운동 타이머</Title1><Body1 className="page-intro">내 페이스에 맞춰 남은 시간을 확인해 보세요.</Body1></div></div>
    <Card className="timer-panel" appearance="filled-alternative"><div className="section-heading"><div><p className="section-kicker">NOW MOVING</p><Title2>현재 운동</Title2></div><span className={`status-label ${finished ? 'status-label--finished' : ''}`}><span className="status-dot" />{finished ? '완료' : running ? '진행 중' : '일시정지'}</span></div>
      <div className="timer-content"><Text className="eyebrow">{exercise?.name ?? '평지 빠르게 걷기'}</Text><Text className="muted-copy">전체 운동 시간 · {exercise?.durationMinutes ?? 20}분</Text><div className="timer-readout" aria-label={`남은 시간 ${Math.floor(left / 60)}분 ${left % 60}초`}>{String(Math.floor(left / 60)).padStart(2, '0')}:{String(left % 60).padStart(2, '0')}</div><ProgressBar value={elapsed / duration} max={1} className="timer-progress" aria-label="운동 진행률" /><Text size={200} className="muted-copy">{Math.round(elapsed / duration * 100)}% 완료 · {Math.floor(elapsed / 60)}분 경과</Text></div>
      {finished && <MessageBar intent="success"><MessageBarBody>운동을 마쳤어요. 오늘의 움직임, 잘했어요.</MessageBarBody></MessageBar>}{!exercise && params.get('id') && <MessageBar intent="warning"><MessageBarBody><WarningRegular /> 선택한 운동을 찾지 못해 기본 타이머를 표시하고 있어요.</MessageBarBody></MessageBar>}
      <div className="page-actions timer-actions"><Button appearance="secondary" icon={<ArrowResetRegular />} onClick={reset}>타이머 초기화</Button><Button appearance="primary" icon={running ? <PauseRegular /> : <PlayRegular />} onClick={() => setRunning((value) => !value)} disabled={finished}>{running ? '일시정지' : '운동 시작'}</Button></div>
    </Card></main>;
}

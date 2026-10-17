import { Body1, Button, Card, Checkbox, Dropdown, Field, Input, MessageBar, MessageBarBody, Option, Radio, RadioGroup, Skeleton, SkeletonItem, Text, Title1, Title2 } from '@fluentui/react-components';
import { ArrowRightRegular, HeartPulseRegular, WarningRegular } from '@fluentui/react-icons';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api';
import { getPreviewState, subscribePreviewState } from '../api/previewState';
import type { ExerciseCategory } from '@fitmotion/shared';
import { initialProfile, type ExerciseProfile } from '../state/profile';

export function ProfilePage({ onProfileSubmit }: { onProfileSubmit: (profile: ExerciseProfile) => void }) {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(initialProfile);
  const [categories, setCategories] = useState<ExerciseCategory[]>([]);
  const [status, setStatus] = useState<'loading' | 'error' | 'data'>('loading');
  const [formError, setFormError] = useState('');

  async function loadCategories() {
    setStatus('loading');
    try { setCategories(await api.getCategories()); setStatus('data'); }
    catch { setStatus('error'); }
  }
  useEffect(() => { const unsubscribe = subscribePreviewState(() => void loadCategories()); void loadCategories(); return unsubscribe; }, []);
  function update<K extends keyof ExerciseProfile>(key: K, value: ExerciseProfile[K]) { setProfile((current) => ({ ...current, [key]: value })); }
  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!event.currentTarget.reportValidity()) return;
    if (getPreviewState() === 'empty') { setFormError('조건에 맞는 운동 정보가 없어요. 상태를 바꾸거나 다시 시도해 주세요.'); return; }
    setFormError(''); onProfileSubmit(profile); navigate('/recommendations');
  }

  return <main className="page-shell">
    <div className="page-heading"><div><p className="eyebrow"><HeartPulseRegular /> 나에게 맞는 운동 찾기</p><Title1>운동 정보</Title1><Body1 className="page-intro">현재 컨디션과 선호하는 운동을 알려주세요. 오늘 시작하기 좋은 운동을 찾아드릴게요.</Body1></div><span className="status-label"><span className="status-dot" /> 프로필 설정</span></div>
    <Card className="form-panel" appearance="filled-alternative">
      <div className="section-heading"><div><p className="section-kicker">YOUR BASELINE</p><Title2>기본 정보와 운동 선호</Title2></div><Text size={200} className="muted-copy">입력 정보는 이 브라우저에서만 사용됩니다.</Text></div>
      {status === 'loading' && <div className="form-loading" aria-label="카테고리 불러오는 중" aria-busy="true"><Skeleton><SkeletonItem size={40} /></Skeleton><Skeleton><SkeletonItem size={40} /></Skeleton></div>}
      {status === 'error' && <MessageBar intent="error"><MessageBarBody>운동 정보를 불러오지 못했어요. <Button appearance="subtle" onClick={() => void loadCategories()}>다시 시도</Button></MessageBarBody></MessageBar>}
      {status === 'data' && categories.length === 0 && <div className="empty-state compact-empty"><WarningRegular className="empty-icon" /><Text weight="semibold">운동 카테고리가 아직 없어요</Text><Button appearance="primary" onClick={() => void loadCategories()}>카테고리 다시 불러오기</Button></div>}
      <form className="profile-form" onSubmit={submit}>
        <Field label="체중" hint="kg" validationState="warning" validationMessage="추천에만 사용하며 저장하지 않아요."><Input type="number" min={1} max={300} value={String(profile.weightKg)} onChange={(_event, data) => update('weightKg', Number(data.value))} required /></Field>
        <Field label="키" hint="cm"><Input type="number" min={1} max={250} value={String(profile.heightCm)} onChange={(_event, data) => update('heightCm', Number(data.value))} required /></Field>
        <Field label="나이" hint="세"><Input type="number" min={1} max={120} value={String(profile.age)} onChange={(_event, data) => update('age', Number(data.value))} required /></Field>
        <Field label="운동 경험"><Dropdown value={profile.experience === 'beginner' ? '입문' : profile.experience === 'intermediate' ? '중급' : '숙련'} selectedOptions={[profile.experience]} onOptionSelect={(_event, data) => update('experience', data.optionValue as ExerciseProfile['experience'])}><Option value="beginner">입문</Option><Option value="intermediate">중급</Option><Option value="advanced">숙련</Option></Dropdown></Field>
        <Field label="운동 카테고리"><Dropdown value={categories.find((item) => item.id === profile.categoryId)?.name ?? '카테고리 선택'} selectedOptions={[profile.categoryId]} onOptionSelect={(_event, data) => update('categoryId', data.optionValue ?? '')} disabled={status !== 'data' || categories.length === 0}>{categories.map((item) => <Option key={item.id} value={item.id}>{item.name}</Option>)}</Dropdown></Field>
        <Field label="난이도"><RadioGroup layout="horizontal" value={profile.difficulty} onChange={(_event, data) => update('difficulty', data.value as ExerciseProfile['difficulty'])}><Radio value="easy" label="쉬움" /><Radio value="moderate" label="보통" /><Radio value="challenging" label="도전" /></RadioGroup></Field>
        <Field label="가용 시간"><Dropdown value={`${profile.availableMinutes}분`} selectedOptions={[String(profile.availableMinutes)]} onOptionSelect={(_event, data) => update('availableMinutes', Number(data.optionValue))}>{[10, 20, 30, 45, 60].map((minutes) => <Option key={minutes} value={String(minutes)} text={`${minutes}분`}>{minutes}분</Option>)}</Dropdown></Field>
        <Field className="wide-field" label="불편한 부위" hint="선택 사항"><Checkbox checked={profile.kneeDiscomfort} onChange={(_event, data) => update('kneeDiscomfort', Boolean(data.checked))} label="무릎 불편함 있음" /><Text size={200} className="muted-copy">불편감이 생기면 운동을 멈추고 필요하면 전문가와 상담하세요.</Text></Field>
        {formError && <MessageBar intent="warning" className="wide-field"><MessageBarBody>{formError}</MessageBarBody></MessageBar>}
        <div className="form-actions wide-field"><Button appearance="primary" icon={<ArrowRightRegular />} iconPosition="after" type="submit" disabled={status !== 'data' || categories.length === 0}>추천 운동 보기</Button></div>
      </form>
    </Card>
    <section className="safety-note"><WarningRegular /><div><Title2>운동 전 확인해 주세요</Title2><Text>추천은 일반적인 운동 정보이며 의료 조언이나 진단이 아닙니다. 건강 상태가 걱정된다면 운동 전에 의료 전문가와 상담해 주세요.</Text></div></section>
  </main>;
}

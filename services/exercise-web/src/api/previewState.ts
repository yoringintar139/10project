export type PreviewDataState = 'data' | 'loading' | 'empty' | 'error';

const states: PreviewDataState[] = ['data', 'loading', 'empty', 'error'];
const listeners = new Set<() => void>();
const queryState = new URLSearchParams(window.location.search).get('previewState');
const savedState = window.localStorage.getItem('previewState');
const initialState = import.meta.env.PROD ? 'data' : queryState ?? savedState;
let currentState: PreviewDataState = states.includes(initialState as PreviewDataState) ? initialState as PreviewDataState : 'data';

export function getPreviewState(): PreviewDataState {
  return import.meta.env.PROD ? 'data' : currentState;
}

export function subscribePreviewState(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function setPreviewState(state: PreviewDataState): void {
  if (import.meta.env.PROD) return;
  currentState = state;
  window.localStorage.setItem('previewState', state);
  listeners.forEach((listener) => listener());
}

export async function beforeMockResponse(): Promise<void> {
  const state = getPreviewState();
  if (state === 'loading') return new Promise(() => undefined);
  if (state === 'error') throw new Error('운동 카탈로그에 연결할 수 없어요.');
}

import { Tab, TabList, Text } from '@fluentui/react-components';
import { useSyncExternalStore } from 'react';
import { getPreviewState, setPreviewState, subscribePreviewState, type PreviewDataState } from '../api/previewState';

const choices: PreviewDataState[] = ['data', 'loading', 'empty', 'error'];

export function DataStateSwitcher() {
  const currentState = useSyncExternalStore(subscribePreviewState, getPreviewState, () => 'data');
  if (!import.meta.env.DEV) return null;
  return <aside className="state-switcher" aria-label="Preview data state">
    <Text size={100} weight="semibold">Preview</Text>
    <TabList size="small" selectedValue={currentState} onTabSelect={(_event, data) => setPreviewState(data.value as PreviewDataState)}>
      {choices.map((state) => <Tab key={state} value={state}>{state}</Tab>)}
    </TabList>
  </aside>;
}

import { Button, FluentProvider, Tab, TabList, Toolbar, createDarkTheme, createLightTheme, type BrandVariants } from '@fluentui/react-components';
import { HomeRegular, SparkleRegular, TimerRegular, WeatherMoonRegular, WeatherSunnyRegular } from '@fluentui/react-icons';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { DataStateSwitcher } from './DataStateSwitcher';

const brand: BrandVariants = { 10: '#090d05', 20: '#171f0c', 30: '#293914', 40: '#3d561c', 50: '#527425', 60: '#69932d', 70: '#81b336', 80: '#9ad43e', 90: '#a9e545', 100: '#b7f34a', 110: '#c5f66f', 120: '#d1f88d', 130: '#ddfaab', 140: '#e8fbc7', 150: '#f1fddd', 160: '#f9feef' };
type ThemeChoice = 'light' | 'dark' | 'system';
const readTheme = (): ThemeChoice => {
  const saved = localStorage.getItem('app-theme');
  return saved === 'light' || saved === 'dark' || saved === 'system' ? saved : 'system';
};
const systemTheme = () => matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

export function AppShell({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [choice, setChoice] = useState<ThemeChoice>(readTheme);
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>(() => {
    const savedChoice = readTheme();
    return savedChoice === 'system' ? systemTheme() : savedChoice;
  });
  const selected = location.pathname === '/recommendations' ? 'recommendations' : location.pathname === '/timer' ? 'timer' : 'profile';

  useEffect(() => {
    const media = matchMedia('(prefers-color-scheme: dark)');
    const update = () => { if (choice === 'system') setResolvedTheme(systemTheme()); };
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, [choice]);

  function toggleTheme() {
    const next = resolvedTheme === 'dark' ? 'light' : 'dark';
    setChoice(next);
    setResolvedTheme(next);
    localStorage.setItem('app-theme', next);
  }

  const fluentTheme = resolvedTheme === 'dark' ? createDarkTheme(brand) : createLightTheme(brand);
  return <FluentProvider theme={fluentTheme}>
    <div className={`app-frame theme-${resolvedTheme}`}>
      <header className="app-header"><Toolbar className="header-toolbar">
        <button className="brand-lockup" type="button" onClick={() => navigate('/')} aria-label="FitMotion 홈"><span className="brand-mark">FM</span><span>FitMotion</span></button>
        <span className="header-spacer" />
        <Button appearance="subtle" icon={resolvedTheme === 'dark' ? <WeatherSunnyRegular /> : <WeatherMoonRegular />} aria-label="테마 전환" title="테마 전환" onClick={toggleTheme} />
      </Toolbar></header>
      <nav className="primary-nav" aria-label="주요 메뉴"><TabList selectedValue={selected} onTabSelect={(_event, data) => navigate(data.value === 'profile' ? '/' : `/${data.value}`)}>
        <Tab value="profile" icon={<HomeRegular />}>운동 정보</Tab><Tab value="recommendations" icon={<SparkleRegular />}>추천 운동</Tab><Tab value="timer" icon={<TimerRegular />}>운동 타이머</Tab>
      </TabList></nav>
      <AnimatePresence mode="wait" initial={false}><motion.div key={location.pathname} className="route-content" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: .2 }}>{children}</motion.div></AnimatePresence>
      <footer className="app-footer"><span>FitMotion · 움직임에서 시작하는 오늘의 운동</span><span>운동 정보는 일반적인 참고용이며 의료 조언이 아닙니다.</span></footer>
      <DataStateSwitcher />
    </div>
  </FluentProvider>;
}

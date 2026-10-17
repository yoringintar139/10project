import type { Exercise } from '@fitmotion/shared';
import { useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AppShell } from './components/AppShell';
import { ProfilePage } from './pages/ProfilePage';
import { RecommendationsPage } from './pages/RecommendationsPage';
import { TimerPage } from './pages/TimerPage';
import { initialProfile, type ExerciseProfile } from './state/profile';

function AppRoutes() {
  const [profile, setProfile] = useState<ExerciseProfile>(initialProfile);
  const [exercise, setExercise] = useState<Exercise | null>(null);
  return <AppShell><Routes><Route path="/" element={<ProfilePage onProfileSubmit={setProfile} />} /><Route path="/recommendations" element={<RecommendationsPage profile={profile} onChoose={setExercise} />} /><Route path="/timer" element={<TimerPage exercise={exercise} />} /><Route path="*" element={<Navigate to="/" replace />} /></Routes></AppShell>;
}

export default function App() { return <BrowserRouter><AppRoutes /></BrowserRouter>; }

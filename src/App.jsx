import AppShell from './app/AppShell';
import { useAppState } from './hooks/useAppState';
import LoginPage from './pages/LoginPage';

export default function App() {
  const appState = useAppState();

  if (!appState.isAuthenticated) {
    return <LoginPage onLogin={() => appState.setIsAuthenticated(true)} />;
  }

  return <AppShell appState={appState} />;
}

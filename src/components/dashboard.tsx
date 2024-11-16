import { Peers } from './peers';
import { ServerStatus } from './server-status';
import { ThemeToggle } from './theme-toggle';
import { Shield, LogOut, Settings } from 'lucide-react';
import { Button } from './ui/button';
import { useAuth } from '@/contexts/auth-context';
import { useState } from 'react';
import { SettingsDialog } from './settings-dialog';

export function Dashboard() {
  const { user, logout } = useAuth();
  const [showSettings, setShowSettings] = useState(false);

  return (
    <div className="w-full max-w-[1400px] mx-auto p-6 pt-4">
      <header className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Shield className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-2xl font-bold">WireGuard Manager</h1>
            <p className="text-sm text-muted-foreground">
              Logged in as {user?.username}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Button
            variant="outline"
            size="icon"
            onClick={() => setShowSettings(true)}
          >
            <Settings className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={logout}>
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </header>

      <div className="space-y-6">
        <ServerStatus />
        <Peers />
      </div>

      <SettingsDialog open={showSettings} onOpenChange={setShowSettings} />
    </div>
  );
}
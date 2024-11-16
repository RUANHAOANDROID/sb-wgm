import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { Dashboard } from '@/components/dashboard';
import { Login } from '@/components/login';
import { AuthProvider, useAuth } from '@/contexts/auth-context';

function AuthenticatedApp() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return isAuthenticated ? <Dashboard /> : <Login />;
}

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="wireguard-ui-theme">
      <AuthProvider>
        <div className="min-h-screen bg-background">
          <AuthenticatedApp />
          <Toaster />
        </div>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
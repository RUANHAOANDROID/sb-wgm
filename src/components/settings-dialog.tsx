import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import type { WireGuardSettings } from '@/models/settings';
import { defaultSettings } from '@/models/settings';

interface SettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SettingsDialog({ open, onOpenChange }: SettingsDialogProps) {
  const [settings, setSettings] = useState<WireGuardSettings>(defaultSettings);
  const { toast } = useToast();

  useEffect(() => {
    // In a real app, fetch settings from the server
    setSettings(defaultSettings);
  }, []);

  const handleSave = async () => {
    try {
      // In a real app, save settings to the server
      toast({
        title: 'Settings saved',
        description: 'Global settings have been updated successfully',
      });
      onOpenChange(false);
    } catch (error) {
      toast({
        title: 'Error saving settings',
        description: 'Failed to save global settings',
        variant: 'destructive',
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Global Settings</DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="server" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="server">Server</TabsTrigger>
            <TabsTrigger value="network">Network</TabsTrigger>
            <TabsTrigger value="dns">DNS</TabsTrigger>
            <TabsTrigger value="scripts">Scripts</TabsTrigger>
          </TabsList>

          <TabsContent value="server" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="serverAddress">Server Address</Label>
                <Input
                  id="serverAddress"
                  value={settings.serverAddress}
                  onChange={(e) =>
                    setSettings({ ...settings, serverAddress: e.target.value })
                  }
                  placeholder="10.0.0.1/24"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="serverPort">Server Port</Label>
                <Input
                  id="serverPort"
                  type="number"
                  value={settings.serverPort}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      serverPort: parseInt(e.target.value),
                    })
                  }
                  placeholder="51820"
                />
              </div>
              <div className="space-y-2 col-span-2">
                <Label htmlFor="serverPublicKey">Server Public Key</Label>
                <Input
                  id="serverPublicKey"
                  value={settings.serverPublicKey}
                  onChange={(e) =>
                    setSettings({ ...settings, serverPublicKey: e.target.value })
                  }
                  placeholder="Public key"
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="network" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="mtu">MTU</Label>
                <Input
                  id="mtu"
                  type="number"
                  value={settings.mtu}
                  onChange={(e) =>
                    setSettings({ ...settings, mtu: parseInt(e.target.value) })
                  }
                  placeholder="1420"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="keepalive">Persistent Keepalive (seconds)</Label>
                <Input
                  id="keepalive"
                  type="number"
                  value={settings.keepalive}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      keepalive: parseInt(e.target.value),
                    })
                  }
                  placeholder="25"
                />
              </div>
              <div className="space-y-2 col-span-2">
                <Label htmlFor="endpoint">Endpoint</Label>
                <Input
                  id="endpoint"
                  value={settings.endpoint}
                  onChange={(e) =>
                    setSettings({ ...settings, endpoint: e.target.value })
                  }
                  placeholder="wg.example.com:51820"
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="dns" className="space-y-4">
            <div className="space-y-2">
              <Label>DNS Servers</Label>
              <div className="space-y-2">
                {settings.dns.map((dns, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={dns}
                      onChange={(e) => {
                        const newDns = [...settings.dns];
                        newDns[index] = e.target.value;
                        setSettings({ ...settings, dns: newDns });
                      }}
                      placeholder="1.1.1.1"
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => {
                        const newDns = settings.dns.filter((_, i) => i !== index);
                        setSettings({ ...settings, dns: newDns });
                      }}
                    >
                      ×
                    </Button>
                  </div>
                ))}
                <Button
                  variant="outline"
                  onClick={() =>
                    setSettings({ ...settings, dns: [...settings.dns, ''] })
                  }
                >
                  Add DNS Server
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="scripts" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="preUp">Pre-Up Script</Label>
                <Textarea
                  id="preUp"
                  value={settings.preUp}
                  onChange={(e) =>
                    setSettings({ ...settings, preUp: e.target.value })
                  }
                  placeholder="Script to run before interface is brought up"
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="postUp">Post-Up Script</Label>
                <Textarea
                  id="postUp"
                  value={settings.postUp}
                  onChange={(e) =>
                    setSettings({ ...settings, postUp: e.target.value })
                  }
                  placeholder="Script to run after interface is brought up"
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="preDown">Pre-Down Script</Label>
                <Textarea
                  id="preDown"
                  value={settings.preDown}
                  onChange={(e) =>
                    setSettings({ ...settings, preDown: e.target.value })
                  }
                  placeholder="Script to run before interface is taken down"
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="postDown">Post-Down Script</Label>
                <Textarea
                  id="postDown"
                  value={settings.postDown}
                  onChange={(e) =>
                    setSettings({ ...settings, postDown: e.target.value })
                  }
                  placeholder="Script to run after interface is taken down"
                  rows={3}
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
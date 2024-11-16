import { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { 
  PlusCircle, 
  Trash2, 
  Download, 
  Upload,
  QrCode
} from 'lucide-react';
import { AddPeerDialog } from './add-peer-dialog';
import { QRCodeDialog } from './qr-code-dialog';
import { PeerGroups } from './peer-groups';
import { useToast } from '@/hooks/use-toast';
import { fetchPeers, updatePeer, deletePeer } from '@/lib/api';
import type { Peer } from '@/models/peer';

export function Peers() {
  const [peers, setPeers] = useState<Peer[]>([]);
  const [showAddPeer, setShowAddPeer] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState('all');
  const [selectedPeer, setSelectedPeer] = useState<Peer | null>(null);
  const [showQRCode, setShowQRCode] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchPeers()
      .then(setPeers)
      .catch((error) => {
        toast({
          title: "Failed to fetch peers",
          description: error.message,
          variant: "destructive"
        });
      });
  }, [toast]);

  const filteredPeers = peers.filter(
    (peer) => selectedGroup === 'all' || peer.groupId === selectedGroup
  );

  const handleImportPeers = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const content = e.target?.result as string;
          const importedPeers = JSON.parse(content);
          toast({
            title: "Peers imported successfully",
            description: `Imported ${importedPeers.length} peers`
          });
        } catch (error) {
          toast({
            title: "Import failed",
            description: "Invalid file format",
            variant: "destructive"
          });
        }
      };
      reader.readAsText(file);
    }
  };

  const handleExportPeers = () => {
    const data = JSON.stringify(peers, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'wireguard-peers.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Peers exported successfully",
      description: "Your peers configuration has been downloaded"
    });
  };

  const handleShowQRCode = (peer: Peer) => {
    setSelectedPeer(peer);
    setShowQRCode(true);
  };

  const handleDeletePeer = async (peer: Peer) => {
    try {
      await deletePeer(peer.id);
      setPeers(peers.filter(p => p.id !== peer.id));
      toast({
        title: "Peer deleted",
        description: `Deleted peer: ${peer.name}`,
      });
    } catch (error) {
      toast({
        title: "Failed to delete peer",
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "destructive"
      });
    }
  };

  const handleTogglePeer = async (peerId: string, enabled: boolean) => {
    try {
      await updatePeer(peerId, { enabled });
      setPeers(peers.map(peer => 
        peer.id === peerId ? { ...peer, enabled } : peer
      ));
      const peer = peers.find(p => p.id === peerId);
      toast({
        title: enabled ? "Peer enabled" : "Peer disabled",
        description: `${peer?.name} has been ${enabled ? 'enabled' : 'disabled'}`
      });
    } catch (error) {
      toast({
        title: "Failed to update peer",
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "destructive"
      });
    }
  };

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Peers</CardTitle>
              <CardDescription>Manage your WireGuard peers</CardDescription>
            </div>
            <div className="flex items-center gap-4">
              <PeerGroups
                selectedGroup={selectedGroup}
                onGroupChange={setSelectedGroup}
              />
              <div className="flex gap-2">
                <input
                  type="file"
                  id="import-peers"
                  className="hidden"
                  accept=".json"
                  onChange={handleImportPeers}
                />
                <Button variant="outline" onClick={() => document.getElementById('import-peers')?.click()}>
                  <Upload className="h-4 w-4 mr-2" />
                  Import
                </Button>
                <Button variant="outline" onClick={handleExportPeers}>
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
                <Button onClick={() => setShowAddPeer(true)}>
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Add Peer
                </Button>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Public Key</TableHead>
                <TableHead>Allowed IPs</TableHead>
                <TableHead>Last Handshake</TableHead>
                <TableHead>Transfer</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Enabled</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPeers.map((peer) => (
                <TableRow key={peer.id}>
                  <TableCell className="font-medium">{peer.name}</TableCell>
                  <TableCell className="font-mono text-sm">
                    {peer.publicKey}
                  </TableCell>
                  <TableCell>{peer.allowedIPs}</TableCell>
                  <TableCell>{peer.lastHandshake}</TableCell>
                  <TableCell>
                    ↑ {formatBytes(peer.transfer.upload)} ↓{' '}
                    {formatBytes(peer.transfer.download)}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        peer.status === 'online'
                          ? 'bg-green-500/10 text-green-500'
                          : 'bg-gray-500/10 text-gray-500'
                      }
                    >
                      {peer.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Switch
                      checked={peer.enabled}
                      onCheckedChange={(checked) => handleTogglePeer(peer.id, checked)}
                    />
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleShowQRCode(peer)}
                      >
                        <QrCode className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleExportPeers()}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleDeletePeer(peer)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <AddPeerDialog open={showAddPeer} onOpenChange={setShowAddPeer} />
      <QRCodeDialog 
        peer={selectedPeer}
        open={showQRCode}
        onOpenChange={setShowQRCode}
      />
    </>
  );
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}
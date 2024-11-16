import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getPeerQRCode } from '@/lib/api';
import type { Peer } from '@/models/peer';

interface QRCodeDialogProps {
  peer: Peer | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function QRCodeDialog({ peer, open, onOpenChange }: QRCodeDialogProps) {
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);

  useEffect(() => {
    if (peer && open) {
      getPeerQRCode(peer.id)
        .then((blob) => {
          const url = URL.createObjectURL(blob);
          setQrCodeUrl(url);
          return () => URL.revokeObjectURL(url);
        })
        .catch(console.error);
    } else {
      setQrCodeUrl(null);
    }
  }, [peer, open]);

  const handleDownload = () => {
    if (qrCodeUrl && peer) {
      const link = document.createElement('a');
      link.href = qrCodeUrl;
      link.download = `wireguard-${peer.name}-qr.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {peer ? `Configuration QR Code - ${peer.name}` : 'QR Code'}
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center gap-4">
          {qrCodeUrl && (
            <>
              <img
                src={qrCodeUrl}
                alt="WireGuard Configuration QR Code"
                className="w-full max-w-[300px] h-auto"
              />
              <Button onClick={handleDownload} variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Download QR Code
              </Button>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
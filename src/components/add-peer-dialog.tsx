import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

interface AddPeerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const groups = [
  { id: 'mobile', name: 'Mobile Devices' },
  { id: 'desktop', name: 'Desktop' },
  { id: 'servers', name: 'Servers' },
];

export function AddPeerDialog({ open, onOpenChange }: AddPeerDialogProps) {
  const [name, setName] = useState('');
  const [allowedIPs, setAllowedIPs] = useState('');
  const [group, setGroup] = useState('');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: 'Peer added successfully',
      description: `Added peer "${name}" with IP ${allowedIPs} to group ${group || 'None'}`,
    });
    
    onOpenChange(false);
    setName('');
    setAllowedIPs('');
    setGroup('');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Peer</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter peer name"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="allowedIPs">Allowed IPs</Label>
            <Input
              id="allowedIPs"
              value={allowedIPs}
              onChange={(e) => setAllowedIPs(e.target.value)}
              placeholder="10.0.0.2/32"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="group">Group</Label>
            <Select value={group} onValueChange={setGroup}>
              <SelectTrigger>
                <SelectValue placeholder="Select a group" />
              </SelectTrigger>
              <SelectContent>
                {groups.map((g) => (
                  <SelectItem key={g.id} value={g.id}>
                    {g.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Add Peer</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
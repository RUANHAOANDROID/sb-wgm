import { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PlusCircle, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export type Group = {
  id: string;
  name: string;
  color: string;
};

interface PeerGroupsProps {
  selectedGroup: string;
  onGroupChange: (groupId: string) => void;
}

const defaultGroups: Group[] = [
  { id: 'all', name: 'All Peers', color: 'gray' },
  { id: 'mobile', name: 'Mobile Devices', color: 'blue' },
  { id: 'desktop', name: 'Desktop', color: 'green' },
  { id: 'servers', name: 'Servers', color: 'red' },
];

export function PeerGroups({ selectedGroup, onGroupChange }: PeerGroupsProps) {
  const [groups, setGroups] = useState<Group[]>(defaultGroups);
  const [showAddGroup, setShowAddGroup] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');
  const { toast } = useToast();

  const handleAddGroup = () => {
    if (newGroupName.trim()) {
      const newGroup = {
        id: newGroupName.toLowerCase().replace(/\s+/g, '-'),
        name: newGroupName.trim(),
        color: 'gray',
      };
      setGroups([...groups, newGroup]);
      setNewGroupName('');
      setShowAddGroup(false);
      toast({
        title: 'Group added',
        description: `Created new group: ${newGroup.name}`,
      });
    }
  };

  const handleDeleteGroup = (groupId: string) => {
    if (groupId === 'all') {
      toast({
        title: 'Cannot delete group',
        description: 'The All Peers group cannot be deleted',
        variant: 'destructive',
      });
      return;
    }
    setGroups(groups.filter((g) => g.id !== groupId));
    if (selectedGroup === groupId) {
      onGroupChange('all');
    }
    toast({
      title: 'Group deleted',
      description: `Deleted group: ${groups.find((g) => g.id === groupId)?.name}`,
    });
  };

  return (
    <div className="flex items-center gap-2">
      <Select value={selectedGroup} onValueChange={onGroupChange}>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Select a group" />
        </SelectTrigger>
        <SelectContent>
          {groups.map((group) => (
            <SelectItem key={group.id} value={group.id}>
              <div className="flex items-center justify-between w-full">
                <span>{group.name}</span>
                {group.id !== 'all' && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4 ml-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteGroup(group.id);
                    }}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                )}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {showAddGroup ? (
        <div className="flex items-center gap-2">
          <Input
            value={newGroupName}
            onChange={(e) => setNewGroupName(e.target.value)}
            placeholder="Group name"
            className="w-[150px]"
          />
          <Button size="sm" onClick={handleAddGroup}>
            Add
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setShowAddGroup(false)}
          >
            Cancel
          </Button>
        </div>
      ) : (
        <Button
          variant="outline"
          size="icon"
          onClick={() => setShowAddGroup(true)}
        >
          <PlusCircle className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}
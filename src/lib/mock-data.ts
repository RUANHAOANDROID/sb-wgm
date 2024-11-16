import type { Peer, PeerGroup } from '@/models/peer';

export const mockGroups: PeerGroup[] = [
  { id: 'mobile', name: 'Mobile Devices', color: 'blue', createdAt: '2024-01-01', updatedAt: '2024-01-01' },
  { id: 'desktop', name: 'Desktop', color: 'green', createdAt: '2024-01-01', updatedAt: '2024-01-01' },
  { id: 'servers', name: 'Servers', color: 'red', createdAt: '2024-01-01', updatedAt: '2024-01-01' },
];

export const mockPeers: Peer[] = [
  {
    id: '1',
    name: 'iPhone 15 Pro',
    publicKey: 'mB12uzw8qHoUKdPBeMyDVzv+H0hrZPYXF9aAzxnC4Qk=',
    privateKey: 'hidden',
    allowedIPs: '10.0.0.2/32',
    lastHandshake: '2 minutes ago',
    transfer: {
      upload: 1288490188, // ~1.2 GB
      download: 3651041127, // ~3.4 GB
    },
    status: 'online',
    groupId: 'mobile',
    enabled: true,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
  },
  {
    id: '2',
    name: 'MacBook Pro',
    publicKey: 'jK93uzw8qHoUKdPBeMyDVzv+H0hrZPYXF9aAzxnC4Qk=',
    privateKey: 'hidden',
    allowedIPs: '10.0.0.3/32',
    lastHandshake: '5 hours ago',
    transfer: {
      upload: 536870912, // ~512 MB
      download: 1073741824, // ~1 GB
    },
    status: 'offline',
    groupId: 'desktop',
    enabled: true,
    createdAt: '2024-01-14T15:30:00Z',
    updatedAt: '2024-01-14T15:30:00Z',
  },
  {
    id: '3',
    name: 'Ubuntu Server',
    publicKey: 'pL82uzw8qHoUKdPBeMyDVzv+H0hrZPYXF9aAzxnC4Qk=',
    privateKey: 'hidden',
    allowedIPs: '10.0.0.4/32',
    lastHandshake: '1 minute ago',
    transfer: {
      upload: 2147483648, // ~2 GB
      download: 4294967296, // ~4 GB
    },
    status: 'online',
    groupId: 'servers',
    enabled: true,
    createdAt: '2024-01-13T08:15:00Z',
    updatedAt: '2024-01-13T08:15:00Z',
  },
  {
    id: '4',
    name: 'Android Tablet',
    publicKey: 'xQ72uzw8qHoUKdPBeMyDVzv+H0hrZPYXF9aAzxnC4Qk=',
    privateKey: 'hidden',
    allowedIPs: '10.0.0.5/32',
    lastHandshake: '3 days ago',
    transfer: {
      upload: 104857600, // ~100 MB
      download: 262144000, // ~250 MB
    },
    status: 'offline',
    groupId: 'mobile',
    enabled: false,
    createdAt: '2024-01-10T12:00:00Z',
    updatedAt: '2024-01-10T12:00:00Z',
  },
];
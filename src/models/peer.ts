export interface Peer {
  id: string;
  name: string;
  publicKey: string;
  privateKey?: string;
  allowedIPs: string;
  lastHandshake: string;
  transfer: {
    upload: number;
    download: number;
  };
  status: 'online' | 'offline';
  groupId: string;
  enabled: boolean;
  config?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePeerRequest {
  name: string;
  allowedIPs: string;
  groupId: string;
}

export interface UpdatePeerRequest {
  name?: string;
  allowedIPs?: string;
  groupId?: string;
  enabled?: boolean;
}

export interface PeerGroup {
  id: string;
  name: string;
  color: string;
  createdAt: string;
  updatedAt: string;
}
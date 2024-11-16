import { mockPeers } from './mock-data';
import type { CreatePeerRequest, UpdatePeerRequest, Peer } from '@/models/peer';

const API_BASE = '/api/v1';
const ARTIFICIAL_DELAY = 500; // Simulate network latency

// Helper to simulate async behavior
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function fetchPeers(): Promise<Peer[]> {
  await delay(ARTIFICIAL_DELAY);
  return [...mockPeers];
}

export async function createPeer(data: CreatePeerRequest): Promise<Peer> {
  await delay(ARTIFICIAL_DELAY);
  
  const newPeer: Peer = {
    id: Math.random().toString(36).substr(2, 9),
    name: data.name,
    publicKey: Array.from(crypto.getRandomValues(new Uint8Array(32)))
      .map(b => b.toString(16).padStart(2, '0'))
      .join(''),
    allowedIPs: data.allowedIPs,
    lastHandshake: 'Never',
    transfer: {
      upload: 0,
      download: 0,
    },
    status: 'offline',
    groupId: data.groupId,
    enabled: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  mockPeers.push(newPeer);
  return newPeer;
}

export async function updatePeer(id: string, data: UpdatePeerRequest): Promise<Peer> {
  await delay(ARTIFICIAL_DELAY);
  
  const peer = mockPeers.find(p => p.id === id);
  if (!peer) throw new Error('Peer not found');

  Object.assign(peer, {
    ...data,
    updatedAt: new Date().toISOString(),
  });

  return peer;
}

export async function deletePeer(id: string): Promise<void> {
  await delay(ARTIFICIAL_DELAY);
  
  const index = mockPeers.findIndex(p => p.id === id);
  if (index === -1) throw new Error('Peer not found');
  
  mockPeers.splice(index, 1);
}

export async function getPeerConfig(id: string): Promise<string> {
  await delay(ARTIFICIAL_DELAY);
  
  const peer = mockPeers.find(p => p.id === id);
  if (!peer) throw new Error('Peer not found');

  return `[Interface]
PrivateKey = ${peer.privateKey || 'hidden'}
Address = ${peer.allowedIPs}
DNS = 1.1.1.1

[Peer]
PublicKey = ${peer.publicKey}
AllowedIPs = 0.0.0.0/0
Endpoint = example.com:51820
PersistentKeepalive = 25`;
}

export async function getPeerQRCode(id: string): Promise<Blob> {
  await delay(ARTIFICIAL_DELAY);
  
  // Generate a simple SVG QR code (in real app, use a proper QR code library)
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <rect width="100" height="100" fill="white"/>
    <rect x="20" y="20" width="60" height="60" fill="black"/>
  </svg>`;
  
  return new Blob([svg], { type: 'image/svg+xml' });
}
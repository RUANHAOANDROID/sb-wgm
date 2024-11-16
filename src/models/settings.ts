export interface WireGuardSettings {
  serverAddress: string;
  serverPort: number;
  serverPublicKey: string;
  dns: string[];
  mtu: number;
  keepalive: number;
  allowedIPs: string[];
  endpoint: string;
  preUp: string;
  postUp: string;
  preDown: string;
  postDown: string;
}

export const defaultSettings: WireGuardSettings = {
  serverAddress: '10.0.0.1/24',
  serverPort: 51820,
  serverPublicKey: '',
  dns: ['1.1.1.1', '1.0.0.1'],
  mtu: 1420,
  keepalive: 25,
  allowedIPs: ['0.0.0.0/0', '::/0'],
  endpoint: 'wg.example.com:51820',
  preUp: '',
  postUp: '',
  preDown: '',
  postDown: '',
};
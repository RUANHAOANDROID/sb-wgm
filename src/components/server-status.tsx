import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Activity, Clock, Upload, Download } from 'lucide-react';

export function ServerStatus() {
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Server Status</CardTitle>
          <Badge variant="outline" className="bg-green-500/10 text-green-500">
            Active
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatusCard
            icon={<Activity className="h-4 w-4" />}
            label="Status"
            value="Running"
          />
          <StatusCard
            icon={<Clock className="h-4 w-4" />}
            label="Uptime"
            value="24h 13m"
          />
          <StatusCard
            icon={<Upload className="h-4 w-4" />}
            label="Upload"
            value="1.2 GB"
          />
          <StatusCard
            icon={<Download className="h-4 w-4" />}
            label="Download"
            value="3.4 GB"
          />
        </div>
      </CardContent>
    </Card>
  );
}

function StatusCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center space-x-4 rounded-lg border p-4">
      <div className="p-2 bg-primary/10 rounded-full">{icon}</div>
      <div>
        <p className="text-sm font-medium text-muted-foreground">{label}</p>
        <p className="text-lg font-bold">{value}</p>
      </div>
    </div>
  );
}
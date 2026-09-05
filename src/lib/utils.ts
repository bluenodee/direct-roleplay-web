export function formatMoney(amount: number): string {
  return 'R$ ' + amount.toLocaleString('pt-BR');
}

export function formatPlayedTime(seconds: number): string {
  if (!seconds || seconds <= 0) return '0m';
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const parts: string[] = [];
  if (days > 0) parts.push(`${days}d`);
  if (hours > 0) parts.push(`${hours}h`);
  if (minutes > 0) parts.push(`${minutes}m`);
  return parts.join(' ') || '0m';
}

export function timeAgo(timestamp: number): string {
  if (!timestamp) return 'never';
  const now = Math.floor(Date.now() / 1000);
  const diff = now - timestamp;
  if (diff < 60) return 'just now';
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`;
  return new Date(timestamp * 1000).toLocaleDateString('en-US');
}

export function getEmploymentName(key: string): string {
  const map: Record<string, string> = {
    Nenhum: 'Unemployed',
    lixeiro: 'Garbage Collector',
    cortador_de_grama: 'Mower',
    pizzaiolo: 'Pizza Delivery',
    taxista: 'Taxi Driver',
    eletricista: 'Electrician',
    montador: 'Automaker',
    minerador: 'Miner',
  };
  return map[key] || key;
}

export function getSkinColorName(color: string): string {
  const map: Record<string, string> = { whi: 'White', ara: 'Pardo', bla: 'Black' };
  return map[color] || color;
}

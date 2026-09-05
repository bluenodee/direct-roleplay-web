export default function StatCard({ label, value, color }: { label: string; value: string | number; color?: string }) {
  return (
    <div className="bg-black/5 border border-white/5 rounded-xl p-4">
      <div className="text-[11px] text-white/30 uppercase tracking-wide mb-1">{label}</div>
      <div className="text-xl font-bold" style={{ color: color || '#fff' }}>{value}</div>
    </div>
  );
}

export default function Card({ children, className = '', onClick }) {
  return (
    <div
      onClick={onClick}
      className={[
        'rounded-3xl border border-slate-100/80 bg-white/90 p-6 shadow-soft backdrop-blur-sm',
        onClick ? 'cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-panel' : '',
        className,
      ].join(' ')}
    >
      {children}
    </div>
  );
}

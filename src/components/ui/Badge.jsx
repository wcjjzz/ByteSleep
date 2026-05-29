const typeClassMap = {
  default: 'bg-slate-100 text-slate-600 border-slate-200',
  primary: 'bg-blue-50 text-blue-600 border-blue-200',
  warning: 'bg-amber-50 text-amber-600 border-amber-200',
  danger: 'bg-rose-50 text-rose-600 border-rose-200',
  success: 'bg-emerald-50 text-emerald-600 border-emerald-200',
  processing: 'bg-indigo-50 text-indigo-600 border-indigo-200',
};

export default function Badge({ children, type = 'default', className = '' }) {
  return (
    <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-bold ${typeClassMap[type]} ${className}`}>
      {children}
    </span>
  );
}

export default function PatientTabs({ items, currentId, onChange }) {
  return (
    <div className="flex gap-8 px-8">
      {items.map((item) => {
        const active = currentId === item.id;
        return (
          <button
            key={item.id}
            onClick={() => onChange(item.id)}
            className={`relative pb-3 text-sm font-bold transition ${active ? 'text-blue-600' : 'text-slate-400 hover:text-slate-700'}`}
          >
            {item.label}
            {active && <span className="absolute bottom-0 left-0 h-1 w-full rounded-t-full bg-blue-600" />}
          </button>
        );
      })}
    </div>
  );
}

import GlobalHeader from '../components/layout/GlobalHeader';

export default function GlobalLayout({ children }) {
  return (
    <div className="flex h-screen flex-1 flex-col overflow-hidden">
      <GlobalHeader />
      <div className="flex-1 overflow-y-auto px-8 pb-24 pt-8">{children}</div>
    </div>
  );
}

import PatientHeader from '../components/layout/PatientHeader';
import PatientTabs from '../components/layout/PatientTabs';

export default function PatientWorkspaceLayout({
  patient,
  followedPatientIds,
  toggleFollow,
  onBack,
  tabs,
  currentTab,
  onTabChange,
  children,
}) {
  return (
    <div className="flex h-screen flex-1 flex-col overflow-hidden">
      <div className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/90 backdrop-blur-md">
        <PatientHeader
          patient={patient}
          followedPatientIds={followedPatientIds}
          toggleFollow={toggleFollow}
          onBack={onBack}
        />
        <PatientTabs items={tabs} currentId={currentTab} onChange={onTabChange} />
      </div>
      <div className="flex-1 overflow-y-auto px-8 pb-24 pt-8">{children}</div>
    </div>
  );
}

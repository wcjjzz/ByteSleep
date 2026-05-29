import Sidebar from '../components/layout/Sidebar';
import GlobalLayout from '../layouts/GlobalLayout';
import PatientWorkspaceLayout from '../layouts/PatientWorkspaceLayout';
import { globalNavItems, patientNavItems } from './navigation';
import WorkbenchPage from '../pages/global/WorkbenchPage';
import PatientsPage from '../pages/global/PatientsPage';
import TasksPage from '../pages/global/TasksPage';
import ReportsPage from '../pages/global/ReportsPage';
import OverviewPage from '../pages/patient/OverviewPage';
import AnalysisPage from '../pages/patient/AnalysisPage';
import SleepReportPage from '../pages/patient/SleepReportPage';
import RiskReportPage from '../pages/patient/RiskReportPage';
import HistoryPage from '../pages/patient/HistoryPage';

export default function AppShell({ appState }) {
  const {
    activePatient,
    currentGlobalView,
    currentPatientView,
    followedPatientIds,
    unreadPublicUpdates,
    unreadFollowedUpdates,
    crsRRecords,
    addCrsRRecord,
    patients,
    switchGlobalView,
    enterPatientWorkspace,
    exitPatientWorkspace,
    switchPatientView,
    toggleFollow,
    markAsRead,
    markAllAsRead,
  } = appState;

  const renderGlobalView = () => {
    switch (currentGlobalView) {
      case 'patients':
        return (
          <PatientsPage
            enterPatientWorkspace={enterPatientWorkspace}
            followedPatientIds={followedPatientIds}
            toggleFollow={toggleFollow}
          />
        );
      case 'tasks':
        return <TasksPage enterPatientWorkspace={enterPatientWorkspace} />;
      case 'reports':
        return <ReportsPage enterPatientWorkspace={enterPatientWorkspace} crsRRecords={crsRRecords} />;
      case 'workbench':
      default:
        return (
          <WorkbenchPage
            enterPatientWorkspace={enterPatientWorkspace}
            unreadPublicUpdates={unreadPublicUpdates}
            unreadFollowedUpdates={unreadFollowedUpdates}
            markAsRead={markAsRead}
            markAllAsRead={markAllAsRead}
            patients={patients}
            crsRRecords={crsRRecords}
            addCrsRRecord={addCrsRRecord}
          />
        );
    }
  };

  const renderPatientView = () => {
    switch (currentPatientView) {
      case 'analysis':
        return <AnalysisPage patient={activePatient} switchPatientView={switchPatientView} />;
      case 'sleep-report':
        return <SleepReportPage patient={activePatient} switchPatientView={switchPatientView} />;
      case 'risk-report':
        return <RiskReportPage patient={activePatient} switchPatientView={switchPatientView} />;
      case 'history':
        return <HistoryPage patient={activePatient} />;
      case 'overview':
      default:
        return <OverviewPage patient={activePatient} switchPatientView={switchPatientView} />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 text-slate-800 selection:bg-blue-200">
      <Sidebar items={globalNavItems} currentId={!activePatient ? currentGlobalView : null} onChange={switchGlobalView} />
      {!activePatient ? (
        <GlobalLayout>{renderGlobalView()}</GlobalLayout>
      ) : (
        <PatientWorkspaceLayout
          patient={activePatient}
          followedPatientIds={followedPatientIds}
          toggleFollow={toggleFollow}
          onBack={exitPatientWorkspace}
          tabs={patientNavItems}
          currentTab={currentPatientView}
          onTabChange={switchPatientView}
        >
          {renderPatientView()}
        </PatientWorkspaceLayout>
      )}
    </div>
  );
}

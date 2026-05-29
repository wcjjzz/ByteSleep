import { useMemo, useState } from 'react';
import { LATEST_UPDATES } from '../data/latestUpdates';
import { MOCK_PATIENTS } from '../data/mockPatients';
import { INITIAL_CRS_R_RECORDS } from '../data/crsRRecords';

// 应用级状态管理。
export function useAppState() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activePatient, setActivePatient] = useState(null);
  const [currentGlobalView, setCurrentGlobalView] = useState('workbench');
  const [currentPatientView, setCurrentPatientView] = useState('overview');
  const [followedPatientIds, setFollowedPatientIds] = useState(['DOC-20250915', 'DOC-20251002']);
  const [acknowledgedUpdateIds, setAcknowledgedUpdateIds] = useState([]);
  const [crsRRecords, setCrsRRecords] = useState(INITIAL_CRS_R_RECORDS);

  const switchGlobalView = (viewId) => {
    setActivePatient(null);
    setCurrentGlobalView(viewId);
  };

  const enterPatientWorkspace = (patient, initialView = 'overview') => {
    setActivePatient(patient);
    setCurrentPatientView(initialView);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const exitPatientWorkspace = () => {
    setActivePatient(null);
  };

  const switchPatientView = (viewId) => {
    setCurrentPatientView(viewId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleFollow = (patientId) => {
    setFollowedPatientIds((prev) =>
      prev.includes(patientId) ? prev.filter((id) => id !== patientId) : [...prev, patientId],
    );
  };

  const markAsRead = (updateId) => {
    setAcknowledgedUpdateIds((prev) => (prev.includes(updateId) ? prev : [...prev, updateId]));
  };

  const markAllAsRead = (ids) => {
    setAcknowledgedUpdateIds((prev) => [...new Set([...prev, ...ids])]);
  };

  const addCrsRRecord = (record) => {
    setCrsRRecords((prev) => [
      {
        id: `CRS-${Date.now()}`,
        examiner: '李医生',
        ...record,
      },
      ...prev,
    ]);
  };

  const unreadPublicUpdates = useMemo(
    () => LATEST_UPDATES.filter((item) => !followedPatientIds.includes(item.patientId) && !acknowledgedUpdateIds.includes(item.id)),
    [followedPatientIds, acknowledgedUpdateIds],
  );

  const unreadFollowedUpdates = useMemo(
    () => LATEST_UPDATES.filter((item) => followedPatientIds.includes(item.patientId) && !acknowledgedUpdateIds.includes(item.id)),
    [followedPatientIds, acknowledgedUpdateIds],
  );

  return {
    isAuthenticated,
    setIsAuthenticated,
    activePatient,
    currentGlobalView,
    currentPatientView,
    followedPatientIds,
    acknowledgedUpdateIds,
    unreadPublicUpdates,
    unreadFollowedUpdates,
    crsRRecords,
    addCrsRRecord,
    switchGlobalView,
    enterPatientWorkspace,
    exitPatientWorkspace,
    switchPatientView,
    toggleFollow,
    markAsRead,
    markAllAsRead,
    patients: MOCK_PATIENTS,
  };
}

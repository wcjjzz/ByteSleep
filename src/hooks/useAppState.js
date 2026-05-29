import { useMemo, useState } from 'react';
import { LATEST_UPDATES } from '../data/latestUpdates';
import { MOCK_PATIENTS } from '../data/mockPatients';

// 应用级状态管理。
export function useAppState() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activePatient, setActivePatient] = useState(null);
  const [currentGlobalView, setCurrentGlobalView] = useState('workbench');
  const [currentPatientView, setCurrentPatientView] = useState('overview');
  const [followedPatientIds, setFollowedPatientIds] = useState(['P20250915', 'P20251001']);
  const [acknowledgedUpdateIds, setAcknowledgedUpdateIds] = useState([]);

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

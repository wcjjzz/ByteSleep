import { MOCK_PATIENTS } from '../data/mockPatients';

// 根据患者 ID 查找患者对象。
export function getPatientById(id) {
  return MOCK_PATIENTS.find((item) => item.id === id) || MOCK_PATIENTS[0];
}

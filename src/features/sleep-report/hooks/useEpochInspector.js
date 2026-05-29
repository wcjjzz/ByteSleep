import { useMemo, useState } from 'react';
import { generateEpochSignal } from '../utils/generateEpochSignal';

// 单 Epoch 检查器的交互逻辑。
export function useEpochInspector() {
  const [currentEpochId, setCurrentEpochId] = useState(509);
  const [signalMode, setSignalMode] = useState('heatmap');
  const [inputValue, setInputValue] = useState('509');

  const signalBundle = useMemo(() => generateEpochSignal(currentEpochId), [currentEpochId]);

  const jumpToEpoch = () => {
    const value = Number(inputValue);
    if (Number.isFinite(value) && value > 0) {
      setCurrentEpochId(Math.floor(value));
    }
  };

  return {
    currentEpochId,
    setCurrentEpochId,
    signalMode,
    setSignalMode,
    inputValue,
    setInputValue,
    signalBundle,
    jumpToEpoch,
  };
}

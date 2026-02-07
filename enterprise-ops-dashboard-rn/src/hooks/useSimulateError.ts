import { useSyncExternalStore } from 'react';
import { getSimulateError, setSimulateError, subscribeSimulateError } from '../data/simulateError';

export const useSimulateError = () => useSyncExternalStore(subscribeSimulateError, getSimulateError, getSimulateError);

export { setSimulateError };

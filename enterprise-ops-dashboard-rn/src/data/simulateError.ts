type Listener = () => void;

let simulateError = false;
const listeners = new Set<Listener>();

export const getSimulateError = () => simulateError;

export const setSimulateError = (value: boolean) => {
  simulateError = value;
  listeners.forEach((listener) => listener());
};

export const subscribeSimulateError = (listener: Listener) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

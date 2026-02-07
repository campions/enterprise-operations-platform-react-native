export const formatStatus = (status: string) => {
  switch (status) {
    case 'Healthy':
      return { label: status, color: '#0A7E07' };
    case 'Warning':
      return { label: status, color: '#B35C00' };
    case 'Offline':
      return { label: status, color: '#B00020' };
    default:
      return { label: status, color: '#4E5D78' };
  }
};

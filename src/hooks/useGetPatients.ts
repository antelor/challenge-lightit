import { useQuery } from '@tanstack/react-query';
import { getPatients } from '../services/patients';

export function useGetPatients() {
  return useQuery({
    queryKey: ['patients'],
    queryFn: getPatients,
  });
}
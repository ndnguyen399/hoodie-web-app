
import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

export const useAppParameters = () => {
  const [params] = useSearchParams();

  return useMemo(() => ({
    get: (key: string) => params.get(key),
  }), [params]);
};

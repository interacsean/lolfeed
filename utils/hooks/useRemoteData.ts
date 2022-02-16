import React from 'react';

import axios, { AxiosResponse } from 'axios';
import { StrRecord } from '../../types/StrRecord';

function isStrRecord<T>(
  variable: T | StrRecord<unknown>,
): variable is StrRecord<unknown> {
  return Object.prototype.toString.call(variable) === '[object Object]';
}

const useRemoteData = <T>(axiosPromiseFn: () => Promise<AxiosResponse<T>>) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [data, setData] = React.useState<T | null>(null);
  const [errors, setErrors] = React.useState<string[] | null>(null);
  React.useEffect(function init() {
    setIsLoading(true);
    console.log('Making request');
    axiosPromiseFn()
      .then(({ data: axData, status }) => {
        if (status !== 200) {
          setErrors(
            isStrRecord(axData) && axData.hasOwnProperty('errors')
              ? (axData.errors as string[])
              : ['Unknown error'],
          );
          return;
        }
        setData(axData);
      })
      .catch((e) => {
        setErrors([e.message || 'Unknown error']);
      })
      .finally(() => setIsLoading(false));
  }, []);

  return {
    isLoading,
    data,
    errors,
  };
};

export default useRemoteData;

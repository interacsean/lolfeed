import React from 'react';

const useIsFirstLoad = () => {
  const [isFirstLoad, setIsFirstLoad] = React.useState(true);

  React.useEffect(function onFirstLoad() {
    if (isFirstLoad) {
      setIsFirstLoad(false);
    }
  }, []);

  return isFirstLoad;
};

export default useIsFirstLoad;

import { useState, useEffect } from 'react';

const useDelayedReveal = (delays) => {
  const [states, setStates] = useState(Array(delays.length).fill(false));

  useEffect(() => {
    const timers = delays.map((delay, index) =>
      setTimeout(() => {
        setStates((prevStates) => {
          const newStates = [...prevStates];
          newStates[index] = true;
          return newStates;
        });
      }, delay)
    );

    return () => timers.forEach((timer) => clearTimeout(timer));
  }, [delays]);

  return states;
};

export default useDelayedReveal;

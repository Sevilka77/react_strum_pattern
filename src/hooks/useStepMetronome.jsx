import { useEffect, useState } from 'react';

export default function useStepMetronome(tempo, beatPattern, note, isPlaying) {
  const [activeBeat, setActiveBeat] = useState(tempo);

  useEffect(() => {
    if (isPlaying) {
      const stepMetronome = () => setActiveBeat((curr) => {
        if (curr == null) return 0;

        return curr < beatPattern.length - 1 ? curr + 1 : 0;
      });

      let period = Math.round((1000 * 60) / tempo / note);



      const intervalId = setInterval(stepMetronome, period);
      stepMetronome(); // Play first click immediately

      return () => clearInterval(intervalId);
    } else {
      setActiveBeat(null);
    }
  }, [tempo, beatPattern, note, isPlaying]);

  return [activeBeat, setActiveBeat];
}
import { useEffect, useRef } from 'react';
import { hottestPeople } from "assets/images/hottestPeople";



function useRandomHottest() {
  const randomHottest = useRef([]);

  useEffect(() => {
    randomHottest.current = hottestPeople.sort(() => 0.5 - Math.random());
  });
  const hottest = randomHottest;
  return {hottest};
}

export default useRandomHottest;
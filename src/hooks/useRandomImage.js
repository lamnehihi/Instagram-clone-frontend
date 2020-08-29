import { RandomBackGroundImage } from "assets/images/randomPics/randomPics";
import { useEffect, useRef } from 'react';



function useRandomImage() {
  const randomNum = () => {
    return Math.trunc(Math.random() * 4);
  };
  const randomImage = useRef(RandomBackGroundImage[2]);
  useEffect(() => {
    randomImage.current = RandomBackGroundImage[randomNum()];
  }, []);
  const indexPic = randomImage.current;
  return {indexPic};
}

export default useRandomImage;
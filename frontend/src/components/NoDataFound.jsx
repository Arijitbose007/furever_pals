import React from 'react';
import Lottie from 'react-lottie';
import animationData from '../animations/noData.json'; // Assuming you have a Lottie animation file

const NoDataFound = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mt-8 p-4">
      <Lottie options={defaultOptions} height={300} width={300} speed={0.5} />
      <p className="mt-4 text-center text-gray-600">Sorry, We Are unable To Find You A Buddy For Now :(</p>
    </div>
  );
};

export default NoDataFound;

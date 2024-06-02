import React from 'react';
import Lottie from 'react-lottie';
import animationData from '../animations/noData.json'; // Ensure you have this Lottie animation file

const NoDataFound = ({ isCarousel }) => {
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
      <p className="text-gray-600 text-lg font-semibold mt-4">
        {isCarousel ? "Backend data is loading. Please Stay tuned..." : "Unable to find you a buddy for now."}
      </p>
    </div>
  );
};

export default NoDataFound;

import React, { useEffect, useRef } from 'react';

const VideoFeed: React.FC = () => {
  const videoEl = useRef(null);

  useEffect(
    () => {
      if (!videoEl) {
        return;
      }
      navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
        let video: any = videoEl.current;
        if (video) {
          video.srcObject = stream;
          video.play();
        }
      });
    },
    [videoEl]
  );

  return <video ref={videoEl} />;
};

export default VideoFeed;

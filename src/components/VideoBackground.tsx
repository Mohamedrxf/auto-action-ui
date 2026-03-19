import React, { useRef, useEffect } from 'react';

const VideoBackground: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.6;
    }
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity: 0.9 }}
      >
        <source src="/video/bg.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-background/15" />
    </div>
  );
};

export default VideoBackground;

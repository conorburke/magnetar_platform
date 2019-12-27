import React, { useRef, useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const CAPTURE_OPTIONS = {
  audio: false,
  video: { facingMode: 'environment' }
};

const useStyles = makeStyles(theme => ({
  cameraButton: {
    margin: theme.spacing(1)
  }
}));

function useUserMedia(requestedMedia) {
  const [mediaStream, setMediaStream] = useState(null);

  useEffect(
    () => {
      async function enableStream() {
        try {
          const stream = await navigator.mediaDevices.getUserMedia(
            requestedMedia
          );
          setMediaStream(stream);
        } catch (err) {
          console.log('camera error', err);
        }
      }

      if (!mediaStream) {
        enableStream();
      } else {
        return function cleanup() {
          mediaStream.getTracks().forEach(track => {
            track.stop();
          });
        };
      }
    },
    [mediaStream, requestedMedia]
  );

  return mediaStream;
}

const Camera = ({ onCapture, onClear }) => {
  const canvasRef = useRef();
  const videoRef = useRef();
  const mediaStream = useUserMedia(CAPTURE_OPTIONS);
  const [isCanvasEmpty, setIsCanvasEmpty] = useState(true);

  const classes = useStyles();

  if (mediaStream && videoRef.current && !videoRef.current.srcObject) {
    videoRef.current.srcObject = mediaStream;
  }

  function handleCanPlay() {
    videoRef.current.play();
  }

  function handleCapture() {
    const context = canvasRef.current.getContext('2d');
    const crHeight =
      videoRef.current.videoHeight /
      (2 * (videoRef.current.videoWidth / canvasRef.current.width));
    context.drawImage(
      videoRef.current,
      0,
      0,
      canvasRef.current.width,
      crHeight
    );
    canvasRef.current.toBlob(blob => onCapture(blob), 'image/png', 1);

    setIsCanvasEmpty(false);
  }

  return (
    <div>
      <div>
        <video
          ref={videoRef}
          onCanPlay={handleCanPlay}
          style={{ top: '0px', left: '0px', height: '400px', width: '400px' }}
          autoPlay
          playsInline
          muted
        />
      </div>
      <Button
        onClick={handleCapture}
        variant="contained"
        color="primary"
        className={classes.cameraButton}
      >
        {isCanvasEmpty ? 'Take a picture' : 'Take another picture'}
      </Button>
      <div>
        <canvas
          ref={canvasRef}
          style={{ top: '0px', left: '0px', height: '400px', width: '400px' }}
        />
      </div>
    </div>
  );
};

export default Camera;

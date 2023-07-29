// src/components/FeedbackNotification.js
import React, { useEffect } from 'react';

const FeedbackNotification = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000); // Show the notification for 3 seconds

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="feedback-notification">
      <p>{message}</p>
    </div>
  );
};

export default FeedbackNotification;

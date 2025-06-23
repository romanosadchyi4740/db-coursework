import React, { useEffect } from 'react';

const Popup = ({
  isOpen,
  onClose,
  title,
  message,
  type = 'success',
  showCloseButton = true,
  autoClose = false,
  autoCloseDelay = 3000,
}) => {
  useEffect(() => {
    if (autoClose && isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, autoCloseDelay);
      return () => clearTimeout(timer);
    }
  }, [isOpen, autoClose, autoCloseDelay, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const getIcon = () => {
    switch (type) {
      case 'success':
        return (
          <div className="bg-gradient-to-br from-bookstore-success to-green-600 p-3 rounded-full">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
          </div>
        );
      case 'error':
        return (
          <div className="bg-gradient-to-br from-bookstore-error to-red-600 p-3 rounded-full">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </div>
        );
      case 'warning':
        return (
          <div className="bg-gradient-to-br from-bookstore-warning to-orange-600 p-3 rounded-full">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              ></path>
            </svg>
          </div>
        );
      case 'info':
        return (
          <div className="bg-gradient-to-br from-bookstore-primary to-bookstore-secondary p-3 rounded-full">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
          </div>
        );
      default:
        return null;
    }
  };

  const getTypeStyles = () => {
    switch (type) {
      case 'success':
        return 'border-bookstore-success';
      case 'error':
        return 'border-bookstore-error';
      case 'warning':
        return 'border-bookstore-warning';
      case 'info':
        return 'border-bookstore-primary';
      default:
        return 'border-bookstore-primary';
    }
  };

  return (
    <div
      className="popup-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="popup-title"
      aria-describedby="popup-message"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity"
        onClick={showCloseButton ? onClose : undefined}
      />

      {/* Popup Content */}
      <div className={`popup-content ${getTypeStyles()}`}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-bookstore-lighter">
          <div className="flex items-center space-x-4">
            {getIcon()}
            <div>
              <h3
                id="popup-title"
                className="text-xl font-bold text-bookstore-dark font-serif"
              >
                {title}
              </h3>
            </div>
          </div>
          {showCloseButton && (
            <button
              onClick={onClose}
              className="text-bookstore-secondary hover:text-bookstore-dark transition-colors duration-200 p-2 rounded-full hover:bg-bookstore-lighter"
              aria-label="Close popup"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
          )}
        </div>

        {/* Body */}
        <div className="p-6">
          <p
            id="popup-message"
            className="text-bookstore-secondary text-lg leading-relaxed"
          >
            {message}
          </p>
        </div>

        {/* Footer */}
        <div className="flex justify-end p-6 border-t border-bookstore-lighter">
          <button onClick={onClose} className="btn-primary">
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;

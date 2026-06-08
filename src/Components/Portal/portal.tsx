import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { IoClose } from 'react-icons/io5';
import './style.scss';

interface PortalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const Portal = ({ isOpen, onClose, children }: PortalProps) => {
  const firstElementRef = useRef<HTMLButtonElement>(null);
  const lastElementRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = 'hidden';

    if (firstElementRef.current) {
      firstElementRef.current.focus();
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleFocusFirstBarrier = (e: React.FocusEvent) => {
    e.preventDefault();
    if (lastElementRef.current) {
      lastElementRef.current.focus();
    }
  };

  const handleFocusLastBarrier = (e: React.FocusEvent) => {
    e.preventDefault();
    if (firstElementRef.current) {
      firstElementRef.current.focus();
    }
  };

  return createPortal(
    <div
      className="portal-overlay"
      onClick={onClose}
      data-testid="portalOverlay"
    >
      <div
        className="portal-content"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <div
          tabIndex={0}
          onFocus={handleFocusFirstBarrier}
          className="sr-only"
        />

        <div className="portal-header">
          <button
            ref={firstElementRef}
            className="portal-close-btn"
            onClick={onClose}
            aria-label="Close portal"
          >
            <IoClose size={24} />
          </button>
        </div>

        <div className="portal-body">{children}</div>

        <button
          ref={lastElementRef}
          onFocus={handleFocusLastBarrier}
          className="portal-loop-trigger"
          aria-hidden="true"
          tabIndex={0}
        />
      </div>
    </div>,
    document.body
  );
};

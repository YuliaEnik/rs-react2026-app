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
  const portalRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    previousFocusRef.current = document.activeElement as HTMLElement;
    document.body.style.overflow = 'hidden';

    const focusableSelectors =
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

    const timeoutId = setTimeout(() => {
      if (portalRef.current) {
        const focusableElements =
          portalRef.current.querySelectorAll(focusableSelectors);
        if (focusableElements.length > 0) {
          (focusableElements[0] as HTMLElement).focus();
        }
      }
    }, 0);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key === 'Tab' && portalRef.current) {
        const focusableElements =
          portalRef.current.querySelectorAll(focusableSelectors);

        if (focusableElements.length === 0) {
          e.preventDefault();
          return;
        }

        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[
          focusableElements.length - 1
        ] as HTMLElement;

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(timeoutId);
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
      if (previousFocusRef.current) {
        previousFocusRef.current.focus();
      }
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className="portal-overlay"
      onClick={onClose}
      data-testid="portalOverlay"
    >
      <div
        className="portal-content"
        onClick={(e) => e.stopPropagation()}
        ref={portalRef}
        role="dialog"
        aria-modal="true"
      >
        <div className="portal-header">
          <button
            className="portal-close-btn"
            onClick={onClose}
            aria-label="Close portal"
          >
            <IoClose size={24} />
          </button>
        </div>
        <div className="portal-body">{children}</div>
      </div>
    </div>,
    document.body
  );
};

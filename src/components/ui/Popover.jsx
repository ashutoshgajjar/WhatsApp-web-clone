import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';

const Popover = ({ isOpen, onClose, children, anchorRef, className = '' }) => {
  const popoverRef = useRef(null);
  const [position, setPosition] = useState({
    top: 0,
    left: 0,
    placement: 'bottom',
  });

  useLayoutEffect(() => {
    if (isOpen && popoverRef.current && anchorRef.current) {
      const updatePosition = () => {
        const anchor = anchorRef.current.getBoundingClientRect();
        const popover = popoverRef.current.getBoundingClientRect();
        const viewport = {
          width: window.innerWidth,
          height: window.innerHeight,
        };

        let newPosition = {
          top: anchor.bottom + 8,
          left: anchor.left,
          placement: 'bottom',
        };

        if (newPosition.left + popover.width > viewport.width) {
          newPosition.left = viewport.width - popover.width - 16;
        }

        if (newPosition.left < 16) {
          newPosition.left = 16;
        }

        if (newPosition.top + popover.height > viewport.height) {
          newPosition.top = anchor.top - popover.height - 8;
          newPosition.placement = 'top';

          if (newPosition.top < 16) {
            newPosition.top = 16;
            newPosition.placement = 'center';
          }
        }

        setPosition(newPosition);
      };

      updatePosition();

      const handleUpdate = () => updatePosition();
      window.addEventListener('resize', handleUpdate);
      window.addEventListener('scroll', handleUpdate, true);

      return () => {
        window.removeEventListener('resize', handleUpdate);
        window.removeEventListener('scroll', handleUpdate, true);
      };
    }
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target) &&
        anchorRef.current &&
        !anchorRef.current.contains(event.target)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () =>
        document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={popoverRef}
      className={`fixed w-52 bg-white dark:bg-neutral-800 rounded-xl shadow-lg border border-neutral-200 dark:border-neutral-700 p-2 z-50 ${className}`}
      style={{
        top: position.top,
        left: position.left,
      }}
    >
      {children}
    </div>
  );
};

export default Popover;

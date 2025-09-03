import { useEffect } from 'react';
import css from './Modal.module.css';
import { createPortal } from 'react-dom';

interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
}

const Modal = ({ onClose, children }: ModalProps) => {
  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div
      onClick={handleBackdropClick}
      className={css.backdrop}
      role="dialog"
      aria-modal="true"
    >
      <div className={css.modal}>{children}</div>
    </div>
  );
};

//   return createPortal(
//     <div
//       onClick={handleBackdropClick}
//       className={css.backdrop}
//       role="dialog"
//       aria-modal="true"
//     >
//       <div className={css.modal}>
//         <button
//           className={css.closeButton}
//           onClick={onClose}
//           aria-label="Close modal"
//         >
//           <HiMiniXMark className={css.closeX} />
//         </button>
//         {children}
//       </div>
//     </div>,
//     document.body,
//   );
// };

export default Modal;

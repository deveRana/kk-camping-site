'use client';

import React, { useContext } from 'react';
import { ModalContext } from './ModalContext';

const SIZE_CLASSES = {
  sm: 'max-w-md',
  md: 'max-w-xl',
  lg: 'max-w-3xl',
  xl: 'max-w-5xl',
  full: 'max-w-full m-4',
};

export const ModalRoot: React.FC = () => {
  const context = useContext(ModalContext);

  if (!context || !context.isOpen || !context.modalContent) {
    return null;
  }

  const { modalContent, modalOptions, closeModal } = context;
  const sizeClass = SIZE_CLASSES[modalOptions.size || 'md'];

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget && modalOptions.closeOnOverlayClick !== false) {
      closeModal();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity animate-fadeIn"
      onClick={handleOverlayClick}
      aria-modal="true"
      role="dialog"
    >
      <div
        className={`relative w-full ${sizeClass} bg-cream border border-cream-dark rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col transform transition-all animate-scaleUp`}
      >
        {modalOptions.title && (
          <div className="flex items-center justify-between px-6 py-4 border-b border-cream-dark bg-white/50">
            <h3 className="font-display text-xl font-semibold text-terracotta-deep">
              {modalOptions.title}
            </h3>
            <button
              onClick={closeModal}
              className="p-1 text-terracotta-deep/60 hover:text-terracotta transition rounded-lg hover:bg-cream-dark/50"
              aria-label="Close modal"
            >
              <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}

        {!modalOptions.title && (
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 z-10 p-2 text-terracotta-deep/70 hover:text-terracotta bg-cream/80 backdrop-blur transition rounded-full hover:bg-white shadow"
            aria-label="Close modal"
          >
            <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}

        <div className="overflow-y-auto p-6 flex-1">{modalContent}</div>
      </div>
    </div>
  );
};

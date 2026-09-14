'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { ModalContext, ModalOptions } from './ModalContext';
import { ModalRoot } from './ModalRoot';

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [modalContent, setModalContent] = useState<React.ReactNode | null>(null);
  const [modalOptions, setModalOptions] = useState<ModalOptions>({
    size: 'md',
    closeOnOverlayClick: true,
  });
  const [isOpen, setIsOpen] = useState(false);

  const openModal = useCallback((content: React.ReactNode, options?: ModalOptions) => {
    setModalContent(content);
    setModalOptions({
      size: options?.size || 'md',
      closeOnOverlayClick: options?.closeOnOverlayClick ?? true,
      title: options?.title,
    });
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    setTimeout(() => {
      setModalContent(null);
    }, 200);
  }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle ESC key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        closeModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeModal]);

  return (
    <ModalContext.Provider value={{ modalContent, modalOptions, isOpen, openModal, closeModal }}>
      {children}
      <ModalRoot />
    </ModalContext.Provider>
  );
};

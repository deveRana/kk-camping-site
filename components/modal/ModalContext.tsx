'use client';

import React, { createContext } from 'react';

export interface ModalOptions {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  closeOnOverlayClick?: boolean;
  title?: string;
}

export interface ModalContextType {
  modalContent: React.ReactNode | null;
  modalOptions: ModalOptions;
  isOpen: boolean;
  openModal: (content: React.ReactNode, options?: ModalOptions) => void;
  closeModal: () => void;
}

export const ModalContext = createContext<ModalContextType | undefined>(undefined);

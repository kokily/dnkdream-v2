'use client';

import { ToastContainer } from 'react-toastify';

export default function ToastWrapper() {
  return (
    <ToastContainer
      draggable={false}
      closeOnClick={true}
      position="top-right"
    />
  );
}

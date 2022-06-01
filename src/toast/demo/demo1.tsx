import React from 'react';
import { toast, Toaster } from 'elegant-toast';

export default () => {
  return (
    <div>
      <button
        onClick={() => {
          toast.success('Successfully toasted!');
        }}
      >
        top-center
      </button>
      <button
        onClick={() => {
          toast('top-left', { position: 'top-left' });
        }}
      >
        top-left
      </button>
      <Toaster />
    </div>
  );
};

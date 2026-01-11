
// import { useCallback } from 'react';

export const useApplicationContext = () => {
  const overlay = {
    open: (_type?: any, _opts?: any) => ({
      execute: async (fn: () => Promise<void>) => {
        try {
          console.log('Overlay start');
          await fn();
        } finally {
          console.log('Overlay end');
        }
      }
    })
  };

  const navigation = {
    openConfirmDialog: async (message: string) => {
      return window.confirm(message);
    },
    openInformationDialog: async (message: string) => {
      alert(message);
    },
    openErrorDialog: async (message: string) => {
      alert(message);
    },
    clearMessage: () => {}
  };

  return {
    overlay,
    navigation
  };
};

// Sau này có thể thay bằng:
// MUI Dialog
// Snackbar
// Backdrop
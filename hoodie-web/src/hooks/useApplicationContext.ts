/**
 * @author duynguyen © 2025
 */
// import { useCallback } from 'react';
import { dialogService } from "../services/dialogService";

/**
 * useApplicationContext
 * 
 * @returns useApplicationContext
 */
export const useApplicationContext = () => {
  const overlay = {
    open: (_type?: any, _opts?: any) => ({
      execute: async (fn: () => Promise<void>) => {
        try {
          await fn();
          // return {
          //   isError: false
          // };
        } catch (error) {
          console.error(error);
          // return {
          //   isError: true
          // };
        } finally {
          console.log('Overlay end');
        }
      }
    })
  };

  const navigation = {
    openConfirmDialog: async (message: string) => {
      //return window.confirm(message);
      return await dialogService.open('confirm', message);
    },
    openInformationDialog: async (message: string) => {
      await dialogService.open('info', message);
    },
    openErrorDialog: async (message: string) => {
      await dialogService.open('error', message);
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
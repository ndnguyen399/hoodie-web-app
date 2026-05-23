/**
 * @author duynguyen © 2025
 */
import React from 'react';
import type { MessageDialogModel } from './MessageDialog';
import { dialogService } from '../../services/dialogService';
import MessageDialog from './MessageDialog';

/**
 * MessageDialogProvider
 * 
 * @returns MessageDialogProvider
 */
const MessageDialogProvider: React.FC = () => {

    const [model, setModel] =
        React.useState<MessageDialogModel>({
            open: false,
            type: 'info',
            title: '',
            message: ''
        });

    React.useEffect(() => {

        dialogService.subscribe(setModel);

        return () => {
            dialogService.unsubscribe();
        };

    }, []);

    return (
        <MessageDialog
            model={model}
            onClose={result => {
                dialogService.close(result);
            }}
        />
    );
};

export default MessageDialogProvider;
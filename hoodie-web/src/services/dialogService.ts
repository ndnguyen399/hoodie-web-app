/**
 * @author duynguyen © 2025
 */
import type {
    MessageDialogModel,
    MessageDialogType
} from '../templates/MessageDialog/MessageDialog';

/**
 * DialogService
 */
class DialogService {
    private listener?: Listener;
    private resolver?:
        (value: boolean) => void;

    subscribe(listener: Listener) {
        this.listener = listener;
    }

    unsubscribe() {
        this.listener = undefined;
    }

    async open(
        type: MessageDialogType,
        message: string
    ): Promise<boolean> {
        return new Promise(resolve => {
            this.resolver = resolve;
            this.listener?.({
                open: true,
                type,
                title:
                    type === 'confirm'
                        ? 'Confirm'
                        : type === 'error'
                            ? 'Error'
                            : 'Information',
                message
            });
        });
    }

    close(result: boolean) {
        this.listener?.({
            open: false,
            type: 'info',
            title: '',
            message: ''
        });
        this.resolver?.(result);
    }
}

type Listener = (model: MessageDialogModel) => void;

export const dialogService = new DialogService();
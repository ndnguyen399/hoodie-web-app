/**
 * @author duynguyen © 2025
 */
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';

/**
 * MessageDialog
 * 
 * @param props 
 * @returns JSX Element
 */
export default function MessageDialog ({
    model,
    onClose
}: Props ) {
    return (
        <Dialog
            open={model.open}
            onClose={() => onClose(false)}
            maxWidth='sm'
            fullWidth
        >
            <DialogTitle sx={{display: 'flex', alignItems: 'center'}}>
                {model.type === 'error' ? (
                    <ReportGmailerrorredIcon sx={{color: 'red', mr: 1}} />
                ) : (
                    <PriorityHighIcon sx={{color: 'blue', mr: 1}} />
                )}
                {model.title}
            </DialogTitle>

            <DialogContent>
                <DialogContentText
                    sx={{
                        whiteSpace: 'pre-line'
                    }}
                >
                    {model.message}
                </DialogContentText>
            </DialogContent>

            <DialogActions>
                {model.type === 'confirm' ? (
                    <>
                        <Button
                            variant='contained'
                            onClick={() => onClose(true)}
                        >
                            OK
                        </Button>

                        <Button
                            variant='outlined'
                            onClick={() => onClose(false)}
                        >
                            Cancel
                        </Button>
                    </>
                ) : (
                    <Button
                        variant='contained'
                        onClick={() => onClose(true)}
                    >
                        OK
                    </Button>
                )}
            </DialogActions>
        </Dialog>
    );
};

export type MessageDialogType =
    | 'confirm'
    | 'info'
    | 'error';

export interface MessageDialogModel {
    open: boolean;
    type: MessageDialogType;
    title?: string;
    message: string;
}

interface Props {
    model: MessageDialogModel;
    onClose: (result: boolean) => void;
}
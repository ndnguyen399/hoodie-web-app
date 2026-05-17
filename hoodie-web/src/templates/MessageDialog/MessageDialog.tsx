/**
 * @author duynguyen © 2025
 */
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import InfoIcon from '@mui/icons-material/Info';
import { useMemo } from 'react';
import type { SvgIconProps } from '@mui/material';

/**
 * Dialog
 * 
 * @param props 
 * @returns JSX Element
 */
export default function MessageDialog({ 
  open,
  onClose,
  messages = [],
  isError = false,
  title,
  confirmText = 'Đóng',
}: SmartMessageDialogProps) {
    // Nhóm tin nhắn theo type
    const groupedMessages = useMemo(() => {
        const groups: Record<MessageStatus, string[]> = {
        success: [], error: [], warning: [], info: [],
        };
        messages.forEach((msg) => {
        if (groups[msg.type]) {
            groups[msg.type].push(msg.content);
        }
        });
        return groups;
    }, [messages]);

    // Xác định trạng thái chính của dialog
    const primaryType = useMemo<MessageStatus>(() => {
        if (isError) return 'error'; // Ưu tiên flag isError
        if (groupedMessages.error.length > 0) return 'error';
        if (groupedMessages.warning.length > 0) return 'warning';
        if (groupedMessages.info.length > 0) return 'info';
        return 'success';
    }, [isError, groupedMessages]);

    const config = dialogConfig[primaryType];
    const Icon = config.icon;

    // Kiểm tra có tin nhắn nào không
    const hasContent = Object.values(groupedMessages).some((arr) => arr.length > 0);

    return (
        <BootstrapDialog
            open={open}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
            aria-labelledby="smart-dialog-title"
        >
        <DialogTitle
            sx={{ display: 'flex', alignItems: 'center', gap: 1.5, pb: 1 }}
            id="smart-dialog-title"
        >
            <Icon sx={{ color: config.color, fontSize: 28 }} />
            <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
            {title || config.defaultTitle}
            </Typography>
        </DialogTitle>

        <DialogContent dividers>
            {!hasContent ? (
            <Typography color="text.secondary" textAlign="center" py={1}>
                Không có thông tin để hiển thị.
            </Typography>
            ) : (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {(Object.keys(groupedMessages) as MessageStatus[])
                .filter((type) => groupedMessages[type].length > 0)
                .map((type) => {
                    const TypeIcon = dialogConfig[type].icon;
                    const typeColor = dialogConfig[type].color;
                    return (
                    <Box key={type}>
                        <Typography
                        variant="subtitle2"
                        sx={{
                            color: typeColor,
                            fontWeight: 600,
                            mb: 0.5,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 0.5,
                        }}
                        >
                        <TypeIcon sx={{ fontSize: 16 }} /> {dialogConfig[type].defaultTitle}
                        </Typography>
                        {groupedMessages[type].map((msg, idx) => (
                        <Typography
                            key={idx}
                            sx={{
                            ml: 2.5,
                            pl: 1.5,
                            borderLeft: `3px solid ${typeColor}`,
                            mb: 0.5,
                            whiteSpace: 'pre-line',
                            fontSize: '0.95rem',
                            }}
                        >
                            {msg}
                        </Typography>
                        ))}
                    </Box>
                    );
                })}
            </Box>
            )}
        </DialogContent>

        <DialogActions sx={{ justifyContent: 'flex-end', pt: 1 }}>
            <Button onClick={onClose} variant="contained" color={primaryType} autoFocus>
            {confirmText}
            </Button>
        </DialogActions>
        </BootstrapDialog>
    );
};

// 1. Styled Dialog (giữ nguyên cấu trúc chuẩn MUI)
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': { padding: theme.spacing(2) },
  '& .MuiDialogActions-root': { padding: theme.spacing(1) },
}));

// 2. Định nghĩa kiểu dữ liệu
export type MessageStatus = 'success' | 'error' | 'warning' | 'info';

export interface MessageItem {
  type: MessageStatus;
  content: string;
}

export interface SmartMessageDialogProps {
  open: boolean;
  onClose: () => void;
  messages?: MessageItem[]; // List message từ response
  isError?: boolean;        // Flag bắt buộc hiển thị dạng lỗi
  title?: string;
  confirmText?: string;
}

// 3. Cấu hình UI theo trạng thái
type DialogConfig = {
  icon: React.ComponentType<SvgIconProps>;
  color: string;
  defaultTitle: string;
};

const dialogConfig: Record<MessageStatus, DialogConfig> = {
  success: { icon: CheckCircleIcon, color: 'success.main', defaultTitle: 'Thành công' },
  error:   { icon: ErrorIcon,       color: 'error.main',   defaultTitle: 'Đã xảy ra lỗi' },
  warning: { icon: WarningAmberIcon, color: 'warning.main', defaultTitle: 'Cảnh báo' },
  info:    { icon: InfoIcon,        color: 'info.main',    defaultTitle: 'Thông tin' },
};
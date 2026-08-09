/**
 * @author duynguyen © 2025
 */
import { useEffect } from "react";
import { Box, Button, Chip, CircularProgress, Container, Divider, Paper, Typography } from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HomeIcon from '@mui/icons-material/Home';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import type { PageProps } from "./PaymentSuccess.types";
import { useStore } from "./PaymentSuccessStore";


/**
 * PaymentSuccessContent
 * 
 * @param props 
 * @returns PaymentSuccessContent
 */
export const PaymentSuccessContent: React.FC<PageProps> = (props) => {
    const { t, state, action } = useStore(props);

    useEffect(() => {
        action.load();
    }, []);

    if (state.loading) {
        return <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}><CircularProgress /></Box>;
    }

    return (
        <Container maxWidth="md" sx={{ py: 6 }}>
            <Box sx={{ textAlign: 'center', mb: 5 }}>
                <CheckCircleIcon sx={{ fontSize: 100, color: 'success.main' }} />
                <Typography variant="h3" fontWeight="bold" color="success.main" gutterBottom>
                    Đặt hàng thành công!
                </Typography>
                <Typography variant="h6" color="text.secondary">
                    Cảm ơn bạn đã mua hàng tại cửa hàng
                </Typography>
            </Box>

            <Paper elevation={3} sx={{ p: 4, borderRadius: 3, mb: 4 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <Typography variant="h5" fontWeight="bold">
                        Thông tin đơn hàng
                    </Typography>
                    <Chip
                        label="Đã thanh toán"
                        color="success"
                        variant="filled"
                    />
                </Box>

            </Paper>

            {/* Nút hành động */}
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, justifyContent: 'center' }}>
                <Button
                    variant="contained"
                    size="large"
                    startIcon={<ReceiptLongIcon />}
                    // onClick={() => action.viewOrderDetail(order.orderId)}
                    href="/user/profile"
                    sx={{ px: 4 }}
                >
                    Xem chi tiết đơn hàng
                </Button>

                <Button
                    variant="outlined"
                    size="large"
                    startIcon={<HomeIcon />}
                    href="/"
                    sx={{ px: 4 }}
                >
                    Về trang chủ
                </Button>

                <Button
                    variant="outlined"
                    size="large"
                    href="/product-search"
                >
                    Tiếp tục mua sắm
                </Button>
            </Box>

            <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 5 }}>
                Chúng tôi sẽ liên hệ với bạn sớm nhất qua số điện thoại để xác nhận đơn hàng.
            </Typography>
        </Container>
    );
};
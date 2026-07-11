/**
 * @author duynguyen © 2025
 */
import { useEffect, useState } from 'react';
import type { PageProps } from "./Checkout.types";
import { useStore } from "./CheckoutStore";
import { Box, Button, Checkbox, CircularProgress, Container, Divider, FormControl, FormControlLabel, Grid, MenuItem, Paper, Radio, RadioGroup, TextField, Typography, useTheme } from '@mui/material';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import PaymentIcon from '@mui/icons-material/Payment'
import Image from '../../templates/Image';

/**
 * CheckoutContent
 * 
 * @param props 
 * @returns CheckoutContent
 */
export const CheckoutContent: React.FC<PageProps> = (props) => {
    const { t, state, action } = useStore(props);

    const theme = useTheme();

    useEffect(() => {
        action.load();
    }, []);

    if (state.loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
                Thanh toán
            </Typography>

            <Grid container spacing={4}>
                {/* Left: Thông tin giao hàng + Phương thức thanh toán */}
                <Grid size={{ xs: 12, md: 7 }}>
                    <Paper sx={{ p: 3, mb: 3 }} elevation={2}>
                        <Typography variant="h6" fontWeight="bold" gutterBottom>
                            Thông tin giao hàng
                        </Typography>

                        <Grid container spacing={2}>
                            <Grid size={{ xs: 12, sm: 12 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center'}}>
                                    <Typography fontWeight='500'>Họ và tên: </Typography>
                                    <Typography>nguyen</Typography>
                                </Box>
                            </Grid>
                            <Grid size={{ xs: 12, sm: 12 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center'}}>
                                    <Typography fontWeight='500'>Số điện thoại: </Typography>
                                    <Typography>nguyen</Typography>
                                </Box>
                            </Grid>
                            <Grid size={{ xs: 12 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center'}}>
                                    <Typography fontWeight='500'>Địa chỉ: </Typography>
                                    <Typography>nguyen</Typography>
                                </Box>
                            </Grid>
                        </Grid>
                    </Paper>

                    {/* Phương thức thanh toán */}
                    <Paper sx={{ p: 3 }} elevation={2}>
                        <Typography variant="h6" fontWeight="bold" gutterBottom>
                            Phương thức thanh toán
                        </Typography>

                        <FormControl component="fieldset">
                            <RadioGroup
                                // value={paymentMethod}
                                // onChange={(e) => action.setPaymentMethod(e.target.value)}
                            >
                                <FormControlLabel
                                    value="cod"
                                    control={<Radio />}
                                    label={
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <LocalShippingIcon color="primary" />
                                            Thanh toán khi nhận hàng (COD)
                                        </Box>
                                    }
                                />
                                <FormControlLabel
                                    value="bank"
                                    control={<Radio />}
                                    label={
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <PaymentIcon color="primary" />
                                            Chuyển khoản ngân hàng
                                        </Box>
                                    }
                                />
                            </RadioGroup>
                        </FormControl>
                    </Paper>
                </Grid>

                {/* Right: Tóm tắt đơn hàng */}
                <Grid size={{ xs: 12, md: 5 }}>
                    <Paper sx={{ p: 3, position: 'sticky', top: 20 }} elevation={3}>
                        <Typography variant="h6" fontWeight="bold" gutterBottom>
                            Đơn hàng của bạn
                        </Typography>

                        {state.checkoutInitialDomainModel?.search?.map((group) => (
                            // Duyệt qua danh sách productLists bên trong mỗi group
                            group.productLists?.map((item) => (
                                <Box key={item.productId} sx={{ display: 'flex', gap: 2, mb: 2 }}>
                                    <Image
                                        src={item.imageUrl || "/images/no-image.png"}
                                        alt={item.productName + "index-checkout-item"}
                                        style={{ width: 70, height: 70, objectFit: 'cover', borderRadius: 8 }}
                                    />
                                    <Box sx={{ flexGrow: 1 }}>
                                        <Typography variant="body2" fontWeight="medium">
                                            {item.productName}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            x{item.quantity}
                                        </Typography>
                                    </Box>
                                    <Typography fontWeight="medium">
                                        {(item.price! * item.quantity!).toLocaleString('vi-VN')}đ
                                    </Typography>
                                </Box>
                            ))
                        ))}

                        <Divider sx={{ my: 3 }} />

                        <Box sx={{ mb: 2 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                <Typography>Tạm tính</Typography>
                                <Typography>{state.totalAmount.toLocaleString('vi-VN')}đ</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                <Typography>Phí vận chuyển</Typography>
                                <Typography>{state.shippingAmount.toLocaleString('vi-VN')}đ</Typography>
                            </Box>
                        </Box>

                        <Divider sx={{ my: 2 }} />

                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                            <Typography variant="h6">Tổng thanh toán</Typography>
                            <Typography variant="h5" color="primary" fontWeight="bold">
                                {(state.totalAmount+state.shippingAmount).toLocaleString('vi-VN')}đ
                            </Typography>
                        </Box>

                        {/* Voucher */}
                        <Box sx={{ gap: 1, mb: 3 }}>
                            <Typography variant="h6">Mô tả dành cho shop</Typography>
                            <Typography color='orange'>
                                {/* Vận chuyển riêng nhé */}
                            </Typography>
                        </Box>

                        <FormControlLabel
                            control={
                                <Checkbox
                                    // checked={agreeTerms}
                                    // onChange={(e) => setAgreeTerms(e.target.checked)}
                                />
                            }
                            label="Tôi đồng ý với Điều khoản & Chính sách của cửa hàng"
                        />

                        <Button
                            variant="contained"
                            fullWidth
                            size="large"
                            // disabled={!agreeTerms || checkoutItems.length === 0}
                            // onClick={action.placeOrder}
                            sx={{ mt: 3, py: 1.8, fontSize: '1.1rem', fontWeight: 'bold' }}
                        >
                            Đặt hàng
                        </Button>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};
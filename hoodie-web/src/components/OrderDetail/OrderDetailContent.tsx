/**
 * @author duynguyen © 2025
 */
import { useEffect } from "react";
import { Box, Button, Chip, CircularProgress, Container, Divider, Grid, Paper, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import type { PageProps } from "./OrderDetail.types";
import { useStore } from "./OrderDetailStore";

/**
 * OrderDetailContent
 * 
 * @param props 
 * @returns OrderDetailContent
 */
export const OrderDetailContent: React.FC<PageProps> = (props) => {
    const { t, state, action } = useStore(props);

    useEffect(() => {
        action.load();
    }, []);

    if (state.loading) {
        return <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}><CircularProgress /></Box>;
    }

    const statusMap: Record<string, { label: string; color: "default" | "warning" | "info" | "success" | "error" }> = {
        pending: { label: "Chờ xác nhận", color: "warning" },
        confirmed: { label: "Đã xác nhận", color: "info" },
        shipping: { label: "Đang giao", color: "info" },
        completed: { label: "Hoàn thành", color: "success" },
        cancelled: { label: "Đã hủy", color: "error" },
    };

    const statusInfo = statusMap[state.orderSearchDomainModel.orderStatus!] || { label: state.orderSearchDomainModel.orderStatus!, color: "default" };

    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            {/* Header */}
            <Box sx={{ display: "block", alignItems: "center", gap: 2, mb: 4 }}>
                <Button 
                    startIcon={<ArrowBackIcon />} 
                    onClick={action.goBack}
                    sx={{ my: 2 }}
                >
                    Quay lại
                </Button>
                <Typography variant="h4" fontWeight="bold">
                    Chi tiết đơn hàng
                </Typography>
            </Box>

            {/* Thông tin đơn hàng */}
            <Paper sx={{ p: 3, mb: 3, borderRadius: 2 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 2, mb: 2 }}>
                    <Box>
                        <Typography variant="h6" fontWeight="bold">
                            Mã đơn hàng: {state.orderSearchDomainModel.orderId}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Đặt lúc: {new Date(state.orderSearchDomainModel.createdAt!).toLocaleString("vi-VN")}
                        </Typography>
                    </Box>
                    <Chip label={statusInfo.label} color={statusInfo.color} />
                </Box>

                <Divider sx={{ my: 2 }} />

                <Grid container spacing={2}>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <Typography variant="subtitle2" color="text.secondary">
                            <p>Phương thức thanh toán: {state.orderSearchDomainModel.payment?.paymentMethod === "cod"
                                ? "Thanh toán khi nhận hàng (COD)"
                                : state.orderSearchDomainModel.payment?.paymentMethod === "bank"
                                ? "Chuyển khoản ngân hàng"
                                : state.orderSearchDomainModel.payment?.paymentMethod}</p>
                        </Typography>
                        <Typography variant="subtitle2" color="text.secondary">
                            <p>Trạng thái thanh toán: {state.orderSearchDomainModel.payment?.paymentStatus === "paid"
                                ? "Đã thanh toán"
                                : state.orderSearchDomainModel.payment?.paymentMethod === "bank"
                                ? "Chưa thanh toán"
                                : state.orderSearchDomainModel.payment?.paymentMethod}</p>
                        </Typography>
                    </Grid>
                </Grid>
            </Paper>

            {/* Thông tin người nhận */}
            <Paper sx={{ p: 3, mb: 3, borderRadius: 2 }}>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                    Thông tin người nhận
                </Typography>
                <Typography>{state.orderSearchDomainModel.address?.recipientName}</Typography>
                <Typography>{state.orderSearchDomainModel.address?.phone}</Typography>
                <Typography color="text.secondary">
                    {state.orderSearchDomainModel.address?.street || ""}, 
                    {state.orderSearchDomainModel.address?.ward || ""}, 
                    {state.orderSearchDomainModel.address?.district || ""}, 
                    {state.orderSearchDomainModel.address?.city || ""}
                </Typography>
            </Paper>

            {/* Danh sách sản phẩm */}
            <Paper sx={{ p: 3, mb: 3, borderRadius: 2 }}>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                    Sản phẩm ({state.orderSearchDomainModel.items?.length})
                </Typography>

                {state.orderSearchDomainModel.items?.map((item) => (
                    <Box key={item.productId} sx={{ display: "flex", gap: 2, py: 2, borderBottom: "1px solid", borderColor: "divider" }}>
                        {/* <Box
                            sx={{
                                width: 80,
                                height: 80,
                                borderRadius: 2,
                                overflow: "hidden",
                                flexShrink: 0,
                                bgcolor: "#f5f5f5",
                            }}
                        >
                            <img
                                src={item.imageUrl || "/images/no-image.png"}
                                alt={item.productName}
                                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                            />
                        </Box> */}
                        <Box sx={{ flexGrow: 1 }}>
                            <Typography fontWeight="medium">{item.productName}</Typography>
                            <Typography variant="body2" color="text.secondary">
                                Số lượng: {item.quantity}
                            </Typography>
                        </Box>
                        <Typography fontWeight="medium">
                            {(item.unitPrice * item.quantity).toLocaleString("vi-VN")}đ
                        </Typography>
                    </Box>
                ))}
            </Paper>

            {/* Tổng kết */}
            <Paper sx={{ p: 3, borderRadius: 2 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                    <Typography>Tạm tính</Typography>
                    <Typography>{(state.orderSearchDomainModel.totalAmount! - state.orderSearchDomainModel.shippingFee!).toLocaleString("vi-VN")}đ</Typography>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                    <Typography>Phí vận chuyển</Typography>
                    {/* <Typography>{state.orderSearchDomainModel.shippingFee!.toLocaleString("vi-VN")}đ</Typography> */}
                    <Typography>{(state.orderSearchDomainModel?.shippingFee ?? 0).toLocaleString("vi-VN")}đ</Typography>
                    
                </Box>
                <Divider sx={{ my: 2 }} />
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Typography variant="h6">Tổng thanh toán</Typography>
                    <Typography variant="h5" color="primary" fontWeight="bold">
                        {(state.orderSearchDomainModel.totalAmount ?? 0).toLocaleString("vi-VN")}đ
                    </Typography>
                </Box>

                {state.orderSearchDomainModel.orderStatus === "completed" && (
                    <Button
                        variant="contained"
                        fullWidth
                        size="large"
                        sx={{ mt: 3 }}
                        // onClick={action.buyAgain}
                    >
                        Mua lại
                    </Button>
                )}
            </Paper>
        </Container>
    );
};
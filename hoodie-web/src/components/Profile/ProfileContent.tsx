/**
 * @author duynguyen © 2025
 */
import { useEffect } from "react";
import { Autocomplete, Avatar, Box, Button, Chip, CircularProgress, Container, Divider, Drawer, Grid, IconButton, List, ListItem, ListItemText, Paper, Tab, Tabs, TextField, Typography } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import AddIcon from '@mui/icons-material/Add';
import type { PageProps } from "./Profile.types";
import { useStore } from "./ProfileStore";

/**
 * ProfileContent
 * 
 * @param props 
 * @returns ProfileContent
 */
export const ProfileContent: React.FC<PageProps> = (props) => {
    const { t, state, action } = useStore(props);

    useEffect(() => {
        action.load();
    }, []);

    if (state.loading) {
        return <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}><CircularProgress /></Box>;
    }

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
                Trang cá nhân
            </Typography>

            <Grid container spacing={4}>
                {/* Sidebar - Avatar & Thông tin cơ bản */}
                <Grid size={{ xs: 12, md: 4 }}>
                    <Paper sx={{ p: 4, textAlign: 'center', height: '50vh' }}>
                        <Box sx={{ position: 'relative', display: 'inline-block', mb: 3 }}>
                            <Avatar
                                src={state.profileDomainModel.avatarUrl || "/images/default-avatar.png"}
                                sx={{ width: 140, height: 140, mx: 'auto', border: '4px solid #f0f0f0' }}
                            />
                            {/* Thẻ input ẩn để chọn file */}
                            <input
                                type="file"
                                accept="image/*"
                                multiple // Cho phép chọn nhiều file
                                id="avatar-upload-input"
                                style={{ display: 'none' }}
                                onChange={(e) => {
                                    if (e.target.files) {
                                        // Chuyển đổi FileList thành mảng File[] và gọi hàm
                                        const fileArray = Array.from(e.target.files);
                                        action.onChangeFile(fileArray);
                                    }
                                }}
                            />

                            {/* Gắn sự kiện click để kích hoạt input ẩn */}
                            <label htmlFor="avatar-upload-input">
                                <IconButton
                                    component="span" // Quan trọng để IconButton đóng vai trò như thẻ label kích hoạt input
                                    sx={{ position: 'absolute', bottom: 8, right: 8, bgcolor: 'background.paper' }}
                                    size="small"
                                    disabled={!state.editing} // Chỉ cho phép đổi ảnh khi đang ở chế độ chỉnh sửa
                                >
                                    <EditIcon fontSize="small" />
                                </IconButton>
                            </label>
                        </Box>

                        <Typography variant="h6" fontWeight="bold" gutterBottom>
                            {state.profileDomainModel.fullName}
                        </Typography>
                        <Typography color="text.secondary" gutterBottom>
                            {state.profileDomainModel.email}
                        </Typography>

                        <Button
                            variant="outlined"
                            fullWidth
                            sx={{ mt: 4 }}
                            onClick={() => action.setIsEditing(!state.editing)}
                        >
                            {state.editing ? "Hủy chỉnh sửa" : "Chỉnh sửa thông tin"}
                        </Button>
                    </Paper>
                </Grid>

                {/* Main Content */}
                <Grid size={{ xs: 12, md: 8 }}>
                    <Paper sx={{ p: 4 }}>
                        <Tabs 
                            value={state.activeTab} 
                            onChange={(_, newValue) => action.setActiveTab(newValue)}
                            sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}
                        >
                            <Tab label="Thông tin cá nhân" />
                            <Tab label="Địa chỉ giao hàng" />
                            <Tab label="Đơn hàng" />
                        </Tabs>

                        {/* Tab 1: Thông tin cá nhân */}
                        {state.activeTab === 0 && (
                            <Box>
                                <Grid container spacing={3} py={3}>
                                    <Grid size={{ xs: 12, sm: 6 }}>
                                        <TextField
                                            fullWidth
                                            label="Họ và tên"
                                            value={state.profileDomainModel.fullName || ''}
                                            disabled={!state.editing}
                                            slotProps={{
                                                htmlInput: {
                                                    maxLength: 255
                                                },
                                                inputLabel: {
                                                    shrink: state.profileDomainModel?.fullName ? true : false
                                                }
                                            }}
                                            onChange={(e) => {
                                                action.onChangeField("fullName", e.target.value);
                                            }}
                                        />
                                    </Grid>
                                    <Grid size={{ xs: 12, sm: 6 }}>
                                        <TextField
                                            fullWidth
                                            label="Email"
                                            value={state.profileDomainModel.email || ''}
                                            disabled
                                            slotProps={{
                                                htmlInput: {
                                                    maxLength: 255
                                                },
                                                inputLabel: {
                                                    shrink: state.profileDomainModel?.email ? true : false
                                                }
                                            }} 
                                        />
                                    </Grid>
                                    <Grid size={{ xs: 12, sm: 6 }}>
                                        <TextField
                                            fullWidth
                                            label="Số điện thoại"
                                            value={state.profileDomainModel.phone || ''}
                                            disabled={!state.editing}
                                            onChange={(e) => {
                                                action.onChangeField("phone", e.target.value);
                                            }}
                                        />
                                    </Grid>
                                    <Grid size={{ xs: 12, sm: 6 }}>
                                        <TextField
                                            fullWidth
                                            label="Ngày sinh"
                                            type="date"
                                            value={state.profileDomainModel.birthDate ? state.profileDomainModel.birthDate.split('T')[0] : ''}
                                            disabled={!state.editing}
                                            InputLabelProps={{ shrink: true }}
                                            onChange={(e) => {
                                                action.onChangeField("birthDate", e.target.value);
                                            }}
                                        />
                                    </Grid>
                                    <Grid size={{ xs: 12, sm: 6 }}>
                                        <Autocomplete
                                            disablePortal
                                            disableClearable={false}
                                            options={state.genderAC?.search ?? []}
                                            value={
                                                state.genderAC?.search?.find(
                                                    item =>
                                                        item.codeName ===
                                                        state.profileDomainModel?.gender
                                                ) ?? null
                                            }
                                            getOptionLabel={(option) => option.codeValue ?? ''}
                                            renderOption={(props, option) => (
                                                <li {...props} key={option.codeName}>
                                                {option.codeValue}
                                                </li>
                                            )}
                                            isOptionEqualToValue={(option, value) => 
                                                option.codeName === value.codeName
                                            }
                                            onOpen={action.items.gender.handleOpen}
                                            onChange={action.items.gender.onChange}
                                            sx={{ width: '100%' }}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    label={t('label-gender')}
                                                />
                                            )}
                                            disabled={!state.editing}
                                        />
                                    </Grid>
                                    <Grid size={{ xs: 12 }}>
                                        <TextField
                                            fullWidth
                                            label="Ghi chú"
                                            value={state.profileDomainModel.note || ''}
                                            disabled={!state.editing}
                                            slotProps={{
                                                htmlInput: {
                                                    maxLength: 255
                                                },
                                                inputLabel: {
                                                    shrink: state.profileDomainModel?.note ? true : false
                                                }
                                            }}
                                            onChange={(e) => {
                                                action.onChangeField("note", e.target.value);
                                            }}
                                        />
                                    </Grid>
                                </Grid>

                                {state.editing && (
                                    <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
                                        <Button
                                            variant="contained"
                                            startIcon={<SaveIcon />}
                                            onClick={action.submitSaveProfile.execute}
                                            loading={state.isSubmitting}
                                        >
                                            Lưu thay đổi
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            onClick={() => action.setIsEditing(!state.editing)}
                                        >
                                            Hủy
                                        </Button>
                                    </Box>
                                )}
                            </Box>
                        )}

                        {/* Tab 2: Địa chỉ giao hàng */}
                        {state.activeTab === 1 && (
                            <Box>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                                    <Typography variant="h6">Địa chỉ giao hàng</Typography>
                                    <Button variant="outlined" 
                                        startIcon={<AddIcon />} 
                                        onClick={() => action.openAddressForm()}
                                    >
                                        Thêm địa chỉ
                                    </Button>
                                </Box>

                                <List>
                                    {state.userAddressesDomainModel.search?.length! > 0 ? (
                                        state.userAddressesDomainModel.search?.map((addr: any) => (
                                            <Paper key={addr.addressId} sx={{ mb: 2, p: 3 }}>
                                                <ListItem disableGutters>
                                                    <ListItemText
                                                        primary={
                                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                                {addr.recipientName}
                                                                {addr.isDefault && <Chip label="Mặc định" color="success" size="small" />}
                                                            </Box>
                                                        }
                                                        secondary={
                                                            <Box component="span" sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                                                                <Typography component="span" variant="body2">
                                                                    {addr.phone}
                                                                </Typography>
                                                                <Typography component="span" variant="body2">
                                                                    {addr.street}, {addr.ward}, {addr.district}, {addr.city}
                                                                </Typography>
                                                            </Box>
                                                        }
                                                    />
                                                </ListItem>
                                            </Paper>
                                        ))
                                    ) : (
                                        <Typography color="text.secondary">Chưa có địa chỉ nào.</Typography>
                                    )}
                                </List>

                                {/* ==================== DRAWER FORM ĐỊA CHỈ ==================== */}
                                <Drawer
                                    anchor="right"
                                    open={state.addressFormOpen}
                                    onClose={() => action.closeAddressForm()}
                                    sx={{ '& .MuiDrawer-paper': { width: { xs: '100%', sm: 420 } } }}
                                >
                                    <Box sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
                                        <Typography variant="h6" fontWeight="bold" gutterBottom>
                                            {state.editingAddress ? "Chỉnh sửa địa chỉ" : "Thêm địa chỉ mới"}
                                        </Typography>

                                        <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
                                            <Grid container spacing={2.5}>
                                                <Grid size={{ xs: 12 }}>
                                                    <TextField
                                                        fullWidth
                                                        label="Tên người nhận"
                                                        value={state.userAddressInitialApplicationModel?.recipientName || ''}
                                                        onChange={(e) => action.onChangeAddressForm("recipientName", e.target.value)}
                                                    />
                                                </Grid>
                                                <Grid size={{ xs: 12 }}>
                                                    <TextField
                                                        fullWidth
                                                        label="Số điện thoại"
                                                        value={state.userAddressInitialApplicationModel?.phone || ''}
                                                        onChange={(e) => action.onChangeAddressForm("phone", e.target.value)}
                                                    />
                                                </Grid>
                                                <Grid size={{ xs: 12 }}>
                                                    <TextField
                                                        fullWidth
                                                        label="Đường / Số nhà"
                                                        multiline
                                                        rows={2}
                                                        value={state.userAddressInitialApplicationModel?.street || ''}
                                                        onChange={(e) => action.onChangeAddressForm("street", e.target.value)}
                                                    />
                                                </Grid>
                                                <Grid size={{ xs: 12, sm: 6 }}>
                                                    <TextField
                                                        fullWidth
                                                        label="Phường / Xã"
                                                        value={state.userAddressInitialApplicationModel?.ward || ''}
                                                        onChange={(e) => action.onChangeAddressForm("ward", e.target.value)}
                                                    />
                                                </Grid>
                                                <Grid size={{ xs: 12, sm: 6 }}>
                                                    <TextField
                                                        fullWidth
                                                        label="Quận / Huyện *"
                                                        value={state.userAddressInitialApplicationModel?.district || ''}
                                                        onChange={(e) => action.onChangeAddressForm("district", e.target.value)}
                                                    />
                                                </Grid>
                                                <Grid size={{ xs: 12 }}>
                                                    <TextField
                                                        fullWidth
                                                        label="Tỉnh / Thành phố *"
                                                        value={state.userAddressInitialApplicationModel?.city || ''}
                                                        onChange={(e) => action.onChangeAddressForm("city", e.target.value)}
                                                    />
                                                </Grid>
                                            </Grid>
                                        </Box>

                                        <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
                                            <Button
                                                fullWidth
                                                variant="outlined"
                                                onClick={() => action.closeAddressForm()}
                                            >
                                                Hủy
                                            </Button>
                                            <Button
                                                fullWidth
                                                variant="contained"
                                                onClick={action.submitAddressForm.execute}
                                                loading={state.isSubmitting}
                                            >
                                                {state.editingAddress ? "Cập nhật" : "Thêm địa chỉ"}
                                            </Button>
                                        </Box>
                                    </Box>
                                </Drawer>
                            </Box>
                        )}

                        {/* Tab 3: Đơn hàng */}
                        {state.activeTab === 2 && (
                            <Box>
                                <Typography variant="h6" fontWeight="bold" gutterBottom>
                                    Lịch sử đơn hàng ({state.orderSearchDomainModel.search?.length})
                                </Typography>

                                {state.orderSearchDomainModel.search?.length === 0 ? (
                                    <Paper sx={{ p: 6, textAlign: 'center' }}>
                                        <Typography color="text.secondary" gutterBottom>
                                            Bạn chưa có đơn hàng nào.
                                        </Typography>
                                        <Button variant="contained" href="/product-search" sx={{ mt: 2 }}>
                                            Mua sắm ngay
                                        </Button>
                                    </Paper>
                                ) : (
                                    state.orderSearchDomainModel.search?.map((order) => {
                                        const statusMap: Record<string, { label: string; color: "default" | "warning" | "info" | "success" | "error" }> = {
                                            pending: { label: "pending", color: "warning" },
                                            confirmed: { label: "confirmed", color: "info" },
                                            shipping: { label: "shipping", color: "info" },
                                            completed: { label: "delivered", color: "success" },
                                            cancelled: { label: "cancelled", color: "error" },
                                        };

                                        const statusInfo = statusMap[order.orderStatus!] || { label: order.orderStatus, color: "default" };

                                        return (
                                            <Paper key={order.orderId} sx={{ mb: 3, p: 3, borderRadius: 2 }}>
                                                {/* Header đơn hàng */}
                                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, flexWrap: 'wrap', gap: 1 }}>
                                                    <Box>
                                                        <Typography variant="subtitle1" fontWeight="bold">
                                                            Mã đơn hàng: {order.orderId}
                                                        </Typography>
                                                        <Typography variant="body2" color="text.secondary">
                                                            Ngày đặt hàng: {new Date(order.createdAt!).toLocaleString('vi-VN')}
                                                        </Typography>
                                                    </Box>
                                                    <Chip label={statusInfo.label} color={statusInfo.color} size="small" />
                                                </Box>

                                                <Divider sx={{ mb: 2 }} />

                                                {/* Danh sách sản phẩm trong đơn */}
                                                {order.items?.map((item) => (
                                                    <Box key={item.productId} sx={{ display: 'flex', gap: 2, mb: 2 }}>
                                                        {/* <Box
                                                            sx={{
                                                                width: 64,
                                                                height: 64,
                                                                borderRadius: 1.5,
                                                                overflow: 'hidden',
                                                                flexShrink: 0,
                                                                bgcolor: '#f5f5f5',
                                                            }}
                                                        >
                                                            <img
                                                                src={item.imageUrl || "/images/no-image.png"}
                                                                alt={item.productName}
                                                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                            />
                                                        </Box> */}
                                                        <Box sx={{ flexGrow: 1 }}>
                                                            <Typography variant="body2" fontWeight="medium">
                                                                {item.productName}
                                                            </Typography>
                                                            <Typography variant="body2" color="text.secondary">
                                                                x{item.quantity}
                                                            </Typography>
                                                        </Box>
                                                        <Typography variant="body2" fontWeight="medium">
                                                            {(item.unitPrice * item.quantity).toLocaleString('vi-VN')}đ
                                                        </Typography>
                                                    </Box>
                                                ))}

                                                <Divider sx={{ my: 2 }} />

                                                {/* Tổng tiền + nút */}
                                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
                                                    <Typography>
                                                        Tổng tiền:{" "}
                                                        <Typography component="span" variant="h6" color="primary" fontWeight="bold">
                                                            {order.totalAmount!.toLocaleString('vi-VN')}đ
                                                        </Typography>
                                                    </Typography>

                                                    <Box sx={{ display: 'flex', gap: 1 }}>
                                                        <Button
                                                            variant="outlined"
                                                            size="small"
                                                            onClick={() => action.viewOrderDetail(order.orderId!)}
                                                        >
                                                            Xem chi tiết
                                                        </Button>
                                                        {order.orderStatus === 'completed' && (
                                                            <Button variant="contained" size="small" color="primary">
                                                                Mua lại
                                                            </Button>
                                                        )}
                                                    </Box>
                                                </Box>
                                            </Paper>
                                        );
                                    })
                                )}
                            </Box>
                        )}
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};
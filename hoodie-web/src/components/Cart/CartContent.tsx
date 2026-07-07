/**
 * @author duynguyen © 2025
 */
import { useEffect, useState } from 'react';
import type { PageProps } from "./Cart.types";
import { useStore } from "./CartStore";
import { Box, Button, Checkbox, Chip, CircularProgress, Container, Divider, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, useMediaQuery, useTheme } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Image from '../../templates/Image';

/**
 * CartContent
 * 
 * @param props 
 * @returns CartContent
 */
export const CartContent: React.FC<PageProps> = (props) => {
    const { t, state, action } = useStore(props);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const [selectAll, setSelectAll] = useState(false);

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

    // const { cartItems, totalAmount, selectedItems } = state;
    // const selectedCount = selectedItems.length;

    return (
        <Container maxWidth="xl" sx={{ py: 4 }}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
                Giỏ hàng
            </Typography>
            <Typography variant="body1" color="text.secondary" gutterBottom>
                {state.cartSearchDomainModel.info?.total} sản phẩm
            </Typography>

            {state.cartSearchDomainModel.info?.total === 0 ? (
                <Box sx={{ textAlign: 'center', py: 10 }}>
                    <Typography variant="h6" gutterBottom>
                        Giỏ hàng của bạn đang trống
                    </Typography>
                    <Button variant="contained" size="large" href="/">
                        Tiếp tục mua sắm
                    </Button>
                </Box>
            ) : (
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', lg: 'row' }, gap: 4 }}>
                    {/* Danh sách sản phẩm */}
                    <Box sx={{ flexGrow: 1 }}>
                        <Paper elevation={2} sx={{ borderRadius: 2, overflow: 'hidden' }}>
                            <TableContainer>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    checked={selectAll}
                                                    indeterminate={state.selectedItems.length > 0 && state.selectedItems.length < state.cartSearchDomainModel?.search!.length}
                                                    onChange={(e) => {
                                                        setSelectAll(e.target.checked);
                                                        // action.toggleSelectAll(e.target.checked);
                                                    }}
                                                />
                                            </TableCell>
                                            <TableCell>Sản phẩm</TableCell>
                                            <TableCell align="right">Đơn giá</TableCell>
                                            <TableCell align="center">Số lượng</TableCell>
                                            <TableCell align="right">Thành tiền</TableCell>
                                            <TableCell align="center">Thao tác</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {state.cartSearchDomainModel?.search?.map((item) => (
                                            <TableRow key={item.cartItemId || item.productId} hover>
                                                <TableCell padding="checkbox">
                                                    <Checkbox
                                                        checked={state.selectedItems.includes(item.productId!)}
                                                        // onChange={() => action.toggleSelect(item.productId)}
                                                    />
                                                </TableCell>

                                                <TableCell>
                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                                        <Image
                                                            src={item.imageUrl || "/images/no-image.png"}
                                                            alt={item.productName!}
                                                            style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 8 }}
                                                        />
                                                        <Box>
                                                            <Typography variant="subtitle2" gutterBottom>
                                                                {item.productName}
                                                            </Typography>
                                                            {/* {item.skillLogicName && (
                                                                <Chip label={item.skillLogicName} size="small" variant="outlined" />
                                                            )} */}
                                                        </Box>
                                                    </Box>
                                                </TableCell>

                                                <TableCell align="right">
                                                    <Typography fontWeight="medium">
                                                        {item.price?.toLocaleString('vi-VN')}đ
                                                    </Typography>
                                                </TableCell>

                                                <TableCell align="center">
                                                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                                                        <IconButton
                                                            size="small"
                                                            // onClick={() => action.updateQuantity(item.productId, item.quantity! - 1)}
                                                            disabled={item.quantity! <= 1}
                                                        >
                                                            <RemoveIcon fontSize="small" />
                                                        </IconButton>
                                                        <TextField
                                                            value={item.quantity}
                                                            size="small"
                                                            sx={{ width: 60, textAlign: 'center' }}
                                                            inputProps={{ style: { textAlign: 'center' } }}
                                                            // onChange={(e) => {
                                                            //     const qty = parseInt(e.target.value) || 1;
                                                            //     // action.updateQuantity(item.productId, qty);
                                                            // }}
                                                            disabled
                                                        />
                                                        <IconButton
                                                            size="small"
                                                            // onClick={() => action.updateQuantity(item.productId, item.quantity + 1)}
                                                        >
                                                            <AddIcon fontSize="small" />
                                                        </IconButton>
                                                    </Box>
                                                </TableCell>

                                                <TableCell align="right">
                                                    <Typography fontWeight="bold" color="primary">
                                                        {(item.price! * item.quantity!).toLocaleString('vi-VN')}đ
                                                    </Typography>
                                                </TableCell>

                                                <TableCell align="center">
                                                    <IconButton
                                                        color="error"
                                                        // onClick={() => action.removeItem(item.productId)}
                                                    >
                                                        <DeleteOutlineIcon />
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Paper>
                    </Box>

                    {/* Sidebar - Thanh toán */}
                    <Box sx={{ width: { xs: '100%', lg: 380 } }}>
                        <Paper elevation={3} sx={{ p: 3, borderRadius: 2, position: 'sticky', top: 20 }}>
                            <Typography variant="h6" fontWeight="bold" gutterBottom>
                                Thông tin thanh toán
                            </Typography>

                            <Box sx={{ mt: 3 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                    <Typography>Tạm tính ({state.selectedItems.length!} sản phẩm)</Typography>
                                    <Typography fontWeight="medium">
                                        {state.totalAmount.toLocaleString('vi-VN')}đ
                                    </Typography>
                                </Box>

                                <Divider sx={{ my: 2 }} />

                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                                    <Typography variant="h6" fontWeight="bold">Tổng tiền</Typography>
                                    <Typography variant="h5" fontWeight="bold" color="primary">
                                        {state.totalAmount.toLocaleString('vi-VN')}đ
                                    </Typography>
                                </Box>

                                {/* Voucher */}
                                <TextField
                                    fullWidth
                                    size="small"
                                    placeholder="Bạn có yêu cầu gì dành cho shop?"
                                    sx={{ mb: 3 }}
                                />

                                <Button
                                    variant="contained"
                                    fullWidth
                                    size="large"
                                    disabled={state.selectedItems.length === 0}
                                    // onClick={() => action.checkout()}
                                    sx={{ py: 1.5, fontSize: '1.1rem', fontWeight: 'bold' }}
                                >
                                    Tiến hành thanh toán ({state.selectedItems.length})
                                </Button>

                                <Typography variant="caption" color="text.secondary" sx={{ mt: 2, display: 'block', textAlign: 'center' }}>
                                    Phí vận chuyển sẽ được tính ở bước thanh toán
                                </Typography>
                            </Box>
                        </Paper>
                    </Box>
                </Box>
            )}
        </Container>
    );
};
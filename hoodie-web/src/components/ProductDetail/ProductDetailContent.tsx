/**
 * @author duynguyen © 2025
 */
import { useEffect } from "react";
import { Box, Button, Chip, CircularProgress, Container, Divider, Grid, IconButton, Tab, Tabs, Typography } from "@mui/material";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import type { PageProps } from "./ProductDetail.types";
import { useStore } from "./ProductDetailStore";
import Image from "../../templates/Image";

/**
 * ProductDetailContent
 * 
 * @param props 
 * @returns ProductDetailContent
 */
export const ProductDetailContent: React.FC<PageProps> = (props) => {
    const { t, state, action } = useStore(props);

    useEffect(() => {
        action.load();
    }, []);

    if (state.loading) {
        return <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}><CircularProgress /></Box>;
    }

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Button
                startIcon={<ArrowBackIcon />}
                onClick={() => window.history.back()}
                sx={{ mb: 3 }}
            >
                Quay lại
            </Button>

            <Grid container spacing={5}>
                {/* Left: Images */}
                <Grid size={{ xs: 12, md: 6 }}>
                    {/* Ảnh lớn chính */}
                    <Box 
                        sx={{ 
                            position: 'relative', 
                            mb: 3, 
                            borderRadius: 3, 
                            overflow: 'hidden', 
                            boxShadow: 3,
                            bgcolor: '#f5f5f5'
                        }}
                    >
                        {state.listImages && state.listImages.length > 0 ? (
                            <img
                                src={state.listImages[state.selectedImageIndex]?.imageUrl || "/images/no-image.png"}
                                alt={state.productSubmitApplicationModel?.productName + " image"}
                                style={{ 
                                    width: '100%', 
                                    height: 'auto', 
                                    maxHeight: '520px',
                                    objectFit: 'contain' 
                                }}
                            />
                        ) : (
                            <Image 
                                src="/images/no-image.png" 
                                alt="No image available" 
                                style={{ width: '100%', height: 'auto' }} 
                            />
                        )}
                    </Box>

                    {/* Thumbnails Slider */}
                    {state.listImages && state.listImages.length > 1 && (
                        <Box sx={{ 
                            display: 'flex', 
                            gap: 1.5, 
                            overflowX: 'auto', 
                            pb: 2,
                            '&::-webkit-scrollbar': {
                                height: 8,
                            }
                        }}>
                            {state.listImages
                                .sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0))  // Sắp xếp theo thứ tự
                                .map((img, index) => (
                                    <Box
                                        key={img.imageId || index}
                                        onClick={() => action.selectImage(index)}
                                        sx={{
                                            minWidth: 85,
                                            height: 85,
                                            borderRadius: 2,
                                            overflow: 'hidden',
                                            cursor: 'pointer',
                                            border: state.selectedImageIndex === index 
                                                ? '3px solid #1976d2' 
                                                : '2px solid #e0e0e0',
                                            flexShrink: 0,
                                            position: 'relative',
                                            transition: 'all 0.2s',
                                            '&:hover': {
                                                borderColor: '#1976d2',
                                                transform: 'scale(1.05)'
                                            }
                                        }}
                                    >
                                        <Image
                                            src={img.imageUrl || "/images/no-image.png"}
                                            alt={(img.altText || state.productSubmitApplicationModel?.productName) + "image"}
                                            style={{ 
                                                width: '100%', 
                                                height: '100%', 
                                                objectFit: 'cover' 
                                            }}
                                        />

                                        {/* Badge ảnh chính */}
                                        {img.isPrimary && (
                                            <Box sx={{
                                                position: 'absolute',
                                                top: 6,
                                                right: 6,
                                                bgcolor: 'primary.main',
                                                color: 'white',
                                                fontSize: '0.65rem',
                                                px: 1,
                                                py: 0.2,
                                                borderRadius: 1,
                                                boxShadow: 1,
                                                fontWeight: 'bold'
                                            }}>
                                                CHÍNH
                                            </Box>
                                        )}
                                    </Box>
                                ))}
                            {/* )} */}
                        </Box>
                    )
                    }
                </Grid>

                {/* Right: Product Info */}
                <Grid size={{ xs: 12, md: 6 }}>
                    <Typography variant="h4" fontWeight="bold" sx={{ mb: 1 }}>
                        {state.productSubmitApplicationModel?.productName}
                    </Typography>

                    <Typography variant="h5" color="primary" fontWeight="bold" sx={{ mb: 2 }}>
                        {state.productSubmitApplicationModel?.price?.toLocaleString('vi-VN')}đ
                    </Typography>

                    <Box sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
                        <Chip
                            label={state.productSubmitApplicationModel?.stockQuantity! > 0 ? "Còn hàng" : "Hết hàng"}
                            color={state.productSubmitApplicationModel?.stockQuantity! > 0 ? "success" : "error"}
                            sx={{ mr: 1.5, fontWeight: 500 }}
                        />
                        <Typography component="span" color="text.secondary">
                            Kho: <strong>{state.productSubmitApplicationModel?.stockQuantity!}</strong> sản phẩm
                        </Typography>
                    </Box>

                    {/* Attributes / Skills Chips */}
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 4 }}>
                        {state.productSubmitApplicationModel?.ageGroupName && <Chip label={`Độ tuổi: ${state.productSubmitApplicationModel?.ageGroupName}`} variant="outlined" />}
                        {state.productSubmitApplicationModel?.skillStemTypename && <Chip label={`Loại kỹ năng: ${state.productSubmitApplicationModel?.skillStemTypename}`} variant="outlined" />}
                        {state.productSubmitApplicationModel?.difficultyLevelName && <Chip label={`Độ khó: ${state.productSubmitApplicationModel?.difficultyLevelName}`} variant="outlined" />}
                        {state.productSubmitApplicationModel?.safetyCertifications && <Chip label={`Chứng nhận an toàn: ${state.productSubmitApplicationModel?.safetyCertifications}`} variant="outlined" />}
                    </Box>

                    {/* Quantity Selector */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
                        <Typography fontWeight={500}>Lĩnh vực:</Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', border: '1px solid', borderColor: 'divider', borderRadius: 1.5, overflow: 'hidden' }}>
                            <Typography sx={{ px: 3, fontWeight: 'bold' }}>{state.productSubmitApplicationModel?.categoryName! || 1}</Typography>
                        </Box>
                    </Box>

                    {/* Action Buttons */}
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <Button
                            variant="outlined"
                            size="large"
                            fullWidth
                            startIcon={<AddShoppingCartIcon />}
                            onClick={() => action.submitCart.execute(state.productSubmitApplicationModel?.productId!)}
                            sx={{ py: 1.5, fontWeight: 'bold', borderWidth: 2, '&:hover': { borderWidth: 2 } }}
                        >
                            Thêm vào giỏ
                        </Button>
                        {/* <Button
                            variant="contained"
                            size="large"
                            fullWidth
                            startIcon={<ShoppingCartCheckoutIcon />}
                            // onClick={() => action.buyNow()}
                            sx={{ py: 1.5, fontWeight: 'bold', boxShadow: 'none' }}
                        >
                            Mua ngay
                        </Button> */}
                    </Box>

                    <Divider sx={{ my: 4 }} />
                </Grid>
            </Grid>
        </Container>
    );
};
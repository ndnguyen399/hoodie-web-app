/**
 * @author duynguyen © 2025
 */
import { useEffect, useState } from "react";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Button,
    Card,
    CardContent,
    CardMedia,
    Checkbox,
    CircularProgress,
    Container,
    Divider,
    FormControlLabel,
    Grid,
    IconButton,
    Slider,
    TextField,
    Typography,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TuneIcon from '@mui/icons-material/Tune';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import ViewListIcon from '@mui/icons-material/ViewList';
import SearchIcon from '@mui/icons-material/Search';
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';
import type { PageProps } from "./ProductSearch.types";
import { useStore } from "./ProductSearchStore";
import Image from "../../templates/Image";

/**
 * ProductSearchContent
 * 
 * @param props 
 * @returns ProductSearchContent
 */
export const ProductSearchContent: React.FC<PageProps> = (props) => {
    const { t, state, action } = useStore(props);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [sortBy, setSortBy] = useState<string>('newest');
    const [showFilters, setShowFilters] = useState(!isMobile);

    const { filters, filteredProducts, allProducts } = state;
    const totalResults = filteredProducts.length;

    useEffect(() => {
        action.load();
    }, []);

    if (state.loading) {
        return <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}><CircularProgress /></Box>;
    }

    const handlePriceChange = (event: Event, newValue: number | number[]) => {
        const [min, max] = newValue as number[];
        action.updateFilters({ minPrice: min, maxPrice: max });
    };

    const handleCategoryChange = (categoryId: number) => {
        const current = filters.selectedCategoryIds;
        const newSelected = current.includes(categoryId)
            ? current.filter(id => id !== categoryId)
            : [...current, categoryId];

        action.updateFilters({ selectedCategoryIds: newSelected });
    };

    const handleSearchText = (text: string) => {
        action.searchText(text);
    };

    return (
        <Container maxWidth="xl" sx={{ py: 3 }}>
            {/* Top Bar */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexWrap: 'wrap', gap: 2 }}>
                <Typography variant="h5" fontWeight="bold">
                    Kết quả: <strong>{totalResults}</strong> sản phẩm
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
                    <TextField
                        size="small"
                        placeholder="Tìm kiếm trong kết quả..."
                        InputProps={{
                            startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
                        }}
                        sx={{ width: 300 }}
                        onChange={(e) => handleSearchText(e.target.value)}
                    />

                    <Box sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
                        <IconButton onClick={() => setViewMode('grid')} color={viewMode === 'grid' ? 'primary' : 'default'}>
                            <ViewModuleIcon />
                        </IconButton>
                        <IconButton onClick={() => setViewMode('list')} color={viewMode === 'list' ? 'primary' : 'default'}>
                            <ViewListIcon />
                        </IconButton>
                    </Box>

                    {isMobile && (
                        <IconButton onClick={() => setShowFilters(!showFilters)}>
                            <TuneIcon />
                        </IconButton>
                    )}
                </Box>
            </Box>

            <Box sx={{ display: 'flex', gap: 3 }}>
                {/* Filter Sidebar */}
                {(showFilters || !isMobile) && (
                    <Box sx={{ width: { xs: '100%', md: 280 }, flexShrink: 0, alignSelf: 'flex-start' }}>
                        <Typography variant="h6" fontWeight="bold" gutterBottom>
                            Bộ lọc
                        </Typography>
                        <Divider sx={{ mb: 3 }} />

                        {/* Price */}
                        <Accordion defaultExpanded>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography fontWeight="medium">Khoảng giá</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Slider
                                    value={[filters.minPrice, filters.maxPrice]}
                                    onChange={handlePriceChange}
                                    valueLabelDisplay="auto"
                                    min={0}
                                    max={5000000}
                                    step={50000}
                                />
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                                    <Typography variant="body2">{filters.minPrice.toLocaleString('vi-VN')}đ</Typography>
                                    <Typography variant="body2">{filters.maxPrice.toLocaleString('vi-VN')}đ</Typography>
                                </Box>
                            </AccordionDetails>
                        </Accordion>

                        {/* Category */}
                        <Accordion defaultExpanded>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography fontWeight="medium">Danh mục</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                {state.categorySearchDomainModel?.search?.map((cat: any) => (
                                    <FormControlLabel
                                        key={cat.categoryId}
                                        control={
                                            <Checkbox
                                                checked={filters.selectedCategoryIds.includes(cat.categoryId)}
                                                onChange={() => handleCategoryChange(cat.categoryId)}
                                            />
                                        }
                                        label={cat.categoryName}
                                    />
                                ))}
                            </AccordionDetails>
                        </Accordion>
                    </Box>
                )}

                {/* Products */}
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={3} columns={{ xs: 2, sm: 3, md: viewMode === 'grid' ? 4 : 12 }}>
                        {filteredProducts.length > 0 ? (
                            filteredProducts.map((item: any) => {
                                const primaryImage = item.listImages?.find((img: any) => img.isPrimary);

                                return (
                                    <Grid key={item.productId} size={1}>
                                        <Card sx={{
                                            height: '100%',
                                            borderRadius: 2,
                                            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                                            transition: 'all 0.25s',
                                            '&:hover': { transform: 'translateY(-6px)', boxShadow: '0 12px 24px rgba(0,0,0,0.15)' }
                                        }}>
                                            <CardMedia>
                                                <Image
                                                    loading="lazy"
                                                    alt={item.productName}
                                                    src={primaryImage?.imageUrl ?? "/images/no-image.png"}
                                                    style={{ width: '100%', height: viewMode === 'grid' ? 260 : 220, objectFit: 'cover' }}
                                                    onClick={() => action.handleDetailClick.execute(item.productId)}
                                                />
                                            </CardMedia>
                                            <CardContent>
                                                <Typography fontWeight={400} color="orange" gutterBottom noWrap>
                                                    {item.categoryName}
                                                </Typography>
                                                <Typography variant="subtitle1" fontWeight={600} gutterBottom noWrap>
                                                    {item.productName}
                                                </Typography>

                                                <Typography variant="h6" color="primary" fontWeight="bold">
                                                    {item.price?.toLocaleString('vi-VN')}đ
                                                </Typography>

                                                <Box sx={{
                                                    display: 'flex', justifyContent: 'space-between'
                                                }}>
                                                    <Typography variant="body2" color={item.stockQuantity > 0 ? "success.main" : "error.main"} sx={{ mt: 1 }}>
                                                        {item.stockQuantity > 0 ? "Còn hàng" : "Hết hàng"}
                                                    </Typography>
                                                    <Button
                                                        disabled={item.stockQuantity <= 0}
                                                        onClick={() => action.submitCart.execute(item.productId)}
                                                        sx={{
                                                            borderRadius: '20px', 
                                                            ":hover": {backgroundColor: 'gray'},
                                                            // Thêm style cho trạng thái disabled nếu cần
                                                            "&.Mui-disabled": { opacity: 0.5 }
                                                        }}
                                                        loading={state.isSubmitting}
                                                    >
                                                        <AddShoppingCartOutlinedIcon sx={{color: 'orange'}}/>
                                                    </Button>
                                                </Box>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                );
                            })
                        ) : (
                            <Grid size={12}>
                                <Typography align="center" variant="h6" sx={{ py: 8, color: 'text.secondary' }}>
                                    Không tìm thấy sản phẩm phù hợp
                                </Typography>
                            </Grid>
                        )}
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
};
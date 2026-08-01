/**
 * @author duynguyen © 2025
 */
import { useEffect } from "react";
import {
    Box,
    Card,
    CardContent,
    CircularProgress,
    Container,
    Grid,
    MenuItem,
    Paper,
    Select,
    Typography,
} from "@mui/material";
import {
  DataGrid,
} from '@mui/x-data-grid';
import {
    LineChart,
    PieChart,
} from "@mui/x-charts";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import type { PageProps } from "./RevenueSearch.types";
import { useStore } from "./RevenueSearchStore";

/**
 * RevenueSearchContent
 * 
 * @param props 
 * @returns RevenueSearchContent
 */
export const RevenueSearchContent: React.FC<PageProps> = props => {
    const { t, state, action } = useStore(props);

    useEffect(() => {
        action.load();
    }, []);

    const { revenueSearchDomainModel, dateRange } = state;

    const revenueDataset =
        revenueSearchDomainModel?.revenueByDate?.map(x => ({
            date: x.date,
            revenue: x.revenue,
            orders: x.orders
        })) ?? [];

    if (state.loading) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", py: 10 }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Container maxWidth="xl" sx={{ py: 4 }}>
            {/* Header */}
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4, flexWrap: "wrap", gap: 2 }}>
                <Typography variant="h4" fontWeight="bold">
                    Thống kê Doanh thu
                </Typography>

                <Select
                    size="small"
                    value={dateRange}
                    onChange={(e) => action.changeDateRange(e.target.value as any)}
                    sx={{ minWidth: 160 }}
                >
                    <MenuItem value="7days">7 ngày qua</MenuItem>
                    <MenuItem value="30days">30 ngày qua</MenuItem>
                    <MenuItem value="90days">90 ngày qua</MenuItem>
                    <MenuItem value="year">Năm nay</MenuItem>
                </Select>
            </Box>

            {/* Summary Cards */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <Card sx={{ height: "100%" }}>
                        <CardContent>
                            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                                <Box>
                                    <Typography color="text.secondary" variant="body2" gutterBottom>
                                        Tổng doanh thu
                                    </Typography>
                                    <Typography variant="h5" fontWeight="bold">
                                        {action.formatCurrency(
                                            revenueSearchDomainModel?.summary?.totalRevenue
                                        )}
                                    </Typography>
                                </Box>
                                <Box sx={{ bgcolor: "primary.light", p: 1.2, borderRadius: 2 }}>
                                    <AttachMoneyIcon color="primary" />
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <Card sx={{ height: "100%" }}>
                        <CardContent>
                            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                                <Box>
                                    <Typography color="text.secondary" variant="body2" gutterBottom>
                                        Tổng đơn hàng
                                    </Typography>
                                    <Typography variant="h5" fontWeight="bold">
                                        {revenueSearchDomainModel?.summary?.totalOrders}
                                    </Typography>
                                </Box>
                                <Box sx={{ bgcolor: "success.light", p: 1.2, borderRadius: 2 }}>
                                    <ShoppingCartIcon color="success" />
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <Card sx={{ height: "100%" }}>
                        <CardContent>
                            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                                <Box>
                                    <Typography color="text.secondary" variant="body2" gutterBottom>
                                        Giá trị TB / đơn
                                    </Typography>
                                    <Typography variant="h5" fontWeight="bold">
                                        {action.formatCurrency(
                                            revenueSearchDomainModel?.summary?.averageOrderValue
                                        )}
                                    </Typography>
                                </Box>
                                <Box sx={{ bgcolor: "info.light", p: 1.2, borderRadius: 2 }}>
                                    <ShowChartIcon color="info" />
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <Card sx={{ height: "100%" }}>
                        <CardContent>
                            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                                <Box>
                                    <Typography color="text.secondary" variant="body2" gutterBottom>
                                        Tăng trưởng
                                    </Typography>
                                    <Typography variant="h5" fontWeight="bold" color="success.main">
                                        {(
                                            revenueSearchDomainModel?.summary?.growthRate ?? 0
                                        ).toFixed(2)}%
                                    </Typography>
                                </Box>
                                <Box sx={{ bgcolor: "warning.light", p: 1.2, borderRadius: 2 }}>
                                    <TrendingUpIcon color="warning" />
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Charts */}
            <Grid container spacing={3}>
                {/* Line Chart - Doanh thu theo thời gian */}
                <Grid size={{ xs: 12, lg: 8 }}>
                    <Paper sx={{ p: 3, borderRadius: 2 }}>
                        <Typography variant="h6" fontWeight="bold" gutterBottom>
                            Doanh thu theo thời gian
                        </Typography>
                        <Box sx={{ width: "100%", height: 360 }}>
                            <LineChart
                                dataset={revenueDataset}
                                xAxis={[
                                    {
                                        scaleType: "point",
                                        dataKey: "date"
                                    }
                                ]}
                                series={[
                                    {
                                        dataKey:"revenue",
                                        label:"Revenue"
                                    }
                                ]}
                            />
                        </Box>
                    </Paper>
                </Grid>

                {/* Pie Chart - Doanh thu theo danh mục */}
                <Grid size={{ xs: 12, lg: 4 }}>
                    <Paper sx={{ p: 3, borderRadius: 2, height: "100%" }}>
                        <Typography variant="h6" fontWeight="bold" gutterBottom>
                            Doanh thu theo danh mục
                        </Typography>
                        <Box sx={{ width: "100%", height: 340 }}>
                            <PieChart
                                series={[
                                    {
                                        data:
                                        revenueSearchDomainModel?.revenueByCategory?.map(
                                            x=>({
                                                id:x.categoryName,
                                                label:x.categoryName,
                                                value:x.revenue
                                            })
                                        ) ?? []
                                    }
                                ]}
                            />
                        </Box>
                    </Paper>
                </Grid>

                {/* Bar Chart - Top sản phẩm */}
                <Grid size={{ xs: 12 }}>
                    <Paper sx={{ p: 3, borderRadius: 2 }}>
                        <Typography variant="h6" fontWeight="bold" gutterBottom>
                            Top sản phẩm bán chạy
                        </Typography>
                        <Box sx={{ width: "100%", height: 360 }}>
                            <DataGrid
                                rows={
                                    (revenueSearchDomainModel?.topProducts ?? []).map(
                                        (item, index) => ({
                                            id: index,
                                            ...item
                                        })
                                    )
                                }
                                columns={[
                                    {
                                        field:"productName",
                                        headerName:"Product",
                                        flex:1
                                    },
                                    {
                                        field:"quantity",
                                        headerName:"Sold",
                                        width:120
                                    },
                                    {
                                        field:"revenue",
                                        headerName:"Revenue",
                                        width:180,
                                        renderCell: (params) =>
                                            action.formatCurrency(params.row.revenue)
                                    }
                                ]}
                            />
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};
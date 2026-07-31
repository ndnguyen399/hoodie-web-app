
import { alpha, AppBar, Box, Button, Container, Divider, Drawer, IconButton, InputBase, Menu, MenuItem, Stack, styled, Toolbar, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import WidgetsOutlinedIcon from '@mui/icons-material/WidgetsOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import PersonSearchOutlinedIcon from '@mui/icons-material/PersonSearchOutlined';
import QueryStatsOutlinedIcon from '@mui/icons-material/QueryStatsOutlined';
import FeedOutlinedIcon from '@mui/icons-material/FeedOutlined';
import FilterFramesOutlinedIcon from '@mui/icons-material/FilterFramesOutlined';
import React from 'react';
import LinkCustom from '../../templates/LinkCustom';
import { useTranslation } from '../../hooks/useTranslation';
import { useApplicationContext } from '../../hooks/useApplicationContext';
import { useAppParameters } from '../../hooks/useAppParameters';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/AuthProvider';
import { AuthViewApi } from '../../components/api/AuthViewApi';

// ==============================|| HOME LAYOUT (Protected) ||============================== //

export default function HomeLayout({ children }: { children: React.ReactNode }) {
    const { t } = useTranslation();
    const context = useApplicationContext();
    const params = useAppParameters();
    const navigate = useNavigate();
    const { user } = useAuth();

    const [open, setOpen] = React.useState(false);
    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    // const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    //     React.useState<null | HTMLElement>(null);
    const isMenuOpen = Boolean(anchorEl);
    // const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    // const handleMobileMenuClose = () => {
    //     setMobileMoreAnchorEl(null);
    // };
    const handleMenuClose = () => {
        setAnchorEl(null);
        // handleMobileMenuClose();
    };
    // const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    //     setMobileMoreAnchorEl(event.currentTarget);
    // };

    const handlehandleLogout = async () => {
        try {
            const refreshToken = localStorage.getItem("refreshToken");
            const result = await new AuthViewApi().logout({
                refreshToken: refreshToken ?? ""
            });
            const resultModel = result.data;
            // let message = '';
            // for (const item of resultModel) {
                // message += `${resultModel.code}: ${resultModel.message}\n`;
            // }
            // await context.navigation.openInformationDialog(message);

            // Xóa token
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            sessionStorage.clear();

            navigate('/sign-in', {
                replace: true
            });
        } catch (error: any) {
            const responseData = error?.payload;
            if (responseData) {
                let message = '';
                if (responseData.data?.length) {
                    for (const item of responseData.data) {
                        message += `${item.code}: ${item.message}\n`;
                    }
                } else {
                    message = responseData.message;
                }
                await context.navigation.openErrorDialog(message);
            } else {
                await context.navigation.openErrorDialog(t("label-internalServerError"));
            }
        } finally {
            setAnchorEl(null);
        } 
    };

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        id={menuId}
        keepMounted
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        open={isMenuOpen}
        onClose={handleMenuClose}
        >
        {/* <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
        <MenuItem onClick={handleMenuClose}>My account</MenuItem> */}
        {/* Nếu bạn muốn hiển thị thêm mục khác tùy theo user, hãy để vào đây */}
        {user && <MenuItem onClick={handlehandleLogout}>Đăng xuất</MenuItem>}
        </Menu>
        
    );

    // const mobileMenuId = 'primary-search-account-menu-mobile';

    // const renderMobileMenu = (
    //     <Menu
    //         anchorEl={mobileMoreAnchorEl}
    //         anchorOrigin={{
    //             vertical: 'top',
    //             horizontal: 'right',
    //         }}
    //         id={mobileMenuId}
    //         keepMounted
    //         transformOrigin={{
    //             vertical: 'top',
    //             horizontal: 'right',
    //         }}
    //         open={isMobileMenuOpen}
    //         onClose={handleMobileMenuClose}
    //     >
    //     <MenuItem>
    //         <IconButton size="large" aria-label="show 4 new mails" color="inherit">
    //         <Badge badgeContent={4} color="error">
    //             <MailIcon />
    //         </Badge>
    //         </IconButton>
    //         <p>Messages</p>
    //     </MenuItem>
    //     <MenuItem>
    //         <IconButton
    //         size="large"
    //         aria-label="show 17 new notifications"
    //         color="inherit"
    //         >
    //         <Badge badgeContent={17} color="error">
    //             <NotificationsIcon />
    //         </Badge>
    //         </IconButton>
    //         <p>Notifications</p>
    //     </MenuItem>
    //     <MenuItem onClick={handleProfileMenuOpen}>
    //         <IconButton
    //         size="large"
    //         aria-label="account of current user"
    //         aria-controls="primary-search-account-menu"
    //         aria-haspopup="true"
    //         color="inherit"
    //         >
    //         <AccountCircle />
    //         </IconButton>
    //         <p>Profile</p>
    //     </MenuItem>
    //     </Menu>
    // );

    return (
        <>
            <Box>
                <Box sx={{ flexGrow: 1 }}>
                    <AppBar position="static" sx={{backgroundColor: 'transparent', boxShadow: 'none'}}>
                        <Toolbar>
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="open drawer"
                                sx={{ mr: 2 }}
                                onClick={toggleDrawer(true)}
                            >
                                <WidgetsOutlinedIcon sx={{color: 'gray'}} />
                            </IconButton>
                        <Typography
                            variant="h5"
                            noWrap
                            component="div"
                            sx={{ display: { xs: 'none', sm: 'block' }, color: 'gray', fontWeight: 'bold' }}
                        >
                            HOODIE
                        </Typography>
                        <Search>
                            <SearchIconWrapper>
                                <SearchIcon sx={{color: 'gray'}} />
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="Tìm kiếm…"
                                inputProps={{'aria-label': 'search'}}
                                sx={{color: 'gray'}}
                            />
                        </Search>
                        <Box sx={{ flexGrow: 1 }} />
                        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                            <IconButton
                                size="large"
                                edge="end"
                                aria-label="account of current user"
                                aria-controls={menuId}
                                aria-haspopup="true"
                                onClick={handleProfileMenuOpen}
                                color="inherit"
                            >
                                <AccountCircle sx={{color: 'gray'}} />
                            </IconButton>
                        </Box>
                        {/* <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="show more"
                                aria-controls={mobileMenuId}
                                aria-haspopup="true"
                                onClick={handleMobileMenuOpen}
                                color="inherit"
                            >
                            <MoreIcon />
                            </IconButton>
                        </Box> */}
                        </Toolbar>
                        <Divider />
                    </AppBar>
                    {/* {renderMobileMenu} */}
                    {renderMenu}
                </Box>
            </Box>
            <Box sx={{
                width: '100%',
                display: 'flex'
            }}>
                <Box sx={{width: '100%'}}>
                    {children}
                </Box>
            </Box>
            <Drawer open={open} onClose={toggleDrawer(false)}>
                <Box sx={{ height: '100vh', width: '400px' }}>
                    <Box sx={{ height: '80px', display: 'flex', alignItems: 'center' }}>
                        <Button onClick={toggleDrawer(false)} sx={{ color: 'black', ml: 2 }}>
                            <CloseOutlinedIcon sx={{ fontSize: '30px', mr: 1 }} />
                            Close
                        </Button>
                    </Box>
                    <Box sx={{ mx: 3 }}>
                        <Divider />
                        <Box sx={{ mt: 1, mb: 1 }}>
                            <Typography sx={{ mb: 2, fontWeight: 'bold' }}>Biểu đồ thống kê</Typography>
                            <Stack>
                                <LinkCustom sx={{ color: 'black' }}
                                    content='Biểu đồ doanh thu'
                                    icon={<QueryStatsOutlinedIcon sx={{ color: 'green' }} />}
                                    iconPosition='start'
                                    href='/manage-user-search'
                                />
                                {/* <LinkCustom sx={{ color: 'black' }}
                                    content='Quản lý sản phẩm'
                                    icon={<Inventory2OutlinedIcon sx={{ color: 'red' }} />}
                                    iconPosition='start'
                                    href='/manage-product-search'
                                /> */}
                            </Stack>
                        </Box>
                        <Divider />
                        <Box sx={{ mt: 1, mb: 1 }}>
                            <Typography sx={{ mb: 2, fontWeight: 'bold' }}>Tài khoản Người dùng</Typography>
                            <Stack>
                                <LinkCustom sx={{ color: 'black' }}
                                    content='Quản lý tài khoản người dùng'
                                    icon={<PersonSearchOutlinedIcon sx={{ color: 'orange' }} />}
                                    iconPosition='start'
                                    href='/manage-user-search'
                                />
                                {/* <LinkCustom sx={{ color: 'black' }}
                                    content='Quản lý sản phẩm'
                                    icon={<Inventory2OutlinedIcon sx={{ color: 'red' }} />}
                                    iconPosition='start'
                                    href='/manage-product-search'
                                /> */}
                            </Stack>
                        </Box>
                        <Divider />
                        <Box sx={{ mt: 1, mb: 1 }}>
                            <Typography sx={{ mb: 2, fontWeight: 'bold' }}>Danh mục & Sản phẩm</Typography>
                            <Stack>
                                <LinkCustom sx={{ color: 'black' }}
                                    content='Quản lý lĩnh vực'
                                    icon={<CategoryOutlinedIcon sx={{ color: 'orange' }} />}
                                    iconPosition='start'
                                    href='/manage-category-search'
                                />
                                <LinkCustom sx={{ color: 'black' }}
                                    content='Quản lý sản phẩm'
                                    icon={<Inventory2OutlinedIcon sx={{ color: 'red' }} />}
                                    iconPosition='start'
                                    href='/manage-product-search'
                                />
                            </Stack>
                        </Box>
                        <Divider />
                        <Box sx={{ mt: 1, mb: 1 }}>
                            <Typography sx={{ mb: 2, fontWeight: 'bold' }}>Đơn hàng & Đánh giá</Typography>
                            <Stack>
                                <LinkCustom sx={{ color: 'black' }}
                                    content='Quản lý đơn đặt hàng'
                                    icon={<FilterFramesOutlinedIcon sx={{ color: 'orange' }} />}
                                    iconPosition='start'
                                    href='/manage-order-search'
                                />
                                {/* <LinkCustom sx={{ color: 'black' }}
                                    content='Quản lý phản hồi đánh giá'
                                    icon={<FeedOutlinedIcon sx={{ color: 'red' }} />}
                                    iconPosition='start'
                                    href='/manage-product-search'
                                /> */}
                            </Stack>
                        </Box>
                        <Divider />
                        <Box sx={{ mt: 1, mb: 5 }}>
                            <Typography sx={{ mb: 2, fontWeight: 'bold' }}>Khuyến mãi & Giảm giá</Typography>
                            <Stack>
                                <LinkCustom sx={{ color: 'black' }}
                                    content='Quản lý chương trình mã giảm giá'
                                    icon={<PersonSearchOutlinedIcon sx={{ color: 'orange' }} />}
                                    iconPosition='start'
                                    href='/manage-voucher-search'
                                />
                                {/* <LinkCustom sx={{ color: 'black' }}
                                    content='Quản lý sản phẩm'
                                    icon={<Inventory2OutlinedIcon sx={{ color: 'red' }} />}
                                    iconPosition='start'
                                    href='/manage-product-search'
                                /> */}
                            </Stack>
                        </Box>
                        <Divider />
                    </Box>
                </Box>
            </Drawer>
        </>
    );
}

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));
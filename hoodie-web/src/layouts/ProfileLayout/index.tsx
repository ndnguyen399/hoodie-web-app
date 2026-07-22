
import { AppBar, Box, Divider, IconButton, Menu, MenuItem, Toolbar, Typography } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import React from 'react';
import { AuthViewApi } from '../../components/api/AuthViewApi';
import { useApplicationContext } from '../../hooks/useApplicationContext';
import { useAppParameters } from '../../hooks/useAppParameters';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '../../hooks/useTranslation';
import { useAuth } from '../../hooks/AuthProvider';

// ==============================|| PROFILE LAYOUT (Protected) ||============================== //

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
    const { t } = useTranslation();
    const context = useApplicationContext();
    const params = useAppParameters();
    const navigate = useNavigate();
    const { user } = useAuth();
    

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const isMenuOpen = Boolean(anchorEl);

    const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handlehandleLogout = async () => {
        try {
            const refreshToken = localStorage.getItem("refreshToken");
            const result = await new AuthViewApi().logout({
                refreshToken: refreshToken ?? ""
            });
            const resultModel = result.data;
            let message = '';
            for (const item of resultModel) {
                message += `${item.code}: ${item.message}\n`;
            }
            await context.navigation.openInformationDialog(message);

            // Xóa token
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            sessionStorage.clear();

            navigate(resultModel.loginUrl, {
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

    return (
        <>
            <Box>
                <Box sx={{ flexGrow: 1 }}>
                    <AppBar position="static" sx={{backgroundColor: 'transparent', boxShadow: 'none'}}>
                        <Toolbar>
                            <Typography
                                variant="h5"
                                noWrap
                                component="div"
                                sx={{ display: { xs: 'none', sm: 'block' }, color: 'gray', fontWeight: 'bold' }}
                            >
                                HOODIE
                            </Typography>
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
                        </Toolbar>
                        <Divider />
                    </AppBar>
                    {/* {renderMobileMenu} */}
                    {user ? (
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
                            <MenuItem onClick={handleMenuClose}>
                                Tài khoản của tôi
                            </MenuItem>

                            <MenuItem onClick={handlehandleLogout}>
                                Đăng xuất
                            </MenuItem>
                        </Menu>
                    ) : (
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
                            <MenuItem
                                onClick={() => {
                                    handleMenuClose();
                                    navigate("/sign-in");
                                }}
                            >
                                Đăng nhập
                                </MenuItem>

                                <MenuItem
                                    onClick={() => {
                                        handleMenuClose();
                                        navigate("/sign-up");
                                    }}
                                >
                                    Đăng ký
                                </MenuItem>
                         </Menu>
                    )}
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
        </>
    );
}
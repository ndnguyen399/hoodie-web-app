
import { AppBar, Box, Divider, IconButton, Menu, MenuItem, Toolbar, Typography } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import React from 'react';

// ==============================|| PROFILE LAYOUT (Protected) ||============================== //

export default function ProfileLayout({ children }: { children: React.ReactNode }) {    
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const isMenuOpen = Boolean(anchorEl);

    const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        // handleMobileMenuClose();
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
                        <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
                        <MenuItem onClick={handleMenuClose}>My account</MenuItem>
                    </Menu>
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
/**
 * @author duynguyen © 2025
 */
import { useState } from 'react';
import { AppBar, Box, Button, useMediaQuery, useTheme } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
// import SearchIcon from '@mui/icons-material/Search';
// import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { useNavigate } from 'react-router-dom';
import ContentText from '../../assets/content-text.json';
import Image from '../Image';
import Images from '../../utils/Images';
import Menu from '../Menu/Menu';
// import MenuSearch from '../MenuSearch/MenuSearch';

// ==============================|| Header ||============================== //

export default function Header() {

  const navigate = useNavigate();

  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.only('xs'));
  const isMd = useMediaQuery(theme.breakpoints.up('md'));

  const [openMenu, setOpenMenu] = useState(false);
  // const [openMenuSearch, setOpenMenuSearch] = useState(false);

  const toggleDrawerMenu = () => {
    setOpenMenu(prevOpen => !prevOpen);
  };

  // const toggleDrawerMenuSearch = () => {
  //   setOpenMenuSearch(prevOpen => !prevOpen);
  // };

  const handleLogoClick = () => {
    if (isXs) {
      toggleDrawerMenu();
    } else if (isMd) {
      navigate('/');
    }
  };

  return (
    <AppBar 
      position="static" // fixed
      sx={{ 
        backgroundColor: 'transparent', 
        boxShadow: 'none',
      }}
    >
      <Box sx={{ mx: 8, my: 1 }}>
        <Box>
          <Box
            sx={{
              width: "100%",
              height: "100px",
              display: { xs: "flex", md: "flex" },
              alignItems: "center",
              justifyContent: { xs: "center", md: "space-between" },
            }}
          >
            <Box
              width={{ md: "40%" }}
              sx={{
                display: { xs: "none", md: "flex" },
                justifyContent: "flex-start",
              }}
            >
              <Button sx={{ color: "black" }} onClick={toggleDrawerMenu}>
                <MenuIcon sx={{ mr: 1 }} />
                Menu
              </Button>
              {/* <Button
                sx={{ color: "black", display: { xs: "none", md: "flex" } }}
                onClick={toggleDrawerMenuSearch}
              >
                <SearchIcon sx={{ mr: 1 }} />
                Search
              </Button> */}
              <Button sx={{ color: "black" }}>{ContentText['about-us']}</Button>
            </Box>

            {/* Logo */}
            <Box width={{ md: "20%" }}>
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  overflow: "hidden",
                  borderRadius: "50%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  src={Images.logo}
                  alt="logo"
                  style={{
                    maxWidth: "50%",
                    maxHeight: "50%",
                    objectFit: "cover",
                    cursor: "pointer",
                  }}
                  onClick={handleLogoClick}
                />
              </Box>
            </Box>

            <Box
              width={{ md: "40%" }}
              sx={{
                display: { xs: "none", md: "flex" },
                justifyContent: "flex-end",
              }}
            >
              {/* <Button sx={{ color: "black" }}>{ContentText['about-us']}</Button> */}
              <Button sx={{ color: "black" }}>
                {/* <FavoriteBorderIcon /> */}
                <ShoppingCartOutlinedIcon />
              </Button>
              <Button
                sx={{ color: "black" }}
                onClick={() => navigate("/profile")}
              >
                <PersonOutlineIcon />
              </Button>
            </Box>
          </Box>
        </Box>

        {/* Drawer Menu */}
        <Menu openMenu={openMenu} toggleDrawerMenu={toggleDrawerMenu} />

        {/* Search Menu */}
        {/* <MenuSearch openMenu={openMenuSearch} toggleDrawerMenu={toggleDrawerMenuSearch} /> */}
      </Box>
    </AppBar>
  );
}
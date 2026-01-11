import { Box, Button, Container, Divider, Drawer, IconButton, InputBase, Paper } from "@mui/material";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import CloseIcon from '@mui/icons-material/Close';

const MenuSearch = ({ openMenu, toggleDrawerMenu }: any) => {
    return (
        <>
            <Box>
                <Drawer anchor="top" open={openMenu} onClose={toggleDrawerMenu}>
                    <Box sx={{ height: '80vh' }}>
                        <Divider />
                        <Container sx={{ height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Box>
                            </Box>
                            <Paper
                                component="form"
                                sx={{
                                    my: 3, p: '2px 4px', display: 'flex', alignItems: 'center', width: 600,
                                    borderRadius: '50px', borderColor: '1px solid gray'
                                }}
                            >
                                <InputBase
                                    sx={{ ml: 1, flex: 1, color: 'gray', fontStyle: 'italic', fontSize: '21px' }}
                                    placeholder="Find a scent that you really like <3"
                                //inputProps={{ 'aria-label': 'search google maps' }}
                                />
                                <IconButton type="button" sx={{ p: '10px' }} >
                                    <SearchOutlinedIcon sx={{ fontSize: '28px' }} />
                                </IconButton>
                            </Paper>
                            <Box sx={{ height: '64px', display: 'flex', alignItems: 'center' }}>
                                <Button onClick={toggleDrawerMenu} sx={{ width: '100%', height: '100%', color: 'black', borderRadius: '50%' }}>
                                    <CloseIcon sx={{ fontSize: '30px' }} />
                                </Button>
                            </Box>
                        </Container>
                        <Divider />
                        <Box>

                        </Box>
                    </Box>
                </Drawer>
            </Box>
        </>
    );
}

export default MenuSearch;
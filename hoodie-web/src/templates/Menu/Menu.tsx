import { Box, Button, Divider, Drawer, Stack, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import ContentText from '../../assets/content-text.json';

const Menu = ({ openMenu, toggleDrawerMenu }: any) => {
    return (
        <Box>
            <Drawer anchor="left" open={openMenu} onClose={toggleDrawerMenu}>
                <Box sx={{ height: '100vh', width: '480px' }}>
                    <Box sx={{ mx: 5 }}>
                        <Box sx={{ height: '80px', display: 'flex', alignItems: 'center' }}>
                            <Button onClick={toggleDrawerMenu} sx={{ color: 'black' }}>
                                <CloseIcon sx={{ fontSize: '30px', mr: 1 }} />
                                Close
                            </Button>
                        </Box>
                        <Divider />
                        <Box sx={{ my: 5 }}>
                            <Typography sx={{ mb: 2, fontWeight: 'bold' }}>Top choices</Typography>
                            <Stack>
                                {/* <LinkCustom sx={{ color: 'black' }}
                                    content='Best-Selling scented candles'
                                    icon={<SellOutlinedIcon sx={{ color: 'yellow' }} />}
                                    iconPosition='start'
                                    href='/category'
                                />
                                <LinkCustom sx={{ color: 'black' }}
                                    content='Used as a gift'
                                    icon={<CardGiftcardOutlinedIcon sx={{ color: 'red' }} />}
                                    iconPosition='start'
                                    href='/gift'
                                />
                                <LinkCustom sx={{ color: 'black' }}
                                    content='Scented candles help relax'
                                    icon={<SelfImprovementOutlinedIcon sx={{ color: 'purple' }} />}
                                    iconPosition='start'
                                    href='#'
                                />
                                <LinkCustom sx={{ color: 'black' }}
                                    content='Make scented candles according to your style'
                                    icon={<DashboardCustomizeOutlinedIcon sx={{ color: 'orange' }} />}
                                    iconPosition='start'
                                    href='#'
                                />
                                <LinkCustom sx={{ color: 'black' }}
                                    content='Give us your feedback'
                                    icon={<SendToMobileOutlinedIcon sx={{ color: 'green' }} />}
                                    iconPosition='start'
                                    href='#'
                                /> */}
                            </Stack>
                        </Box>
                        <Divider />
                        <Box sx={{ my: 5 }}>
                            <Typography sx={{ mb: 2, fontWeight: 'bold' }}>How can we help you?</Typography>
                            {/* <LinkCustom
                                content='nguyenhotro2023@gmail.com'
                                //href='' 
                                icon={<MailOutlineIcon />}
                                iconPosition='start'
                            />
                            <LinkCustom
                                content='+84 923 187 241'
                                //href='' 
                                icon={<PhoneForwardedOutlinedIcon />}
                                iconPosition='start'
                            />
                            <LinkCustom
                                content='www.facebook.com/lavarosevn'
                                //href='www.facebook.com/lavarosevn' 
                                icon={<FacebookOutlinedIcon />}
                                iconPosition='start'
                            /> */}
                            <Typography sx={{ textAlign: 'center', mt: 5 }}>{ContentText.www}</Typography>
                        </Box>
                    </Box>
                </Box>
            </Drawer>
        </Box>
    );

}

export default Menu;
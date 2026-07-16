/**
 * @author duynguyen © 2025
 */
import { Box, Container, Divider, Typography } from '@mui/material';
import GppGoodOutlinedIcon from '@mui/icons-material/GppGoodOutlined';
import Shop2OutlinedIcon from '@mui/icons-material/Shop2Outlined';
import SupportAgentOutlinedIcon from '@mui/icons-material/SupportAgentOutlined';
import ContentText from '../../assets/content-text.json';
import Image from '../Image';
import Images from '../../utils/Images';
import LinkCustom from '../LinkCustom';

/**
 * Footer
 * 
 * @param props 
 * @returns Footer
 */
export default function Footer() {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          // minHeight: '100vh',
        }}
      >
        <Box
          component="footer"
          sx={{
            py: 3,
            px: 2,
            mt: 'auto',
            backgroundColor: '#FFF9C4', 
          }}
        >
          <Divider />
          <Container maxWidth="sm">
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Box>
                <Image src={Images.logo} alt="logo_footer" style={{ width: '80px', height: '80px' }} />
              </Box>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <LinkCustom
                  content={"Information Security"}
                  icon={<GppGoodOutlinedIcon sx={{ width: '30px', height: '30px', color: 'green' }} />}
                />
                <LinkCustom
                  content={"Online Shopping"}
                  icon={<Shop2OutlinedIcon sx={{ width: '30px', height: '30px', color: 'orange' }} />}
                  sx={{ mx: 3 }}
                />
                <LinkCustom
                  content={"Quick Support"}
                  icon={<SupportAgentOutlinedIcon sx={{ width: '30px', height: '30px', color: 'blue' }} />}
                />
              </Box>
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
              © {new Date().getFullYear()} {ContentText['copy-right']}
            </Typography>
          </Container>
        </Box>
      </Box>
    </>
  );
}
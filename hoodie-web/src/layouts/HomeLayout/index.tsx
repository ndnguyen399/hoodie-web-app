
import { Box } from '@mui/material';
// import { Outlet } from 'react-router-dom';

// ==============================|| HOME LAYOUT (Protected) ||============================== //

export default function HomeLayout() {
  return (
    <Box>
        <Box 
            // sx={{ height: 64, background: '#1976d2', color: '#fff', p: 2 }}
        >
            Main Header
        </Box>

        {/* <Box sx={{ p: 2 }}>
            <Outlet />
        </Box> */}
    </Box>
  );
}
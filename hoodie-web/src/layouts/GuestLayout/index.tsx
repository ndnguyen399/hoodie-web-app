/**
 * @author duynguyen © 2025
 */
import { Box } from '@mui/material';
import Footer from '../../templates/Footer/Footer';
import Header from '../../templates/Header/Header';
import { ChatBot } from '../../components/ChatBot';

// ==============================|| GUEST LAYOUT (Public) ||============================== //

export default function GuestLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Box>
        <Header />
      </Box>
      {children}
      <Box>
        <Footer />
      </Box>

      {/* chatbot */}
      <ChatBot />
    </>
  );
}

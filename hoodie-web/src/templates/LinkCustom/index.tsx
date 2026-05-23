/**
 * @author duynguyen © 2025
 */
import React from 'react';
import { Box, Link, Typography } from '@mui/material';
import type { SxProps } from '@mui/material';

interface LinkCustomProps {
  content?: string;
  href?: string;
  icon?: React.ReactNode;
  iconPosition?: 'start' | 'end';
  sx?: SxProps;
  [key: string]: any;
}

const LinkCustom: React.FC<LinkCustomProps> = ({ 
  content = "", 
  href = "#", 
  icon = null, 
  iconPosition = "start", 
  sx = {}, 
  ...props 
}) => {
  return (
    <Box>
      <Link 
        href={href} 
        sx={{ 
          color: 'black', // Thay đổi màu liên kết theo chủ đề của bạn
          textDecoration: 'none', // Loại bỏ gạch chân
          display: 'flex',
          alignItems: 'center',
          cursor: 'pointer',
          '&:hover': {
            textDecoration: 'underline' // Gạch chân khi hover
          },
          ...sx
        }}
        {...props}
      >
        {icon && iconPosition === 'start' && <Box sx={{ mr: 1 }}>{icon}</Box>}
        <Typography>{content}</Typography>
        {icon && iconPosition === 'end' && <Box sx={{ ml: 1 }}>{icon}</Box>}
      </Link>      
    </Box>
  );
};

export default LinkCustom;
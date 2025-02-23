import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Typography,
  Avatar,
} from '@mui/material';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  boxShadow: 'none',
  borderBottom: '1px solid #E4E7EB',
}));

const Logo = styled('div')({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  cursor: 'pointer',
  '& img': {
    height: '24px',
  },
});

const Layout = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <StyledAppBar position="fixed">
        <Toolbar>
          <Logo onClick={() => navigate('/')}>
            <Typography variant="h6" color="primary">
              Convergence
            </Typography>
          </Logo>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton>
            <WbSunnyOutlinedIcon />
          </IconButton>
          <IconButton
            onClick={() => navigate('/settings')}
            sx={{ marginLeft: 1 }}
          >
            <Avatar sx={{ bgcolor: 'secondary.main', width: 32, height: 32 }}>
              SA
            </Avatar>
          </IconButton>
        </Toolbar>
      </StyledAppBar>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          mt: 8,
          backgroundColor: 'background.paper',
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;

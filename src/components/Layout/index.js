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
  Menu,
  MenuItem,
} from '@mui/material';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import { useAuth } from '../../contexts/AuthContext';

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
  const { signOut } = useAuth();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/auth');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

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
            onClick={handleMenu}
            sx={{ marginLeft: 1 }}
          >
            <Avatar sx={{ bgcolor: 'secondary.main', width: 32, height: 32 }}>
              SA
            </Avatar>
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={() => {
              handleClose();
              navigate('/settings');
            }}>
              Settings
            </MenuItem>
            <MenuItem onClick={() => {
              handleClose();
              handleSignOut();
            }}>
              Sign Out
            </MenuItem>
          </Menu>
        </Toolbar>
      </StyledAppBar>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          pt: '64px',
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? '#F7F9FC'
              : theme.palette.background.default,
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;

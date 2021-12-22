import { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import { Avatar, Button, Menu, MenuItem, Box } from '@mui/material';

export default function Profile() {
  const [anchorEl, setAnchorEl] = useState(null);
  const { loginWithRedirect, logout, isAuthenticated, isLoading, user } =
    useAuth0();
  const navigate = useNavigate();

  const open = Boolean(anchorEl);
  const handleLoginClick = () => loginWithRedirect();

  const handleAvatarClick = (event) => setAnchorEl(event.currentTarget);

  const handleMenuClose = () => setAnchorEl(null);

  const handleProfileClick = () => {
    handleMenuClose();
    navigate('profile');
  };

  const handleLogoutClick = () => {
    handleMenuClose();
    logout();
  };

  return (
    <Box>
      <Button
        onClick={handleLoginClick}
        sx={{
          fontSize: '1.125rem',
          color: 'white',
          display: isAuthenticated ? 'none' : 'block',
        }}
      >
        Login
      </Button>
      <Avatar
        src={user && user.picture}
        sx={{
          display: isAuthenticated ? 'block' : 'none',
        }}
        onClick={handleAvatarClick}
      />
      <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
        <MenuItem onClick={handleProfileClick}>Profile</MenuItem>
        <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
      </Menu>
    </Box>
  );
}

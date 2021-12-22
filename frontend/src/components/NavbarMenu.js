import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconButton, Menu, MenuItem, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

export default function NavbarMenu({ pages }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  const handleRouteClick = (route) => navigate(route);

  return (
    <Box>
      <IconButton size="large" aria-label="menu" onClick={handleMenuOpen}>
        <MenuIcon sx={{ color: 'white' }} />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        {pages &&
          pages.map((page) => (
            <MenuItem
              sx={{
                textTransform: 'capitalize',
              }}
              key={page.name}
              onClick={() => handleRouteClick(page.route)}
            >
              {page.name}
            </MenuItem>
          ))}
      </Menu>
    </Box>
  );
}

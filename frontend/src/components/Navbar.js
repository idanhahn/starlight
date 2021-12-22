import { useLocation, useNavigate } from 'react-router-dom';
import { Button, AppBar, Toolbar, Box, Container } from '@mui/material';

import NavbarMenu from './NavbarMenu';
import Profile from './Profile';

const pages = [
  {
    name: 'vehicles',
    route: '/',
  },
  {
    name: 'bookings',
    route: '/bookings',
  },
];

export default function Navbar() {
  // Hooks:
  const navigate = useNavigate();

  const { pathname } = useLocation();

  // Handlers:

  const handleLogoClick = () => navigate('/');

  const handleRouteClick = (page) => {
    pages.forEach((page) => (page.active = false));
    page.active = true;
    navigate(page.route);
  };

  // CSS
  const imgStyle = {
    maxHeight: '50px',
    maxWidth: 'auto',
    cursor: 'pointer',
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar>
          {/* Menu - mobile only */}
          <Box sx={{ mr: '2', display: { xs: 'block', md: 'none' } }}>
            <NavbarMenu pages={pages} />
          </Box>
          {/* Logo */}
          <Box sx={{ flexGrow: { xs: 1, md: 0 }, mr: 3 }}>
            <img
              onClick={handleLogoClick}
              style={imgStyle}
              src="/logo.png"
              alt="mockup company"
            />
          </Box>
          {/* Pages - desktop only */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages &&
              pages.map((page) => (
                <Button
                  sx={{
                    color: pathname === page.route ? '#e3d5a8' : 'white',
                    fontSize: '1.125rem',
                  }}
                  key={page.name}
                  onClick={() => handleRouteClick(page)}
                >
                  {page.name}
                </Button>
              ))}
          </Box>
          {/* Profile */}
          <Profile />
        </Toolbar>
      </Container>
    </AppBar>
  );
}

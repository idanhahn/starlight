import { useAuth0 } from '@auth0/auth0-react';

import { Typography, Box } from '@mui/material';

export default function Profile() {
  const { user } = useAuth0();

  return (
    <Box>
      <Typography>{user.name}</Typography>
      <Typography>{user.sub}</Typography>
    </Box>
  );
}

import { Grid } from '@mui/material';

export default function Layout({ children }) {
  return (
    <Grid
      container
      sx={{
        pl: { xs: 0, md: '10%' },
        pr: { xs: 0, md: '10%' },
      }}
    >
      {children}
    </Grid>
  );
}

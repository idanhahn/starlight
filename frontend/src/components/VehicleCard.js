import { Card, CardMedia, CardContent, Typography, Box } from '@mui/material';

export default function VehicleCard({ vehicle }) {
  return (
    <Card>
      <CardMedia
        component="img"
        image={vehicle.img}
        sx={{ maxWidth: '100%', maxHeight: '150px' }}
      />
      {/* <Box
        sx={{
          position: 'absolute',
          top: '20px',
          left: '20px',
        }}
      >
        this text should overlay the image
      </Box> */}
      <CardContent>
        <Typography variant="h6" color="secondary">
          {`${vehicle.model.make} ${vehicle.model.name} (${vehicle.model.year})`}
        </Typography>
      </CardContent>
    </Card>
  );
}

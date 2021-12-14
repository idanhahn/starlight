import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
} from '@mui/material';

export default function VehicleCard({ vehicle, handleOpenBook }) {
  return (
    <Card>
      <CardMedia
        component="img"
        image={vehicle.img}
        sx={{ maxWidth: '100%', maxHeight: '180px' }}
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
        <Typography variant="h6" color="primary">
          {`${vehicle.model.make} ${vehicle.model.name} (${vehicle.model.year})`}
        </Typography>
        <Typography variant="body1" color="secondary" noWrap>
          {vehicle.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button variant="text">More details</Button>
        <Button variant="outlined" onClick={() => handleOpenBook(vehicle.id)}>
          Book
        </Button>
      </CardActions>
    </Card>
  );
}

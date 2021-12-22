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
    <Card sx={{ flex: '1 1 0px', display: 'flex', flexDirection: 'column' }}>
      <CardMedia
        component="img"
        image={vehicle.img}
        sx={{ maxWidth: '100%', maxHeight: '180px' }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
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

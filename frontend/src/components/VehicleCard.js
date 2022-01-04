import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
} from '@mui/material';

export default function VehicleCard({ vehicle, handleOpenBook }) {
  return (
    <Card
      sx={{
        flex: '1 1 0px',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
      }}
    >
      <CardMedia
        component="img"
        image={vehicle.img}
        sx={{ maxWidth: '100%', maxHeight: '240px' }}
      />
      <Box sx={{ position: 'absolute', top: '20px' }}>
        <Box
          bgcolor="primary.main"
          border={2}
          borderLeft={0}
          sx={{
            height: '40px',
            width: '108px',
            borderRadius: '0 24px 24px 0',
            borderColor: '#D3D3D3',
            boxShadow: '0 2px 4px 0 rgba(0,0,0,0.18)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography sx={{ mr: 2, color: 'white', fontWeight: 600 }}>
            ${vehicle.cost}/Day
          </Typography>
        </Box>
      </Box>
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" color="primary">
          {`${vehicle.make} ${vehicle.model} (${vehicle.year})`}
        </Typography>
        <Typography variant="body1" color="secondary" noWrap>
          {vehicle.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button variant="text">More details</Button>
        <Button variant="outlined" onClick={() => handleOpenBook(vehicle._id)}>
          Book
        </Button>
      </CardActions>
    </Card>
  );
}

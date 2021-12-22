import { useParams } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';
import { Typography, Paper, Grid } from '@mui/material';

const GET_BOOKING = gql`
  query GET_BOOKING($id: ID!) {
    Booking(id: $id) {
      id
      cost
      from
      to
      Vehicle {
        img
        vin
        model
        size
      }
    }
  }
`;

export default function Booking() {
  const params = useParams();

  const { data, loading, error } = useQuery(GET_BOOKING, {
    variables: {
      id: params.bookingId,
    },
  });

  if (loading) return 'Loading...';

  if (error) return `Error ${error}`;

  return (
    <Grid>
      <Typography variant="h3" color="primary">
        Successfully booked {data.Booking.Vehicle.model.make}{' '}
        {data.Booking.Vehicle.model.name}
      </Typography>
      <Paper variant="outlined">
        <img src={data.Booking.Vehicle.img} />
      </Paper>
    </Grid>
  );
}

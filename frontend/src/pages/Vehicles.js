import { Grid } from '@mui/material';
import { gql, useQuery } from '@apollo/client';

import VehicleCard from '../components/VehicleCard';

const GET_VEHICLES = gql`
  query GET_VEHICLES {
    allVehicles {
      id
      img
      size
      model
      cost
    }
  }
`;

export default function Vehicles() {
  const { loading, error, data } = useQuery(GET_VEHICLES);

  if (loading) return 'Loading';

  if (error) return `Error! ${error}`;

  return (
    <Grid container spacing={2} sx={{ m: 3 }}>
      {data.allVehicles.map((vehicle) => (
        <Grid item xs={12} sm={6} md={4} key={vehicle.id}>
          <VehicleCard vehicle={vehicle} />
        </Grid>
      ))}
    </Grid>
  );
}

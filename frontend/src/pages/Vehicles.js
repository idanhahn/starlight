import { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { gql, useLazyQuery } from '@apollo/client';
import {
  Modal,
  Box,
  Grid,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
  InputAdornment,
} from '@mui/material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

import VehicleCard from '../components/VehicleCard';
import BookPreview from '../components/BookPreview';
import { useForm } from 'react-hook-form';

const GET_VEHICLES = gql`
  query GET_VEHICLES(
    $page: Int
    $perPage: Int
    $sortField: String
    $sortOrder: String
    $filter: VehicleFilter
  ) {
    vehicles(
      page: $page
      perPage: $perPage
      sortField: $sortField
      sortOrder: $sortOrder
      filter: $filter
    ) {
      _id
      img
      size
      make
      model
      year
      cost
      description
    }
  }
`;

export default function Vehicles() {
  useEffect(() => {
    getFilteredVehicles({
      variables: {
        page: 0,
        perPage: 10,
        sortField: 'cost',
        sortOrder: 'asc',
      },
    });
  }, []);

  const { isAuthenticated, loginWithRedirect } = useAuth0();

  const [getFilteredVehicles, { loading, error, data }] =
    useLazyQuery(GET_VEHICLES);

  // Modal related logic:
  const [open, setOpen] = useState({
    id: null,
    showDialog: false,
  });

  const handleOpen = (id) => {
    if (!isAuthenticated) return loginWithRedirect();

    setOpen({
      id: id,
      showDialog: true,
    });
  };

  const handleClose = () =>
    setOpen({
      id: null,
      showDialog: false,
    });

  // Filter form related logic:
  const { register, handleSubmit } = useForm({
    defaultValues: {
      size: 'small',
      costMin: 0,
      costMax: 2000,
    },
  });

  const onSubmit = (filterData) => {
    getFilteredVehicles({
      variables: {
        page: 0,
        perPage: 10,
        filter: {
          size: filterData.size,
          cost_gt: +filterData.costMin,
          cost_lt: +filterData.costMax,
        },
      },
    });
  };

  if (loading) return 'Loading';

  if (error) return `Error! ${error}`;

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: {
      sm: 400,
      md: 800,
    },
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  return (
    <Grid container spacing={2} sx={{ m: 3 }}>
      {/* FILTER FORM*/}
      <Grid item xs={12}>
        <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
          {/* SELECT VEHICLE SIZE */}
          <FormControl sx={{ mr: 2 }}>
            <InputLabel id="size-select-label">Size</InputLabel>
            <Select
              labelId="size-select-label"
              id="size"
              label="Size"
              defaultValue={'small'}
              required
              {...register('size')}
            >
              <MenuItem value={'small'}>Small</MenuItem>
              <MenuItem value={'medium'}>Medium</MenuItem>
              <MenuItem value={'large'}>Large</MenuItem>
            </Select>
          </FormControl>

          {/* COST RANGE */}
          <FormControl sx={{ mr: 2 }}>
            <InputLabel>From</InputLabel>
            <OutlinedInput
              id="cost-range-min"
              label="From"
              startAdornment={
                <InputAdornment position="start">$</InputAdornment>
              }
              {...register('costMin')}
              defaultValue={0}
            />
          </FormControl>

          <FormControl sx={{ mr: 2 }}>
            <InputLabel>To</InputLabel>
            <OutlinedInput
              id="cost-range-max"
              label="From"
              startAdornment={
                <InputAdornment position="start">$</InputAdornment>
              }
              {...register('costMax')}
            />
          </FormControl>

          {/* AVAILABLE DATES */}

          {/* SEARCH BUTTON */}
          <Button
            size="large"
            type="submit"
            color="primary"
            variant="outlined"
            endIcon={<SearchOutlinedIcon />}
          >
            Find
          </Button>
        </form>
      </Grid>

      {/* VEHICLE LIST*/}
      {data &&
        data.vehicles.map((vehicle) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            sx={{ display: 'flex' }}
            key={vehicle.id}
          >
            <VehicleCard vehicle={vehicle} handleOpenBook={handleOpen} />
          </Grid>
        ))}

      <Modal
        open={open.showDialog}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <BookPreview vehicleId={open.id} handleClose={handleClose} />
        </Box>
      </Modal>
    </Grid>
  );
}

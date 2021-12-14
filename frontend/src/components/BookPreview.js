import { useState } from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';
import { useForm, Controller } from 'react-hook-form';
import { Box, TextField, IconButton, Button, Typography } from '@mui/material';
import DatePicker from '@mui/lab/DatePicker';
import CloseIcon from '@mui/icons-material/Close';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

const GET_VEHICLE_WTIH_BOOKING = gql`
  query GET_VEHICLE_WITH_BOOKING($id: ID!) {
    Vehicle(id: $id) {
      id
      img
      size
      model
      cost
      description
      vin
      User {
        firstName
      }
      Bookings {
        from
        to
      }
    }
  }
`;

const CREATE_BOOKING = gql`
  mutation CREATE_BOOKING(
    $created: String!
    $updated: String!
    $deleted: String
    $from: String!
    $to: String!
    $cost: Float!
    $user_id: ID!
    $vehicle_id: ID!
  ) {
    createNote(
      created: $created
      updated: $updated
      deleted: $deleted
      from: $from
      to: $to
      cost: $cost
      user_id: $user_id
      vehicle_id: $vehicle_id
    ) {
      id
    }
  }
`;

export default function BookPreview({ vehicleId, handleClose }) {
  const [value, setValue] = useState(null);

  const { control, register, handleSubmit } = useForm({});

  const { loading, error, data } = useQuery(GET_VEHICLE_WTIH_BOOKING, {
    variables: {
      id: vehicleId,
    },
  });

  const [createBooking, { mutationData, mutationLoading, mutationError }] =
    useMutation(CREATE_BOOKING);

  if (loading) return 'Loading';

  if (error) return `Error! ${error}`;

  if (mutationLoading) return 'Loading';

  if (mutationError) return `Error! ${error}`;

  const onSubmit = (mutationData) => {
    console.log(mutationData);
  };

  return (
    <Box>
      {/* CLOSE BUTTON */}
      <IconButton color="secondary" onClick={handleClose}>
        <CloseIcon />
      </IconButton>

      {/* VEHICLE IMG */}
      <img src={data.Vehicle.img} alt="" />

      {/* VEHICLE TITLE */}
      <Typography
        variant="h4"
        color="primary"
      >{`${data.Vehicle.model.make} ${data.Vehicle.model.name}`}</Typography>

      {/* OWNER NAME */}
      <Typography variant="h5" color="secondaty">
        {data.Vehicle.User.firstName}
      </Typography>

      {/* VIN */}
      <Typography variant="h5" color="secondaty">
        {data.Vehicle.vin}
      </Typography>

      {/* SIZE */}
      <Typography variant="h5" color="secondaty">
        {data.Vehicle.size}
      </Typography>

      {/* DESCRIPTION */}
      <Typography variant="body1" color="primary">
        {data.Vehicle.description}
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* FROM DATE PICKER */}
        <Controller
          name="datepicker_from"
          control={control}
          render={({ field }) => (
            <DatePicker
              label="From date"
              onChange={(date) => field.onChange(date)}
              renderInput={(params) => <TextField {...params} />}
            />
          )}
        />

        {/* TO DATE PICKER */}
        <DatePicker
          label="To date"
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
          }}
          renderInput={(params) => <TextField {...params} />}
          register
        />
        {/* COST */}
        <Typography variant="h3" color="primary">
          ${data.Vehicle.cost}/DAY
        </Typography>

        {/* CANCEL BUTTON*/}
        <Button
          variant="outline"
          color="error"
          endIcon={<CancelOutlinedIcon />}
          onClick={handleClose}
        >
          return
        </Button>

        {/* BOOK/SUBMIT BUTTON*/}
        <Button
          type="submit"
          variant="contained"
          color="success"
          endIcon={<ArrowForwardIosIcon />}
        >
          Book
        </Button>
      </form>
    </Box>
  );
}

import { gql, useQuery, useMutation } from '@apollo/client';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Box, TextField, IconButton, Button, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import DatePicker from '@mui/lab/DatePicker';
import { addDays, differenceInCalendarDays } from 'date-fns';

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
    createBooking(
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
  const navigate = useNavigate();

  const { control, watch, handleSubmit } = useForm({
    defaultValues: {
      fromDate: new Date(),
      toDate: addDays(new Date(), 1),
    },
  });

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

  const onSubmit = (booking) => {
    console.log(booking);
    createBooking({
      variables: {
        created: '',
        updated: '',
        deleted: '',
        from: booking.fromDate,
        to: booking.toDate,
        cost: +`${
          differenceInCalendarDays(toDate, fromDate) * data.Vehicle.cost
        }`,
        user_id: '1',
        vehicle_id: vehicleId,
      },
    }).then((response) => {
      console.log(response);
      navigate(`/booking/${response.data.createBooking.id}`);
    });
  };

  const fromDate = watch('fromDate');
  const toDate = watch('toDate');

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

      {/* Daily COST */}
      <Typography variant="h3" color="primary">
        ${data.Vehicle.cost}/DAY
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* FROM DATE PICKER */}
        <Controller
          render={({ field: { onChange, value } }) => (
            <DatePicker
              label="From Date"
              value={value}
              onChange={onChange}
              renderInput={(params) => <TextField {...params} />}
            />
          )}
          control={control}
          name="fromDate"
        />

        {/* TO DATE PICKER */}
        <Controller
          render={({ field: { onChange, value } }) => (
            <DatePicker
              label="To Date"
              value={value}
              onChange={onChange}
              renderInput={(params) => <TextField {...params} />}
            />
          )}
          control={control}
          name="toDate"
        />
        {/* TOTAL COST */}

        <Typography variant="h4" color="success">
          ${differenceInCalendarDays(toDate, fromDate) * data.Vehicle.cost}
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

import { gql, useQuery, useMutation } from '@apollo/client';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import {
  Typography,
  TextField,
  Divider,
  IconButton,
  Button,
  CardContent,
  Card,
  Box,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
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
    // check if user logged into the platform:

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

  const vehicleImgStyle = {
    maxWidth: '340px',
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      {/* CLOSE BUTTON */}
      <Box id="closeButton" sx={{ display: 'flex' }}>
        <Box display={{ flexGrow: 1 }} />
        <IconButton color="secondary" onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </Box>

      <Box id="vehicleDetails" sx={{ display: 'flex', mb: 2 }}>
        {/* VEHICLE IMG */}
        <Box sx={{ mr: 6 }}>
          <img style={vehicleImgStyle} src={data.Vehicle.img} alt="" />
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          {/* VEHICLE TITLE */}
          <Typography
            variant="h4"
            color="primary"
          >{`${data.Vehicle.model.make} ${data.Vehicle.model.name}`}</Typography>
          {/* DESCRIPTION */}
          <Typography variant="body1" color="secondary">
            {data.Vehicle.description}
          </Typography>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', alignContent: 'space-between' }}>
        <Box
          id="additional Details"
          sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}
        >
          <Typography variant="h6" sx={{ alignSelf: 'center' }}>
            Additional Details
          </Typography>
          <Divider sx={{ mt: 2, mb: 4, mr: 2 }} />
          <Box sx={{ display: 'flex', flexDirection: 'column', px: 2 }}>
            {/* OWNER NAME */}
            <Box
              id="owner"
              sx={{ display: 'flex', mb: 2, justifyContent: 'space-between' }}
            >
              <Typography variant="h6" color="secondaty">
                Owner name:
              </Typography>
              <Typography variant="h6" color="primary" component="span">
                {data.Vehicle.User.firstName}
              </Typography>
            </Box>

            {/* VIN NUMBER */}
            <Box
              id="vin"
              sx={{ display: 'flex', mb: 2, justifyContent: 'space-between' }}
            >
              <Typography variant="h6" color="secondaty">
                VIN:
              </Typography>
              <Typography variant="h6" color="primary" component="span">
                {data.Vehicle.vin}
              </Typography>
            </Box>

            {/* SIZE */}
            <Box
              id="size"
              sx={{ display: 'flex', justifyContent: 'space-between' }}
            >
              <Typography variant="h6" color="secondaty" gutterBottom>
                Size:
              </Typography>
              <Typography variant="h6" color="primary" component="span">
                {data.Vehicle.size}
              </Typography>
            </Box>
          </Box>
        </Box>

        <Card sx={{ ml: 4 }}>
          <CardContent>
            {/* Daily COST */}
            <Box sx={{ mt: 1, px: 2 }}>
              <Typography variant="h4" color="secondary" sx={{ mb: 3 }}>
                ${data.Vehicle.cost}{' '}
                <Typography component="span" color="secondary" variant="h6">
                  / DAY
                </Typography>
              </Typography>

              <form onSubmit={handleSubmit(onSubmit)}>
                <Box sx={{ mb: 4, display: 'flex' }}>
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
                </Box>

                {/* TOTAL COST */}
                <Box sx={{ display: 'flex', flexDirection: 'column', mb: 4 }}>
                  <Box sx={{ display: 'flex' }}>
                    <Typography variant="h5" color="secondary" sx={{ mr: 6 }}>
                      Total Cost:
                    </Typography>

                    <Typography variant="h5" color="primary">
                      $
                      {differenceInCalendarDays(toDate, fromDate) *
                        data.Vehicle.cost}
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex' }}>
                  <Box sx={{ flexGrow: 1 }} />

                  {/* BOOK/SUBMIT BUTTON*/}
                  <Button
                    type="submit"
                    variant="contained"
                    color="success"
                    sx={{ px: 12, py: 1.5 }}
                  >
                    RESERVE
                  </Button>
                  <Box sx={{ flexGrow: 1 }} />
                </Box>
              </form>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}

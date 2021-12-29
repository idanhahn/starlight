import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { Routes, Route } from 'react-router-dom';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateAdapter from '@mui/lab/AdapterDateFns';
import Auth0ProviderWithHistory from './auth/Auth0ProviderWithHistory';
import RequireAuth from './auth/RequireAuth';
import Layout from './components/Layout';
import Vehicles from './pages/Vehicles';
import Booking from './pages/Booking';
import Bookings from './pages/Bookings';
import Profile from './pages/Profile';

const client = new ApolloClient({
  uri: 'http://localhost:5000',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <LocalizationProvider dateAdapter={DateAdapter}>
        <Auth0ProviderWithHistory>
          <Layout>
            <Routes>
              <Route exact path="/" element={<Vehicles />} />
              <Route path="/booking/:bookingId" element={<Booking />} />
              <Route
                path="/bookings"
                element={
                  <RequireAuth redirect="/bookings">
                    <Bookings></Bookings>
                  </RequireAuth>
                }
              ></Route>
              <Route
                path="/profile"
                element={
                  <RequireAuth redirect="/profile">
                    <Profile></Profile>
                  </RequireAuth>
                }
              ></Route>
            </Routes>
          </Layout>
        </Auth0ProviderWithHistory>
      </LocalizationProvider>
    </ApolloProvider>
  );
}

export default App;

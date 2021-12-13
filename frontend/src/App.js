import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Vehicles from './pages/Vehicles';

const client = new ApolloClient({
  uri: 'http://localhost:5000',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Layout>
        <Routes>
          <Route exact path="/" element={<Vehicles />} />
        </Routes>
      </Layout>
    </ApolloProvider>
  );
}

export default App;

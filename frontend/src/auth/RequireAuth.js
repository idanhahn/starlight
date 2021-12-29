import { useAuth0 } from '@auth0/auth0-react';

export default function RequireAuth({ redirect, children }) {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  if (!isAuthenticated) {
    loginWithRedirect({ returnTo: redirect });

    return 'loading...';
  }

  return children;
}

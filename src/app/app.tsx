import { signIn, signOut, useAuthState } from './auth';

export function App() {
  const { user, loading } = useAuthState();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <button onClick={() => signIn()}>sign in</button>;
  }

  return (
    <div>
      <div>User:&nbsp;{user.email}</div>
      <button onClick={() => signOut()}>sign out</button>
    </div>
  );
}

export default App;

import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../lib/firebase';

export function useUserData() {
  const [user] = useAuthState(auth);

  return { user };
}

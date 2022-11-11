import Image from 'next/image';
import { auth, googleAuthProvider } from '../lib/firebase';
import { useContext } from 'react';
import { UserContext } from '../lib/context';
import { useRouter } from 'next/router';

const LogInWithGoogle = () => {
  const { user } = useContext(UserContext);

  // 1. user sing out <SingInButton/>
  // 2. user sing in but missed username <UsernameForm/>
  // 3. user sing in, with username <SingOutButton/>

  return user ? <SingOutButton /> : <SingInButton />;
};

function SingInButton() {
  const signInWithGoogle = async () => {
    await auth.signInWithPopup(googleAuthProvider);
  };
  return (
    <div
      className='text-black bg-white mx-3 rounded-md text-center cursor-pointer w-5/6 hover:bg-green-600/40 duration-500 py-1 font-semibold'
      onClick={signInWithGoogle}
    >
      <Image
        src='https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/1200px-Google_%22G%22_Logo.svg.png'
        alt='Google'
        width={20}
        height={20}
        className='inline mr-3 mb-1'
      ></Image>

      <p className='inline'>Sign In</p>
    </div>
  );
}

function SingOutButton() {
  // When sign out redirect to home to avoid errors
  const router = useRouter();

  const handleSignOut = () => {
    auth.signOut();
    router.push('/');
  };

  return (
    <div
      className='text-black bg-white mx-3 rounded-md text-center cursor-pointer w-5/6 hover:bg-red-500/50 duration-500 py-1 font-semibold '
      onClick={handleSignOut}
    >
      <Image
        src='https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/1200px-Google_%22G%22_Logo.svg.png'
        alt='Google'
        width={20}
        height={20}
        className='inline mr-3 mb-1'
      ></Image>

      <p className='inline'>Sign Out</p>
    </div>
  );
}

export default LogInWithGoogle;

import Image from 'next/image';
import Link from 'next/link';
import Router from 'next/router';
import { useContext, useEffect } from 'react';
import { UserContext } from '../lib/context';

const AuthCheck = (props: any) => {
  const { user } = useContext(UserContext);
  const router = Router;

  if (user) {
    return props.children;
  } else {
    useEffect(() => {
      setTimeout(() => {
        router.push('/');
      }, 5000);
    }, []);
    return (
      props.fallback || (
        <div className='my-auto flex flex-col justify-center items-center min-h-screen -mt-20 space-y-5'>
          <Image
            src='https://cdn.pixabay.com/photo/2013/07/12/13/25/hera-146990_960_720.png'
            alt='Auth Error'
            width={120}
            height={120}
          />
          <h1 className='text-3xl font-bold'>Oooops...</h1>
          <h2 className='text-2xl'> You must be singed in.</h2>
          <p className='text-2xl'>
            Go Back to the{' '}
            <Link
              className='hover:underline font-semibold'
              href='/'
            >
              Home Page
            </Link>
          </p>
        </div>
      )
    );
  }
};

export default AuthCheck;

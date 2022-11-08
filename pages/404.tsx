import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const NotFound: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push('/');
    }, 5000);
  }, []);

  return (
    <div className='my-auto flex flex-col justify-center items-center content-center min-h-screen -mt-20 space-y-4'>
      <Image
        src='https://cdn.pixabay.com/photo/2018/03/14/13/21/statue-3225208_960_720.png'
        alt='Pain'
        width={150}
        height={150}
      />
      <h1 className='text-3xl font-bold'>Oooops...</h1>
      <h2 className='text-2xl'>That page cannot be found.</h2>
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
  );
};

export default NotFound;

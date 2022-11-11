import Image from 'next/image';
import Link from 'next/link';
import { useState, useContext, useEffect } from 'react';
import { UserContext } from '../lib/context';
import LogInWithGoogle from './LogInWithGoogle';

const Navbar: React.FC = () => {
  // Use user context to have the global user
  const { user } = useContext(UserContext);

  const [loginSlide, setLoginSlide] = useState(false);

  // Togle Slide menu
  const slider = () => {
    loginSlide ? setLoginSlide(false) : setLoginSlide(true);
  };

  // Dismis Slide menu if user change
  useEffect(() => {
    loginSlide && setLoginSlide(false);
  }, [user]);

  return (
    <nav className='border-y-cyan-600 border-b-2'>
      <div className='flex justify-between mx-5  font-medium items-center py-1'>
        <div className='flex-1 flex items-center'>
          <Image
            className='rounded-full cursor-pointer '
            src={
              user
                ? user.photoURL
                : 'https://cdn.pixabay.com/photo/2017/02/23/13/05/avatar-2092113_960_720.png'
            }
            alt='Alcaen'
            width={45}
            height={45}
            onClick={slider}
          ></Image>
        </div>

        <div className='flex flex-auto justify-around '>
          <Link
            onClick={() => {
              loginSlide && setLoginSlide(false);
            }}
            href='/'
            className='cursor-pointer py-4 px-4 hover:bg-gray-500 hover:bg-opacity-10 rounded-2xl transition ease-in-out duration-500'
          >
            Home
          </Link>

          <Link
            onClick={() => {
              loginSlide && setLoginSlide(false);
            }}
            href={'/ideas'}
            className='cursor-pointer py-4 px-4 hover:bg-gray-500 hover:bg-opacity-10 rounded-2xl transition ease-in-out duration-500'
          >
            All Ideas
          </Link>
        </div>
      </div>

      {/* Login Form */}
      <div
        className={`${
          loginSlide ? 'translate-x-0' : '-translate-x-full'
        } absolute duration-500 bg-gray-300 w-[200px] h-[100px] flex flex-col space-y-1 justify-evenly z-10 mt-[2px] rounded-br-lg `}
      >
        <LogInWithGoogle />

        <div className='self-center text-black'>
          <p className='text-xs'>Don't have an account yet?</p>
          <Link
            className='text-xs block text-center text-blue-800 font-medium hover:underline'
            href='/'
          >
            Sing Up
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const Navbar: React.FC = () => {
  const [loginSlide, setLoginSlide] = useState(false);

  const slider = () => {
    loginSlide ? setLoginSlide(false) : setLoginSlide(true);
  };

  return (
    <nav className='border-y-cyan-600 border-b-2'>
      <div className='flex justify-between mx-5  font-medium items-center py-1'>
        <div className='flex-1 flex items-center'>
          <Image
            className='rounded-full cursor-pointer '
            src='https://avatars.githubusercontent.com/u/64233636?v=4'
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
            className='cursor-pointer py-4 px-4 hover:bg-gray-500 hover:bg-opacity-10 rounded-2xl transition ease-in-out delay-150 duration-500'
          >
            Home
          </Link>

          <Link
            onClick={() => {
              loginSlide && setLoginSlide(false);
            }}
            href='/ideas'
            className='cursor-pointer py-4 px-4 hover:bg-gray-500 hover:bg-opacity-10 rounded-2xl transition ease-in-out delay-150 duration-500'
          >
            All Ideas
          </Link>
        </div>
      </div>
      <div
        className={`${
          loginSlide ? 'translate-x-0' : '-translate-x-full'
        } absolute duration-500 bg-gray-300 w-[200px] h-[100px] flex flex-col space-y-1 justify-evenly z-10 mt-[2px] rounded-br-lg `}
      >
        <Link
          href='enter'
          className='text-black bg-white mx-3 py-1 rounded-md text-center'
        >
          Login
        </Link>
        <div className='self-center text-black'>
          <p className='text-xs'>Don't have an account yet?</p>
          <Link
            className='text-xs block text-center text-blue-800 font-medium hover:underline'
            href='/enter'
          >
            Sing Up
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

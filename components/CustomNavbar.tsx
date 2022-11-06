import Image from 'next/image';
import Link from 'next/link';

const Navbar: React.FC = () => {
  return (
    <nav className='border-y-cyan-600 border-b-2 border-wi'>
      <div className='flex justify-between mx-5  font-medium items-center py-1'>
        <div className='flex-1 flex items-center'>
          <Link
            href='https://github.com/alcaen'
            target='_blank'
          >
            <Image
              className='rounded-full cursor-pointer '
              src='https://avatars.githubusercontent.com/u/64233636?v=4'
              alt='Alcaen'
              width={45}
              height={45}
            ></Image>
          </Link>
          {/* <h1 className='text-xl font-semibold'>Alcaen Ideas</h1> */}
        </div>
        <div className='flex flex-auto justify-around '>
          <Link
            href='/'
            className='cursor-pointer py-4 px-4 hover:bg-gray-500 hover:bg-opacity-10 rounded-2xl transition ease-in-out delay-150 duration-500'
          >
            Home
          </Link>

          <Link
            href='/about'
            className='cursor-pointer py-4 px-4 hover:bg-gray-500 hover:bg-opacity-10 rounded-2xl transition ease-in-out delay-150 duration-500'
          >
            About
          </Link>
          <Link
            href='/ideas'
            className='cursor-pointer py-4 px-4 hover:bg-gray-500 hover:bg-opacity-10 rounded-2xl transition ease-in-out delay-150 duration-500'
          >
            All Ideas
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

import Head from 'next/head';
import Link from 'next/link';
import MadeWith from '../components/MadeWith';

const Home: React.FC = () => {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <div>
        <div className='mx-7 my-5 flex flex-col items-center space-y-7 mb-10'>
          <h1 className='text-3xl font-semibold'>Idea Tracker</h1>
          <p className='text-lg'>
            I made this website to keep track of my new project ideas as well
            the current state of them. If you want to see more projects go to my{' '}
            <Link
              href='https://github.com/alcaen'
              className='font-semibold hover:underline'
            >
              GitHub
            </Link>{' '}
            also follow me on{' '}
            <Link
              href='https://twitter.com/alejocaicedosac/'
              className='font-semibold hover:underline'
            >
              Twitter
            </Link>{' '}
            and{' '}
            <Link
              href='https://www.linkedin.com/in/alcaen/'
              className='font-semibold hover:underline'
            >
              LinkedIn.
            </Link>
          </p>

          <Link
            href='/ideas'
            // className='cursor-pointer bg-neutral-600 text-gray-300 p-2 rounded-md hover:bg-neutral-500 '
            className='cursor-pointer py-4 px-4 hover:bg-gray-500 hover:bg-opacity-10 rounded-2xl transition ease-in-out delay-150 duration-500 border-2 font-semibold'
          >
            All Ideas
          </Link>
          <p className='text-xl font-semibold'>Made With :</p>
        </div>
        <MadeWith
          tools={[
            'typescript',
            'next',
            'tailwind',
            'firebase',
            'react',
            'vercel',
          ]}
        />
      </div>
    </>
  );
};

export default Home;

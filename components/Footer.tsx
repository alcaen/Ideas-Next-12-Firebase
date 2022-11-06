import Link from 'next/link';

const Footer: React.FC = () => {
  return (
    <div className='absolute bottom-0 bg-cyan-600 right-0 left-0 py-2'>
      <p className='ml-3 text-white'>
        Copyright 2022 by{' '}
        <Link
          href='https://github.com/alcaen'
          className='text-white hover:underline '
          target='_blank'
        >
          Alcaen
        </Link>
      </p>
    </div>
  );
};

export default Footer;

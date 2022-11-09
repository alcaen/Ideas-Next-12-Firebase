import Head from 'next/head';
import Link from 'next/link';

// User Interface
// to add an array of users we use User[]
export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}
export interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}
export interface Geo {
  lat: string;
  lng: string;
}
export interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

export interface Props {
  users: User[];
}

export const getStaticProps = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/users');
  const data: User[] = await res.json();

  return {
    props: {
      users: data,
    },
  };
};

const AllIdeas: React.FC<Props> = ({ users }) => {
  return (
    <>
      <Head>
        <title>All Ideas</title>
      </Head>
      <div className='mx-7 my-5'>
        <h1 className='text-3xl font-semibold'>All Ideas</h1>
        <div className='flex justify-evenly flex-wrap w-4/5 m-auto'>
          {users.map((user: User) => {
            return (
              <Link
                href={'/ideas/' + String(user.id)}
                key={user.id}
                className='bg-cyan-600 w-[250px] h-[150px] flex-col my-8 p-4 rounded-3xl drop-shadow-lg text-white font-semibold hover:bg-cyan-500 hover:-translate-y-5 hover:-translate-x-5 transition space-y-3 cursor-pointer'
              >
                <p className='text-lg'>{user.name}</p>
                <p>{user.email}</p>
                <p>{user.phone}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default AllIdeas;

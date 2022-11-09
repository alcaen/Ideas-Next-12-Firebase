import { User } from '../index';

// Import the User interface from the all ideas path
export interface Props {
  user: User;
}

// Config to the generated static paths in this example are ten of them so if we try to get some that doesnt exist like 11 it will trow 404
export const getStaticPaths = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/users');
  const data: User[] = await res.json();

  const paths = data.map((user: any) => {
    return {
      params: { id: user.id.toString() },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

// Get the props of each user
export const getStaticProps = async (context: any) => {
  const id = await context.params.id.toString();
  const res = await fetch('https://jsonplaceholder.typicode.com/users/' + id);
  const data: User = await res.json();
  return {
    props: {
      user: data,
    },
  };
};

const SpecificId: React.FC<Props> = ({ user }) => {
  return (
    <div className='mx-7 my-5 bg-gray-300 p-5 rounded-3xl'>
      <h2 className='text-3xl font-semibold mb-4'>{user.name}</h2>
      <p className='text-xl mb-2'>From: {user.address.city}</p>
      <p className='text-xl mb-2'>Contact: {user.phone}</p>
      <p className='text-xl mb-2'>Work at: {user.company.name}</p>
    </div>
  );
};

export default SpecificId;

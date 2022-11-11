import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { getUserWithUserUid, postToJSON, auth } from '../../lib/firebase';

// User Interface
// to add an array of users we use User[]
export interface User {
  uid: string;
  name: string;
  ideas: Idea[];
}

export interface Idea {
  description: string;
  title: string;
}

export interface Props {
  user: User;
  ideas: Idea[];
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const userUid = query.ideas;
  const userDoc = await getUserWithUserUid(userUid);

  let user = null;
  let ideas = null;

  if (userDoc) {
    user = userDoc.data();
    const ideasQuery = userDoc.ref.collection('ideas');
    ideas = await (await ideasQuery.get()).docs.map(postToJSON);
  } else {
    return { notFound: true };
  }

  return {
    props: {
      user,
      ideas,
    },
  };
};

const AllIdeas: React.FC<Props> = ({ user, ideas }) => {
  return (
    <>
      <Head>
        <title>All Ideas</title>
      </Head>
      <div className='mx-7 my-5'>
        <h1 className='text-3xl font-semibold'>All Ideas</h1>
        <div className='flex justify-evenly flex-wrap w-4/5 m-auto'>
          <Link
            href={'/ideas/create'}
            className='bg-green-600 w-[250px] h-[150px] flex-col my-8 p-4 rounded-3xl drop-shadow-lg text-white font-semibold hover:bg-green-500 hover:-translate-y-5 hover:-translate-x-5 transition space-y-3 cursor-pointer'
          >
            <p className='text-lg'>Add new idea</p>
            <p className='text-lg'>{'+'}</p>
          </Link>
          {ideas.map((idea: Idea) => {
            return (
              <Link
                href={`/${user.uid}/${idea.title}`}
                key={idea.title}
                className='bg-cyan-600 w-[250px] h-[150px] flex-col my-8 p-4 rounded-3xl drop-shadow-lg text-white font-semibold hover:bg-cyan-500 hover:-translate-y-5 hover:-translate-x-5 transition space-y-3 cursor-pointer'
              >
                <p className='text-lg'>{idea.title}</p>
                <p>{idea.description}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default AllIdeas;

import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import AuthCheck from '../../components/AuthCheck';
import {
  auth,
  firestore,
  getUserWithUserUid,
  postToJSON,
} from '../../lib/firebase';

import { useCollection } from 'react-firebase-hooks/firestore';
import { DocumentData, Query, query } from 'firebase/firestore';
import LoadingWheel from '../../components/LoadingWheel';
import { UserContext } from '../../lib/context';
import { useContext } from 'react';

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

function PostList() {
  const ref = firestore
    .collection('users')
    .doc(auth.currentUser.uid)
    .collection('ideas');

  const query: any = ref.orderBy('title');

  const [querySnapshot] = useCollection(query);
  const ideas = querySnapshot?.docs.map((doc) => doc.data());

  return ideas;
}
const AllIdeas: React.FC<Props> = () => {
  const { user } = useContext(UserContext);
  const ideas = user ? PostList() : null;
  if (!ideas) {
    return (
      <AuthCheck>
        <div className='my-auto flex flex-col justify-center items-center  min-h-screen -mt-20 '>
          <LoadingWheel show={true} />
        </div>
      </AuthCheck>
    );
  } else {
    return (
      <main>
        <AuthCheck>
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
              {ideas.map((idea: any) => {
                return (
                  <Link
                    href={`/ideas/${idea.title}`}
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
        </AuthCheck>
      </main>
    );
  }
};

export default AllIdeas;
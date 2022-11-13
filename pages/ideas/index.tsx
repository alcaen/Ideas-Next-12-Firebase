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
          <div className='mx-4 my-5'>
            <div className='flex items-center break-keep space-x-4 '>
              <h1 className='text-3xl font-semibold mx-3 inline'>All Ideas</h1>
              <div>
                <input
                  className='appearance-none rounded-full h-4 w-4 border border-red-600 bg-white checked:bg-red-600 checked:border-red-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer'
                  type='radio'
                  value='todo'
                  name='status'
                  // checked={status == 'todo'}
                  // onChange={(e) => setStatus(e.target.value)}
                />
                <label className='font-semibold whitespace-nowrap'>To Do</label>
              </div>
              <div>
                <input
                  className='appearance-none rounded-full h-4 w-4 border border-yellow-400 bg-white checked:bg-yellow-400 checked:border-yellow-400 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer'
                  type='radio'
                  value='inprogress'
                  name='status'
                  // onChange={(e) => setStatus(e.target.value)}
                />
                <label className='font-semibold'>In Progress</label>
              </div>
              <div>
                <input
                  className='appearance-none rounded-full h-4 w-4 border border-green-600 bg-white checked:bg-green-600 checked:border-green-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer'
                  type='radio'
                  value='done'
                  name='status'
                  // onChange={(e) => setStatus(e.target.value)}
                />
                <label className='font-semibold'>Done</label>
              </div>
            </div>

            <div className='flex justify-evenly flex-wrap w-full'>
              <Link
                href={'/ideas/create'}
                className='bg-cyan-600 w-[160px] h-[150px] flex-col my-8 p-4 rounded-3xl drop-shadow-lg text-white font-semibold hover:bg-cyan-500 hover:-translate-y-5 hover:-translate-x-5 transition  cursor-pointer'
              >
                <p className='text-lg block text-center'>Add New</p>
                <p className='text-8xl -mt-3 text-center font-light'>{'+'}</p>
              </Link>
              {ideas.map((idea: any) => {
                return (
                  <Link
                    href={`/ideas/${idea.title}`}
                    key={idea.title}
                    className={
                      (idea.status == 'todo'
                        ? 'bg-red-600 hover:bg-red-500'
                        : idea.status == 'inprogress'
                        ? 'bg-yellow-500 hover:bg-yellow-400'
                        : 'bg-green-600 hover:bg-green-500') +
                      ` min-w-[160px] w-[160px] h-[150px] flex-col my-8 p-4 rounded-3xl drop-shadow-lg text-white font-semibold hover:-translate-y-5 hover:-translate-x-5 transition space-y-3 cursor-pointer`
                    }
                  >
                    <p className='text-lg truncate'>{idea.title}</p>
                    <p className='text-sm font-light overflow-y-hidden h-4/6'>
                      {idea.description}
                    </p>
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

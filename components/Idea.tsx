import { serverTimestamp } from 'firebase/firestore';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { auth, firestore } from '../lib/firebase';
import { Filter } from './AllIdeas';
import LoadingWheel from './LoadingWheel';

type timeStamp = {
  seconds: number;
  nanoseconds: number;
  toDate: Function;
};

export interface IdeaInterface {
  createdAt: timeStamp;
  description: string;
  slug: string;
  status: string;
  title: string;
  uid: string;
  updatedAt: timeStamp;
}

type Props = {
  idea: IdeaInterface;
  filter: Filter;
};

const Idea = ({ idea, filter }: Props) => {
  const [displayNote, setDisplayNote] = useState(false);
  const router = useRouter();
  const UpdateStatus = async (idea: IdeaInterface, Newstatus: string) => {
    const uid = auth.currentUser.uid;
    const ref = firestore
      .collection('users')
      .doc(uid)
      .collection('ideas')
      .doc(idea.slug);

    const data = {
      createdAt: idea.createdAt,
      description: idea.description,
      slug: idea.slug,
      status: Newstatus,
      title: idea.title,
      uid: idea.uid,
      updatedAt: serverTimestamp(),
    };

    await ref.set(data);

    toast.success('Status Updated');
    router.push('/ideas');
  };

  // Idea Showed
  return displayNote ? (
    <div className='fixed top-0 h-full w-full bg-gray-400/30 z-10'>
      <div
        className='fixed top-0 h-full w-full bg-gray-400/30 z-10'
        onClick={() => setDisplayNote(false)}
      ></div>
      <div className={'relative top-[20%] mx-5 z-20 bg-gray-100 rounded-lg'}>
        <button
          className='absolute top-0 right-0 w-10 h-10 rounded-xl text-center opacity-80'
          onClick={() => setDisplayNote(false)}
        >
          <p className='text-red-600 text-2xl'>❌</p>
        </button>
        <div className='p-5'>
          <p className='font-semibold text-xl'>{idea.title}</p>
          <p>{idea.description}</p>
          <p className='mt-1 font-semibold'>Created at:</p>
          <p>{idea.createdAt.toDate().toDateString()}</p>
          <p className='mt-1 font-semibold'>Updated at:</p>
          <p>
            {idea.updatedAt ? (
              idea.updatedAt.toDate().toDateString()
            ) : (
              <LoadingWheel show={true} />
            )}
          </p>
          <p className='mt-5 font-semibold'>Status:</p>
          <div className='flex space-x-3 mt-2'>
            <button
              onClick={() => UpdateStatus(idea, 'todo')}
              className={
                'w-10 h-10 rounded-xl border-2 border-red-600 duration-200 ' +
                (idea.status == 'todo'
                  ? 'bg-red-600/30'
                  : 'hover:bg-red-600/30')
              }
            ></button>
            <button
              onClick={() => UpdateStatus(idea, 'inprogress')}
              className={
                'w-10 h-10 rounded-xl border-2 border-yellow-600 duration-200 ' +
                (idea.status == 'inprogress'
                  ? 'bg-yellow-600/30'
                  : 'hover:bg-yellow-600/30')
              }
            ></button>
            <button
              onClick={() => UpdateStatus(idea, 'done')}
              className={
                'w-10 h-10 rounded-xl border-2 border-green-600 duration-200 ' +
                (idea.status == 'done'
                  ? 'bg-green-600/30'
                  : 'hover:bg-green-600/30')
              }
            ></button>
            <div className='flex-1 flex justify-end'>
              <button
                className={
                  'w-10 h-10 rounded-xl border-2 border-gray-600 bg-gray-600/30 hover:bg-gray-600/20 duration-200'
                }
              >
                ✏️
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    // Idea Not showed
    <div
      onClick={() => setDisplayNote(true)}
      key={idea.slug}
      className={
        `min-w-[160px] w-[160px] h-[150px] flex-col my-8 p-4 rounded-3xl drop-shadow-lg text-white font-semibold hover:-translate-y-5 hover:-translate-x-5 transition space-y-3 cursor-pointer ` +
        (idea.status == 'todo'
          ? 'bg-red-600 hover:bg-red-500 ' + (!filter.todo && 'hidden')
          : idea.status == 'inprogress'
          ? 'bg-yellow-500 hover:bg-yellow-400 ' +
            (!filter.inprogress && 'hidden')
          : 'bg-green-600 hover:bg-green-500 ' + (!filter.done && 'hidden'))
      }
    >
      <p className='text-lg truncate'>{idea.title}</p>
      <p className='text-sm font-light overflow-y-hidden h-2/6'>
        {idea.description}
      </p>
      <p className='text-sm font-normal'>
        {idea.updatedAt ? (
          idea.updatedAt.toDate().toDateString()
        ) : (
          <LoadingWheel show={true} />
        )}
      </p>
    </div>
  );
};

export default Idea;

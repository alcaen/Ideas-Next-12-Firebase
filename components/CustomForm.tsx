import { useRouter } from 'next/router';
import { FormEvent, useContext, useState } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import LoadingWheel from './LoadingWheel';
import { UserContext } from '../lib/context';
import { auth, firestore } from '../lib/firebase';

import kebabCase from 'lodash.kebabcase';
import AuthCheck from './AuthCheck';
import { serverTimestamp } from 'firebase/firestore';
import toast from 'react-hot-toast';
import { timeLog } from 'console';

import { IdeaInterface } from './Idea';
import Link from 'next/link';
type Props = {
  currentIdea: IdeaInterface;
};

const CustomForm = ({ currentIdea }: Props) => {
  const router = useRouter();
  const { user } = useContext(UserContext);
  const [title, setTitle] = useState(currentIdea.title);
  const [description, setDescription] = useState(currentIdea.description);
  const [status, setStatus] = useState(currentIdea.status);

  const slug = currentIdea.slug;
  const isValid =
    title.length > 3 &&
    title.length < 100 &&
    title != 'create' &&
    slug != 'create';

  const updateIdea = async (e: FormEvent) => {
    e.preventDefault();
    const uid = auth.currentUser.uid;
    const ref = firestore
      .collection('users')
      .doc(uid)
      .collection('ideas')
      .doc(currentIdea.slug);

    const data = {
      title,
      description,
      status,
      updatedAt: serverTimestamp(),
    };

    await ref.update(data);

    toast.success('Idea Updated');

    router.push('/ideas');
  };

  const deleteIdea = async () => {
    toast.error('Idea Deleted');
    router.push('/ideas');
    const uid = auth.currentUser.uid;
    const ref = firestore
      .collection('users')
      .doc(uid)
      .collection('ideas')
      .doc(currentIdea.slug);

    await ref.delete();
  };
  return (
    <AuthCheck>
      <div>
        <form
          onSubmit={updateIdea}
          className='flex flex-col justify-center items-center space-y-8 min-h-[600px]'
        >
          <div>
            <div className='block'>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={'Title'}
                className='bg-gray-500/10 rounded-md p-4 font-semibold text-center w-[200px]'
              />
              <Link
                className='py-[14px] px-[10px] ml-2 rounded-lg font-semibold enabled:hover:opacity-80 duration-300 text-white border-2 border-red-600 hover:bg-red-600/30'
                href='/ideas'
              >
                ❌
              </Link>
            </div>

            <p className='text-xs text-left mt-1 ml-2 text-gray-500'>{slug}</p>
          </div>

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder={'Description'}
            className='bg-gray-500/10 rounded-md p-2 resize-y block w-[250px] h-[200px] text-sm text-start font-semibold'
          />

          <div className='flex space-x-5'>
            <div>
              <input
                className='appearance-none rounded-full h-4 w-4 border border-red-600 bg-white checked:bg-red-600 checked:border-red-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer'
                type='radio'
                value='todo'
                name='status'
                checked={status == 'todo'}
                onChange={(e) => setStatus(e.target.value)}
              />
              <label className='font-semibold'>To Do</label>
            </div>
            <div>
              <input
                className='appearance-none rounded-full h-4 w-4 border border-yellow-400 bg-white checked:bg-yellow-400 checked:border-yellow-400 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer'
                type='radio'
                value='inprogress'
                name='status'
                checked={status == 'inprogress'}
                onChange={(e) => setStatus(e.target.value)}
              />
              <label className='font-semibold'>In Progress</label>
            </div>
            <div>
              <input
                className='appearance-none rounded-full h-4 w-4 border border-green-600 bg-white checked:bg-green-600 checked:border-green-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer'
                type='radio'
                value='done'
                name='status'
                checked={status == 'done'}
                onChange={(e) => setStatus(e.target.value)}
              />
              <label className='font-semibold'>Done</label>
            </div>
          </div>
          <div>
            <button
              className='bg-green-700 py-2 px-14 rounded-lg font-semibold enabled:hover:opacity-80 duration-300 text-white disabled:bg-red-700 mx-3'
              type='submit'
              disabled={!isValid}
            >
              Save
            </button>
            <button
              className='bg-red-700 py-2 px-14 rounded-lg font-semibold enabled:hover:opacity-80 duration-300 text-white mx-3'
              type='button'
              onClick={() => deleteIdea()}
            >
              Delete
            </button>
          </div>
        </form>
      </div>
    </AuthCheck>
  );
};

export default CustomForm;

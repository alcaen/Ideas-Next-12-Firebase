import { useRouter } from 'next/router';
import { FormEvent, useContext, useState } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import LoadingWheel from '../../../components/LoadingWheel';
import { UserContext } from '../../../lib/context';
import { auth, firestore } from '../../../lib/firebase';

import kebabCase from 'lodash.kebabcase';

const createIdea = async (e: FormEvent) => {
  e.preventDefault();
};

const Create = () => {
  const router = useRouter();
  const { user } = useContext(UserContext);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('todo');
  const slug = encodeURI(kebabCase(title))
    ? encodeURI(kebabCase(title))
    : 'Rute-Title';
  const isValid = title.length > 3 && title.length < 100;
  return (
    <div>
      <form
        onSubmit={createIdea}
        className='my-auto flex flex-col justify-center items-center  min-h-screen -mt-20 space-y-8 '
      >
        <div>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder={'Title'}
            className='bg-gray-500/10 rounded-md p-4 font-semibold text-center block'
          />
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
              onChange={(e) => setStatus(e.target.value)}
            />
            <label className='font-semibold'>Done</label>
          </div>
        </div>
        <button
          className='bg-green-700 py-2 px-14 rounded-lg font-semibold enabled:hover:opacity-80 duration-300 text-white disabled:bg-red-700'
          type='submit'
          disabled={!isValid}
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default Create;

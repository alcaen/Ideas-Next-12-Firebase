import { DocumentData } from 'firebase/firestore';
import Link from 'next/link';
import React, { useState } from 'react';
import Idea, { IdeaInterface } from './Idea';
export interface User {
  uid: string;
  name: string;
  ideas: IdeaInterface[];
}

export interface Props {
  user: User;
  ideas: DocumentData[];
}

export interface Filter {
  todo: Boolean;
  inprogress: Boolean;
  done: Boolean;
}
// Use local store is used to save states in cookies
function useLocalStorage(key: string, initialValue: any) {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If error also return initialValue
      console.log(error);
      return initialValue;
    }
  });
  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = (value: any) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
      // Save to local storage
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.log(error);
    }
  };
  return [storedValue, setValue];
}

const AllIdeas: React.FC<Props> = ({ ideas }) => {
  // Filter State Storaged on local Storage
  const [filter, setFilter] = useLocalStorage('filter', {
    todo: true,
    inprogress: true,
    done: true,
  });
  console.log(filter);
  return (
    <div className='mx-4 my-5'>
      {/* All Ideas Filter */}
      <div className='flex items-center break-keep space-x-4'>
        <h1 className='text-3xl font-semibold mx-3 inline'>All Ideas</h1>
        <div>
          <input
            className='appearance-none rounded-md h-4 w-4 border border-red-600 bg-white checked:bg-red-600 checked:border-red-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer'
            type='checkbox'
            value='todo'
            name='status'
            checked={filter.todo}
            onChange={(e) =>
              setFilter((filter: Filter) => ({
                ...filter,
                ...{ todo: filter.todo ? false : true },
              }))
            }
          />
          <label className='font-semibold whitespace-nowrap'>To Do</label>
        </div>
        <div>
          <input
            className='appearance-none rounded-md h-4 w-4 border border-yellow-400 bg-white checked:bg-yellow-400 checked:border-yellow-400 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer'
            type='checkbox'
            value='inprogress'
            name='status'
            checked={filter.inprogress}
            onChange={(e) =>
              setFilter((filter: Filter) => ({
                ...filter,
                ...{ inprogress: filter.inprogress ? false : true },
              }))
            }
          />
          <label className='font-semibold'>In Progress</label>
        </div>
        <div>
          <input
            className='appearance-none rounded-md h-4 w-4 border border-green-600 bg-white checked:bg-green-600 checked:border-green-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer'
            type='checkbox'
            value='done'
            name='status'
            checked={filter.done}
            onChange={(e) =>
              setFilter((filter: Filter) => ({
                ...filter,
                ...{ done: filter.done ? false : true },
              }))
            }
          />
          <label className='font-semibold'>Done</label>
        </div>
      </div>
      {/* Ideas Space */}
      <div className='flex justify-evenly flex-wrap w-full'>
        {/* Create New Idea */}
        <Link
          href={'/ideas/create'}
          className='bg-cyan-600 w-[160px] h-[150px] flex-col my-4 p-4 rounded-3xl drop-shadow-lg text-white font-semibold hover:bg-cyan-500 hover:-translate-y-5 hover:-translate-x-5 transition  cursor-pointer hover:shadow-lg hover:shadow-black/50'
        >
          <p className='text-lg block text-center'>Add New</p>
          <p className='text-8xl -mt-3 text-center font-light'>{'+'}</p>
        </Link>
        {/* Map All Ideas */}
        {ideas.map((idea: any) => (
          <Idea
            idea={idea}
            filter={filter}
          ></Idea>
        ))}
      </div>
    </div>
  );
};

export default AllIdeas;

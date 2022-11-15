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
import { useContext, useState } from 'react';
import { EventEmitter } from 'stream';
import AllIdeas from '../../components/AllIdeas';

// User Interface
// to add an array of users we use User[]

function PostList() {
  const ref = firestore
    .collection('users')
    .doc(auth.currentUser.uid)
    .collection('ideas');

  const query: any = ref.orderBy('createdAt');

  const [querySnapshot] = useCollection(query);
  const ideas = querySnapshot?.docs.map((doc) => doc.data());

  return ideas?.reverse();
}
const AllIdeasPage: React.FC = () => {
  const { user } = useContext(UserContext);
  const ideas = user ? PostList() : null;

  return (
    <AuthCheck>
      {!ideas ? (
        <div className='my-auto flex flex-col justify-center items-center  min-h-screen -mt-20 '>
          <LoadingWheel show={true} />
        </div>
      ) : (
        <main>
          <Head>
            <title>All Ideas</title>
          </Head>

          <AllIdeas
            ideas={ideas}
            user={user}
          />
        </main>
      )}
    </AuthCheck>
  );
};

export default AllIdeasPage;

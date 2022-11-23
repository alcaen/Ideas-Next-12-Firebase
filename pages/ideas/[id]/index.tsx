import { useRouter } from 'next/router';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import AuthCheck from '../../../components/AuthCheck';
import LoadingWheel from '../../../components/LoadingWheel';
import { auth, firestore } from '../../../lib/firebase';
import CustomForm from '../../../components/CustomForm';
import Head from 'next/head';

function GetCurrentIdea() {
  const router = useRouter();
  const { id } = router.query;
  const slug: any = id;
  const ref = firestore
    .collection('users')
    .doc(auth.currentUser.uid)
    .collection('ideas')
    .doc(slug);

  const query: any = ref;

  const [document] = useDocumentData(query);
  const idea: any = document;
  return idea ? (
    <div>
      <CustomForm currentIdea={idea} />
    </div>
  ) : (
    <div className='my-auto flex flex-col justify-center items-center  min-h-screen -mt-20 '>
      <LoadingWheel show={true} />
    </div>
  );
}

const SpecificId: React.FC = () => {
  return (
    <AuthCheck>
      <Head>
        <title>Edit Idea</title>
      </Head>
      <GetCurrentIdea />
    </AuthCheck>
  );
};

export default SpecificId;

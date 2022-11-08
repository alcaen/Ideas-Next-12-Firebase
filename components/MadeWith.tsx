import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Tooltip from './Tooltip';

export type Props = {
  tools: string[];
};
// If it's used in next js you have to add the image links to next config file.
const importedTools = {
  typescript: {
    name: 'Typescript',
    imgLink:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/2048px-Typescript_logo_2020.svg.png',
    link: 'https://www.typescriptlang.org/',
  },
  next: {
    name: 'Next',
    imgLink:
      'https://seeklogo.com/images/N/next-js-logo-8FCFF51DD2-seeklogo.com.png',
    link: 'https://nextjs.org/',
  },
  tailwind: {
    name: 'Tailwind',
    imgLink:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Tailwind_CSS_Logo.svg/2048px-Tailwind_CSS_Logo.svg.png',
    link: 'https://tailwindcss.com/',
  },
  firebase: {
    name: 'Firebase',
    imgLink:
      'https://res.cloudinary.com/startup-grind/image/upload/c_fill,dpr_2.0,f_auto,g_center,h_1080,q_100,w_1080/v1/gcs/platform-data-goog/events/firebase_xwsV0rV.png',
    link: 'https://firebase.google.com/',
  },
  react: {
    name: 'React',
    imgLink:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png',
    link: 'https://reactjs.org/',
  },
  javascript: {
    name: 'Javascript',
    imgLink:
      'https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png',
    link: 'https://www.javascript.com/',
  },
  chakra: {
    name: 'Chakra',
    imgLink: 'https://avatars.githubusercontent.com/u/54212428?s=280&v=4',
    link: 'https://chakra-ui.com/',
  },
  vite: {
    name: 'Vite',
    imgLink: 'https://vitejs.dev/logo-with-shadow.png',
    link: 'https://vitejs.dev/',
  },
  vercel: {
    name: 'Vercel',
    imgLink: 'https://supereasy.club/wp-content/uploads/2022/04/orig.png',
    link: 'https://vercel.com/',
  },
};
const MadeWith: React.FC<Props> = (props) => {
  return (
    <div className='flex justify-evenly max-w-lg m-auto flex-wrap'>
      {props.tools.map((tool) => {
        const currentTool = importedTools[tool as keyof typeof importedTools];
        return (
          <Tooltip text={currentTool.name}>
            <div
              key={currentTool.name}
              className=' mb-2 mx-4'
            >
              {/* <div>{currentTool.name}</div> */}
              <Link
                href={currentTool.link}
                target='_blank'
              >
                <Image
                  className='hover:contrast-150 hover:animate-bounce'
                  src={currentTool.imgLink}
                  alt={currentTool.name}
                  width={50}
                  height={50}
                ></Image>
              </Link>
            </div>
          </Tooltip>
        );
      })}
    </div>
  );
};

export default MadeWith;

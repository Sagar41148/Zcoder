import ProblemsTable from '@/components/ProblemsTable/ProblemsTable';
import Topbar from '@/components/Topbar/Topbar';
import React, { useState } from 'react';

const Index: React.FC = () => {
  const [inputs, setInputs] = useState({
    id: "",
    title: "",
    difficulty: "",
    category: "",
    videoId: "",
    link: "",
    order: 0,
    likes: 0,
    dislikes: 0,
  });

  return (
    <div>
      <Topbar />
      <div className='relative overflow-x-auto mx-auto px-6 pb-10 mt-20'>
        <table className='text-sm text-left text-gray-500 dark:text-gray-400 sm:w-7/12 w-full max-w-[1200px] mx-auto'>
          <thead className='text-xs text-gray-700 uppercase dark:text-gray-400 border-b'>
            <tr>
              <th scope='col' className='px-1 py-3 w-0 font-medium'>Status</th>
              <th scope='col' className='px-6 py-3 w-0 font-medium'>Title</th>
              <th scope='col' className='px-6 py-3 w-0 font-medium'>Difficulty</th>
              <th scope='col' className='px-6 py-3 w-0 font-medium'>Category</th>
              <th scope='col' className='px-6 py-3 w-0 font-medium'>Solution</th>
            </tr>
          </thead>
          <ProblemsTable />
        </table>
      </div>
    </div>
  );
};

export default Index;

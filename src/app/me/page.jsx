import Link from 'next/link';
import React from 'react';
const Page = () => {
    return (
        <div className='mx-auto p-40 border text-center'>
            <h1 className='text-xl'>Name : Ann Thomas</h1>
            <h1 className='text-xl'> Link to GitHub repository to React.js project Link: <Link href="https://localhost:12/34<">https://localhost:12/34</Link> </h1>

            <h1 className='text-xl'>Link to GitHub repository to Node.js project Link: <Link href="https://localhost:12/34<">https://localhost:12/34</Link> </h1>

        </div>
    );
}

export default Page;

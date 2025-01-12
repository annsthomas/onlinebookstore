'use client'
import React from 'react';
import Details from '../../../app/components/DetailId'
import { useParams } from 'next/navigation';

const detail = () => {
    const { id } = useParams();
    
    console.log('ud', id);

    return (
        <>
            <Details />
        </>
    );
}

export default detail;

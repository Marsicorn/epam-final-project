import React from 'react';
import { Link } from 'react-router';
import { HOME_PATH } from '../paths';


export default function ErrorPage() {
    return (
        <div className='message'>
            <p className='error'>
                The page you were looking for doesn't exist.
                You can go to the <Link to={ HOME_PATH } className='link'>home page</Link>
            </p>
        </div>
    );
}

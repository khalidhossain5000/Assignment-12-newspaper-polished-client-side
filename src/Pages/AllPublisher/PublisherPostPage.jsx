import React from 'react';
import { useParams } from 'react-router';

const PublisherPostPage = () => {
    const { publisherId } = useParams();
    return (
        <div>
            <h2>Pub psot page</h2>
        </div>
    );
};

export default PublisherPostPage;
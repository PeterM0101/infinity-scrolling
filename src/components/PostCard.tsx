import React, {forwardRef} from 'react';

export type PostType = {
    "userId": number,
    "id": number,
    "title": string,
    "body": string
}

interface PostCartProps {
    data: PostType
}

const PostCard = forwardRef<HTMLInputElement, PostCartProps>(({data}, ref) => {
    const {title, body, id, userId} = data;
    return (
        <div className='bg-red-300 p-4 w-[400px] rounded-lg' ref={ref}>
            <h4 className='font-bold text-2xl border-b border-solid border-gray-500'>{title}: {id}</h4>
            <p>User Id: {userId}</p>
            <p>Description:</p>
            <p>{body}</p>
        </div>
    );
});


PostCard.displayName = "PostCard";
export default PostCard;
import React from 'react'


const CommentList = ({comments}) => {

  const rederedComments = comments.map(c => {
    let content;

    if(c.status === 'approved'){
      content  = c.content;
    }
    if(c.status === 'rejected'){
      content = 'this content has been rejected';
    }
    if(c.status === 'pending'){
      content = 'this content is pending for moderation';
    }
    return <li key={c.id}> {content}</li>
  })
  return (
    <ul>
        {rederedComments }
    </ul>
  )
}

export default CommentList
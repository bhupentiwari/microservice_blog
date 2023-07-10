import React from 'react'


const CommentList = ({comments}) => {

  const rederedComments = comments.map(c => {
    return <li key={c.id}> {c.content}</li>
  })
  return (
    <ul>
        {rederedComments }
    </ul>
  )
}

export default CommentList
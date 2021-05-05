import React, { useState } from 'react';
import shortid from 'shortid';
import CommentLists from './comment_list';

function CommentList() {
  const [comment, setComment] = useState('');



  const [data, setData] = useState([
    {
      id: 1,
      content: "댓글1",
      comments: [
        {
          id: 2,
          content: "댓글2",
        },
        {
          id: 3,
          content: "댓글3",
        },
      ],
    },
    {
      id: 4,
      content: "댓글4",
      comments: [],
    },
    {
      id: 5,
      content: "댓글5",
      comments: [
        {
          id: 6,
          content: "댓글6",
        },
      ],
    },
    {
      id: 7,
      content: "댓글7",
      comments: [
        {
          id: 8,
          content: "댓글8",
        },
      ],
    },
  ]
  )

  // 온체인지
  const commentHandleChange = (e) => {
    setComment(e.target.value)
  }

  // 핸들써브밋
  const commentHandleSubmit = (e) => {
    e.preventDefault();

    const newContent = [...data]

    const addContents = {
      id: shortid.generate(),
      content: comment,
      comments: []
    }

    newContent.unshift(addContents)
    setData(newContent)
    setComment('')
  }

  // 리스트 삭제 온클릭
  const deleteList = (id) => {
    // console.log(id)

    const newList = [...data];
    console.log(newList)
    const findList = newList.findIndex((list) => list.id === id)
    newList.splice(findList, 1)
    setData(newList)
    }

  return (
    <>
      <h1>jieun's comment</h1>
      <form onSubmit={commentHandleSubmit}>
        <textarea onChange={commentHandleChange} value={comment} name="comment" />
        <button type="submit">저장</button>
      </form>
      <ul style={{outline: '1px solid red'}}>
        {data.map((list) => {
          console.log(list);

          return (
            <CommentLists key={list.id} data={data} setData={setData} list={list} deleteList={deleteList}  />
          )
      })}
      </ul>
    </>
  )
}

export default CommentList
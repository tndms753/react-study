import React, {useState} from 'react';
import shortid from 'shortid';

function CommentList({data, setData, list, deleteList}) {
  console.log(list)

  // 댓글 수정
  const [modifyContent, setModifyContent] = useState('')

  // 대댓글
  const [recommentContent, setRecommentContent] = useState('')

  // 대댓글 수정
  const [recommentChange, setRecommentChange] = useState('')
  
  // 수정 댓글 창 오픈
  const [commentOpen, setCommentOpen] = useState(false)

    // 대댓글 창 오픈
  const [recommentOpen, setRecommentOpen] = useState(false);

  // 대댓글 수정 창 오픈
  const [recommentModify, setRecommentModify] = useState(false);

     // 댓글달기 온클릭
    const recomment = (id) => {
      // const newRecomment = [...data]
      // const findObject = newRecomment.findIndex((list) => list.id === id)
      // console.log(findObject)
      setRecommentOpen(!recommentOpen)
    }

    // 댓글 수정 온클릭
    const modifyonClick = (id, content) => {
      console.log('수정');
      // const newComment = [...data]
      // const findComment = newComment.findIndex((list) => list.id === id)
      setCommentOpen(id)
      setModifyContent(content)
    }

      // 댓글 수정창 핸들 체인지
    const modifyonChange = (e) => {
      setModifyContent(e.target.value)
    }

    // 댓글 취소 온클릭
    const cancleonClick = (id) => {
      console.log('취소 온클릭')
      setCommentOpen(false)
    }

      // 댓글 저장 온클릭
    const saveonClick = (id) => {
      console.log('댓글 저장')

      const newArray = [...data]

      const newIndex = newArray.findIndex((list) => list.id === id)
      
      const updateContent = {
        ...newArray[newIndex],
        content: modifyContent
      }
      newArray.splice(newIndex, 1, updateContent)
      setData(newArray)
      setCommentOpen(false)
    }

    // 대댓글 핸들 써브밋
    const recommentHandleSubmit = (e, id) => {
      e.preventDefault()

      const newRecomment = [...data]

      const findRecomment = newRecomment.findIndex((recomment) => recomment.id === id)

      const addRecomment = {
        id: shortid.generate(),
        content: recommentContent
      }
      newRecomment[findRecomment].comments.unshift(addRecomment)
      setData(newRecomment)
      setRecommentOpen(false)
    }

    // 대댓글 핸들 체인지
    const recommentHandleChange = (e) => {
      setRecommentContent(e.target.value)
    }

    // 대댓글 삭제 온클릭
    const deleteonClick = (commentId, reCommentId) => {
      const newRecomment = [...data]
      const findComment = newRecomment.findIndex((comment) => comment.id === commentId)
      const findRecomment = newRecomment[findComment].comments.findIndex((commet) => {
        return (
          commet.id === reCommentId
        )
      })

      newRecomment[findComment].comments.splice(findRecomment, 1)
      setData(newRecomment)

      // console.log(newRecomment[findComment].comments)

      // const childIndex = newRecomment[찾은 부모 index].comments.findIndex(여긴 자식찾는 조건)
      // newRecomment[찾은 부모 index].comments.splice(childIndex, 1)
      // console.log(findComment)
      // newRecomment.splice(findComment, 1)
      // setData(newRecomment)
    }

    // 대댓글 수정 온클릭
    const recommentModifyonClick = (reCommentId, reCommentValue) => {
      console.log(reCommentValue)

      setRecommentModify(reCommentId)
      setRecommentChange(reCommentValue)
    }


    // 대댓글 수정 핸들 체인지
    const recommentModifyHandleChange = (e) => {
      setRecommentChange(e.target.value)
    }

    // 대댓글 저장 온클릭
    const recommentSaveonClick = (commentId, reCommentId) => {
      // 부모
      const newComment = [...data]
      const findComment = newComment.findIndex((comment) => comment.id === commentId)
      console.log(findComment)

      // 자식
      const findRecomment = newComment[findComment].comments.findIndex((recomment) => recomment.id === reCommentId)
      console.log(newComment[findComment])
      const updateRecomment = {
        id: reCommentId,
        content: recommentChange
      }

      newComment[findComment].comments.splice(findRecomment, 1, updateRecomment)
      setData(newComment)
      setRecommentModify(false)
    }

    // 대댓글 수정 취소
    const modifyCancel = () => {
      setRecommentModify(false)
    }

  return (
    <>
      <React.Fragment>
        {/* 댓글 */}
        {commentOpen ? (
          <>
            <textarea value={modifyContent} name="text" onChange={modifyonChange} />
            <button type="button" onClick={() => recomment(list.id)}>댓글달기</button>
            <button type="button" onClick={cancleonClick}>취소</button>
            <button type="button" onClick={() => saveonClick(list.id)}>저장</button>
          </>
        ) : (
          <div style={{display: 'block'}}>
            <li style={{listStyle: 'none', display: 'inline-block'}}>{list.content}</li>
            <button type="button" onClick={() => recomment(list.id)}>댓글달기</button>
            <button type="button" onClick={() => deleteList(list.id)}>삭제</button>
            <button type="button" onClick={() => modifyonClick(list.id, list.content)}>수정</button>
          </div>
        )}

        {recommentOpen ? (
          <>
          <form onSubmit ={(e) => recommentHandleSubmit(e, list.id)}>
            <textarea value={recommentContent} name="recommentContent" onChange={recommentHandleChange} />
            <button type="submit">저장</button>
          </form>
          </>
        ) : null}
        
         {/* 대댓글 */}
        {list.comments.map ((recommentList) => (
          <>
            {recommentModify === recommentList.id ? (
              <>
                <textarea value={recommentChange} name="recommentChange" onChange={recommentModifyHandleChange} />
                <button type="button" onClick={() => recommentSaveonClick(list.id, recommentList.id)}>저장</button>
                <button type="button" onClick={modifyCancel}>취소</button>
              </>
            ) : (
            <>
              <li style={{listStyle: 'none', paddingLeft: '30px', display: 'inline-block', marginBottom: '30px'}}>{recommentList.content}</li>
              <button type="button" onClick={() => recommentModifyonClick(recommentList.id, recommentList.content)}>수정</button>
              <button type="button" onClick={() => deleteonClick(list.id, recommentList.id)}>삭제</button>
            </>
            )}
            </>
        ))}
      </React.Fragment>
    </>
  )
}

export default CommentList
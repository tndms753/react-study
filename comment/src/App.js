import React, {useState} from 'react';
import Comment from './comment'
import Shortid from 'shortid'
import './App.css';

function App() {
  // 투두리스트 입력
  const [text, setText] = useState('')
  const [show, setShow] = useState([])
  console.log(show)

  // 수정
  const [modify, setModify] = useState('')

  // 수정 인풋창 오픈
  const [open, setOpen] = useState(false);
  
  // 리스트 작성 온체인지
  const contentonChange = (e) => {
    setText(e.target.value);
  }

  // 수정 온체인지
  const modifyonChange = (e) => {
    setModify(e.target.value)
  }

  // 투두리스트 핸들 써브밋
  const contentHandleSubmit = (e) => {
    e.preventDefault();

    const newContents = [...show]

    const contentObject = {
      id: Shortid.generate(),
      text
    }
    newContents.unshift(contentObject)
    setShow(newContents)
    setText('')
    // const newContentObject = [...show]

    // const contentObject = {
    //   id: Shortid.generate(),
    //   text
    // }
    // newContentObject.unshift(contentObject)
    // console.log(newContentObject);
    // setShow(newContentObject)
  }

  // 수정 온클릭
   const modifyonClick = (id, text) => {
    setOpen(id)
    setModify(text)
   }

   // 저장 온클릭
   const saveonClick = (id) => {
     const newArray = [...show]

     const newIndex = newArray.findIndex((list) => list.id === id)

     const updateText = {
      ...newArray[newIndex],
      text: modify
    }

     newArray.splice(newIndex, 1, updateText)
     setShow(newArray)
     setOpen(false)
   }

   // 취소 온클릭
   const cancelonClick = () => {
     setOpen(false)
   }

   // 삭제 온클릭
   const deleteList = (id) => {
    const newArray = [...show]
    const updataList = newArray.findIndex((todo) => todo.id === id)
    newArray.splice(updataList, 1)
    setShow(newArray)
   }

  return (
    <div className="App">
      <h1>Jieun's TodoList </h1>
      <div>
        <form onSubmit={contentHandleSubmit}>
          <textarea onChange={contentonChange} value={text} name="text" />
          <button type="submit">저장</button>
        </form>
      </div>
      <ul style={{marginBottom: '100px'}}>
        {/* {show ? <li style={{listStyle: 'none'}}>{show}</li> : null} */}
        {show.map((list) => (
            <li key={list.id} style={{listStyle: 'none'}}>
              {/* {open === list.id ?  : <span>{list.text}</span>}
              {open === list.id ? <button type="button" onClick={() => saveonClick(list.id)}>저장</button> : <button type="button" onClick={() => modifyonClick(list.id, list.text)}>수정</button>}
              {open === list.id ? <button type="button">취소</button> : <button type="button">삭제</button>} */}

              {open === list.id ? (
                <>
                  <textarea onChange={modifyonChange} value={modify} name="modify">{list.text}</textarea>
                  <button type="button" onClick={() => saveonClick(list.id)}>저장</button>
                  <button type="button" onClick={() => cancelonClick(list.id)}>취소</button>
                </>
              ) : (
                <>
                  <span>{list.text}</span>
                  <button type="button" onClick={() => modifyonClick(list.id, list.text)}>수정</button>
                  <button type="button" onClick={() => deleteList(list.id)}>삭제</button>
                </>
              )
              }
            </li>
        ))}
      </ul>
      <Comment />
    </div>
  );
}

export default App;

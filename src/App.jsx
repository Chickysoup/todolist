import { useState } from 'react'
import './App.css'

function App() {
  const [newToDoText, setToDoText] = useState('')

  const AddToList = () => {
    if (newToDoText == ''){return;}
    setToDo([
      ...toDo,
      {
        id: Date.now(),
        text:newToDoText,
        completed: false
      }
    ])
    setToDoText('')
  }

  const toDoDelete = (id) => {
    setToDo(toDo.filter(td => td.id !== id))
  }

  const toDoToggle = (id) => {
    //console.log(toDo.id.text)
    const toDoItem = toDo.find(td => td.id === id)
    console.log(toDoItem.text)
    
    setToDo(
      toDo.map( td =>
        td.id === id ? {...td, completed: !td.completed}
        : td
      )
    )
  }
  
  //initial to do list. array of objects
  const [toDo, setToDo] = useState([
    {id: 0, text : "first", completed : false},
    {id: 1, text : "second", completed : false},
    {id: 2, text : "third", completed : false},
    {id: 3, text : "fourth", completed : false}
  ])

  return (
    <>
    <h1>To-do list</h1>
    <input
      type = "text"
      value = {newToDoText}
      onChange = {(e) => setToDoText(e.target.value)}
      placeholder= "lol"
      />
    <button onClick={AddToList}>add</button>

    <ul>
      {toDo.map(td => (
        <li
          className={td.completed ? "completed" : ''}
          key={td.id}
          ><input 
              type="checkbox"
              checked = {td.completed}
              onChange={ () => toDoToggle(td.id)}>
            </input>
              
              {td.text}

            <button
              onClick={() => toDoDelete(td.id)}>delete</button>  
              </li>
      ))}
    </ul>

    </>
  )
}

export default App

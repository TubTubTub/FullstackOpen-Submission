import React from 'react'
import Todo from './Todo'

const TodoList = ({ todos, deleteTodo, completeTodo }) => {
  const onClickDelete = (todo) => () => {
    deleteTodo(todo)
  }

  const onClickComplete = (todo) => () => {
    completeTodo(todo)
  }

  return (
    <>
      {todos.map(todo => <Todo key={todo.text} todo={todo} onClickDelete={onClickDelete} onClickComplete={onClickComplete} />).reduce((acc, cur) => [...acc, <hr />, cur], [])}
    </>
  )
}

export default TodoList
import { startTransition, useOptimistic } from 'react'

import { Todo } from '@prisma/client'
import style from './TodoItem.module.css'
import { IoCheckboxOutline, IoSquareOutline } from 'react-icons/io5'
import { toggleTodo } from '@/todos/actions/todo-actions'

interface Props {
  todo: Todo
  toggleTodo: (id: string, complete: boolean) => Promise<Todo | void>
}

export const TodoItem = ({ todo, toggleTodo }: Props) => {
  const [todoOptimistic, toggleTodoOptimistic] = useOptimistic(
    todo,
    (state, newCompleteValue: boolean) => ({
      ...state,
      complete: newCompleteValue,
    })
  )

  async function onToggleTodo() {
    try {
      startTransition(() => toggleTodoOptimistic(!todoOptimistic.complete))
      await toggleTodo(todoOptimistic.id, !todoOptimistic.complete)
    } catch (error) {
      startTransition(() => toggleTodoOptimistic(!todoOptimistic.complete))
    }
  }

  return (
    <div
      className={todoOptimistic.complete ? style.todoDone : style.todoPending}
    >
      <div className="flex flex-col sm:flex-row justify-start items-center gap-4">
        <div
          onClick={onToggleTodo}
          // * Sin useOptimistic de React
          // onClick={() =>
          //   toggleTodo(todoOptimistic.id, !todoOptimistic.complete)
          // }
          className={`flex p-2 rounded-md cursor-pointer hover:bg-opacity-60 ${
            todoOptimistic.complete ? 'bg-blue-100' : 'bg-red-100'
          }`}
        >
          {todoOptimistic.complete ? (
            <IoCheckboxOutline size={30} />
          ) : (
            <IoSquareOutline size={30} />
          )}
        </div>
        <div className="text-center sm:text-left">
          {todoOptimistic.description}
        </div>
      </div>
    </div>
  )
}

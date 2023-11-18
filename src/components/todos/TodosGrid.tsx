'use client'

import { Todo } from '@prisma/client'
import { TodoItem } from './TodoItem'

import { useRouter } from 'next/navigation'
//* Client request
import * as todosApi from '@/todos/helpers/todo'

//* Server request
import { toggleTodo } from '@/todos/actions/todo-actions'

interface Props {
  todos?: Todo[]
}
export const TodosGrid = ({ todos = [] }: Props) => {
  const router = useRouter()

  //* Client request
  // async function toggleTodo(id: string, complete: boolean) {
  //   await todosApi.updateTodo(id, complete)

  //   router.refresh()
  // }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} toggleTodo={toggleTodo} />
      ))}
    </div>
  )
}

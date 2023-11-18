'use client'

import { Todo } from '@prisma/client'
import { TodoItem } from './TodoItem'

import * as todosApi from '@/todos/helpers/todo'
import { useRouter } from 'next/navigation'

interface Props {
  todos?: Todo[]
}
export const TodosGrid = ({ todos = [] }: Props) => {
  const router = useRouter()

  async function toggleTodo(id: string, complete: boolean) {
    await todosApi.updateTodo(id, complete)

    router.refresh()
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} toggleTodo={toggleTodo} />
      ))}
    </div>
  )
}
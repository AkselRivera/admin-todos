'use client'

import { FormEvent, useState } from 'react'
import { IoTrashOutline } from 'react-icons/io5'
// * Client request
// import { useRouter } from 'next/navigation'
// import * as TodoApi from '@/todos/helpers/todo'
// * Server request
import { addTodo, deleteCompleted } from '@/todos/actions/todo-actions'

export const NewTodo = () => {
  const [description, setDescription] = useState('')
  // const router = useRouter()
  async function onSumbit(e: FormEvent) {
    e.preventDefault()

    if (description.length < 3) return
    await addTodo(description)
    setDescription('')
  }

  async function handleDelete() {
    await deleteCompleted()
    // await TodoApi.deleteTodos()
    // router.refresh()
  }

  return (
    <form className="flex w-full" onSubmit={onSumbit}>
      <input
        type="text"
        className="w-6/12 -ml-10 pl-3 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-sky-500 transition-all"
        placeholder="¿Qué necesita ser hecho?"
        onChange={(e) => setDescription(e.target.value)}
        value={description}
      />

      <button
        type="submit"
        className="flex items-center justify-center rounded ml-2 bg-sky-500 p-2 text-white hover:bg-sky-700 transition-all"
      >
        Crear
      </button>

      <span className="flex flex-1"></span>

      <button
        // * Recomendado para no enviar null o clases al server action
        onClick={() => handleDelete()}
        // onClick={handleDelete}
        type="button"
        className="flex gap-1 items-center justify-center text-sm rounded ml-2 bg-red-500 p-2 text-white hover:bg-red-700 transition-all"
      >
        <IoTrashOutline />
        Borrar completados
      </button>
    </form>
  )
}

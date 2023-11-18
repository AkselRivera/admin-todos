import { Todo } from '@prisma/client';


export const updateTodo = async (id:string, complete: boolean) : Promise<Todo> => {
    const body = { complete }
    const response = await fetch(`/api/todos/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
    const todo = await response.json()
    return todo
}

export const createTodo = async (description:string) : Promise<Todo> => {
    const body = { description }
    const response = await fetch(`/api/todos`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
    const todo = await response.json()
    return todo
}


export const deleteTodos = async () => {
    const response = await fetch(`/api/todos`, {
        method: 'DELETE',
    })
    const todo = await response.json()
    return todo
}
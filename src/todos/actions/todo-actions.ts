'use server'

import prisma from "@/app/lib/prisma"
import { Todo } from "@prisma/client"
import { revalidatePath } from "next/cache"


export async function toggleTodo(id:string, complete: boolean) :Promise<Todo>{
    const todo = await prisma.todo.findFirst({ where: { id } })

    if (!todo) {
        throw `Todo with id ${id} not found`
    }
    
    const updatedTodo = await prisma.todo.update({ where: { id }, data: { complete } })
    revalidatePath('/dashboard/server-todos')
    return updatedTodo
}

// :Promise<Todo>
export async function addTodo(description: string) {
    try {
        const todo = await prisma.todo.create({ data: { description } })
        revalidatePath('/dashboard/server-todos')
        return todo
        
    } catch (error) {
        return { "message": error }
    }
}


export async function deleteCompleted() {
    try {
        await prisma.todo.deleteMany({ where: { complete: true } })
        revalidatePath('/dashboard/server-todos')
    } catch (error) {
        return { "message": error }
    }
    
}
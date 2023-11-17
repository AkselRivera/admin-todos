import prisma from '@/app/lib/prisma'
import { Todo } from '@prisma/client'
import { NextResponse, NextRequest } from 'next/server'
import * as yup from 'yup';

interface Segments {
    params: {
        id: string
    }
}


async function getTodo( id:string) :Promise<Todo | null >{
    return await prisma.todo.findFirst({
        where: {
            id: id
        }
    })
}

export async function GET(request: Request, {params}: Segments ) { 

    const { id } = params

    const todo = await getTodo( id )

    if (!todo) return NextResponse.json({ error: 'Todo not found' }, { status: 404 })
    
    return NextResponse.json( todo )
}


const updateSchema = yup.object({
    description: yup.string().optional(),
    complete: yup.boolean().optional(),
})

export async function PUT(request: Request, {params}: Segments ) { 
    try {
        const { id } = params

        const todo = await getTodo( id )
    
        if (!todo) return NextResponse.json({ error: 'Todo not found' }, { status: 404 })
        
        const {complete, description} =  await updateSchema.validate(await request.json()) 
        
        const updatedTodo = await prisma.todo.update({ where: { id }, data: { description, complete} })
        
        return NextResponse.json( updatedTodo )
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 400 })
    }
}
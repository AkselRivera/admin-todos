import prisma from '@/app/lib/prisma'
import { NextResponse, NextRequest } from 'next/server'
import * as yup from 'yup'

export async function GET(request: Request) { 

    const { searchParams } = new URL(request.url)
    const limit = Number(searchParams.get('limit') ?? '50')
    const offset = Number(searchParams.get('offset') ?? '50')

    if (isNaN(limit)) {
        return NextResponse.json({ error: 'Invalid limit parameter' }, { status: 400 })
    }
    if (isNaN(offset)) {
        return NextResponse.json({ error: 'Invalid offset parameter' }, { status: 400 })
    }

    const todos = await prisma.todo.findMany({
        skip: offset,
        take: limit,
    })
    return NextResponse.json(todos)
}


const postSchema = yup.object({
    description: yup.string().required(),
    complete: yup.boolean().optional().default(false),
})

export async function POST(request: Request) { 
    try {
        const {complete, description} =  await postSchema.validate(await request.json()) 
        
        const todo = await prisma.todo.create({ data: { description, complete} })
        
        return NextResponse.json( todo )
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 400 })
    }
}
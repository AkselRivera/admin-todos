import prisma from '@/app/lib/prisma';
import { NextResponse, NextRequest } from 'next/server'

export async function GET(request: Request) { 

  await prisma.todo.deleteMany({})

  await prisma.todo.createMany({
      data: [
        { description: 'Aprender NextJS' },
        { description: 'Aprender Prisma' },
        { description: 'Aprender Tailwind', complete: true },
        { description: 'Aprender Go' },
      ]
  })

  return NextResponse.json({
    message: 'Seed executed'
  });
}
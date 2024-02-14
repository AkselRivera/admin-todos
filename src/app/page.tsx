import { redirect } from 'next/navigation'
export default function Home() {
  redirect('/dashboard')
  return (
    <>
      <span className="text-3xl"> Algo salio mal...</span>
    </>
  )
}

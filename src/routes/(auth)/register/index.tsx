import { createFileRoute, Link } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/(auth)/register/')({
  component: RegisterComponent,
})

function RegisterComponent() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  return (
    <div className="max-w-md mx-auto">
      <h1 className='text-3xl font-bold mb-6'>Register</h1>
      <form className='space-y-4'>
        <input type="text" name="name" id="name" value={name} placeholder='Name' autoComplete='off' onChange={(e) => setName(e.target.value)}
          className='w-full border border-gray rounded-md p-2' />
        <input type="text" name="email" id="email" value={email} placeholder='Email' autoComplete='off' onChange={(e) => setEmail(e.target.value)}
          className='w-full border border-gray rounded-md p-2' />
        <input type="text" name="password" id="password" value={password} placeholder='Password' autoComplete='off' onChange={(e) => setPassword(e.target.value)}
          className='w-full border border-gray rounded-md p-2' />
        <button className='bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-md w-full disabled:opacity-50'>Register</button>
      </form>
      <p className='text-sm text-center mt-4'>
        Already have an account? <Link to='/login' className='text-blue-600 hover:underline font-medium'>Login</Link>
      </p>
    </div>
  )
}
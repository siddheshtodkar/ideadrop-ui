import { loginUser } from '@/api/auth'
import { useAuth } from '@/context/AuthContext'
import { useMutation } from '@tanstack/react-query'
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/(auth)/login/')({
  component: LoginComponent,
})

function LoginComponent() {
  const navigate = useNavigate()
  const { setAccessToken, setUser } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const { mutateAsync, isPending } = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      setAccessToken(data.accessToken)
      setUser(data.user)
      navigate({ to: '/ideas' })
    },
    onError: (err) => {
      setError(err.message)
    }
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    try {
      await mutateAsync({ email, password })
    } catch (error: any) {
      console.log(error.message);
    }
  }
  return (
    <div className="max-w-md mx-auto">
      <h1 className='text-3xl font-bold mb-6'>Login</h1>
      {error && (
        <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4">{error}</div>
      )}
      <form onSubmit={handleSubmit} className='space-y-4'>
        <input type="text" name="email" id="email" value={email} placeholder='Email' autoComplete='off' onChange={(e) => setEmail(e.target.value)}
          className='w-full border border-gray rounded-md p-2' />
        <input type="text" name="password" id="password" value={password} placeholder='Password' autoComplete='off' onChange={(e) => setPassword(e.target.value)}
          className='w-full border border-gray rounded-md p-2' />
        <button className='bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-md w-full disabled:opacity-50' disabled={isPending}>
          {isPending ? 'Logging in...' : 'Login'}
        </button>
      </form>
      <p className='text-sm text-center mt-4'>
        Don't have an account? <Link to='/login' className='text-blue-600 hover:underline font-medium'>Register</Link>
      </p>
    </div>
  )
}
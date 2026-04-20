import { AlertCircle, LoaderCircle, Lock, Mail, User2Icon } from 'lucide-react'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom'
import { login } from '../app/features/authSlice'
import api from '../configs/api'
import toast from 'react-hot-toast'

const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams()
    const { user } = useSelector((store) => store.auth)

    const urlState = searchParams.get('state') === 'register' ? 'register' : 'login'
    const [state, setState] = React.useState(urlState)
    const [error, setError] = React.useState('')
    const [isSubmitting, setIsSubmitting] = React.useState(false)
    const [formData, setFormData] = React.useState({
        name: '',
        email: '',
        password: ''
    })

    useEffect(() => {
        setState(urlState)
    }, [urlState])

    if (user) {
        return <Navigate to="/app" replace />
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setIsSubmitting(true)

        const endpoint = state === 'login' ? '/api/users/login' : '/api/users/register'
        const payload = state === 'login'
            ? { email: formData.email, password: formData.password }
            : formData

        try {
            const { data } = await api.post(endpoint, payload)

            if (!data?.token || !data?.user) {
                setError(data?.message || 'Authentication failed. Please try again.')
                return
            }

            localStorage.setItem('token', data.token)
            dispatch(login({ token: data.token, user: data.user }))
            navigate('/app', { replace: true })
            toast.success(data.message)
        } catch (submitError) {
            toast.error(submitError.response?.data?.message || 'Unable to continue right now. Please try again.')
            setError(submitError.response?.data?.message || 'Unable to continue right now. Please try again.')
        } finally {
            setIsSubmitting(false)
        }
    }

    const toggleState = () => {
        const nextState = state === 'login' ? 'register' : 'login'
        setState(nextState)
        setSearchParams({ state: nextState })
        setError('')
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    return (
        <div className='flex min-h-screen items-center justify-center bg-gray-50 px-4'>
            <form onSubmit={handleSubmit} className="w-full max-w-md rounded-2xl border border-gray-300/60 bg-white px-8 text-center shadow-sm">
                <h1 className="mt-10 text-3xl font-medium text-gray-900">{state === "login" ? "Login" : "Sign up"}</h1>
                <p className="mt-2 text-sm text-gray-500">Please {state} to continue</p>

                {error && (
                    <div className='mt-5 flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-left text-sm text-red-600'>
                        <AlertCircle size={18} className='mt-0.5 shrink-0' />
                        <span>{error}</span>
                    </div>
                )}

                {state !== "login" && (
                    <div className="mt-6 flex h-12 w-full items-center gap-2 overflow-hidden rounded-full border border-gray-300/80 bg-white pl-6">
                        <User2Icon size={16} color='#6B7280' />
                        <input type="text" name="name" placeholder="Name" className="border-none outline-none ring-0" value={formData.name} onChange={handleChange} required />
                    </div>
                )}
                <div className="mt-4 flex h-12 w-full items-center gap-2 overflow-hidden rounded-full border border-gray-300/80 bg-white pl-6">
                    <Mail size={13} color='#6B7280' />
                    <input type="email" name="email" placeholder="Email id" className="border-none outline-none ring-0" value={formData.email} onChange={handleChange} required />
                </div>
                <div className="mt-4 flex h-12 w-full items-center gap-2 overflow-hidden rounded-full border border-gray-300/80 bg-white pl-6">
                    <Lock size={13} color='#6B7280' />
                    <input type="password" name="password" placeholder="Password" className="border-none outline-none ring-0" value={formData.password} onChange={handleChange} required />
                </div>
                <div className="mt-4 text-left text-green-500">
                    <button className="text-sm" type="button">Forget password?</button>
                </div>
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="mt-2 flex h-11 w-full items-center justify-center gap-2 rounded-full bg-green-500 text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
                >
                    {isSubmitting && <LoaderCircle size={16} className='animate-spin' />}
                    {state === "login" ? "Login" : "Sign up"}
                </button>
                <p className="mb-11 mt-3 text-sm text-gray-500">
                    {state === "login" ? "Don't have an account?" : "Already have an account?"}{' '}
                    <button type="button" onClick={toggleState} className="text-green-500 hover:underline">
                        click here
                    </button>
                </p>
            </form>
        </div>
    )
}

export default Login

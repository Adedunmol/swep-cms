import { Link, useNavigate } from 'react-router-dom'
import landingBg from '../assets/landing-bg.png'
import oauLogo from '../assets/oau-logo.png'
import { FormEvent, useState } from 'react'
import { login } from '../services/auth'
import useAuthStore from '../stores/useAuthStore'
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [submitting, setSubmitting] = useState(false)

    const navigate = useNavigate()

    const { authenticate } = useAuthStore()

    const handleSubmit = async (e: FormEvent) => {
        try {
            e.preventDefault()
            setSubmitting(true)
            await login({ email, password }, authenticate)
            navigate('/dashboard')
        } catch (error: any) {
            toast.error(error?.message || error)
        } finally {
            setSubmitting(false)
        }
    }


    return (
        <div className='bg-cover min-h-screen w-full font-montserrat' style={{ backgroundImage: `url(${landingBg})` }}>
            <div className=' min-h-screen w-full bg-[rgba(255,255,255,0.6)] py-12 px-6 '>
                <Link to='/' className='flex justify-center items-center space-x-6'>
                    <img src={oauLogo} className='w-40 h-40 object-contain ' />
                    <h1 className='text-[rgba(1,0,128,1)] text-[64px] font-montserrat font-semibold text-center leading-[78px]'>
                        OAU <br /> E-health Centre
                    </h1>
                </Link>

                <form className='w-1/2 mx-auto mt-10' onSubmit={handleSubmit}>

                    <h2 className='text-4xl text-[rgba(0,0,0,1)]  font-montserrat font-bold'>
                        Welcome!
                    </h2>
                    <p className='text-3xl mb-8'>
                        Already own an account? Login.
                    </p>

                    <div className='mb-5'>
                        <p className='text-3xl mb-1'>
                            Email
                        </p>
                        <input type="email" className='bg-[rgba(139,136,136,1)] rounded-[10px] py-4 px-5 w-full text-white' value={email} onChange={(e) => {
                            setEmail(e.target.value)
                        }} />
                    </div>

                    <div>
                        <p className='text-3xl mb-1'>
                            Password
                        </p>
                        <input type="password" className='bg-[rgba(139,136,136,1)] rounded-[10px] py-4 px-5 w-full text-white' value={password} onChange={(e) => {
                            setPassword(e.target.value)
                        }} />
                    </div>

                    <p className='text-[rgba(1,0,128,1)] text-right font-semibold text-3xl mt-2'>
                        Forgot Password?
                    </p>

                    <button className='bg-[rgba(1,0,128,1)] px-40 py-3 text-white font-montserrat font-bold rounded-[10px] text-2xl w-full my-5 flex justify-center' onClick={handleSubmit}>
                        {
                            submitting ?
                                <Spinner size='small' /> :
                                'Login'
                        }
                    </button>

                    <p className='text-2xl text-center mt-2.5'>
                        Don't have an account?
                    </p>
                    <Link to='/sign-up' className='text-[rgba(1,0,128,1)] text-center block font-semibold text-3xl mt-1'>
                        Sign Up
                    </Link>

                </form>


            </div>
        </div>
    )
}

export default Login
import { FormEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import landingBg from '../assets/landing-bg.png'
import oauLogo from '../assets/oau-logo.png'
import Spinner from '../components/Spinner'
import { signup } from '../services/auth'

const Signup = () => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')

    const [asStaff, setAsStaff] = useState(false)

    const [submitting, setSubmitting] = useState(false)

    const navigate = useNavigate()

    const handleSubmit = async (e: FormEvent) => {
        try {
            e.preventDefault()
            setSubmitting(true)
            await signup({ firstName, lastName, email, password, passwordConfirmation, role: asStaff ? 'staff' : 'student' })
            toast.success('Sign up successful!')
            navigate('/login')
        } catch (error: any) {
            console.log(error)
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
                        Create New Account
                    </h2>
                    <p className='text-3xl mb-8'>
                        Please register to create a new account.
                    </p>

                    <div className='mb-5'>
                        <p className='text-3xl mb-1'>
                            Email
                        </p>
                        <input type="email" className='bg-[rgba(139,136,136,1)] rounded-[10px] py-4 px-5 w-full text-white' value={email} onChange={(e) => {
                            setEmail(e.target.value)
                        }} />
                    </div>

                    <div className='mb-5'>
                        <p className='text-3xl mb-1'>
                            Surname
                        </p>
                        <input type="text" className='bg-[rgba(139,136,136,1)] rounded-[10px] py-4 px-5 w-full text-white' value={lastName} onChange={(e) => {
                            setLastName(e.target.value)
                        }} />
                    </div>

                    <div className='mb-5'>
                        <p className='text-3xl mb-1'>
                            Other Name
                        </p>
                        <input type="text" className='bg-[rgba(139,136,136,1)] rounded-[10px] py-4 px-5 w-full text-white' value={firstName} onChange={(e) => {
                            setFirstName(e.target.value)
                        }} />
                    </div>

                    <div className='mb-5'>
                        <p className='text-3xl mb-1'>
                            Password
                        </p>
                        <input type="password" className='bg-[rgba(139,136,136,1)] rounded-[10px] py-4 px-5 w-full text-white' value={password} onChange={(e) => {
                            setPassword(e.target.value)
                        }} />
                    </div>

                    <div className='mb-5'>
                        <p className='text-3xl mb-1'>
                            Confirm Password
                        </p>
                        <input type="password" className='bg-[rgba(139,136,136,1)] rounded-[10px] py-4 px-5 w-full text-white' value={passwordConfirmation} onChange={(e) => {
                            setPasswordConfirmation((e.target.value))
                        }} />
                    </div>

                    <div className='flex items-center space-x-1'>
                        <input type="checkbox" name="" id="" className='w-5 h-5' checked={asStaff} onChange={(e) => {
                            setAsStaff(e.target.checked)
                        }} />
                        <p className='text-3xl mb-1'>
                            Sign up as Staff
                        </p>
                    </div>

                    <button className='bg-[rgba(1,0,128,1)] px-40 py-3 text-white font-montserrat font-bold rounded-[10px] text-2xl w-full my-5 flex justify-center' onClick={handleSubmit}>
                        {
                            submitting ?
                                <Spinner size='small' /> :
                                'Sign Up'
                        }
                    </button>

                    <p className='text-2xl text-center mt-2.5'>
                        Have an account?
                    </p>
                    <Link to='/login' className='text-[rgba(1,0,128,1)] text-center block font-semibold text-3xl mt-1'>
                        Login
                    </Link>

                </form>


            </div>
        </div>
    )
}

export default Signup
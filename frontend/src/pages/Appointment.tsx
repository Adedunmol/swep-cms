import { FormEvent, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import landingBg from '../assets/landing-bg.png'
import oauLogo from '../assets/oau-logo.png'

const Appointment = () => {
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [reason, setReason] = useState('')
    const [date, setDate] = useState('')


    const handleSubmit = async (e: FormEvent) => {
        try {
            e.preventDefault()
            // setSubmitting(true)
        } catch (error: any) {
            toast.error(error?.message || error)
        } finally {
            // setSubmitting(false)
        }
    }


    return (
        <div className='bg-cover min-h-screen w-full font-montserrat' style={{ backgroundImage: `url(${landingBg})` }}>
            <div className=' min-h-screen w-full bg-[rgba(255,255,255,0.6)] py-12 px-6 '>
                <Link to='/dashboard' className='flex justify-center items-center space-x-6'>
                    <img src={oauLogo} className='w-40 h-40 object-contain ' />
                    <h1 className='text-[rgba(1,0,128,1)] text-[48px] font-montserrat font-semibold text-center leading-[78px]'>
                        OAU <br /> E-health Centre
                    </h1>
                </Link>

                <form className='w-1/2 mx-auto ' onSubmit={handleSubmit}>

                    <h2 className='text-[40px] text-black text-center font-montserrat font-bold my-5'>
                        Appointment
                    </h2>

                    <p className='text-3xl mb-1'>
                        Doctor
                    </p>
                    <select name="" id="" className='bg-[rgba(139,136,136,1)] rounded-[10px] py-4 px-5 w-full text-white mb-5 text-base'>
                        <option value="">Select Doctor</option>
                        <option value="">Dr. Lorem</option>
                        <option value="">Dr. Ipsum</option>
                    </select>

                    <div className='mb-5'>
                        <p className='text-3xl mb-1'>
                            Email
                        </p>
                        <input type="text" className='bg-[rgba(139,136,136,1)] rounded-[10px] py-4 px-5 w-full text-white' value={email} onChange={(e) => {
                            setEmail(e.target.value)
                        }} />
                    </div>

                    <div className='mb-5'>
                        <p className='text-3xl mb-1'>
                            Phone
                        </p>
                        <input type="number" className='bg-[rgba(139,136,136,1)] rounded-[10px] py-4 px-5 w-full text-white' value={phone} onChange={(e) => {
                            setPhone(e.target.value)
                        }} />
                    </div>

                    <div className='mb-5'>
                        <p className='text-3xl mb-1'>
                            Available Date
                        </p>
                        <input type="date" className='bg-[rgba(139,136,136,1)] rounded-[10px] py-4 px-5 w-full text-white' value={date} onChange={(e) => {
                            setDate(e.target.value)
                        }} />
                    </div>

                    <div className='mb-5'>
                        <p className='text-3xl mb-1'>
                            Reason for Booking an Appointment?
                        </p>
                        <textarea className='bg-[rgba(139,136,136,1)] rounded-[10px] py-4 px-5 w-full text-white' value={reason} onChange={(e) => {
                            setReason(e.target.value)
                        }}> </textarea>
                    </div>

                    <div className='flex items-center space-x-1'>
                        <input type="checkbox" name="" id="" className='w-4 h-4' />
                        <p className='text-base mb-1'>
                            Guide to use First Aid Kit
                        </p>
                    </div>
                    <div className='flex items-center space-x-1'>
                        <input type="checkbox" name="" id="" className='w-4 h-4' />
                        <p className='text-base mb-1'>
                            Online Medicine Prescription
                        </p>
                    </div>
                    <div className='flex items-center space-x-1'>
                        <input type="checkbox" name="" id="" className='w-4 h-4' />
                        <p className='text-base mb-1'>
                            Demand For An Ambulance
                        </p>
                    </div>

                    <button className='bg-[rgba(1,0,128,1)] px-40 py-3 text-white font-montserrat font-bold rounded-[10px] text-2xl w-full my-6' onClick={handleSubmit}>
                        Book Appointment
                    </button>

                </form>


            </div>
        </div>
    )
}

export default Appointment
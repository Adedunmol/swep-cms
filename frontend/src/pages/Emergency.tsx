import { FormEvent, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import landingBg from '../assets/landing-bg.png'
import oauLogo from '../assets/oau-logo.png'

const Emergency = () => {
    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [problem, setProblem] = useState('')

    // const [submitting, setSubmitting] = useState(false)

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

                    <h2 className='text-[40px] text-red-900 text-center font-montserrat font-bold my-5'>
                        Emergency
                    </h2>

                    <div className='mb-5'>
                        <p className='text-3xl mb-1'>
                            Name
                        </p>
                        <input type="text" className='bg-[rgba(139,136,136,1)] rounded-[10px] py-4 px-5 w-full text-white' value={name} onChange={(e) => {
                            setName(e.target.value)
                        }} />
                    </div>

                    <div className='mb-5'>
                        <p className='text-3xl mb-1'>
                            Address
                        </p>
                        <textarea className='bg-[rgba(139,136,136,1)] rounded-[10px] py-4 px-5 w-full text-white' value={address} onChange={(e) => {
                            setAddress(e.target.value)
                        }}> </textarea>
                    </div>

                    <div className='mb-5'>
                        <p className='text-3xl mb-1'>
                            Problem
                        </p>
                        <textarea className='bg-[rgba(139,136,136,1)] rounded-[10px] py-4 px-5 w-full text-white' value={problem} onChange={(e) => {
                            setProblem(e.target.value)
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
                        Submit
                    </button>

                </form>


            </div>
        </div>
    )
}

export default Emergency
import { FormEvent } from 'react'
import { IoMdNotificationsOutline } from 'react-icons/io'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import landingBg from '../assets/landing-bg.png'
import oauLogo from '../assets/oau-logo.png'

const Reception = () => {
    // const [name, setName] = useState('')
    // const [address, setAddress] = useState('')
    // const [problem, setProblem] = useState('')

    // const [submitting, setSubmitting] = useState(false)

    // const { authenticate } = useAuthStore()

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

                <div className='w-[70%] mx-auto ' onSubmit={handleSubmit}>

                    <h2 className='text-[40px] text-white bg-[rgba(1,0,128,1)] p-3 text-center font-montserrat font-bold my-5 w-1/2 mx-auto'>
                        Reception
                    </h2>

                    <div className='flex flex-wrap justify-between gap-5 mt-20'>
                        {
                            [
                                'Medicine',
                                'Appointment',
                                'Patient Documentation',
                                'Emergency'
                            ].map((tab) => (
                                <div className='w-[45%] mt-5'>
                                    <p className=' font-montserrat font-bold text-4xl mb-1'>
                                        {tab}
                                    </p>
                                    <div className={` w-full rounded-[25px] p-6 text-white flex justify-end `} style={{ backgroundColor: `${tab == 'Medicine' ? 'rgb(1,0,128)' : tab == 'Appointment' ? 'rgba(254, 204, 59, 1)' : tab == 'Patient Documentation' ? '#fecc3b' : 'rgba(255,0,0,1)'}` }}>
                                        <IoMdNotificationsOutline size={30} />
                                    </div>
                                </div>
                            ))
                        }
                    </div>

                </div>


            </div>
        </div >
    )
}

export default Reception
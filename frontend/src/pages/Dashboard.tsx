import { FaRegUser } from 'react-icons/fa6'
import { FiPhoneCall } from 'react-icons/fi'
import { LuCalendarClock } from 'react-icons/lu'
import { Link } from 'react-router-dom'
import landingBg from '../assets/landing-bg.png'
import oauLogo from '../assets/oau-logo.png'

const Dashboard = () => {
    return (
        <div className='bg-cover min-h-screen w-full font-montserrat' style={{ backgroundImage: `url(${landingBg})` }}>
            <div className=' min-h-screen w-full bg-[rgba(255,255,255,0.6)] py-12 px-6 '>
                <Link to='/dashboard' className='flex justify-center items-center space-x-6'>
                    <img src={oauLogo} className='w-40 h-40 object-contain ' />
                    <h1 className='text-[rgba(1,0,128,1)] text-[64px] font-montserrat font-semibold text-center leading-[78px]'>
                        OAU <br /> E-health Centre
                    </h1>
                </Link>

                <div className='flex flex-wrap gap-10 justify-center mt-10'>
                    {
                        [
                            {
                                title: 'Personal Info',
                                icon: <FaRegUser size={50} />
                            },
                            {
                                title: 'Book an appointment',
                                icon: <LuCalendarClock size={50} />
                            },
                            {
                                title: 'Contact us',
                                icon: <LuCalendarClock size={50} />
                            },
                            {
                                title: 'Lab report',
                                icon: <FiPhoneCall size={50} />
                            }
                        ].map(({ title, icon }, index: number) => (
                            <Link to={`/${title.toLowerCase().split(' ').join('-')}`} className={`${index % 2 == 0 ? 'bg-[#c8d1e2]' : 'bg-[#315d9f]'} flex flex-col p-6 rounded-[8px] w-full md:w-1/2 lg:w-1/4 justify-center items-center gap-2 `}>
                                {icon}
                                <p className='font-montserrat text-3xl font-bold'>
                                    {title}
                                </p>
                            </Link>
                        ))
                    }

                </div>


            </div>
        </div>
    )
}

export default Dashboard
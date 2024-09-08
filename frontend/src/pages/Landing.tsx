import landingBg from '../assets/landing-bg.png'
import oauLogo from '../assets/oau-logo.png'
import firstAid from '../assets/first-aid.png'
import { Link } from 'react-router-dom'

const Landing = () => {
    return (
        <div className='bg-cover min-h-screen w-full' style={{ backgroundImage: `url(${landingBg})` }}>
            <div className=' min-h-screen w-full bg-[rgba(255,255,255,0.6)] py-12 px-6 '>
                <Link to='/' className='flex justify-center items-center space-x-6'>
                    <img src={oauLogo} className='w-40 h-40 object-contain ' />
                    <h1 className='text-[rgba(1,0,128,1)] text-[64px] font-montserrat font-semibold text-center leading-[78px]'>
                        OAU <br /> E-health Centre
                    </h1>
                </Link>
                <h2 className='text-5xl text-[rgba(0,0,0,1)] text-center my-10 font-montserrat font-semibold'>
                    Welcome To OAU E-health!
                </h2>
                <div className='flex items-center justify-center space-x-10'>
                    <Link to='/login' className='bg-[rgba(1,0,128,1)] px-40 py-2.5 text-white font-montserrat font-bold rounded-[10px] text-2xl'>
                        Login
                    </Link>
                    <Link to='/sign-up' className='bg-[rgba(1,0,128,1)] px-40 py-2.5 text-white font-montserrat font-bold rounded-[10px] text-2xl'>
                        Sign Up
                    </Link>
                </div>
                <div className='flex flex-start space-x-3 my-6'>
                    <h3 className='flex-1 text-right text-[rgba(255,0,0,1)] text-5xl font-bold font-montserrat '>
                        Guides To Use First Aid and Kit?
                    </h3>
                    <img src={firstAid} alt="" className='w-[206px] h-[130px] object-contain' />
                </div>
                <ol className='font-montserrat text-3xl leading-[40px] font-bold list-decimal px-6' >
                    <li>
                        Assess the Situation:
                        <ul className='list-disc'>
                            <li>
                                Check for Safety: Ensure the area is safe for you and the injured person.
                            </li>
                            <li>
                                Evaluate the Injury: Determine the severity of the injury to decide on the appropriate treatment.
                            </li>
                        </ul>
                    </li>
                    <li>
                        Basic Supplies and Their Uses:
                        <ul className='list-disc'>
                            <li>
                                Adhesive Bandages: For small cuts, blisters, or abrasions. Choose the size based on the wound.
                            </li>
                            <li>
                                Sterile Gauze Pads: For covering and absorbing blood from larger wounds. Apply over the wound and secure with tape or a bandage.
                            </li>
                            <li>
                                Adhesive Tape: To secure gauze pads or bandages in place.
                            </li>
                            <li>
                                Antiseptic Wipes: For cleaning wounds before applying bandages. Use to disinfect the area around a cut or scrape.
                            </li>
                            <li>
                                Antibiotic Ointment: Apply to cleaned wounds to prevent infection.
                            </li>
                            <li>
                                Tweezers: For removing splinters or debris from wounds.
                            </li>
                            <li>
                                Scissors: For cutting tape, gauze, or clothing if needed.
                            </li>
                            <li>
                                Instant Cold Pack: For reducing swelling and numbing pain from sprains or bruises. Apply to the area for 15-20 minutes.
                            </li>
                            <li>
                                Elastic Bandage (e.g., Ace bandage): For wrapping sprains or strains. Provides compression and support.
                            </li>
                            <li>
                                CPR Face Shield/Mask: For protection during CPR. Follow CPR guidelines and use the mask to reduce the risk of disease transmission.
                            </li>
                            <li>
                                Burn Cream or Gel: To soothe and protect minor burns. Do not apply to severe burns; seek professional medical help.
                            </li>
                            <li>
                                First Aid Manual: Provides guidance on treating various injuries and emergencies.
                            </li>
                        </ul>
                    </li>
                    <li>
                        Treatment Steps:
                        <ul className='list-disc'>
                            <li>
                                Clean Wounds: Use antiseptic wipes or clean water to rinse the wound before applying any ointment or bandages.
                            </li>
                            <li>
                                Stop Bleeding: Apply pressure with a sterile gauze pad or clean cloth. If bleeding is severe and does not stop, seek medical help immediately.
                            </li>
                            <li>
                                Apply Dressings: Use gauze pads for larger wounds and adhesive bandages for smaller cuts or blisters.
                            </li>
                            <li>
                                Immobilize Injuries: For sprains or fractures, use an elastic bandage or splint to immobilize the affected area.
                            </li>
                            <li>
                                Cold Therapy: Apply an instant cold pack to reduce swelling and pain, but never apply ice directly to the skin.
                            </li>
                        </ul>
                    </li>
                    <li>
                        When to Seek Help:
                        <ul className='list-disc'>
                            <li>
                                Severe Bleeding: If the bleeding does not stop with direct pressure.
                            </li>
                            <li>
                                Unconsciousness: If the person is unconscious and not breathing normally.
                            </li>
                            <li>
                                Severe Burns: For burns larger than a few inches or those on the face, hands, or genitals.
                            </li>
                            <li>
                                Signs of Shock: Pale skin, rapid breathing, or confusion.
                            </li>
                        </ul>
                    </li>
                    <li>
                        Keep Your Kit Updated:
                        <ul className='list-disc'>
                            <li>
                                Check Expiry Dates: Regularly check and replace expired items.
                            </li>
                            <li>
                                Restock Supplies: Replenish used items to ensure your kit is always ready.
                            </li>
                        </ul>
                    </li>
                </ol>

            </div>
        </div>
    )
}

export default Landing
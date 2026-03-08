import '../global.css';

import { Link } from 'react-router-dom';
import { ROUTES } from '../constants/routes';

import Tooltip from '../components/Tooltip';
import Placeholder from '../assets/images/background/placeholder-lt.png';
import Footer from '../components/Footer';

import Caveman from '../assets/images/works/caveman/caveman.webp';

function Works() {
  return (
    <>
      <section id="works" className="w-full min-h-screen flex flex-col items-center bg-white pt-32 pb-[3.75rem] max-[935px]:pt-10 max-[935px]:pb-10">
        <div className="grid grid-cols-2 gap-[15px] justify-items-center mx-auto overflow-hidden px-[1.875rem] max-[935px]:grid-cols-1 max-[935px]:p-[0.625rem] max-[935px]:gap-[15px]">
        <div className="border-2 border-[#f6f6f6] rounded-[8px] overflow-hidden">
            <Link to={ROUTES.WORKS.LOGO}>
            <Tooltip content="View work">
            <div className="max-w-[810px] max-h-[540px] w-full aspect-[3/2] overflow-hidden max-[935px]:max-w-[750px] max-[935px]:max-h-[500px] max-[935px]:w-full max-[935px]:h-auto">
                <video className="block w-full h-full object-cover rounded-none" playsInline autoPlay loop muted preload="auto"><source src="https://res.cloudinary.com/db6ifdikq/video/upload/v1764331938/logo_n5druz_1_yopcck.mp4" type="video/mp4"/>Your browser does not support the video tag.</video>
            </div>
            </Tooltip>
            </Link>
        </div>
        
        <div className="border-2 border-[#f6f6f6] rounded-[8px] overflow-hidden">
            <Link to={ROUTES.WORKS.CAVEMAN}>
            <Tooltip content="View work">
            <div className="max-w-[810px] max-h-[540px] w-full aspect-[3/2] overflow-hidden max-[935px]:max-w-[750px] max-[935px]:max-h-[500px] max-[935px]:w-full max-[935px]:h-auto">
                <img className="block w-full h-full object-cover rounded-none" src={Caveman} alt="" />
            </div>
            </Tooltip>
            </Link>
        </div>
        
        {/* Placeholders */}
        <div className="border-2 border-[#f6f6f6] rounded-[8px] overflow-hidden">
            <div className="max-w-[810px] max-h-[540px] w-full aspect-[3/2] overflow-hidden max-[935px]:max-w-[750px] max-[935px]:max-h-[500px] max-[935px]:w-full max-[935px]:h-auto">
                <img className="block w-full h-full object-cover rounded-none" src={Placeholder} alt="" />
            </div>
        </div>
        <div className="border-2 border-[#f6f6f6] rounded-[8px] overflow-hidden">
            <div className="max-w-[810px] max-h-[540px] w-full aspect-[3/2] overflow-hidden max-[935px]:max-w-[750px] max-[935px]:max-h-[500px] max-[935px]:w-full max-[935px]:h-auto">
                <img className="block w-full h-full object-cover rounded-none" src={Placeholder} alt="" />
            </div>
        </div>
        </div>
        </section>

        <Footer theme='light' />
    </>
  );
}

export default Works;

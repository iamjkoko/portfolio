import { useEffect } from 'react';
import '../global.css';

import { Link } from 'react-router-dom';
import { ROUTES } from '../constants/routes';

import Tooltip from '../components/Tooltip';
import Placeholder from '../assets/images/background/placeholder-dk.png';
import Footer from '../components/Footer';

function Experiments() {
  useEffect(() => {
    document.documentElement.classList.add("dark");
    return () => document.documentElement.classList.remove("dark");
  }, []);

  return (
    <div style={{ background: 'var(--color-background)', color: 'var(--color-text)' }}> 
    <section id="experiments" className="w-full min-h-screen flex flex-col items-center pt-32 pb-[60px] max-[935px]:pt-20 max-[935px]:pb-[5px]">
        <div className="grid grid-cols-3 gap-[15px] justify-center mx-auto overflow-hidden px-[30px] max-[935px]:grid-cols-1 max-[935px]:p-[10px]">
        <Tooltip content="Coming soon">
        <div className="border-2 border-[#212121] rounded-[8px] overflow-hidden">
            <div className="max-w-[810px] max-h-[540px] w-full aspect-[3/2] overflow-hidden max-[935px]:max-w-[750px] max-[935px]:max-h-[500px] max-[935px]:h-auto">
                <video className="block w-full h-full object-cover rounded-none" playsInline autoPlay loop muted preload="auto"><source src="https://res.cloudinary.com/db6ifdikq/video/upload/v1762609034/mach-anim_e1birj.mp4" type="video/mp4"/>Your browser does not support the video tag.</video>
            </div>
        </div>
        </Tooltip>
        <Tooltip content="Coming soon">
        <div className="border-2 border-[#212121] rounded-[8px] overflow-hidden">
            <div className="max-w-[810px] max-h-[540px] w-full aspect-[3/2] overflow-hidden max-[935px]:max-w-[750px] max-[935px]:max-h-[500px] max-[935px]:h-auto">
                <video className="block w-full h-full object-cover rounded-none" playsInline autoPlay loop muted preload="auto"><source src="https://res.cloudinary.com/db6ifdikq/video/upload/v1762609026/dig-hal-1_nskehr.mp4" type="video/mp4"/>Your browser does not support the video tag.</video>
            </div>
        </div>
        </Tooltip>
        <Tooltip content="Coming soon">
        <div className="border-2 border-[#212121] rounded-[8px] overflow-hidden">
            <div className="max-w-[810px] max-h-[540px] w-full aspect-[3/2] overflow-hidden max-[935px]:max-w-[750px] max-[935px]:max-h-[500px] max-[935px]:h-auto">
                <video className="block w-full h-full object-cover rounded-none" playsInline autoPlay loop muted preload="auto"><source src="https://res.cloudinary.com/db6ifdikq/video/upload/v1762609021/ech-nat_ddbfyz.mp4" type="video/mp4"/>Your browser does not support the video tag.</video>
            </div>
        </div>
        </Tooltip>
        <Tooltip content="View work">
        <div className="border-2 border-[#212121] rounded-[8px] overflow-hidden">
            <Link to={ROUTES.ARCHIVE.EXPERIMENTS.AGORA}>
            <div className="max-w-[810px] max-h-[540px] w-full aspect-[3/2] overflow-hidden max-[935px]:max-w-[750px] max-[935px]:max-h-[500px] max-[935px]:h-auto">
                <video className="block w-full h-full object-cover rounded-none" playsInline autoPlay loop muted preload="auto"><source src="https://res.cloudinary.com/db6ifdikq/video/upload/v1750039959/agora_w0bynm.mp4" type="video/mp4"/>Your browser does not support the video tag.</video>
            </div>
            </Link>
        </div>
        </Tooltip>

        {/* Placeholders */}
        <div className="border-2 border-[#212121] rounded-[8px] overflow-hidden">
            <div className="max-w-[810px] max-h-[540px] w-full aspect-[3/2] overflow-hidden max-[935px]:max-w-[750px] max-[935px]:max-h-[500px] max-[935px]:h-auto">
                <img className="block w-full h-full object-cover rounded-none" src={Placeholder} />
            </div>
        </div>
        <div className="border-2 border-[#212121] rounded-[8px] overflow-hidden">
            <div className="max-w-[810px] max-h-[540px] w-full aspect-[3/2] overflow-hidden max-[935px]:max-w-[750px] max-[935px]:max-h-[500px] max-[935px]:h-auto">
                <img className="block w-full h-full object-cover rounded-none" src={Placeholder} />
            </div>
        </div>
        </div>
    </section>

    <Footer theme='dark' />
    </div>
  );
}

export default Experiments;



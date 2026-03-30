import { useEffect } from 'react';
import '../global.css';

import { Link } from 'react-router-dom';
import { ROUTES } from '../constants/routes';
import { VIDEO_URLS } from '../constants/videos';

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
    <section id="experiments" className="w-full min-h-screen flex flex-col items-center pt-32 pb-[60px] max-[935px]:pt-10 max-[935px]:pb-[5px]">
        <div className="grid grid-cols-3 gap-[15px] justify-center mx-auto overflow-hidden px-[30px] max-[935px]:grid-cols-1 max-[935px]:p-[10px]">
        <Tooltip content="Coming soon">
        <div className="border-2 border-[#212121] rounded-[8px] overflow-hidden">
            <div className="max-w-[810px] max-h-[540px] w-full aspect-[3/2] overflow-hidden max-[935px]:max-w-[750px] max-[935px]:max-h-[500px] max-[935px]:h-auto">
                <video className="block w-full h-full object-cover rounded-none" playsInline autoPlay loop muted preload="auto"><source src={VIDEO_URLS.MACHINA_ANIMA} type="video/mp4"/>Your browser does not support the video tag.</video>
            </div>
        </div>
        </Tooltip>
        <Tooltip content="Coming soon">
        <div className="border-2 border-[#212121] rounded-[8px] overflow-hidden">
            <div className="max-w-[810px] max-h-[540px] w-full aspect-[3/2] overflow-hidden max-[935px]:max-w-[750px] max-[935px]:max-h-[500px] max-[935px]:h-auto">
                <video className="block w-full h-full object-cover rounded-none" playsInline autoPlay loop muted preload="auto"><source src={VIDEO_URLS.DIGITAL_GARDEN} type="video/mp4"/>Your browser does not support the video tag.</video>
            </div>
        </div>
        </Tooltip>
        <Tooltip content="Coming soon">
        <div className="border-2 border-[#212121] rounded-[8px] overflow-hidden">
            <div className="max-w-[810px] max-h-[540px] w-full aspect-[3/2] overflow-hidden max-[935px]:max-w-[750px] max-[935px]:max-h-[500px] max-[935px]:h-auto">
                <video className="block w-full h-full object-cover rounded-none" playsInline autoPlay loop muted preload="auto"><source src={VIDEO_URLS.ECHOING_NATURE} type="video/mp4"/>Your browser does not support the video tag.</video>
            </div>
        </div>
        </Tooltip>

        <div className="border-2 border-[#212121] rounded-[8px] overflow-hidden transition-[scale] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[0.98]">
            <Link to={ROUTES.ARCHIVE.EXPERIMENTS.AGORA}>
            <div className="max-w-[810px] max-h-[540px] w-full aspect-[3/2] overflow-hidden max-[935px]:max-w-[750px] max-[935px]:max-h-[500px] max-[935px]:h-auto">
                <video className="block w-full h-full object-cover rounded-none" playsInline autoPlay loop muted preload="auto"><source src={VIDEO_URLS.AGORA_PREVIEW} type="video/mp4"/>Your browser does not support the video tag.</video>
            </div>
            </Link>
        </div>


        {/* Placeholders */}
        <div className="border-2 border-[#212121] rounded-[8px] overflow-hidden">
            <div className="max-w-[810px] max-h-[540px] w-full aspect-[3/2] overflow-hidden max-[935px]:max-w-[750px] max-[935px]:max-h-[500px] max-[935px]:h-auto">
                <img className="block w-full h-full object-cover rounded-none" src={Placeholder} alt="" />
            </div>
        </div>
        <div className="border-2 border-[#212121] rounded-[8px] overflow-hidden">
            <div className="max-w-[810px] max-h-[540px] w-full aspect-[3/2] overflow-hidden max-[935px]:max-w-[750px] max-[935px]:max-h-[500px] max-[935px]:h-auto">
                <img className="block w-full h-full object-cover rounded-none" src={Placeholder} alt="" />
            </div>
        </div>
        </div>
    </section>

    <Footer theme='dark' />
    </div>
  );
}

export default Experiments;

import '../global.css';

import { Link } from 'react-router-dom';
import { ROUTES } from '../constants/routes';

import Tooltip from '../components/Tooltip';

// Studio images
import Cheso from '../assets/images/archive/cheso/cheso.webp';
import InfinityBox from '../assets/images/archive/infinity-box/infinity-box.webp';
import Paintbox from '../assets/images/archive/paintbox/paintbox.webp';
import Paperfold from '../assets/images/archive/paperfold/paperfold.webp';
import SaoPaulo from '../assets/images/archive/sao-paulo/saopaulo.webp';
import LightPainting from '../assets/images/archive/light-painting/light-painting.webp';

import Footer from '../components/Footer';


function Studio() {
  return (
    <>
    <section id="studio" className="w-full flex flex-col items-center bg-white pt-24 pb-20 max-[935px]:pt-10 max-[935px]:pb-[5px]">
        <div className="grid grid-cols-3 gap-4 justify-items-center mx-auto overflow-hidden px-12 max-[935px]:grid-cols-1 max-[935px]:p-5">

        <div className="overflow-hidden">
            <Link to={ROUTES.ARCHIVE.STUDIO.INFINITYBOX}>
            <div className="max-w-[810px] max-h-[540px] w-full h-auto overflow-hidden object-cover max-[935px]:max-w-[750px] max-[935px]:max-h-[500px]">
                <img className="block w-full h-auto object-cover transition-transform duration-200 ease-in-out hover:scale-110" src={InfinityBox} alt="Infinity Box" />
            </div>
            </Link>
        </div>


        <div className="overflow-hidden">
            <Link to={ROUTES.ARCHIVE.STUDIO.PAINTBOX}>
            <div className="max-w-[810px] max-h-[540px] w-full h-auto overflow-hidden object-cover max-[935px]:max-w-[750px] max-[935px]:max-h-[500px]">
                <img className="block w-full h-auto object-cover transition-transform duration-200 ease-in-out hover:scale-110" src={Paintbox} alt="Paintbox" />
            </div>
            </Link>
        </div>


        <div className="overflow-hidden">
            <Link to={ROUTES.ARCHIVE.STUDIO.PAPERFOLD}>
            <div className="max-w-[810px] max-h-[540px] w-full h-auto overflow-hidden object-cover max-[935px]:max-w-[750px] max-[935px]:max-h-[500px]">
                <img className="block w-full h-auto object-cover transition-transform duration-200 ease-in-out hover:scale-110" src={Paperfold} alt="Paperfold" />
            </div>
            </Link>
        </div>


        <div className="overflow-hidden">
            <Link to={ROUTES.ARCHIVE.STUDIO.CHESO}>
            <div className="max-w-[810px] max-h-[540px] w-full h-auto overflow-hidden object-cover max-[935px]:max-w-[750px] max-[935px]:max-h-[500px]">
                <img className="block w-full h-auto object-cover transition-transform duration-200 ease-in-out hover:scale-110" src={Cheso} alt="Cheso" />
            </div>
            </Link>
        </div>


        <div className="overflow-hidden">
            <Link to={ROUTES.ARCHIVE.STUDIO.SAOPAULO}>
            <div className="max-w-[810px] max-h-[540px] w-full h-auto overflow-hidden object-cover max-[935px]:max-w-[750px] max-[935px]:max-h-[500px]">
                <img className="block w-full h-auto object-cover transition-transform duration-200 ease-in-out hover:scale-110" src={SaoPaulo} alt="Sao Paulo" />
            </div>
            </Link>
        </div>


        <div className="overflow-hidden">
            <Link to={ROUTES.ARCHIVE.STUDIO.LIGHTPAINTING}>
            <div className="max-w-[810px] max-h-[540px] w-full h-auto overflow-hidden object-cover max-[935px]:max-w-[750px] max-[935px]:max-h-[500px]">
                <img className="block w-full h-auto object-cover transition-transform duration-200 ease-in-out hover:scale-110" src={LightPainting} alt="Light Painting" />
            </div>
            </Link>
        </div> 
        </div>
      </section>

    <Footer theme='light' />
    </>
  );
}

export default Studio;


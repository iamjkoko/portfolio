import { motion } from 'framer-motion';
import { EXTERNAL_LINKS } from '../constants/routes';
import InstagramIcon from '../assets/icons/instagram-black.webp';
import LinkedinIcon from '../assets/icons/linkedin-black.webp';

export default function Renovation() {
  return (
    <motion.div
      className="flex flex-col items-center justify-center h-svh bg-white text-black select-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease: 'easeOut' }}
    >
      <h1
        className="text-[clamp(1.8rem,5vw,3.5rem)] font-normal tracking-[-0.02em] leading-tight text-center"
        style={{ fontFamily: 'var(--font-family-boska)' }}
      >
        Something new is coming.
      </h1>

      <div className="flex items-center gap-3 mt-6">
        <a
          href={EXTERNAL_LINKS.INSTAGRAM}
          target="_blank"
          rel="noopener noreferrer"
          className="transition-opacity hover:opacity-60"
        >
          <img src={InstagramIcon} alt="Instagram" className="w-5 h-5" />
        </a>
        <a
          href={EXTERNAL_LINKS.LINKEDIN}
          target="_blank"
          rel="noopener noreferrer"
          className="transition-opacity hover:opacity-60"
        >
          <img src={LinkedinIcon} alt="LinkedIn" className="w-5 h-5" />
        </a>
      </div>
    </motion.div>
  );
}

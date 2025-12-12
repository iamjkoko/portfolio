import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function Back({ text = 'Back' }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(-1);
  };

  return (
    <button 
      onClick={handleClick} 
      className="back-button inline-flex items-center gap-2 bg-transparent border-none cursor-pointer text-base font-medium text-black transition-[color,opacity] duration-[400ms,200ms] font-inherit py-2 m-0 relative md:relative pt-[2.4rem] left-[2.125rem] z-[1000] hover:text-[rgb(140,140,140)] group"
    >
      <ArrowLeft className="w-5 h-5 shrink-0 transition-transform duration-300 ease-out group-hover:-translate-x-1" />
      <span className="whitespace-nowrap">{text}</span>
    </button>
  );
}


import { useNavigate } from 'react-router-dom';
import { MoveLeft } from 'lucide-react';

export default function Back({ text = 'Back' }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(-1);
  };

  return (
    <button 
      onClick={handleClick} 
      className="back-button inline-flex items-center gap-2 bg-transparent border-none cursor-pointer text-base font-medium text-black transition-[color,opacity] duration-[400ms,200ms] font-inherit py-2 m-0 relative top-[2.4rem] left-[3rem] z-[1000] hover:text-[rgb(140,140,140)]"
    >
      <MoveLeft className="w-5 h-5 shrink-0 transition-transform duration-200" />
      <span className="whitespace-nowrap">{text}</span>
    </button>
  );
}


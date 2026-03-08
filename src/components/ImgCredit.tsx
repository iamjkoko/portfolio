import React from "react";

interface ImgCreditProps {
  src?: string;
  alt?: string;
  children: React.ReactNode;
}

function ImgCredit({ children }: ImgCreditProps) {
  return (
    <div className="flex flex-col items-center w-full">
      <h6 className="block text-center mx-auto text-sm font-light py-2 px-6 max-[935px]:px-4 max-[935px]:pb-6 max-[935px]:text-[0.48rem] pt-[0.5rem] w-full max-w-full break-words [&_a]:text-[#62abe5] [&_a]:no-underline [&_a:hover]:underline">
        {children}
      </h6>
    </div>
  );
}

export default ImgCredit;

import React, { JSX } from 'react';

interface IIconButton {
  icon: JSX.Element;
  onClick?: () => void;
  dataTestId?: string;
}
const IconButton = ({ icon, onClick, dataTestId }: IIconButton) => {
  return (
    <button
      onClick={onClick}
      className='flex rounded-full border-2 border-slate-300 border-solid p-1 text-green-700 h-7 w-7 justify-center items-center hover:bg-green-700 hover:text-white hover:border-green-700 >'
      data-testid={dataTestId}
    >
      {icon}
    </button>
  );
};

export default IconButton;

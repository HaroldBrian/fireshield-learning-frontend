import React from 'react';

interface ButtonProps {
  loading?: boolean;
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
}

const CustomButton: React.FC<ButtonProps> = ({
  loading = false,
  children,
  type = 'submit',
  className = '',
  disabled,
  onClick
}) => {
  const handleClick = type !== 'submit' ? onClick : undefined;

  return (
    <button
      type={type}
      disabled={loading || disabled}
      onClick={handleClick}
      className={`group mt-5 inline-flex w-full items-center justify-center rounded bg-primary px-6 py-2.5 text-white backdrop-blur-2xl transition-all hover:bg-primary-700 hover:text-white ${className}`}
    >
      {!loading ? (
        children
      ) : (
        <div className="flex justify-center items-center space-x-2">
          <div
            className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] text-white motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status">
            <span
              className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
            >Chargement...</span>
          </div>
        </div>
      )}
    </button>
  );
};

export default CustomButton;

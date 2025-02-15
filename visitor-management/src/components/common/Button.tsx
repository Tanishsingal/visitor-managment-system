// src/components/common/Button.tsx
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    isLoading?: boolean;
    variant?: 'primary' | 'secondary' | 'outline';
  }
  
  export const Button: React.FC<ButtonProps> = ({
    children,
    isLoading,
    variant = 'primary',
    className = '',
    ...props
  }) => {
    const baseStyles = 'px-4 py-2 rounded-md font-medium focus:outline-none transition-colors duration-200';
    
    const variants = {
      primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
      secondary: 'bg-gray-600 text-white hover:bg-gray-700 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2',
      outline: 'border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
    };
  
    return (
      <button
        className={`${baseStyles} ${variants[variant]} ${className} ${
          isLoading ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        disabled={isLoading}
        {...props}
      >
        {isLoading ? (
          <div className="flex items-center justify-center">
            <div className="w-5 h-5 border-t-2 border-b-2 border-current rounded-full animate-spin mr-2" />
            Loading...
          </div>
        ) : (
          children
        )}
      </button>
    );
  };
  
  
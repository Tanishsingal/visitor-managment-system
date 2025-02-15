// src/components/common/LoadingSpinner.tsx
interface LoadingSpinnerProps {
    size?: 'small' | 'medium' | 'large';
  }
  
  export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = 'medium' }) => {
    const sizeClasses = {
      small: 'h-4 w-4',
      medium: 'h-8 w-8',
      large: 'h-12 w-12'
    };
  
    return (
      <div className="flex justify-center items-center">
        <div className={`${sizeClasses[size]} animate-spin rounded-full border-b-2 border-blue-500`} />
      </div>
    );
  };
import React from 'react';
import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  text?: string;
}

const sizeClasses = {
  sm: 'h-4 w-4',
  md: 'h-6 w-6', 
  lg: 'h-8 w-8',
  xl: 'h-12 w-12'
};

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'lg', 
  className,
  text 
}) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[200px] p-6">
      <div className={cn(
        "animate-spin rounded-full border-2 border-gray-200 border-t-blue-600",
        sizeClasses[size],
        className
      )}></div>
      {text && (
        <p className="mt-4 text-sm text-gray-500 font-medium">{text}</p>
      )}
    </div>
  );
};

// Inline spinner for buttons and small spaces
export const InlineSpinner: React.FC<{ size?: 'sm' | 'md'; className?: string }> = ({ 
  size = 'sm', 
  className 
}) => (
  <div className={cn(
    "inline-block animate-spin rounded-full border-2 border-gray-200 border-t-current",
    sizeClasses[size],
    className
  )}></div>
);

// Page-level loading state
export const PageLoader: React.FC<{ text?: string }> = ({ text = "Loading..." }) => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-slate-100">
    <div className="text-center">
      <div className="w-16 h-16 bg-blue-500 rounded-lg flex items-center justify-center mx-auto mb-4 animate-pulse">
        <span className="text-white font-bold text-xl">FF</span>
      </div>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">FinanceFlow</h1>
      <p className="text-gray-600">{text}</p>
    </div>
  </div>
);

export default LoadingSpinner; 
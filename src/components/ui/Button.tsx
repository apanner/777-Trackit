import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-all focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 text-gray-100 active:scale-95 transform',
  {
    variants: {
      variant: {
        default: 'bg-gray-700 hover:bg-gray-600 active:bg-gray-800',
        destructive: 'bg-red-600 hover:bg-red-500 active:bg-red-700',
        success: 'bg-green-600 hover:bg-green-500 active:bg-green-700',
        warning: 'bg-red-500 hover:bg-red-600 active:bg-red-700',
        outline: 'border border-gray-600 hover:bg-gray-700 active:bg-gray-800',
        ghost: 'hover:bg-gray-700 active:bg-gray-800',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 px-3',
        lg: 'h-11 px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export function Button({ className, variant, size, ...props }: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}
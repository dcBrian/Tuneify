import { twMerge } from 'tailwind-merge';

const dots = 'mx-[1px] inline-block h-1 w-1 animate-blink rounded-md';

const LoadingDots = ({ className }: { className: string }) => {
  return (
    <span className="mx-2 inline-flex items-center">
      <span className={twMerge(dots, className)} />
      <span className={twMerge(dots, 'animation-delay-[300ms]', className)} />
      <span className={twMerge(dots, 'animation-delay-[600ms]', className)} />
    </span>
  );
};

export default LoadingDots;

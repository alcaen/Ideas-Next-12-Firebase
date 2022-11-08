import { memo } from 'react';

export type TooltipProps = {
  children: React.ReactNode;
  text: string;
};

const Tooltip: React.FC<TooltipProps> = memo((props) => {
  return (
    <span className='group relative mb-10'>
      <span className="pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-black px-2 py-1 text-white opacity-0 transition before:absolute before:left-1/2 before:bottom-full before:-translate-x-1/2 before:border-4 before:border-transparent before:border-t-black before:content-[''] group-hover:opacity-80">
        {props.text}
      </span>

      {props.children}
    </span>
  );
});

Tooltip.displayName = 'Tooltip';

export default Tooltip;

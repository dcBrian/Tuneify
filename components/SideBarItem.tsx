import Link from 'next/link';
import { IconType } from 'react-icons';
import { twMerge } from 'tailwind-merge';

type SideBarItemProps = {
  icon: IconType;
  label: string;
  active?: boolean;
  href: string;
  //   children: React.ReactNode;
};

function SideBarItem({ icon: Icon, label, active, href }: SideBarItemProps) {
  return (
    <Link
      href={href}
      className={twMerge(
        'flex h-auto items-center w-full gap-x-4 text-md font-medium cursor-pointer hover:text-white transition text-neutral-400 py-1',
        active ? 'text-white' : ''
      )}
    >
      <Icon size={26} />
      <p className="truncate w-full">{label}</p>
    </Link>
  );
}

export default SideBarItem;

import { ReactElement } from 'react';
import Link from 'next/link';
import clsx from 'clsx';

const CARDVARIANTS = {
  yellow: 'bg-yellow-400',
  blue: 'bg-blue-400',
  salmon: 'bg-red-400',
  black: 'bg-black',
};

type CardProps = {
  href: string;
  icon: ReactElement;
  colour: keyof typeof CARDVARIANTS;
  title: string;
  description: string;
};

const ProfileItemCard = ({
  href,
  icon,
  title,
  colour,
  description,
}: CardProps) => {
  const style = CARDVARIANTS[colour];

  return (
    <Link href={href}>
      <a
        className={clsx(
          'flex p-4 rounded-3xl border border-gray-300 outline-none focus:bg-gray-200 active:bg-gray-300 hover:bg-gray-200 duration-150 ease-in-out'
        )}
        aria-label={`Open ${title} settings`}
      >
        <div
          className="inline-flex items-center justify-center"
          aria-labelledby="classroomchat-profile-item-card-title"
          aria-describedby="classroomchat-profile-item-card-description"
        >
          <div className={clsx('relative w-12 h-12 rounded-full', style)}>
            <span className="absolute inset-0 inline-flex items-center justify-center">
              {icon}
            </span>
          </div>
        </div>
        <div className="flex-1 ml-3">
          <div>
            <span
              id="classroomchat-profile-item-card-title"
              className="font-bold text-md sm:text-xl"
            >
              {title}
            </span>
          </div>
          <p
            id="classroomchat-profile-item-card-description"
            className="font-semibold text-sm"
          >
            {description}
          </p>
        </div>
      </a>
    </Link>
  );
};

export default ProfileItemCard;

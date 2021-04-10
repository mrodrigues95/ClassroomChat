import clsx from 'clsx';
import Image from 'next/image';

type Props = {
  url: string;
  isRounded?: boolean;
  containerClassName?: string;
};

const Avatar = ({
  url,
  isRounded = false,
  containerClassName,
  ...props
}: Props) => {
  return (
    <div
      className={clsx('flex-shrink-0 relative w-10 h-10', containerClassName)}
    >
      <Image
        src={url}
        alt="Picture of user avatar"
        role="presentation"
        objectFit="cover"
        layout="fill"
        className={clsx(isRounded && 'rounded-full')}
        {...props}
      />
    </div>
  );
};

export default Avatar;

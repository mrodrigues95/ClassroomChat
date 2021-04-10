import clsx from 'clsx';
import Image from 'next/image';

type Props = {
  url: string;
  className?: string;
  imgClassName?: string;
};

const Avatar = ({ url, className, imgClassName, ...props }: Props) => {
  return (
    <div className={clsx('flex-shrink-0', className)}>
      <Image
        className={clsx('h-10 w-10 rounded-full bg-cover', imgClassName)}
        src={url}
        alt="Picture of user avatar"
        aria-hidden={true}
        {...props}
        sizes="(min-width: 640px) 80px, (min-width: 768px) 128px, (min-width: 1024px) 192px"
        width={200}
        height={200}
      />
    </div>
  );
};

export default Avatar;

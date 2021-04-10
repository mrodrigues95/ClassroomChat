import Link from 'next/link';
import { FeelingBlueIllustration } from '../../../assets/illustrations';

type Props = {
  message: string;
  altMessage?: string;
  showAction?: boolean;
};

// TODO: These button styles should be moved to the LinkOrButton component.
const Error = ({ message, altMessage, showAction = true }: Props) => {
  return (
    <div className="flex flex-col h-full p-4 items-center justify-center">
      <FeelingBlueIllustration className="w-full h-64" />
      <div className="my-6 text-center">
        <h2 className="font-bold text-2xl">{message}</h2>
        {altMessage && (
          <h3 className="font-semibold text-gray-700">{altMessage}</h3>
        )}
      </div>
      {showAction && (
        <Link href="/home">
          <a className="inline-flex justify-center items-center p-3 bg-primary text-white rounded-md font-semibold cursor-pointer transition duration-150 ease-out sm:w-48 focus:outline-none focus:bg-primary-light hover:bg-primary-light active:bg-primary-dark">
            Go home
          </a>
        </Link>
      )}
    </div>
  );
};

export default Error;

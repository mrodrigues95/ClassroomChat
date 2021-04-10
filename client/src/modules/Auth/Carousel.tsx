import { NavigationButton } from '../../common/components';

type Props = {
  caption: String;
  description: String;
  children: React.ReactNode;
};

// TODO: Add sliding functionality.
const Carousel = ({ caption, description, children }: Props) => {
  return (
    <div className="flex flex-col justify-center items-center h-full">
      <div>{children}</div>
      <article className="flex flex-col flex-1 -mt-16 w-full">
        <h2 className="text-center self-center font-bold text-3xl">
          {caption}
        </h2>
        <p className="mt-2 text-center text-gray-700 text-xl">{description}</p>
        <div className="flex justify-center w-full mt-24 space-x-3">
          <span className="rounded-full h-2 w-2 bg-gray-300" />
          <span className="rounded-full h-2 w-5 bg-blue-400" />
          <span className="rounded-full h-2 w-2 bg-gray-300" />
        </div>
      </article>
      <div className="flex justify-center w-full">
        <NavigationButton aria-label="Previous slide" />
        <span className="pl-6" />
        <NavigationButton aria-label="Next slide" direction="right" />
      </div>
    </div>
  );
};

export default Carousel;

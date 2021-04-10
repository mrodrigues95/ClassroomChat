import { NavigationButton, Avatar, Spinner } from '../../../ui';
import { getRandomAvatar } from '../../../../utils/getRandomAvatar';
import { useQueryUser } from '../../../../queries/useQueryUser';

const ProfileInfo = () => {
  const { data, isLoading, isError } = useQueryUser();

  return (
    <div className="flex items-center justify-center">
      {isLoading ? (
        <Spinner />
      ) : isError ? (
        <span className="font-semibold">
          Cannot load profile info at this time.
        </span>
      ) : (
        <>
          <Avatar
            url={data?.imageUrl ?? getRandomAvatar()}
            containerClassName="xl:mr-3 h-12 w-12"
            isRounded
          />
          <div className="hidden w-full xl:flex items-center justify-between">
            <div className="flex flex-col">
              <p className="font-bold text-black">{data?.name}</p>
              <p className="text-sm text-gray-700 font-medium truncate">
                {data?.email}
              </p>
            </div>
            <NavigationButton
              to="/profile"
              direction="right"
              size="medium"
              aria-label="Go to profile"
            />
          </div>
        </>
      )}
    </div>
  );
};

export default ProfileInfo;

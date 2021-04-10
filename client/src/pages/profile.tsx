import { GetServerSideProps } from 'next';
import { QueryClient } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import { ProfileHeader, ProfileItemCard } from '../modules';
import { Container, Spinner, Error } from '../common/components';
import {
  ProfileIcon,
  NotificationsIcon,
  LockIcon,
  ColourSwatchIcon,
} from '../common/assets';
import {
  useQueryUser,
  useQueryPrefetchUser,
} from '../common/queries/useQueryUser';

const Profile = () => {
  const { data: user, isLoading, isError } = useQueryUser();

  return (
    <Container>
      <Container.Header title="Profile" />
      <Container.Body>
        {isLoading ? (
          <Spinner />
        ) : isError ? (
          <Error message="Sorry, we couldn't load your profile at this time." />
        ) : (
          <>
            <div className="container flex flex-col mx-auto mt-2 w-full p-2 sm:p-0">
              <ProfileHeader user={user} />
              <article className="mt-8">
                <h2 className="font-bold mb-3 text-xl sm:text-3xl">
                  Settings ⚙️
                </h2>
                <div className="flex flex-col justify-center space-y-4">
                  <ProfileItemCard
                    href="about"
                    icon={<ProfileIcon className="w-6 h-6 text-white" />}
                    colour="salmon"
                    title="About"
                    description="Let others know a little bit about yourself."
                  />
                  <ProfileItemCard
                    href="notifications"
                    icon={<NotificationsIcon className="w-6 h-6 text-white" />}
                    colour="blue"
                    title="Notifications"
                    description="Manage the way we send you all of the notifications and alerts."
                  />
                  <ProfileItemCard
                    href="privacy"
                    icon={<LockIcon className="w-6 h-6" />}
                    colour="yellow"
                    title="Privacy"
                    description="Control who can view your information."
                  />
                  <ProfileItemCard
                    href="appearance"
                    icon={<ColourSwatchIcon className="w-6 h-6 text-white" />}
                    colour="black"
                    title="Appearance"
                    description="Choose how Classroom Chat looks to you."
                  />
                </div>
              </article>
            </div>
          </>
        )}
      </Container.Body>
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const queryClient = new QueryClient();
  await useQueryPrefetchUser(queryClient);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default Profile;

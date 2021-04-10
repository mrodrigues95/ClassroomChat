import { QueryObserverResult } from 'react-query';
import { Container, Spinner, Error } from '../../common/components';
import ActionsMenu from './ActionsMenu';
import DiscussionMembers from './DiscussionMembers';
import { Discussion } from '../../common/types';

type Props = {
  discussionQuery: QueryObserverResult<Discussion, unknown>;
  children: React.ReactNode;
};

const DiscussionContainer = ({ discussionQuery, children }: Props) => {
  if (discussionQuery.isLoading) {
    return (
      <Container>
        <div className="flex flex-1 items-center justify-center">
          <Spinner />
        </div>
      </Container>
    );
  }

  if (discussionQuery.isError) {
    return (
      <Container>
        <Error message="Sorry, we can't load this discussion right now" />
      </Container>
    );
  }

  return (
    <Container>
      <Container.Header title={discussionQuery.data?.name}>
        <DiscussionMembers />
        <ActionsMenu />
      </Container.Header>
      <Container.Body>{children}</Container.Body>
    </Container>
  );
};

export default DiscussionContainer;

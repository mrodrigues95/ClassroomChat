import React from 'react';
import { QueryObserverResult } from 'react-query';
import { ContainerBody } from './../ui/Container';
import Container, { ContainerHeader } from '../ui/Container';
import ActionsMenu from './ActionsMenu';
import DiscussionMembers from './DiscussionMembers';
import Spinner from '../ui/Spinner';
import Error from '../ui/Error';
import { Discussion } from '../../shared/types/api';

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
      <ContainerHeader title={discussionQuery.data?.name}>
        <DiscussionMembers />
        <ActionsMenu />
      </ContainerHeader>
      <ContainerBody>{children}</ContainerBody>
    </Container>
  );
};

export default DiscussionContainer;

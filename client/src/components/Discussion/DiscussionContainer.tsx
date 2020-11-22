import React from 'react';
import Container, { ContainerHeader } from '../ui/Container';
import { ContainerBody } from './../ui/Container';
import ActionsMenu from './ActionsMenu';
import DiscussionMembers from './DiscussionMembers';

type Props = {
  title?: string;
  children: React.ReactNode;
};

const DiscussionContainer = ({ title, children }: Props) => {
  return (
    <Container>
      <ContainerHeader title={title}>
        <DiscussionMembers />
        <ActionsMenu />
      </ContainerHeader>
      <ContainerBody>{children}</ContainerBody>
    </Container>
  );
};

export default DiscussionContainer;

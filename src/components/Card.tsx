import React, { ComponentPropsWithoutRef } from 'react';
import styled from 'styled-components';

const CardContainer = styled.div`
  background: rgb(239, 159, 57);
  background: linear-gradient(
    144deg,
    rgba(239, 159, 57, 1) 40%,
    rgba(247, 210, 105, 1) 100%
  );
  color: white;
  padding: 16px 32px 16px 16px;
  transform: skew(-4deg, 0deg);
  font-size: 20px;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  border-radius: 8px 8px 0px 8px;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.25);
  border-right: 16px solid rgb(211, 142, 52);
`;

const Title = styled.div`
  margin: 0;
  font-size: 1.225em;
  background: linear-gradient(
    144deg,
    rgba(239, 159, 57, 1) 40%,
    rgba(247, 210, 105, 1) 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const TitleContainer = styled.div`
  padding: 8px 44px 8px 24px;
  border-radius: 0 8px 0 8px;
  filter: blur(0.8);
  background: rgba(0, 0, 0, 0.85);
  margin-bottom: 8px;
`;

type CardProps = ComponentPropsWithoutRef<'div'> & {
  title: string;
  value?: string;
};

export const Card = ({ children, title, value }: CardProps) => {
  return (
    <CardContainer>
      <TitleContainer>
        <Title>{title}</Title>
      </TitleContainer>
      {children ?? value}
    </CardContainer>
  );
};

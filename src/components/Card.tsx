import React, { ComponentPropsWithoutRef } from 'react';
import styled, { css } from 'styled-components';

type CardVariant = 'green' | 'orange';

type CardProps = ComponentPropsWithoutRef<'div'> & {
  title: string;
  value?: string | null;
  variant?: CardVariant;
};

const getGradient = (variant: CardVariant) => {
  switch (variant) {
    case 'green':
      return `linear-gradient(to right, #0083B0, #00B4DB);`;
    case 'orange':
    default:
      return `linear-gradient(
        144deg,
        rgba(239, 159, 57, 1) 40%,
        rgba(247, 210, 105, 1) 100%
        )`;
  }
};

const CardContainer = styled.div<{ variant: CardVariant }>`
  ${({ variant = 'orange' }) => css`
    background: rgb(239, 159, 57);
    background: ${getGradient(variant)};
    color: white;
    padding: 16px 32px 16px 16px;
    transform: skew(-4deg, 0deg);
    font-size: 20px;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    border-radius: 8px 8px 0px 8px;
    box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.25);
    border-right: 16px solid rgba(0, 0, 0, 0.05);
  `}
`;

const Title = styled.div<{ variant: CardVariant }>`
  ${({ variant = 'orange' }) => css`
    margin: 0;
    font-size: 1.225em;
    background: ${getGradient(variant)};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  `}
`;

const TitleContainer = styled.div`
  padding: 8px 44px 8px 24px;
  border-radius: 0 8px 0 8px;
  filter: blur(0.8);
  background: rgba(0, 0, 0, 0.85);
  margin-bottom: 8px;
`;

export const Card = ({
  children,
  title,
  value,
  variant = 'orange',
}: CardProps) => {
  return (
    <CardContainer variant={variant}>
      <TitleContainer>
        <Title variant={variant}>{title}</Title>
      </TitleContainer>
      {children ?? value}
    </CardContainer>
  );
};

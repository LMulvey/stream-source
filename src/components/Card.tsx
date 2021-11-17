import React, { ComponentPropsWithoutRef } from 'react';
import styled, { css } from 'styled-components';

type CardVariant = 'blue' | 'green' | 'orange' | 'purple';

type CardProps = ComponentPropsWithoutRef<'div'> & {
  title: string;
  value?: string | null;
  variant?: CardVariant;
  hideSkew?: boolean;
};

const getGradient = (variant: CardVariant) => {
  switch (variant) {
    case 'blue':
      return `linear-gradient(to right, #0083B0, #00B4DB);`;
    case 'green':
      return `linear-gradient(to right, #00b05e, #00db66);`;
    case 'purple':
      return `linear-gradient(to right, #cf04be, #ee05b4);`;
    case 'orange':
    default:
      return `linear-gradient(
        144deg,
        rgba(239, 159, 57, 1) 40%,
        rgba(247, 210, 105, 1) 100%
        )`;
  }
};

const CardContainer = styled.div<{ variant: CardVariant; hideSkew?: boolean }>`
  ${({ variant = 'orange', hideSkew = false }) => css`
    background: rgb(239, 159, 57);
    background: ${getGradient(variant)};
    color: white;
    padding: 16px 32px 16px 16px;
    font-size: 18px;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    border-radius: 8px 8px 0px 8px;
    box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.25);
    border-right: 16px solid rgba(0, 0, 0, 0.05);

    ${!hideSkew &&
    css`
      transform: skew(-2deg, 0deg);
    `}
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
  hideSkew = false,
}: CardProps) => {
  return (
    <CardContainer variant={variant} hideSkew={hideSkew}>
      <TitleContainer>
        <Title variant={variant}>{title}</Title>
      </TitleContainer>
      {children ?? value}
    </CardContainer>
  );
};

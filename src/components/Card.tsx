import React from 'react';
import styled from 'styled-components';

const CardContainer = styled.div`
  background: #e08f0c;
  color: white;
`;

type CardProps = {
  title: string;
  value: string;
};

export const Card = ({ title, value }: CardProps) => {
  return (
    <CardContainer>
      <h4>{title}</h4>
      {value}
    </CardContainer>
  );
};

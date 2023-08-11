import React from 'react';
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const Spinner = styled.div`
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  animation: ${spin} 1s linear infinite;
`;

const LoadingMessage = styled.p`
  margin-top: 10px;
  font-size: 1rem;
  color: #333;
`;

interface LoaderProps {
  children?: React.ReactNode;
}

const Loader: React.FC<LoaderProps> = ({ children }) => (
  <LoaderWrapper>
    <Spinner />
    {children && <LoadingMessage>{children}</LoadingMessage>}
  </LoaderWrapper>
);

export default Loader;

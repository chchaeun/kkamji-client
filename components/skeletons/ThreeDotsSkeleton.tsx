import React from "react";
import { ThreeDots } from "react-loader-spinner";
import styled from "styled-components";

function ThreeDotsSkeleton() {
  return (
    <Container>
      <ThreeDots
        height="80"
        width="80"
        radius="9"
        color="#adadad"
        ariaLabel="three-dots-loading"
        visible={true}
      />
    </Container>
  );
}

export default ThreeDotsSkeleton;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

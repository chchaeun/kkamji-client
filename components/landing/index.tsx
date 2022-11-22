import styled from "styled-components";
import ProfessorContainer from "./containers/ProfessorContainer";
import TitleContainer from "./containers/TitleContainer";

function LandingPage() {
  return (
    <Frame>
      <TitleContainer />
      <ProfessorContainer />
    </Frame>
  );
}

export default LandingPage;

const Frame = styled.div`
  padding-top: 50px;
`;

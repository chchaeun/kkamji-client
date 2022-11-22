import styled from "styled-components";
import ChallengeContainer from "./containers/ChallengeContainer";
import ProfessorContainer from "./containers/ProfessorContainer";
import QuizExampleContainer from "./containers/QuizExampleContainer";
import TitleContainer from "./containers/TitleContainer";

function LandingPage() {
  return (
    <Frame>
      <TitleContainer />
      <ProfessorContainer />
      <ChallengeContainer />
      <QuizExampleContainer />
    </Frame>
  );
}

export default LandingPage;

const Frame = styled.div`
  padding-top: 50px;
`;

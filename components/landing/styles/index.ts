import styled from "styled-components";
import { media } from "../../../styles/media";

const Title = styled.h2<{ color: string }>`
  font-family: "GongGothicMedium";
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 150%;

  text-align: center;

  color: ${(p) => p.color};

  ${media.medium`
    font-size: 20px;
  `}
`;

const Description = styled.p<{ color: string }>`
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 150%;

  text-align: center;

  color: ${(p) => p.color};

  opacity: 0.8;

  ${media.medium`
    font-size: 14px;
  `}
`;

const Speechs = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  padding: 30px 0px;
`;

const FirstSpeech = styled.div`
  display: flex;
  justify-content: flex-end;

  img {
    width: 260px;
  }

  ${media.medium`
    justify-content: center;

    img{
        width: 236px;
    }
  `}
`;

const SecondSpeech = styled.div`
  display: flex;
  justify-content: flex-start;

  img {
    width: 443px;
  }

  ${media.medium`
    justify-content: center;

    img{
        width: 326px;
    }
  `}
`;

export { Title, Description, Speechs, FirstSpeech, SecondSpeech };

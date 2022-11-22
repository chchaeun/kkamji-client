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

export { Title, Description };

interface Props {
  challengeId: string;
}
const challengeDetailUrl = ({ challengeId }: Props) => {
  return `/challenges/${challengeId}`;
};
const currentWeekUrl = ({ challengeId }: Props) => {
  return `${challengeDetailUrl({ challengeId })}/now`;
};

const openWeeksUrl = ({ challengeId }: Props) => {
  return `${challengeDetailUrl({ challengeId })}/weeks`;
};

const MY_CHALLENGE = "/my/challenges";

export { challengeDetailUrl, currentWeekUrl, openWeeksUrl, MY_CHALLENGE };

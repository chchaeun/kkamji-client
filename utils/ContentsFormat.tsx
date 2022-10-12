interface Props {
  contents: string;
}
const ContentsFormat = ({ contents }: Props) => {
  return (
    <p>
      {contents
        .replaceAll("\\t", "\u00a0 \u00a0 \u00a0 \u00a0")
        .replaceAll("\t", "\u00a0 \u00a0 \u00a0 \u00a0")
        .split("\n")
        .map((content) => (
          <>
            {content}
            <br />
          </>
        ))}
    </p>
  );
};

export default ContentsFormat;

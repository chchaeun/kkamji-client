export const getDateFormat = (date: string) => {
  const nowTime = new Date().getTime();
  const dateFormat = new Date(date);
  const timeGap = nowTime - dateFormat.getTime();

  const oneDaytoMs = 1000 * 60 * 60 * 24;
  const threeDaytoMs = oneDaytoMs * 3;

  if (timeGap < oneDaytoMs) {
    // 작성 시간이 1일 이내면 hh:mm을 띄운다.
    return `${dateFormat.getHours().toString().padStart(2, "0")}:${dateFormat
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;
  } else if (timeGap >= oneDaytoMs && timeGap < threeDaytoMs) {
    // 작성 시간이 3일 이내면 d일 전을 띄운다.
    return `${Math.floor(timeGap / oneDaytoMs)}일 전`;
  } else {
    // 작성 시간이 그 이상이면 yyyy년 mm월 dd일을 띄운다.
    return `${dateFormat.getFullYear()}년 ${
      dateFormat.getMonth() + 1
    }월 ${dateFormat.getDate()}일`;
  }
};

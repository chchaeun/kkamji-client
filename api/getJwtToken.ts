export const getJwtToken = () => {
  if (typeof window === "undefined") {
    return "";
  }

  const token =
    sessionStorage.getItem("token") || localStorage.getItem("token") || "";

  if (token) {
    return getBearer(token);
  } else {
    return "";
  }
};

const getBearer = (token: string) => {
  return `Bearer ${token}`;
};

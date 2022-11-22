export const getJwtToken = () => {
  if (typeof window === "undefined") {
    return null;
  }

  const token =
    sessionStorage.getItem("token") || localStorage.getItem("token") || "";

  if (token) {
    return getBearer(token);
  }

  return null;
};

const getBearer = (token: string) => {
  return `Bearer ${token}`;
};

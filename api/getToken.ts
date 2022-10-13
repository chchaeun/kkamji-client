export const getToken = () => {
  if (typeof window === "undefined") {
    return "";
  }
  return sessionStorage.getItem("token") || localStorage.getItem("token") || "";
};

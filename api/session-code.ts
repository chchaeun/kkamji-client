export const getCode = () => {
  if (typeof window === "undefined") {
    return "";
  }
  return sessionStorage.getItem("code") || "";
};

export const getCode = () => {
  if (typeof window !== "undefined") {
    return sessionStorage.getItem("code");
  }
};

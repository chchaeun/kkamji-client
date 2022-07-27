import api from "../my-api";

export const postQuizbookPurchase = async (quizbookId: number) => {
  return await api.post("/quizbook-purchase", { quizPackageID: quizbookId });
};

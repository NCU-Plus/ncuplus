export const useReviewPage = () =>
  useState<number>("reviewPage", () => {
    return 1;
  });

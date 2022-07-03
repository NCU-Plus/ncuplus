export const useCoursePage = () =>
  useState<number>("coursePage", () => {
    return 1;
  });

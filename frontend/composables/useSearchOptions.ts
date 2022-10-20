import { SearchOptions } from "~/components/courses/CoursesSearchOptions";

export const useSearchOptions = () =>
  useState<SearchOptions>("searchOptions", () => {
    return {
      advanceSearch: false,
      query: "",
      semester: "",
      department: "",
    };
  });

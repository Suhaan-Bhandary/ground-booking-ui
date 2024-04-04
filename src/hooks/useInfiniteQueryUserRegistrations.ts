import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { fetchUserRegisterations } from "../api/event";

const useInfiniteQueryUserRegistrations = () => {
  const { ref, inView } = useInView({ threshold: 0 });

  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["user-registerations"],
    queryFn: ({ pageParam }) => fetchUserRegisterations({ page: pageParam }),

    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return allPages.length + 1 <= lastPage.total_pages
        ? allPages.length + 1
        : undefined;
    },
  });

  useEffect(() => {
    if (!inView || !hasNextPage) return;
    fetchNextPage();
  }, [inView, hasNextPage, fetchNextPage]);

  const registrations = data?.pages.flatMap((page) => page.users);
  return { ref, registrations, isLoading, isError, isFetchingNextPage };
};

export default useInfiniteQueryUserRegistrations;

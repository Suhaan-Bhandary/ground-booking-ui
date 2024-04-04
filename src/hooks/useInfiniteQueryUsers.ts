import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { fetchUsers } from "../api/user";

type useInfiniteQueryUsersProps = {
  username: string;
};

const useInfiniteQueryUsers = ({ username }: useInfiniteQueryUsersProps) => {
  const { ref, inView } = useInView({ threshold: 0 });

  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["users", username],
    queryFn: ({ pageParam }) => fetchUsers({ page: pageParam, username }),

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

  const users = data?.pages.flatMap((page) => page.users);

  return { ref, users, isLoading, isError, isFetchingNextPage };
};

export default useInfiniteQueryUsers;

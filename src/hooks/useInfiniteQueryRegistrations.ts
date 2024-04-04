import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { fetchRegisterations } from "../api/event";

type useInfiniteQueryRegistrationsProps = {
  user_id: string;
  slot_id: string;
  status: string;
};

const useInfiniteQueryRegistrations = ({
  user_id,
  slot_id,
  status,
}: useInfiniteQueryRegistrationsProps) => {
  const { ref, inView } = useInView({ threshold: 0 });

  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["registerations", user_id, slot_id, status],
    queryFn: ({ pageParam }) =>
      fetchRegisterations({
        user_id,
        slot_id,
        status,
        page: pageParam,
      }),

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

  const registrations = data?.pages.flatMap((page) => page.registrations);
  return { ref, registrations, isLoading, isError, isFetchingNextPage };
};

export default useInfiniteQueryRegistrations;

import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { fetchSlots } from "../api/slot";

type useInfiniteQuerySlotsProps = {
  eventId: number;
};

const useInfiniteQuerySlots = ({ eventId }: useInfiniteQuerySlotsProps) => {
  const { ref, inView } = useInView({ threshold: 0 });

  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["slots", eventId],
    queryFn: ({ pageParam }) =>
      fetchSlots({ page: pageParam, event_id: Number(eventId) }),

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

  const slots = data?.pages.flatMap((page) => page.slots);

  return { ref, slots, isLoading, isError, isFetchingNextPage };
};

export default useInfiniteQuerySlots;

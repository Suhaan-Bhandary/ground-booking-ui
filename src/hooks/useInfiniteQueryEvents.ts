import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchEvents } from "../api/event";
import { useEffect } from "react";
import { TEventStatus } from "../types/event";
import { useInView } from "react-intersection-observer";

type useInfiniteQueryEventsProps = {
  eventStatus: TEventStatus | "";
  startDate: string;
  endDate: string;
};

const useInfiniteQueryEvents = ({
  eventStatus,
  startDate,
  endDate,
}: useInfiniteQueryEventsProps) => {
  const { ref, inView } = useInView({ threshold: 0 });

  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["events", eventStatus, startDate, endDate],
    queryFn: ({ pageParam }) =>
      fetchEvents({ page: pageParam, eventStatus, startDate, endDate }),

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

  // Making the data flat
  const events = data?.pages.flatMap((page) => page.events);

  return { ref, events, isLoading, isError, isFetchingNextPage };
};

export default useInfiniteQueryEvents;

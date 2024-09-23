import React, {useEffect, useRef} from "react";
import axios from "axios";
import PostCard, {PostType} from "@/components/PostCard";
import {useInfiniteQuery} from "@tanstack/react-query";
import {useInView} from "react-intersection-observer";
import {sendGTMEvent} from "@next/third-parties/google";

const InfiniteScrollExample2 = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [ref, inView] = useInView({
        root: containerRef.current, // this line is important
        triggerOnce: false, // change as per your requirement
    });
    const {isSuccess, data, isFetching, fetchNextPage, hasNextPage, isFetchingNextPage,} =
        useInfiniteQuery<PostType[]>({
            queryKey: ["infinityScrolling"],
            queryFn: async ({pageParam}) => {
                return fetchData(pageParam as number)
            },
            initialPageParam: 1,
            getNextPageParam: (lastPage, allPages) => {
                return lastPage.length > 0
                    ? allPages?.length + 1
                    : undefined;
            }
        });

    useEffect(() => {
        if (!inView) return;
        void fetchNextPage()
    }, [inView]);

    // useEffect(() => {
    //     if (data?.pages.length && !isFetchingNextPage) {
    //         void fetchNextPage()
    //     }
    // }, [data, isFetchingNextPage]);

    async function fetchData(index: number) {
        await new Promise(resolve => setTimeout(resolve, 3000))
        const res = await axios.get<PostType[]>(`https://jsonplaceholder.typicode.com/posts?_page=${index}&_limit=12`)
        return res.data;
    }

    return (
        <div className='p-4 w-full flex gap-6'>
            <div className='h-[1600px] border border-solid border-red-500 overflow-y-auto w-[600px]' ref={containerRef}>
                <div className='flex flex-col gap-3'>
                    {data?.pages?.map((page, pageIndex) =>
                        (page as any)?.map(
                            (item: PostType, index: number) =>
                                <PostCard data={item} key={item.id} ref={page?.length === index + 1 ? ref : null}/>
                        ))}
                </div>
                {isFetching ? <p>Loading...</p> : !hasNextPage && <p>Stop</p>}
            </div>
            <div className='w-full bg-amber-300 h-[600px] flex flex-col justify-between p-5 items-center'>
                <p>Teaser</p>
                <button className='bg-green-300 border border-green-700 text-white px-3 py-1 rounded'
                        onClick={() => sendGTMEvent({event: "buttonClicked", value: "qwe"})}>
                    Send to GTM
                </button>
            </div>
        </div>
    );
};

export default InfiniteScrollExample2;
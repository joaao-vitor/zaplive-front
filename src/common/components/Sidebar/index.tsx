import { useAppDispatch, useAppSelector } from '@/hooks';
import { Button } from '@/shadcn/ui/button';
import { Hint } from '@components/Hint';
import { ArrowLeftFromLine, ArrowRightFromLine } from 'lucide-react';
import {
    toggleCollapse,
    expand,
    collapse,
} from '@/features/Sidebar/SidebarSlice';

import { cn } from '@/lib/utils';
import { RecommendedList, RecommendedListSkeleton } from './recommendedList';
import { FollowingList } from './followingList';

import { useMediaQuery } from 'usehooks-ts';
import { useEffect } from 'react';

import { useGetRecommendedQuery } from '@/features/user/userSlice';

export default function Sidebar() {
    const { data, isLoading, isSuccess } = useGetRecommendedQuery();

    const windowResized = useMediaQuery('(max-width: 768px)');

    const dispatch = useAppDispatch();
    const { collapsed } = useAppSelector((state) => state.sideBar);

    useEffect(() => {
        if (windowResized) dispatch(collapse());
        else dispatch(expand());
    }, [windowResized]);

    const handleCollapse = () => {
        dispatch(toggleCollapse());
    };
    return (
        <aside
            className={cn(
                'pt-4 flex flex-col h-full w-20 bg-neutral-100 dark:bg-neutral-850',
                collapsed ? 'md:w-20' : 'md:w-[250px]'
            )}
        >
            <div
                className={cn(
                    'flex justify-center items-center w-full',
                    !collapsed && 'pr-3.5'
                )}
            >
                {!collapsed && (
                    <p
                        className={cn(
                            'hidden md:block pl-6 font-semibold opacity-75 font-poppins'
                        )}
                    >
                        For You
                    </p>
                )}
                <Hint asChild label="Collapse" side="right">
                    <Button
                        variant="ghost"
                        className={cn(
                            'h-auto p-2 hidden md:block',
                            !collapsed && 'ml-auto'
                        )}
                        onClick={handleCollapse}
                    >
                        {collapsed ? (
                            <ArrowRightFromLine
                                className="w-4 h-4"
                                strokeWidth={1.5}
                            />
                        ) : (
                            <ArrowLeftFromLine
                                className="w-4 h-4"
                                strokeWidth={1.5}
                            />
                        )}
                    </Button>
                </Hint>
            </div>
            <FollowingList
                users={[
                    {
                        id: 1,
                        username: 'teste',
                        imageUrl:
                            'https://res.cloudinary.com/dljee1je7/image/upload/v1701215484/file-upload/kizxdilzoigomuwnfodm.png',
                        isLive: true,
                        viewerCount: 100,
                    },
                ]}
            />
            {!isLoading ? (
                isSuccess && <RecommendedList users={data.users} />
            ) : (
                <RecommendedListSkeleton />
            )}
        </aside>
    );
}

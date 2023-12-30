import { User } from '@/@types/User';
import { useAppSelector } from '@/hooks';
import { cn } from '@/lib/utils';
import { Button } from '@/shadcn/ui/button';
import { Skeleton } from '@/shadcn/ui/skeleton';
import { Hint } from '@components/Hint';
import { UserAvatar, UserAvatarSkeleton } from '@components/UserAvatar';

interface UserItemProps {
    user: User;
}
export const UserItem = ({ user }: UserItemProps) => {
    const { collapsed } = useAppSelector((state) => state.sideBar);
    return (
        <Hint
            asChild
            label={
                collapsed
                    ? user.username
                    : 'This is a big Livestream title for a user so small This is a big Livestream title for a user so small This is a big Livestream title for a user so small '
            }
            size={collapsed ? 'default' : 'md'}
            side="right"
            align="center"
        >
            <Button
                asChild
                variant="ghost"
                className={cn(
                    'flex w-full py-6',
                    collapsed ? 'justify-center' : 'justify-start'
                )}
            >
                <li className="flex gap-x-3 w-full items-center ">
                    <UserAvatar
                        user={user}
                        size="default"
                        isLive={user.isLive}
                    />
                    {!collapsed && (
                        <p className="truncate hidden md:block">
                            {user.username}
                        </p>
                    )}
                    {!collapsed && user.isLive && user.viewerCount && (
                        <div className="hidden md:flex justify-center items-center gap-x-1.5 ml-auto">
                            <span className="h-2 w-2 bg-rose-600 rounded-full"></span>
                            <p className="text-sm text-muted-foreground truncate">
                                {user.viewerCount}
                            </p>
                        </div>
                    )}
                </li>
            </Button>
        </Hint>
    );
};

export const UserItemSkeleton = () => {
    const { collapsed } = useAppSelector((state) => state.sideBar);
    return (
        <Button
            asChild
            variant="ghost"
            className={cn(
                'flex w-full py-6',
                collapsed ? 'justify-center' : 'justify-start'
            )}
        >
            <li className="flex gap-x-3 w-full items-center ">
                <UserAvatarSkeleton size="default" />
                {!collapsed && <Skeleton className="w-1/2 h-2" />}
            </li>
        </Button>
    );
};

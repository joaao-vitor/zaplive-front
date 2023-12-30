import { User } from '@/@types/User';
import { UserItem, UserItemSkeleton } from './userItem';
import { useAppSelector } from '@/hooks';
import { Video } from 'lucide-react';
import { Hint } from '@components/Hint';
import { Button } from '@/shadcn/ui/button';
interface RecommendedListProps {
    users: User[];
}
export const RecommendedList = ({ users }: RecommendedListProps) => {
    const { collapsed } = useAppSelector((state) => state.sideBar);
    return (
        <div className="flex flex-col mt-2 gap-y-2 ">
            {!collapsed ? (
                <p className="hidden md:block pl-6 font-inter text-sm text-muted-foreground">
                    Recommended
                </p>
            ) : (
                <Hint asChild label="Recommended Channels" side="right">
                    <Button
                        variant="ghost"
                        className="md:hidden self-center cursor-default h-auto w-fit p-2"
                    >
                        <Video
                            strokeWidth={1.5}
                            className="h-5 self-center text-muted-foreground"
                        />
                    </Button>
                </Hint>
            )}
            <ul className="flex flex-col gap-y-2 px-2">
                {users.map((user) => (
                    <UserItem key={user.id} user={user} />
                ))}
            </ul>
        </div>
    );
};

export const RecommendedListSkeleton = () => {
    const { collapsed } = useAppSelector((state) => state.sideBar);
    return (
        <div className="flex flex-col mt-2 gap-y-2 ">
            {!collapsed ? (
                <p className="hidden md:block pl-6 font-inter text-sm text-muted-foreground">
                    Recommended
                </p>
            ) : (
                <Hint asChild label="Recommended Channels" side="right">
                    <Button
                        variant="ghost"
                        className="md:hidden self-center cursor-default h-auto w-fit p-2"
                    >
                        <Video
                            strokeWidth={1.5}
                            className="h-5 self-center text-muted-foreground"
                        />
                    </Button>
                </Hint>
            )}
            <ul className="flex flex-col gap-y-2 px-2">
                {[...Array(3)].map((_, index) => (
                    <UserItemSkeleton key={index} />
                ))}
            </ul>
        </div>
    );
};

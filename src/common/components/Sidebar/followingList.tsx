import { User } from '@/@types/User';
import { UserItem } from './userItem';
import { useAppSelector } from '@/hooks';
import { Heart } from 'lucide-react';
import { Hint } from '@components/Hint';
import { Button } from '@/shadcn/ui/button';
interface FollowingListProps {
    users: User[];
}
export const FollowingList = ({ users }: FollowingListProps) => {
    const { collapsed } = useAppSelector((state) => state.sideBar);
    return (
        <div className="flex flex-col mt-2 gap-y-2">
            {!collapsed ? (
                <p className="hidden md:block pl-6 font-inter text-sm text-muted-foreground">
                    Following
                </p>
            ) : (
                <Hint asChild label="Followed channels" side="right">
                    <Button
                        variant="ghost"
                        className="md:hidden self-center cursor-default h-auto w-fit p-2"
                    >
                        <Heart
                            strokeWidth={2}
                            className="h-5 w-5 text-muted-foreground"
                        />
                    </Button>
                </Hint>
            )}
            <ul className="flex flex-col gap-x-2 px-2">
                {users.map((user) => (
                    <UserItem key={user.id} user={user} />
                ))}
            </ul>
        </div>
    );
};

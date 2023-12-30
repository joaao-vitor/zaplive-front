import { User } from '@/@types/User';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/shadcn/ui/skeleton';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { VariantProps, cva } from 'class-variance-authority';

const avatarSizes = cva('rounded-full', {
    variants: {
        size: {
            default: 'h-8 w-8',
            lg: 'h-12 w-12',
            md: 'h-10 w-10',
            sm: 'h-6 w-6',
        },
    },
    defaultVariants: {
        size: 'default',
    },
});
interface UserAvatarProps extends VariantProps<typeof avatarSizes> {
    user: User;
    isLive?: boolean;
}

export const UserAvatar = ({ user, isLive, size }: UserAvatarProps) => {
    return (
        <Avatar>
            <AvatarImage
                src={user.imageUrl}
                className={cn(
                    'object-cover',
                    isLive &&
                        'ring-[1.5px] ring-offset-1 ring-offset-background ring-rose-600 border border-background',
                    avatarSizes({ size })
                )}
            />
            <AvatarFallback
                className={cn('bg-neutral-800 p-2.5', avatarSizes({ size }))}
            >
                {user.username.substring(0, 2).toUpperCase()}
            </AvatarFallback>
        </Avatar>
    );
};

interface UserAvatarSkeletonProps extends VariantProps<typeof avatarSizes> {}

export const UserAvatarSkeleton = ({ size }: UserAvatarSkeletonProps) => {
    return <Skeleton className={cn(avatarSizes({ size }))} />;
};

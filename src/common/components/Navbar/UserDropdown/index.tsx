import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/shadcn/ui/dropdown-menu';

import { Link } from 'react-router-dom';
import { UserAvatar } from '@components/UserAvatar';
import { useLogoutMutation } from '@/features/auth/authSlice';

interface UserDropdownProps {
    user: {
        id: number;
        username: string;
        imageUrl: string;
    };
}

export default function UserDropdown({ user }: UserDropdownProps) {
    const [logout, { isLoading }] = useLogoutMutation();
    const handleLogout = () => {
        logout()
    };
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <UserAvatar user={user} size="md" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel
                    className="flex items-center gap-x-3"
                    asChild
                >
                    <Link to={`/u/${user.username}`}>
                        <UserAvatar user={user} />
                        {user.username}
                    </Link>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuItem>Team</DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

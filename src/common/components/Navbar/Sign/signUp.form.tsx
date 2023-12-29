import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/shadcn/ui/form';
import { Input } from '@/shadcn/ui/input';
import z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/shadcn/ui/button';
import { useToast } from '@/shadcn/ui/use-toast';
import axios from 'axios';

import { useAppDispatch } from '@/hooks';
import { toggleOpen } from '@/features/signDialog/signSlice';

const signUpSchema = z
    .object({
        username: z
            .string()
            .min(4, 'Username must contain at least 4 characters')
            .max(30, 'Username must contain at most 30 characters')
            .refine((s) => !s.includes(' '), 'No Spaces!'),
        email: z.string().email({ message: 'Invalid email address' }),
        password: z
            .string()
            .min(8, 'Password must contain at least 8 characters'),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ['confirmPassword'],
    });

export function SignUpForm() {
    const dispatch = useAppDispatch();

    const { toast } = useToast();
    const form = useForm<z.infer<typeof signUpSchema>>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            username: '',
        },
    });
    async function onSubmit(values: z.infer<typeof signUpSchema>) {
        try {
            const user = await axios.post(
                `${import.meta.env.VITE_API_URL}/auth/sign-up`,
                { ...values }
            );

            toast({
                variant: 'success',
                description:
                    'You created your account, please verify your email',
            });
            dispatch(toggleOpen());
        } catch (error) {
            if (axios.isAxiosError(error)) {
                toast({
                    variant: 'destructive',
                    description:
                        error.response?.data.message || 'Something went wrong',
                });
            }
        }
        console.log(values);
    }
    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col space-y-3"
            >
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem className="group">
                            <FormLabel>Usenarme</FormLabel>
                            <FormControl>
                                <Input placeholder="Username" {...field} />
                            </FormControl>
                            <FormDescription className="hidden group-focus-within:block opacity-0 group-focus-within:opacity-90 transition-opacity delay-1000 duration-300">
                                This is the name that people will know you.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem className="group">
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="Email" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem className="group">
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input
                                    type="password"
                                    placeholder="Password"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription className="hidden group-focus-within:block opacity-0 group-focus-within:opacity-90 transition-opacity delay-1000 duration-300">
                                Your password must have at least 8 characters
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                        <FormItem className="group">
                            <FormLabel>Confirm your password</FormLabel>
                            <FormControl>
                                <Input
                                    type="password"
                                    placeholder="Confirm your password"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="self-end space-x-2">
                    <Button variant="secondary">Cancel</Button>
                    <Button variant="violet" type="submit">
                        Submit
                    </Button>
                </div>
            </form>
        </Form>
    );
}

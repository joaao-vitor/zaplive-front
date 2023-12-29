import {
    Form,
    FormControl,
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
import { Checkbox } from '@/shadcn/ui/checkbox';
import { useToast } from '@/shadcn/ui/use-toast';
import axios from 'axios';

import { useAppDispatch } from '@/hooks';
import { toggleOpen } from '@/features/signDialog/signSlice'

const signInSchema = z.object({
    email: z.string().email(),
    password: z.string(),
    rememberme: z.boolean().optional(),
});

export function SignInForm() {
    const dispatch = useAppDispatch()
    const { toast } = useToast();
    const form = useForm<z.infer<typeof signInSchema>>({
        resolver: zodResolver(signInSchema),
    });
    async function onSubmit(values: z.infer<typeof signInSchema>) {
        try {
            const user = await axios.post(
                `${import.meta.env.VITE_API_URL}/auth/sign-in`,
                {
                    ...values,
                }
            );
            console.log(user)
            toast({
                variant: 'success',
                description: 'You logged in successfully',
            });
            dispatch(toggleOpen())
        } catch (error) {
            if (axios.isAxiosError(error)) {
                toast({
                    variant: 'destructive',
                    description:
                        error.response?.data.message || 'Something went wrong',
                });
            }
        }
    }
    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col space-y-3"
            >
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
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="rememberme"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                />
                            </FormControl>
                            <FormLabel className="ml-2">Remember me</FormLabel>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="self-end space-x-2">
                    <Button variant="secondary">Sing in</Button>
                    <Button variant="violet" type="submit">
                        Submit
                    </Button>
                </div>
            </form>
        </Form>
    );
}

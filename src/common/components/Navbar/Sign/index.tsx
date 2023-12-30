import React, { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/shadcn/ui/dialog';
import Logo from '../logo.jpg';
import { SignUpForm } from './signUp.form';
import { SignInForm } from './signIn.form';
import { Button } from '@/shadcn/ui/button';

import { useAppDispatch, useAppSelector } from '@/hooks';
import { toggleForm, toggleOpen } from '@/features/signDialog/signSlice';

export default function SignInDialog() {
    const { form, open } = useAppSelector((state) => state.sign);
    const dispatch = useAppDispatch();
    const handleForm = () => {
        dispatch(toggleForm());
    };

    const onOpenChange = () => {
        dispatch(toggleOpen());
    };
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogTrigger asChild>
                <Button size="sm" variant="violet">
                    Sign-in
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <img src={Logo} className="w-12 rounded-full self-center" />
                    <div className="flex flex-col items-center -space-y-1">
                        <h1 className="font-semibold text-lg">Welcome!</h1>
                        <h2 className="text-sm text-muted-foreground">
                            Join us
                        </h2>
                    </div>
                </DialogHeader>
                {form === 'signIn' ? <SignInForm /> : <SignUpForm />}
                <DialogFooter className="sm:justify-center">
                    <Button variant="ghost" onClick={handleForm}>
                        {form === 'signIn' ? (
                            <>
                                Don't have an account?{' '}
                                <span className="text-violet-500 font-semibold ml-1">
                                    Sign Up!
                                </span>
                            </>
                        ) : (
                            <>
                                Already have an account?{' '}
                                <span className="text-violet-500 font-semibold ml-1">
                                    Sign In!
                                </span>
                            </>
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

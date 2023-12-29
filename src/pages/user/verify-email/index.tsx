import { toggleOpen } from '@/features/signDialog/signSlice';
import { useAppDispatch } from '@/hooks';
import { Button } from '@/shadcn/ui/button';
import axios from 'axios';
import { AlertTriangle, Loader, ShieldCheck } from 'lucide-react';
import { useEffect, useState, useTransition } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';

export default function VerifyEmail() {
    const dispatch = useAppDispatch();

    const [searchParams] = useSearchParams();
    const email = searchParams.get('email');
    const verificationToken = searchParams.get('token');

    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const [isPending, startTransition] = useTransition();

    const handleSignClick = () => {
        dispatch(toggleOpen());
    };
    useEffect(() => {
        if (!email || !verificationToken) setError(true);

        const fetchVerifyEmail = async () => {
            try {
                const response = await axios.patch(
                    `${import.meta.env.VITE_API_URL}/auth/verify-email`,
                    { email, verificationToken }
                );
                setError(false);
            } catch (error) {
                setError(true);
                if (axios.isAxiosError(error)) {
                    setErrorMsg(error.response?.data.message);
                } else {
                    setErrorMsg(
                        'Something went wrong trying to verify your email, contact an administrator'
                    );
                }
            }
        };
        startTransition(() => {
            fetchVerifyEmail();
        });
    }, []);
    return (
        <div className="h-full flex justify-center items-center">
            <div className="bg-primary-foreground rounded-lg border w-[300px] md:w-[600px] h-80 flex flex-col justify-center items-center gap-y-2 p-2">
                {isPending && (
                    <>
                        <Loader
                            className="text-yellow-600 w-12 h-12"
                            strokeWidth="1.5"
                        />
                        <h1 className="text-lg text-primary font-semibold font-poppins">
                            Wait a second...
                        </h1>
                        <p className="text-sm text-muted-foreground text-center">
                            Just wait a little while we're verifing your account
                        </p>
                    </>
                )}
                {!isPending && !error && (
                    <>
                        <ShieldCheck
                            className="text-emerald-600 w-12 h-12"
                            strokeWidth="1.5"
                        />
                        <h1 className="text-lg text-primary font-semibold font-poppins">
                            Verified!
                        </h1>
                        <p className="text-sm text-muted-foreground text-center">
                            Congrats! Your account has been verified
                            successfully!
                        </p>
                        <Button
                            variant="secondary"
                            className="mt-3"
                            onClick={handleSignClick}
                        >
                            Sign in now!
                        </Button>
                    </>
                )}
                {!isPending && error && (
                    <>
                        <AlertTriangle
                            className="text-red-600 w-12 h-12"
                            strokeWidth="1.5"
                        />
                        <h1 className="text-lg text-primary font-semibold font-poppins">
                            Error!
                        </h1>
                        <p className="text-sm text-muted-foreground text-center">
                            {errorMsg}
                        </p>
                    </>
                )}
            </div>
        </div>
    );
}

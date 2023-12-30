import React from 'react';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/shadcn/ui/tooltip';
import { VariantProps, cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const hintVariants = cva('', {
    variants: {
        size: {
            default: 'h-auto w-auto',
            lg: 'max-h-28 max-w-56 truncate font-regular text-muted-foreground',
            md: 'max-h-28 max-w-48 truncate font-regular text-muted-foreground',
        },
    },
    defaultVariants: {
        size: 'default',
    },
});

interface HintProps extends VariantProps<typeof hintVariants> {
    label: string;
    children: React.ReactNode;
    asChild?: boolean;
    side?: 'top' | 'bottom' | 'left' | 'right';
    align?: 'start' | 'center' | 'end';
}

export const Hint = ({
    label,
    children,
    asChild,
    side,
    align,
    size,
}: HintProps) => {
    return (
        <TooltipProvider>
            <Tooltip delayDuration={0}>
                <TooltipTrigger asChild={asChild}>{children}</TooltipTrigger>
                <TooltipContent
                    side={side}
                    align={align}
                    className={cn(
                        'dark:bg-neutral-800 shadow-md',
                        hintVariants({ size })
                    )}
                >
                    <p className="font-semibold text-wrap truncate">{label}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};

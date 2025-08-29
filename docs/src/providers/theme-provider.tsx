'use client';

import { ThemeType } from '@/constants/theme-type';
import { ThemeProvider as NextThemesProvider, type ThemeProviderProps } from 'next-themes';

export default function ThemeProvider({ children, ...props }: ThemeProviderProps) {
    return (
        <NextThemesProvider
            defaultTheme={ThemeType.Dark}
            attribute="class"
            enableSystem={false}
            storageKey="theme"
            disableTransitionOnChange
            {...props}
        >
            {children}
        </NextThemesProvider>
    );
}
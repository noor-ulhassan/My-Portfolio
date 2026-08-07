"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { Suspense } from "react";

import { ThemeFromQuery } from "./components/ThemeFromQuery";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    return (
        <NextThemesProvider attribute="class" defaultTheme="system" enableSystem={true}>
            <Suspense fallback={null}>
                <ThemeFromQuery />
            </Suspense>
            {children}
        </NextThemesProvider>
    );
}

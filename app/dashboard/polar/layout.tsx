import BackRedirectButton from '@/app/components/backRedirectButton';
import React from 'react';
// import { BackRedirectButton } from '@/app/components/backRedirectButton';

export default function PolarLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="container mx-auto">
            {/* <BackRedirectButton text="Back to Dashboard" href="/dashboard" /> */}
            {children}
        </div>
    );
}

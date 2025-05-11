// app/components/submitButton.tsx
"use client";

import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";

interface iAppProp {
    text: string;
    dataChannel?: string; // Optional prop for channel
    dataEvent?: string; // Optional prop for event name
    dataUserId?: string; // Optional prop for user ID
    dataDescription?: string; // Optional prop for description
    dataIcon?: string; // Optional prop for icon
    dataTags?: Record<string, string>; // Optional prop for tags
}

export default function WaitlistSubmitButton({
    text,
    dataChannel,
    dataEvent,
    dataUserId,
    dataDescription,
    dataIcon,
    dataTags,
}: iAppProp) {
    const { pending } = useFormStatus();

    // Create data attributes for the button
    const dataAttributes = {
        ...(dataChannel ? { "data-channel": dataChannel } : {}),
        ...(dataEvent ? { "data-event": dataEvent } : {}),
        ...(dataUserId ? { "data-user-id": dataUserId } : {}),
        ...(dataDescription ? { "data-description": dataDescription } : {}),
        ...(dataIcon ? { "data-icon": dataIcon } : {}),
        ...((dataTags && Object.keys(dataTags).length > 0) ? dataTags : {}),
    };

    return (
        <>
            {pending ? (
                <Button disabled>
                    <Loader2 className="size-4 mr-2 animate-spin" /> Please wait...
                </Button>
            ) : (
                <Button
                    type="submit"
                    className="bg-white text-black font-bold font-mono py-2 px-4 rounded"
                    {...dataAttributes} // Spread the data attributes
                >
                    {text}
                </Button>
            )}
        </>
    );
}
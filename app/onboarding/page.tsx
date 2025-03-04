"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SubmitButton from "../components/submitButton";
import { useActionState } from "react";
import { useForm } from "@conform-to/react";
import { onboardUser } from "../utils/action";
import { parseWithZod } from "@conform-to/zod";
import { onboardingUserSchema } from "../utils/zodSchema";

export default function OnboardingPage(){

    const [lastResult, action] = useActionState(onboardUser, undefined);
    
    const [form, fields]=useForm({
        lastResult,

        onValidate({formData}){
            return parseWithZod(formData,{
                schema: onboardingUserSchema,
            });
        },

        shouldValidate: "onBlur",
        shouldRevalidate: "onInput",
    });


    return(
        <div className="min-h-screen w-screen flex items-center justify-center">
            <Card className="max-w-sm mx-auto">
                <CardHeader>
                    <CardTitle>
                        Please complete the Onboarding process
                    </CardTitle>
                    <CardDescription>
                        Enter your details
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form
                        className="grid gap-4"
                        action = {action}
                        id={form.id}
                        onSubmit={form.onSubmit}
                        noValidate
                    >
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col gap-2">
                                <Label>First Name</Label>
                                <Input
                                    name={fields.firstName.name}
                                    key={fields.firstName.key}
                                    defaultValue={fields.firstName.initialValue}
                                    placeholder="John"
                                />
                                <p className="text-red-500 text-sm">
                                    {fields.firstName.errors}
                                </p>
                            </div>
                            <div className="grid gap-2">
                                <Label>Last Name</Label>
                                <Input
                                    name={fields.lastName.name}
                                    key={fields.lastName.key}
                                    defaultValue={fields.lastName.initialValue}
                                    placeholder="Doe"
                                />
                                <p className="text-red-500 text-sm">
                                    {fields.lastName.errors}
                                </p>
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <Label>Address</Label>
                            <Input
                                name={fields.address.name}
                                key={fields.address.key}
                                defaultValue={fields.address.initialValue}
                                placeholder="On top of the world!"
                            />
                        </div>
                        <SubmitButton text="Submit"/>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
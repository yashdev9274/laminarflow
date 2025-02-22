import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SubmitButton from "../components/submitButton";

export default function OnboardingPage(){
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
                    >
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col gap-2">
                                <Label>First Name</Label>
                                <Input
                                    placeholder="John"
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label>Last Name</Label>
                                <Input
                                    placeholder="Doe"
                                />
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <Label>Address</Label>
                            <Input
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
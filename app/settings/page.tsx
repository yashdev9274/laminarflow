import { Card, CardContent } from "@/components/ui/card";

export default function UserSettings(){
    return (
        <div>
            <div className="grid grid-cols-3 gap-8 mr-5 ml-5">
                <Card>
                    <CardContent></CardContent>
                </Card>
                <div className="col-span-2">
                    <Card>
                        settings
                    </Card>
                </div>
            </div>
        </div>
    )
}
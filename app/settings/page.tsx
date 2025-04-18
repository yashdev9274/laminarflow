import LogoutComponent from "@/components/dashboard/sidebar/logoutCompnent";
import { Card, CardContent } from "@/components/ui/card";
import { Info, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"


export default function UserSettings(){
    return (
        <div>
            <div className="grid grid-cols-3 gap-8 mr-5 ml-5">
                <Card>
                    <CardContent>
                        <div className="flex items-center gap-4 mb-6 ml-5 mt-5">
                            <div>
                                Profile
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <div className="col-span-2">
                    <Card>
                        <LogoutComponent/>
                    </Card>
                </div>
            </div>
        </div>
    )
}
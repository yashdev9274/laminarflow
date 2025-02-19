import { rewuireUser } from "../utils/requireAuth"

export default async function Dashboard() {

    const session = await rewuireUser() 
    return (
        <div className="flex flex-col items-center justify-center h-screen space-y-4">
            <h1>Dashboard</h1>
        </div>
    )
}
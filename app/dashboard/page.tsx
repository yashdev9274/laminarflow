import SubmitButton from "../components/submitButton"
import { signOut } from "../utils/auth"
import { requireUser } from "../utils/requireAuth"

export default async function Dashboard() {

    const session = await requireUser() 
    return (
        <div className="flex flex-col items-center justify-center h-screen space-y-4">
            <h1>Dashboard</h1>
            <form
                action={async () => {
                "use server"
                await signOut()
                }}
            >

            <SubmitButton/> 
            </form>
        </div>
    )
}
import SubmitButton from "../components/submitButton"
import { signOut } from "../utils/auth"
import { requireUser } from "../utils/requireAuth"

export default async function Dashboard() {

    const session = await requireUser() 
    return (
        <div className="min-h-screen flex items-center justify-center">
            <h1>Dashboard</h1>
            <form
                action={async () => {
                "use server"
                await signOut()
                }}
            >

            <SubmitButton text="LogOut"/> 
            </form>
        </div>
    )
}
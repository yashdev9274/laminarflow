
import UserProfile from "@/components/dashboard/settings/userProfile";
import LogoutComponent from "@/components/dashboard/sidebar/logoutCompnent";




export default function UserSettings(){

    return (
        <div className="flex flex-col gap-8 mr-5 ml-5 p-6 py-9">
            <div>
                <span>Profile</span>
            </div>
            <UserProfile/>
        
            <LogoutComponent/>
        </div>
    )}
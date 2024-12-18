import "../styles/profilePageStyles/profile.css";
import LogoutButton from "../components/profilePageComponents/LogoutButton";
import PfpContainer from "../components/profilePageComponents/PfpContainer";
import UserDetails from "../components/profilePageComponents/UserDetails";
import { useEffect } from "react";

const Profile = () => {
    useEffect(() => {
        document.title = "Your Profile - GameHub";
    }, []);

    return (
        <div className="profile-card-container">
            <div className="profile-card">
                <PfpContainer />
                <UserDetails />
                <LogoutButton />
            </div>
        </div>
    );
};

export default Profile;

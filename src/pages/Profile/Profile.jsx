import { useEffect, useState } from "react"
import userService from "../../services/user.services"

const Profile = () => {

    const [profile, setProfile] = useState()

    useEffect(() => {
        userService.getMyProfile()
            .then((res) => {
                setProfile(res.data)
                console.log(profile);
            })
            .catch((err) => {
                console.error(err)
            })
    }, [])

    return (
        <div>
            <h1>Profile</h1>
        </div>
    )

}

export default Profile
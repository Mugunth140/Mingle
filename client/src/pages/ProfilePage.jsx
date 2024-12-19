import {React, useState} from "react";
import { useAuthStore } from "../store/useAuthStore";
import { GoPerson } from "react-icons/go";
import { MdOutlineMail } from "react-icons/md";
import { FaCameraRotate } from "react-icons/fa6";
import "../sass/pages/ProfilePage.scss";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilepic: base64Image });
    };
  };

  const profileStyle = {
    backgroundRepeat: "no-repeat",
    height: "25vh",
    width: "25vw",
    position: "relative",
    borderTopLeftRadius: "15px",
    borderTopRightRadius: "15px",
    overflow: "hidden",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  };

  const profilePic = {
    height: "200px",
    width: "200px",
    borderRadius: "50%",
    position: "absolute",
    top: "30%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };
  return (
    <>
      <div className="profile-page-container">
        <div className="profile-container">
          <center>
            <img src="./profile-bg.jpg" alt="profile-bg" style={profileStyle} />
          </center>
          <div className="profile-detailes">
            <div className="profile-picture">
              <img
                src={selectedImg || authUser.profilepic || "/avatar.png"}
                alt="Profile"
                style={profilePic}
              />
              <label
                htmlFor="avatar-upload"
                className={`profile-camera ${
                  isUpdatingProfile ? "animate-pulse" : ""
                }`}
              >
                <FaCameraRotate size={25} />
                <input
                  type="file"
                  id="avatar-upload"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>
            <div className="profile-user-detailes">
              <div className="profile-name">
                <label className="profileName">
                  {" "}
                  <span>User Name</span>
                </label>
                <p>
                  <GoPerson color="lightgrey" /> {authUser?.username}
                </p>
              </div>
              <div className="profile-email">
                <label className="profileEmail">
                  {" "}
                  <span>Email Address</span>
                </label>
                <p>
                  <MdOutlineMail color="lightgrey" />
                  {authUser?.email}
                </p>
              </div>
            </div>
            <hr />
            <div className="account-info">
              <div className="account-status">
                <label>Account status</label>
                <p
                  style={
                    authUser ? { color: "rgb(11, 245, 11)" } : { color: "red" }
                  }
                >
                  {authUser ? "Online" : "Offline"}
                </p>
              </div>
              <div className="account-member">
                <label>Member since</label>
                <p>{authUser.createdAt?.split("T")[0]}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;

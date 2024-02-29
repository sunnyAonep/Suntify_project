import axios from "axios";
import React, { useEffect, useState } from "react";
import { api } from "../../config/API";
import styles from "./getUserDetails.module.css";
import { MdModeEditOutline } from "react-icons/md";
import defaultImg from "../../assets/imgs/defultProfile.jpg";
export default function GetUserDetials({ user }) {
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  useEffect(() => {
    setImageUrl(user.profileImg);
  });
  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("userImage", image);

      const imge = await axios.post(
        `http://localhost:1500/api/v1/users/image/${user._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setImageUrl(imge);
      location.reload()
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Error uploading user image.");
    }
  };

  return (
    <div className={styles.UserDitails}>
      <h2>Profile</h2>
      {user && (
        <div className={styles.ProfileContainer}>
          <div id={styles.userImg}>
            {!imageUrl ? (
              <div className={styles.ProfileImageContainer}>
              <input
                type="file"
                id={styles.imageProfile}
                name="image"
                onChange={handleImageChange}
              />
              <MdModeEditOutline
                className={styles.MdModeEditOutline}
                onClick={handleUpload}
              />
              <img src={imageUrl} alt="User" />
            </div>
            ) : (
              <>
                <div className={styles.ProfileImageContainer}>
                  <input
                    type="file"
                    id={styles.imageProfile}
                    name="image"
                    onChange={handleImageChange}
                  />
                  <MdModeEditOutline
                    className={styles.MdModeEditOutline}
                    onClick={handleUpload}
                  />
                  <img src={imageUrl} alt="User" />
                </div>
              </>
            )}
          </div>
          <div id={styles.userInfo}>
            <p>
              <strong>Name:</strong> {user.firstName} {user.lastName}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Role:</strong> {user.role}
            </p>
            <p>
              <strong>Artist:</strong> {user.artist ? "Yes" : "No"}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

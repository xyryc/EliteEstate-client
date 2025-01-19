import { Button, IconButton, Typography } from "@material-tailwind/react";
import useAuth from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import useRole from "../../../hooks/useRole";
import { useState } from "react";
import { LuSave, LuHardDriveUpload } from "react-icons/lu";
import { CgClose } from "react-icons/cg";
import toast from "react-hot-toast";
import { imageUpload } from "../../../api/utils";

function Profile() {
  const { user, logOut, updateUserProfile } = useAuth();
  const navigate = useNavigate();
  const [role] = useRole();

  // edit name
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.displayName || "");
  const [tempName, setTempName] = useState(name);

  const handleEditClick = () => {
    setTempName(name);
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    await updateUserProfile(tempName)
      .then(() => {
        toast.success("Profile updated successfully!");
      })
      // eslint-disable-next-line no-unused-vars
      .catch((error) => {
        toast.error("Failed to update profile.");
      });

    setName(tempName);
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setTempName(name);
    setIsEditing(false);
  };

  // image edit
  const [imagePreview, setImagePreview] = useState(user?.photoURL);

  const handleImageChange = async (e) => {
    const image = e.target.files[0];
    if (image) {
      setImagePreview(URL.createObjectURL(image));
      console.log("Selected Image:", image);

      // 1. Upload the image
      const photoURL = await imageUpload(image);

      // 2. save in firebase
      await updateUserProfile(tempName, photoURL)
        .then(() => {
          toast.success("Profile updated successfully!");
        })
        // eslint-disable-next-line no-unused-vars
        .catch((error) => {
          toast.error("Failed to update profile.");
        });
    }
  };

  return (
    <figure className="relative h-96 w-full">
      <img
        className="h-full w-full rounded-xl object-cover object-center"
        src="https://i.ibb.co.com/WcYpYnp/pexels-cottonbro-8572135.jpg"
        alt="nature image"
      />
      <figcaption className="absolute bottom-8 left-2/4 flex flex-col gap-6 sm:flex-row w-[calc(100%-4rem)] -translate-x-2/4 justify-between rounded-xl bg-white/75 py-4 px-6 shadow-lg shadow-black/5 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          {/* Image Section */}
          <div className="relative w-24 h-24">
            <img
              src={imagePreview}
              alt={user?.displayName}
              className="w-24 h-24 object-cover rounded-full"
            />
            <label
              htmlFor="image-upload"
              className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white opacity-0 hover:opacity-100 rounded-full cursor-pointer transition"
            >
              <LuHardDriveUpload />
            </label>
            <input
              type="file"
              id="image-upload"
              className="hidden"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>

          <div>
            {/* username */}
            <div className="flex items-center gap-4">
              {isEditing ? (
                <>
                  <input
                    type="text"
                    value={tempName}
                    onChange={(e) => setTempName(e.target.value)}
                    className="border border-gray-300 rounded px-2 py-1 focus:outline-none"
                  />
                  <IconButton size="sm" onClick={handleSaveClick}>
                    <LuSave />
                  </IconButton>
                  <IconButton size="sm" onClick={handleCancelClick}>
                    <CgClose />
                  </IconButton>
                </>
              ) : (
                <>
                  <Typography variant="h5">
                    {name}
                  </Typography>
                  <Button size="sm" onClick={handleEditClick}>
                    Edit
                  </Button>
                </>
              )}
            </div>

            {/* email */}
            <Typography color="gray" className="mt-2 font-normal">
              {user?.email}
            </Typography>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {role === "customer" ? (
            ""
          ) : (
            <Button variant="outlined" size="sm" className="border-gray-300">
              Role: {role}
            </Button>
          )}
          <Button
            onClick={() => {
              logOut();
              navigate("/");
            }}
            size="sm"
            variant="gradient"
            className="border-gray-300"
          >
            Log Out
          </Button>
        </div>
      </figcaption>
    </figure>
  );
}

export default Profile;

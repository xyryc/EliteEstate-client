import { Button, Typography } from "@material-tailwind/react";
import useAuth from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import useRole from "../../../hooks/useRole";

function Profile() {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  const [role] = useRole();

  return (
    <figure className="relative h-96 w-full">
      <img
        className="h-full w-full rounded-xl object-cover object-center"
        src="https://i.ibb.co.com/WcYpYnp/pexels-cottonbro-8572135.jpg"
        alt="nature image"
      />
      <figcaption className="absolute bottom-8 left-2/4 flex flex-col gap-6 sm:flex-row w-[calc(100%-4rem)] -translate-x-2/4 justify-between rounded-xl border border-white bg-white/75 py-4 px-6 shadow-lg shadow-black/5 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <img
            src={user?.photoURL}
            alt={user?.displayName}
            className="w-24 h-24 object-cover rounded-full"
          />

          <div>
            <Typography variant="h5" color="blue-gray">
              {user?.displayName}
            </Typography>
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

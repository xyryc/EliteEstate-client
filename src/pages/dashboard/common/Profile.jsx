import {
  Avatar,
  Button,
  Card,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import useAuth from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import useRole from "../../../hooks/useRole";

function Profile() {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  const [role] = useRole();

  return (
    <section className="container mx-auto sm:py-10">
      <Card shadow={false} className="border border-gray-300 rounded-2xl">
        <img
          className="h-44 object-cover w-full rounded-t-2xl"
          src="https://images.unsplash.com/photo-1682407186023-12c70a4a35e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80"
          alt=""
        />

        <CardBody>
          <div className="flex lg:gap-0 gap-6 flex-wrap justify-between items-center">
            <div className="flex items-center gap-3">
              <Avatar src={user?.photoURL} alt="avatar" variant="rounded" />
              <div>
                <Typography color="blue-gray" variant="h6">
                  {user?.displayName}
                </Typography>
                <Typography
                  variant="small"
                  className="font-normal text-gray-600"
                >
                  {user?.email}
                </Typography>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {role === "customer" ? (
                ""
              ) : (
                <Button variant="outlined" className="border-gray-300">
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
          </div>
          <Typography
            variant="small"
            className="font-normal text-gray-600 mt-6"
          >
            Welcome to EliteEstate, your trusted destination for seamless real
            estate management. Explore properties, manage listings, and find
            your dream space—all in one place! Whether you are buying, selling,
            or managing properties, we make the process simple and efficient.
            Let us help you turn your real estate goals into reality with ease
            and confidence!
          </Typography>
        </CardBody>
      </Card>
    </section>
  );
}

export default Profile;

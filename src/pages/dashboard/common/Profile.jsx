import {
  Avatar,
  Button,
  Card,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import useAuth from "../../../hooks/useAuth";

function Profile() {
  const { user } = useAuth();

  return (
    <section className="container mx-auto sm:py-10">
      <Card shadow={false} className="border border-gray-300 rounded-2xl">
        {/* <CardHeader shadow={false} className="h-60 !rounded-lg">
          <image
            src="https://i.ibb.co.com/1RnRLJv/Creative-Problem-Solving.jpg"
            alt="dark"
            className="w-full h-full object-center"
          />
        </CardHeader> */}
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
              <Button
                variant="outlined"
                className="border-gray-300 flex items-center gap-2"
              >
                <i className="fa fa-github text-base" />
                Github
              </Button>
              <Button
                variant="outlined"
                className="border-gray-300 flex items-center gap-2"
              >
                <i className="fa-brands fa-twitter" />
                Twitter
              </Button>
              <Button
                variant="outlined"
                className="border-gray-300 flex items-center gap-2"
              >
                <i className="fa-brands fa-medium" />
                Medium
              </Button>
            </div>
          </div>
          <Typography
            variant="small"
            className="font-normal text-gray-600 mt-6"
          >
            Passionate UI/UX designer focused on creating intuitive and engaging
            digital experiences. <br /> Driven by design thinking, creativity,
            and a love for problem-solving.
          </Typography>
        </CardBody>
      </Card>
    </section>
  );
}

export default Profile;

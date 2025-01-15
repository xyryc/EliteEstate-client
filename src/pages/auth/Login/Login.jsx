import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { TbFidgetSpinner } from "react-icons/tb";
// import { saveUser } from "../../api/utils";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import useAuth from "../../../hooks/useAuth";
import { FcGoogle } from "react-icons/fc";
import { saveUser } from "../../../api/utils";

const Login = () => {
  const { signIn, signInWithGoogle, loading, setLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname || "/";

  // if (loading) return <LoadingSpinner />;
  //   if (user) return <Navigate to={from} replace={true} />;

  // form submit handler
  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      //User Login
      const data = await signIn(email, password);
      console.log(data?.user);

      // save user info in db if user is new
      await saveUser(data?.user);

      navigate(from, { replace: true });
      toast.success("Login Successful");
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
      toast.error(err?.message);
    }
  };

  // Handle Google Signin
  const handleGoogleSignIn = async () => {
    try {
      //User Registration using google
      const data = await signInWithGoogle();
      console.log(data?.user);

      // save user info in db if user is new
      await saveUser(data?.user);

      navigate(from, { replace: true });
      toast.success("Login Successful");
    } catch (err) {
      setLoading(false);
      console.log(err);
      toast.error(err?.message);
    }
  };

  return (
    <div className="flex justify-center items-center py-10">
      <Card className="max-w-lg rounded-lg shadow-none">
        <Typography variant="h4" color="blue-gray" className="text-center">
          Log In
        </Typography>
        <Typography color="gray" className="text-center mt-1">
          Sign in to access your account
        </Typography>
        <form
          onSubmit={handleSubmit}
          className="mt-6 space-y-6 ng-untouched ng-pristine ng-valid"
        >
          {/* Email Input */}
          <Input
            type="email"
            name="email"
            label="Email Address"
            size="lg"
            required
          />
          {/* Password Input */}
          <Input
            type="password"
            name="password"
            label="Password"
            size="lg"
            required
          />
          {/* Forgot Password */}
          {/* <Typography
            variant="small"
            color="gray"
            className="flex justify-end text-xs hover:underline cursor-pointer"
          >
            Forgot password?
          </Typography> */}

          {/* Submit Button */}
          <Button type="submit" className="w-full">
            {loading ? (
              <TbFidgetSpinner className="animate-spin m-auto" />
            ) : (
              "Continue"
            )}
          </Button>
        </form>
        {/* Divider */}
        <Typography
          className="px-3 text-gray-400 text-center my-3"
          variant="small"
        >
          Or sign in with
        </Typography>
        {/* Google Sign-In */}
        <Button
          variant="outlined"
          size="lg"
          className="flex h-12 border-blue-gray-200 items-center justify-center gap-2"
          fullWidth
          onClick={handleGoogleSignIn}
        >
          <FcGoogle size={24} />
          Continue with Google
        </Button>
        {/* Sign Up Link */}
        <Typography className="text-center mt-4 text-sm text-gray-500">
          Don&apos;t have an account?{" "}
          <Link to="/signup" className="font-medium hover:underline">
            Sign Up
          </Link>
        </Typography>
      </Card>
    </div>
  );
};

export default Login;

import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-hot-toast";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import useAuth from "../../../hooks/useAuth";
import { imageUpload, saveUser } from "../../../api/utils";
import { useState } from "react";

const SignUp = () => {
  const {
    createUser,
    updateUserProfile,
    signInWithGoogle,

    setLoading,
  } = useAuth();
  const navigate = useNavigate();
  const [passwordError, setPasswordError] = useState("");

  // Password validation function
  const validatePassword = (password) => {
    const errors = [];
    if (password.length < 6)
      errors.push("Password must be at least 6 characters long.");
    if (!/[A-Z]/.test(password))
      errors.push("Password must include at least one uppercase letter.");
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password))
      errors.push("Password must include at least one special character.");
    return errors;
  };

  // Form submit handler
  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const image = form.image.files[0];

    // Validate password
    const errors = validatePassword(password);
    if (errors.length > 0) {
      setPasswordError(errors.join(" "));
      return;
    } else {
      setPasswordError("");
    }

    // 1. Upload the image
    const photoURL = await imageUpload(image);

    try {
      // 2. Create user
      const result = await createUser(email, password);
      console.log(result?.user);

      // 3. Update user profile
      await updateUserProfile(name, photoURL);

      // 4. Save user info in the database
      await saveUser({ ...result?.user, displayName: name, photoURL });

      navigate("/");
      toast.success("Signup Successful");
    } catch (err) {
      setLoading(false);
      toast.error(err.message);
    }
  };

  // Google Sign-in handler
  const handleGoogleSignIn = async () => {
    try {
      const data = await signInWithGoogle();

      // save user if new
      await saveUser(data?.user);
      navigate("/");

      console.log(data?.user);
      toast.success("Signup Successful");
    } catch (err) {
      setLoading(false);
      toast.error(err.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <Card className="max-w-lg p-6 rounded-lg bg-white shadow-none">
        <Typography variant="h4" color="blue-gray" className="text-center">
          Sign Up
        </Typography>
        <Typography color="gray" className="text-center mt-1">
          Welcome to EliteEstate
        </Typography>
        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
          {/* Name Input */}
          <Input type="text" name="name" label="Your Name" size="lg" required />
          {/* Image Input */}
          <div>
            <Typography variant="small" className="block mb-2">
              Select Image
            </Typography>
            <input
              required
              type="file"
              id="image"
              name="image"
              accept="image/*"
              className="w-full border rounded-md p-2"
            />
          </div>
          {/* Email Input */}
          <Input
            type="email"
            name="email"
            label="Your Email"
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
          {passwordError && (
            <Typography variant="small" color="red" className="mt-2 w-80">
              {passwordError}
            </Typography>
          )}
          {/* Submit Button */}
          <Button type="submit" className="w-full">
            Sign Up
          </Button>
        </form>

        {/* Social Login */}
        <Typography
          className="px-3 text-gray-400 text-center my-3"
          variant="small"
        >
          Or sign up with
        </Typography>

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
        {/* Login Link */}
        <Typography className="text-center mt-4 text-sm text-gray-500">
          Already have an account?{" "}
          <Link to="/login" className="font-medium hover:underline">
            Login
          </Link>
        </Typography>
      </Card>
    </div>
  );
};

export default SignUp;

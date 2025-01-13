import { useState } from "react";
import { Card, Input, Button, Typography } from "@material-tailwind/react";

export default function SignUp() {
  const {
    createUser,
    updateUserProfile,
    signInWithGoogle,
    loading,
    setLoading,
  } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const validatePassword = (password) => {
    const errors = {};
    if (password.length < 6) {
      errors.length = "Password must be at least 6 characters long.";
    }
    if (!/[A-Z]/.test(password)) {
      errors.capital = "Password must contain at least one capital letter.";
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.special = "Password must contain at least one special character.";
    }
    return errors;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const passwordErrors = validatePassword(formData.password);

    if (Object.keys(passwordErrors).length > 0) {
      setErrors(passwordErrors);
    } else {
      setErrors({});
      // Handle successful form submission logic
      console.log(formData);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-8">
      <Card color="transparent" shadow={false}>
        <Typography variant="h4" color="blue-gray" className="text-center">
          Sign Up
        </Typography>
        <Typography color="gray" className="mt-1 font-normal text-center">
          Nice to meet you! Enter your details to register.
        </Typography>
        <form
          className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
          onSubmit={handleSubmit}
        >
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Your Name
            </Typography>
            <Input
              size="lg"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your name"
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Your Email
            </Typography>
            <Input
              size="lg"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="name@mail.com"
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Password
            </Typography>
            <Input
              type="password"
              size="lg"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="********"
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            {errors.length && (
              <Typography color="red" className="text-sm">
                {errors.length}
              </Typography>
            )}
            {errors.capital && (
              <Typography color="red" className="text-sm">
                {errors.capital}
              </Typography>
            )}
            {errors.special && (
              <Typography color="red" className="text-sm">
                {errors.special}
              </Typography>
            )}
          </div>

          <Button className="mt-6" fullWidth type="submit">
            Sign Up
          </Button>
          <Typography color="gray" className="mt-4 text-center font-normal">
            Already have an account?{" "}
            <a href="#" className="font-medium text-gray-900">
              Sign In
            </a>
          </Typography>
        </form>
      </Card>
    </div>
  );
}

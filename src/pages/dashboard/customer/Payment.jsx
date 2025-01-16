import { Typography } from "@material-tailwind/react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

const Payment = () => {
  return (
    <div className="container mx-auto max-w-screen-sm border border-gray-400 rounded-xl py-16">
      <div className="p-4 sm:p-6">
        <Typography variant="lead" color="blue-gray" className="font-bold">
          Payment
        </Typography>
        <Typography className="mb-4 w-80 font-normal text-gray-600 md:w-full">
          Fillup your card details and pay the amount
        </Typography>
      </div>

      <div className="max-w-sm mx-auto">
        <Elements stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      </div>
    </div>
  );
};

export default Payment;

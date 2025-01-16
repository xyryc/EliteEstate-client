import { Button } from "@material-tailwind/react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { LuCircleAlert, LuCircleCheckBig } from "react-icons/lu";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();
  const { user } = useAuth();

  const { data: payableData = [] } = useQuery({
    queryKey: ["payableData", id],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/payableData/${id}`);
      return data;
    },
  });

  useEffect(() => {
    if (payableData.offeredPrice > 0) {
      axiosSecure
        .post("/create-payment-intent", { price: payableData.offeredPrice })
        .then((res) => {
          console.log(res.data.clientSecret);
          setClientSecret(res.data.clientSecret);
        });
    }
  }, [axiosSecure, payableData.offeredPrice]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card === null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("Payment error", error);
      setError(error.message);
    } else {
      console.log("Payment method", paymentMethod);
      setError("");
    }

    // confirm payment
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.displayName || "anonymous",
          },
        },
      });

    if (confirmError) {
      console.log("Confirm error");
    } else {
      console.log("payment intent", paymentIntent);
      if (paymentIntent.status === "succeeded") {
        console.log("transaction id", paymentIntent.id);
        setTransactionId(paymentIntent.id);
      }
    }
  };

  return (
    <div>
      <p className="opacity-90 mb-2 font-poppins">
        Payable Amount: ${payableData.offeredPrice}
      </p>
      {error && (
        <p className="text-red-500 mb-6 text-sm font-medium flex items-center gap-2">
          <LuCircleAlert /> {error}
        </p>
      )}

      {transactionId && (
        <p className="text-green-500 mb-6 text-sm font-medium flex items-center gap-2">
          <LuCircleCheckBig /> Transaction Id:{" "}
          <span className="font-bold">{transactionId}</span>
        </p>
      )}

      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <Button
          type="submit"
          disabled={!stripe || !clientSecret}
          className="my-10"
        >
          Pay
        </Button>
      </form>
    </div>
  );
};

export default CheckoutForm;

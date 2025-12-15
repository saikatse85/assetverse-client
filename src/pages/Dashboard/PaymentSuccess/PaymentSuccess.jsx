import { useEffect, useState } from "react";
import { useSearchParams } from "react-router"; // <- routing fix

const PaymentSuccess = () => {
  const [params] = useSearchParams();
  const session_id = params.get("session_id"); // Stripe session ID from URL

  const [paymentData, setPaymentData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session_id) return;

    const verifyPayment = async () => {
      try {
        const res = await fetch(
          `https://assetverse-server-lyart.vercel.app/verify-payment?session_id=${session_id}`
        );
        const data = await res.json();

        if (data.success) {
          setPaymentData(data.payment);
        }
      } catch (error) {
        console.error("Payment verification failed:", error);
      } finally {
        setLoading(false);
      }
    };

    verifyPayment();
  }, [session_id]);
  return (
    <div className="min-h-screen flex items-center justify-center text-center">
      <div className="p-8 rounded-md shadow-md bg-white max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-green-600">
          Payment Successful 🎉
        </h2>

        {loading ? (
          <p>Verifying payment...</p>
        ) : paymentData ? (
          <>
            <p className="text-lg font-bold">
              Package: {paymentData.packageName}
            </p>
            <p>
              Amount Paid: <b>${paymentData.amount / 100}</b>
            </p>
            <p className="text-gray-600">Email: {paymentData.hrEmail}</p>

            <a
              href="/dashboard"
              className="btn bg-green-500 text-white w-full mt-4"
            >
              Go to Dashboard
            </a>
          </>
        ) : (
          <p className="text-red-600">Payment verification failed ❌</p>
        )}
      </div>
    </div>
  );
};

export default PaymentSuccess;

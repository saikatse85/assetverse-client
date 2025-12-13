import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["payments", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `https://assetverse-server-lyart.vercel.app/payments/${user.email}`
      );
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Payment History</h2>
      <table className="table w-full">
        <thead>
          <tr>
            <th>Package Name</th>
            <th>Employee Limit</th>
            <th>Amount ($)</th>
            <th>Transaction ID</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((p) => (
            <tr key={p._id}>
              <td>{p.packageName}</td>
              <td>{p.employeeLimit}</td>
              <td>{p.amount}</td>
              <td>{p.transactionId}</td>
              <td>{new Date(p.paymentDate).toLocaleString()}</td>
              <td className="text-green-600">{p.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentHistory;

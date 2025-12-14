import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import toast from "react-hot-toast";
import useRole from "../../../hooks/useRole";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MyProfile = () => {
  const { user: loggedUser } = useAuth();
  const [user, setUser] = useState(null);
  const [isRoleLoading] = useRole();
  const axiosSecure = useAxiosSecure();

  // 🔹 Load User Profile from Backend
  useEffect(() => {
    if (!loggedUser?.email) return;

    axiosSecure
      .get(
        `https://assetverse-server-lyart.vercel.app/profile/${loggedUser.email}`
      )
      .then((res) => setUser(res.data))
      .catch((err) => console.log(err));
  }, [loggedUser]);

  // 🟦 Loading State
  if (!user || isRoleLoading) return <LoadingSpinner />;

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imgURL = URL.createObjectURL(file);
      setUser({ ...user, profileImage: imgURL });
    }
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    toast.success("Profile Updated Successfully!");
    // You can add axios PATCH here to save updates to backend
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0d1b2a] to-[#1e3148] flex justify-center items-center px-5 py-10">
      <div className="bg-[#0e2433] shadow-xl rounded-2xl p-8 w-full max-w-[850px] border border-[#1b3c53] backdrop-blur-md">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row items-center gap-6 mb-10">
          {/* Profile Image Upload */}
          <div className="relative group">
            <img
              src={user.profileImage || "/default-avatar.png"}
              alt="Profile"
              className="w-40 h-40 rounded-full object-cover border-4 border-[#00d4ff] shadow-lg"
            />
            <label className="absolute inset-0 bg-black/50 rounded-full flex justify-center items-center opacity-0 group-hover:opacity-100 cursor-pointer transition font-semibold text-sm text-white">
              Change
              <input
                type="file"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-white">{user.name}</h2>
            <p className="text-gray-300 text-sm">User Profile</p>
          </div>
        </div>

        {/* Form Section */}
        <form
          onSubmit={handleUpdate}
          className="grid md:grid-cols-2 gap-6 text-white"
        >
          <div>
            <label className="text-sm text-gray-400">Full Name</label>
            <input
              className="w-full mt-1 bg-[#112a3a] border border-[#1b4a64] focus:border-[#00d4ff] transition px-3 py-2 rounded-lg outline-none"
              defaultValue={user.name}
            />
          </div>

          <div>
            <label className="text-sm text-gray-400">Email (Read-Only)</label>
            <input
              readOnly
              className="w-full mt-1 bg-[#112a3a] border border-[#1b4a64] text-gray-500 px-3 py-2 rounded-lg cursor-not-allowed"
              defaultValue={user.email}
            />
          </div>

          <div>
            <label className="text-sm text-gray-400">Phone</label>
            <input
              className="w-full mt-1 bg-[#112a3a] border border-[#1b4a64] focus:border-[#00d4ff] px-3 py-2 rounded-lg"
              defaultValue={user.phone || ""}
            />
          </div>

          <div>
            <label className="text-sm text-gray-400">Address</label>
            <input
              className="w-full mt-1 bg-[#112a3a] border border-[#1b4a64] focus:border-[#00d4ff] px-3 py-2 rounded-lg"
              defaultValue={user.address || ""}
            />
          </div>

          {/* Company Affiliations Display */}
          <div className="md:col-span-2">
            <h3 className="text-lg font-semibold mb-2 text-[#00d4ff]">
              Affiliated Companies
            </h3>
            <div className="flex flex-wrap gap-2">
              {user.affiliations?.length > 0 ? (
                user.affiliations.map((c, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 text-sm rounded-full bg-[#113b52] text-[#00eaff] border border-[#0bd7ff]"
                  >
                    {c}
                  </span>
                ))
              ) : (
                <p className="text-gray-400">No affiliated companies</p>
              )}
            </div>
          </div>
        </form>

        {/* Save Button */}
        <div className="mt-8 text-center">
          <button
            onClick={handleUpdate}
            className="px-8 py-3 text-lg font-semibold rounded-xl bg-[#00e5ff] hover:bg-[#00bcd4] text-[#002b36] shadow-[0_0_15px_#00eaff] transition"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;

import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";

export default function MyProfile() {

  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 to-red-100">

      <Navbar />

      <div className="flex items-center justify-center p-6">

        <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl p-8">

          <div className="flex flex-col items-center">

            <img
              src="https://i.pravatar.cc/200"
              alt=""
              className="w-36 h-36 rounded-full border-4 border-orange-500 shadow-lg"
            />

            <h1 className="text-4xl font-black mt-6 text-gray-800">
              {user?.name}
            </h1>

            <p className="text-gray-500 mt-2 text-lg">
              {user?.email}
            </p>

            <div className="mt-8 grid grid-cols-2 gap-4 w-full">

              <div className="bg-orange-100 rounded-2xl p-5 text-center">
                <h2 className="text-2xl font-black text-orange-500">
                  User
                </h2>

                <p className="text-gray-600 mt-1">
                  Role
                </p>
              </div>

              <div className="bg-red-100 rounded-2xl p-5 text-center">
                <h2 className="text-2xl font-black text-red-500">
                  Active
                </h2>

                <p className="text-gray-600 mt-1">
                  Status
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
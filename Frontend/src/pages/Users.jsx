import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

export default function Users() {

  const [users, setUsers] = useState([]);

  const [loading, setLoading] = useState(true);


  useEffect(() => {

    fetchUsers();

  }, []);


  const fetchUsers = async () => {

    try {

      const res = await axios.get(
        "http://localhost:5000/users"
      );

      setUsers(res.data);

      setLoading(false);

    } catch (error) {

      console.log(error);

      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 to-red-100">

      <Navbar />

      <div className="max-w-7xl mx-auto p-6">

        <h1 className="text-4xl font-black text-center text-orange-500 mb-10">
          All Users
        </h1>


        {loading ? (

          <div className="text-center text-2xl font-bold">
            Loading...
          </div>

        ) : (

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

            {users.map((user) => (

              <div
                key={user._id}
                className="bg-white rounded-3xl shadow-xl p-6 hover:scale-105 transition"
              >

                <div className="flex flex-col items-center">

                  <img
                    src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`}
                    alt=""
                    className="w-28 h-28 rounded-full border-4 border-orange-500"
                  />

                  <h2 className="text-2xl font-bold mt-4 text-gray-800">
                    {user.name}
                  </h2>

                  <p className="text-gray-500 mt-1">
                    {user.email}
                  </p>

                  <span className="mt-4 bg-orange-100 text-orange-500 px-4 py-2 rounded-full font-semibold">
                    {user.role}
                  </span>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
}
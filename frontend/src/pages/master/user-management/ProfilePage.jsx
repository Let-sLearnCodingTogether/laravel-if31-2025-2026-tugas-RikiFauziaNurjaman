import { useCallback, useEffect, useState } from "react";
import http from "../../../api/apiClient";
import Header from "../../../components/layout/Header";

export default function ProfilePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState("");

  const fetchUser = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await http.get("/user/profile");
      console.log(response.data.user);
      setUser(response.data.user);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <div className="max-w-3xl mx-auto mt-10 shadow-lg rounded-2xl p-6 bg-white">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <img
            src={user.avatar}
            alt=""
            className="w-32 h-32 rounded-full border-4 border-blue-500 object-cover"
          />
          <div className="mt-4 space-y-2 w-full">
            <div>
              <label className="block text-gray-800 text-sm font-medium">
                Nama
              </label>
              <input
                type="text"
                value={user.name}
                disabled
                className="w-full border rounded-lg px-3 py-2 bg-gray-100"
              />
            </div>
            <div>
              <label className="block text-gray-800 text-sm font-medium">
                Email
              </label>
              <input
                type="text"
                value={user.email}
                disabled
                className="w-full border rounded-lg px-3 py-2 bg-gray-100"
              />
            </div>
            <div>
              <label className="block text-gray-800 text-sm font-medium">
                Role
              </label>
              <input
                type="text"
                value={user.role}
                disabled
                className="w-full border rounded-lg px-3 py-2 bg-gray-100"
              />
            </div>
          </div>
        </div>
        <div className="mt-6 pt-4 text-gray-700 border-t">
          <p>
            <span className="font-semibold">Tanggal dibuat:</span>{" "}
            {new Date(user.created_at).toLocaleDateString("id-ID")}
          </p>
          <p>
            <span className="font-semibold">Terakhir diperbarui:</span>{" "}
            {new Date(user.updated_at).toLocaleDateString("id-ID")}
          </p>
        </div>
        <div className="mt-10 border-t pt-6">
          <h3 className="text-xl font-semibold mb-4">Ganti Password</h3>
          <form action="" className="space-y-4">
            <div>
              <label className="block text-gray-800 text-sm font-medium">
                Password Lama
              </label>
              <input
                type="password"
                name="current_password"
                className="w-full border rounded-lg px-3 py-2 bg-gray-100"
                required
              />
            </div>
            <div>
              <label className="block text-gray-800 text-sm font-medium">
                Password Baru
              </label>
              <input
                type="password"
                name="new_password"
                className="w-full border rounded-lg px-3 py-2 bg-gray-100"
                required
              />
            </div>
            <div>
              <label className="block text-gray-800 text-sm font-medium">
                Konfirmasi Password
              </label>

              <input
                type="text"
                className="w-full border rounded-lg px-3 py-2 bg-gray-100"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Simpan Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

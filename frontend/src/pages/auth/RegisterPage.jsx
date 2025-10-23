import { useState } from "react";
import http from "../../api/apiClient";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { NavLink, useNavigate } from "react-router";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm, processing] = useState({
    avatar: null,
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    role: "user",
  });

  const [preview, setPreview] = useState(null);

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setForm({ ...form, avatar: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await http.post("/registrasi", form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      navigate("/login");
      console.log(response);
    } catch (error) {
      console.log("register gagal", error);
    }
  };

  return (
    <div className="flex min-h-screen flex-col justify-center px-6 py-5 lg:px-8 bg-blue-400">
      <div className="mt-0 sm:mx-auto sm:w-full sm:max-w-md bg-white shadow-lg rounded-2xl p-6">
        <h2 className="text-2xl font-bold text-center mb-6">Registrasi Akun</h2>
        <form action="" onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col items-center">
            {preview ? (
              <img
                src={preview}
                alt="Cek Preview"
                className="w-24 h-24 rounded-full object-cover mb-2"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-gray-200 flex item-center justify-center text-gray-500 mb-2">
                no image
              </div>
            )}
            <label
              htmlFor="avatar"
              className="cursor-pointer text-sm text-blue-600 hover:underline"
            >
              <input
                type="file"
                id="avatar"
                accept="image/*"
                className="hidden"
                name="avatar"
                onChange={handleAvatarChange}
              />
              Pilih avatar
            </label>
          </div>
          <div>
            <label htmlFor="name" className="block text-sm font-medium">
              Nama Lengkap
            </label>
            <Input
              type="text"
              name="name"
              placeholder="Nama Lengkap"
              value={form.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <Input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <Input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
            />
          </div>
          <div>
            <label
              htmlFor="password_confirmation"
              className="block text-sm font-medium"
            >
              Konfirmasi Password
            </label>
            <Input
              type="password"
              name="password_confirmation"
              placeholder="Konfirmasi Password"
              value={form.password_confirmation}
              onChange={handleChange}
            />
          </div>

          <Button type="submit">
            {processing ? "Mendaftar..." : "Daftar"}
          </Button>
        </form>
        <p class="mt-10 text-center text-sm/6 text-gray-500">
          Sudah punya akun?
          <NavLink
            to="/"
            className="font-semibold text-blue-800 hover:text-indigo-500"
          >
            Login disini
          </NavLink>
        </p>
      </div>
    </div>
  );
}

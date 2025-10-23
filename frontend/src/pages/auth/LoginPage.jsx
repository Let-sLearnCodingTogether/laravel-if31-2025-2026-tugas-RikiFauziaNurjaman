import { useState } from "react";
import http from "../../api/apiClient";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { NavLink, useNavigate } from "react-router";

export default function LoginPage() {
  const [remember, setRemember] = useState(false);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      localStorage.removeItem("token");
      sessionStorage.removeItem("token");
      localStorage.removeItem("user");
      sessionStorage.removeItem("user");

      const response = await http.post("/login", form);
      const token = response.data.access_token;
      const user = response.data.user;

      console.log(user);
      console.log(token);

      if (remember) {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
      } else {
        sessionStorage.setItem("token", token);
        sessionStorage.setItem("user", JSON.stringify(user));
      }
      navigate("/");
    } catch (error) {
      console.log("login gagal", error);
    }
  };

  return (
    <div className="flex min-h-screen flex-col justify-center px-6 py-12 lg:px-8 bg-blue-400">
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md bg-white shadow-lg rounded-2xl p-6">
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="email">Email</label>
            <Input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <Input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
            />
          </div>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={remember}
              onChange={() => setRemember(!remember)}
            />
            Ingat saya
          </label>

          <Button type="submit">Login</Button>
        </form>
        <p className="mt-10 text-center text-sm/6 text-gray-500">
          Belum punya akun?
          <NavLink
            to="/register"
            className="font-semibold text-blue-600 hover:text-indigo-500"
          >
            Registrasi disini
          </NavLink>
        </p>
      </div>
    </div>
  );
}

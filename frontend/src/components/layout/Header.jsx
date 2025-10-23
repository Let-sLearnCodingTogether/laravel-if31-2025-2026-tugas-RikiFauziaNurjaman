import UserProfile from "../userProfile/UserProfile";

export default function Header() {
  return (
    <div className="flex items-center justify-between shadow h-16 bg-blue-500 text-white font-bold py-2 px-4 rounded-lg">
      <h2 className="text-2xl font-bold">Aplikasi Inventaris Barang Pribadi</h2>
      <UserProfile />
    </div>
  );
}

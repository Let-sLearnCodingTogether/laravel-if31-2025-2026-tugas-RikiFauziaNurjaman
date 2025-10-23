import { useCallback, useEffect, useState } from "react";
import http from "../../../api/apiClient";
import { NavLink, useNavigate } from "react-router";
import Swal from "sweetalert2";
import Header from "../../../components/layout/Header";

export default function ItemPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [items, setItems] = useState([]);

  const fetchItems = useCallback(async () => {
    try {
      const response = await http.get("/items");
      console.log(response);
      setItems(response.data.data);
    } catch (error) {
      if (error.response?.status === 401) {
        navigate("/login");
      }
    } finally {
      setIsLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    setIsLoading(true);
    fetchItems();
  }, [fetchItems]);

  const handleUpdate = (id) => {
    navigate(`/update-items/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      const response = await Swal.fire({
        title: "Apakah anda yakin ingin hapus data ini?",
        text: "Data yang sudah terhapus tidak dapat dikembalikan!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ya, hapus data ini!",
        cancelButtonText: "Batal",
      });
      if (!response.isConfirmed) return;

      await http.delete(`/items/${id}`);
      await fetchItems();

      Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: "Data berhasil dihapus",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.log("delete gagal", error);
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: "Data gagal dihapus",
      });
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID");
  };

  return (
    <div className="container mx-auto space-y-5 mt-6">
      <Header />
      <div className="flex gap-3">
        <h3 className="text-2xl font-bold text-center">Daftar Item</h3>
        <NavLink
          to="/create-items"
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700"
        >
          Tambah Data baru
        </NavLink>
      </div>
      <div className="overflow-x-auto shadow rounded-lg">
        <table className="table-auto w-full">
          <thead className="bg-gray-200 text-gray-600 uppercase text-sm">
            <tr className="border-b border-gray-500">
              <th className="px-4 py-2">No</th>
              <th className="px-4 py-2">Tanggal Beli</th>
              <th className="px-4 py-2">Nama Item</th>
              <th className="px-4 py-2">Kondisi</th>
              <th className="px-4 py-2">Harga</th>
              <th className="px-4 py-2">Jumlah</th>
              <th className="px-4 py-2">Lokasi</th>
              <th className="px-4 py-2">Aksi</th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-600">
            {items.map((item, index) => (
              <tr
                key={item.id}
                className="border-b border-gray-500 hover:bg-gray-100 cursor-pointer"
              >
                <td className="px-4 py-2 text-center">{index + 1}</td>
                <td className="px-4 py-2 text-center">
                  {formatDate(item.purchase_date)}
                </td>
                <td className="px-4 py-2 text-center">{item.item_name}</td>
                <td className="px-4 py-2 text-center">{item.condition}</td>
                <td className="px-4 py-2 text-center">{item.price}</td>
                <td className="px-4 py-2 text-center">{item.quantity}</td>
                <td className="px-4 py-2 text-center">{item.location}</td>
                <td className="px-4 py-2 flex gap-2 justify-center">
                  <button
                    className="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold px-3 py-1 rounded-lg"
                    onClick={() => handleUpdate(item.id)}
                  >
                    Update
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white font-semibold px-3 py-1 rounded-lg"
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

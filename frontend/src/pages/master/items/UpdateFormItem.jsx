import { useNavigate, useParams } from "react-router";
import http from "../../../api/apiClient";
import Input from "../../../components/ui/Input";
import { useCallback, useEffect, useState } from "react";

export default function UpdateFormItem() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    purchase_date: "",
    item_name: "",
    condition: "",
    price: "",
    quantity: "",
    location: "",
  });

  const fetchItem = useCallback(async () => {
    try {
      const response = await http.get(`/items/${id}`);
      setForm(response.data.data);
    } catch (error) {
      console.log("gagal ambil data item", error);
    }
  }, [id]);

  useEffect(() => {
    fetchItem();
  }, [fetchItem]);

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
      const response = await http.put(`/items/${id}`, form);
      console.log(response);
      navigate("/");
    } catch (error) {
      console.log("update gagal", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-2xl p-6 space-y-4">
        <div className="text-center pb-4">
          <h1 className="text-2xl font-bold text-blue-600">Update Item</h1>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="purchase_date">Tanggal Beli</label>
            <Input
              type="date"
              id="purchase_date"
              name="purchase_date"
              placeholder="Tanggal Beli"
              value={form.purchase_date || ""}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="item_name">Nama Item</label>
            <Input
              type="text"
              id="item_name"
              name="item_name"
              placeholder="Nama Item"
              value={form.item_name || ""}
              onChange={handleChange}
            />
          </div>
          <div>
            <label
              htmlFor="condition"
              className="block text-sm text-zinc-800  font-medium mb-2"
            >
              Kondisi
            </label>
            <select
              name="condition"
              id="condition"
              value={form.condition || ""}
              onChange={handleChange}
              className="w-full border-gray-300 rounded-lg shadow-sm p-3"
            >
              <option value="">-- Pilih Kondisi --</option>
              <option value="bagus">Bagus</option>
              <option value="rusak">Rusak</option>
            </select>
          </div>
          <div>
            <label htmlFor="price">Harga</label>
            <Input
              type="number"
              id="price"
              name="price"
              placeholder="Harga"
              value={form.price || ""}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="quantity">Jumlah</label>
            <Input
              type="number"
              id="quantity"
              name="quantity"
              placeholder="Jumlah"
              value={form.quantity || ""}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="location">Lokasi</label>
            <Input
              type="text"
              id="location"
              name="location"
              placeholder="Lokasi"
              value={form.location || ""}
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

import { useState } from "react";
import api from "../services/api";
import toast from "react-hot-toast";

const MilkForm = ({
  fetchEntries,
  fetchReport,
}) => {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    date: new Date().toISOString().split("T")[0],
    liters: "",
    pricePerLiter: "",
    vendor: "Regular Milkman",
    notes: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.liters) {
      return toast.error("Enter liters");
    }

    if (!form.pricePerLiter) {
      return toast.error("Enter price per liter");
    }

    if (Number(form.liters) <= 0) {
      return toast.error("Liters must be greater than 0");
    }

    if (Number(form.pricePerLiter) <= 0) {
      return toast.error("Price must be greater than 0");
    }

    try {
      setLoading(true);

      await api.post("/milk", form);

      toast.success("Milk Entry Added Successfully");

      setForm({
        date: new Date().toISOString().split("T")[0],
        liters: "",
        pricePerLiter: "",
        vendor: "Regular Milkman",
        notes: "",
      });

      fetchEntries();
      fetchReport();
    } catch (err) {
      console.error(err);
      toast.error("Failed to add entry");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="
        bg-white
        rounded-3xl
        shadow-xl
        overflow-hidden
        mb-8
      "
    >
      <div
        className="
          bg-gradient-to-r
          from-blue-600
          to-indigo-600
          p-6
        "
      >
        <h2 className="text-2xl font-bold text-white">
          Add Milk Entry
        </h2>

        <p className="text-blue-100 mt-1">
          Record today's milk delivery
        </p>
      </div>

      <div className="p-6">
        <div className="grid md:grid-cols-2 gap-4">

          <input
            type="date"
            value={form.date}
            className="
              border
              p-3
              rounded-xl
              focus:outline-none
              focus:ring-2
              focus:ring-blue-500
            "
            onChange={(e) =>
              setForm({
                ...form,
                date: e.target.value,
              })
            }
          />

          <input
            type="number"
            placeholder="Milk Liters"
            value={form.liters}
            className="
              border
              p-3
              rounded-xl
              focus:outline-none
              focus:ring-2
              focus:ring-blue-500
            "
            onChange={(e) =>
              setForm({
                ...form,
                liters: e.target.value,
              })
            }
          />

          <input
            type="number"
            placeholder="Price Per Liter"
            value={form.pricePerLiter}
            className="
              border
              p-3
              rounded-xl
              focus:outline-none
              focus:ring-2
              focus:ring-blue-500
            "
            onChange={(e) =>
              setForm({
                ...form,
                pricePerLiter: e.target.value,
              })
            }
          />

          <input
            type="text"
            placeholder="Vendor Name"
            value={form.vendor}
            className="
              border
              p-3
              rounded-xl
              focus:outline-none
              focus:ring-2
              focus:ring-blue-500
            "
            onChange={(e) =>
              setForm({
                ...form,
                vendor: e.target.value,
              })
            }
          />
        </div>

        <textarea
          placeholder="Notes (Optional)"
          rows="4"
          value={form.notes}
          className="
            border
            p-3
            rounded-xl
            w-full
            mt-4
            resize-none
            focus:outline-none
            focus:ring-2
            focus:ring-blue-500
          "
          onChange={(e) =>
            setForm({
              ...form,
              notes: e.target.value,
            })
          }
        />

        <button
          type="submit"
          disabled={loading}
          className="
            mt-5
            w-full
            bg-blue-600
            hover:bg-blue-700
            text-white
            py-3
            rounded-xl
            font-semibold
            transition
            disabled:opacity-50
          "
        >
          {loading
            ? "Saving..."
            : "Save Entry"}
        </button>
      </div>
    </form>
  );
};

export default MilkForm;
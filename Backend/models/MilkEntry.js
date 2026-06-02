import { useState } from "react";
import api from "../services/api";
import toast from "react-hot-toast";

const EditEntryModal = ({
  entry,
  onClose,
  refresh,
}) => {

  const [form, setForm] =
    useState({
      liters: entry.liters,
      pricePerLiter:
        entry.pricePerLiter,
      vendor: entry.vendor,
    });

  const updateEntry =
    async () => {

      try {

        await api.put(
          `/milk/${entry._id}`,
          form
        );

        toast.success(
          "Entry Updated"
        );

        refresh();

        onClose();

      } catch {

        toast.error(
          "Update Failed"
        );
      }
    };

  return (
    <div className="
      fixed inset-0
      bg-black/50
      flex
      items-center
      justify-center
    ">

      <div className="
        bg-white
        p-6
        rounded-2xl
        w-96
      ">

        <h2 className="
          text-xl font-bold mb-4
        ">
          Edit Entry
        </h2>

        <input
          type="number"
          value={form.liters}
          className="
          w-full border p-3 mb-3
          rounded-lg
        "
          onChange={(e)=>
            setForm({
              ...form,
              liters:e.target.value
            })
          }
        />

        <input
          type="number"
          value={
            form.pricePerLiter
          }
          className="
          w-full border p-3 mb-3
          rounded-lg
        "
          onChange={(e)=>
            setForm({
              ...form,
              pricePerLiter:e.target.value
            })
          }
        />

        <button
          onClick={updateEntry}
          className="
          bg-blue-600
          text-white
          px-4 py-2
          rounded-lg
        "
        >
          Save
        </button>

      </div>

    </div>
  );
};

export default EditEntryModal;
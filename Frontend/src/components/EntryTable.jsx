import { useState } from "react";
import api from "../services/api";
import EditEntryModal from "./EditEntryModal";

const EntryTable = ({
  entries,
  fetchEntries,
  fetchReport,
}) => {
  const [selected, setSelected] = useState(null);

  const deleteEntry = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this entry?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/milk/${id}`);

      fetchEntries();
      fetchReport();
    } catch (error) {
      console.error(error);
      alert("Failed to delete entry");
    }
  };

  return (
    <>
      {selected && (
        <EditEntryModal
          entry={selected}
          onClose={() => setSelected(null)}
          refresh={() => {
            fetchEntries();
            fetchReport();
            setSelected(null);
          }}
        />
      )}

      <div
        className="
          bg-white
          rounded-3xl
          shadow-xl
          overflow-hidden
          border
          border-slate-200
        "
      >
        <div
          className="
            px-6
            py-5
            border-b
            bg-gradient-to-r
            from-blue-600
            to-indigo-600
          "
        >
          <h2
            className="
              text-white
              text-xl
              font-bold
            "
          >
            Milk Entries
          </h2>

          <p
            className="
              text-blue-100
              text-sm
              mt-1
            "
          >
            Manage daily milk records
          </p>
        </div>

        {entries?.length === 0 ? (
          <div
            className="
              p-12
              text-center
            "
          >
            <h3
              className="
                text-lg
                font-semibold
                text-slate-700
              "
            >
              No Entries Found
            </h3>

            <p
              className="
                text-slate-500
                mt-2
              "
            >
              Add your first milk entry.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr
                  className="
                    bg-slate-100
                    text-slate-700
                  "
                >
                  <th className="p-4 text-left">
                    Date
                  </th>

                  <th className="p-4 text-left">
                    Liters
                  </th>

                  <th className="p-4 text-left">
                    Rate
                  </th>

                  <th className="p-4 text-left">
                    Total
                  </th>

                  <th className="p-4 text-center">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {entries.map((entry) => (
                  <tr
                    key={entry._id}
                    className="
                      border-t
                      hover:bg-slate-50
                      transition
                    "
                  >
                    <td className="p-4">
                      {new Date(
                        entry.date
                      ).toLocaleDateString()}
                    </td>

                    <td className="p-4 font-medium">
                      {entry.liters} L
                    </td>

                    <td className="p-4">
                      ₹{entry.pricePerLiter}
                    </td>

                    <td
                      className="
                        p-4
                        font-semibold
                        text-green-600
                      "
                    >
                      ₹{entry.total}
                    </td>

                    <td
                      className="
                        p-4
                        flex
                        justify-center
                        gap-3
                      "
                    >
                      <button
                        onClick={() =>
                          setSelected(entry)
                        }
                        className="
                          px-4
                          py-2
                          rounded-xl
                          bg-blue-600
                          text-white
                          hover:bg-blue-700
                          transition
                          text-sm
                          font-medium
                        "
                      >
                        Edit
                      </button>

                      <button
                        onClick={() =>
                          deleteEntry(entry._id)
                        }
                        className="
                          px-4
                          py-2
                          rounded-xl
                          bg-red-600
                          text-white
                          hover:bg-red-700
                          transition
                          text-sm
                          font-medium
                        "
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default EntryTable;
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import api from "../services/api";

import SummaryCards from "../components/SummaryCards";
import MilkForm from "../components/MilkForm";
import EntryTable from "../components/EntryTable";

import { generatePDF } from "../utils/generatePdf";
import { AuthContext } from "../context/AuthContext";

const Dashboard = () => {

  const navigate = useNavigate();

  const { logout, user } =
    useContext(AuthContext);

  const handleLogout = () => {

    logout();

    navigate("/login");
  };

  const [entries, setEntries] = useState([]);
  const [report, setReport] = useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [installPrompt, setInstallPrompt] =
    useState(null);

  const fetchEntries = async () => {

    try {

      const res =
        await api.get("/milk");

      setEntries(res.data);

    } catch (err) {

      console.error(err);

      setError(
        "Failed to load entries"
      );
    }
  };

  const fetchReport = async () => {

    try {

      const today = new Date();

      const month =
        today.getMonth() + 1;

      const year =
        today.getFullYear();

      const res =
        await api.get(
          `/milk/monthly-report?month=${month}&year=${year}`
        );

      setReport(res.data);

    } catch (err) {

      console.error(err);

      setError(
        "Failed to load report"
      );
    }
  };

  const loadDashboard =
    async () => {

      try {

        setLoading(true);

        await Promise.all([
          fetchEntries(),
          fetchReport(),
        ]);

      } finally {

        setLoading(false);
      }
    };

  useEffect(() => {

    loadDashboard();

  }, []);

  useEffect(() => {

    const handler = (e) => {

      e.preventDefault();

      setInstallPrompt(e);
    };

    window.addEventListener(
      "beforeinstallprompt",
      handler
    );

    return () => {

      window.removeEventListener(
        "beforeinstallprompt",
        handler
      );
    };

  }, []);

  const installApp = async () => {

    if (!installPrompt) return;

    installPrompt.prompt();

    await installPrompt.userChoice;

    setInstallPrompt(null);
  };

  if (loading) {
    return (
      <div className="
        min-h-screen
        flex
        items-center
        justify-center
      ">
        <h1 className="
          text-2xl
          font-semibold
        ">
          Loading...
        </h1>
      </div>
    );
  }

  return (
    <div className="
      min-h-screen
      bg-slate-100
    ">

      <div className="
        max-w-7xl
        mx-auto
        p-6
      ">

        {/* HEADER */}

        <div className="
          flex
          flex-col
          md:flex-row
          md:items-center
          md:justify-between
          gap-4
          mb-8
        ">

          <div>

            <h1 className="
              text-4xl
              font-bold
              text-slate-800
            ">
              🥛 Milk Tracker
            </h1>

            <p className="
              text-slate-500
              mt-2
            ">
              Welcome,
              <span className="font-semibold">
                {" "}
                {user?.name}
              </span>
            </p>

            <p className="
              text-slate-400
              text-sm
            ">
              Track daily milk entries and monthly expenses
            </p>

          </div>

          <div className="
            flex
            flex-wrap
            gap-3
          ">

            {report && (

              <button
                onClick={() =>
                  generatePDF(report)
                }
                className="
                  bg-green-600
                  hover:bg-green-700
                  text-white
                  px-5
                  py-3
                  rounded-xl
                  font-medium
                "
              >
                Download PDF
              </button>

            )}

            {installPrompt && (

              <button
                onClick={installApp}
                className="
                  bg-indigo-600
                  hover:bg-indigo-700
                  text-white
                  px-5
                  py-3
                  rounded-xl
                  font-medium
                "
              >
                Install App
              </button>

            )}

            <button
              onClick={loadDashboard}
              className="
                bg-blue-600
                hover:bg-blue-700
                text-white
                px-5
                py-3
                rounded-xl
                font-medium
              "
            >
              Refresh
            </button>

            <button
              onClick={handleLogout}
              className="
                bg-red-600
                hover:bg-red-700
                text-white
                px-5
                py-3
                rounded-xl
                font-medium
              "
            >
              Logout
            </button>

          </div>

        </div>

        {/* ERROR */}

        {error && (

          <div className="
            bg-red-100
            text-red-700
            px-4
            py-3
            rounded-xl
            mb-6
          ">
            {error}
          </div>

        )}

        {/* SUMMARY */}

        {report && (

          <SummaryCards
            report={report}
          />

        )}

        {/* ADD ENTRY FORM */}

        <MilkForm
          fetchEntries={fetchEntries}
          fetchReport={fetchReport}
        />

        {/* ENTRY TABLE */}

        <EntryTable
          entries={entries}
          fetchEntries={fetchEntries}
          fetchReport={fetchReport}
        />

      </div>

    </div>
  );
};

export default Dashboard;
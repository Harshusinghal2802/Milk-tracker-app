export default function Loader() {

  return (
    <div className="min-h-[60vh] flex items-center justify-center">

      <div className="flex flex-col items-center gap-4">

        <div className="w-14 h-14 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>

        <h2 className="font-semibold text-orange-500">
          Loading...
        </h2>

      </div>

    </div>
  );
}
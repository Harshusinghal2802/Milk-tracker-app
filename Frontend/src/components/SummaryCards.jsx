const SummaryCards = ({
  report,
}) => {

  const cards = [
    {
      title: "Total Milk",
      value:
        report.totalMilk.toFixed(1) +
        " L",
    },

    {
      title: "Expense",
      value:
        "₹" +
        report.totalExpense.toFixed(2),
    },

    {
      title: "Present Days",
      value:
        report.presentDays,
    },
  ];

  return (
    <div className="
      grid
      md:grid-cols-3
      gap-5
      mb-8
    ">

      {cards.map((card) => (

        <div
          key={card.title}
          className="
          bg-white
          p-6
          rounded-3xl
          shadow-md
        "
        >

          <h3 className="
            text-gray-500
          ">
            {card.title}
          </h3>

          <p className="
            text-3xl
            font-bold
            mt-2
          ">
            {card.value}
          </p>

        </div>
      ))}

    </div>
  );
};

export default SummaryCards;
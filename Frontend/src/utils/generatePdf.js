import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const generatePDF = (
  report
) => {

  const doc =
    new jsPDF();

  doc.setFontSize(20);

  doc.text(
    "Milk Monthly Report",
    14,
    20
  );

  doc.setFontSize(12);

  doc.text(
    `Total Milk: ${report.totalMilk}L`,
    14,
    35
  );

  doc.text(
    `Total Expense: ₹${report.totalExpense}`,
    14,
    45
  );

  autoTable(doc, {
    startY: 60,

    head: [[
      "Date",
      "Liters",
      "Rate",
      "Total",
    ]],

    body:
      report.entries.map(
        (item) => [
          new Date(
            item.date
          ).toLocaleDateString(),

          item.liters,

          item.pricePerLiter,

          item.total,
        ]
      ),
  });

  doc.save(
    "milk-report.pdf"
  );
};
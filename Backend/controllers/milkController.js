import MilkEntry from "../models/MilkEntry.js";

export const addMilkEntry = async (req, res) => {
  try {
    const {
      date,
      liters,
      pricePerLiter,
      vendor,
      notes,
    } = req.body;

    const total =
      Number(liters) *
      Number(pricePerLiter);

    const entry = await MilkEntry.create({
      user: req.user._id,
      date,
      liters,
      pricePerLiter,
      total,
      vendor,
      notes,
    });

    res.status(201).json(entry);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getMilkEntries = async (
  req,
  res
) => {
  try {
    const entries =
      await MilkEntry.find({
        user: req.user._id,
      }).sort({ date: -1 });

    res.json(entries);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const updateMilkEntry = async (
  req,
  res
) => {
  try {
    const entry =
      await MilkEntry.findById(
        req.params.id
      );

    if (!entry) {
      return res.status(404).json({
        message: "Entry not found",
      });
    }

    if (
      entry.user.toString() !==
      req.user._id.toString()
    ) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    entry.date =
      req.body.date || entry.date;

    entry.liters =
      req.body.liters ?? entry.liters;

    entry.pricePerLiter =
      req.body.pricePerLiter ??
      entry.pricePerLiter;

    entry.vendor =
      req.body.vendor || entry.vendor;

    entry.notes =
      req.body.notes || entry.notes;

    entry.total =
      entry.liters *
      entry.pricePerLiter;

    const updated =
      await entry.save();

    res.json(updated);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteMilkEntry = async (
  req,
  res
) => {
  try {
    const entry =
      await MilkEntry.findById(
        req.params.id
      );

    if (!entry) {
      return res.status(404).json({
        message: "Entry not found",
      });
    }

    if (
      entry.user.toString() !==
      req.user._id.toString()
    ) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    await entry.deleteOne();

    res.json({
      message:
        "Entry deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getMonthlyReport =
  async (req, res) => {
    try {
      const { month, year } =
        req.query;

      const startDate =
        new Date(year, month - 1, 1);

      const endDate =
        new Date(year, month, 1);

      const entries =
        await MilkEntry.find({
          user: req.user._id,
          date: {
            $gte: startDate,
            $lt: endDate,
          },
        });

      const totalMilk =
        entries.reduce(
          (sum, item) =>
            sum + item.liters,
          0
        );

      const totalExpense =
        entries.reduce(
          (sum, item) =>
            sum + item.total,
          0
        );

      res.json({
        month,
        year,
        totalMilk,
        totalExpense,
        presentDays:
          entries.length,
        entries,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };
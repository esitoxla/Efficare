import { EfficacyModel } from "../models/efficacy.js";
import { RecordModel } from "../models/records.js";
import { DrugModel } from "../models/drugs.js";

export const computeEfficacy = async (req, res) => {
  try {
    const { drugId } = req.params;

    // Check if drug exists
    const drug = await DrugModel.findById(drugId);
    if (!drug) {
      return res.status(404).json({ message: "Drug not found" });
    }

    // Get all records for this drug
    const records = await RecordModel.find({ drug: drugId });

    if (records.length === 0) {
      return res
        .status(400)
        .json({ message: "No records found for this drug" });
    }

    // Compute efficacy metrics
    const totalUsers = records.length;
    let positiveFeedback = 0;
    const sideEffectsCount = {};

    records.forEach((record) => {
      if (
        record.efficacy_feedback &&
        record.efficacy_feedback.toLowerCase() === "improved"
      ) {
        positiveFeedback++;
      }

      if (record.side_effects) {
        record.side_effects.forEach((effect) => {
          sideEffectsCount[effect] = (sideEffectsCount[effect] || 0) + 1;
        });
      }
    });

    const positiveFeedbackRate = (positiveFeedback / totalUsers) * 100;
    const reportedSideEffects = Object.keys(sideEffectsCount);

    // Save or update efficacy data
    const efficacyData = await EfficacyModel.findOneAndUpdate(
      { drug: drugId },
      {
        drug: drugId,
        total_users: totalUsers,
        total_feedbacks: positiveFeedback,
        positive_feedback_rate: positiveFeedbackRate.toFixed(2),
        reported_side_effects: reportedSideEffects,
      },
      { new: true, upsert: true }
    );

    res.status(200).json({
      message: "Efficacy data computed",
      efficacy: efficacyData,
    });
  } catch (error) {
    console.error("Error computing efficacy:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

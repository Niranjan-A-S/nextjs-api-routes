import { buildFeedbackPath, getFeedbacks } from "@/utils";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const feedbackId = req.query.feedbackId;
    const filePath = buildFeedbackPath();
    const feedbacks = await getFeedbacks(filePath);
    const feedback = feedbacks.find(({ id }: any) => id === feedbackId)
    res.status(200).json({ message: "Get Request Successful", data: feedback });
}
import type { NextApiRequest, NextApiResponse } from 'next'
import path from 'node:path';
import fs from 'node:fs/promises';
import { buildFeedbackPath, getFeedbacks } from '@/utils';

type ResponseData = {
    message: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {
    if (req.method === 'POST') {
        await postRequestHandler(req, res);
    } else {
        await getRequestHandler(req, res);
    }
}

async function postRequestHandler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {

    const { email, feedback } = req.body;
    if (!(email || feedback)) {
        return res.status(404).send({
            message: 'No Body Found'
        });
    }

    const newFeedback = {
        id: new Date().toISOString(),
        email,
        feedback,
    }

    //store the data in a file
    const filePath = buildFeedbackPath();
    const feedbacks = await getFeedbacks(filePath);
    feedbacks.push(newFeedback);
    await fs.writeFile(filePath, JSON.stringify(feedbacks));
    res.status(201).send({
        message: 'Post Request Successful',
        data: newFeedback,
    } as ResponseData);
}

async function getRequestHandler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>) {
    const filePath = buildFeedbackPath();
    const feedbacks = await getFeedbacks(filePath);
    res.status(200).send(
        {
            message: 'Get Request Successful',
            data: feedbacks
        } as ResponseData
    )
}
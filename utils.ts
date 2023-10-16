import path from "node:path";
import fs from "node:fs/promises";

export const buildFeedbackPath = () => path.join(process.cwd(), 'data', 'feedbacks.json');
export const getFeedbacks = async (filePath: string) => {
    const fileContent = await fs.readFile(filePath, { encoding: 'utf-8' });
    if (fileContent) {
        return JSON.parse(fileContent);
    }
    await fs.writeFile(filePath, JSON.stringify([]));
    return [];
}

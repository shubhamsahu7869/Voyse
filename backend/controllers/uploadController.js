import { extractTravelData } from "../utils/extractionHelper.js";

export async function uploadDocuments(req, res) {
  const documents = req.files.map(file => ({ filename: file.originalname, path: file.path }));
  const extractedData = await extractTravelData(req.files, req.body);
  res.status(201).json({ documents, extractedData });
}

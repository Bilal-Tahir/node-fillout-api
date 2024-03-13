import { Request, Response } from 'express';
import { getFilteredResponses } from '../services/formService';

export const getFilteredFormResponses = async (req: Request, res: Response) => {
  const { formId } = req.params;
  const filters = req.query.filters ? JSON.parse(req.query.filters as string) : undefined;

  try {
    const responses = await getFilteredResponses(formId, filters);
    res.json(responses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

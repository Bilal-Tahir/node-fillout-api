import express from 'express';
import { getFilteredFormResponses } from '../controllers/formController';

const router = express.Router();

router.get('/:formId/filteredResponses', getFilteredFormResponses);

export default router;

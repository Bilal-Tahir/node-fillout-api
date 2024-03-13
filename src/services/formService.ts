import axios from 'axios';
import { ResponseFiltersType, SubmissionResponse, ResponsesData } from '../types/types';
import { API_KEY, API_URL } from '../config/config';

export async function getFilteredResponses(formId: string, filters: ResponseFiltersType | undefined): Promise<ResponsesData> {
  const apiUrl = `${API_URL}/${formId}/submissions`;

  try {
    const response = await axios.get(apiUrl, {
      headers: { Authorization: `Bearer ${API_KEY}` },
    });


    if (!filters || filters.length === 0) {
      return response.data;
    }

    const filteredResponses = response.data.responses.filter((submission: SubmissionResponse) => {
      return filters.every((filter) => {
        const question = submission.questions.find((q) => q.id === filter.id);
        if (!question) return false;

        switch (filter.condition) {
          case 'equals':
            return question.value === filter.value;
          case 'does_not_equal':
            return question.value !== filter.value;
          case 'greater_than':
            return typeof question.value === 'number' && typeof filter.value === 'number'
              ? question.value > filter.value
              : new Date(question.value) > new Date(filter.value);
          case 'less_than':
            return typeof question.value === 'number' && typeof filter.value === 'number'
              ? question.value < filter.value
              : new Date(question.value) < new Date(filter.value);
          default:
          return false;
        }
      });
    });

    return {
      responses: filteredResponses,
      totalResponses: filteredResponses.length,
      pageCount: response.data.pageCount
    };

  } catch (error: any) {
    throw error.response.data || error;
  }
}

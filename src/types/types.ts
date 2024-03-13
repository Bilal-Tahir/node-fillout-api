export type FilterClauseType = {
    id: string;
    condition: 'equals' | 'does_not_equal' | 'greater_than' | 'less_than';
    value: number | string;
  };
  
  export type ResponseFiltersType = FilterClauseType[];
  
  export type SubmissionQuestion = {
    id: string;
    name: string;
    type: string;
    value: string | number;
  };
  
  export type SubmissionResponse = {
    questions: SubmissionQuestion[];
    submissionId: string;
    submissionTime: string;
  };
  
  export type ResponsesData = {
    responses: SubmissionResponse[];
    totalResponses: number;
    pageCount: number;
  };
  
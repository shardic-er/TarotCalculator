export interface Category {
    id: number;           // Unique identifier for the category
    name: string;         // Name of the category
    description: string;  // Description of what the category represents
}

export interface Question {
    id: number;                      // Unique identifier for the question
    text: string;                    // Text of the question
    options: Array<AnswerOption>;          // List of options for this question
}
export interface AnswerOption {
    id: number;                      // Unique identifier for the option
    text: string;                    // Text of the option
    impacts: Array<CategoryImpact>;  // Effects of choosing this option on different categories
}

export interface CategoryImpact {
    categoryId: number;  // ID of the category affected
    points: number;       // Points to add or subtract from the category score
}

export interface QuizResult {
    participantId: number;                    // Identifier for the participant
    answers: Array<Answer>;                   // Answers given by the participant
    categoryScores: Record<number, number>;   // Final scores for each category, keyed by category ID
}

export interface Result {
    id: number;
    name: string;
    description: string;
    score: number;
}

export interface Answer {
    questionId: number;  // The ID of the question answered
    optionId: number;    // The ID of the option chosen
}


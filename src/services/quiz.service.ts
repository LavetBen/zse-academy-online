import { API_BASE_URL } from "@/constants/api";

export interface QuizQuestion {
  id: number;
  quiz_id: number;
  question: string;
  options: string | string[];
  answer: string;
  created_at: string;
  updated_at: string;
}

export interface Quiz {
  id: number;
  course_id: number;
  title: string;
  description: string;
  created_at: string;
  updated_at: string;
  questions: QuizQuestion[];
  course: {
    id: number;
    title: string;
    description: string;
  };
}

export interface QuizSubmissionResponse {
  status: string;
  score: number;
  total_questions: number;
  correct_answers: number;
  passed: boolean;
}

export const quizService = {
  async getQuizzes(): Promise<{ status: string; quizzes: Quiz[] }> {
    const token = localStorage.getItem("zse_training_token");
    const response = await fetch(`${API_BASE_URL}/quizzes`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch quizzes");
    }

    const data = await response.json();

    if (data.quizzes) {
      data.quizzes.forEach((quiz: Quiz) => {
        quiz.questions.forEach((question: QuizQuestion) => {
          if (typeof question.options === "string") {
            try {
              question.options = JSON.parse(question.options);
            } catch (error) {
              console.error("Error parsing options:", error);
              question.options = [];
            }
          }
        });
      });
    }

    return data;
  },

  async submitQuiz(
    quizId: number,
    userAnswers: { [questionId: number]: string }
  ): Promise<QuizSubmissionResponse> {
    const token = localStorage.getItem("zse_training_token");

    const answers = Object.entries(userAnswers).map(([questionId, answer]) => ({
      question_id: parseInt(questionId),
      answer: answer,
    }));

    const response = await fetch(`${API_BASE_URL}/quizzes/${quizId}/submit`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ answers }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      console.error("Submission error details:", errorData);
      throw new Error("Failed to submit quiz");
    }

    const result = await response.json();
    return result;
  },
};

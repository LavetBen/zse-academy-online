import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark,
  faClock,
  faArrowLeft,
  faArrowRight,
  faTrophy,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Quiz, quizService } from "@/services/quiz.service";

interface QuizState {
  currentQuiz: Quiz | null;
  currentQuestionIndex: number;
  selectedOption: string | null;
  userAnswers: { [questionId: number]: string };
  showResults: boolean;
  score: number;
  timeRemaining: number;
  isSubmitting: boolean;
}

interface QuizModalProps {
  quiz: Quiz;
  onClose: () => void;
  onQuizComplete: (score: number, total: number) => void;
}

export const QuizModal = ({ quiz, onClose, onQuizComplete }: QuizModalProps) => {
  const [quizState, setQuizState] = useState<QuizState>({
    currentQuiz: quiz,
    currentQuestionIndex: 0,
    selectedOption: null,
    userAnswers: {},
    showResults: false,
    score: 0,
    timeRemaining: quiz.questions.length * 90,
    isSubmitting: false,
  });

  useEffect(() => {
    if (quizState.showResults || quizState.timeRemaining <= 0) return;

    const timer = setInterval(() => {
      setQuizState((prev) => {
        if (prev.timeRemaining <= 1) {
          handleSubmitQuiz();
          return { ...prev, timeRemaining: 0 };
        }
        return { ...prev, timeRemaining: prev.timeRemaining - 1 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [quizState.showResults, quizState.timeRemaining]);

  const currentQuestion = quiz.questions[quizState.currentQuestionIndex];
  const currentOptions = Array.isArray(currentQuestion.options)
    ? currentQuestion.options
    : [];

  const handleOptionSelect = (option: string) => {
    setQuizState((prev) => ({
      ...prev,
      selectedOption: option,
      userAnswers: {
        ...prev.userAnswers,
        [currentQuestion.id]: option,
      },
    }));
  };

  const handleNextQuestion = () => {
    if (quizState.currentQuestionIndex < quiz.questions.length - 1) {
      const nextIndex = quizState.currentQuestionIndex + 1;
      const nextQuestion = quiz.questions[nextIndex];
      setQuizState((prev) => ({
        ...prev,
        currentQuestionIndex: nextIndex,
        selectedOption: prev.userAnswers[nextQuestion.id] || null,
      }));
    }
  };

  const handlePreviousQuestion = () => {
    if (quizState.currentQuestionIndex > 0) {
      const prevIndex = quizState.currentQuestionIndex - 1;
      const prevQuestion = quiz.questions[prevIndex];
      setQuizState((prev) => ({
        ...prev,
        currentQuestionIndex: prevIndex,
        selectedOption: prev.userAnswers[prevQuestion.id] || null,
      }));
    }
  };

  const handleSubmitQuiz = async () => {
    setQuizState((prev) => ({ ...prev, isSubmitting: true }));

    try {
      const result = await quizService.submitQuiz(quiz.id, quizState.userAnswers);

      setQuizState((prev) => ({
        ...prev,
        showResults: true,
        score: result.correct_answers || 0,
        isSubmitting: false,
      }));

      onQuizComplete(result.correct_answers || 0, result.total_questions || quiz.questions.length);
    } catch (error) {
      console.error("Error submitting quiz:", error);
      setQuizState((prev) => ({ ...prev, isSubmitting: false }));
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  if (quizState.showResults) {
    const totalQuestions = quiz.questions.length;
    const correctAnswers = quizState.score || 0;
    const percentage = totalQuestions > 0 ? (correctAnswers / totalQuestions) * 100 : 0;
    const passed = percentage >= 70;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-background rounded-lg max-w-md w-full p-6">
          <div className="text-center">
            <div
              className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center ${
                passed ? "bg-green-100" : "bg-red-100"
              }`}
            >
              <FontAwesomeIcon
                icon={passed ? faTrophy : faTimesCircle}
                className={`h-8 w-8 ${passed ? "text-green-600" : "text-red-600"}`}
              />
            </div>

            <h2 className="text-2xl font-bold mt-4">
              {passed ? "Quiz Passed!" : "Quiz Failed"}
            </h2>

            <div className="my-6">
              <div className="text-4xl font-bold mb-2">
                {correctAnswers}/{totalQuestions}
              </div>
              <div className="text-lg text-muted-foreground">
                {percentage.toFixed(1)}%
              </div>
              <Progress value={percentage} className="mt-2" />
            </div>

            <p className="text-muted-foreground mb-6">
              {passed
                ? "Congratulations! You have successfully completed the quiz."
                : `You need at least 70% to pass. You got ${percentage.toFixed(1)}%. Try again!`}
            </p>

            <div className="space-y-3">
              <Button onClick={onClose} className="w-full">
                {passed ? "Continue Learning" : "Retry Quiz"}
              </Button>
              {!passed && (
                <Button
                  variant="outline"
                  onClick={() =>
                    setQuizState((prev) => ({
                      ...prev,
                      showResults: false,
                      currentQuestionIndex: 0,
                      selectedOption: null,
                      userAnswers: {},
                      timeRemaining: quiz.questions.length * 90,
                    }))
                  }
                >
                  Review Questions
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-background rounded-lg max-w-2xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h2 className="text-xl font-bold">{quiz.title}</h2>
            <p className="text-sm text-muted-foreground">
              Question {quizState.currentQuestionIndex + 1} of {quiz.questions.length}
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center bg-red-100 text-red-800 px-3 py-1 rounded-full">
              <FontAwesomeIcon icon={faClock} className="h-4 w-4 mr-2" />
              <span className="font-semibold">{formatTime(quizState.timeRemaining)}</span>
            </div>
            <button
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <FontAwesomeIcon icon={faXmark} className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="px-6 pt-4">
          <Progress
            value={((quizState.currentQuestionIndex + 1) / quiz.questions.length) * 100}
            className="h-2"
          />
        </div>

        <div className="p-6">
          <h3 className="text-lg font-semibold mb-6">{currentQuestion.question}</h3>

          <div className="space-y-3">
            {currentOptions.map((option, index) => (
              <button
                key={index}
                onClick={() => handleOptionSelect(option)}
                className={`w-full text-left p-4 rounded-lg border transition-all ${
                  quizState.selectedOption === option
                    ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                    : "border-border hover:border-muted-foreground hover:bg-muted/50"
                }`}
              >
                <div className="flex items-center">
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mr-3 ${
                      quizState.selectedOption === option
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border"
                    }`}
                  >
                    {quizState.selectedOption === option && (
                      <div className="w-2 h-2 rounded-full bg-primary-foreground" />
                    )}
                  </div>
                  <span>{option}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between p-6 border-t">
          <Button
            variant="outline"
            onClick={handlePreviousQuestion}
            disabled={quizState.currentQuestionIndex === 0}
          >
            <FontAwesomeIcon icon={faArrowLeft} className="h-4 w-4 mr-2" />
            Previous
          </Button>

          {quizState.currentQuestionIndex === quiz.questions.length - 1 ? (
            <Button
              onClick={handleSubmitQuiz}
              disabled={!quizState.selectedOption || quizState.isSubmitting}
            >
              {quizState.isSubmitting ? "Submitting..." : "Submit Quiz"}
            </Button>
          ) : (
            <Button onClick={handleNextQuestion} disabled={!quizState.selectedOption}>
              Next
              <FontAwesomeIcon icon={faArrowRight} className="h-4 w-4 ml-2" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

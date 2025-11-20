import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle, faList, faClock, faLock } from "@fortawesome/free-solid-svg-icons";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Quiz } from "@/services/quiz.service";

interface QuizCardProps {
  quiz: Quiz;
  onStartQuiz: (quiz: Quiz) => void;
}

export const QuizCard = ({ quiz, onStartQuiz }: QuizCardProps) => {
  // Log can_take_quiz for debugging
  console.log("Quiz ID:", quiz.id, "can_take_quiz:", quiz.can_take_quiz);

  const getQuizStatus = () => {
    if (quiz.can_take_quiz) {
      return {
        label: "Available",
        variant: "default" as const,
        disabled: false,
        icon: faQuestionCircle,
        badgeClass: "bg-green-100 text-green-800",
        buttonText: "Start Quiz"
      };
    } else {
      return {
        label: "Locked",
        variant: "secondary" as const,
        disabled: true,
        icon: faLock,
        badgeClass: "bg-gray-100 text-gray-800",
        buttonText: "Complete Prerequisites"
      };
    }
  };

  const status = getQuizStatus();

  return (
    <Card className={`hover:shadow-lg transition-shadow duration-300 ${
      !quiz.can_take_quiz ? "opacity-75" : ""
    }`}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className={`p-3 rounded-lg ${
              quiz.can_take_quiz ? "bg-blue-100" : "bg-gray-100"
            }`}>
              <FontAwesomeIcon
                icon={status.icon}
                className={`h-6 w-6 ${
                  quiz.can_take_quiz ? "text-blue-600" : "text-gray-600"
                }`}
              />
            </div>
            <div>
              <h3 className="font-semibold text-lg">{quiz.title}</h3>
              <p className="text-sm text-muted-foreground">
                {quiz.description}
              </p>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
              {quiz.questions.length} questions
            </Badge>
            <Badge variant="secondary" className={status.badgeClass}>
              {status.label}
            </Badge>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <FontAwesomeIcon icon={faList} className="h-4 w-4 mr-1" />
              <span>{quiz.questions.length} Questions</span>
            </div>
            <div className="flex items-center">
              <FontAwesomeIcon icon={faClock} className="h-4 w-4 mr-1" />
              <span>{Math.ceil(quiz.questions.length * 1.5)} mins</span>
            </div>
          </div>
        </div>

        <Button 
          onClick={() => onStartQuiz(quiz)} 
          disabled={status.disabled}
          variant={status.variant}
          className="w-full"
        >
          {status.buttonText}
        </Button>

        {!quiz.can_take_quiz && (
          <p className="text-xs text-muted-foreground mt-2 text-center">
            Complete previous lessons to unlock this quiz
          </p>
        )}
      </CardContent>
    </Card>
  );
};

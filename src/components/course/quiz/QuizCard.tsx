import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle, faList, faClock } from "@fortawesome/free-solid-svg-icons";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Quiz } from "@/services/quiz.service";

interface QuizCardProps {
  quiz: Quiz;
  onStartQuiz: (quiz: Quiz) => void;
}

export const QuizCard = ({ quiz, onStartQuiz }: QuizCardProps) => {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-blue-100 rounded-lg">
              <FontAwesomeIcon
                icon={faQuestionCircle}
                className="h-6 w-6 text-blue-600"
              />
            </div>
            <div>
              <h3 className="font-semibold text-lg">{quiz.title}</h3>
              <p className="text-sm text-muted-foreground">
                {quiz.description}
              </p>
            </div>
          </div>
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            {quiz.questions.length} questions
          </Badge>
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

        <Button onClick={() => onStartQuiz(quiz)} className="w-full">
          Start Quiz
        </Button>
      </CardContent>
    </Card>
  );
};

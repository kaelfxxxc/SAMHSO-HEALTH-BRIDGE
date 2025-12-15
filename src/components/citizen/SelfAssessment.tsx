import { useState } from 'react';
import { ClipboardCheck, AlertCircle, CheckCircle, Info } from 'lucide-react';

interface Question {
  id: string;
  text: string;
  weight: number;
}

const ASSESSMENT_QUESTIONS: Question[] = [
  { id: '1', text: 'Have you ever felt you should cut down on your drinking or drug use?', weight: 2 },
  { id: '2', text: 'Have people annoyed you by criticizing your drinking or drug use?', weight: 2 },
  { id: '3', text: 'Have you ever felt bad or guilty about your drinking or drug use?', weight: 2 },
  { id: '4', text: 'Have you ever used alcohol or drugs first thing in the morning?', weight: 3 },
  { id: '5', text: 'Have you found that you need to use more to get the same effect?', weight: 3 },
  { id: '6', text: 'Have you experienced withdrawal symptoms when stopping use?', weight: 3 },
  { id: '7', text: 'Have you continued to use despite negative consequences?', weight: 3 },
  { id: '8', text: 'Have you given up important activities because of substance use?', weight: 2 },
  { id: '9', text: 'Have you tried to cut down or stop but been unable to?', weight: 3 },
  { id: '10', text: 'Do you spend a lot of time obtaining, using, or recovering from substances?', weight: 2 },
];

interface AssessmentResult {
  score: number;
  level: 'low' | 'moderate' | 'high';
  title: string;
  description: string;
  recommendations: string[];
}

export function SelfAssessment() {
  const [answers, setAnswers] = useState<{ [key: string]: boolean }>({});
  const [showResults, setShowResults] = useState(false);
  const [result, setResult] = useState<AssessmentResult | null>(null);

  const handleAnswer = (questionId: string, answer: boolean) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const calculateResults = () => {
    let totalScore = 0;
    ASSESSMENT_QUESTIONS.forEach(question => {
      if (answers[question.id]) {
        totalScore += question.weight;
      }
    });

    let assessmentResult: AssessmentResult;

    if (totalScore <= 5) {
      assessmentResult = {
        score: totalScore,
        level: 'low',
        title: 'Low Risk',
        description: 'Based on your responses, you appear to have a low risk for substance dependency. However, any substance use carries some risk.',
        recommendations: [
          'Continue making healthy choices',
          'Stay informed about substance risks',
          'Build and maintain strong support networks',
          'Practice healthy stress management techniques',
          'Consider speaking with a healthcare provider if you have any concerns'
        ]
      };
    } else if (totalScore <= 15) {
      assessmentResult = {
        score: totalScore,
        level: 'moderate',
        title: 'Moderate Risk',
        description: 'Your responses suggest some concerning patterns that may indicate developing issues with substance use. Early intervention can be very effective.',
        recommendations: [
          'Consider scheduling an appointment with a healthcare provider',
          'Explore counseling or support group options',
          'Review the resources in our directory',
          'Talk to someone you trust about your concerns',
          'Begin tracking your substance use patterns',
          'Develop alternative coping strategies for stress'
        ]
      };
    } else {
      assessmentResult = {
        score: totalScore,
        level: 'high',
        title: 'Higher Risk',
        description: 'Your responses indicate patterns consistent with substance dependency. Professional help is strongly recommended. Recovery is possible with proper support.',
        recommendations: [
          'Contact a healthcare provider or addiction specialist as soon as possible',
          'Consider reaching out to one of the resources in our directory',
          'Talk to a trusted friend or family member for support',
          'If in crisis, call the SAMHSA National Helpline: 1-800-662-4357',
          'Remember: seeking help is a sign of strength, not weakness',
          'Recovery is possible - many people successfully overcome addiction'
        ]
      };
    }

    setResult(assessmentResult);
    setShowResults(true);
  };

  const resetAssessment = () => {
    setAnswers({});
    setShowResults(false);
    setResult(null);
  };

  const allQuestionsAnswered = ASSESSMENT_QUESTIONS.every(q => answers[q.id] !== undefined);

  if (showResults && result) {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-start gap-4 mb-6">
            {result.level === 'low' && <CheckCircle className="w-12 h-12 text-green-600 flex-shrink-0" />}
            {result.level === 'moderate' && <AlertCircle className="w-12 h-12 text-yellow-600 flex-shrink-0" />}
            {result.level === 'high' && <AlertCircle className="w-12 h-12 text-red-600 flex-shrink-0" />}
            <div>
              <h2 className="text-gray-900 mb-2">Assessment Results: {result.title}</h2>
              <p className="text-gray-600">{result.description}</p>
            </div>
          </div>

          <div className={`p-4 rounded-lg mb-6 ${
            result.level === 'low' ? 'bg-green-50 border border-green-200' :
            result.level === 'moderate' ? 'bg-yellow-50 border border-yellow-200' :
            'bg-red-50 border border-red-200'
          }`}>
            <h3 className={`mb-3 ${
              result.level === 'low' ? 'text-green-900' :
              result.level === 'moderate' ? 'text-yellow-900' :
              'text-red-900'
            }`}>Recommended Next Steps:</h3>
            <ul className="space-y-2">
              {result.recommendations.map((rec, index) => (
                <li key={index} className="flex items-start gap-2">
                  <div className={`w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 ${
                    result.level === 'low' ? 'bg-green-600' :
                    result.level === 'moderate' ? 'bg-yellow-600' :
                    'bg-red-600'
                  }`} />
                  <span className={
                    result.level === 'low' ? 'text-green-800' :
                    result.level === 'moderate' ? 'text-yellow-800' :
                    'text-red-800'
                  }>{rec}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex gap-4">
            <button
              onClick={resetAssessment}
              className="px-6 py-3 bg-gray-200 text-gray-900 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Take Assessment Again
            </button>
          </div>
        </div>

        {/* Emergency Resources */}
        {result.level !== 'low' && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <div className="flex items-start gap-3 mb-4">
              <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
              <div>
                <h3 className="text-red-900 mb-2">Need Immediate Help?</h3>
                <p className="text-red-800 mb-4">
                  If you are experiencing a crisis, immediate support is available 24/7.
                </p>
              </div>
            </div>
            <div className="space-y-2 ml-9">
              <p className="text-red-900"><strong>988 Suicide & Crisis Lifeline:</strong> Call or text 988</p>
              <p className="text-red-900"><strong>SAMHSA National Helpline:</strong> 1-800-662-HELP (4357)</p>
              <p className="text-red-900"><strong>Crisis Text Line:</strong> Text HOME to 741741</p>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-start gap-4 mb-6">
          <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <ClipboardCheck className="w-6 h-6 text-indigo-600" />
          </div>
          <div>
            <h2 className="text-gray-900 mb-2">Self-Assessment Tool</h2>
            <p className="text-gray-600">
              This confidential screening can help you understand your relationship with substances. Answer honestly for the most accurate results.
            </p>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-blue-900 mb-2">Important Information:</p>
              <ul className="space-y-1 text-blue-800">
                <li>• This assessment is completely anonymous</li>
                <li>• Results are not stored or shared</li>
                <li>• This is a screening tool, not a diagnosis</li>
                <li>• Consult a healthcare professional for a full evaluation</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {ASSESSMENT_QUESTIONS.map((question, index) => (
            <div key={question.id} className="pb-6 border-b border-gray-200 last:border-b-0">
              <p className="text-gray-900 mb-4">
                {index + 1}. {question.text}
              </p>
              <div className="flex gap-4">
                <button
                  onClick={() => handleAnswer(question.id, true)}
                  className={`flex-1 px-6 py-3 rounded-lg border-2 transition-all ${
                    answers[question.id] === true
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-900'
                      : 'border-gray-300 hover:border-gray-400 text-gray-700'
                  }`}
                >
                  Yes
                </button>
                <button
                  onClick={() => handleAnswer(question.id, false)}
                  className={`flex-1 px-6 py-3 rounded-lg border-2 transition-all ${
                    answers[question.id] === false
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-900'
                      : 'border-gray-300 hover:border-gray-400 text-gray-700'
                  }`}
                >
                  No
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <button
            onClick={calculateResults}
            disabled={!allQuestionsAnswered}
            className="w-full px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {allQuestionsAnswered ? 'View Results' : `Answer All Questions (${Object.keys(answers).length}/${ASSESSMENT_QUESTIONS.length})`}
          </button>
        </div>
      </div>
    </div>
  );
}

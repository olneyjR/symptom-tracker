import React from 'react';
import { CheckCircle2, MessageCircle } from 'lucide-react';

interface ActionsContainerProps {
  selfCareActions: string[];
  doctorQuestions: string[];
}

export function ActionsContainer({ selfCareActions, doctorQuestions }: ActionsContainerProps) {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* Self-Care Suggestions */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
          <CheckCircle2 className="w-5 h-5 text-green-600" />
          <span>Self-Care Suggestions</span>
        </h3>

        {selfCareActions.length === 0 ? (
          <p className="text-gray-600">No specific self-care actions identified.</p>
        ) : (
          <ul className="space-y-3">
            {selfCareActions.map((action, index) => (
              <li key={index} className="flex items-start space-x-3">
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">{action}</span>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-4 p-3 bg-blue-50 rounded border border-blue-200">
          <p className="text-xs text-blue-900">
            <strong>Note:</strong> These are general suggestions. Always consult a healthcare provider 
            before making significant changes to your health routine.
          </p>
        </div>
      </div>

      {/* Doctor Questions */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
          <MessageCircle className="w-5 h-5 text-primary-600" />
          <span>Questions for Your Doctor</span>
        </h3>

        {doctorQuestions.length === 0 ? (
          <p className="text-gray-600">No specific questions identified.</p>
        ) : (
          <ol className="space-y-3">
            {doctorQuestions.map((question, index) => (
              <li key={index} className="flex items-start space-x-3">
                <span className="font-semibold text-primary-600 flex-shrink-0">
                  {index + 1}.
                </span>
                <span className="text-gray-700">{question}</span>
              </li>
            ))}
          </ol>
        )}

        <div className="mt-4 p-3 bg-purple-50 rounded border border-purple-200">
          <p className="text-xs text-purple-900">
            <strong>Tip:</strong> Bring your symptom log data to your appointment for more productive 
            discussions with your healthcare provider.
          </p>
        </div>
      </div>
    </div>
  );
}

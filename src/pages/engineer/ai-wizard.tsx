import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Header from '@/components/Header';
import { EngineerPreferences } from '@/types';

interface WizardStep {
  id: number;
  question: string;
  type: 'select' | 'multiSelect' | 'text' | 'number';
  options?: string[];
  placeholder?: string;
  required?: boolean;
}

const WIZARD_STEPS: WizardStep[] = [
  {
    id: 1,
    question: '希望する年収を教えてください',
    type: 'select',
    options: [
      '300万円未満',
      '300万円〜400万円',
      '400万円〜500万円',
      '500万円〜600万円',
      '600万円〜800万円',
      '800万円以上'
    ],
    required: true
  },
  {
    id: 2,
    question: '希望する勤務地を選択してください（複数選択可）',
    type: 'multiSelect',
    options: [
      '東京都',
      '神奈川県',
      '千葉県',
      '埼玉県',
      'その他関東',
      '大阪府',
      '京都府',
      'その他関西',
      'その他地域',
      'リモートワーク'
    ],
    required: true
  },
  {
    id: 3,
    question: '得意なプログラミング言語や技術を教えてください（複数選択可）',
    type: 'multiSelect',
    options: [
      'JavaScript',
      'TypeScript',
      'Python',
      'Java',
      'Ruby',
      'PHP',
      'Go',
      'React',
      'Vue.js',
      'Angular',
      'Node.js',
      'Docker',
      'AWS',
      'GCP',
      'Azure'
    ],
    required: true
  }
];

const AIWizardPage: React.FC = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string | string[]>>({});
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkAccess = async () => {
      const token = localStorage.getItem('token');
      const wizardCompleted = localStorage.getItem('wizardCompleted');
      const isProfileCompleted = localStorage.getItem('profileCompleted');

      if (!token) {
        router.push('/auth/select');
        return;
      }

      // ウィザードが完了している場合はダッシュボードへ
      if (wizardCompleted === 'true') {
        router.push('/engineer/dashboard');
        return;
      }

      // プロフィール登録が完了していない場合はプロフィールページへ
      if (isProfileCompleted !== 'true') {
        router.push('/engineer/profile');
        return;
      }

      // 保存された回答と進捗を復元
      const savedAnswers = localStorage.getItem('wizardAnswers');
      if (savedAnswers) {
        setAnswers(JSON.parse(savedAnswers));
        const savedStep = localStorage.getItem('wizardStep');
        if (savedStep) {
          setCurrentStep(parseInt(savedStep));
        }
      }
      setIsLoading(false);
    };

    checkAccess();
  }, [router]);

  // 回答が更新されたときにローカルストレージに保存
  useEffect(() => {
    if (Object.keys(answers).length > 0) {
      localStorage.setItem('wizardAnswers', JSON.stringify(answers));
      localStorage.setItem('wizardStep', currentStep.toString());
    }
  }, [answers, currentStep]);

  const handleAnswer = (answer: string | string[]) => {
    const currentQuestion = WIZARD_STEPS[currentStep];
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: answer
    }));
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
      setError(null);
    }
  };

  const validateAnswer = (step: WizardStep, answer: string | string[]): boolean => {
    if (!answer) return false;
    
    if (step.type === 'multiSelect') {
      return (answer as string[]).length > 0;
    }
    
    return true;
  };

  const handleNext = () => {
    const currentAnswer = answers[WIZARD_STEPS[currentStep].id];
    if (!validateAnswer(WIZARD_STEPS[currentStep], currentAnswer)) {
      setError('選択してください');
      return;
    }
    setError(null);
    
    if (currentStep < WIZARD_STEPS.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    try {
      // 開発用の仮実装
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // ウィザード完了を記録
      localStorage.setItem('wizardCompleted', 'true');
      
      // ウィザードの一時データをクリア
      localStorage.removeItem('wizardAnswers');
      localStorage.removeItem('wizardStep');
      
      router.push('/engineer/dashboard');
    } catch (error) {
      setError('エラーが発生しました。もう一度お試しください。');
      console.error('Error saving preferences:', error);
    } finally {
      setLoading(false);
    }
  };

  // ローディング中の表示
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-xl text-gray-600">読み込み中...</div>
      </div>
    );
  }

  const currentQuestion = WIZARD_STEPS[currentStep];
  const progress = ((currentStep + 1) / WIZARD_STEPS.length) * 100;

  return (
    <div className="min-h-screen bg-gray-100">
      <Header userType="engineer" />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* プログレスバー */}
          <div className="mb-8">
            <div className="h-2 bg-gray-200 rounded-full">
              <div
                className="h-2 bg-blue-600 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="text-right text-sm text-gray-600 mt-2">
              {currentStep + 1} / {WIZARD_STEPS.length}
            </div>
          </div>

          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
              {error}
            </div>
          )}

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-6">{currentQuestion.question}</h2>

            <div className="mb-8">
              {currentQuestion.type === 'select' && (
                <select
                  value={answers[currentQuestion.id] as string || ''}
                  onChange={(e) => handleAnswer(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">選択してください</option>
                  {currentQuestion.options?.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              )}

              {currentQuestion.type === 'multiSelect' && (
                <div className="space-y-2">
                  {currentQuestion.options?.map((option) => (
                    <label
                      key={option}
                      className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        value={option}
                        checked={(answers[currentQuestion.id] as string[] || []).includes(option)}
                        onChange={(e) => {
                          const currentAnswers = answers[currentQuestion.id] as string[] || [];
                          if (e.target.checked) {
                            handleAnswer([...currentAnswers, option]);
                          } else {
                            handleAnswer(currentAnswers.filter(a => a !== option));
                          }
                        }}
                        className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            <div className="flex justify-between">
              <button
                onClick={handleBack}
                disabled={currentStep === 0}
                className={`px-6 py-2 rounded-lg transition-colors ${
                  currentStep === 0
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                戻る
              </button>
              <button
                onClick={handleNext}
                disabled={loading || !answers[currentQuestion.id]}
                className={`px-6 py-2 rounded-lg transition-colors ${
                  loading || !answers[currentQuestion.id]
                    ? 'bg-blue-300 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700'
                } text-white flex items-center`}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    処理中...
                  </>
                ) : (
                  currentStep === WIZARD_STEPS.length - 1 ? '完了' : '次へ'
                )}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AIWizardPage;
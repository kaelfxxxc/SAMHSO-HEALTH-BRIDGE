import { useState } from 'react';
import { AlertTriangle, Heart, Shield, BookOpen, ChevronDown, ChevronUp } from 'lucide-react';

interface Article {
  id: string;
  title: string;
  category: string;
  icon: typeof AlertTriangle;
  content: string[];
  tips?: string[];
}

const HEALTH_ARTICLES: Article[] = [
  {
    id: '1',
    title: 'Understanding Substance Abuse and Addiction',
    category: 'General Information',
    icon: BookOpen,
    content: [
      'Substance abuse is a pattern of harmful use of any substance for mood-altering purposes. Addiction, also known as substance use disorder, is a chronic disease characterized by drug seeking and use that is compulsive, or difficult to control, despite harmful consequences.',
      'The brain changes that occur over time challenge an addicted person\'s self-control and interfere with their ability to resist intense urges to take drugs. These brain changes can be persistent, which is why drug addiction is considered a "relapsing" disease.',
      'People who are recovering from an addiction will be at risk for relapse for years and possibly for their whole lives. However, research shows that when treating addictions to opioids, medication should be the first line of treatment, usually combined with some form of behavioral therapy or counseling.'
    ],
    tips: [
      'Addiction is a treatable disease',
      'Recovery is possible with proper support',
      'Treatment should be tailored to individual needs',
      'Relapse prevention is an ongoing process'
    ]
  },
  {
    id: '2',
    title: 'Recognizing Signs of Substance Abuse',
    category: 'Warning Signs',
    icon: AlertTriangle,
    content: [
      'Recognizing the signs of substance abuse early can make a significant difference in getting help. Physical signs may include bloodshot eyes, dilated or constricted pupils, changes in appetite or sleep patterns, sudden weight loss or gain, and deterioration of physical appearance.',
      'Behavioral changes often include increased secrecy, lying about whereabouts or activities, sudden change in friends or hobbies, frequent trouble with the law, and financial difficulties. Psychological symptoms may involve personality changes, mood swings, irritability, anger outbursts, anxiety, or depression.',
      'If you notice these signs in yourself or a loved one, it\'s important to seek professional help. Early intervention can prevent the progression of addiction and its serious consequences.'
    ],
    tips: [
      'Trust your instincts if something feels wrong',
      'Document specific behaviors and incidents',
      'Approach conversations with compassion, not judgment',
      'Contact a healthcare professional for guidance'
    ]
  },
  {
    id: '3',
    title: 'Risks of Common Substances',
    category: 'Substance Information',
    icon: AlertTriangle,
    content: [
      'Alcohol: While legal for adults, alcohol is highly addictive and can cause liver disease, heart problems, and neurological damage. Binge drinking and long-term heavy use can lead to alcohol use disorder.',
      'Opioids: Including prescription painkillers and heroin, opioids are highly addictive and can cause respiratory depression, overdose, and death. The opioid epidemic has become a major public health crisis.',
      'Stimulants: Drugs like cocaine, methamphetamine, and prescription ADHD medications can cause heart problems, psychosis, and severe addiction. They may also lead to dangerous behaviors and poor decision-making.',
      'Cannabis: While increasingly legalized, marijuana use carries risks including impaired memory, decreased motivation, and potential for psychological dependence, especially when use begins in adolescence.',
      'Prescription Medications: Many prescription drugs, including benzodiazepines, stimulants, and opioids, carry significant risk of addiction when misused or used without medical supervision.'
    ],
    tips: [
      'No substance is completely safe',
      'Mixing substances increases risks dramatically',
      'Prescription medications should only be used as directed',
      'If you\'re struggling, reach out for help'
    ]
  },
  {
    id: '4',
    title: 'Prevention and Healthy Coping',
    category: 'Prevention',
    icon: Shield,
    content: [
      'Prevention starts with education and awareness. Understanding the risks of substance use, developing healthy coping mechanisms for stress, and building strong social support networks are all important protective factors.',
      'Healthy coping strategies include regular exercise, mindfulness and meditation, creative expression through art or music, maintaining strong relationships, getting adequate sleep, and seeking professional help when needed.',
      'For those at risk, prevention also means avoiding situations where substances are present, finding positive peer groups, developing life skills like problem-solving and communication, and addressing underlying mental health issues.',
      'Communities play a vital role in prevention through education programs, accessible mental health services, safe recreational opportunities, and reducing stigma around seeking help.'
    ],
    tips: [
      'Build a strong support network',
      'Develop healthy stress management techniques',
      'Stay physically active',
      'Seek help early if you\'re struggling',
      'Remember that asking for help is a sign of strength'
    ]
  },
  {
    id: '5',
    title: 'Supporting a Loved One in Recovery',
    category: 'Family Support',
    icon: Heart,
    content: [
      'Supporting someone in recovery requires patience, understanding, and clear boundaries. Recovery is a journey, not a destination, and your loved one will need ongoing support.',
      'Educate yourself about addiction and recovery. Understanding that addiction is a disease, not a moral failing, helps you provide better support. Learn about the specific substance and treatment approaches.',
      'Encourage treatment and participate in family therapy if recommended. Recovery affects the whole family, and family involvement in treatment can significantly improve outcomes.',
      'Set healthy boundaries. Supporting recovery doesn\'t mean enabling unhealthy behaviors. Learn the difference between helping and enabling, and don\'t be afraid to seek support for yourself.'
    ],
    tips: [
      'Practice active listening without judgment',
      'Celebrate small victories in recovery',
      'Take care of your own mental health',
      'Join a support group for families (like Al-Anon)',
      'Be prepared for potential relapses as part of the recovery process',
      'Maintain consistent, healthy boundaries'
    ]
  }
];

export function HealthInformation() {
  const [expandedArticle, setExpandedArticle] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', ...new Set(HEALTH_ARTICLES.map(a => a.category))];

  const filteredArticles = selectedCategory === 'All' 
    ? HEALTH_ARTICLES 
    : HEALTH_ARTICLES.filter(a => a.category === selectedCategory);

  const toggleArticle = (id: string) => {
    setExpandedArticle(expandedArticle === id ? null : id);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-gray-900 mb-4">Health Information</h2>
        <p className="text-gray-600 mb-6">
          Educational content on substance risks, signs of addiction, and preventive health measures.
        </p>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedCategory === category
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Articles */}
      <div className="space-y-4">
        {filteredArticles.map(article => {
          const Icon = article.icon;
          const isExpanded = expandedArticle === article.id;

          return (
            <div key={article.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
              <button
                onClick={() => toggleArticle(article.id)}
                className="w-full p-6 flex items-start gap-4 hover:bg-gray-50 transition-colors text-left"
              >
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon className="w-6 h-6 text-indigo-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-gray-900 mb-1">{article.title}</h3>
                  <span className="text-indigo-600">{article.category}</span>
                </div>
                <div className="flex-shrink-0">
                  {isExpanded ? (
                    <ChevronUp className="w-6 h-6 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-6 h-6 text-gray-400" />
                  )}
                </div>
              </button>

              {isExpanded && (
                <div className="px-6 pb-6 space-y-4 border-t border-gray-100">
                  <div className="pt-4 space-y-4">
                    {article.content.map((paragraph, index) => (
                      <p key={index} className="text-gray-700">{paragraph}</p>
                    ))}
                  </div>

                  {article.tips && (
                    <div className="bg-indigo-50 rounded-lg p-4">
                      <h4 className="text-gray-900 mb-3">Key Takeaways:</h4>
                      <ul className="space-y-2">
                        {article.tips.map((tip, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full mt-2 flex-shrink-0" />
                            <span className="text-gray-700">{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Emergency Resources */}
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <div className="flex items-start gap-3 mb-4">
          <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0" />
          <div>
            <h3 className="text-red-900 mb-2">Emergency Resources</h3>
            <p className="text-red-800 mb-4">
              If you or someone you know is experiencing a mental health crisis or substance-related emergency, immediate help is available.
            </p>
          </div>
        </div>
        <div className="space-y-2 ml-9">
          <p className="text-red-900"><strong>988 Suicide & Crisis Lifeline:</strong> Call or text 988</p>
          <p className="text-red-900"><strong>SAMHSA National Helpline:</strong> 1-800-662-HELP (4357)</p>
          <p className="text-red-900"><strong>Crisis Text Line:</strong> Text HOME to 741741</p>
        </div>
      </div>
    </div>
  );
}

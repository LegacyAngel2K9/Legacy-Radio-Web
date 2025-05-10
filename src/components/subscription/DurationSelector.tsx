import React, { useState } from 'react';
import clsx from 'clsx';
import { CheckCircle2 } from 'lucide-react';
import { SubscriptionDuration } from '../../types';

interface DurationOption {
  value: SubscriptionDuration;
  label: string;
  months: string;
  discount: string;
}

interface DurationSelectorProps {
  selectedDuration: SubscriptionDuration;
  onChange: (duration: SubscriptionDuration) => void;
}

const options: DurationOption[] = [
  { value: 1, label: '1 Month', months: '1', discount: '0%' },
  { value: 3, label: '3 Months', months: '3', discount: '5%' },
  { value: 6, label: '6 Months', months: '6', discount: '10%' },
  { value: 12, label: '12 Months', months: '12', discount: '15%' },
];

const DurationSelector: React.FC<DurationSelectorProps> = ({ 
  selectedDuration, 
  onChange 
}) => {
  const [hoveredOption, setHoveredOption] = useState<SubscriptionDuration | null>(null);
  
  return (
    <div className="w-full">
      <h3 className="text-lg font-medium text-gray-900 mb-4">
        Select Subscription Duration
      </h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {options.map((option) => {
          const isSelected = selectedDuration === option.value;
          const isHovered = hoveredOption === option.value;
          
          return (
            <div
              key={option.value}
              className={clsx(
                'relative flex flex-col items-center p-4 rounded-lg border-2 cursor-pointer transition-all',
                {
                  'border-primary-500 bg-primary-50': isSelected,
                  'border-gray-200 hover:border-primary-300 hover:bg-primary-50': !isSelected,
                  'transform scale-105': isHovered,
                }
              )}
              onClick={() => onChange(option.value)}
              onMouseEnter={() => setHoveredOption(option.value)}
              onMouseLeave={() => setHoveredOption(null)}
            >
              {isSelected && (
                <div className="absolute top-2 right-2">
                  <CheckCircle2 className="h-5 w-5 text-primary-500" />
                </div>
              )}
              
              <div className="text-xl font-bold">{option.label}</div>
              
              {option.value > 1 && (
                <div className="mt-2 text-sm px-2 py-1 bg-accent-100 text-accent-700 rounded-full">
                  Save {option.discount}
                </div>
              )}
              
              <div className="mt-4 w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-primary-500 h-full"
                  style={{ width: `${(option.value / 12) * 100}%` }}
                />
              </div>
              
              <div className="mt-2 text-sm text-gray-500 w-full text-center">
                {option.months} {option.months === '1' ? 'month' : 'months'}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DurationSelector;
import React, { useState } from 'react';

const MarksCalculator = () => {
  const [numSubjects, setNumSubjects] = useState('');
  const [step, setStep] = useState(1);
  const [marks, setMarks] = useState([]);
  const [result, setResult] = useState(null);

  const handleNext = () => {
    const num = parseInt(numSubjects);
    if (isNaN(num) || num <= 0) {
      alert('Please enter a valid number of subjects (greater than 0).');
      return;
    }
    setMarks(Array(num).fill(''));
    setStep(2);
  };

  const handleMarkChange = (index, value) => {
    const newMarks = [...marks];
    newMarks[index] = value;
    setMarks(newMarks);
  };

  const calculateResults = () => {
    let totalMarks = 0;
    let isPass = true;
    const passingMarksPerSubject = 40;

    for (let i = 0; i < marks.length; i++) {
      const mark = parseFloat(marks[i]);
      if (isNaN(mark) || mark < 0 || mark > 100) {
        alert(`Please enter valid marks for Subject ${i + 1} (between 0 and 100).`);
        return;
      }
      totalMarks += mark;
      if (mark < passingMarksPerSubject) {
        isPass = false;
      }
    }

    const average = totalMarks / marks.length;
    const percentage = (totalMarks / (marks.length * 100)) * 100;

    let grade = '';
    if (!isPass) {
      grade = 'F';
    } else if (percentage >= 90) {
      grade = 'A+';
    } else if (percentage >= 80) {
      grade = 'A';
    } else if (percentage >= 70) {
      grade = 'B';
    } else if (percentage >= 60) {
      grade = 'C';
    } else if (percentage >= 50) {
      grade = 'D';
    } else {
      grade = 'F';
    }

    setResult({
      totalMarks,
      totalPossible: marks.length * 100,
      average: average.toFixed(2),
      percentage: percentage.toFixed(2),
      grade,
      isPass: isPass && percentage >= 40,
    });
  };

  const resetForm = () => {
    setNumSubjects('');
    setStep(1);
    setMarks([]);
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-indigo-600 mb-6">Marks Calculator</h1>

        {step === 1 && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Enter Number of Subjects:
              </label>
              <input
                type="number"
                min="1"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                placeholder="e.g., 5"
                value={numSubjects}
                onChange={(e) => setNumSubjects(e.target.value)}
              />
            </div>
            <button
              onClick={handleNext}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
            >
              Next
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <h3 className="font-medium text-gray-800 border-b pb-2">Enter Marks (out of 100)</h3>
            <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
              {marks.map((mark, index) => (
                <div key={index}>
                  <label className="block text-sm text-gray-600 mb-1">Subject {index + 1}:</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                    placeholder="0 - 100"
                    value={mark}
                    onChange={(e) => handleMarkChange(index, e.target.value)}
                  />
                </div>
              ))}
            </div>
            
            <div className="pt-4 space-y-2">
              <button
                onClick={calculateResults}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
              >
                Calculate Grade
              </button>
              <button
                onClick={resetForm}
                className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg transition-colors"
              >
                Start Over
              </button>
            </div>
          </div>
        )}

        {result && (
          <div className="mt-6 p-5 bg-gray-50 rounded-lg border border-gray-100">
            <h3 className="font-bold text-lg mb-4 text-gray-800">Results</h3>
            <div className="space-y-2 text-sm">
              <p className="flex justify-between">
                <span className="text-gray-600">Total Marks:</span>
                <span className="font-semibold">{result.totalMarks} / {result.totalPossible}</span>
              </p>
              <p className="flex justify-between">
                <span className="text-gray-600">Average:</span>
                <span className="font-semibold">{result.average}</span>
              </p>
              <p className="flex justify-between">
                <span className="text-gray-600">Percentage:</span>
                <span className="font-semibold">{result.percentage}%</span>
              </p>
              <p className="flex justify-between">
                <span className="text-gray-600">Grade:</span>
                <span className="font-bold text-indigo-600">{result.grade}</span>
              </p>
              <div className="pt-2 mt-2 border-t border-gray-200 flex justify-between items-center">
                <span className="text-gray-600">Status:</span>
                <span className={`font-bold px-3 py-1 rounded-full ${
                  result.isPass ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                  {result.isPass ? 'PASS' : 'FAIL'}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MarksCalculator;

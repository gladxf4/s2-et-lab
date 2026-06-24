import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MoonIcon, SunIcon } from '../assets/icons';

const PASSING = 40;

const getGrade = (perc, passed) => {
  if (!passed) return 'F';
  if (perc >= 90) return 'A+';
  if (perc >= 80) return 'A';
  if (perc >= 70) return 'B';
  if (perc >= 60) return 'C';
  if (perc >= 50) return 'D';
  return 'F';
};

const gradeLabel = {
  'A+': 'Outstanding',
  'A': 'Excellent',
  'B': 'Good',
  'C': 'Average',
  'D': 'Below Average',
  'F': 'Fail',
};

export default function MarksCalculator({ darkMode, setDarkMode }) {
  const [numSubjects, setNumSubjects] = useState('');
  const [step, setStep] = useState(1);
  const [marks, setMarks] = useState([]);
  const [result, setResult] = useState(null);

  const handleNext = () => {
    const num = parseInt(numSubjects);
    if (isNaN(num) || num < 1 || num > 20) {
      alert('Enter a valid number of subjects');
      return;
    }
    setMarks(Array(num).fill(''));
    setResult(null);
    setStep(2);
  };

  const handleMarkChange = (i, val) => {
    const updated = [...marks];
    updated[i] = val;
    setMarks(updated);
  };

  const calculate = () => {
    let total = 0;
    let allPass = true;
    for (let i = 0; i < marks.length; i++) {
      const m = parseFloat(marks[i]);
      if (isNaN(m) || m < 0 || m > 100) {
        alert(`Enter valid marks for Subject ${i + 1}`);
        return;
      }
      total += m;
      if (m < PASSING) allPass = false;
    }
    const avg = total / marks.length;
    const perc = (total / (marks.length * 100)) * 100;
    setResult({
      total,
      max: marks.length * 100,
      avg: avg.toFixed(1),
      perc: perc.toFixed(1),
      grade: getGrade(perc, allPass),
      pass: allPass,
    });
  };

  const reset = () => {
    setNumSubjects('');
    setStep(1);
    setMarks([]);
    setResult(null);
  };

  const cols = marks.length > 4 ? 'grid-cols-2' : 'grid-cols-1';

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 transition-colors duration-300 flex flex-col items-center justify-center p-6">

      {/* Top bar */}
      <div className="w-full max-w-sm mb-6 flex items-center justify-between">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="flex items-center gap-1.5 text-zinc-400 dark:text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors text-xs"
        >
          {darkMode ? <SunIcon /> : <MoonIcon />}
          {darkMode ? 'Light' : 'Dark'}
        </button>
      </div>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="w-full max-w-sm bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-sm"
      >

        <div className="p-6">
          <div className="mb-5">
            <h1 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
              Marks Calculator
            </h1>
            <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-0.5">
              Passing marks: {PASSING}/100 per subject
            </p>
          </div>

          {/* Steps */}
          <AnimatePresence mode="wait">

            {/* Step 1 — subject count */}
            {step === 1 && (
              <motion.div key="step1" className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1.5 uppercase tracking-wide">
                    Number of Subjects
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="20"
                    placeholder="Enter a number (1–20)"
                    value={numSubjects}
                    onChange={(e) => setNumSubjects(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleNext()}
                    className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-400 transition"
                  />
                </div>
                <button
                  onClick={handleNext}
                  className="w-full py-2.5 text-sm font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white transition-colors"
                >
                  Continue →
                </button>
              </motion.div>
            )}

            {/* Step 2 — enter marks + results */}
            {step === 2 && (
              <motion.div key="step2" className="space-y-5">

                {/* Marks grid — no scroll */}
                <div>
                  <label className="block text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wide mb-3">
                    Marks — {marks.length} Subject{marks.length > 1 ? 's' : ''}
                  </label>
                  <div className={`grid ${cols} gap-2.5`}>
                    {marks.map((val, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.03 }}
                      >
                        <div className="relative">
                          <input
                            type="number"
                            min="0"
                            max="100"
                            placeholder="0–100"
                            value={val}
                            onChange={(e) => handleMarkChange(i, e.target.value)}
                            className="w-full pl-3.5 pr-3.5 py-2 text-sm rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 transition"
                          />
                          <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] text-zinc-400 dark:text-zinc-600 pointer-events-none">
                            S{i + 1}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Result panel */}
                <AnimatePresence>
                  {result && (
                    <motion.div
                      key="result"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25, ease: 'easeOut' }}
                      className="overflow-hidden"
                    >
                      <div className="rounded-lg border border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/50 p-4 space-y-3">
                        {/* Grade headline */}
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="text-xs text-zinc-400 dark:text-zinc-500 uppercase tracking-wide">Grade</p>
                            <p className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 leading-tight">
                              {result.grade}
                            </p>
                            <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-0.5">{gradeLabel[result.grade]}</p>
                          </div>
                          <span className={`mt-1 text-xs font-semibold px-2.5 py-1 rounded-full ${result.pass
                            ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 ring-1 ring-emerald-200 dark:ring-emerald-800'
                            : 'bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400 ring-1 ring-red-200 dark:ring-red-800'
                            }`}>
                            {result.pass ? 'Passed' : 'Failed'}
                          </span>
                        </div>

                        {/* Stats row */}
                        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-zinc-200 dark:border-zinc-700">
                          {[
                            { label: 'Total', value: `${result.total}/${result.max}` },
                            { label: 'Average', value: result.avg },
                            { label: 'Percentage', value: `${result.perc}%` },
                          ].map(({ label, value }) => (
                            <div key={label} className="text-center">
                              <p className="text-xs text-zinc-400 dark:text-zinc-500">{label}</p>
                              <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 mt-0.5">{value}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Action row */}
                <div className="flex gap-2">
                  <button
                    onClick={calculate}
                    className="flex-1 py-2.5 text-sm font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white transition-colors"
                  >
                    Calculate
                  </button>
                  <button
                    onClick={reset}
                    className="px-4 py-2.5 text-sm font-medium rounded-lg border border-zinc-200 dark:border-zinc-700 text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                  >
                    Reset
                  </button>
                </div>

              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </motion.div>

      {/* Footer */}
      <p className="mt-6 text-[11px] text-zinc-400 dark:text-zinc-700">
        Grades: A+ ≥90 · A ≥80 · B ≥70 · C ≥60 · D ≥50 · F &lt;50
      </p>
    </div>
  );
}

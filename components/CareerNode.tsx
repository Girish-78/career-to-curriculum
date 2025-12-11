import React from 'react';
import { Career } from '../types';
import { Briefcase, TrendingUp, IndianRupee, BookOpen, GraduationCap } from 'lucide-react';

interface CareerNodeProps {
  career: Career;
  index: number;
}

export const CareerNode: React.FC<CareerNodeProps> = ({ career, index }) => {
  return (
    <div className="relative group print-break-inside">
      {/* Connector Line (Desktop Only visual) */}
      <div className="hidden lg:block absolute -left-8 top-1/2 w-8 h-0.5 bg-gradient-to-r from-physics-accent/50 to-physics-secondary/50 transform -translate-y-1/2 print:hidden"></div>
      
      <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-physics-accent transition-all duration-300 hover:shadow-[0_0_20px_rgba(56,189,248,0.2)] print:bg-white print:text-black print-border">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${index % 2 === 0 ? 'bg-blue-500/20 text-blue-400' : 'bg-purple-500/20 text-purple-400'} print:bg-gray-200 print:text-black`}>
              <Briefcase size={20} />
            </div>
            <h3 className="font-display text-xl font-bold text-white print-text-black">{career.title}</h3>
          </div>
          <span className="text-xs font-mono px-2 py-1 rounded bg-slate-700 text-slate-300 print:bg-gray-100 print:text-black">
            {career.degreeLevel}
          </span>
        </div>

        <p className="text-slate-300 text-sm mb-4 leading-relaxed print-text-black">
          {career.description}
        </p>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-slate-900/50 rounded-lg p-3 print:bg-gray-50">
            <div className="flex items-center gap-2 text-emerald-400 mb-1">
              <IndianRupee size={14} />
              <span className="text-xs font-semibold uppercase">Avg Salary</span>
            </div>
            <p className="font-mono text-lg font-bold">₹{career.salary.toLocaleString()}</p>
          </div>
          <div className="bg-slate-900/50 rounded-lg p-3 print:bg-gray-50">
            <div className="flex items-center gap-2 text-physics-accent mb-1">
              <TrendingUp size={14} />
              <span className="text-xs font-semibold uppercase">Growth</span>
            </div>
            <p className="font-mono text-lg font-bold">+{career.growth}%</p>
          </div>
        </div>

        {/* Classroom Link Section */}
        <div className="mt-4 pt-4 border-t border-slate-700 print-border">
          <div className="flex items-center gap-2 text-orange-400 mb-2 print:text-black">
            <BookOpen size={16} />
            <span className="text-sm font-bold uppercase">Classroom Link</span>
          </div>
          <p className="text-sm text-slate-300 italic bg-orange-500/10 p-3 rounded border-l-2 border-orange-500 print:text-black print:bg-transparent print:border-black">
            "{career.classroomActivity}"
          </p>
        </div>

        {/* Skills Tags */}
        <div className="mt-4 flex flex-wrap gap-2">
            {career.skills.map((skill, i) => (
                <span key={i} className="text-xs px-2 py-1 rounded-full bg-slate-700 text-slate-300 print:border print:border-gray-300 print:bg-white print:text-black">
                    {skill}
                </span>
            ))}
        </div>
      </div>
    </div>
  );
};
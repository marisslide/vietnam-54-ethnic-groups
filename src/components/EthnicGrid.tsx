import React from 'react';
import { SearchX, RotateCcw } from 'lucide-react';
import { EthnicGroup } from '../types/ethnic';
import { EthnicCard } from './EthnicCard';

interface EthnicGridProps {
  groups: EthnicGroup[];
  onSelectEthnic: (ethnicId: string) => void;
  onResetFilters: () => void;
  fullWidth?: boolean;
}

export const EthnicGrid: React.FC<EthnicGridProps> = ({
  groups,
  onSelectEthnic,
  onResetFilters,
  fullWidth = false,
}) => {
  if (groups.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-14 px-6 rounded-2xl bg-white/80 border border-slate-900/8">
        <SearchX className="w-11 h-11 text-slate-400 mb-3" />
        <h3 className="font-display font-bold text-base text-slate-800">
          No matching ethnic groups found
        </h3>
        <p className="mt-1 text-sm text-slate-500 max-w-md">
          Try searching with another name or reset the region and language family filters to view all 54 ethnic groups of Vietnam.
        </p>
        <button
          type="button"
          onClick={onResetFilters}
          className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#15B8A6] hover:bg-[#119e8e] text-white text-sm font-bold transition-colors cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          <span>View all 54 ethnic groups</span>
        </button>
      </div>
    );
  }

  const gridClass = fullWidth
    ? 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-3 lg:gap-3.5'
    : 'grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3';

  return (
    <div className={gridClass}>
      {groups.map((group) => (
        <EthnicCard key={group.id} group={group} onSelect={onSelectEthnic} />
      ))}
    </div>
  );
};

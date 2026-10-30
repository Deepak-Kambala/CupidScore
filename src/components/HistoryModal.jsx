import React from 'react';
import { X, History, Trash2, ArrowRight, Heart } from 'lucide-react';

export default function HistoryModal({
  isOpen,
  onClose,
  history,
  onSelectHistory,
  onDeleteHistory,
  onClearHistory,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-2xl my-8 bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-2xl border border-rose-200/80 dark:border-rose-900/40 text-slate-800 dark:text-slate-100 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-rose-100 dark:border-rose-950/60 mb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center">
              <History className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-editorial text-2xl font-bold">
                Compatibility History
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {history.length} {history.length === 1 ? 'match' : 'matches'} saved on this device
              </p>
            </div>
          </div>

          {history.length > 0 && (
            <button
              onClick={onClearHistory}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear All</span>
            </button>
          )}
        </div>

        {/* History List */}
        {history.length > 0 ? (
          <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
            {history.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-4 rounded-2xl bg-rose-50/40 dark:bg-slate-800/50 hover:bg-rose-50/80 dark:hover:bg-slate-800 border border-rose-100 dark:border-rose-900/40 transition-all group"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-rose-500 to-pink-500 text-white font-bold flex items-center justify-center text-sm shadow-sm shrink-0">
                    {item.percent}%
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-sm sm:text-base text-slate-800 dark:text-slate-100">
                      {item.name1} & {item.name2}
                    </h4>
                    <div className="flex items-center gap-2 mt-0.5 text-[11px] text-slate-500 dark:text-slate-400">
                      <span>{item.details ? item.details.tier : item.mood || 'Calculated Match'}</span>
                      <span>•</span>
                      <span>
                        {new Date(item.timestamp).toLocaleDateString(undefined, {
                          month: 'short',
                          day: 'numeric',
                        })}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      onSelectHistory(item);
                      onClose();
                    }}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold text-rose-600 bg-white dark:bg-slate-700 hover:bg-rose-50 dark:hover:bg-slate-600 border border-rose-200/60 dark:border-slate-600 shadow-2xs transition-all cursor-pointer"
                    title="Load into Calculator"
                  >
                    <span>Load</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>

                  <button
                    onClick={() => onDeleteHistory(item.id)}
                    className="p-1.5 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-100/50 transition-colors cursor-pointer"
                    title="Delete record"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 px-4 rounded-2xl bg-rose-50/40 dark:bg-slate-800/30 border border-dashed border-rose-200 dark:border-slate-700">
            <Heart className="w-10 h-10 text-rose-300 mx-auto mb-2" />
            <h4 className="font-serif font-bold text-base text-slate-700 dark:text-slate-200">
              No calculations yet
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Enter two names in the calculator above and click Calculate to save your first love compatibility test!
            </p>
          </div>
        )}

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl font-medium text-xs text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}


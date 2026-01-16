import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import '../styles/odoo-theme.css';

type Tile = { key: string; label: string; icon: string; color?: string };
type Category = { name: string; tiles: Tile[] };

const CATEGORIES: Category[] = [
  {
    name: 'Website',
    tiles: [
      { key: 'website', label: 'Website', icon: 'fa-solid fa-globe', color: '#00A09D' },
      { key: 'ecommerce', label: 'eCommerce', icon: 'fa-solid fa-cart-shopping', color: '#00A09D' },
      { key: 'blog', label: 'Blog', icon: 'fa-solid fa-pen-nib', color: '#00A09D' },
      { key: 'forum', label: 'Forum', icon: 'fa-solid fa-comments', color: '#00A09D' },
      { key: 'elearning', label: 'eLearning', icon: 'fa-solid fa-graduation-cap', color: '#00A09D' },
      { key: 'events', label: 'Events', icon: 'fa-solid fa-calendar-days', color: '#00A09D' },
    ],
  },
  {
    name: 'Sales',
    tiles: [
      { key: 'crm', label: 'CRM', icon: 'fa-solid fa-users', color: '#714B67' },
      { key: 'sales', label: 'Sales', icon: 'fa-solid fa-chart-line', color: '#714B67' },
      { key: 'pos', label: 'Point of Sale', icon: 'fa-solid fa-store', color: '#714B67' },
      { key: 'restaurant', label: 'Restaurant', icon: 'fa-solid fa-utensils', color: '#714B67' },
      { key: 'subscriptions', label: 'Subscriptions', icon: 'fa-solid fa-arrows-rotate', color: '#714B67' },
      { key: 'rental', label: 'Rental', icon: 'fa-solid fa-key', color: '#714B67' },
    ],
  },
  {
    name: 'Finance',
    tiles: [
      { key: 'invoicing', label: 'Invoicing', icon: 'fa-solid fa-file-invoice-dollar', color: '#F0AD4E' },
      { key: 'accounting', label: 'Accounting', icon: 'fa-solid fa-coins', color: '#F0AD4E' },
      { key: 'expenses', label: 'Expenses', icon: 'fa-solid fa-wallet', color: '#F0AD4E' },
      { key: 'sign', label: 'Sign', icon: 'fa-solid fa-signature', color: '#F0AD4E' },
    ],
  },
  {
    name: 'Services',
    tiles: [
      { key: 'project', label: 'Project', icon: 'fa-solid fa-diagram-project', color: '#5BC0DE' },
      { key: 'timesheets', label: 'Timesheets', icon: 'fa-solid fa-stopwatch', color: '#5BC0DE' },
      { key: 'field-service', label: 'Field Service', icon: 'fa-solid fa-bolt', color: '#5BC0DE' },
      { key: 'helpdesk', label: 'Helpdesk', icon: 'fa-solid fa-headphones', color: '#5BC0DE' },
    ],
  },
];

export const ChooseApps: React.FC = () => {
  const navigate = useNavigate();
  const [search] = useSearchParams();
  const initialSelected = useMemo(() => {
    const v = (search.get('selected') || '').trim();
    if (!v) return [] as string[];
    return Array.from(new Set(v.split(',').map(s => s.trim()).filter(Boolean)));
  }, [search]);
  const [selected, setSelected] = useState<string[]>(initialSelected);

  const toggle = (key: string) => {
    setSelected((prev) => (prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]));
  };

  const onContinue = () => {
    const qs = selected.length ? `?selected=${encodeURIComponent(selected.join(','))}` : '';
    navigate(`/get-started${qs}`);
  };

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <div className="max-w-7xl mx-auto px-4 py-12 flex items-start gap-8">

        {/* Main Grid */}
        <div className="flex-1">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold text-[#212529] mb-4">Choose your apps</h1>
            <p className="text-xl text-gray-500">Free instant access. No credit card required.</p>
          </div>

          {CATEGORIES.map((cat) => (
            <div key={cat.name} className="mb-12">
              <h2 className="text-xl font-bold text-[#212529] mb-6 border-b border-gray-200 pb-2">{cat.name}</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {cat.tiles.map((t) => {
                  const isSel = selected.includes(t.key);
                  return (
                    <div
                      key={t.key}
                      onClick={() => toggle(t.key)}
                      className={`
                        cursor-pointer rounded-xl bg-white p-6 flex flex-col items-center justify-center gap-4 transition-all duration-200 relative
                        ${isSel ? 'shadow-lg ring-2 ring-[#714B67] transform -translate-y-1' : 'shadow-sm hover:shadow-md border border-gray-100'}
                      `}
                    >
                      {isSel && (
                        <div className="absolute top-2 right-2 bg-[#714B67] text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                          <i className="fa-solid fa-check"></i>
                        </div>
                      )}

                      <div
                        className="w-12 h-12 flex items-center justify-center text-3xl"
                        style={{ color: t.color }}
                      >
                        <i className={t.icon}></i>
                      </div>
                      <span className="font-semibold text-gray-700 text-sm text-center">{t.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Sticky Sidebar */}
        <div className={`hidden lg:block w-80 sticky top-8 transition-opacity duration-300 ${selected.length > 0 ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          <div className="bg-white rounded-xl shadow-xl p-6 border border-gray-100">
            <h3 className="text-lg font-bold mb-4 flex justify-between items-center">
              Your Selection
              <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">{selected.length}</span>
            </h3>

            <div className="max-h-[300px] overflow-y-auto mb-6 space-y-2 pr-2">
              {selected.map(k => (
                <div key={k} className="flex items-center gap-3 text-sm text-gray-600 bg-gray-50 p-2 rounded">
                  <span className="capitalize font-medium">{k}</span>
                </div>
              ))}
            </div>

            <div className="bg-[#EFFFFF] text-[#00A09D] p-3 rounded-lg text-sm mb-6 flex gap-2">
              <i className="fa-solid fa-info-circle mt-0.5"></i>
              <p><strong>Free forever</strong> for unlimited users.</p>
            </div>

            <button
              onClick={onContinue}
              className="w-full bg-[#714B67] hover:bg-[#5d3d54] text-white font-bold py-3 rounded-lg transition-all shadow-md group"
            >
              Continue <i className="fa-solid fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform"></i>
            </button>
          </div>
        </div>

        {/* Mobile Floating Button */}
        {selected.length > 0 && (
          <div className="lg:hidden fixed bottom-6 left-6 right-6 z-50">
            <button
              onClick={onContinue}
              className="w-full bg-[#714B67] text-white font-bold py-4 rounded-full shadow-2xl flex justify-between items-center px-8"
            >
              <span>{selected.length} Apps Selected</span>
              <span>Continue &rarr;</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default ChooseApps;

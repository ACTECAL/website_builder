import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import type { AppModuleMeta } from '../data/appModules';
import '../styles/Apps.css';

interface AppTemplateProps {
  module: AppModuleMeta;
}

export const AppTemplate: React.FC<AppTemplateProps> = ({ module }) => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category');
  const backUrl = category ? `/apps?category=${category}` : '/apps';

  return (
    <div className="apps-catalog">
      <div className="max-w-[1200px] mx-auto px-4 py-8">

        <nav className="mb-12">
          <Link to={backUrl} className="text-gray-500 hover:text-[#714B67] font-medium flex items-center gap-2 transition-colors no-underline">
            <i className="fa-solid fa-arrow-left"></i> Back to apps
          </Link>
        </nav>

        {/* Hero */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
          <div>
            <span className="uppercase tracking-widest text-[#00A09D] font-bold text-sm mb-4 block">
              {module.category}
            </span>
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-[#212529] tracking-tight">
              {module.name}
            </h1>
            <p className="text-xl text-gray-500 mb-8 leading-relaxed">
              {module.longDescription}
            </p>
            <div className="flex gap-4">
              <a
                href={`mailto:sales@actyx.com?subject=Demo ${module.name}`}
                className="bg-[#714B67] hover:bg-[#5d3d54] text-white px-8 py-3 rounded-lg font-bold shadow-lg hover:shadow-xl transition-all inline-block no-underline"
              >
                {module.ctaLabel ?? 'Start Free Trial'}
              </a>
              <button className="px-8 py-3 rounded-lg font-bold text-[#212529] bg-gray-100 hover:bg-gray-200 transition-all">
                Watch Video
              </button>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-6 mt-12 border-t border-gray-100 pt-8">
              {module.metrics.map((m, i) => (
                <div key={i}>
                  <div className="text-2xl font-bold text-[#212529]">{m.value}</div>
                  <div className="text-sm text-gray-500 uppercase font-semibold">{m.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Visual/Screenshot Placeholder */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-[#714B67]/10 to-[#00A09D]/10 rounded-3xl transform rotate-3 scale-105"></div>
            <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-2 relative z-10 overflow-hidden aspect-[4/3] flex items-center justify-center group">
              {/* Placeholder for App Interface */}
              <div className="text-center">
                <div className="w-20 h-20 bg-gray-100 rounded-2xl mx-auto mb-4 flex items-center justify-center text-4xl text-[#714B67]">
                  <i className="fa-solid fa-layer-group"></i>
                </div>
                <p className="text-gray-400 font-medium">App Interface Preview</p>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute inset-0 bg-black/5 flex items-center justify-center">
                  <i className="fa-solid fa-magnifying-glass-plus text-3xl text-gray-700"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mb-24">
          <h2 className="text-3xl font-bold text-center mb-16">Why everyone loves {module.name}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {module.highlights.map((highlight, idx) => (
              <div key={idx} className="bg-gray-50 rounded-xl p-8 hover:bg-white hover:shadow-xl transition-all border border-transparent hover:border-gray-100">
                <div className="w-12 h-12 bg-[#00A09D]/10 text-[#00A09D] rounded-full flex items-center justify-center text-xl mb-6">
                  <i className="fa-solid fa-check"></i>
                </div>
                <p className="text-lg text-gray-700 font-medium leading-relaxed">
                  "{highlight}"
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Integrations */}
        <div className="bg-[#212529] text-white rounded-3xl p-12 md:p-20 text-center relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-8">Works perfectly with</h2>
            <div className="flex flex-wrap justify-center gap-4">
              {module.integrations.map((tool) => (
                <span key={tool} className="bg-white/10 hover:bg-white/20 px-6 py-2 rounded-full font-medium transition-colors cursor-default border border-white/10">
                  {tool}
                </span>
              ))}
            </div>
            <div className="mt-12">
              <Link to="/get-started" className="inline-block bg-[#00A09D] hover:bg-[#008f8c] text-white px-10 py-4 rounded-full font-bold shadow-lg hover:shadow-[#00A09D]/50 transition-all transform hover:-translate-y-1 no-underline">
                Get Started with {module.name}
              </Link>
            </div>
          </div>

          {/* Background blobs */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#714B67] opacity-20 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#00A09D] opacity-20 rounded-full blur-3xl -translate-x-1/3 translate-y-1/3"></div>
        </div>

      </div>
    </div>
  );
};

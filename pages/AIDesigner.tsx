
import React, { useState } from 'react';
import { generateDesignConcept, generateUniformPreview } from '../services/geminiService';

const AIDesigner: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ text: string; image: string | null } | null>(null);

  const handleDesign = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setLoading(true);
    setResult(null);
    try {
      const [text, image] = await Promise.all([
        generateDesignConcept(prompt),
        generateUniformPreview(prompt)
      ]);
      setResult({ text, image });
    } catch (error) {
      console.error("AI design failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-12 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* Left: Input */}
          <div className="sticky top-32">
            <h1 className="text-5xl font-black mb-6 text-blue-500">AI DESIGN LAB</h1>
            <p className="text-gray-400 text-lg mb-8">
              Describe your dream uniform, and our AI design consultant will generate a professional concept specification and visual preview for you.
            </p>

            <form onSubmit={handleDesign} className="space-y-6">
              <div>
                <label className="block text-sm font-bold uppercase tracking-widest text-gray-500 mb-2">Design Requirements</label>
                <textarea 
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="e.g. A modern soccer uniform for a 'Cobras' team using electric yellow and deep purple with honeycomb texture patterns..."
                  className="w-full h-40 bg-gray-800 border border-gray-700 rounded-lg p-4 text-white placeholder-gray-600 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                />
              </div>
              <button 
                disabled={loading || !prompt.trim()}
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white py-4 rounded-lg font-black text-xl transition-all shadow-xl flex items-center justify-center gap-3"
              >
                {loading ? (
                  <>
                    <div className="w-6 h-6 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
                    CONCEPTING...
                  </>
                ) : 'GENERATE CONCEPT'}
              </button>
            </form>

            <div className="mt-12 p-6 bg-gray-800/50 rounded-xl border border-gray-700">
              <h4 className="font-bold text-sm uppercase text-blue-500 mb-2">Pro Tip</h4>
              <p className="text-gray-400 text-sm">Mention sports, colors, team names, and specific textures like "matte", "mesh", or "sublimated gradients" for better results.</p>
            </div>
          </div>

          {/* Right: Output */}
          <div className="min-h-[600px] border-2 border-dashed border-gray-700 rounded-2xl flex flex-col items-center justify-center p-8 bg-gray-800/30">
            {!result && !loading && (
              <div className="text-center">
                <div className="text-6xl mb-4 opacity-20">🎨</div>
                <p className="text-gray-500 font-bold uppercase">Your AI Design will appear here</p>
              </div>
            )}

            {loading && (
              <div className="text-center space-y-4">
                <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                <p className="text-blue-500 font-black animate-pulse">WORLD MARKET AI IS WORKING...</p>
              </div>
            )}

            {result && (
              <div className="w-full space-y-8 animate-fadeIn">
                {result.image && (
                  <div className="rounded-xl overflow-hidden shadow-2xl border-4 border-blue-600">
                    <img src={result.image} alt="Preview" className="w-full aspect-square object-cover" />
                  </div>
                )}
                <div className="bg-gray-800 p-8 rounded-xl prose prose-invert max-w-none shadow-lg">
                  <h3 className="text-2xl font-black text-blue-500 mb-4 uppercase">Design Specification</h3>
                  <div className="text-gray-300 whitespace-pre-line leading-relaxed">
                    {result.text}
                  </div>
                </div>
                <button 
                  onClick={() => window.location.href = '#/contact'}
                  className="w-full border-2 border-blue-600 text-blue-500 hover:bg-blue-600 hover:text-white py-4 rounded-lg font-black text-xl transition-all"
                >
                  REQUEST MANUFACTURING QUOTE
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default AIDesigner;

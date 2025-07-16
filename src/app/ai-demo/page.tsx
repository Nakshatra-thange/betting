export default function AIDemoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-slate-900 text-white px-6 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-6xl font-bold text-center mb-8 bg-gradient-to-r from-purple-400 to-indigo-400 text-transparent bg-clip-text">
          Try Our AI Demo
        </h1>

        <p className="text-lg text-white/80 text-center mb-12">
          Get a hands-on experience of our smart prediction AI — the same technology that powers outcomes for thousands of users.
        </p>

        <div className="bg-white/10 rounded-xl border border-white/20 p-6 mb-16 backdrop-blur-sm">
          <h2 className="text-2xl font-semibold mb-4 text-purple-300">What Does This AI Do?</h2>
          <ul className="list-disc list-inside text-white/80 space-y-2">
            <li>Analyzes input data trends to predict potential outcomes.</li>
            <li>Uses natural language and pattern recognition models.</li>
            <li>Ideal for product recommendations, stock trends, and user behavior forecasting.</li>
          </ul>
        </div>

        <div className="bg-white/10 rounded-xl border border-white/20 p-6 mb-16 backdrop-blur-sm">
          <h2 className="text-2xl font-semibold mb-4 text-indigo-300">Steps to Build This AI (Demo Outline)</h2>
          <ol className="list-decimal list-inside text-white/80 space-y-2">
            <li>Collect dataset relevant to predictions (e.g., sales, user logs).</li>
            <li>Preprocess the data: normalize, clean, and label.</li>
            <li>Train a model using TensorFlow / PyTorch.</li>
            <li>Deploy via an API using FastAPI / Express.js.</li>
            <li>Frontend uses fetch/axios to send prompts and receive predictions.</li>
          </ol>
        </div>

        <div className="text-center">
          <button className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white font-semibold px-6 py-3 rounded-full transition duration-300">
            Coming Soon: Play With The Demo
          </button>
        </div>
      </div>
    </div>
  );
}

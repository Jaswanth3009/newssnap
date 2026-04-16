import { Link } from 'react-router-dom';
import { FiZap, FiLayers, FiClock, FiBookmark } from 'react-icons/fi';

const features = [
  { icon: FiClock, title: 'Quick Summaries', desc: '60–100 word digests so you stay informed in seconds.' },
  { icon: FiLayers, title: 'Categorized News', desc: 'Technology, Sports, Business, Politics & more.' },
  { icon: FiBookmark, title: 'Bookmarks', desc: 'Save articles and read them whenever you want.' },
  { icon: FiZap, title: 'Real-Time Updates', desc: 'Fresh news fetched from trusted sources automatically.' },
];

const Home = () => (
  <div className="min-h-screen bg-gray-950">
    {/* Hero */}
    <section className="relative max-w-5xl mx-auto px-4 pt-24 pb-20 text-center">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-3xl" />
      </div>
      <div className="relative">
        <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold px-4 py-2 rounded-full mb-6 tracking-wider uppercase">
          <FiZap className="w-3 h-3" /> Your daily news, simplified
        </div>
        <h1 className="font-display text-5xl sm:text-6xl font-bold text-white leading-tight mb-6">
          Stay Informed.<br />
          <span className="text-amber-500">Stay Ahead.</span>
        </h1>
        <p className="text-gray-400 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
          NewsSnap delivers concise, categorized news summaries so you can catch up on what matters — in under a minute.
        </p>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <Link to="/register" className="btn-primary text-base px-8 py-3">
            Get Started Free
          </Link>
          <Link to="/login" className="btn-outline text-base px-8 py-3">
            Sign In
          </Link>
        </div>
      </div>
    </section>

    {/* Features */}
    <section className="max-w-5xl mx-auto px-4 pb-24">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {features.map(({ icon: Icon, title, desc }) => (
          <div key={title} className="bg-gray-900 border border-gray-800 rounded-2xl p-6 hover:border-amber-500/30 transition-all hover:-translate-y-1 duration-300">
            <div className="w-10 h-10 bg-amber-500/10 rounded-xl flex items-center justify-center mb-4">
              <Icon className="w-5 h-5 text-amber-400" />
            </div>
            <h3 className="font-semibold text-white mb-2">{title}</h3>
            <p className="text-sm text-gray-400 leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  </div>
);

export default Home;

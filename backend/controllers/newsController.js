const News = require('../models/News');
const User = require('../models/User');
const axios = require('axios');

const mockNews = [
  { title: 'ISRO Successfully Launches PSLV-C58 Mission with Multiple Satellites', summary: 'Indian Space Research Organisation successfully launched its PSLV-C58 rocket carrying multiple satellites into orbit. The mission marks another milestone in India\'s growing space programme and demonstrates ISRO\'s continued excellence in affordable space technology globally.', category: 'Technology', source: 'The Hindu', imageUrl: 'https://images.unsplash.com/photo-1517976487492-5750f3195933?w=400', originalUrl: '#', publishedAt: new Date() },
  { title: 'IPL 2026: Mumbai Indians Beat Chennai Super Kings in Last-Over Thriller', summary: 'In a nail-biting IPL encounter, Mumbai Indians defeated Chennai Super Kings by 5 wickets in the last over. Rohit Sharma scored a brilliant half-century while Jasprit Bumrah took three crucial wickets to set up the thrilling victory at Wankhede Stadium.', category: 'Sports', source: 'Times of India', imageUrl: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=400', originalUrl: '#', publishedAt: new Date() },
  { title: 'Sensex Crosses 82,000 Mark Amid Strong FII Inflows and IT Rally', summary: 'The Bombay Stock Exchange Sensex crossed the historic 82,000 mark driven by strong foreign institutional investor inflows and positive global cues. IT and banking sectors led the rally with TCS, Infosys and HDFC Bank posting significant gains.', category: 'Business', source: 'Economic Times', imageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400', originalUrl: '#', publishedAt: new Date() },
  { title: 'Bollywood: Salman Khan\'s New Film Breaks All-Time Opening Day Records', summary: 'Salman Khan\'s latest action blockbuster shattered opening day box office records across India, collecting over 60 crore rupees on its first day. The film has been praised for its high-octane action sequences, music by Pritam and grand production values.', category: 'Entertainment', source: 'Bollywood Hungama', imageUrl: 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=400', originalUrl: '#', publishedAt: new Date() },
  { title: 'Parliament Passes New Digital India Bill 2026 to Regulate Social Media', summary: 'The Indian Parliament passed the landmark Digital India Bill 2026 aimed at regulating social media platforms and protecting citizens\' data privacy. The bill introduces strict guidelines for tech companies operating in India with heavy penalties for violations.', category: 'Politics', source: 'NDTV', imageUrl: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=400', originalUrl: '#', publishedAt: new Date() },
  { title: 'AIIMS Delhi Develops Affordable Cancer Treatment for Rural India Patients', summary: 'Doctors at AIIMS New Delhi developed a cost-effective cancer treatment protocol specifically designed for rural patients. The treatment costs 80% less than conventional methods and can be administered at district hospitals across India without specialised equipment.', category: 'Health', source: 'Hindustan Times', imageUrl: 'https://images.unsplash.com/photo-1576671081837-49000212a370?w=400', originalUrl: '#', publishedAt: new Date() },
  { title: 'Tata Motors Launches Most Affordable Electric Car at Rs 8 Lakh', summary: 'Tata Motors unveiled its most affordable electric vehicle priced at just Rs 8 lakh targeting the mass market segment in India. The car offers a range of 300 km on a single charge and comes with advanced safety features and fast charging support.', category: 'Technology', source: 'Auto Car India', imageUrl: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=400', originalUrl: '#', publishedAt: new Date() },
  { title: 'Virat Kohli Scores Historic 50th Test Century Against Australia', summary: 'Cricket icon Virat Kohli reached a historic milestone by scoring his 50th Test century against Australia in the Border-Gavaskar Trophy. The innings of 156 runs helped India set a massive target and took the series to a thrilling final decider match.', category: 'Sports', source: 'Cricbuzz', imageUrl: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=400', originalUrl: '#', publishedAt: new Date() },
  { title: 'India GDP Growth Rate Hits 8.2% Making It World\'s Fastest Growing Economy', summary: 'India\'s GDP growth rate surged to 8.2% in the latest quarter cementing its position as the world\'s fastest growing major economy. Manufacturing, services and digital sectors drove the growth according to the Ministry of Statistics latest report.', category: 'Business', source: 'Business Standard', imageUrl: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=400', originalUrl: '#', publishedAt: new Date() },
  { title: 'PM Modi Launches Biggest Infrastructure Project Worth Rs 10 Lakh Crore', summary: 'Prime Minister Narendra Modi launched India\'s biggest infrastructure development project worth Rs 10 lakh crore covering highways, railways and urban development. The project aims to generate over 50 lakh jobs and boost connectivity across all Indian states.', category: 'Politics', source: 'India Today', imageUrl: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400', originalUrl: '#', publishedAt: new Date() },
  { title: 'Deepika Padukone Wins Best Actress at National Film Awards 2026', summary: 'Bollywood superstar Deepika Padukone won the prestigious National Film Award for Best Actress for her powerful performance in her latest film. The ceremony held in New Delhi honoured the best of Indian cinema across all regional languages.', category: 'Entertainment', source: 'Film Companion', imageUrl: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400', originalUrl: '#', publishedAt: new Date() },
  { title: 'India Achieves 100% Rural Electrification Under Saubhagya Scheme', summary: 'India has achieved complete rural electrification under the Saubhagya scheme connecting every household to the power grid. The milestone was announced by the Ministry of Power confirming electricity access to over 26 crore rural households across the nation.', category: 'General', source: 'Zee News', imageUrl: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=400', originalUrl: '#', publishedAt: new Date() },
];

const fetchAndStoreNews = async (req, res) => {
  try {
    const apiKey = process.env.NEWS_API_KEY;
    let articles = [];

    if (apiKey && apiKey !== 'your_newsapi_key_here') {
      const queries = [
        { q: 'India technology ISRO Tata Infosys', category: 'Technology' },
        { q: 'IPL cricket India sports Virat Rohit', category: 'Sports' },
        { q: 'India economy Sensex RBI budget', category: 'Business' },
        { q: 'Bollywood India movies Netflix', category: 'Entertainment' },
        { q: 'India politics parliament Modi BJP', category: 'Politics' },
        { q: 'India health AIIMS hospital medicine', category: 'Health' },
      ];

      for (const item of queries) {
        try {
          const response = await axios.get(
            `https://newsapi.org/v2/everything?q=${encodeURIComponent(item.q)}&language=en&sortBy=publishedAt&pageSize=5&apiKey=${apiKey}`
          );
          const mapped = response.data.articles
            .filter((a) => a.title && a.description && a.title !== '[Removed]')
            .map((a) => ({
              title: a.title,
              summary: a.description,
              category: item.category,
              source: a.source?.name || 'Unknown',
              imageUrl: a.urlToImage || '',
              originalUrl: a.url || '',
              publishedAt: new Date(a.publishedAt),
            }));
          articles = [...articles, ...mapped];
        } catch (e) {
          console.log(`Skipping ${item.category}:`, e.message);
        }
      }
    } else {
      articles = mockNews;
    }

    // Remove duplicate titles
    const seen = new Set();
    articles = articles.filter((a) => {
      if (seen.has(a.title)) return false;
      seen.add(a.title);
      return true;
    });

    await News.deleteMany({});
    await News.insertMany(articles);

    res.json({ message: `✅ ${articles.length} news articles stored`, count: articles.length });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllNews = async (req, res) => {
  try {
    const { category, search, page = 1, limit = 10 } = req.query;
    const query = {};
    if (category && category !== 'All') query.category = category;
    if (search) query.title = { $regex: search, $options: 'i' };
    const total = await News.countDocuments(query);
    const news = await News.find(query).sort({ publishedAt: -1 }).skip((page - 1) * limit).limit(Number(limit));
    res.json({ news, total, page: Number(page), pages: Math.ceil(total / limit) });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getNewsById = async (req, res) => {
  try {
    const news = await News.findById(req.params.id);
    if (!news) return res.status(404).json({ message: 'News not found' });
    res.json(news);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createNews = async (req, res) => {
  try {
    const news = await News.create(req.body);
    res.status(201).json(news);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateNews = async (req, res) => {
  try {
    const news = await News.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!news) return res.status(404).json({ message: 'News not found' });
    res.json(news);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteNews = async (req, res) => {
  try {
    const news = await News.findByIdAndDelete(req.params.id);
    if (!news) return res.status(404).json({ message: 'News not found' });
    res.json({ message: 'News deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const toggleBookmark = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const newsId = req.params.id;
    const index = user.bookmarks.indexOf(newsId);
    if (index === -1) { user.bookmarks.push(newsId); } else { user.bookmarks.splice(index, 1); }
    await user.save();
    res.json({ bookmarks: user.bookmarks });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getBookmarks = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('bookmarks');
    res.json(user.bookmarks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { fetchAndStoreNews, getAllNews, getNewsById, createNews, updateNews, deleteNews, toggleBookmark, getBookmarks };
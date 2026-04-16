const News = require('../models/News');
const User = require('../models/User');
const axios = require('axios');

// Mock news data for when NewsAPI key is not set
const mockNews = [
  {
    title: 'AI Breakthrough: New Model Surpasses Human Performance',
    summary: 'Researchers have developed a new artificial intelligence model that outperforms humans across multiple cognitive benchmarks. The system demonstrates unprecedented reasoning capabilities and could revolutionize how we approach complex problem-solving tasks in various industries.',
    category: 'Technology',
    source: 'TechCrunch',
    imageUrl: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=400',
    originalUrl: '#',
    publishedAt: new Date(),
  },
  {
    title: 'Global Markets Rally on Positive Economic Data',
    summary: 'Stock markets worldwide experienced significant gains following the release of stronger-than-expected economic indicators. Investors responded positively to employment figures and consumer spending data, pushing major indices to new highs.',
    category: 'Business',
    source: 'Bloomberg',
    imageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400',
    originalUrl: '#',
    publishedAt: new Date(),
  },
  {
    title: 'Champions League: Dramatic Comeback Stuns Fans',
    summary: 'In a nail-biting Champions League match, a top European club staged a remarkable second-half comeback to advance to the next round. The team scored three goals in the final twenty minutes to overcome a two-goal deficit.',
    category: 'Sports',
    source: 'ESPN',
    imageUrl: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=400',
    originalUrl: '#',
    publishedAt: new Date(),
  },
  {
    title: 'New Streaming Platform Launches with Exclusive Content',
    summary: 'A major entertainment company has launched its highly anticipated streaming service, featuring an extensive library of exclusive films and series. The platform aims to compete with established players by offering premium content at competitive pricing.',
    category: 'Entertainment',
    source: 'Variety',
    imageUrl: 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=400',
    originalUrl: '#',
    publishedAt: new Date(),
  },
  {
    title: 'Climate Summit Reaches Historic Agreement',
    summary: 'World leaders at the international climate summit have agreed to a landmark deal on carbon emissions reduction. The agreement commits major economies to achieving net-zero emissions by 2050 and includes significant financial support for developing nations.',
    category: 'Politics',
    source: 'Reuters',
    imageUrl: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400',
    originalUrl: '#',
    publishedAt: new Date(),
  },
  {
    title: 'Breakthrough in Cancer Treatment Shows Promising Results',
    summary: 'Medical researchers have announced promising results from trials of a new immunotherapy treatment for aggressive cancers. The treatment demonstrated a significantly higher success rate compared to conventional therapies with fewer side effects.',
    category: 'Health',
    source: 'Medical News Today',
    imageUrl: 'https://images.unsplash.com/photo-1576671081837-49000212a370?w=400',
    originalUrl: '#',
    publishedAt: new Date(),
  },
  {
    title: 'SpaceX Successfully Launches Next-Gen Satellite Constellation',
    summary: 'SpaceX has successfully deployed a new batch of satellites as part of its expanding internet constellation. The launch marks another milestone in the company\'s mission to provide global high-speed internet coverage, particularly in underserved regions.',
    category: 'Technology',
    source: 'Space.com',
    imageUrl: 'https://images.unsplash.com/photo-1517976487492-5750f3195933?w=400',
    originalUrl: '#',
    publishedAt: new Date(),
  },
  {
    title: 'NBA Playoffs: Underdog Team Advances to Conference Finals',
    summary: 'An underdog team in this year\'s NBA playoffs pulled off a stunning upset to advance to the conference finals. Despite being heavy underdogs, they dominated their series with exceptional defensive play and clutch shooting in the decisive games.',
    category: 'Sports',
    source: 'NBA.com',
    imageUrl: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400',
    originalUrl: '#',
    publishedAt: new Date(),
  },
];

// @desc    Fetch & store news from NewsAPI (or seed mock)
// @route   POST /api/news/fetch
// @access  Private
const fetchAndStoreNews = async (req, res) => {
  try {
    const apiKey = process.env.NEWS_API_KEY;
    let articles = [];

    if (apiKey && apiKey !== 'your_newsapi_key_here') {
      const categories = ['technology', 'sports', 'business', 'entertainment', 'health'];
      for (const cat of categories) {
        const response = await axios.get(
          `https://newsapi.org/v2/top-headlines?category=${cat}&language=en&pageSize=5&apiKey=${apiKey}`
        );
        const mapped = response.data.articles
          .filter((a) => a.title && a.description)
          .map((a) => ({
            title: a.title,
            summary: a.description,
            category: cat.charAt(0).toUpperCase() + cat.slice(1),
            source: a.source?.name || 'Unknown',
            imageUrl: a.urlToImage || '',
            originalUrl: a.url || '',
            publishedAt: new Date(a.publishedAt),
          }));
        articles = [...articles, ...mapped];
      }
    } else {
      // Use mock data if no API key
      articles = mockNews;
    }

    await News.deleteMany({});
    await News.insertMany(articles);

    res.json({ message: `✅ ${articles.length} news articles stored`, count: articles.length });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all news (with optional category filter & search)
// @route   GET /api/news
// @access  Public
const getAllNews = async (req, res) => {
  try {
    const { category, search, page = 1, limit = 10 } = req.query;
    const query = {};

    if (category && category !== 'All') query.category = category;
    if (search) query.title = { $regex: search, $options: 'i' };

    const total = await News.countDocuments(query);
    const news = await News.find(query)
      .sort({ publishedAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.json({ news, total, page: Number(page), pages: Math.ceil(total / limit) });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single news
// @route   GET /api/news/:id
// @access  Public
const getNewsById = async (req, res) => {
  try {
    const news = await News.findById(req.params.id);
    if (!news) return res.status(404).json({ message: 'News not found' });
    res.json(news);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create news (admin/manual)
// @route   POST /api/news
// @access  Private
const createNews = async (req, res) => {
  try {
    const news = await News.create(req.body);
    res.status(201).json(news);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update news
// @route   PUT /api/news/:id
// @access  Private
const updateNews = async (req, res) => {
  try {
    const news = await News.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!news) return res.status(404).json({ message: 'News not found' });
    res.json(news);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete news
// @route   DELETE /api/news/:id
// @access  Private
const deleteNews = async (req, res) => {
  try {
    const news = await News.findByIdAndDelete(req.params.id);
    if (!news) return res.status(404).json({ message: 'News not found' });
    res.json({ message: 'News deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Toggle bookmark
// @route   POST /api/news/:id/bookmark
// @access  Private
const toggleBookmark = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const newsId = req.params.id;
    const index = user.bookmarks.indexOf(newsId);

    if (index === -1) {
      user.bookmarks.push(newsId);
    } else {
      user.bookmarks.splice(index, 1);
    }
    await user.save();
    res.json({ bookmarks: user.bookmarks });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get bookmarked news
// @route   GET /api/news/bookmarks
// @access  Private
const getBookmarks = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('bookmarks');
    res.json(user.bookmarks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  fetchAndStoreNews,
  getAllNews,
  getNewsById,
  createNews,
  updateNews,
  deleteNews,
  toggleBookmark,
  getBookmarks,
};

// Helper to generate 365 days of activity for contribution graph
export function generateYearlyContributions(patternSeed = 'balanced') {
  const contributions = [];
  const today = new Date();
  
  // 52 weeks * 7 days = 364 + 1 = 365 days
  for (let i = 364; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];
    const dayOfWeek = d.getDay(); // 0 is Sunday, 6 is Saturday
    
    // Determine activity count based on pattern
    let count = 0;
    let activities = [];

    // Pseudo-random but deterministic based on day & seed
    const hash = (d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate() + patternSeed.length * 17) % 100;
    
    if (patternSeed === 'high') {
      if (hash > 30) count = (hash % 4) + 1;
    } else if (patternSeed === 'streak') {
      if (i < 45 || (hash > 40 && hash < 95)) count = (hash % 3) + 1;
    } else {
      // Balanced: 2-3 uploads or events per week, shorts on weekends
      if (dayOfWeek === 2 || dayOfWeek === 4 || dayOfWeek === 6) {
        if (hash > 35) count = (hash % 3) + 1;
      } else if (hash > 65) {
        count = 1;
      }
    }

    if (count > 0) {
      if (count >= 1) activities.push({ type: 'video', title: 'Video Upload' });
      if (count >= 2) activities.push({ type: 'shorts', title: 'YouTube Short' });
      if (count >= 3) activities.push({ type: 'stream', title: 'Live Stream' });
      if (count >= 4) activities.push({ type: 'milestone', title: 'Milestone Reached' });
    }

    contributions.push({
      date: dateStr,
      count: count,
      activities: activities
    });
  }

  return contributions;
}

export const SEED_CREATORS = {
  '@mkbhd': {
    id: 'UCBJycsmduvYEL83R_U4JriQ',
    handle: '@mkbhd',
    title: 'Marques Brownlee',
    customUrl: 'youtube.com/@mkbhd',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=280&q=80',
    banner: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1600&q=80',
    description: 'Quality tech videos | YouTuber | Geek | Ultimate Frisbee player | Podcaster. Delivering honest, cinematic reviews of smartphones, laptops, electric vehicles, and future tech.',
    bio: 'Producer and host of MKBHD, Waveform Podcast, and Studio. Bringing you the highest quality consumer tech coverage on the planet.',
    country: 'United States',
    joinedDate: '2008-03-21',
    category: 'Science & Technology',
    verified: true,
    socialLinks: {
      twitter: 'https://twitter.com/MKBHD',
      website: 'https://mkbhd.com',
      discord: 'https://discord.gg/mkbhd'
    },
    stats: {
      subscribers: 19400000,
      views: 4560000000,
      videoCount: 1680,
      rankingGlobal: 14,
      rankingRegion: 6,
      rankingCategory: 1,
      activeWeeks: 51,
      longestStreak: 56,
      currentStreak: 19,
      activitiesThisYear: 245,
      videosThisYear: 94
    },
    contributions: generateYearlyContributions('high'),
    historyGrowth: [
      { month: 'Nov 2025', subscribers: 18900000, views: 4320000000, uploads: 8 },
      { month: 'Dec 2025', subscribers: 19050000, views: 4380000000, uploads: 11 },
      { month: 'Jan 2026', subscribers: 19180000, views: 4440000000, uploads: 7 },
      { month: 'Feb 2026', subscribers: 19280000, views: 4490000000, uploads: 8 },
      { month: 'Mar 2026', subscribers: 19350000, views: 4525000000, uploads: 9 },
      { month: 'Apr 2026', subscribers: 19400000, views: 4560000000, uploads: 10 }
    ],
    achievements: [
      { id: 'first_upload', title: 'First Upload', description: 'First review uploaded on YouTube', icon: 'Rocket', unlocked: true, date: '2008-03-25' },
      { id: 'sub_1k', title: '1K Subscribers', description: 'Reached first 1K subscribers', icon: 'Users', unlocked: true, date: '2009-02-14' },
      { id: 'sub_10k', title: '10K Club', description: 'Crossed 10,000 subscribers', icon: 'Award', unlocked: true, date: '2010-06-12' },
      { id: 'sub_100k', title: '100K Silver Club', description: 'Silver Creator Award unlocked', icon: 'Trophy', unlocked: true, date: '2012-08-19' },
      { id: 'sub_1m', title: 'Million Club', description: 'Gold Creator Award - 1M subscribers', icon: 'Award', unlocked: true, date: '2014-04-10' },
      { id: 'sub_10m', title: 'Diamond Legend', description: 'Diamond Creator Award - 10M subscribers', icon: 'Sparkles', unlocked: true, date: '2019-12-18' },
      { id: 'views_1b', title: '1 Billion Views', description: 'Over 1 Billion channel views milestone', icon: 'Eye', unlocked: true, date: '2020-03-01' },
      { id: 'streak_30', title: 'Consistency Streak', description: '30+ day content publishing streak', icon: 'Flame', unlocked: true, date: '2025-10-15' }
    ],
    videos: [
      {
        id: 'mkbhd-1',
        title: 'Smartphone of the Year: The 2026 Blind Smartphone Camera Test!',
        thumbnail: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=640&q=80',
        publishedAt: '2026-04-03T18:00:00Z',
        viewCount: 3820000,
        duration: '21:14',
        url: 'https://youtube.com',
        likes: 215000
      },
      {
        id: 'mkbhd-2',
        title: 'Apple Vision Pro 2: What Actually Changed?',
        thumbnail: 'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&w=640&q=80',
        publishedAt: '2026-03-24T17:30:00Z',
        viewCount: 2940000,
        duration: '16:08',
        url: 'https://youtube.com',
        likes: 178000
      },
      {
        id: 'mkbhd-3',
        title: 'The Truth About Solid-State EV Batteries',
        thumbnail: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=640&q=80',
        publishedAt: '2026-03-10T19:00:00Z',
        viewCount: 2100000,
        duration: '18:42',
        url: 'https://youtube.com',
        likes: 142000
      },
      {
        id: 'mkbhd-4',
        title: 'Why MicroLED Displays Are Taking So Long',
        thumbnail: 'https://images.unsplash.com/photo-1526738549149-8e07eca6c147?auto=format&fit=crop&w=640&q=80',
        publishedAt: '2026-02-28T16:00:00Z',
        viewCount: 1850000,
        duration: '13:55',
        url: 'https://youtube.com',
        likes: 125000
      }
    ]
  },
  '@fireship': {
    id: 'UCsBjURrPoezykLs9EqgamOA',
    handle: '@fireship',
    title: 'Fireship',
    customUrl: 'youtube.com/@fireship',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=280&q=80',
    banner: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=80',
    description: 'High-intensity code tutorials and tech news to help you ship software faster. Code reports, 100 seconds of code, and spicy dev commentary.',
    bio: 'Software engineer producing fast-paced programming videos. Creator of Fireship.io and The Code Report.',
    country: 'United States',
    joinedDate: '2017-06-20',
    category: 'Technology & Programming',
    verified: true,
    socialLinks: {
      github: 'https://github.com/fireship-io',
      twitter: 'https://twitter.com/fireship_dev',
      website: 'https://fireship.io'
    },
    stats: {
      subscribers: 3350000,
      views: 485000000,
      videoCount: 640,
      rankingGlobal: 89,
      rankingRegion: 28,
      rankingCategory: 2,
      activeWeeks: 49,
      longestStreak: 41,
      currentStreak: 15,
      activitiesThisYear: 210,
      videosThisYear: 78
    },
    contributions: generateYearlyContributions('streak'),
    historyGrowth: [
      { month: 'Nov 2025', subscribers: 3100000, views: 430000000, uploads: 9 },
      { month: 'Dec 2025', subscribers: 3180000, views: 442000000, uploads: 10 },
      { month: 'Jan 2026', subscribers: 3230000, views: 454000000, uploads: 8 },
      { month: 'Feb 2026', subscribers: 3280000, views: 466000000, uploads: 7 },
      { month: 'Mar 2026', subscribers: 3320000, views: 476000000, uploads: 9 },
      { month: 'Apr 2026', subscribers: 3350000, views: 485000000, uploads: 8 }
    ],
    achievements: [
      { id: 'first_upload', title: 'First Upload', description: 'Published inaugural tutorial', icon: 'Rocket', unlocked: true, date: '2017-06-25' },
      { id: 'sub_1k', title: '1K Subscribers', description: 'Passed first 1K milestone', icon: 'Users', unlocked: true, date: '2017-10-10' },
      { id: 'sub_10k', title: '10K Club', description: 'Joined 10K developer community', icon: 'Award', unlocked: true, date: '2018-05-14' },
      { id: 'sub_100k', title: '100K Silver Club', description: 'Silver Creator Award unlocked', icon: 'Trophy', unlocked: true, date: '2019-08-20' },
      { id: 'sub_1m', title: 'Million Club', description: 'Gold Creator Award - 1 Million devs', icon: 'Award', unlocked: true, date: '2021-12-05' },
      { id: 'views_100m', title: '100 Million Views', description: 'Surpassed 100M total views', icon: 'Eye', unlocked: true, date: '2022-11-12' },
      { id: 'streak_30', title: 'Consistency Streak', description: 'Published weekly with 30-day streak', icon: 'Flame', unlocked: true, date: '2025-08-30' },
      { id: 'sub_10m', title: 'Diamond Legend', description: 'Diamond Creator Award - 10M subscribers', icon: 'Sparkles', unlocked: false, progress: 33.5 }
    ],
    videos: [
      {
        id: 'fire-1',
        title: 'React 19 in 100 Seconds',
        thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=640&q=80',
        publishedAt: '2026-04-02T19:00:00Z',
        viewCount: 890000,
        duration: '02:18',
        url: 'https://youtube.com',
        likes: 64000
      },
      {
        id: 'fire-2',
        title: 'The AI Bubble is NOT Popping (Here is Why)',
        thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=640&q=80',
        publishedAt: '2026-03-22T17:00:00Z',
        viewCount: 1420000,
        duration: '05:42',
        url: 'https://youtube.com',
        likes: 98000
      },
      {
        id: 'fire-3',
        title: 'Rust vs Zig in 2026: The Systems Showdown',
        thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=640&q=80',
        publishedAt: '2026-03-08T18:30:00Z',
        viewCount: 970000,
        duration: '04:15',
        url: 'https://youtube.com',
        likes: 71000
      }
    ]
  },
  '@mrbeast': {
    id: 'UCX6OQ3DkcsbYNE6H8uQQuVA',
    handle: '@mrbeast',
    title: 'MrBeast',
    customUrl: 'youtube.com/@mrbeast',
    avatar: 'https://yt3.googleusercontent.com/nxYrc_1_2f77DoBadyxMTmv7ZpRZapHR5jbuYe7PlPd5cIRJxtNNEYyOC0ZsxaDyJJzXrnJiuDE=s900-c-k-c0x00ffffff-no-rj',
    description: 'SUBSCRIBE FOR A COOKIE! New MrBeast video every month. I want to make the world a better place before I die.',
    bio: 'Accomplishing wild stunts, giving away millions of dollars, and helping people all around the globe.',
    country: 'United States',
    joinedDate: '2012-02-19',
    category: 'Entertainment',
    verified: true,
    socialLinks: {
      twitter: 'https://twitter.com/MrBeast',
      website: 'https://mrbeast.store',
      discord: 'https://discord.gg/mrbeast'
    },
    stats: {
      subscribers: 330000000,
      views: 65000000000,
      videoCount: 835,
      rankingGlobal: 1,
      rankingRegion: 1,
      rankingCategory: 1,
      activeWeeks: 52,
      longestStreak: 45,
      currentStreak: 16,
      activitiesThisYear: 180,
      videosThisYear: 32
    },
    contributions: generateYearlyContributions('high'),
    historyGrowth: [
      { month: 'Nov 2025', subscribers: 310000000, views: 58000000000, uploads: 3 },
      { month: 'Dec 2025', subscribers: 315000000, views: 60000000000, uploads: 4 },
      { month: 'Jan 2026', subscribers: 320000000, views: 61500000000, uploads: 2 },
      { month: 'Feb 2026', subscribers: 324000000, views: 62800000000, uploads: 3 },
      { month: 'Mar 2026', subscribers: 327000000, views: 64000000000, uploads: 3 },
      { month: 'Apr 2026', subscribers: 330000000, views: 65000000000, uploads: 4 }
    ],
    achievements: [
      { id: 'first_upload', title: 'First Upload', description: 'Uploaded inaugural Worst Intros video', icon: 'Rocket', unlocked: true, date: '2012-02-20' },
      { id: 'sub_1k', title: '1K Subscribers', description: 'Reached first 1,000 subscribers', icon: 'Users', unlocked: true, date: '2014-04-14' },
      { id: 'sub_10k', title: '10K Club', description: 'Reached 10,000 subscribers', icon: 'Award', unlocked: true, date: '2015-08-11' },
      { id: 'sub_100k', title: '100K Silver Club', description: 'Silver Creator Award unlocked', icon: 'Trophy', unlocked: true, date: '2016-06-12' },
      { id: 'sub_1m', title: 'Million Club', description: 'Gold Creator Award - 1 Million', icon: 'Award', unlocked: true, date: '2017-05-06' },
      { id: 'sub_10m', title: 'Diamond Legend', description: 'Diamond Creator Award - 10 Million', icon: 'Sparkles', unlocked: true, date: '2018-11-20' },
      { id: 'sub_100m', title: 'Red Diamond Creator', description: 'Red Diamond Creator Award - 100 Million', icon: 'Trophy', unlocked: true, date: '2022-07-28' },
      { id: 'views_10b', title: '10+ Billion Views', description: 'Over 60 Billion lifetime views', icon: 'Eye', unlocked: true, date: '2023-01-10' }
    ],
    videos: [
      {
        id: '0e3GPea1Tyg',
        title: '$456,000 Squid Game In Real Life!',
        thumbnail: 'https://i.ytimg.com/vi/0e3GPea1Tyg/hqdefault.jpg',
        publishedAt: '2025-12-10T20:00:00Z',
        viewCount: 650000000,
        duration: '25:42',
        url: 'https://www.youtube.com/watch?v=0e3GPea1Tyg',
        likes: 17000000
      },
      {
        id: 'GLoeAJUcz38',
        title: 'Last To Leave Circle Wins $500,000',
        thumbnail: 'https://i.ytimg.com/vi/GLoeAJUcz38/hqdefault.jpg',
        publishedAt: '2026-02-14T19:00:00Z',
        viewCount: 320000000,
        duration: '19:12',
        url: 'https://www.youtube.com/watch?v=GLoeAJUcz38',
        likes: 9500000
      },
      {
        id: 'zxYjTTXc-J8',
        title: '1,000 Blind People See For The First Time',
        thumbnail: 'https://i.ytimg.com/vi/zxYjTTXc-J8/hqdefault.jpg',
        publishedAt: '2026-03-20T18:00:00Z',
        viewCount: 190000000,
        duration: '14:20',
        url: 'https://www.youtube.com/watch?v=zxYjTTXc-J8',
        likes: 8200000
      }
    ]
  },
  '@ufc': {
    id: 'UCvgfXK4nTYKudb0rFR6noLA',
    handle: '@ufc',
    title: 'UFC - Ultimate Fighting Championship',
    customUrl: 'youtube.com/@ufc',
    avatar: 'https://yt3.googleusercontent.com/mECavVNoh2tn4Lku7JyVIN_RnW4-s2z5rEXWo41MVHmGjqUuJChPB0L2JYbHDZg5YL21OcId=s900-c-k-c0x00ffffff-no-rj',
    description: 'Ultimate Fighting Championship® is the world\'s leading mixed martial arts organization. Official fight highlights, press conferences, weigh-ins, and exclusive fighter interviews.',
    bio: 'The global home of Mixed Martial Arts. Real fights, authentic athletes, world champions.',
    country: 'United States',
    joinedDate: '2006-03-04',
    category: 'Sports & MMA',
    verified: true,
    socialLinks: {
      twitter: 'https://twitter.com/ufc',
      website: 'https://ufc.com',
      discord: 'https://discord.gg/ufc'
    },
    stats: {
      subscribers: 23100000,
      views: 18900000000,
      videoCount: 26000,
      rankingGlobal: 18,
      rankingRegion: 5,
      rankingCategory: 1,
      activeWeeks: 52,
      longestStreak: 84,
      currentStreak: 28,
      activitiesThisYear: 365,
      videosThisYear: 420
    },
    contributions: generateYearlyContributions('high'),
    historyGrowth: [
      { month: 'Nov 2025', subscribers: 21500000, views: 17200000000, uploads: 38 },
      { month: 'Dec 2025', subscribers: 21900000, views: 17600000000, uploads: 42 },
      { month: 'Jan 2026', subscribers: 22300000, views: 18000000000, uploads: 35 },
      { month: 'Feb 2026', subscribers: 22600000, views: 18350000000, uploads: 36 },
      { month: 'Mar 2026', subscribers: 22900000, views: 18650000000, uploads: 40 },
      { month: 'Apr 2026', subscribers: 23100000, views: 18900000000, uploads: 44 }
    ],
    achievements: [
      { id: 'first_upload', title: 'First Upload', description: 'First official UFC video uploaded', icon: 'Rocket', unlocked: true, date: '2006-03-05' },
      { id: 'videos_100', title: '100+ Videos', description: 'Over 26,000 public fight highlights uploaded', icon: 'Video', unlocked: true, date: '2008-01-10' },
      { id: 'sub_1m', title: 'Million Club', description: 'Passed 1 Million sports fans', icon: 'Users', unlocked: true, date: '2013-09-18' },
      { id: 'sub_10m', title: 'Diamond Legend', description: 'Diamond Creator Award - 10 Million subs', icon: 'Sparkles', unlocked: true, date: '2020-05-14' },
      { id: 'views_10b', title: '10+ Billion Views', description: 'Over 18 Billion lifetime views', icon: 'Eye', unlocked: true, date: '2022-08-30' },
      { id: 'streak_30', title: 'Consistency Streak', description: 'Unbroken daily fight week content streak', icon: 'Flame', unlocked: true, date: '2026-01-15' }
    ],
    videos: [
      {
        id: 'ufc-vid-1',
        title: 'Top Finishes in UFC History: Knockouts & Submissions Compilation',
        thumbnail: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=640&q=80',
        publishedAt: '2026-04-08T18:00:00Z',
        viewCount: 4200000,
        duration: '18:45',
        url: 'https://youtube.com',
        likes: 185000
      },
      {
        id: 'ufc-vid-2',
        title: 'UFC 315: Official Weigh-ins & Final Faceoffs',
        thumbnail: 'https://images.unsplash.com/photo-1549060279-7e168fcee0c2?auto=format&fit=crop&w=640&q=80',
        publishedAt: '2026-04-05T21:30:00Z',
        viewCount: 2850000,
        duration: '24:12',
        url: 'https://youtube.com',
        likes: 120000
      },
      {
        id: 'ufc-vid-3',
        title: 'Inside the Octagon: Championship Title Fight Breakdown',
        thumbnail: 'https://images.unsplash.com/photo-1517438322307-e67111335449?auto=format&fit=crop&w=640&q=80',
        publishedAt: '2026-03-29T17:00:00Z',
        viewCount: 1650000,
        duration: '15:20',
        url: 'https://youtube.com',
        likes: 85000
      }
    ]
  }
};

export const LEADERBOARD_PREVIEW = [
  { rank: 1, handle: '@mrbeast', title: 'MrBeast', subscribers: 330000000, level: 'Legend', category: 'Entertainment' },
  { rank: 2, handle: '@tseries', title: 'T-Series', subscribers: 275000000, level: 'Legend', category: 'Music' },
  { rank: 14, handle: '@mkbhd', title: 'Marques Brownlee', subscribers: 19400000, level: 'Legend', category: 'Technology' },
  { rank: 89, handle: '@fireship', title: 'Fireship', subscribers: 3350000, level: 'Icon', category: 'Technology' },
  { rank: 210, handle: '@ufc', title: 'UFC - Ultimate Fighting Championship', subscribers: 18200000, level: 'Legend', category: 'Sports' }
];

export const config = {
  matcher: '/:path*', // apply to all routes
};

export function middleware(request) {
  const ua = request.headers.get('user-agent') || '';
  const blockedAgents = [
    // Original list
    'bot', 'spider', 'crawler', 'curl', 'AhrefsBot', 'MJ12bot', 
    'Baiduspider', 'facebookexternalhit', 'Twitterbot',
    
    // Expanded list - 175+ bots
    'Googlebot', 'ia_archiver', 'R6_FeedFetcher', 'NetcraftSurveyAgent',
    'Sogou web spider', 'bingbot', 'Yahoo! Slurp', 'PrintfulBot',
    'msnbot', 'UnwindFetchor', 'urlresolver', 'Butterfly', 'TweetmemeBot',
    'PaperLiBot', 'Exabot', 'Ezooms', 'YandexBot', 'SearchmetricsBot',
    'phishtank', 'PhishTank', 'picsearch', 'TweetedTimes Bot',
    'QuerySeekerSpider', 'ShowyouBot', 'woriobot', 'merlinkbot',
    'BazQuxBot', 'Kraken', 'SISTRIX Crawler', 'R6_CommentReader',
    'magpie-crawler', 'GrapeshotCrawler', 'PercolateCrawler', 'MaxPointCrawler',
    'NetSeer crawler', 'grokkit-crawler', 'SMXCrawler', 'PulseCrawler',
    'Y!J-BRW', '80legs.com/webcrawler', 'Mediapartners-Google', 'Spinn3r',
    'InAGist', 'Python-urllib', 'NING', 'TencentTraveler', 'Feedfetcher-Google',
    'mon.itor.us', 'spbot', 'Feedly', 'Applebot', 'DuckDuckBot', 'Slurp',
    'Teoma', 'CCBot', 'PetalBot', 'SemrushBot', 'DotBot', 'Serpstatbot',
    'MegaIndex.ru', 'LinkpadBot', 'DataForSeoBot', 'Seekport', 'AspiegelBot',
    'BLEXBot', 'Panscient', 'YouBot', 'Neevabot', 'ScoutJet', 'MojeekBot',
    'Cliqzbot', 'Genieo', 'Barkrowler', 'InfoTigerBot', 'ltx71', 'Qwantify',
    'SafeDNSBot', 'archive.org_bot', 'SpecialArchiver', 'AdsBot-Google',
    'AdsBot-Google-Mobile', 'Google-Safety', 'Google-InspectionTool',
    'GoogleOther', 'GoogleReadAloud', 'PetfulBot', 'Bytespider', 'Pinterestbot',
    'Discordbot', 'Slackbot', 'TelegramBot', 'WhatsApp', 'LinkedInBot',
    'WeChat', 'SkypeUriPreview', 'Iframely', 'Embedly', 'MetaURI', 'LongURL',
    'Mail.RU_Bot', 'SeznamBot', 'ZumBot', 'Gigabot', 'ICC-Crawler',
    'SiteAuditBot', 'UptimeRobot', 'StatusCake', 'Panopta', 'Pingdom',
    'DareBoost', 'GTmetrix', 'WebPageTest', 'SpeedCurve', 'Calypso AppCrawler',
    'HeadlessChrome', 'PhantomJS', 'Selenium', 'Playwright', 'Puppeteer',
    'WebDriver', 'Cypress', 'Lighthouse', 'DuckDuckGo-Favicons-Bot', 'YaK',
    'Linguee Bot', 'JikeSpider', 'AOLBuild', 'BingPreview', 'Adidxbot',
    'BingLocalSearch', 'BingSearch', 'MSNBot-Media', 'Bingbot-Image',
    'Bingbot-Video', 'SeekportBot', 'CloudFlare-AlwaysOnline',
    'Amazon CloudFront', 'AWS Security Scanner', 'GuzzleHttp', 'HTTPie',
    'PostmanRuntime', 'Insomnia', 'Wget', 'Go-http-client', 'Java',
    'Apache-HttpClient', 'okhttp', 'python-requests', 'node-fetch', 'axios',
    'RestSharp', 'Nutch', 'Heritrix', 'HTTrack', 'WebCopier', 'SiteSucker',
    'Ruby', 'PHP', 'Perl', 'libwww', 'Mechanize', 'Scrapy', 'BeautifulSoup',
    'SimpleCrawler', 'UniversalFeedParser', 'FeedParser', 'Rome Client', 'Jetty',
    'ApacheBench', 'ab', 'Siege', 'wrk', 'httperf', 'boom', 'vegeta', 'k6',
    'Artiosbot', 'A6-Indexer', 'Accoona-AI-Agent', 'AddThis.com', 'AnyApexBot',
    'AppEngine-Google', 'E-SocietyRobot', 'Exabot-Images', 'FAST-WebCrawler',
    'Favicon', 'FeedBurner', 'FeedValidator', 'Flamingo_SearchEngine',
    'FollowSite', 'FurlBot', 'FyberSpider', 'G2-Crawler', 'Gigablast',
    'GingerCrawler', 'Gluten Free Crawler', 'GnowitNewsbot',
    'Google-Ads-Creatives-Assistant', 'Google-Ads-DisplayAd-WebRenderer',
    'Google-Ads-Keywords', 'Google-Ads-Outreach', 'Google-Ads-Shopping',
    'Google-App-Engine', 'Google-Calendar-Importer', 'Google-HotelAdsVerifier',
    'Google-Image-Proxy', 'Google-Podcast', 'Google-Producer',
    'Google-Structured-Data-Testing-Tool', 'Google-Sync-Adapter',
    'Google-Travel-Ads', 'Google-Video-Intelligence', 'Google-Voice',
    'Google-Web-Light', 'Google-Youtube-Links', 'GooglePPDefault',
    'GoogleSafeBrowsing', 'GroupHigh', 'Gwene', 'HappyApps-WebCheck',
    'Hatena', 'HubSpot', 'HubSpot Connect', 'HubSpot Links Crawler', 'IDG/IT',
    'INGRID', 'IXRbot', 'Jyxobot', 'Kelny', 'Kemvibot', 'KnowJet'
  ];

  // Convert both to lowercase for case-insensitive matching
  const uaLower = ua.toLowerCase();
  
  for (const agent of blockedAgents) {
    if (uaLower.includes(agent.toLowerCase())) {
      console.log(`Blocked bot: ${ua} - matched: ${agent}`);
      return new Response('Forbidden: Bot access not allowed', { 
        status: 403,
        headers: {
          'X-Blocked-By': 'Bot-Middleware',
          'X-Blocked-Agent': agent
        }
      });
    }
  }

  return; // continue to Flask app
}
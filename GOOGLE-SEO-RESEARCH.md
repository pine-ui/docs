# Google Search documentation research for Pine

Reviewed: 2026-10-07. Target: https://pine-ui.com/. Sources: official English Google Search Central documentation and selected official Search Console help/API references. Research applies to the published Pine 1.0.0 documentation site, a static Docusaurus site for a free MIT Unity package.

**Current verified finding: authenticated URL Inspection says all six historical crawled-but-unindexed examples are indexed and on Google.** Each URL was inspected individually. The aggregate zero-indexed report/screenshot is stale; this does not establish the current state of every other sitemap URL.

## Scope and reading coverage

The inventory was extracted from the actual HTML navigation and article links of [Google's documentation catalog](https://developers.google.com/search/docs), starting with the [SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide). No URLs in the inventory were guessed. The catalog supplied 161 distinct `/search/docs` navigation URLs and one additional article-body link (`fundamentals/get-on-google`): 162 documents, 237,225 article-body words. Ten directly linked crawler/faceted-navigation guides were added, including four crawler-library guides linked by the catalog navigation.

**Completed: all 162 catalog article bodies plus all 10 additional linked guides read in full: 172 documents, 247,395 extracted article-body words. No document in the inventory below remains unread.** Coverage was divided between core/technical (54 catalog documents), appearance (77), and specialty/monitoring/spam (31), with disjoint specialist commerce chapters shared between the latter readers. All inventory requests returned HTTP 200 and substantive article bodies.

Article bodies were extracted without repeated navigation/footer chrome and read in batches, including examples, code, property tables, and specialist chapters. Truncated tool outputs were reread in smaller parts. Downloads alone were not treated as reading. The complete inventory below records applicability to Pine; a chapter can be fully read and still require no site change.

This is the complete English document inventory linked by the reviewed catalog, plus the ten listed crawler references. It does **not** claim exhaustive reading of every Search Central blog post, translated edition, linked third-party resource, complete Search Console help center, external API reference, or every nested page of the separately maintained crawler library. Additional links encountered to old `/advanced` and `/guides` paths were not expanded into an endless crawl; many are historical aliases of current catalog pages. Search Console Page indexing and URL Inspection help were consulted for the specific diagnostic sections cited below. The Indexing API guide was also checked for its supported content types.

## Screenshots and authenticated Search Console snapshot

The screenshots show a historical report with zero indexed pages, six URLs crawled but currently unindexed, one redirect URL, and a successfully processed sitemap containing 17 discovered URLs. They do not expose the six affected URLs, Google's selected canonical, retrieved/rendered HTML, manual actions, security issues, or the latest index state. Their sitemap date is 2026-10-05; the screenshots cannot certify the current live state.

During this research run, the main implementation agent obtained authenticated Search Console access and identified the six examples. The Page indexing report displayed a last-update date of **2026-10-04**, a first-detected date of **2026-10-05**, and **2026-10-05** last crawls for the six examples. These are the dates observed in the UI; the report-update and detection dates should not be silently reconciled or treated as a single crawl timestamp. The corresponding current canonical pages, checked against the site's generated sitemap, are:

- [Homepage](https://pine-ui.com/).
- [Installation](https://pine-ui.com/docs/tutorials/installation/).
- [Data binding](https://pine-ui.com/docs/guides/data-binding/).
- [Spring animation](https://pine-ui.com/docs/guides/spring-animation/).
- [Dynamic lists](https://pine-ui.com/docs/guides/dynamic-lists/).
- [Reactive HUD](https://pine-ui.com/docs/guides/reactive-hud/).

The implementation agent confirmed that the six Search Console example rows use these exact trailing-slash URLs. The retained crawls predate the earlier 2026-10-07 SEO and transparency deployment. The historical exclusion therefore does **not** show that Google already assessed the latest deployed HTML.

Individual authenticated URL Inspection subsequently displayed **“URL is on Google”** and **“Page is indexed”** for every example. All six reported smartphone Googlebot, crawling/indexing allowed, a successful fetch, a user canonical matching the inspected URL, and Google's selected canonical as the inspected URL. The times below are recorded as shown in the UI, without guessing their timezone. These individual results supersede the stale aggregate for these six URLs. [URL Inspection status](https://support.google.com/webmasters/answer/9012289?hl=en).

| Page | Latest crawl displayed | Current inspection |
| --- | --- | --- |
| Homepage | 2026-10-05 15:22:18 | Indexed |
| Installation | 2026-10-07 04:31:18 | Indexed |
| Data binding | 2026-10-05 15:26:02 | Indexed |
| Spring animation | 2026-10-05 15:26:02 | Indexed |
| Dynamic lists | 2026-10-05 15:23:27 | Indexed |
| Reactive HUD | 2026-10-05 15:23:27 | Indexed |

Search Console reported no detected manual-action or security issues. Its sitemap report showed a successful read on October 5 with 17 discovered URLs; the current generated sitemap has 34. Three indexed guides displayed a temporary sitemap processing error in URL Inspection's discovery field, despite their successful index status and the successful sitemap report. This discrepancy is recorded as a Search Console reporting observation, not proof of a broken XML sitemap.

Google's Page indexing help says a crawled-but-unindexed page might or might not later be indexed and does not need repeated crawl submission. A redirect source normally should not be indexed; inspect its destination. The desired outcome is indexing important canonical pages, rather than making every alternative URL green. [Page indexing report](https://support.google.com/webmasters/answer/7440203?hl=en#crawled).

Technical fixes, useful content, sitemap submission, and an accepted indexing request improve eligibility/discovery. None forces Google's indexing or ranking decision. [Technical requirements](https://developers.google.com/search/docs/essentials/technical), [How Search works](https://developers.google.com/search/docs/fundamentals/how-search-works).

## Findings and practical changes

| Priority | Official guidance | Application to Pine |
| --- | --- | --- |
| First | Public crawl access, a successful page response, and indexable content are the minimum eligibility criteria. [Technical requirements](https://developers.google.com/search/docs/essentials/technical). | Check canonical pages and required CSS/JS/images without authentication, including smartphone Googlebot access; check response headers as well as HTML. A spoofed user-agent request is a useful HTTP check, not proof of an authentic Google crawl. |
| First | `noindex` requires crawl access to be seen; robots.txt controls fetching and does not reliably remove a URL from Search. Restrictive robots meta/header rules combine. [Noindex](https://developers.google.com/search/docs/crawling-indexing/block-indexing), [Robots rules](https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag). | Preserve the intentional search-results exclusion, allow public documentation, and inspect all effective rules. Explicit `index,follow` is unnecessary because it is the default. |
| First | Canonical annotations, redirects, sitemap entries, and internal links should agree. Canonical is a preference, not an order. [Canonical methods](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls). | Keep HTTPS, apex hostname, and the existing trailing-slash convention consistent. Check duplicate hosts and legacy/version URLs against the actual final response. Do not canonicalize unrelated API pages to the homepage. |
| First | Google discovers links through real anchor elements with resolvable `href` values; useful descriptive anchor text supplies context. [Link best practices](https://developers.google.com/search/docs/crawling-indexing/links-crawlable). | Traverse the initial HTML link graph from the homepage to every intended canonical sitemap page. Fix proven orphan/broken links. If every page is reachable, an extra index page is unnecessary. |
| First | Static/server rendering is useful; important content should not require persistent browser state, permissions, clicks, or unsupported APIs. [JavaScript basics](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics), [JavaScript debugging](https://developers.google.com/search/docs/crawling-indexing/javascript/fix-search-javascript). | Keep Docusaurus's generated article/code content in the initial HTML. Preserve its canonical through hydration. The AI chat and interactive demonstrations should supplement the readable documentation, rather than be the only source of an explanation. |
| High | Original, accurate, useful content and clear titles matter; no preferred word-count target exists. [Helpful content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content). | Improve short overview pages with actual Pine usage decisions, package-specific examples, lifecycle/cleanup limits, and troubleshooting verified against the published API. Length by itself is not a defect; generic repetition is not a fix. This is a content improvement recommendation, **not** a proven explanation of Google's six exclusions. |
| High | Titles should accurately distinguish pages, and snippets may come from page text or the meta description. [Title links](https://developers.google.com/search/docs/appearance/title-link), [Snippets](https://developers.google.com/search/docs/appearance/snippet). | Retain useful unique descriptions and descriptive visible headings. Avoid repeated Unity/Pine keyword strings or titles promising behavior that the release does not implement. Google may still rewrite the search title/snippet. |
| High | Sitemap URLs should be the desired canonicals; `lastmod` should represent a verifiable significant update. Google ignores `priority` and `changefreq`. [Build a sitemap](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap). | Use native Docusaurus last-modification support backed by source Git history with a complete CI checkout; check generated dates. Omit dates when they cannot be established. Never set every page to the build/deploy date merely to suggest freshness. Keep excluded search and duplicate aliases out. |
| Medium | Mobile-first indexing uses the mobile content; responsive design keeps the same document available across devices. [Mobile-first guidance](https://developers.google.com/search/docs/crawling-indexing/mobile/mobile-sites-mobile-first-indexing). | Verify that mobile layout retains the article/code, navigation links, metadata, and structured data. A collapsed responsive sidebar is fine if the intended links remain in the document. |
| Medium | Good page experience and Core Web Vitals are useful, but good scores do not guarantee ranking. [Page experience](https://developers.google.com/search/docs/appearance/page-experience), [Core Web Vitals](https://developers.google.com/search/docs/appearance/core-web-vitals). | Keep text readable, code scrollable, layout stable, and required resources accessible. Use measurements to prioritize actual problems. Lighthouse scores are not evidence of indexing. |
| Medium | Main image URLs should be crawlable, with accurate context/alt text; site names use homepage `WebSite` markup and favicons have separate requirements. [Images](https://developers.google.com/search/docs/appearance/google-images), [Site names](https://developers.google.com/search/docs/appearance/site-names), [Favicons](https://developers.google.com/search/docs/appearance/favicon-in-search). | Retain the actual Pine brand and supported square PNG favicon. Add/verify homepage `WebSite` metadata if missing. Use descriptive alt text for substantive images; decorative images need not carry forced keywords. |
| Conditional | Structured data must describe actual visible content and follow the feature's rules. [Structured-data policies](https://developers.google.com/search/docs/appearance/structured-data/sd-policies). | Keep truthful source-code metadata and existing breadcrumbs. Validate supported feature markup, but never call a JSON parse check a Google rich-result test. Extra schema is not needed to make an ordinary page indexable. |

### Version duplicates and package discovery

The reviewed published config already disables the current-development documentation and publishes the 1.0.0 version at its stable route. This prevents that particular draft/current-versus-release duplication. Preserve this behavior while unrelated 1.1.0 work continues. For aliases with equivalent content, use a clear canonical preference or permanent redirect. For versions with materially different APIs/behavior, retain distinct, useful version documentation. Google describes ordinary duplication as normal; it is not an automatic spam penalty. [Canonicalization](https://developers.google.com/search/docs/crawling-indexing/canonicalization), [Canonical troubleshooting](https://developers.google.com/search/docs/crawling-indexing/canonicalization-troubleshooting).

Help real users discover the published docs from the package README, repository description/homepage, and legitimate Unity communities where relevant. These are sensible Pine-specific discovery steps inferred from Google's link/promotion guidance, not a guaranteed backlink count or ranking formula. Do not buy links or create doorway pages. [Getting on Google](https://developers.google.com/search/docs/fundamentals/get-on-google), [Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide), [Spam policies](https://developers.google.com/search/docs/essentials/spam-policies).

### Schema and specialist features that should not be added

`SoftwareApplication` rich-result eligibility requires a name, an offer price (zero for free), and either a genuine rating aggregate or review. Pine has no verified review/rating evidence in this audit; fabricating one would violate the policy. Accurate `SoftwareSourceCode` description does not promise Google's software rich result. [Software-app markup](https://developers.google.com/search/docs/appearance/structured-data/software-app).

Publisher-authored documentation/FAQ pages are not user-answerable `QAPage` pages or real discussion threads; Unity programming recipes are not food `Recipe` entities. General docs are not an eligible curriculum merely because there are tutorials. Only add specialist types when the actual content meets that specific guide. [QAPage](https://developers.google.com/search/docs/appearance/structured-data/qapage), [Discussion forum](https://developers.google.com/search/docs/appearance/structured-data/discussion-forum), [Recipe](https://developers.google.com/search/docs/appearance/structured-data/recipe), [Course](https://developers.google.com/search/docs/appearance/structured-data/course).

Merchant/shipping/returns/loyalty markup and Merchant Center belong to real commerce. The free docs site does not require them. The same applies to AMP, News, Web Stories, book actions, jobs, events, lodging, paywalls, local listings, explicit content, and specialized regional/aggregator features. Their guides were read and marked conditional/not applicable below rather than implemented for SEO theater. [Ecommerce overview](https://developers.google.com/search/docs/specialty/ecommerce), [Search feature gallery](https://developers.google.com/search/docs/appearance/structured-data/search-gallery).

English-only docs do not need multilingual `hreflang`. If actual translations/region alternatives appear later, give them their own URLs and reciprocal annotations. [Localized versions](https://developers.google.com/search/docs/specialty/international/localized-versions).

No Google-only `llms.txt`, special AI schema, mass-created keyword variants, or artificial content chunking is needed. Google's current guidance says Search ignores `llms.txt`; manually review any AI-assisted factual additions. [AI optimization](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide), [Generative content guidance](https://developers.google.com/search/docs/fundamentals/using-gen-ai-content).

## Search Console actions and verification boundary

1. In the verified property covering `https://pine-ui.com/`, inspect the six identified pages above, then other important documentation such as quick start. Record index status, last crawl, fetched/rendered article, crawl/index allowance, user-declared canonical, Google-selected canonical, and referring sitemap. The authenticated report now identifies the examples; individual inspections still supply their actual diagnostic details. [URL Inspection](https://support.google.com/webmasters/answer/9012289?hl=en).
2. Run the live test after deployment to check fetchability and rendering. A successful live test establishes current accessibility/eligibility, not that Google has indexed it or selected the desired canonical. [URL Inspection](https://support.google.com/webmasters/answer/9012289?hl=en).
3. Inspect the existing sitemap entry for processing failures and current URL discovery. Keep `https://pine-ui.com/sitemap.xml` as the canonical sitemap endpoint. If important pages changed, request indexing for a small set once; repeated requests do not accelerate processing and require owner/full-user permission. [Recrawl requests](https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl).
4. Check Manual Actions, Security Issues, and host availability/Crawl Stats for evidence before attributing exclusion to content or hosting. [Search Console start](https://developers.google.com/search/docs/monitor-debug/search-console-start), [Crawling troubleshooting](https://developers.google.com/search/docs/crawling-indexing/troubleshoot-crawling-errors).
5. Revisit URL Inspection and the Page indexing report after Google processes updates. Record actual indexed status; do not infer it from a successful HTTP request, accepted submission, sitemap read, or search ranking. `site:` results are not exhaustive. [Site operator](https://developers.google.com/search/docs/monitor-debug/search-operators/all-search-site).

There is no general-purpose Google indexing-push API for ordinary Pine documentation. The Indexing API is restricted to `JobPosting` or livestream `BroadcastEvent` within `VideoObject`; its successful notification response does not prove indexing. [Indexing API scope](https://developers.google.com/search/apis/indexing-api/v3/using-api).

No new analytics tracker is needed to establish indexing; Search Console and Analytics measure different things. [Analytics/Search Console comparison](https://developers.google.com/search/docs/monitor-debug/google-analytics-search-console). For this small static site, do not assume a crawl-budget problem without host/crawl evidence: the advanced guide primarily addresses much larger/frequently updated inventories. [Crawl budget](https://developers.google.com/crawling/docs/crawl-budget).

### Implemented changes and local verification

- Expanded eleven existing documentation pages with package-specific setup steps, expected example behaviour, API choices, ownership rules and troubleshooting. These additions use the published 1.0.0 API; unrelated development work is outside this change.
- Enabled native Docusaurus Git-derived sitemap dates and complete CI history. Removed ignored `priority`/`changefreq` fields. Dates do not come from build time.
- Found a reproducible production download defect: Markdown file links became hashed asset URLs with a trailing slash and returned HTTP 404 on GitHub Pages. Corrected all affected archive/checksum/C# Markdown links with Docusaurus's native `pathname://` escape; retained assistant retrieval of the linked examples. Existing explicit download anchors already used file URLs. The installed 3.10.2 Link/Markdown-loader source confirms the normalization path; [static asset documentation](https://docusaurus.io/docs/static-assets) describes the Markdown versus explicit-link handling.
- Extended the existing postbuild check to verify homepage reachability of sitemap pages, main headings in initial HTML, crawl rules, date shape, and file targets without trailing slashes. Its live mode also checks page noindex metadata and downloadable HTTP responses.
- Passed the production-configured local build, all 16 existing documentation/assistant tests, formatting, 272 citation targets across 30 documentation pages, all 34 sitemap pages, and 21 file targets. Browser inspection confirmed the new setup/troubleshooting content is rendered. This is documentation/build verification, not a new Unity runtime validation or a Google rich-result test.

Production deployment, refreshed sitemap submission and any requests made after this local verification are reported with their actual results in the implementation response. The six indexed statuses above were observed before this new deployment and must not be attributed to changes that had not yet shipped. Google SEO guidance does not establish complete legal compliance; the separate legal audit's unresolved factual questions remain unresolved by SEO changes.

## Exact documentation inventory

Each link identifies the article whose body was reviewed. `Direct` means the guidance has immediate relevance to this docs site; `Conditional` means useful only for a corresponding future feature or situation; `Specialist` means the documented content category/feature is absent from the reviewed Pine site. These applicability labels are this audit's interpretation, not Google's site assessment.

### Catalog (1)

| Article | Reading | Pine applicability |
| --- | --- | --- |
| [Google Search Central](https://developers.google.com/search/docs) | Full body | Direct |

### appearance (77)

| Article | Reading | Pine applicability |
| --- | --- | --- |
| [Overview of Search appearance topics](https://developers.google.com/search/docs/appearance) | Full body | Direct |
| [Enabling your ad network to work with translation-related Google Search features](https://developers.google.com/search/docs/appearance/ad-network-and-translation) | Full body | Specialist |
| [Regional differences in Search experience](https://developers.google.com/search/docs/appearance/aggregator-features) | Full body | Specialist |
| [Aggregator unit in Google Search](https://developers.google.com/search/docs/appearance/aggregator-unit) | Full body | Specialist |
| [AI features and your website](https://developers.google.com/search/docs/appearance/ai-features) | Full body | Direct |
| [Avoid intrusive interstitials and dialogs](https://developers.google.com/search/docs/appearance/avoid-intrusive-interstitials) | Full body | Direct |
| [Google Search's core updates and your website](https://developers.google.com/search/docs/appearance/core-updates) | Full body | Conditional |
| [Understanding Core Web Vitals and Google search results](https://developers.google.com/search/docs/appearance/core-web-vitals) | Full body | Direct |
| [Ecosystem carousel in Google Search](https://developers.google.com/search/docs/appearance/ecosystem-carousel) | Full body | Specialist |
| [Enable Web Stories on Google](https://developers.google.com/search/docs/appearance/enable-web-stories) | Full body | Specialist |
| [Enriched search results](https://developers.google.com/search/docs/appearance/enriched-search-results) | Full body | Conditional |
| [Establish your business details with Google](https://developers.google.com/search/docs/appearance/establish-business-details) | Full body | Conditional |
| [Define a favicon to show in search results](https://developers.google.com/search/docs/appearance/favicon-in-search) | Full body | Direct |
| [Featured snippets and your website](https://developers.google.com/search/docs/appearance/featured-snippets) | Full body | Conditional |
| [Flexible Sampling general guidance](https://developers.google.com/search/docs/appearance/flexible-sampling) | Full body | Specialist |
| [Discover and your website](https://developers.google.com/search/docs/appearance/google-discover) | Full body | Conditional |
| [Google image SEO best practices](https://developers.google.com/search/docs/appearance/google-images) | Full body | Direct |
| [Job sites: aggregator carousel and refinement chip](https://developers.google.com/search/docs/appearance/job-sites) | Full body | Specialist |
| [Package tracking Early Adopters Program](https://developers.google.com/search/docs/appearance/package-tracking) | Full body | Specialist |
| [Understanding page experience in Google Search results](https://developers.google.com/search/docs/appearance/page-experience) | Full body | Direct |
| [Places sites: aggregator carousel and refinement chip](https://developers.google.com/search/docs/appearance/places-sites) | Full body | Specialist |
| [Help your readers find your site through preferred sources in Google Search](https://developers.google.com/search/docs/appearance/preferred-sources) | Full body | Specialist |
| [Influence your byline dates in Google Search](https://developers.google.com/search/docs/appearance/publication-dates) | Full body | Conditional |
| [A guide to Google Search ranking systems](https://developers.google.com/search/docs/appearance/ranking-systems-guide) | Full body | Direct |
| [Google Search's reviews system and your website](https://developers.google.com/search/docs/appearance/reviews-system) | Full body | Specialist |
| [Add a Search profile badge to your website](https://developers.google.com/search/docs/appearance/search-profiles) | Full body | Specialist |
| [Provide a site name to Google Search](https://developers.google.com/search/docs/appearance/site-names) | Full body | Direct |
| [Sitelinks](https://developers.google.com/search/docs/appearance/sitelinks) | Full body | Direct |
| [Control your snippets in search results](https://developers.google.com/search/docs/appearance/snippet) | Full body | Direct |
| [Search experiences in South Africa: badge and refinement chip](https://developers.google.com/search/docs/appearance/south-africa-features) | Full body | Specialist |
| [Google Search spam updates and your site](https://developers.google.com/search/docs/appearance/spam-updates) | Full body | Conditional |
| [Article (Article, NewsArticle, BlogPosting) structured data](https://developers.google.com/search/docs/appearance/structured-data/article) | Full body | Conditional |
| [Book actions (Book) structured data](https://developers.google.com/search/docs/appearance/structured-data/book) | Full body | Specialist |
| [Breadcrumb (BreadcrumbList) structured data](https://developers.google.com/search/docs/appearance/structured-data/breadcrumb) | Full body | Direct |
| [Carousel (ItemList) structured data](https://developers.google.com/search/docs/appearance/structured-data/carousel) | Full body | Specialist |
| [Structured data carousels (beta)](https://developers.google.com/search/docs/appearance/structured-data/carousels-beta) | Full body | Specialist |
| [Course list (Course) structured data](https://developers.google.com/search/docs/appearance/structured-data/course) | Full body | Specialist |
| [Dataset (Dataset, DataCatalog, DataDownload) structured data](https://developers.google.com/search/docs/appearance/structured-data/dataset) | Full body | Specialist |
| [Discussion forum (DiscussionForumPosting) structured data](https://developers.google.com/search/docs/appearance/structured-data/discussion-forum) | Full body | Specialist |
| [Education Q&A (Quiz, Question, and Answer) structured data](https://developers.google.com/search/docs/appearance/structured-data/education-qa) | Full body | Specialist |
| [Employer aggregate rating (EmployerAggregateRating) structured data](https://developers.google.com/search/docs/appearance/structured-data/employer-rating) | Full body | Specialist |
| [Event (Event) structured data](https://developers.google.com/search/docs/appearance/structured-data/event) | Full body | Specialist |
| [Fact check (ClaimReview) structured data](https://developers.google.com/search/docs/appearance/structured-data/factcheck) | Full body | Specialist |
| [Generate structured data with JavaScript](https://developers.google.com/search/docs/appearance/structured-data/generate-structured-data-with-javascript) | Full body | Direct |
| [Image metadata in Google Images](https://developers.google.com/search/docs/appearance/structured-data/image-license-metadata) | Full body | Conditional |
| [Introduction to structured data markup in Google Search](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data) | Full body | Direct |
| [Job posting (JobPosting) structured data for Job Search](https://developers.google.com/search/docs/appearance/structured-data/job-posting) | Full body | Specialist |
| [Local business (LocalBusiness) structured data](https://developers.google.com/search/docs/appearance/structured-data/local-business) | Full body | Specialist |
| [Loyalty program (MemberProgram) structured data](https://developers.google.com/search/docs/appearance/structured-data/loyalty-program) | Full body | Specialist |
| [Math solver (MathSolver) structured data](https://developers.google.com/search/docs/appearance/structured-data/math-solvers) | Full body | Specialist |
| [Merchant listing (Product, Offer) structured data](https://developers.google.com/search/docs/appearance/structured-data/merchant-listing) | Full body | Specialist |
| [Movie carousel (Movie) structured data](https://developers.google.com/search/docs/appearance/structured-data/movie) | Full body | Specialist |
| [Organization (Organization) structured data](https://developers.google.com/search/docs/appearance/structured-data/organization) | Full body | Conditional |
| [Structured data for subscription and paywalled content (CreativeWork)](https://developers.google.com/search/docs/appearance/structured-data/paywalled-content) | Full body | Specialist |
| [Introduction to Product structured data](https://developers.google.com/search/docs/appearance/structured-data/product) | Full body | Specialist |
| [Product snippet (Product, Review, Offer) structured data](https://developers.google.com/search/docs/appearance/structured-data/product-snippet) | Full body | Specialist |
| [Product variant structured data (ProductGroup, Product)](https://developers.google.com/search/docs/appearance/structured-data/product-variants) | Full body | Specialist |
| [Profile page (ProfilePage) structured data](https://developers.google.com/search/docs/appearance/structured-data/profile-page) | Full body | Specialist |
| [Q&A (QAPage) structured data](https://developers.google.com/search/docs/appearance/structured-data/qapage) | Full body | Specialist |
| [Recipe (Recipe, HowTo, ItemList) structured data](https://developers.google.com/search/docs/appearance/structured-data/recipe) | Full body | Specialist |
| [Merchant return policy (MerchantReturnPolicy) structured data](https://developers.google.com/search/docs/appearance/structured-data/return-policy) | Full body | Specialist |
| [Review snippet (Review, AggregateRating) structured data](https://developers.google.com/search/docs/appearance/structured-data/review-snippet) | Full body | Specialist |
| [General structured data guidelines](https://developers.google.com/search/docs/appearance/structured-data/sd-policies) | Full body | Direct |
| [Structured data markup that Google Search supports](https://developers.google.com/search/docs/appearance/structured-data/search-gallery) | Full body | Direct |
| [Merchant shipping policy (ShippingService) structured data](https://developers.google.com/search/docs/appearance/structured-data/shipping-policy) | Full body | Specialist |
| [Software app (SoftwareApplication) structured data](https://developers.google.com/search/docs/appearance/structured-data/software-app) | Full body | Conditional |
| [Speakable (Article, WebPage) structured data (BETA)](https://developers.google.com/search/docs/appearance/structured-data/speakable) | Full body | Specialist |
| [Vacation rental (VacationRental) structured data](https://developers.google.com/search/docs/appearance/structured-data/vacation-rental) | Full body | Specialist |
| [Video (VideoObject, Clip, BroadcastEvent) structured data](https://developers.google.com/search/docs/appearance/structured-data/video) | Full body | Specialist |
| [Supplier unit in Google Search](https://developers.google.com/search/docs/appearance/supplier-unit) | Full body | Specialist |
| [Influencing your title links in search results](https://developers.google.com/search/docs/appearance/title-link) | Full body | Direct |
| [Top Places List](https://developers.google.com/search/docs/appearance/top-places-list) | Full body | Specialist |
| [Translated results in Google Search](https://developers.google.com/search/docs/appearance/translated-results) | Full body | Conditional |
| [Video SEO best practices](https://developers.google.com/search/docs/appearance/video) | Full body | Specialist |
| [Visual Elements gallery of Google Search](https://developers.google.com/search/docs/appearance/visual-elements-gallery) | Full body | Direct |
| [Web Story Content Policies on Google](https://developers.google.com/search/docs/appearance/web-stories-content-policy) | Full body | Specialist |
| [Best practices for creating Web Stories](https://developers.google.com/search/docs/appearance/web-stories-creation-best-practices) | Full body | Specialist |

### crawling-indexing (41)

| Article | Reading | Pine applicability |
| --- | --- | --- |
| [Overview of crawling and indexing topics](https://developers.google.com/search/docs/crawling-indexing) | Full body | Direct |
| [Redirects and Google Search](https://developers.google.com/search/docs/crawling-indexing/301-redirects) | Full body | Direct |
| [About AMP on Google Search](https://developers.google.com/search/docs/crawling-indexing/amp) | Full body | Specialist |
| [Enhance AMP content in Google Search](https://developers.google.com/search/docs/crawling-indexing/amp/enhance-amp) | Full body | Specialist |
| [Remove your AMP pages from Google Search](https://developers.google.com/search/docs/crawling-indexing/amp/remove-amp) | Full body | Specialist |
| [Validate your AMP content](https://developers.google.com/search/docs/crawling-indexing/amp/validate-amp) | Full body | Specialist |
| [Ask Google to recrawl your URLs](https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl) | Full body | Direct |
| [Block Search indexing with noindex](https://developers.google.com/search/docs/crawling-indexing/block-indexing) | Full body | Direct |
| [What is canonicalization](https://developers.google.com/search/docs/crawling-indexing/canonicalization) | Full body | Direct |
| [Fix canonicalization issues](https://developers.google.com/search/docs/crawling-indexing/canonicalization-troubleshooting) | Full body | Direct |
| [How to specify a canonical URL with rel="canonical" and other methods](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls) | Full body | Direct |
| [Control what you share with Google](https://developers.google.com/search/docs/crawling-indexing/control-what-you-share) | Full body | Direct |
| [Googlebot](https://developers.google.com/search/docs/crawling-indexing/googlebot) | Full body | Direct |
| [File types indexable by Google](https://developers.google.com/search/docs/crawling-indexing/indexable-file-types) | Full body | Direct |
| [Dynamic rendering as a workaround](https://developers.google.com/search/docs/crawling-indexing/javascript/dynamic-rendering) | Full body | Direct |
| [Fix Search-related JavaScript problems](https://developers.google.com/search/docs/crawling-indexing/javascript/fix-search-javascript) | Full body | Direct |
| [Understand the JavaScript SEO basics](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics) | Full body | Direct |
| [Fix lazy-loaded content](https://developers.google.com/search/docs/crawling-indexing/javascript/lazy-loading) | Full body | Direct |
| [Keep redacted information out of Google Search](https://developers.google.com/search/docs/crawling-indexing/keep-redacted-information-out) | Full body | Conditional |
| [Link best practices for Google](https://developers.google.com/search/docs/crawling-indexing/links-crawlable) | Full body | Direct |
| [Mobile site and mobile-first indexing best practices](https://developers.google.com/search/docs/crawling-indexing/mobile/mobile-sites-mobile-first-indexing) | Full body | Direct |
| [Temporarily pause or disable a website](https://developers.google.com/search/docs/crawling-indexing/pause-online-business) | Full body | Conditional |
| [Remove images hosted on your site from search results](https://developers.google.com/search/docs/crawling-indexing/prevent-images-on-your-page) | Full body | Conditional |
| [Qualify your outbound links to Google](https://developers.google.com/search/docs/crawling-indexing/qualify-outbound-links) | Full body | Direct |
| [Remove a page hosted on your site from Google](https://developers.google.com/search/docs/crawling-indexing/remove-information) | Full body | Conditional |
| [Robots meta tag, data-nosnippet, and X-Robots-Tag specifications](https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag) | Full body | Direct |
| [Introduction to robots.txt](https://developers.google.com/search/docs/crawling-indexing/robots/intro) | Full body | Direct |
| [Changing your hosting](https://developers.google.com/search/docs/crawling-indexing/site-move-no-url-changes) | Full body | Conditional |
| [How to move a site](https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes) | Full body | Conditional |
| [Build and submit a sitemap](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap) | Full body | Direct |
| [How to combine sitemap extensions](https://developers.google.com/search/docs/crawling-indexing/sitemaps/combine-sitemap-extensions) | Full body | Conditional |
| [Image sitemaps](https://developers.google.com/search/docs/crawling-indexing/sitemaps/image-sitemaps) | Full body | Conditional |
| [Manage your sitemaps with a sitemap index file](https://developers.google.com/search/docs/crawling-indexing/sitemaps/large-sitemaps) | Full body | Conditional |
| [News sitemaps](https://developers.google.com/search/docs/crawling-indexing/sitemaps/news-sitemap) | Full body | Conditional |
| [Learn about sitemaps](https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview) | Full body | Direct |
| [Video sitemaps and alternatives](https://developers.google.com/search/docs/crawling-indexing/sitemaps/video-sitemaps) | Full body | Conditional |
| [meta tags and attributes that Google supports](https://developers.google.com/search/docs/crawling-indexing/special-tags) | Full body | Direct |
| [Troubleshoot Google Search crawling errors](https://developers.google.com/search/docs/crawling-indexing/troubleshoot-crawling-errors) | Full body | Direct |
| [URL structure best practices for Google Search](https://developers.google.com/search/docs/crawling-indexing/url-structure) | Full body | Direct |
| [Use valid HTML to specify page metadata](https://developers.google.com/search/docs/crawling-indexing/valid-page-metadata) | Full body | Direct |
| [Minimize A/B testing impact in Google Search](https://developers.google.com/search/docs/crawling-indexing/website-testing) | Full body | Conditional |

### essentials (3)

| Article | Reading | Pine applicability |
| --- | --- | --- |
| [Google Search Essentials](https://developers.google.com/search/docs/essentials) | Full body | Direct |
| [Spam policies for Google web search](https://developers.google.com/search/docs/essentials/spam-policies) | Full body | Direct |
| [Google Search technical requirements](https://developers.google.com/search/docs/essentials/technical) | Full body | Direct |

### fundamentals (10)

| Article | Reading | Pine applicability |
| --- | --- | --- |
| [Optimizing your website for generative AI features on Google Search](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide) | Full body | Direct |
| [Creating helpful, reliable, people-first content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content) | Full body | Direct |
| [Do you need an SEO?](https://developers.google.com/search/docs/fundamentals/do-i-need-seo) | Full body | Conditional |
| [Get your website on Google](https://developers.google.com/search/docs/fundamentals/get-on-google) | Full body | Direct |
| [Maintaining your website's SEO](https://developers.google.com/search/docs/fundamentals/get-started) | Full body | Direct |
| [Get started with Search: a developer's guide](https://developers.google.com/search/docs/fundamentals/get-started-developers) | Full body | Direct |
| [In-depth guide to how Google Search works](https://developers.google.com/search/docs/fundamentals/how-search-works) | Full body | Direct |
| [Search Engine Optimization (SEO) Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide) | Full body | Direct |
| [Google Search's guidance on using third-party SEO tools, services, and advice](https://developers.google.com/search/docs/fundamentals/third-party-seo) | Full body | Direct |
| [Google Search's guidance on using generative AI content on your website](https://developers.google.com/search/docs/fundamentals/using-gen-ai-content) | Full body | Direct |

### monitor-debug (15)

| Article | Reading | Pine applicability |
| --- | --- | --- |
| [Analyze your social and video platform content performance in Search Console](https://developers.google.com/search/docs/monitor-debug/analyze-social-video-content) | Full body | Conditional |
| [Improving SEO with a Search Console bubble chart](https://developers.google.com/search/docs/monitor-debug/bubble-chart-analysis) | Full body | Direct |
| [Debugging drops in Google Search traffic](https://developers.google.com/search/docs/monitor-debug/debugging-search-traffic-drops) | Full body | Direct |
| [Using Search Console and Google Analytics data for SEO](https://developers.google.com/search/docs/monitor-debug/google-analytics-search-console) | Full body | Conditional |
| [Prevent user-generated spam on your site and platform](https://developers.google.com/search/docs/monitor-debug/prevent-abuse) | Full body | Conditional |
| [Get started with Search Console](https://developers.google.com/search/docs/monitor-debug/search-console-start) | Full body | Direct |
| [Overview of Google search operators](https://developers.google.com/search/docs/monitor-debug/search-operators) | Full body | Direct |
| [site: search operator](https://developers.google.com/search/docs/monitor-debug/search-operators/all-search-site) | Full body | Direct |
| [Google Images search operators](https://developers.google.com/search/docs/monitor-debug/search-operators/image-search) | Full body | Conditional |
| [Preventing and monitoring abuse on your site](https://developers.google.com/search/docs/monitor-debug/security) | Full body | Conditional |
| [Malware and unwanted software](https://developers.google.com/search/docs/monitor-debug/security/malware) | Full body | Conditional |
| [Preventing malware infection](https://developers.google.com/search/docs/monitor-debug/security/prevent-malware) | Full body | Conditional |
| [Google Safe Browsing Repeat Offenders Policy](https://developers.google.com/search/docs/monitor-debug/security/safe-browsing-repeat-offenders) | Full body | Conditional |
| [Social engineering (phishing and deceptive sites)](https://developers.google.com/search/docs/monitor-debug/security/social-engineering) | Full body | Conditional |
| [Get started with Google Trends](https://developers.google.com/search/docs/monitor-debug/trends-start) | Full body | Direct |

### specialty (15)

| Article | Reading | Pine applicability |
| --- | --- | --- |
| [Best practices for ecommerce sites in Google Search](https://developers.google.com/search/docs/specialty/ecommerce) | Full body | Specialist |
| [Designing a URL structure for ecommerce websites](https://developers.google.com/search/docs/specialty/ecommerce/designing-a-url-structure-for-ecommerce-sites) | Full body | Conditional |
| [Help Google understand your ecommerce website structure](https://developers.google.com/search/docs/specialty/ecommerce/help-google-understand-your-ecommerce-site-structure) | Full body | Conditional |
| [How to launch a new ecommerce website](https://developers.google.com/search/docs/specialty/ecommerce/how-to-launch-an-ecommerce-website) | Full body | Conditional |
| [Include structured data relevant to ecommerce](https://developers.google.com/search/docs/specialty/ecommerce/include-structured-data-relevant-to-ecommerce) | Full body | Specialist |
| [Pagination, incremental page loading, and their impact on Google Search](https://developers.google.com/search/docs/specialty/ecommerce/pagination-and-incremental-page-loading) | Full body | Conditional |
| [Share your product data with Google](https://developers.google.com/search/docs/specialty/ecommerce/share-your-product-data-with-google) | Full body | Specialist |
| [Where ecommerce content can appear on Google](https://developers.google.com/search/docs/specialty/ecommerce/where-ecommerce-data-can-appear-on-google) | Full body | Specialist |
| [Write high quality reviews](https://developers.google.com/search/docs/specialty/ecommerce/write-high-quality-reviews) | Full body | Specialist |
| [Guidelines for sites with explicit content](https://developers.google.com/search/docs/specialty/explicit/guidelines) | Full body | Specialist |
| [What to do if your site is incorrectly flagged as explicit in Google Search results](https://developers.google.com/search/docs/specialty/explicit/troubleshooting) | Full body | Specialist |
| [Overview of international and multilingual site topics](https://developers.google.com/search/docs/specialty/international) | Full body | Specialist |
| [How Google crawls locale-adaptive pages](https://developers.google.com/search/docs/specialty/international/locale-adaptive-pages) | Full body | Specialist |
| [Tell Google about localized versions of your page](https://developers.google.com/search/docs/specialty/international/localized-versions) | Full body | Specialist |
| [Managing multi-regional and multilingual sites](https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites) | Full body | Specialist |

### Additional linked crawler references (10)

| Article | Reading | Pine applicability |
| --- | --- | --- |
| [Overview of Google crawlers and fetchers (user agents)](https://developers.google.com/crawling/docs/crawlers-fetchers/overview-google-crawlers) | Full body | Direct |
| [Reduce the Google crawl rate](https://developers.google.com/crawling/docs/crawlers-fetchers/reduce-crawl-rate) | Full body | Conditional |
| [Verify requests from Google crawlers and fetchers](https://developers.google.com/crawling/docs/crawlers-fetchers/verifying-googlebot) | Full body | Direct |
| [How Google interprets the robots.txt specification](https://developers.google.com/crawling/docs/robots-txt/robots-txt-spec) | Full body | Direct |
| [Optimize your crawl budget](https://developers.google.com/crawling/docs/crawl-budget) | Full body | Conditional |
| [How to write and submit a robots.txt file](https://developers.google.com/crawling/docs/robots-txt/create-robots-txt) | Full body | Direct |
| [Update your robots.txt file](https://developers.google.com/crawling/docs/robots-txt/submit-updated-robots-txt) | Full body | Direct |
| [Debug network and DNS errors for Google's crawlers](https://developers.google.com/crawling/docs/troubleshooting/dns-network-errors) | Full body | Direct |
| [How HTTP status codes affect Google's crawlers](https://developers.google.com/crawling/docs/troubleshooting/http-status-codes) | Full body | Direct |
| [Managing crawling of faceted navigation URLs](https://developers.google.com/search/docs/crawling-indexing/crawling-managing-faceted-navigation) | Full body | Conditional |

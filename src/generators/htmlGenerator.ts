export interface CourseData {
  id: string;
  title: string;
  duration: string;
  startDate: string;
  startTime: string;
  description: string;
  instructor: {
    name: string;
    avatar: string;
  };
  image: string;
  url: string;
}

export interface TestimonialData {
  name: string;
  avatar: string;
  company?: string;
}

export class HTMLGenerator {
  private courseData: CourseData[] = [
    {
      id: 'solidity',
      title: 'Solidity Bootcamp',
      duration: '16 Weeks',
      startDate: '15th January 2025',
      startTime: '9:00 AM EDT',
      description: 'A comprehensive advanced smart contract development bootcamp focused on gas optimization, security patterns, and scaling techniques.',
      instructor: { name: 'Jeffrey', avatar: 'images/jeffrey_scholz.webp' },
      image: 'images/solidity_bootcamp_image_solid.webp',
      url: 'https://rareskills.io/solidity-bootcamp'
    },
    {
      id: 'zk',
      title: 'ZK Bootcamp',
      duration: '11 Weeks',
      startDate: '6th October 2025',
      startTime: '10:00 AM EDT',
      description: 'A comprehensive advanced zero-knowledge development bootcamp focused on circom, halo2, and ZK-SNARKs.',
      instructor: { name: 'Jeffrey', avatar: 'images/jeffrey_scholz.webp' },
      image: 'images/zk_bootcamp_image_solid.webp',
      url: 'https://rareskills.io/zk-bootcamp'
    },
    {
      id: 'rust',
      title: 'Rust Bootcamp',
      duration: '3 Weeks',
      startDate: '29th October 2025',
      startTime: '8:00 AM EDT',
      description: 'A comprehensive Rust development bootcamp focused on Solana, Anchor framework, and advanced Rust patterns.',
      instructor: { name: 'Daniel', avatar: 'images/daniel_cumming.webp' },
      image: 'images/rust_bootcamp_image_solid.webp',
      url: 'https://rareskills.io/rust-bootcamp'
    },
    {
      id: 'uniswap',
      title: 'Uniswap V3 Bootcamp',
      duration: '9 Weeks',
      startDate: '2nd July 2025',
      startTime: '9:00 AM EDT',
      description: 'A comprehensive advanced DeFi development bootcamp focused on Uniswap V3, AMM mechanics, and yield farming.',
      instructor: { name: 'João', avatar: 'images/joao_morais.webp' },
      image: 'images/uniswap_v3_bootcamp_image_solid.webp',
      url: 'https://rareskills.io/uniswap-v3-bootcamp'
    },
    {
      id: 'circom',
      title: 'Circom Bootcamp',
      duration: '4 Weeks',
      startDate: '3rd November 2025',
      startTime: '11:00 AM EDT',
      description: 'A comprehensive Circom development bootcamp focused on ZK circuit design, constraint systems, and optimization.',
      instructor: { name: 'Jeffrey', avatar: 'images/jeffrey_scholz.webp' },
      image: 'images/circom_bootcamp_image_solid.webp',
      url: 'https://rareskills.io/circom-bootcamp'
    }
  ];

  private testimonialData: TestimonialData[] = [
    { name: 'bengal_cat_balu', avatar: 'images/bengal_cat_balu.webp' },
    { name: 'shafu', avatar: 'images/shafu.webp' },
    { name: 'dimitar_tsvetanov', avatar: 'images/dimitar_tsvetanov.webp' },
    { name: 'cd_security', avatar: 'images/cd_security.webp' },
    { name: 'giuseppe_de_la_zara', avatar: 'images/giuseppe_de_la_zara.webp' },
    { name: 'alex_sr', avatar: 'images/alex_sr.webp' },
    { name: 'ddimitrov22', avatar: 'images/ddimitrov22.webp' },
    { name: 'chrisdior', avatar: 'images/chrisdior.webp' },
    { name: 'pashovkrum', avatar: 'images/pashovkrum.webp' },
    { name: '0xfrankcastle', avatar: 'images/0xfrankcastle.webp' }
  ];

  generateHead(): string {
    return `<!DOCTYPE html><html lang="en-US" data-theme="light"><head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Senior Web3 Blockchain Engineer Bootcamps With RareSkills</title>
<meta name="robots" content="max-image-preview:large">
<style>img:is([sizes="auto" i], [sizes^="auto," i]) { contain-intrinsic-size: 3000px 1500px }</style>
<link rel="preload" href="https://rareskills.io/wp-content/uploads/2025/06/inter-400-normal.woff2" as="font" type="font/woff2" crossorigin="anonymous">
<meta name="description" content="Learn everything you need to know about blockchain technology and become a senior Web3 blockchain engineer with our blockchain bootcamps here at RareSkills.">
<link rel="dns-prefetch" href="//plausible.io">
<link rel="dns-prefetch" href="//client.crisp.chat">
<link rel="dns-prefetch" href="//www.googletagmanager.com">

<link rel="stylesheet" id="global-styles" href="css/styles.css" media="all">
<script async="" src="js/gtm.js"></script>
<script defer="" data-domain="rareskills.io" data-api="https://plausible.io/api/event" data-cfasync="false" src="js/plausible.outbound-links.js" id="plausible-analytics-js"></script>
<script id="plausible-analytics-js-after">
window.plausible = window.plausible || function() { (window.plausible.q = window.plausible.q || []).push(arguments) }
</script>

<!-- Google tag (gtag.js) snippet added by Site Kit -->
<!-- Google Analytics snippet added by Site Kit -->
<script src="https://www.googletagmanager.com/gtag/js?id=GT-NFPT95T" id="google_gtagjs-js" async=""></script>
<script id="google_gtagjs-js-after">
window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}
gtag("set","linker",{"domains":["rareskills.io"]});
gtag("js", new Date());
gtag("set", "developer_id.dZTNiMT", true);
gtag("config", "GT-NFPT95T");
</script>

<link rel="https://api.w.org/" href="https://rareskills.io/wp-json/">
<link rel="alternate" title="JSON" type="application/json" href="https://rareskills.io/wp-json/wp/v2/pages/2">
<link rel="EditURI" type="application/rsd+xml" title="RSD" href="https://rareskills.io/xmlrpc.php?rsd">
<meta name="generator" content="WordPress 6.8.2">
<link rel="canonical" href="https://rareskills.io/">
<link rel="shortlink" href="https://rareskills.io/">
<link rel="alternate" title="oEmbed (JSON)" type="application/json+oembed" href="https://rareskills.io/wp-json/oembed/1.0/embed?url=https%3A%2F%2Frareskills.io%2F">
<link rel="alternate" title="oEmbed (XML)" type="text/xml+oembed" href="https://rareskills.io/wp-json/oembed/1.0/embed?url=https%3A%2F%2Frareskills.io%2F&format=xml">
<meta name="generator" content="Site Kit by Google 1.161.0">
<meta name="plausible-analytics-version" content="2.3.1">

<!-- Google Tag Manager snippet added by Site Kit -->
<script>
( function( w, d, s, l, i ) {
w[l] = w[l] || [];
w[l].push( {'gtm.start': new Date().getTime(), event: 'gtm.js'} );
var f = d.getElementsByTagName( s )[0],
j = d.createElement( s ), dl = l != 'dataLayer' ? '&l=' + l : '';
j.async = true;
j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
f.parentNode.insertBefore( j, f );
} )( window, document, 'script', 'dataLayer', 'GTM-5SZKS4RW' );
</script>
<!-- End Google Tag Manager snippet added by Site Kit -->

<link rel="icon" href="images/cropped-RareSkills-favicon-big-32x32.png" sizes="32x32">
<link rel="icon" href="images/cropped-RareSkills-favicon-big-192x192.png" sizes="192x192">
<link rel="apple-touch-icon" href="images/cropped-RareSkills-favicon-big-180x180.png">
<meta name="msapplication-TileImage" content="https://rareskills.io/wp-content/uploads/2024/09/cropped-RareSkills-favicon-big-270x270.png">

<meta property="og:url" content="https://rareskills.io">
<meta property="og:site_name" content="RareSkills">
<meta property="og:title" content="Senior Web3 Blockchain Engineer Bootcamps With RareSkills">
<meta property="og:description" content="Learn everything you need to know about blockchain technology and become a senior Web3 blockchain engineer with our blockchain bootcamps here at RareSkills.">
<meta property="og:image" content="images/og_homepage_image.webp">
<meta property="og:type" content="website">
</head>`;
  }

  generateHeader(): string {
    return `<header id="brx-header" class="brx-sticky">
<div id="brxe-yqiabk" class="brxe-section">
<div id="brxe-xsksih" class="brxe-container background-blur">
<a id="brxe-vqhxuh" class="brxe-image tag" href="https://rareskills.io" aria-current="page">
<img src="images/rareskills_logo_light.svg" class="css-filter size-full" alt="" loading="eager" data-img-light="https://rareskills.io/wp-content/uploads/2025/06/rareskills_logo_light.svg" data-img-dark="https://rareskills.io/wp-content/uploads/2025/06/rareskills_logo_dark.svg" decoding="async">
</a>
<div id="brxe-hmpult" class="brxe-div">
<div id="brxe-ufejoo" data-script-id="ufejoo" class="brxe-nav-menu">
<nav class="bricks-nav-menu-wrapper mobile_landscape">
<ul id="menu-main-menu" class="bricks-nav-menu">
<li id="menu-item-12282" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-has-children menu-item-12282 bricks-menu-item">
<div class="brx-submenu-toggle icon-right">
<a href="https://rareskills.io/web3-blockchain-bootcamps">Courses</a>
<button aria-expanded="false" aria-label="Courses Sub menu">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12" fill="none" class="menu-item-icon">
<path d="M1.50002 4L6.00002 8L10.5 4" stroke-width="1.5" stroke="currentcolor"></path>
</svg>
</button>
</div>
<ul class="sub-menu">
<li id="menu-item-7199" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-7199 bricks-menu-item"><a href="https://rareskills.io/solidity-bootcamp">Solidity Bootcamp</a></li>
<li id="menu-item-4672" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-4672 bricks-menu-item"><a href="https://rareskills.io/zk-bootcamp">ZK Bootcamp</a></li>
<li id="menu-item-5006" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-5006 bricks-menu-item"><a href="https://rareskills.io/rust-bootcamp">Rust Bootcamp</a></li>
<li id="menu-item-10634" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-10634 bricks-menu-item"><a href="https://rareskills.io/uniswap-v3-bootcamp">Uniswap V3 Bootcamp</a></li>
<li id="menu-item-12151" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-12151 bricks-menu-item"><a href="https://rareskills.io/circom-bootcamp">Circom Bootcamp</a></li>
</ul>
</li>
<li id="menu-item-4805" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-4805 bricks-menu-item"><a href="https://rareskills.io/blog">Blog</a></li>
<li id="menu-item-11877" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-11877 bricks-menu-item"><a href="https://rareskills.io/testimonials">Testimonials</a></li>
<li id="menu-item-4677" class="menu-item menu-item-type-custom menu-item-object-custom menu-item-4677 bricks-menu-item"><a target="_blank" rel="noopener" href="https://raretalent.xyz/">Web3 Jobs</a></li>
<li id="menu-item-4803" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-4803 bricks-menu-item"><a href="https://rareskills.io/pricing">Pricing</a></li>
</ul>
</nav>
<button class="bricks-mobile-menu-toggle" aria-haspopup="true" aria-label="Open mobile menu" aria-expanded="false">
<span class="bar-top"></span>
<span class="bar-center"></span>
<span class="bar-bottom"></span>
</button>
<nav class="bricks-mobile-menu-wrapper left">
<ul id="menu-main-menu-1" class="bricks-mobile-menu">
<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-has-children menu-item-12282 bricks-menu-item">
<div class="brx-submenu-toggle icon-right">
<a href="https://rareskills.io/web3-blockchain-bootcamps">Courses</a>
<button aria-expanded="false" aria-label="Courses Sub menu">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12" fill="none" class="menu-item-icon">
<path d="M1.50002 4L6.00002 8L10.5 4" stroke-width="1.5" stroke="currentcolor"></path>
</svg>
</button>
</div>
<ul class="sub-menu">
<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-7199 bricks-menu-item"><a href="https://rareskills.io/solidity-bootcamp">Solidity Bootcamp</a></li>
<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-4672 bricks-menu-item"><a href="https://rareskills.io/zk-bootcamp">ZK Bootcamp</a></li>
<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-5006 bricks-menu-item"><a href="https://rareskills.io/rust-bootcamp">Rust Bootcamp</a></li>
<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-10634 bricks-menu-item"><a href="https://rareskills.io/uniswap-v3-bootcamp">Uniswap V3 Bootcamp</a></li>
<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-12151 bricks-menu-item"><a href="https://rareskills.io/circom-bootcamp">Circom Bootcamp</a></li>
</ul>
</li>
<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-4805 bricks-menu-item"><a href="https://rareskills.io/blog">Blog</a></li>
<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-11877 bricks-menu-item"><a href="https://rareskills.io/testimonials">Testimonials</a></li>
<li class="menu-item menu-item-type-custom menu-item-object-custom menu-item-4677 bricks-menu-item"><a target="_blank" rel="noopener" href="https://raretalent.xyz/">Web3 Jobs</a></li>
<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-4803 bricks-menu-item"><a href="https://rareskills.io/pricing">Pricing</a></li>
</ul>
</nav>
<div class="bricks-mobile-menu-overlay"></div>
</div>
<div id="brxe-acbput" class="brxe-div"><i id="theme-toggle" class="fas brxe-icon fa-sun"></i></div>
<a id="brxe-jbeoix" class="brxe-button btn bricks-button bricks-background-primary" href="https://rareskills.io/apply-now">Apply Now</a>
</div>
</div>
</div>
</header>`;
  }

  generateBody(): string {
    const bodyStart = `<body class="home wp-singular page-template-default page page-id-2 wp-theme-bricks wp-child-theme-bricks-child brx-body bricks-is-frontend wp-embed-responsive">
<!-- Google Tag Manager (noscript) snippet added by Site Kit -->
<noscript>
<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-5SZKS4RW" height="0" width="0" style="display:none;visibility:hidden"></iframe>
</noscript>
<!-- End Google Tag Manager (noscript) snippet added by Site Kit -->
<a class="skip-link" href="#brx-content">Skip to main content</a>
<a class="skip-link" href="#brx-footer">Skip to footer</a>`;

    const hero = `<main id="brx-content">
<section id="brxe-zabdyq" class="brxe-section">
<div id="brxe-mnrfhf" class="brxe-container">
<div id="brxe-dkdsfa" class="brxe-block">
<h1 id="brxe-drdili" class="brxe-heading title-h1">The Web3 Education Platform Trusted By Industry Leading Developers & Auditors</h1>
<a id="brxe-ljpatt" class="brxe-button btn bricks-button bricks-background-primary" href="https://rareskills.io/web3-blockchain-bootcamps">View Our Courses<i class="fas fa-chevron-right"></i></a>
<div id="brxe-knxkra" class="brxe-div">
<div id="brxe-muyqlv" class="brxe-rating">
<div class="icon full-color"><i class="fas fa-star"></i></div>
<div class="icon full-color"><i class="fas fa-star"></i></div>
<div class="icon full-color"><i class="fas fa-star"></i></div>
<div class="icon full-color"><i class="fas fa-star"></i></div>
<div class="icon full-color"><i class="fas fa-star"></i></div>
</div>
<img src="images/course_report_logo_light.svg" class="brxe-image css-filter size-full" alt="" id="brxe-hbvvjy" data-img-light="https://rareskills.io/wp-content/uploads/2025/07/course_report_logo_light.svg" data-img-dark="https://rareskills.io/wp-content/uploads/2025/07/course_report_logo_dark.svg" decoding="async">
</div>
</div>`;

    const testimonials = this.generateTestimonialSection();
    const courses = this.generateCourseSection();
    const footer = this.generateFooter();

    return `${bodyStart}
${hero}
${testimonials}
${courses}
</main>
${footer}
<script src="js/bricks.min.js"></script>
<script src="js/l.js"></script>
</body>
</html>`;
  }

  generateTestimonialSection(): string {
    const testimonialCards = this.testimonialData.map(testimonial => `
<div class="brxe-cbuqdi brxe-div background-blur">
<div class="brxe-uwvabz brxe-div">
<img width="400" height="400" src="${testimonial.avatar}" class="brxe-pnlwmd brxe-image css-filter size-full" alt="" decoding="async" fetchpriority="high">
</div>
</div>`).join('');

    return `<div id="brxe-jxxtbi" class="brxe-block">
<div id="brxe-fhgiak" class="brxe-div track">
<div id="brxe-koejmc" class="brxe-div vertical-scroller group">
${testimonialCards}
</div>
</div>
</div>
</section>`;
  }

  generateCourseSection(): string {
    const courseCards = this.courseData.map(course => `
<div class="brxe-bnwojo brxe-div">
<div class="brxe-blxdkz brxe-div">
<a class="brxe-etlrrh brxe-image tag" href="${course.url}">
<img width="720" height="400" src="${course.image}" class="css-filter size-full" alt="" decoding="async">
</a>
<div class="brxe-jtsmaz brxe-div">
<h3 class="brxe-mbratg brxe-heading title-h3"><a href="${course.url}">${course.title}</a></h3>
<span class="brxe-ttvqwy brxe-text-basic card-tag">${course.duration}</span>
</div>
</div>
<div class="brxe-cxcwhx brxe-div">
<div class="brxe-nkmikk brxe-text-basic card-course-date-time">${course.startDate}</div>
<div class="brxe-nvdban brxe-divider vertical"><div class="line"></div></div>
<div class="brxe-twdzli brxe-text-basic card-course-date-time">${course.startTime}</div>
</div>
<div class="brxe-lklcfc brxe-text-basic card-description"><p>${course.description}</p></div>
<div class="brxe-qsxzyv brxe-div">
<h3 class="brxe-yjmgkg brxe-heading title-h4">Instructor</h3>
<div class="brxe-wiwbzx brxe-div">
<div class="brxe-ozmawz brxe-div">
<img width="400" height="400" src="${course.instructor.avatar}" class="brxe-pqvkdp brxe-image card-avatar css-filter size-full" alt="" decoding="async">
<span class="brxe-wugwcp brxe-text-basic card-title-instructor">${course.instructor.name}</span>
</div>
</div>
</div>
<a class="brxe-pliuxk brxe-button button-card bricks-button bricks-background-primary" href="${course.url}">View Bootcamp<i class="fas fa-chevron-right"></i></a>
</div>`).join('');

    return `<section class="courses-section">
<div class="courses-container">
${courseCards}
</div>
</section>`;
  }

  generateFooter(): string {
    return `<footer id="brx-footer" class="brx-footer">
<div class="footer-content">
<div class="footer-section">
<img src="images/rareskills_logo_light.svg" alt="RareSkills Logo" class="footer-logo">
</div>
</div>
</footer>`;
  }

  generateHTML(): string {
    return `${this.generateHead()}
${this.generateHeader()}
${this.generateBody()}`;
  }
}
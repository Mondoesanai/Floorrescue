// v5 deck: 24 slides. Run against the ORIGINAL 32-slide template (scripts/pitch-deck-template.original.html);
// it writes scripts/pitch-deck-template.html then build-pitch-deck.mjs embeds the screenshots.
import fs from "node:fs";
import path from "node:path";

const orig = path.join(process.cwd(), "scripts", "pitch-deck-template.original.html");
const outFile = path.join(process.cwd(), "scripts", "pitch-deck-template.html");
let html = fs.readFileSync(orig, "utf8");

const start = html.indexOf('<div class="deck" id="deck">') + '<div class="deck" id="deck">'.length;
const end = html.indexOf('</div>\n\n<div class="foot">');
const old = html.slice(start, end).match(/<section class="slide[\s\S]*?<\/section>/g);
if (old.length !== 32) throw new Error("expected 32 slides, found " + old.length);

const withFix = (s) => s.replace("</ol>", '</ol><p class="fixtag">Every circled item is fixed on the new site</p>');
const S = { annDesk: withFix(old[8]), annScroll: withFix(old[9]), annMob: withFix(old[10]), reveal: old[13] };

const shotSlide = (kick, h2, lead, url, img, alt, fix) => `
  <section class="slide">
    <div class="row wide-l">
      <div>
        <div class="kick">${kick}</div>
        <h2>${h2}</h2>
        <p class="lead">${lead}</p>
        ${fix ? `<p class="fixtag">${fix}</p>` : ""}
      </div>
      <div class="shot">
        <div class="bar"><span></span><span></span><span></span><span class="url">${url}</span></div>
        <img src="${img}" alt="${alt}">
      </div>
    </div>
  </section>`;
const stat = (n, l) => `<div class="stat"><div class="n">${n}</div><p>${l}</p></div>`;

const slides = [];

// ---- Part 1: where you are (8)
slides.push(`
  <section class="slide dark">
    <div class="kick">Inspiring Websites &nbsp;&middot;&nbsp; prepared for Jeremy, Floor Rescue</div>
    <h1>Twenty-two years of work that speaks for itself.<br>Your website should say it just as loudly.</h1>
    <p class="lead" style="margin-top:1rem">What the current site is costing, what a stronger one is plausibly worth &mdash; and the site we built while we were talking.</p>
  </section>`);

slides.push(`
  <section class="slide dark">
    <div class="kick">One thing to know before we start</div>
    <h2>What you&rsquo;re about to see is an example &mdash; not a final answer.</h2>
    <p class="lead" style="max-width:60ch">We built it from what you gave us: your projects, your systems, your language. It&rsquo;s here to show what&rsquo;s possible &mdash; nothing more.</p>
    <div class="grid2" style="max-width:74ch;margin-top:1.4rem">
      <div><h3>Everything is editable</h3><p>Every word, photo, page, and the order things appear in. Nothing is locked.</p></div>
      <div><h3>Don&rsquo;t like it? We redo it</h3><p>If the direction isn&rsquo;t right, we start over. This is a starting point, not a take-it-or-leave-it.</p></div>
      <div><h3>The words matter most</h3><p>Your services and how they&rsquo;re described are what a trade buyer judges you on. We refine every line with you before anything goes live.</p></div>
      <div><h3>Built from your own material</h3><p>Real project names, your systems, your credentials &mdash; nothing invented, nothing published you haven&rsquo;t approved.</p></div>
    </div>
  </section>`);

slides.push(`
  <section class="slide">
    <div class="kick" style="color:var(--neg)">Where you are</div>
    <h2>You&rsquo;ve built something real.</h2>
    <div class="cards3">
      <div><h4>22+ years in the trade</h4><p>Hands-on with the grinders, coatings and slabs &mdash; not managed from a distance.</p></div>
      <div><h4>65 documented projects</h4><p>From the 25,000 SF Comerica Bank headquarters to airport hangars, dental offices and a county sally port.</p></div>
      <div><h4>22 floor systems</h4><p>Concrete, resinous and decorative &mdash; across residential, commercial and industrial.</p></div>
      <div><h4>16 five-star reviews</h4><p>Every single one a five. Real clients, in their own words.</p></div>
      <div><h4>Credentials that close deals</h4><p>USDA / FDA-compliant systems, Matrix-certified applicators, licensed, insured and bonded.</p></div>
      <div><h4>A point of view</h4><p>The power is in the install &mdash; and the floor starts with the slab.</p></div>
    </div>
    <p class="quote" style="font-size:clamp(1.15rem,3vh,1.7rem);max-width:none;margin-top:1.4rem;color:var(--neg)">So why doesn&rsquo;t the first place buyers look show any of it?</p>
  </section>`);

slides.push(`
  <section class="slide dark">
    <div class="kick">How buyers decide</div>
    <h2>They judge you before they read you.</h2>
    <div class="stats4">
      ${stat("94%", "of first impressions are design-related")}
      ${stat("75%", "of users judge a company&rsquo;s credibility by its website design")}
      ${stat("50 ms", "for a visitor to form an opinion of a site")}
      ${stat("38%", "stop engaging when a layout is unattractive")}
    </div>
    <p class="lead" style="margin-top:1.4rem;max-width:56ch">A facility manager weighing a floor that can run into six figures will look at your website. Then look again.</p>
    <p class="srcnote">Compiled from published web-credibility research (Stanford Web Credibility Research, Google) as summarized by Shropshire Media (2024) and Tenacity.</p>
  </section>`);

slides.push(S.annDesk, S.annScroll, S.annMob);

slides.push(`
  <section class="slide dark">
    <div class="kick">What we heard, in our words</div>
    <h2>Six worries. Each one has a price tag.</h2>
    <div class="grid2" style="max-width:82ch;margin-top:.8rem">
      <div><h3>Being misunderstood</h3><p>Wrong terms lose the exact buyers who know the trade &mdash; architects, GCs, plant managers &mdash; before they ever call.</p></div>
      <div><h3>Twenty years flattened into generic copy</h3><p>A generic page gets compared on price. A specialist gets compared on knowledge.</p></div>
      <div><h3>The wrong first impression</h3><p>A large industrial buyer who sees the wrong work never sends the bid &mdash; and you never find out.</p></div>
      <div><h3>Urgent problems, slow answers</h3><p>Someone with a failing floor books the first credible answer they find. Slower is lost.</p></div>
      <div><h3>Answering the same questions, again</h3><p>Every repeat call and text is time taken from the work &mdash; and from the jobs you actually want.</p></div>
      <div><h3>A vendor who fades away</h3><p>A site nobody owns goes stale, slips in search, and quietly stops representing you.</p></div>
    </div>
  </section>`);

// ---- Part 2: what it's costing (4)
slides.push(`
  <section class="slide">
    <div class="kick" style="color:var(--neg)">The market</div>
    <h2>The demand in Dallas&ndash;Fort Worth is real &mdash; and the search starts online.</h2>
    <div class="stats4 light">
      ${stat("8.48M", "people in the DFW metro &mdash; the 4th-largest metro in the U.S.")}
      ${stat("123,557", "residents added in a single year &mdash; second-largest gain of any U.S. metro")}
      ${stat("17%", "of B2B buying time is spent meeting with potential suppliers")}
      ${stat("27%", "is spent researching independently online &mdash; before anyone calls you")}
    </div>
    <p class="lead" style="margin-top:1.4rem;max-width:62ch">New people mean new homes, offices, restaurants and facilities. Most of the comparing happens on a website, without you in the room. <b>The site is where that comparison is won or lost.</b></p>
    <p class="srcnote">Sources: U.S. Census Bureau population estimates (July 2025) as reported by Dallas Morning News and The Real Deal, March 2026; Gartner B2B buying journey research.</p>
  </section>`);

slides.push(`
  <section class="slide">
    <div class="kick" style="color:var(--neg)">What that traffic is worth</div>
    <h2>Modeled value of a site that converts, per year.</h2>
    <table class="cmp" style="max-width:52rem">
      <thead><tr><th>Monthly visitors</th><th>Reach out (2%)</th><th>Become jobs (10%)</th><th class="hi">Modeled revenue / year</th></tr></thead>
      <tbody>
        <tr><td>500</td><td>10 / month</td><td>1 / month</td><td class="hi">$72,000</td></tr>
        <tr><td>1,000</td><td>20 / month</td><td>2 / month</td><td class="hi">$144,000</td></tr>
        <tr><td>2,000</td><td>40 / month</td><td>4 / month</td><td class="hi">$288,000</td></tr>
        <tr><td>4,000</td><td>80 / month</td><td>8 / month</td><td class="hi">$576,000</td></tr>
      </tbody>
    </table>
    <p class="lead" style="margin-top:1.1rem;max-width:62ch">And that&rsquo;s at an average job of just $6,000. A single facility floor can run to $300,000 &mdash; one bid that lands differently changes the year.</p>
    <p class="srcnote">Illustrative model, not a forecast: visitors &times; 2% reach out &times; 10% become jobs &times; $6,000 average job &times; 12 months. Every input is an assumption we refine together with your real numbers.</p>
  </section>`);

slides.push(`
  <section class="slide dark" style="justify-content:center">
    <div class="kick">The cost of waiting</div>
    <h1 style="max-width:20ch">Every month the site stays as it is, a modeled <span style="color:var(--gold)">$6,000&ndash;$24,000</span> walks past.</h1>
    <p class="lead" style="margin-top:1.2rem;max-width:52ch">One average job is $6,000. One large commercial or industrial floor can be many times that.</p>
    <p class="srcnote">Modeled from the 500&ndash;2,000 visitors-per-month rows on the previous slide. Illustrative.</p>
  </section>`);

slides.push(`
  <section class="slide dark">
    <div class="kick">Now, what about you?</div>
    <h2 style="max-width:22ch">On a scale of 1 to 10, how important is fixing this?</h2>
    <div class="scale">${[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => `<span class="${n >= 8 ? "hi" : ""}${n === 10 ? " ten" : ""}">${n}</span>`).join("")}</div>
    <div class="grid2" style="max-width:74ch;margin-top:1.6rem">
      <div><h3>If it isn&rsquo;t a 10</h3><p>What makes it a [your number] &mdash; and not a 10?</p></div>
      <div><h3>The budget question</h3><p>What would you invest to close this gap?</p></div>
    </div>
  </section>`);

// ---- Part 3: the site we built (8)
slides.push(
  S.reveal.replace(/<p class="kick"[^>]*>Before we explain a single decision<\/p>/, '<p class="kick" style="align-self:center">What we built for you</p>'),
);

slides.push(shotSlide("The first screen", "One question. Three doors. Nothing in the way.",
  "&ldquo;Where does your project live?&rdquo; A real concrete-restoration film, the gold Floor Rescue sign, then three doors: My Home, My Business, My Facility. Pick one and the camera moves &mdash; a full commercial building rises out of the floor, then sector, project type, and a page built for that exact space. The industrial buyer never has to sit through a garage.",
  "floorrescue.com", "{{IMG_HERO}}", "Floor Rescue homepage &mdash; the gold sign and three environment choices",
  "Fixes: the wrong first impression &mdash; and a Skip button lets anyone move past the film"));

slides.push(shotSlide("Every system, side by side", "Three families, always open. Read down the one that sounds like you.",
  "Not everyone arrives knowing the difference between polished concrete and a resinous coating. So nothing is hidden behind tabs: Concrete, Resinous Coatings and Decorative Artistry sit next to each other, each with a photo and its first few systems &mdash; and a View all button so nothing overwhelms a first-time visitor.",
  "floorrescue.com &middot; Floor Systems", "{{IMG_SYSTEMS}}", "Three side-by-side columns: Concrete, Resinous Coatings, Decorative Artistry",
  "Fixes: a wall of technical terms that only a trade insider can read"));

slides.push(shotSlide("&ldquo;What are you dealing with?&rdquo;", "Say it your way. Spelling doesn&rsquo;t matter.",
  "A visitor types &ldquo;my floor is breaking&rdquo; &mdash; misspelled, non-technical, whatever &mdash; and the site asks one follow-up question, then sends them to a real guide that explains it. The same box lives in the header on every page. Twelve in-depth problem guides sit behind it, and they help you get found on Google too.",
  "floorrescue.com &middot; What are you dealing with?", "{{IMG_FINDER}}", "Plain-language problem finder asking a follow-up question",
  "Fixes: urgent problems that can&rsquo;t get a fast answer"));

slides.push(shotSlide("A page built for their exact space", "Seventeen spaces. Seventeen different pages.",
  "Every space &mdash; a restaurant, a warehouse, a hotel, a cold-storage facility &mdash; gets its own page with its own interactive floor plan: tap the kitchen line, the dish pit, the walk-in cooler and see what each floor faces. Then matching projects, straight answers, four reviews, and a quote form that already knows the space.",
  "floorrescue.com/commercial/restaurant-food-service", "{{IMG_WALK}}", "Interactive Walk Your Restaurant floor plan on the restaurant page",
  "Fixes: every trade getting flattened into generic contractor copy"));

slides.push(shotSlide("Built to move &mdash; and to teach", "A floor is layers. Watch it build from the slab up.",
  "A cross-section that builds itself layer by layer, process steps that light up in turn, a photo rail you can pause, drag and open full size, and a progress bar that shows where you are on the page. Motion here explains the trade &mdash; it never gets in the way.",
  "floorrescue.com &middot; Anatomy of a Floor", "{{IMG_LAYERS}}", "Animated floor layer cross-section from the slab up to the topcoat",
  "Fixes: a site that reads like every other contractor brochure"));

slides.push(`
  <section class="slide">
    <div class="kick" style="color:var(--neg)">The science behind it</div>
    <h2>Every choice has a reason.</h2>
    <table class="cmp sci">
      <thead><tr><th>The gap</th><th>What we did</th><th>What the research says</th></tr></thead>
      <tbody>
        <tr><td>Too many choices</td><td>Three doors, one question</td><td>Hick&rsquo;s Law: decision time rises with every added choice.</td></tr>
        <tr><td>No clear next step</td><td>One gold Request a Quote, always in reach</td><td>Landing pages with a single call to action converted 13.5% vs 10.5% with five or more.</td></tr>
        <tr><td>Small steps</td><td>Environment &rarr; space &rarr; project &rarr; quote</td><td>Commitment and consistency: the more small steps people invest, the likelier they finish.</td></tr>
        <tr><td>Trust</td><td>Real jobs, real reviews, consistent design</td><td>Stanford Web Credibility Project (4,500+ people): design and errors shape credibility fast.</td></tr>
        <tr><td>Form friction</td><td>A prefilled form &mdash; nothing asked twice</td><td>HubSpot (2024): each added form field lowers conversion about 4.1% on average.</td></tr>
        <tr><td>Slow phones</td><td>Cinematic clips cut ~75% smaller</td><td>Google / SOASTA: 53% of mobile visits are abandoned when a page takes over 3 seconds.</td></tr>
      </tbody>
    </table>
    <p class="srcnote">Sources: Laws of UX; Whitehat; Stanford Web Credibility Project; HubSpot 2024; Google / SOASTA. Single-CTA and form-field figures are typical benchmarks that vary by study &mdash; not promises.</p>
  </section>`);

slides.push(`
  <section class="slide">
    <div class="kick" style="color:var(--gold-d)">Every improvement, at a glance</div>
    <h2>What we&rsquo;re actually fixing.</h2>
    <table class="cmp sci tight" style="max-width:none">
      <thead><tr><th style="width:17%"></th><th style="width:33%">Before</th><th class="hi">Now</th></tr></thead>
      <tbody>
        <tr><td>First screen</td><td>A retail-store carousel and a banner over the top</td><td class="hi">A real floor being restored under the gold sign &mdash; nothing in the way</td></tr>
        <tr><td>Getting around</td><td>Two menus, five dropdowns</td><td class="hi">Three doors, plus one search that understands plain language</td></tr>
        <tr><td>Finding help</td><td>No way to describe a problem</td><td class="hi">&ldquo;What are you dealing with?&rdquo; &mdash; typo-proof, with a follow-up question</td></tr>
        <tr><td>Your systems</td><td>A long list of terms only insiders know</td><td class="hi">Three side-by-side families with a View all button</td></tr>
        <tr><td>Problem pages</td><td>Little to read</td><td class="hi">12 in-depth guides: signs, causes, mistakes, the fix, FAQs</td></tr>
        <tr><td>Each space</td><td>One page for every kind of buyer</td><td class="hi">17 space pages, each with its own interactive floor plan</td></tr>
        <tr><td>Proof</td><td>Projects hard to find</td><td class="hi">65 documented projects, 16 five-star reviews, a photo rail that opens full size</td></tr>
        <tr><td>Next step</td><td>A gray-on-gray button</td><td class="hi">One gold Request a Quote, always in reach &mdash; and nothing asked twice</td></tr>
        <tr><td>Behind the scenes</td><td>An unfinished backbone</td><td class="hi">140+ pages Google can read, fast on phones, hosted and watched</td></tr>
      </tbody>
    </table>
  </section>`);

// ---- Part 4: the investment (4)
slides.push(`
  <section class="slide dark">
    <div class="kick">Before we talk price</div>
    <h2>Here&rsquo;s exactly what happens after you say yes.</h2>
    <div class="tl">
      <div><b>1</b><h4>The first payment goes through</h4><p>That&rsquo;s the starting gun &mdash; nothing else to sign or set up.</p></div>
      <div><b>2</b><h4>A quick onboarding call</h4><p>30 minutes to an hour. I walk you through everything inside the plan and how it all works.</p></div>
      <div><b>3</b><h4>A whole team on your site, 24/7</h4><p>Constantly updating pages, working on SEO, keeping it fresh &mdash; not a one-and-done.</p></div>
      <div><b>4</b><h4>Revisions in 72 hours</h4><p>Need a change? Send it over and a team has it live within 72 hours.</p></div>
    </div>
    <p class="lead" style="margin-top:1.4rem;max-width:66ch">Not ready to publish yet? The first payment still starts everything. Take your time going through the site, send us every revision you want, and we&rsquo;ll make them &mdash; it goes live when you say.</p>
    <p class="forward">&rarr; as simple as we can make it, so this gets live and working for you</p>
  </section>`);

slides.push(`
  <section class="slide">
    <div class="kick" style="color:var(--gold-d)">So, to recap</div>
    <h2>Keep losing it every month &mdash; or fix it once.</h2>
    <div class="row" style="align-items:stretch;margin-top:1rem">
      <div class="pcard" style="padding:1.6rem"><h4 style="color:var(--neg)">If nothing changes</h4>
        <div class="amt" style="color:var(--neg)">$6,000&ndash;$24,000</div>
        <div class="sub" style="color:var(--ink-soft)">modeled, walking past every month</div>
        <ul style="margin-top:1rem;gap:.6rem"><li>The same first impression, every visit</li><li>The same questions answered by phone</li><li>Urgent buyers booking someone else</li></ul></div>
      <div class="pcard hi" style="padding:1.6rem"><span class="ptag">The fix</span><h4 style="color:var(--gold-d)">Fix it once</h4>
        <div class="amt">$6,000 <span style="font-size:1rem;color:var(--ink-soft)">+ $149/mo</span></div>
        <div class="sub">and you never deal with it again</div>
        <ul style="margin-top:1rem;gap:.6rem"><li>Everything on the last slides &mdash; already built</li><li>Hosted, watched and improved by a team, 24/7</li><li>Your second site included &mdash; built whenever you&rsquo;re ready, on newer technology</li></ul></div>
    </div>
    <p class="lead" style="margin-top:1.1rem;max-width:66ch">And whatever you decide, you now have the list of what to fix &mdash; so it gets fixed, fast.</p>
  </section>`);

slides.push(`
  <section class="slide">
    <div class="kick">The investment &mdash; three ways to start</div>
    <h2>Same build. Different ways to pay for it.</h2>
    <div class="pricebar three">
      <div class="pcard hi">
        <span class="ptag">Best value &mdash; today only</span>
        <h4>Option 1 &middot; Flat price</h4>
        <div class="amt">$6,000 <span class="was">$9,000</span></div>
        <div class="sub">then only $149/mo</div>
        <ul>
          <li>The Floor Rescue site you just walked through</li>
          <li>A second site included &mdash; built whenever you&rsquo;re ready</li>
          <li>Hosting, security and updates</li>
          <li>A team on it 24/7 &middot; revisions in 72 hours</li>
          <li>Year-one total: $7,788</li>
        </ul>
      </div>
      <div class="pcard dim">
        <h4>Option 2 &middot; Payment plan</h4>
        <div class="amt">$2,000 <span style="font-size:1rem;color:var(--ink-soft)">&times; 3 months</span></div>
        <div class="sub">then $297/mo</div>
        <ul>
          <li>The same package as Option 1</li>
          <li>Spread across three payments</li>
          <li>Higher monthly care fee</li>
          <li>Year-one total: $9,564</li>
        </ul>
      </div>
      <div class="pcard dim">
        <h4>Option 3 &middot; Floor Rescue only</h4>
        <div class="amt">$4,500</div>
        <div class="sub">then $297/mo</div>
        <ul>
          <li>The Floor Rescue site only</li>
          <li>No second site &mdash; one later is a new project at standard pricing</li>
          <li>Year-one total: $8,064 &mdash; $276 more than Option 1, for half the build</li>
        </ul>
      </div>
    </div>
  </section>`);

slides.push(`
  <section class="slide dark" style="align-items:center;text-align:center">
    <p class="kick" style="align-self:center">So &mdash; where do we go from here?</p>
    <h1 style="max-width:20ch">Which option makes the most sense for you?</h1>
    <p class="lead" style="margin-top:1rem;max-width:46ch">Option 1 gets you the site now and a second one whenever you&rsquo;re ready &mdash; hosting, a team and revisions included from day one.</p>
    <div class="cta-row" style="justify-content:center">
      <a href="https://buy.stripe.com/eVq7sN9g56EB4pNgFt8ww0d" target="_blank" rel="noopener noreferrer">Start with Option 1 &mdash; $6,000 &rarr;</a>
    </div>
    <p style="margin-top:1rem;font-size:.8rem;color:#B7AE93">Prefer the payment plan or Floor Rescue only? Say the word and we&rsquo;ll send that link instead.</p>
  </section>`);

const parts = [
  { at: 0, label: "Part 1 \\u2014 where you are" },
  { at: 8, label: "Part 2 \\u2014 what it\\u2019s costing" },
  { at: 12, label: "Part 3 \\u2014 the site we built" },
  { at: slides.length - 4, label: "Part 4 \\u2014 the investment" },
];

html = html.slice(0, start) + "\n" + slides.map((s, i) => `\n  <!-- ${i + 1} -->` + (s.startsWith("\n") ? s : "\n  " + s)).join("\n") + "\n\n" + html.slice(end);
html = html.replace(/<span id="slidenum">[^<]*<\/span>/, `<span id="slidenum">1 / ${slides.length}</span>`);
html = html.replace(/var parts = \[[\s\S]*?\];/, "var parts = [\n" + parts.map((p) => `    {at:${p.at}, label:'${p.label}'}`).join(",\n") + "\n  ];");

const css = `
  .cards3{display:grid;grid-template-columns:repeat(3,1fr);gap:1rem;margin-top:1.1rem}
  .cards3>div{border:1px solid var(--line);border-radius:14px;padding:1.15rem 1.2rem;background:#fff}
  .cards3 h4{font-family:"Space Grotesk",sans-serif;font-size:1.05rem;margin-bottom:.35rem}
  .cards3 p{font-size:.85rem;color:var(--ink-soft)}
  .stats4{display:grid;grid-template-columns:repeat(4,1fr);gap:1.4rem;margin-top:1.4rem}
  .stat{border-top:3px solid var(--gold);padding-top:1rem}
  .stat .n{font-family:"Space Grotesk",sans-serif;font-weight:700;font-size:clamp(2.4rem,8vh,4.6rem);line-height:1;letter-spacing:-.03em;color:var(--gold)}
  .stats4.light .stat .n{color:var(--neg)} .stats4.light .stat{border-top-color:var(--neg)}
  .stat p{margin-top:.6rem;font-size:clamp(.85rem,1.9vh,1.05rem)}
  .srcnote{margin-top:1rem;font-size:.72rem;color:var(--mute);max-width:90ch}
  .scale{display:flex;flex-wrap:wrap;gap:.7rem;margin-top:1.4rem}
  .scale span{width:clamp(2.6rem,7vh,4rem);height:clamp(2.6rem,7vh,4rem);border-radius:50%;border:3px solid #F3EEDF;display:flex;align-items:center;justify-content:center;font-family:"Space Grotesk",sans-serif;font-size:clamp(1.1rem,3vh,1.7rem)}
  .scale span.hi{border-color:var(--gold)} .scale span.ten{background:var(--gold);color:var(--ink)}
  .cmp td{color:var(--ink)} .cmp tr td:first-child{color:var(--ink-soft)}
  .cmp.sci td,.cmp.sci th{vertical-align:top}
  .cmp.tight td,.cmp.tight th{padding:.42rem .8rem;font-size:clamp(.74rem,1.65vh,.92rem)}
  /* green circles: we are improving our own work, not marking it wrong */
  .hot{border-color:#2FA36B;box-shadow:0 0 0 2px rgba(255,255,255,.9),0 0 18px rgba(47,163,107,.55)}
  .hot b{background:#2FA36B}
  ol.leg li::before{background:#2FA36B}
  @media (max-width:900px){.cards3,.stats4{grid-template-columns:1fr 1fr}}
</style>`;
html = html.replace("</style>", css);
fs.writeFileSync(outFile, html, "utf8");
console.log("slides:", slides.length, "parts:", JSON.stringify(parts.map((p) => p.at)));

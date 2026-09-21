// Rebuilds pitch-deck-template.html as the v4 flow (modelled on the Lo Down audit deck):
// warm cover -> "this is an example" -> proof -> credibility -> annotated old site (not their fault)
// -> market -> modelled money -> cost of waiting -> 1-10 commitment -> reveal -> new site + science
// -> fixed -> six months -> investment. Reuses the existing annotated / pricing slides verbatim.
import fs from "node:fs";
import path from "node:path";

const file = path.join(process.cwd(), "scripts", "pitch-deck-template.html");
let html = fs.readFileSync(file, "utf8");

const start = html.indexOf('<div class="deck" id="deck">') + '<div class="deck" id="deck">'.length;
const end = html.indexOf("</div>\n\n<div class=\"foot\">");
const body = html.slice(start, end);
const old = body.match(/<section class="slide[\s\S]*?<\/section>/g);
if (old.length !== 32) throw new Error("expected 32 slides, found " + old.length);

const S = {
  annDesk: old[8], annScroll: old[9], annMob: old[10], reveal: old[13], hero: old[15], paths: old[16],
  landing: old[18], asked: old[19], backbone: old[20], history: old[21], faq: old[22], seo: old[23],
  pricing: old[27], math: old[28], which: old[29], next: old[30], close: old[31],
};

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

const stat = (n, l, dark) => `<div class="stat"><div class="n">${n}</div><p>${l}</p></div>`;
const src = (t, dark) => `<p class="srcnote">${t}</p>`;

const slides = [];

// ---- Part 1: where you are
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
      <div><h3>Everything is editable</h3><p>Every word, photo, page, and the order things appear in. Nothing is locked, and you never need us to change a comma &mdash; though we will.</p></div>
      <div><h3>Don&rsquo;t like it? We redo it</h3><p>If the direction isn&rsquo;t right, we start over. This is a starting point for the conversation, not a take-it-or-leave-it.</p></div>
      <div><h3>The words matter most</h3><p>Your services and the way they&rsquo;re described are what a trade buyer judges you on. We refine every line with you before anything goes live.</p></div>
      <div><h3>Built from your own material</h3><p>Real project names, your systems, your credentials &mdash; nothing invented about your work, and nothing published you haven&rsquo;t approved.</p></div>
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

// ---- Part 2: what it's costing
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
    <div class="scale">${[1,2,3,4,5,6,7,8,9,10].map((n) => `<span class="${n >= 8 ? "hi" : ""}${n === 10 ? " ten" : ""}">${n}</span>`).join("")}</div>
    <div class="grid2" style="max-width:74ch;margin-top:1.6rem">
      <div><h3>If it isn&rsquo;t a 10</h3><p>What makes it a [your number] &mdash; and not a 10?</p></div>
      <div><h3>The budget question</h3><p>What would you invest to close this gap?</p></div>
    </div>
  </section>`);

// ---- Part 3: the site
slides.push(S.reveal
  .replace("Now that you", "Now that you") // no-op, keep wording
  .replace(/<p class="kick"[^>]*>Before we explain a single decision<\/p>/, '<p class="kick" style="align-self:center">What we built for you</p>'));

slides.push(S.hero.replace(/<p class="quote"[\s\S]*?<\/cite>/, "").replace("What he actually asked for", "The first screen"));
slides.push(S.paths);

slides.push(shotSlide("Every system, side by side", "Three families, always open. Read down the one that sounds like you.",
  "Not everyone arrives knowing the difference between polished concrete and a resinous coating. So nothing is hidden behind tabs: Concrete, Resinous Coatings and Decorative Artistry sit next to each other, each with a photo and its full list underneath.",
  "floorrescue.com &middot; Floor Systems", "{{IMG_SYSTEMS}}", "Three side-by-side columns: Concrete, Resinous Coatings, Decorative Artistry",
  "Fixes: a wall of technical terms that only a trade insider can read"));

slides.push(shotSlide("&ldquo;What are you dealing with?&rdquo;", "Say it your way. Spelling doesn&rsquo;t matter.",
  "A visitor types &ldquo;my floor is breaking&rdquo; &mdash; misspelled, non-technical, whatever &mdash; and the site asks one follow-up question, then sends them to the exact page that explains it. The urgent buyer gets a fast, credible answer at 11pm without calling anyone.",
  "floorrescue.com &middot; What are you dealing with?", "{{IMG_FINDER}}", "Plain-language problem finder asking a follow-up question",
  "Fixes: urgent problems that can&rsquo;t get a fast answer"));

slides.push(S.landing);
slides.push(S.asked.replace(/<p class="quote"[\s\S]*?<\/cite>/, ""));

slides.push(shotSlide("Built to move &mdash; and to teach", "A floor is layers. Watch it build from the slab up.",
  "Small moving pieces do real work: a floor that builds itself layer by layer, process steps that light up in turn, a reading-progress bar, a Skip button on every cinematic scene, and smooth scrolling everywhere. Motion here explains the trade &mdash; it never gets in the way.",
  "floorrescue.com &middot; Anatomy of a Floor", "{{IMG_LAYERS}}", "Animated floor layer stack from the slab up to the topcoat",
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

slides.push(S.backbone.replace("Garages stay off the main site until you say otherwise.", "Garages stay out of the main navigation until you say otherwise."));
slides.push(S.history
  .replace("25+", "65").replace("Real Named Projects", "Documented Projects")
  .replace(">20<", ">22<").replace("Floor Systems, Fully Described", "Floor Systems, Fully Described")
  .replace("We went back through your own prior site content", "We went back through your own prior site content"));
slides.push(S.faq);

slides.push(`
  <section class="slide">
    <div class="kick">Problems you didn&rsquo;t mention &mdash; fixed anyway</div>
    <h2>The things a visitor never says out loud.</h2>
    <div class="grid2" style="max-width:82ch">
      <div><h3>Phone-first</h3><p>Every page is built to be read and tapped on a phone, and checked at phone width before it ships.</p></div>
      <div><h3>Fast</h3><p>The cinematic clips were cut about 75% smaller with no visible loss &mdash; and a Skip button lets anyone move past them.</p></div>
      <div><h3>140+ real pages Google can read</h3><p>Every system, problem, project, article and space is its own indexable page with its own title and description.</p></div>
      <div><h3>Rich space pages</h3><p>Each space &mdash; a restaurant, a warehouse, a home &mdash; gets a full page: what its floor has to survive, matching systems and projects, straight answers, and four reviews with a link to the rest.</p></div>
      <div><h3>One obvious next step</h3><p>A single Request a Quote button, always in reach &mdash; no hunting through menus.</p></div>
      <div><h3>Find anything from anywhere</h3><p>Search from every page, plus the plain-language finder that forgives typos.</p></div>
    </div>
  </section>`);

slides.push(`
  <section class="slide">
    <div class="kick" style="color:var(--neg)">What we fixed</div>
    <h2>Every gap, closed.</h2>
    <table class="cmp sci" style="max-width:64rem">
      <thead><tr><th>Before</th><th class="hi">Now</th></tr></thead>
      <tbody>
        <tr><td>A retail-store carousel as the first image</td><td class="hi">A real floor being restored, under the gold Floor Rescue sign</td></tr>
        <tr><td>Two menus and five dropdowns before any project</td><td class="hi">Three doors &mdash; My Home, My Business, My Facility</td></tr>
        <tr><td>A banner covering the first screen</td><td class="hi">Nothing between the visitor and the work</td></tr>
        <tr><td>A gray-on-gray main button</td><td class="hi">One gold Request a Quote, always in reach</td></tr>
        <tr><td>Projects hard to find</td><td class="hi">65 documented projects, each with its own page</td></tr>
        <tr><td>Technical terms only insiders know</td><td class="hi">Side-by-side systems and a plain-language finder</td></tr>
        <tr><td>The same questions answered on every call</td><td class="hi">A full technical FAQ, built in</td></tr>
      </tbody>
    </table>
  </section>`);

slides.push(`
  <section class="slide">
    <div class="kick" style="color:var(--gold-d)">The comparison</div>
    <h2>Six months from now.</h2>
    <div class="row" style="align-items:stretch;margin-top:1rem">
      <div class="pcard" style="padding:1.6rem"><h4 style="color:var(--neg)">Today</h4>
        <ul style="margin-top:1rem;gap:.7rem"><li>Buyers can&rsquo;t tell what you do in five seconds</li><li>A homeowner and a plant manager land on the same page</li><li>Projects and answers scattered or missing</li><li>Nobody reviewing what works</li><li>The same questions, answered by phone</li></ul></div>
      <div class="pcard hi" style="padding:1.6rem"><h4 style="color:var(--gold-d)">In six months</h4>
        <ul style="margin-top:1rem;gap:.7rem"><li>A clear first step on every screen</li><li>Every buyer on a path built for them</li><li>65 projects and a full FAQ live and indexed</li><li>Daily SEO work, reviewed and improved monthly</li><li>Common questions answered before the call</li></ul></div>
    </div>
    <p class="srcnote">Outcomes we control &mdash; not promises about rankings or revenue.</p>
  </section>`);

slides.push(S.seo.replace("the &ldquo;I don&rsquo;t know how this reads on Google&rdquo; problem", "the uncertainty about how the site reads on Google"));

// ---- Part 4: the investment
slides.push(S.pricing, S.math, S.which, S.next, S.close);

const parts = [
  { at: 0, label: "Part 1 — where you are" },
  { at: 8, label: "Part 2 — what it&rsquo;s costing" },
  { at: 12, label: "Part 3 — the site we built" },
  { at: slides.length - 5, label: "Part 4 — the investment" },
];

const newBody = "\n" + slides.map((s, i) => `\n  <!-- ${i + 1} -->` + (s.startsWith("\n") ? s : "\n  " + s)).join("\n") + "\n\n";
html = html.slice(0, start) + newBody + html.slice(end);

html = html.replace(/<span id="slidenum">[^<]*<\/span>/, `<span id="slidenum">1 / ${slides.length}</span>`);
html = html.replace(/var parts = \[[\s\S]*?\];/, "var parts = [\n" + parts.map((p) => `    {at:${p.at}, label:'${p.label.replace(/&rsquo;/g, "\\u2019").replaceAll("\u2014", "\\u2014")}'}`).join(",\n") + "\n  ];");

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
  @media (max-width:900px){.cards3,.stats4{grid-template-columns:1fr 1fr}}
</style>`;
html = html.replace("</style>", css);
fs.writeFileSync(file, html, "utf8");
console.log("slides:", slides.length, "parts:", JSON.stringify(parts));

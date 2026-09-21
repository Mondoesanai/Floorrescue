// v6 deck. Run against the ORIGINAL 32-slide template (scripts/pitch-deck-template.original.html).
// Flow: cover -> example -> proof -> credibility -> old site (RED circles) -> worries -> market ->
// modeled value -> cost of waiting -> summary of what's wrong -> 1-10 -> reveal ->
// the site we built (GREEN circles) -> science -> what we fixed -> two looks -> after yes -> recap -> price -> close.
import fs from "node:fs";
import path from "node:path";

const orig = path.join(process.cwd(), "scripts", "pitch-deck-template.original.html");
const outFile = path.join(process.cwd(), "scripts", "pitch-deck-template.html");
let html = fs.readFileSync(orig, "utf8");

const start = html.indexOf('<div class="deck" id="deck">') + '<div class="deck" id="deck">'.length;
const end = html.indexOf('</div>\n\n<div class="foot">');
const old = html.slice(start, end).match(/<section class="slide[\s\S]*?<\/section>/g);
if (old.length !== 32) throw new Error("expected 32 slides, found " + old.length);

// old-site slides keep their RED circles; add the "we fixed this" line
const withFix = (s) => s.replace("</ol>", '</ol><p class="fixtag">Every circled item is fixed on the new site</p>');
const retext = (slide, { kick, h2, lead, legend }) =>
  slide
    .replace(/<div class="kick">[\s\S]*?<\/div>/, `<div class="kick">${kick}</div>`)
    .replace(/<h2>[\s\S]*?<\/h2>/, `<h2>${h2}</h2>`)
    .replace(/<p class="lead">[\s\S]*?<\/p>/, `<p class="lead">${lead}</p>`)
    .replace(/<ol class="leg">[\s\S]*?<\/ol>/, `<ol class="leg">${legend.map((l) => `<li>${l}</li>`).join("")}</ol>`);
const withFix2 = (x) => x.replace("</ol>", '</ol><p class="fixtag">Each of these is what the new site is built to solve</p>');

const RED = {
  desk: withFix2(retext(old[8], {
    kick: "What you told us &middot; the first screen",
    h2: "Your concerns, on the screen customers see first.",
    lead: "You mentioned a few things you never wanted your website doing. Here&rsquo;s where the current site works against them &mdash; and this isn&rsquo;t your fault. It&rsquo;s what almost every self-built site ends up with.",
    legend: [
      "<strong>You didn&rsquo;t want a big buyer misjudging what you do.</strong> The first image is a retail store &mdash; someone looking for a floor has to guess it&rsquo;s you.",
      "<strong>You didn&rsquo;t want things hard to find.</strong> Two menus and five dropdowns mix flooring with garages, commercial and residential &mdash; a buyer can feel it&rsquo;s not for them, or that you&rsquo;re less than the master of all trades you really are.",
      "<strong>You didn&rsquo;t want it to feel like a template.</strong> A cookie banner sits on the first screen every visit.",
      "<strong>You didn&rsquo;t want 22 years flattened.</strong> The scrolling line talks about your project, not the problem the visitor came to solve.",
    ],
  })),
  scroll: withFix2(retext(old[9], {
    kick: "What you told us &middot; further down",
    h2: "The knowledge is there. Getting to it takes effort.",
    lead: "You told us you didn&rsquo;t want people digging for what they need. Twenty years of proof is in here &mdash; this is what a visitor runs into on the way.",
    legend: [
      "<strong>The next step keeps disappearing.</strong> Buttons slide under the sticky menu as you scroll.",
      "<strong>The one action you want gets overlooked.</strong> The main button is gray on gray &mdash; and every missed click is a job you never hear about.",
      "<strong>A homeowner and a plant manager see the same three links.</strong> Nothing tells either where they fit &mdash; the wrong-buyer, wrong-page worry.",
      "<strong>Back on top of the content.</strong> The cookie banner returns and covers it again.",
    ],
  })),
  mobile: withFix2(retext(old[10], {
    kick: "What you told us &middot; on a phone",
    h2: "For an urgent problem, the phone is the first look.",
    lead: "You mentioned that someone with a failing floor wants a fast, credible answer. Standing in the building with a phone in hand, this is what they see first.",
    legend: [
      "<strong>The answer gets pushed down.</strong> The cookie banner takes about a third of the first screen.",
      "<strong>Your name is hard to read.</strong> The logo sits low-contrast on a busy photo.",
      "<strong>&ldquo;Is this the flooring company?&rdquo;</strong> The hero shows an oil pump jack and not one word about floors &mdash; the wrong-impression worry again.",
      "<strong>An urgent customer can&rsquo;t reach you in one tap.</strong> The phone number is plain text, not a call button.",
    ],
  })),
};
const REVEAL = old[13].replace(/<p class="kick"[^>]*>Before we explain a single decision<\/p>/, '<p class="kick" style="align-self:center">What we built for you</p>');

const stat = (n, l) => `<div class="stat"><div class="n">${n}</div><p>${l}</p></div>`;

/** A new-site screenshot with GREEN numbered circles and a matching legend. hots: [left, top, width, height, round?] in %. */
const greenSlide = ({ kick, h2, lead, legend, img, alt, ar, hots, fix }) => `
  <section class="slide">
    <div class="row ann">
      <div>
        <div class="kick">${kick}</div>
        <h2>${h2}</h2>
        <p class="lead">${lead}</p>
        <ol class="leg green">${legend.map((l) => `<li>${l}</li>`).join("")}</ol>
        ${fix ? `<p class="fixtag">${fix}</p>` : ""}
      </div>
      <div class="annot green" style="--ar:${ar}">
        <img src="${img}" alt="${alt}">
        ${hots.map(([l, t, w, h, n], i) => `<div class="hot r" style="left:${l}%;top:${t}%;width:${w}%;height:${h}%">${n ? `<b>${n}</b>` : ""}</div>`).join("")}
      </div>
    </div>
  </section>`;

const slides = [];
const marks = {};

// ---------------- Part 1: where you are ----------------
slides.push(`
  <section class="slide dark">
    <div class="kick">Inspiring Websites &nbsp;&middot;&nbsp; prepared for Jeremy, Floor Rescue</div>
    <h1>Twenty-two years of work that speaks for itself.<br>Your website should say it just as loudly.</h1>
    <p class="lead" style="margin-top:1rem">What the current site is costing, what a stronger one is plausibly worth &mdash; and the site we built while we were talking.</p>
  </section>`);

slides.push(`
  <section class="slide dark">
    <div class="kick">A quick note before we start</div>
    <h2 style="max-width:24ch">We&rsquo;re not picking apart your site.</h2>
    <p class="lead" style="max-width:52ch">We just want to show you some missed opportunity &mdash; if that&rsquo;s okay.</p>
    <p class="lead" style="margin-top:1.1rem;max-width:52ch">And even if you decide not to work with us, you&rsquo;ll walk away with everything you need to get these things fixed and knocked out.</p>
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

// the current site, through a customer's eyes: RED circles
slides.push(RED.desk, RED.scroll, RED.mobile);

slides.push(`
  <section class="slide dark">
    <div class="kick">What you told us</div>
    <h2>Six worries. Each one has a price tag.</h2>
    <div class="grid2" style="max-width:82ch;margin-top:.8rem">
      <div><h3>Someone who doesn&rsquo;t know the trade</h3><p>It isn&rsquo;t complicated &mdash; it&rsquo;s layered. Non-experts jumble it, use the wrong terms, and lose the buyers who know the difference.</p></div>
      <div><h3>The wrong buyer, the wrong impression</h3><p>A large industrial buyer who sees the wrong work never sends the bid &mdash; and you never find out.</p></div>
      <div><h3>A template that doesn&rsquo;t look like 22 years</h3><p>A generic site gets compared on price. A specialist gets compared on knowledge.</p></div>
      <div><h3>Things hard to find, pages that lead nowhere</h3><p>Visitors who can&rsquo;t find their answer don&rsquo;t call. They book whoever made it easy.</p></div>
      <div><h3>Answering the same questions, again</h3><p>Every repeat call and text is time taken from the work &mdash; and from the jobs you actually want.</p></div>
      <div><h3>A partner who stalls or disappears</h3><p>You want someone long-term, and a site that keeps evolving &mdash; not another handoff that goes quiet.</p></div>
    </div>
  </section>`);

// ---------------- Part 2: what it's costing ----------------
marks.part2 = slides.length;
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
    <div class="kick" style="color:var(--neg)">What fixing it is worth</div>
    <h2>What a site that converts is modeled to earn, per year.</h2>
    <table class="cmp" style="max-width:52rem">
      <thead><tr><th>Monthly visitors</th><th>Reach out (2%)</th><th>Become jobs (10%)</th><th class="hi">Modeled revenue / year</th></tr></thead>
      <tbody>
        <tr><td>500</td><td>10 / month</td><td>1 / month</td><td class="hi">$72,000</td></tr>
        <tr><td>1,000</td><td>20 / month</td><td>2 / month</td><td class="hi">$144,000</td></tr>
        <tr><td>2,000</td><td>40 / month</td><td>4 / month</td><td class="hi">$288,000</td></tr>
        <tr><td>4,000</td><td>80 / month</td><td>8 / month</td><td class="hi">$576,000</td></tr>
      </tbody>
    </table>
    <p class="lead" style="margin-top:1.1rem;max-width:62ch">That&rsquo;s what sites that get these gaps fixed can convert &mdash; at an average job of just $6,000. A single facility floor can run to $300,000; one bid that lands differently changes the year.</p>
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
  <section class="slide">
    <div class="kick" style="color:var(--neg)">So, in summary</div>
    <h2>Where the current site works against what you told us.</h2>
    <table class="cmp sci" style="max-width:none">
      <thead><tr><th style="width:30%">What you told us</th><th>Where it shows up today</th></tr></thead>
      <tbody>
        <tr><td>Not the wrong impression</td><td>A retail-store carousel where a floor should be, and a banner across the top &mdash; and on a phone, an oil pump jack.</td></tr>
        <tr><td>Not hard to find things</td><td>Two menus, five dropdowns mixing garages, commercial and residential &mdash; and three plain links with no path for each buyer.</td></tr>
        <tr><td>Not a template look</td><td>A gray-on-gray main button, a low-contrast logo, and a banner that keeps returning.</td></tr>
        <tr><td>Fast, credible answers</td><td>No way to describe a problem in plain words, and a phone number that isn&rsquo;t one tap.</td></tr>
        <tr><td>Not the same questions again</td><td>The same questions keep coming in by phone and text, because the page doesn&rsquo;t answer them up front.</td></tr>
      </tbody>
    </table>
    <p class="lead" style="margin-top:1.2rem;max-width:64ch">Each one is a small leak. Together they&rsquo;re the modeled $6,000&ndash;$24,000 a month on the last slide.</p>
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

// ---------------- Part 3: the site we built (GREEN circles) ----------------
marks.part3 = slides.length;
slides.push(`
  <section class="slide dark">
    <div class="kick">Before you go through this</div>
    <h2 style="max-width:26ch">Okay &mdash; we actually built this. And everything on it is interchangeable.</h2>
    <p class="lead" style="max-width:60ch">We used the pictures and material we already had. It&rsquo;s here to show what&rsquo;s possible &mdash; nothing more.</p>
    <div class="grid2" style="max-width:74ch;margin-top:1.4rem">
      <div><h3>Every picture, word and page can be swapped</h3><p>Nothing is locked in.</p></div>
      <div><h3>Don&rsquo;t like it? We redo it</h3><p>If the direction isn&rsquo;t right, we start over. This is a starting point, not a take-it-or-leave-it.</p></div>
      <div><h3>The words matter most</h3><p>Your services and how they&rsquo;re described are what a trade buyer judges you on. We refine every line with you before anything goes live.</p></div>
      <div><h3>Built from your own material</h3><p>Real project names, your systems, your credentials &mdash; nothing invented, nothing published you haven&rsquo;t approved.</p></div>
    </div>
  </section>`);

slides.push(REVEAL);

slides.push(greenSlide({
  kick: "Breaking it down &mdash; the first screen",
  h2: "One question. Three doors. Nothing in the way.",
  lead: "You didn&rsquo;t want a big buyer misjudging what you do &mdash; so the first screen is your work. A real concrete-restoration film, the gold Floor Rescue sign, then three doors. Pick one and the camera moves &mdash; a commercial building rises out of the floor, then sector, project, and a page built for that exact space.",
  legend: [
    "<strong>The gold sign, on a real floor.</strong> The first thing anyone sees says who you are and what you do.",
    "<strong>One question:</strong> &ldquo;Select your space.&rdquo; No menus, no banner.",
    "<strong>Three doors</strong> &mdash; My Business, My Home, My Facility. The industrial buyer never sits through a garage.",
    "<strong>One gold Request a Quote,</strong> always in reach &mdash; and a Skip button for anyone in a hurry.",
  ],
  img: "{{IMG_HERO}}", alt: "Floor Rescue homepage with four parts circled in green", ar: 1.6,
  hots: [[22, 11, 56, 17, 1], [27, 42, 46, 12, 2], [19, 58, 62.5, 28, 3], [38.5, 86.5, 23, 6.5, 4]],
}));

// the guided experience: the quiz that isn't a quiz
const jHot = (h, i) => `<div class="hot r" style="left:${h[0]}%;top:${h[1]}%;width:${h[2]}%;height:${h[3]}%"><b>${i + 1}</b></div>`;
const jStep = (n, img, alt, hots, title, body) => `
      <figure>
        <div class="annot green" style="--ar:1.6"><img src="${img}" alt="${alt}">${hots.map(jHot).join("")}</div>
        <figcaption><b>Step ${n} &mdash; ${title}</b><br>${body}</figcaption>
      </figure>`;
slides.push(`
  <section class="slide">
    <div class="kick">Breaking it down &mdash; the guided experience</div>
    <h2>A quiz that doesn&rsquo;t feel like one. Two questions, and everyone finds what they need.</h2>
    <p class="lead" style="max-width:74ch">You told us you didn&rsquo;t want anything hard to find. So this is what the whole site is built around: your knowledge is organized so a visitor never has to hunt for it. Each answer moves the camera deeper into the building &mdash; and then they land on a page written for their exact situation.</p>
    <div class="jstrip">
      ${jStep(1, "{{IMG_J1}}", "Step 1: What's your space?", [[11, 32.5, 39.5, 44.5], [40, 92.3, 21, 4.6]], "what&rsquo;s your space?", "Retail, restaurant, office, hotel, healthcare&hellip; one tap.")}
      ${jStep(2, "{{IMG_J2}}", "Step 2: What do you need done to your floor?", [[11, 37.5, 39.5, 35.5], [40, 92.3, 21, 4.6]], "what do you need done?", "New build, renovation, or a failed floor.")}
      ${jStep(3, "{{IMG_J3}}", "Step 3: A page built from the answers", [[2.5, 22.5, 42, 27], [2.5, 67.5, 27, 6.5]], "your page", "A headline written from their two answers.")}
    </div>
    <p class="forward" style="color:var(--gold-d);margin-top:1rem">&rarr; the faint line at the bottom of every step shows how close they are: Space &middot; Project &middot; Your Plan</p>
  </section>`);

slides.push(greenSlide({
  kick: "Breaking it down &mdash; where every path lands",
  h2: "A page written for their exact situation.",
  lead: "This is the restaurant &rarr; failed-floor page. A different pair of answers builds a different page &mdash; different headline, different priorities, different projects and systems.",
  legend: [
    "<strong>A headline built from their answers</strong> &mdash; in your approved language, never an invented claim.",
    "<strong>Plain support copy</strong> that says what Floor Rescue actually does about this exact problem.",
    "<strong>The next step, immediately:</strong> Request a Quote (already knows the space) or See Floor Systems.",
    "<strong>What matters in a space like theirs</strong> &mdash; washdown, shutdown windows, sanitation &mdash; scrolling past here, tappable just below to personalize the page further.",
  ],
  img: "{{IMG_J3}}", alt: "Personalized landing page with four parts circled in green", ar: 1.6,
  hots: [[2.5, 22.5, 42, 27, 1], [2.5, 51.5, 42.5, 13, 2], [2.5, 67.5, 27, 6.5, 3], [0, 85.6, 100, 5.4, 4]],
  fix: "Below it: a floor plan of their space, matching projects, straight answers, four reviews &mdash; and a quote form that already knows everything they told us.",
}));

slides.push(greenSlide({
  kick: "Breaking it down &mdash; find help fast",
  h2: "Say it your way. Spelling doesn&rsquo;t matter.",
  lead: "You mentioned that someone with a failing floor wants a fast, credible answer. Someone types &ldquo;my floor is breaking&rdquo; &mdash; misspelled, non-technical, whatever &mdash; and the site helps them find the answer. The same box lives in the header of every page.",
  legend: [
    "<strong>&ldquo;What are you dealing with?&rdquo;</strong> &mdash; the question a worried owner is already asking.",
    "<strong>A plain-language search box</strong> that forgives typos and everyday wording.",
    "<strong>One follow-up question,</strong> then straight to a real guide &mdash; twelve in-depth pages that also help you get found on Google.",
  ],
  img: "{{IMG_FINDER}}", alt: "Problem finder with three parts circled in green", ar: 1.6,
  hots: [[24.5, 30.8, 40, 7, 1], [24.7, 45.8, 50.6, 8.2, 2], [24.7, 55.5, 50.6, 30.2, 3]],
}));

slides.push(`
  <section class="slide">
    <div class="kick" style="color:var(--gold-d)">The summary of what we fixed</div>
    <h2>What we&rsquo;re actually fixing.</h2>
    <table class="cmp sci tight" style="max-width:none">
      <thead><tr><th style="width:17%"></th><th style="width:33%">Before</th><th class="hi">Now</th></tr></thead>
      <tbody>
        <tr><td>First screen</td><td>A retail-store carousel and a banner over the top</td><td class="hi">A real floor being restored under the gold sign &mdash; nothing in the way</td></tr>
        <tr><td>Finding what they need</td><td>Two menus, five dropdowns, one page for everyone</td><td class="hi">A two-question guided experience that lands each visitor on a page built for them &mdash; plus plain-language search</td></tr>
        <tr><td>Finding help</td><td>No way to describe a problem</td><td class="hi">&ldquo;What are you dealing with?&rdquo; &mdash; typo-proof, with a follow-up question</td></tr>
        <tr><td>Your systems</td><td>A long list of terms only insiders know</td><td class="hi">Three side-by-side families with a View all button</td></tr>
        <tr><td>Problem pages</td><td>Little to read</td><td class="hi">12 in-depth guides: signs, causes, mistakes, the fix, FAQs</td></tr>
        <tr><td>Each space</td><td>One page for every kind of buyer</td><td class="hi">17 space pages, each with its own interactive, photo-led floor plan</td></tr>
        <tr><td>Proof</td><td>Projects hard to find</td><td class="hi">65 documented projects, 16 five-star reviews, a photo rail that opens full size</td></tr>
        <tr><td>Next step</td><td>A gray-on-gray button</td><td class="hi">One gold Request a Quote, always in reach &mdash; and nothing asked twice</td></tr>
        <tr><td>Behind the scenes</td><td>An unfinished backbone</td><td class="hi">140+ pages Google can read, fast on phones, hosted and watched</td></tr>
      </tbody>
    </table>
  </section>`);

// ---------------- Part 4: the investment ----------------
marks.part4 = slides.length;
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
    <div class="kick">The investment</div>
    <h2>One price. Everything on the last slides, built and running.</h2>
    <div class="pricebar" style="grid-template-columns:1fr;max-width:34rem">
      <div class="pcard hi">
        <span class="ptag">Today</span>
        <h4>The Floor Rescue site</h4>
        <div class="amt">$6,000 <span class="was">$9,000</span></div>
        <div class="sub">then $149/mo</div>
        <ul>
          <li>The site you just walked through</li>
          <li>A second site included &mdash; built whenever you&rsquo;re ready</li>
          <li>Hosting, security and updates</li>
          <li>A team on it 24/7 &middot; revisions in 72 hours</li>
        </ul>
      </div>
    </div>
  </section>`);

slides.push(`
  <section class="slide dark" style="align-items:center;text-align:center">
    <p class="kick" style="align-self:center">So &mdash; where do we go from here?</p>
    <h1 style="max-width:20ch">Ready to get it live?</h1>
    <p class="lead" style="margin-top:1rem;max-width:46ch">The site now, a second one whenever you&rsquo;re ready &mdash; hosting, a team and revisions included from day one.</p>
    <div class="cta-row" style="justify-content:center">
      <a href="https://buy.stripe.com/8x200l77Xfb73lJgFt8ww0j" target="_blank" rel="noopener noreferrer">Get started &mdash; $6,000 &rarr;</a>
    </div>
  </section>`);


// ---------------- Backup: only if payment comes up ----------------
marks.backup = slides.length;
slides.push(`
  <section class="slide dark"></section>`);

slides.push(`
  <section class="slide">
    <div class="kick">Ways to start</div>
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
    <div class="cta-row" style="margin-top:1.4rem"><a href="https://buy.stripe.com/8x200l77Xfb73lJgFt8ww0j" target="_blank" rel="noopener noreferrer">Start with Option 1 &mdash; $6,000 &rarr;</a></div>
  </section>`);

const parts = [
  { at: 0, label: "Part 1 \\u2014 where you are" },
  { at: marks.part2, label: "Part 2 \\u2014 what it\\u2019s costing" },
  { at: marks.part3, label: "Part 3 \\u2014 the site we built" },
  { at: marks.part4, label: "Part 4 \\u2014 the investment" },
  { at: marks.backup, label: "Ways to start" },
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
  .jstrip{display:grid;grid-template-columns:repeat(3,1fr);gap:1.1rem;margin-top:1rem}
  .jstrip figure{margin:0}
  .jstrip .annot{max-width:100%}
  .jstrip figcaption{margin-top:.55rem;font-size:.82rem;color:var(--ink-soft)}
  .three-shots{display:grid;grid-template-columns:repeat(3,1fr);gap:1.1rem;margin-top:1rem}
  .three-shots figure{margin:0}
  .three-shots .shot img{max-height:30vh}
  .three-shots figcaption{margin-top:.6rem;font-size:.8rem;color:var(--ink-soft)}
  /* GREEN circles = what we built and how it works; red circles (default) = what's wrong on the current site */
  .annot.green .hot{border-color:#2FA36B;box-shadow:0 0 0 2px rgba(255,255,255,.92),0 0 18px rgba(47,163,107,.6)}
  .annot.green .hot b{background:#2FA36B}
  ol.leg.green li::before{background:#2FA36B}
  @media (max-width:900px){.cards3,.stats4,.three-shots,.jstrip{grid-template-columns:1fr 1fr}}
</style>`;
html = html.replace("</style>", css);
fs.writeFileSync(outFile, html, "utf8");
console.log("slides:", slides.length, "parts:", JSON.stringify(parts.map((p) => p.at)));

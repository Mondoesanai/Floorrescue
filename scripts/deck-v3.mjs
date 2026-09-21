import fs from "node:fs";

const p = "scripts/pitch-deck-template.html";
let html = fs.readFileSync(p, "utf8");

// ---------- CSS ----------
const css = `
  .annot{position:relative;width:100%;max-width:min(100%,calc(60vh*var(--ar,1.6)));border-radius:10px;overflow:hidden;box-shadow:0 26px 60px -24px rgba(0,0,0,.55);border:1px solid rgba(0,0,0,.1);background:#111}
  .annot img{display:block;width:100%;height:auto}
  .annot.mob{--ar:.46;max-width:min(100%,calc(62vh*.462));margin:0 auto}
  .hot{position:absolute;border:3px solid #E5484D;border-radius:50%;box-shadow:0 0 0 2px rgba(255,255,255,.9),0 0 18px rgba(229,72,77,.55)}
  .hot.r{border-radius:14px}
  .hot b{position:absolute;top:-13px;left:-13px;width:26px;height:26px;border-radius:50%;background:#E5484D;color:#fff;font-size:.8rem;font-weight:800;display:flex;align-items:center;justify-content:center;box-shadow:0 0 0 2px #fff}
  ol.leg{list-style:none;display:grid;gap:.7rem;margin-top:1.1rem;max-width:52ch;counter-reset:l}
  ol.leg li{position:relative;padding-left:2.2rem;font-size:clamp(.88rem,1.9vh,1.05rem);color:var(--ink-soft);counter-increment:l}
  .slide.dark ol.leg li{color:#C9C3B2}
  ol.leg li::before{content:counter(l);position:absolute;left:0;top:0;width:1.5rem;height:1.5rem;border-radius:50%;background:#E5484D;color:#fff;font-weight:800;font-size:.8rem;display:flex;align-items:center;justify-content:center}
  ol.leg li strong{color:var(--ink)} .slide.dark ol.leg li strong{color:#fff}
  .pricebar.three{grid-template-columns:1.15fr 1fr 1fr;max-width:74rem;gap:1.2rem;align-items:stretch}
  .pcard .sub{font-size:.82rem;font-weight:700;color:var(--gold-d);margin-top:.15rem}
  .pcard.dim{opacity:.92}
  .cmp{width:100%;max-width:60rem;border-collapse:separate;border-spacing:0;margin-top:1.1rem;font-size:clamp(.8rem,1.8vh,1rem)}
  .cmp th,.cmp td{padding:.65rem .9rem;text-align:left;border-bottom:1px solid var(--line)}
  .cmp thead th{font-family:"Space Grotesk",sans-serif;font-size:.85rem;color:var(--ink-soft)}
  .cmp td.hi,.cmp th.hi{background:rgba(201,162,75,.14);font-weight:800;color:var(--ink)}
  .cmp tr td:first-child{color:var(--ink-soft);font-weight:600}
  .tl{display:grid;grid-template-columns:repeat(4,1fr);gap:1rem;margin-top:1.6rem;max-width:64rem;position:relative}
  .tl div{border:1px solid rgba(255,255,255,.14);border-radius:12px;padding:1.1rem;background:rgba(255,255,255,.04)}
  .tl b{display:block;font-family:"Space Grotesk",sans-serif;color:var(--gold-l);font-size:1.6rem;margin-bottom:.3rem}
  .tl h4{font-size:.95rem;color:#fff;margin-bottom:.3rem} .tl p{font-size:.8rem;color:#C9C3B2}
  @media (max-width:900px){.pricebar.three,.tl{grid-template-columns:1fr}}
`;
html = html.replace("  @media (max-width:900px){.row", css + "  @media (max-width:900px){.row");

// ---------- remove old 7b ----------
const s7b = html.indexOf("<!-- 7b -->");
const s8 = html.indexOf("  <!-- 8 -->");
if (s7b < 0 || s8 < 0) throw new Error("markers");
html = html.slice(0, s7b) + "{{NEW_PAIN}}\n\n" + html.slice(s8);

const hot = (n, l, t, w, h, r) => `<div class="hot${r ? " r" : ""}" style="left:${l}%;top:${t}%;width:${w}%;height:${h}%"><b>${n}</b></div>`;

const newPain = `
  <!-- worries -->
  <section class="slide dark">
    <div class="kick">What you told us worries you most</div>
    <h2>Six worries. Each one has a price tag.</h2>
    <div class="grid2" style="max-width:82ch;margin-top:.8rem">
      <div><h3>&ldquo;They&rsquo;ll misunderstand my industry.&rdquo;</h3><p>Wrong terms lose the exact buyers who know the trade &mdash; architects, GCs, plant managers &mdash; before they ever call.</p></div>
      <div><h3>&ldquo;My 20 years will get dumbed down.&rdquo;</h3><p>A generic page gets compared on price. A specialist gets compared on knowledge.</p></div>
      <div><h3>&ldquo;A $300K buyer will think I do garages.&rdquo;</h3><p>One wrong first impression and that bid never reaches you &mdash; you&rsquo;ll never even see it.</p></div>
      <div><h3>&ldquo;Urgent problems can&rsquo;t get a fast answer.&rdquo;</h3><p>Someone with a failing floor books the first credible answer they find. Slower is lost.</p></div>
      <div><h3>&ldquo;I keep answering the same questions.&rdquo;</h3><p>Every repeat call and text is time taken from the work &mdash; and from the jobs you actually want.</p></div>
      <div><h3>&ldquo;Another vendor who disappears.&rdquo;</h3><p>A site nobody owns goes stale, slips in search, and quietly stops representing you.</p></div>
    </div>
    <p class="forward">&rarr; your estimate of the total: &ldquo;probably hundreds of thousands of all types of opportunities&rdquo;</p>
  </section>

  <!-- annotated desktop -->
  <section class="slide">
    <div class="row wide-l">
      <div>
        <div class="kick">Not your fault &mdash; this is what almost every self-built site does</div>
        <h2>floorrescue.com through a customer&rsquo;s eyes.</h2>
        <p class="lead">Most owners build their own site because nobody else understood the trade. The tools make it easy to land here. We&rsquo;re not judging the build &mdash; we&rsquo;re showing what a stranger sees in the first five seconds.</p>
        <ol class="leg">
          <li><strong>The first image is a retail-store carousel.</strong> No floor, no flooring words &mdash; a $300K buyer can&rsquo;t tell what you do.</li>
          <li><strong>Two menus, five dropdowns</strong> before a single project is visible.</li>
          <li><strong>A cookie banner</strong> covers the hero on every visit.</li>
          <li><strong>The scrolling text is about your project,</strong> not the visitor&rsquo;s problem.</li>
        </ol>
      </div>
      <div class="annot">
        <img src="{{IMG_OLD_HOME}}" alt="Current floorrescue.com homepage with four problem areas circled">
        ${hot(1, 1, 24, 66, 62)}${hot(2, 3, 3.5, 24, 8, 1)}${hot(2, 70, 3.5, 24, 8, 1).replace("<b>2</b>", "")}${hot(3, 70, 69, 29, 28, 1)}${hot(4, 0, 88.5, 72, 9, 1)}
      </div>
    </div>
  </section>

  <!-- annotated scroll -->
  <section class="slide">
    <div class="row wide-l">
      <div>
        <div class="kick">Further down the same page</div>
        <h2>The information is real. The path to it isn&rsquo;t obvious.</h2>
        <p class="lead">Twenty years of proof is in there. The problem is what a visitor has to do to reach it.</p>
        <ol class="leg">
          <li><strong>Buttons slide under the sticky menu</strong> and disappear while you scroll.</li>
          <li><strong>The main button is gray on gray</strong> &mdash; low contrast is why calls to action get overlooked.</li>
          <li><strong>Three plain links in a bullet list.</strong> Nothing tells a homeowner from a plant manager where to click.</li>
          <li><strong>The cookie banner returns</strong> and covers the content again.</li>
        </ol>
      </div>
      <div class="annot">
        <img src="{{IMG_OLD_SCROLL}}" alt="Current floorrescue.com scrolled view with four problem areas circled">
        ${hot(1, 10, 0.5, 84, 9, 1)}${hot(2, 39, 48, 22, 8, 1)}${hot(3, 26, 35, 40, 13, 1)}${hot(4, 70, 69, 29, 28, 1)}
      </div>
    </div>
  </section>

  <!-- annotated mobile -->
  <section class="slide">
    <div class="row">
      <div>
        <div class="kick">And on a phone &mdash; for many visitors, the first look</div>
        <h2>The cookie banner takes a third of the screen.</h2>
        <p class="lead">Whoever is standing in a failed-floor building with a phone in hand sees this before anything about you.</p>
        <ol class="leg">
          <li><strong>The banner</strong> covers the bottom third of the first screen.</li>
          <li><strong>The logo</strong> sits low-contrast on a busy photo.</li>
          <li><strong>The hero shows an oil pump jack</strong> &mdash; and not one word about floors.</li>
          <li><strong>The phone number is plain text,</strong> not a one-tap call button.</li>
        </ol>
      </div>
      <div class="annot mob">
        <img src="{{IMG_OLD_MOBILE}}" alt="Current floorrescue.com on a phone with four problem areas circled">
        ${hot(1, 0, 68, 100, 31, 1)}${hot(2, 30, 10.5, 40, 5.5, 1)}${hot(3, 2, 20, 96, 44, 1)}${hot(4, 8, 0.5, 84, 5.8, 1)}
      </div>
    </div>
  </section>
`;
html = html.replace("{{NEW_PAIN}}", newPain);

// ---------- beyond-the-ask slide, inserted before ROI slide (22) ----------
const beyond = `
  <!-- beyond -->
  <section class="slide">
    <div class="kick">Problems you didn&rsquo;t tell us about &mdash; fixed anyway</div>
    <h2>The things a visitor never says out loud.</h2>
    <div class="grid2" style="max-width:82ch">
      <div><h3>Phone-first</h3><p>Every page is built to be read and tapped on a phone, and checked at phone width before it ships.</p></div>
      <div><h3>Fast</h3><p>The cinematic clips were cut about 75% smaller with no visible loss, so the hero doesn&rsquo;t stutter on a real connection.</p></div>
      <div><h3>140+ real pages Google can read</h3><p>Every system, problem, project, and article is its own indexable page with its own title and description &mdash; not one long scroll.</p></div>
      <div><h3>One obvious next step</h3><p>A single Request a Quote button, always in reach &mdash; no hunting through menus.</p></div>
      <div><h3>Proof beside every claim</h3><p>16 real five-star reviews and your actual project history sit next to the systems they support.</p></div>
      <div><h3>Search and problem-finder</h3><p>Type &ldquo;cracked floor&rdquo; or pick a problem &mdash; the site sends people straight to the answer.</p></div>
    </div>
    <p class="fixtag">Fixes: &ldquo;visitors will have to dig around to find what they need&rdquo;</p>
  </section>

`;
html = html.replace("  <!-- 22 -->", beyond + "  <!-- 22 -->");

// ---------- replace pricing (23) + close (24) ----------
const s23 = html.indexOf("  <!-- 23 -->");
const endDeck = html.indexOf("</div>\n\n<div class=\"foot\">");
if (s23 < 0 || endDeck < 0) throw new Error("pricing markers");

const pricing = `
  <!-- pricing -->
  <section class="slide">
    <div class="kick">The investment &mdash; three ways to start</div>
    <h2>Same build. Different ways to pay for it.</h2>
    <div class="pricebar three">
      <div class="pcard hi">
        <span class="ptag">Best value &mdash; today only</span>
        <h4>Option 1 &middot; Both sites, one flat price</h4>
        <div class="amt">$6,000 <span class="was">$9,000</span></div>
        <div class="sub">then only $149/mo &mdash; covers both sites</div>
        <ul>
          <li>The Floor Rescue site you just walked through</li>
          <li>Your second site &mdash; included</li>
          <li>Hosting, security, and updates for both</li>
          <li>Ongoing SEO work, around the clock</li>
          <li>One-hour onboarding &middot; live within 72 hours after</li>
        </ul>
      </div>
      <div class="pcard dim">
        <h4>Option 2 &middot; Payment plan</h4>
        <div class="amt">$2,000 <span style="font-size:1rem;color:var(--ink-soft)">&times; 3 months</span></div>
        <div class="sub">then $297/mo &mdash; both sites</div>
        <ul>
          <li>The same two sites, the same build</li>
          <li>Spread across three payments</li>
          <li>Higher monthly care fee ($297 vs. $149)</li>
          <li>Year-one total: $9,564</li>
        </ul>
      </div>
      <div class="pcard dim">
        <h4>Option 3 &middot; Floor Rescue only</h4>
        <div class="amt">$4,500</div>
        <div class="sub">then $149/mo &mdash; one site</div>
        <ul>
          <li>The Floor Rescue build only</li>
          <li>A second site later is priced at the standard ~$4,500</li>
          <li>The two-site rate isn&rsquo;t available after today</li>
          <li>Year-one total: $6,288 for one site</li>
        </ul>
      </div>
    </div>
  </section>

  <!-- pricing math -->
  <section class="slide">
    <div class="kick">Why Option 1 &mdash; in plain numbers</div>
    <h2>Same two sites. $1,776 to $3,000 less.</h2>
    <table class="cmp">
      <thead><tr><th></th><th class="hi">Option 1 &middot; Flat</th><th>Option 2 &middot; Plan</th><th>Option 3 &middot; One site</th></tr></thead>
      <tbody>
        <tr><td>Sites you end up with</td><td class="hi">2</td><td>2</td><td>1 (2 only by paying again later)</td></tr>
        <tr><td>To start</td><td class="hi">$6,000</td><td>$2,000 &times; 3</td><td>$4,500</td></tr>
        <tr><td>Monthly care</td><td class="hi">$149</td><td>$297</td><td>$149</td></tr>
        <tr><td>Year-one total</td><td class="hi">$7,788</td><td>$9,564</td><td>$6,288</td></tr>
        <tr><td>Year-one cost per site</td><td class="hi">$3,894</td><td>$4,782</td><td>$6,288</td></tr>
        <tr><td>Total to end with both sites</td><td class="hi">$7,788</td><td>$9,564</td><td>$10,788</td></tr>
      </tbody>
    </table>
    <p class="lead" style="margin-top:1.1rem;max-width:64ch">The build you walked through is roughly a $4,500 project on its own. Building both in one relationship is why the second site can be included at no added build cost &mdash; today.</p>
  </section>

  <!-- which option -->
  <section class="slide dark" style="align-items:center;text-align:center">
    <p class="kick" style="align-self:center">Before we talk next steps</p>
    <h1 style="max-width:20ch">Which option makes the most sense for you?</h1>
    <p class="lead" style="margin-top:1.2rem;max-width:44ch">Flat price for both sites &middot; payment plan for both &middot; Floor Rescue on its own. All three get you the same build &mdash; the difference is what you pay for the same result.</p>
  </section>

  <!-- next steps -->
  <section class="slide dark">
    <div class="kick">Next steps &mdash; from the first payment to live</div>
    <h2>Here&rsquo;s exactly what happens after you say yes.</h2>
    <div class="tl">
      <div><b>1</b><h4>First payment</h4><p>Secure checkout &mdash; the moment it goes through, we&rsquo;re moving.</p></div>
      <div><b>2</b><h4>One-hour onboarding call</h4><p>We connect your domain and walk you through how the site and its emails work.</p></div>
      <div><b>3</b><h4>Live within 72 hours</h4><p>Your site goes live within 72 hours of that call.</p></div>
      <div><b>4</b><h4>We keep working</h4><p>Our team works around the clock on SEO and improvements &mdash; ongoing, not one-and-done.</p></div>
    </div>
    <p class="forward">&rarr; a partner that keeps building &mdash; the opposite of the vendor who disappears</p>
  </section>

  <!-- 24 close -->
  <section class="slide dark" style="align-items:center;text-align:center">
    <p class="kick" style="align-self:center">So &mdash; where do we go from here?</p>
    <h1>Let&rsquo;s build both.</h1>
    <p class="lead" style="margin-top:1rem;max-width:42ch">You&rsquo;ve walked through the site yourself and seen why each decision was made. Start with Option 1 and both sites begin on the same foundation &mdash; hosting and SEO included from day one.</p>
    <div class="cta-row" style="justify-content:center">
      <a href="https://buy.stripe.com/eVq7sN9g56EB4pNgFt8ww0d" target="_blank" rel="noopener noreferrer">Start with Option 1 &mdash; $6,000 &rarr;</a>
    </div>
    <p style="margin-top:1rem;font-size:.8rem;color:#B7AE93">Prefer the payment plan or Floor Rescue only? Say the word and we&rsquo;ll send that link instead.</p>
  </section>

`;
html = html.slice(0, s23) + pricing + html.slice(endDeck);

// ---------- footer count + parts ----------
const total = (html.match(/<section class="slide/g) || []).length;
html = html.replace(/<span id="slidenum">1 \/ \d+<\/span>/, `<span id="slidenum">1 / ${total}</span>`);

function slideIndexOf(marker) {
  const i = html.indexOf(marker);
  if (i < 0) throw new Error("no " + marker);
  return (html.slice(0, i).match(/<section class="slide/g) || []).length;
}
const p2 = slideIndexOf("  <!-- 10 -->");
const p3 = slideIndexOf("  <!-- 22 -->");
html = html.replace(/\{at:\d+, label:'Part 2 — what we built'\}/, `{at:${p2}, label:'Part 2 — what we built'}`);
html = html.replace(/\{at:\d+, label:'Part 3 — the investment'\}/, `{at:${p3}, label:'Part 3 — the investment'}`);

fs.writeFileSync(p, html, "utf8");
console.log("slides", total, "part2", p2, "part3", p3);

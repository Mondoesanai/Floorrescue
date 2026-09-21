// Builds deck-v11.mjs from deck-v10.mjs: reframes the critique around Jeremy's own stated concerns.
import fs from "node:fs";
let s = fs.readFileSync("scripts/deck-v10.mjs", "utf8");

const cutSlide = (marker) => {
  const a = s.indexOf(marker);
  if (a < 0) throw new Error("missing marker: " + marker.slice(0, 60));
  const e = s.indexOf("</section>`);", a) + "</section>`);".length;
  return [a, e];
};

// 1. retext helper + new red slides
const anchor = "const RED = { desk: withFix(old[8]), scroll: withFix(old[9]), mobile: withFix(old[10]) };";
if (!s.includes(anchor)) throw new Error("RED anchor");
const redBlock = `const retext = (slide, { kick, h2, lead, legend }) =>
  slide
    .replace(/<div class="kick">[\\s\\S]*?<\\/div>/, \`<div class="kick">\${kick}</div>\`)
    .replace(/<h2>[\\s\\S]*?<\\/h2>/, \`<h2>\${h2}</h2>\`)
    .replace(/<p class="lead">[\\s\\S]*?<\\/p>/, \`<p class="lead">\${lead}</p>\`)
    .replace(/<ol class="leg">[\\s\\S]*?<\\/ol>/, \`<ol class="leg">\${legend.map((l) => \`<li>\${l}</li>\`).join("")}</ol>\`);
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
};`;
s = s.replace(anchor, redBlock);

// 2. worries slide -> his concerns
let [a, e] = cutSlide('slides.push(`\n  <section class="slide dark">\n    <div class="kick">What we heard, in our words</div>');
s =
  s.slice(0, a) +
  `slides.push(\`
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
  </section>\`);` +
  s.slice(e);

// 3. summary slide -> team framing
[a, e] = cutSlide('slides.push(`\n  <section class="slide">\n    <div class="kick" style="color:var(--neg)">So, in summary</div>');
s =
  s.slice(0, a) +
  `slides.push(\`
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
        <tr><td>Not the same questions again</td><td>Technical answers only by phone &mdash; nothing to read first.</td></tr>
      </tbody>
    </table>
    <p class="lead" style="margin-top:1.2rem;max-width:64ch">Each one is a small leak. Together they&rsquo;re the modeled $6,000&ndash;$24,000 a month on the last slide.</p>
  </section>\`);` +
  s.slice(e);

// 4. solution slides echo his concerns
const swaps = [
  ['lead: "A real concrete-restoration film, the gold Floor Rescue sign, then three doors.', 'lead: "You didn&rsquo;t want a big buyer misjudging what you do &mdash; so the first screen is your work. A real concrete-restoration film, the gold Floor Rescue sign, then three doors.'],
  ['<p class="lead" style="max-width:74ch">This is what the whole site is built around: your knowledge is organized', '<p class="lead" style="max-width:74ch">You told us you didn&rsquo;t want anything hard to find. So this is what the whole site is built around: your knowledge is organized'],
  ['lead: "Someone types &ldquo;my floor is breaking&rdquo;', 'lead: "You mentioned that someone with a failing floor wants a fast, credible answer. Someone types &ldquo;my floor is breaking&rdquo;'],
];
for (const [x, y] of swaps) {
  if (!s.includes(x)) console.log("swap missing:", x.slice(0, 50));
  s = s.replace(x, y);
}
fs.writeFileSync("scripts/deck-v11.mjs", s);
console.log("deck-v11.mjs written");

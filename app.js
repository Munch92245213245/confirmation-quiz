// ---------- helpers ----------
const $ = s => document.querySelector(s);
function h(tag, attrs = {}, ...kids) {
  const e = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k === "class") e.className = v;
    else if (k === "html") e.innerHTML = v;
    else if (k.startsWith("on")) e.addEventListener(k.slice(2), v);
    else e.setAttribute(k, v);
  }
  for (const kid of kids.flat(Infinity)) if (kid != null) e.append(kid);
  return e;
}
const shuffle = a => { a = [...a]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const store = {
  get(k, d) { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} }
};
const ROMAN = ["I","II","III","IV","V","VI","VII","VIII","IX","X"];
const COLORS = ["#1e6fd9","#e67e22","#16a085","#c0392b","#2c3e50","#d4a017","#2980b9"];

// ---------- tabs ----------
document.querySelectorAll(".tab").forEach(b => b.addEventListener("click", () => showPage(b.dataset.page)));
function showPage(p) {
  document.querySelectorAll(".tab").forEach(b => b.classList.toggle("active", b.dataset.page === p));
  document.querySelectorAll(".page").forEach(s => s.classList.toggle("hidden", s.id !== p));
  if (p === "results") renderResults();
  window.scrollTo(0, 0);
}

// ---------- colors ----------
const SWATCHES = [["Dark Blue","#0b2545"],["Navy","#0a1a33"],["Blue","#1e4f9c"],["Ocean","#1565c0"],["Sky","#8ec5ff"],["Light Blue","#dcecff"],["White","#f4f6f9"],["Teal","#0f5e66"],["Gray","#4a5568"],["Black","#111111"]];
function setBg(c) { document.documentElement.style.setProperty("--bg", c); store.set("bgColor", c); $("#customColor").value = c; }
SWATCHES.forEach(([n, c]) => $("#swatches").append(h("button", { class: "swatch", title: n, style: "background:" + c, onclick: () => setBg(c) })));
$("#customColor").addEventListener("input", e => setBg(e.target.value));
$("#colorBtn").addEventListener("click", () => $("#colorPanel").classList.toggle("hidden"));
setBg(store.get("bgColor", "#0b2545"));

// ---------- STUDY PAGE ----------
function renderStudy() {
  const s = $("#study");
  const sections = [["prayers","Prayers"],["cmd","10 Commandments"],["gifts","Gifts of the Holy Spirit"],["sac","Sacraments, Gospels & Rosary"],["parish","Parish & Leaders"],["qa","Questions & Answers"],["facts","Matching Facts"]];
  s.append(h("div", { class: "card" }, h("h2", {}, "📖 Study Guide"), h("p", {}, "Read everything here, then go to the Quiz tab."),
    h("div", { class: "jump" }, sections.map(([id, n]) => h("a", { href: "#" + id }, n)))));

  s.append(h("div", { class: "card", id: "prayers" }, h("h2", {}, "🙏 Prayers to Know"),
    PRAYERS.map(p => [h("h3", {}, p.title), h("div", { class: "prayer" }, p.text), p.note ? h("p", { class: "note" }, p.note) : null])));

  s.append(h("div", { class: "card", id: "cmd" }, h("h2", {}, "📜 The 10 Commandments"),
    h("ol", { class: "cmd", type: "I" }, COMMANDMENTS.map(c => h("li", {}, c)))));

  s.append(h("div", { class: "card", id: "gifts" }, h("h2", {}, "🕊 Gifts of the Holy Spirit (7)"),
    h("ol", {}, GIFTS.map(g => h("li", {}, g)))));

  s.append(h("div", { class: "card", id: "sac" }, h("h2", {}, "⛪ The Seven Sacraments"),
    h("div", { class: "grid3" }, Object.entries(SACRAMENTS).map(([g, items]) => h("div", { class: "box" }, h("b", {}, g), h("ul", { class: "list" }, items.map(i => h("li", {}, i)))))),
    h("h3", {}, "The Four Gospels"), h("p", {}, "Matthew, Mark, Luke & John"),
    h("h3", {}, "Mysteries of the Rosary (4)"), h("p", {}, "Joyful; Luminous; Sorrowful; Glorious"),
    h("h3", {}, "Holy Days of Obligation (6)"), h("ul", { class: "list" }, HOLY_DAYS.map(d => h("li", {}, d)))));

  s.append(h("div", { class: "card", id: "parish" }, h("h2", {}, "🏠 Parish & Leaders"),
    h("table", {}, PARISH.map(([a, b]) => h("tr", {}, h("td", {}, a), h("td", {}, b))))));

  const qa = h("div", { class: "card", id: "qa" }, h("h2", {}, "❓ Questions & Answers"));
  let last = "";
  STUDY_QA.forEach(([topic, q, a]) => {
    if (topic !== last) { qa.append(h("h2", { style: "margin-top:18px;font-size:1.05rem;color:#1e6fd9" }, "— " + topic + " —")); last = topic; }
    qa.append(h("h3", { style: "color:#0b2545" }, q), h("p", { class: "pre" }, a));
  });
  s.append(qa);

  const facts = h("div", { class: "card", id: "facts" }, h("h2", {}, "🔗 Matching Facts (from the worksheet)"));
  MATCH_SETS.slice(0, 3).forEach(set => facts.append(h("table", { style: "margin-bottom:12px" }, set.pairs.map(([a, b]) => h("tr", {}, h("td", {}, a), h("td", {}, b))))));
  facts.append(h("h3", {}, "True or False facts"), h("table", {}, TF.map(([, q, a]) => h("tr", {}, h("td", {}, q), h("td", { style: "color:" + (a ? "#11683a" : "#9b1f1f") }, a ? "TRUE" : "FALSE")))));
  s.append(facts);
}

// ---------- BUILD QUESTIONS ----------
function buildQuestions() {
  const mc = MC.map(([topic, q, opts]) => ({ type: "mc", topic, q, answer: opts[0], options: shuffle(opts) }));
  const tf = TF.map(([topic, q, a]) => ({ type: "tf", topic, q, answer: a }));
  const match = MATCH_SETS.map(m => ({ type: "match", topic: m.topic, q: m.q, pairs: m.pairs }));
  const drag = [
    { type: "blanks", topic: "Prayers", q: "Drag the words into the Act of Contrition.",
      parts: ["My God, I’m ", 0, " for my sins with all my heart. In choosing to do wrong and failing to do ", 1, ", I have sinned against ", 2, " whom I should love above all things. I firmly ", 3, " with your help to do ", 4, ", to ", 5, " no more, and to ", 6, " whatever leads me to sin. Amen."],
      answers: ["sorry", "good", "You", "intend", "penance", "sin", "avoid"], extra: ["grace", "pray", "love"] },
    { type: "sort", topic: "Sacraments", q: "Drag each sacrament into the right group.", groups: SACRAMENTS },
    { type: "pick", topic: "Holy Spirit", q: "Drag ONLY the Gifts of the Holy Spirit into the box.", good: GIFTS, bad: ["Temperance", "Chastity", "Grace"] },
    { type: "pick", topic: "Bible", q: "Drag ONLY the four Gospels into the box.", good: GOSPELS, bad: ["Paul", "Gabriel", "Joachquin"] },
    { type: "pick", topic: "Rosary", q: "Drag ONLY the Mysteries of the Rosary into the box.", good: MYSTERIES, bad: ["Healing", "Initiation", "Vocation"] }
  ];
  const order = [{ type: "order", topic: "Commandments", q: "Put the 10 Commandments in order. Drag from the left column into the right column.", items: COMMANDMENTS }];
  const typing = PRAYERS.map(p => ({ type: "type", topic: "Prayers", q: "Type the " + p.title + " from memory.", prayer: p }));
  return { mc: shuffle(mc), tf: shuffle(tf), drag, match, order, typing };
}

// ---------- QUIZ ----------
let quiz = null;
function renderQuizMenu() {
  const Q = buildQuestions();
  const all = [...Q.mc, ...Q.tf, ...Q.drag, ...Q.match, ...Q.order, ...Q.typing];
  const opts = [
    ["⭐ Everything", shuffle([...Q.mc, ...Q.tf, ...Q.drag, ...Q.match, ...Q.order]).concat(Q.typing)],
    ["🔘 Multiple Choice", Q.mc], ["✅ True or False", Q.tf], ["✋ Drag & Drop", Q.drag],
    ["🔗 Mix & Match", Q.match], ["📜 10 Commandments (order)", Q.order], ["⌨️ Type the Prayers", Q.typing]
  ];
  const sec = $("#quiz"); sec.innerHTML = "";
  sec.append(h("div", { class: "card menu" }, h("h2", {}, "📝 Quiz"), h("p", {}, "Pick what you want to practice. Answer, tap Confirm to check, then Next."),
    h("div", { class: "choices" }, opts.map(([name, qs]) => h("button", { class: "btn", onclick: () => startQuiz(qs) }, h("span", {}, name), h("span", {}, qs.length + " Q"))))));
}
function startQuiz(qs) {
  quiz = { qs, i: 0, score: 0, topics: {} };
  showQuestion();
}
function showQuestion() {
  const q = quiz.qs[quiz.i];
  const sec = $("#quiz"); sec.innerHTML = "";
  const card = h("div", { class: "card" });
  card.append(h("div", { class: "progress" }, h("div", { style: `width:${quiz.i / quiz.qs.length * 100}%` })),
    h("div", { class: "qhead" }, h("span", {}, `Question ${quiz.i + 1} of ${quiz.qs.length}`), h("span", { class: "tag" }, q.topic)),
    h("div", { class: "qtext" }, q.q));
  const body = h("div");
  const fb = h("div");
  const confirm = h("button", { class: "btn", disabled: "" }, "Confirm");
  const next = h("button", { class: "btn dark hidden" }, quiz.i + 1 < quiz.qs.length ? "Next →" : "See Results");
  const quit = h("button", { class: "btn outline", onclick: () => { if (confirmQuit()) finishQuiz(); } }, "End");
  const ctx = { body, fb, enable: (on = true) => on ? confirm.removeAttribute("disabled") : confirm.setAttribute("disabled", "") };
  const checker = RENDER[q.type](q, ctx);
  confirm.addEventListener("click", () => {
    const res = checker();
    record(q.topic, res.ok);
    fb.className = "feedback " + (res.ok ? "good" : "bad");
    fb.innerHTML = (res.ok ? "✅ Correct!" : "❌ Not quite.") + (res.msg ? "<br>" + res.msg : "");
    confirm.classList.add("hidden"); next.classList.remove("hidden");
  });
  next.addEventListener("click", () => { quiz.i++; quiz.i < quiz.qs.length ? showQuestion() : finishQuiz(); });
  card.append(body, fb, h("div", { class: "actions" }, quit, confirm, next));
  sec.append(card);
  window.scrollTo(0, 0);
}
function confirmQuit() { return quiz.i === 0 || window.confirm("End the quiz now and see your results?"); }
function record(topic, ok) {
  const t = quiz.topics[topic] ||= { r: 0, n: 0 }; t.n++; if (ok) { t.r++; quiz.score++; }
  const all = store.get("stats", {}); const a = all[topic] ||= { r: 0, n: 0 }; a.n++; if (ok) a.r++; store.set("stats", all);
}
function finishQuiz() {
  const sec = $("#quiz"); sec.innerHTML = "";
  const n = Object.values(quiz.topics).reduce((s, t) => s + t.n, 0);
  const pct = n ? Math.round(quiz.score / n * 100) : 0;
  sec.append(h("div", { class: "card" }, h("h2", {}, "🎉 Quiz Done!"), h("div", { class: "big" }, pct + "%"),
    h("p", { style: "text-align:center" }, `You got ${quiz.score} out of ${n} right.`),
    strengthBlock(quiz.topics),
    h("div", { class: "actions" }, h("button", { class: "btn", onclick: renderQuizMenu }, "Take Another Quiz"), h("button", { class: "btn dark", onclick: () => showPage("study") }, "Study"))));
}

// ---------- RENDERERS (each returns a checker) ----------
const RENDER = {
  mc(q, ctx) {
    let pick = null; const btns = [];
    q.options.forEach(o => { const b = h("button", { class: "opt", onclick: () => { if (b.disabled) return; btns.forEach(x => x.classList.remove("sel")); b.classList.add("sel"); pick = o; ctx.enable(); } }, o); btns.push(b); });
    ctx.body.append(h("div", { class: "choices" }, btns));
    return () => { btns.forEach(b => { b.disabled = true; if (b.textContent === q.answer) b.classList.add("right"); else if (b.textContent === pick) b.classList.add("wrong"); });
      return { ok: pick === q.answer, msg: pick === q.answer ? "" : "Answer: " + q.answer }; };
  },
  tf(q, ctx) {
    let pick = null; const btns = [true, false].map(v => h("button", { class: "opt", onclick: e => { if (e.currentTarget.disabled) return; btns.forEach(x => x.classList.remove("sel")); e.currentTarget.classList.add("sel"); pick = v; ctx.enable(); } }, v ? "TRUE" : "FALSE"));
    ctx.body.append(h("div", { class: "tf" }, btns));
    return () => { btns.forEach((b, i) => { b.disabled = true; const v = i === 0; if (v === q.answer) b.classList.add("right"); else if (v === pick) b.classList.add("wrong"); });
      return { ok: pick === q.answer, msg: pick === q.answer ? "" : "Answer: " + (q.answer ? "TRUE" : "FALSE") }; };
  },
  blanks(q, ctx) {
    ctx.body.append(h("p", { class: "hint" }, "Drag a word onto a blank — or tap a word, then tap a blank."));
    const bank = zone("bank", false);
    shuffle([...q.answers, ...q.extra]).forEach(w => bank.append(chip(w)));
    const zones = [];
    const text = h("div", { class: "blanktext" }, q.parts.map(p => { if (typeof p === "number") { const z = zone("blank", true); z.dataset.answer = q.answers[p]; zones.push(z); return z; } return p; }));
    ctx.body.append(bank, text); watch(ctx, () => zones.every(z => z.querySelector(".chip")));
    return () => { lockDrag(ctx.body); let ok = true;
      zones.forEach(z => { const c = z.querySelector(".chip"); const good = c && c.textContent === z.dataset.answer; (c || z).classList.add(good ? "right" : "wrong"); if (!good) ok = false; });
      return { ok, msg: ok ? "" : "Answers: " + q.answers.join(", ") }; };
  },
  sort(q, ctx) {
    ctx.body.append(h("p", { class: "hint" }, "Drag each card into a group — or tap a card, then tap a group."));
    const bank = zone("bank", false);
    const items = Object.entries(q.groups).flatMap(([g, list]) => list.map(i => { const c = chip(i); c.dataset.group = g; return c; }));
    shuffle(items).forEach(c => bank.append(c));
    const groups = Object.keys(q.groups).map(g => { const z = zone("", false); z.dataset.group = g; return h("div", { class: "group" }, h("h4", {}, g), z); });
    ctx.body.append(bank, h("div", { class: "groups" }, groups)); watch(ctx, () => !bank.querySelector(".chip"));
    return () => { lockDrag(ctx.body); let ok = true;
      ctx.body.querySelectorAll(".chip").forEach(c => { const good = c.parentElement.dataset.group === c.dataset.group; c.classList.add(good ? "right" : "wrong"); if (!good) ok = false; });
      return { ok, msg: ok ? "" : Object.entries(q.groups).map(([g, l]) => `<b>${g}:</b> ${l.join(", ")}`).join("<br>") }; };
  },
  pick(q, ctx) {
    ctx.body.append(h("p", { class: "hint" }, "Drag the right cards into the box — or tap a card, then tap the box."));
    const bank = zone("bank", false);
    shuffle([...q.good.map(g => [g, 1]), ...q.bad.map(b => [b, 0])]).forEach(([t, g]) => { const c = chip(t); c.dataset.good = g; bank.append(c); });
    const box = zone("", false); box.style.minHeight = "120px";
    ctx.body.append(h("h4", { style: "margin:4px 0" }, "Cards:"), bank, h("h4", { style: "margin:4px 0" }, "✅ Answer box:"), box);
    watch(ctx, () => box.querySelector(".chip"));
    return () => { lockDrag(ctx.body); let ok = true;
      ctx.body.querySelectorAll(".chip").forEach(c => { const inBox = c.parentElement === box, good = c.dataset.good === "1";
        if (inBox && good) c.classList.add("right"); else if (inBox && !good) { c.classList.add("wrong"); ok = false; } else if (!inBox && good) { c.classList.add("wrong"); ok = false; } });
      return { ok, msg: ok ? "" : "Answer: " + q.good.join(", ") }; };
  },
  order(q, ctx) {
    ctx.body.append(h("p", { class: "hint" }, "Drag from “Mixed up” into the numbered spots — or tap one, then tap a spot."));
    const bank = zone("bank", false);
    shuffle(q.items).forEach(t => bank.append(chip(t)));
    const slots = q.items.map((t, i) => { const z = zone("", true); z.dataset.answer = t; return z; });
    ctx.body.append(h("div", { class: "cols" },
      h("div", {}, h("h4", {}, "Mixed up"), bank),
      h("div", {}, h("h4", {}, "In order"), slots.map((z, i) => h("div", { class: "slot" }, h("span", {}, ROMAN[i] + "."), z)))));
    watch(ctx, () => slots.every(z => z.querySelector(".chip")));
    return () => { lockDrag(ctx.body); let right = 0;
      slots.forEach(z => { const c = z.querySelector(".chip"); const good = c && c.textContent === z.dataset.answer; (c || z).classList.add(good ? "right" : "wrong"); if (good) right++; });
      const ok = right === slots.length;
      return { ok, msg: ok ? "" : `${right} of 10 in the right spot.<div class="answerkey">${q.items.map((t, i) => ROMAN[i] + ". " + t).join("<br>")}</div>` }; };
  },
  match(q, ctx) {
    ctx.body.append(h("p", { class: "hint" }, "Tap an item on the left, then tap its match on the right. Tap again to undo."));
    const pairs = {}; let sel = null;
    const left = q.pairs.map(([l], i) => { const b = h("button", { class: "mitem" }); b.dataset.i = i; b.append(h("span", { class: "num" }), l); return b; });
    const rightTexts = shuffle(q.pairs.map(p => p[1]));
    const right = rightTexts.map(r => { const b = h("button", { class: "mitem" }); b.dataset.t = r; b.append(h("span", { class: "num" }), r); return b; });
    let locked = false;
    const paint = () => {
      left.forEach((b, i) => { const n = b.querySelector(".num"); const has = pairs[i] != null; n.textContent = has ? i + 1 : ""; n.style.background = has ? COLORS[i % COLORS.length] : "transparent"; b.classList.toggle("sel", sel === i); });
      right.forEach(b => { const li = Object.keys(pairs).find(k => pairs[k] === b.dataset.t); const n = b.querySelector(".num"); n.textContent = li != null ? +li + 1 : ""; n.style.background = li != null ? COLORS[li % COLORS.length] : "transparent"; });
      ctx.enable(Object.keys(pairs).length === q.pairs.length);
    };
    left.forEach((b, i) => b.addEventListener("click", () => { if (locked) return; if (pairs[i] != null) { delete pairs[i]; sel = null; } else sel = sel === i ? null : i; paint(); }));
    right.forEach(b => b.addEventListener("click", () => { if (locked) return; const t = b.dataset.t; const owner = Object.keys(pairs).find(k => pairs[k] === t);
      if (sel != null) { if (owner != null) delete pairs[owner]; pairs[sel] = t; sel = null; } else if (owner != null) delete pairs[owner]; paint(); }));
    ctx.body.append(h("div", { class: "match" }, h("div", {}, h("h4", {}, "Item"), left), h("div", {}, h("h4", {}, "Match"), right)));
    paint();
    return () => { locked = true; let ok = true;
      left.forEach((b, i) => { const good = pairs[i] === q.pairs[i][1]; b.classList.add(good ? "right" : "wrong"); if (!good) { ok = false; b.append(h("small", {}, "→ " + q.pairs[i][1])); } });
      return { ok, msg: ok ? "" : "Correct matches are shown in green under each item." }; };
  },
  type(q, ctx) {
    const ta = h("textarea", { placeholder: "Type the whole prayer here…", autocapitalize: "sentences", spellcheck: "false" });
    ta.addEventListener("input", () => ctx.enable(ta.value.trim().length > 0));
    ctx.body.append(h("p", { class: "hint" }, "Capital letters and punctuation don’t count — only the words and spelling."), ta);
    return () => { ta.readOnly = true;
      const r = diffWords(q.prayer.text, ta.value);
      const out = h("div", { class: "diff" }); out.innerHTML = r.html;
      ctx.body.append(h("h4", { style: "margin:12px 0 0" }, `Score: ${r.pct}% (${r.ok} of ${r.total} words)`), out,
        h("div", { class: "legend", html: '<span class="w-ok">green = correct</span> · <span class="w-miss">red = missing or misspelled</span> · <span class="w-extra">gray = extra word you typed</span>' }),
        h("div", { class: "prayer", style: "margin-top:10px" }, h("b", {}, "The prayer: "), q.prayer.text));
      return { ok: r.ok === r.total && !r.extra, msg: r.ok === r.total && !r.extra ? "Perfect spelling!" : "Check the red words below." }; };
  }
};

// ---------- typing diff ----------
function diffWords(target, typed) {
  const split = s => s.replace(/[—–-]+/g, " ").split(/\s+/).filter(Boolean);
  const norm = w => w.toLowerCase().replace(/[’‘`]/g, "'").replace(/[^a-z0-9']/g, "");
  const A = split(target), B = split(typed).filter(w => norm(w));
  const a = A.map(norm), b = B.map(norm);
  const n = a.length, m = b.length, dp = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));
  for (let i = n - 1; i >= 0; i--) for (let j = m - 1; j >= 0; j--) dp[i][j] = a[i] === b[j] ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);
  let i = 0, j = 0, ok = 0, extra = 0; const parts = [];
  const esc = s => s.replace(/[&<>]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]));
  while (i < n || j < m) {
    if (i < n && j < m && a[i] === b[j]) { parts.push(`<span class="w-ok">${esc(A[i])}</span>`); ok++; i++; j++; }
    else if (j < m && (i >= n || dp[i][j + 1] >= dp[i + 1][j])) { parts.push(`<span class="w-extra">${esc(B[j])}</span>`); extra++; j++; }
    else { parts.push(`<span class="w-miss">${esc(A[i])}</span>`); i++; }
  }
  return { html: parts.join(" "), ok, total: n, extra, pct: Math.round(ok / n * 100) };
}

// ---------- drag & drop engine (mouse + touch + tap) ----------
let selChip = null, drag = null;
function chip(text) { const c = h("div", { class: "chip" }, text); c.addEventListener("pointerdown", chipDown); return c; }
function zone(cls, single) { const z = h("div", { class: "zone " + cls }); if (single) z.dataset.single = "1"; z.addEventListener("click", e => { if (e.target.closest(".chip")) return; if (selChip && !z.closest(".locked")) place(selChip, z); }); return z; }
function watch(ctx, test) { ctx.body._onDrop = () => ctx.enable(!!test()); }
function lockDrag(body) { body.classList.add("locked"); if (selChip) selChip.classList.remove("selected"); selChip = null; }
function chipDown(e) {
  const c = e.currentTarget; if (c.closest(".locked")) return;
  e.preventDefault();
  drag = { c, x: e.clientX, y: e.clientY, moved: false, ghost: null, over: null };
  document.addEventListener("pointermove", chipMove);
  document.addEventListener("pointerup", chipUp, { once: true });
}
function chipMove(e) {
  if (!drag) return;
  if (!drag.moved && Math.hypot(e.clientX - drag.x, e.clientY - drag.y) > 6) {
    drag.moved = true; drag.ghost = drag.c.cloneNode(true); drag.ghost.classList.add("ghost"); drag.ghost.style.width = drag.c.offsetWidth + "px";
    document.body.append(drag.ghost); drag.c.classList.add("dragging");
  }
  if (drag.moved) {
    drag.ghost.style.left = e.clientX + "px"; drag.ghost.style.top = e.clientY + "px";
    const z = zoneAt(e.clientX, e.clientY);
    if (drag.over !== z) { drag.over?.classList.remove("over"); z?.classList.add("over"); drag.over = z; }
    if (e.clientY < 60) window.scrollBy(0, -12); else if (e.clientY > innerHeight - 60) window.scrollBy(0, 12);
  }
}
function zoneAt(x, y) { const el = document.elementFromPoint(x, y); const z = el && el.closest(".zone"); return z && !z.closest(".locked") ? z : null; }
function chipUp(e) {
  document.removeEventListener("pointermove", chipMove);
  const d = drag; drag = null; if (!d) return;
  if (d.moved) {
    d.ghost.remove(); d.c.classList.remove("dragging"); d.over?.classList.remove("over");
    const z = zoneAt(e.clientX, e.clientY); if (z) place(d.c, z);
  } else {
    // tap: select, or swap into an occupied single spot
    const myZone = d.c.parentElement;
    if (selChip && selChip !== d.c && myZone.dataset.single) { place(selChip, myZone); return; }
    if (selChip === d.c) { d.c.classList.remove("selected"); selChip = null; return; }
    selChip?.classList.remove("selected"); selChip = d.c; d.c.classList.add("selected");
  }
}
function place(c, z) {
  const from = c.parentElement;
  if (z.dataset.single) { const old = z.querySelector(".chip"); if (old && old !== c) from.append(old); }
  z.append(c);
  c.classList.remove("selected"); selChip = null;
  let p = z; while (p && !p._onDrop) p = p.parentElement;
  p?._onDrop();
}

// ---------- strengths / results ----------
function strengthBlock(topics) {
  const rows = Object.entries(topics).filter(([, t]) => t.n).map(([k, t]) => [k, Math.round(t.r / t.n * 100), t]).sort((a, b) => b[1] - a[1]);
  if (!rows.length) return h("p", {}, "No answers yet. Take a quiz first!");
  const strong = rows.filter(r => r[1] >= 80), weak = rows.filter(r => r[1] < 60);
  return h("div", {},
    h("h3", {}, "💪 Strong in"), strong.length ? h("div", {}, strong.map(r => h("span", { class: "pill s" }, r[0]))) : h("p", { class: "note" }, "Keep practicing — nothing at 80%+ yet."),
    h("h3", {}, "📚 Needs work"), weak.length ? h("div", {}, weak.map(r => h("span", { class: "pill w" }, r[0]))) : h("p", { class: "note" }, "Nothing below 60% — great job!"),
    h("h3", {}, "By topic"),
    rows.map(([k, p, t]) => h("div", { class: "bar" }, h("span", { class: "name" }, k),
      h("span", { class: "track" }, h("span", { class: "fill", style: `display:block;width:${p}%;background:${p >= 80 ? "#1a9c55" : p >= 60 ? "#e0a800" : "#d63a3a"}` })),
      h("span", { class: "pct" }, p + "%"))));
}
function renderResults() {
  const sec = $("#results"); sec.innerHTML = "";
  const stats = store.get("stats", {});
  const tot = Object.values(stats).reduce((s, t) => ({ r: s.r + t.r, n: s.n + t.n }), { r: 0, n: 0 });
  sec.append(h("div", { class: "card" }, h("h2", {}, "📊 My Results (all quizzes)"),
    tot.n ? h("div", { class: "big" }, Math.round(tot.r / tot.n * 100) + "%") : null,
    tot.n ? h("p", { style: "text-align:center" }, `${tot.r} right out of ${tot.n} answers`) : null,
    strengthBlock(stats),
    h("div", { class: "actions" }, h("button", { class: "btn", onclick: () => { showPage("quiz"); renderQuizMenu(); } }, "Take a Quiz"),
      h("button", { class: "btn outline", onclick: () => { if (window.confirm("Erase all your results?")) { store.set("stats", {}); renderResults(); } } }, "Reset"))));
}

renderStudy();
renderQuizMenu();

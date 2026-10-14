(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["object" == typeof document ? document.currentScript : void 0, 345345, (e) => {
  "use strict";
  var t = e.i(619882), r = e.i(927612), n = e.i(155172);
  let s = "#9D989B", i = "M12 0 L24 36 L12 72 L0 36 Z", a = "#29211E", l = "L102.85 38.31 A8 8 0 1 0 100.03 54.03 L53.45 313.56", o = `M0 0 L94.51 0 L96.4 -6.45 L110.58 -4.75 ${l} L53.37 314 L0 314`, c = `M0 0.5 L94.51 0.5 L96.4 -6.45 L110.58 -4.75 ${l} L53.37 313.5 L0 313.5`, d = `M96.82 -6.4 L110.58 -4.75 ${l} L53.37 314.1 L1.7 300.69 L94.41 0.04 Z`, u = { cx: 39, cy: 262.1 }, p = ({ className: e2, children: n2 }) => (0, t.jsx)("svg", { "aria-hidden": "true", className: (0, r.cx)("pointer-events-none absolute top-0 right-0 hidden h-full overflow-visible md:block", e2), style: { width: 125 }, viewBox: "0 0 125 314", preserveAspectRatio: "none", children: n2 }), x = `${d} M${u.cx - 8} ${u.cy} a8 8 0 1 0 16 0 a8 8 0 1 0 -16 0 Z`, h = () => {
    let e2 = (0, n.useId)();
    return (0, t.jsxs)(t.Fragment, { children: [(0, t.jsxs)(p, { className: "-z-10", children: [(0, t.jsx)("path", { d: o, className: "fill-waitlist-paper" }), (0, t.jsx)("path", { d: c, fill: "none", stroke: a, vectorEffect: "non-scaling-stroke" })] }), (0, t.jsxs)(p, { className: "z-10", children: [(0, t.jsx)("defs", { children: (0, t.jsx)("pattern", { id: e2, width: 24, height: 72, patternUnits: "userSpaceOnUse", patternTransform: "translate(97.64 -8.79) rotate(17.12)", children: (0, t.jsx)("path", { d: i, fill: "none", stroke: s, strokeWidth: 0.5 }) }) }), (0, t.jsx)("path", { d: x, className: "fill-waitlist-paper", fillRule: "evenodd" }), (0, t.jsx)("path", { d: x, fill: `url(#${e2})`, fillRule: "evenodd" }), (0, t.jsx)("path", { d, fill: "none", stroke: a, vectorEffect: "non-scaling-stroke" }), (0, t.jsx)("circle", { ...u, r: 8.5, fill: "none", stroke: a, vectorEffect: "non-scaling-stroke" })] })] });
  }, g = { x: -5.07, y: 31.2 }, f = "M0 79 L378 48", m = "M-3 58 L371.23 0.14 L378 48 L0 79 Z", b = ({ ref: e2, className: n2, children: s2 }) => (0, t.jsx)("svg", { ref: e2, "aria-hidden": "true", className: (0, r.cx)("pointer-events-none absolute bottom-0 left-0 w-full overflow-visible md:hidden", n2), style: { height: 79 }, viewBox: "0 0 378 79", preserveAspectRatio: "none", children: s2 }), v = () => {
    let e2 = (0, n.useId)(), r2 = (0, n.useRef)(null), [l2, o2] = (0, n.useState)(378);
    return (0, n.useLayoutEffect)(() => {
      let e3 = r2.current;
      if (!e3) return;
      let t2 = new ResizeObserver(([e4]) => {
        e4.contentRect.width > 0 && o2(e4.contentRect.width);
      });
      return t2.observe(e3), () => t2.disconnect();
    }, []), (0, t.jsxs)(t.Fragment, { children: [(0, t.jsx)(b, { className: "-z-10", children: (0, t.jsx)("path", { d: f, fill: "none", stroke: a, strokeWidth: 0.8, vectorEffect: "non-scaling-stroke" }) }), (0, t.jsxs)(b, { ref: r2, className: "z-10", children: [(0, t.jsx)("defs", { children: (0, t.jsx)("pattern", { id: e2, width: 24, height: 72, patternUnits: "userSpaceOnUse", patternTransform: ((e3) => {
      let t2 = 180 * Math.atan2(31, e3) / Math.PI, { x: r3, y: n2 } = g;
      return `scale(${1 / (e3 / 378)} 1) translate(${r3} ${n2}) rotate(${-t2}) scale(0.625)`;
    })(l2), children: (0, t.jsx)("path", { d: i, fill: "none", stroke: s, strokeWidth: 0.5 }) }) }), (0, t.jsx)("path", { d: m, className: "fill-waitlist-paper" }), (0, t.jsx)("path", { d: m, fill: `url(#${e2})` }), (0, t.jsx)("path", { d: m, fill: "none", stroke: a, strokeWidth: 0.8, vectorEffect: "non-scaling-stroke" })] }), (0, t.jsx)("svg", { "aria-hidden": "true", className: "pointer-events-none absolute z-10 size-3 md:hidden", style: { right: 18, bottom: 40 }, viewBox: "0 0 12 12", children: (0, t.jsx)("circle", { cx: 6, cy: 6, r: 5.4, className: "fill-waitlist-paper", stroke: a, strokeWidth: 0.8 }) })] });
  }, y = "#29211E", j = "#FAFAFA", k = 112.99799999999999, w = (e2, t2, r2) => `url("data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="${e2}" height="${t2}" viewBox="0 0 ${e2} ${t2}">${r2}</svg>`)}")`, A = (e2, t2) => t2 ? `<rect x="1" y="${e2 + 1}" width="16" height="19.333" rx="8"/>` : `<rect x="0.5" y="${e2 + 0.5}" width="17" height="20.333" rx="8.5" fill="none" stroke="${y}"/>`, _ = w(18, 50.998, A(0, true) + A(29.665, true)), C = w(18, 50.998, A(0, false) + A(29.665, false)), S = w(18, 18, '<circle cx="9" cy="9" r="8"/>'), N = w(18, 18, `<circle cx="9" cy="9" r="8.5" fill="none" stroke="${y}"/>`), M = w(47, 12, `<rect x="0.5" y="0.5" width="46" height="11" fill="${j}" stroke="${y}"/>`), E = w(12, 12, '<circle cx="6" cy="6" r="5"/>'), R = w(12, 12, `<circle cx="6" cy="6" r="5.4" fill="none" stroke="${y}" stroke-width="0.8"/>`), D = w(30, 8, `<rect x="0.4" y="0.4" width="29.2" height="7.2" fill="${j}" stroke="${y}" stroke-width="0.8"/>`), L = (e2, t2, r2, n2, s2 = "var(--hole-period)") => ({ image: e2, size: `${t2}px ${s2}`, position: `${r2} top calc(${n2} - ${s2} / 2)`, repeat: "no-repeat repeat" }), O = (e2, t2, r2) => ({ image: e2, size: "auto", position: `${t2} ${r2}`, repeat: "no-repeat" }), T = w(24, 72, `<path d="${i}" fill="none" stroke="${s}" stroke-width="0.5"/>`), P = (e2, t2 = 1) => ({ image: T, size: 1 === t2 ? "auto" : `${24 * t2}px ${72 * t2}px`, position: e2, repeat: "repeat" }), F = "calc(55.498999999999995px + var(--hole-period) / 2)", B = (e2) => 31 + 29.665 * e2 + 9.6665, z = (e2) => [e2("left 14px"), e2("right 14px")], I = (e2) => [e2("left 11px"), e2("right 11px")], $ = (e2) => "cut" === e2 ? E : R, H = { bar: { holes: (e2) => [...z((t2) => O("cut" === e2 ? S : N, t2, "top 50%")), ..."ring" === e2 ? [P("left 0 top 0")] : []], tabs: [O(M, "left 0", "top 50%")], mobileHoles: (e2) => [...I((t2) => O($(e2), t2, "top 50%")), ..."ring" === e2 ? [P("left -1px top -1px", 0.625)] : []], mobileTabs: () => [O(D, "left 0", "top 50%")] }, panel: { holes: (e2) => [...z((t2) => L("cut" === e2 ? _ : C, 18, t2, "55.498999999999995px")), ...z((t2) => L("cut" === e2 ? S : N, 18, t2, F))], tabs: [L(M, 47, "left 0", F), L(M, 47, "left 0", `${B(0)}px`, "calc(var(--hole-period) * 2)"), L(M, 47, "left 0", `calc(${B(1)}px + var(--hole-period))`, "calc(var(--hole-period) * 2)")], mobileHoles: (e2, t2) => ["top 14px", ...t2.map((e3) => `top ${e3 - 6}px`), "bottom 14px"].flatMap((t3) => I((r2) => O($(e2), r2, t3))), mobileTabs: (e2) => ["top 16px", ...e2.map((e3) => `top ${e3 - 4}px`), "bottom 16px"].map((e3) => O(D, "left 0", e3)) }, footer: { holes: (e2) => {
    let t2 = "cut" === e2 ? S : N;
    return [O(t2, "left 14px", "top 37px"), O(t2, "left 14px", "bottom 30.4px")];
  }, tabs: [O(M, "left 0", "top 40px"), O(M, "left 0", "bottom 33.4px")], mobileHoles: (e2) => I((t2) => O($(e2), t2, "top 14px")), mobileTabs: () => [O(D, "left 0", "top 16px"), O(D, "left 0", "bottom 11px")], folded: true } }, V = (e2, t2) => e2.map((e3) => e3[t2]).join(", "), U = (e2, t2) => ({ [`--${e2}-image`]: V(t2, "image"), [`--${e2}-size`]: V(t2, "size"), [`--${e2}-position`]: V(t2, "position"), [`--${e2}-repeat`]: V(t2, "repeat") }), W = (e2, t2) => ({ ...U(e2, [{ image: "linear-gradient(#000 0 0)", size: "100% 100%", position: "left 0 top 0", repeat: "no-repeat" }, ...t2]), [`--${e2}-composite`]: ["subtract", ...t2.map(() => "add")].join(", ") }), Q = (e2, t2) => {
    let { mobileHoles: r2, mobileTabs: n2 } = H[e2];
    return { ...W("hole-sm-mask", r2("cut", t2)), ...U("hole-sm-ring", r2("ring", t2)), ...U("hole-sm-tab", n2(t2)) };
  }, K = { lg: { desktopLayers: ["lg:[mask-image:var(--hole-mask-image)]", "lg:[mask-size:var(--hole-mask-size)]", "lg:[mask-position:var(--hole-mask-position)]", "lg:[mask-repeat:var(--hole-mask-repeat)]", "lg:[mask-composite:var(--hole-mask-composite)]", "lg:[background-image:var(--hole-ring-image)]", "lg:[background-size:var(--hole-ring-size)]", "lg:[background-position:var(--hole-ring-position)]", "lg:[background-repeat:var(--hole-ring-repeat)]"], mobileLayers: ["max-lg:[mask-image:var(--hole-sm-mask-image)]", "max-lg:[mask-size:var(--hole-sm-mask-size)]", "max-lg:[mask-position:var(--hole-sm-mask-position)]", "max-lg:[mask-repeat:var(--hole-sm-mask-repeat)]", "max-lg:[mask-composite:var(--hole-sm-mask-composite)]", "max-lg:[background-image:var(--hole-sm-ring-image)]", "max-lg:[background-size:var(--hole-sm-ring-size)]", "max-lg:[background-position:var(--hole-sm-ring-position)]", "max-lg:[background-repeat:var(--hole-sm-ring-repeat)]"], tabStrip: (0, r.cx)("pointer-events-none absolute hidden lg:block", "lg:[background-image:var(--hole-tab-image)]", "lg:[background-size:var(--hole-tab-size)]", "lg:[background-position:var(--hole-tab-position)]", "lg:[background-repeat:var(--hole-tab-repeat)]"), mobileTabStrip: (0, r.cx)("pointer-events-none absolute lg:hidden", "max-lg:[background-image:var(--hole-sm-tab-image)]", "max-lg:[background-size:var(--hole-sm-tab-size)]", "max-lg:[background-position:var(--hole-sm-tab-position)]", "max-lg:[background-repeat:var(--hole-sm-tab-repeat)]"), foldClip: (0, r.cx)("lg:[clip-path:var(--hole-fold-clip)]", "max-lg:[clip-path:var(--hole-sm-fold-clip)]") }, md: { desktopLayers: ["md:[mask-image:var(--hole-mask-image)]", "md:[mask-size:var(--hole-mask-size)]", "md:[mask-position:var(--hole-mask-position)]", "md:[mask-repeat:var(--hole-mask-repeat)]", "md:[mask-composite:var(--hole-mask-composite)]", "md:[background-image:var(--hole-ring-image)]", "md:[background-size:var(--hole-ring-size)]", "md:[background-position:var(--hole-ring-position)]", "md:[background-repeat:var(--hole-ring-repeat)]"], mobileLayers: ["max-md:[mask-image:var(--hole-sm-mask-image)]", "max-md:[mask-size:var(--hole-sm-mask-size)]", "max-md:[mask-position:var(--hole-sm-mask-position)]", "max-md:[mask-repeat:var(--hole-sm-mask-repeat)]", "max-md:[mask-composite:var(--hole-sm-mask-composite)]", "max-md:[background-image:var(--hole-sm-ring-image)]", "max-md:[background-size:var(--hole-sm-ring-size)]", "max-md:[background-position:var(--hole-sm-ring-position)]", "max-md:[background-repeat:var(--hole-sm-ring-repeat)]"], tabStrip: (0, r.cx)("pointer-events-none absolute hidden md:block", "md:[background-image:var(--hole-tab-image)]", "md:[background-size:var(--hole-tab-size)]", "md:[background-position:var(--hole-tab-position)]", "md:[background-repeat:var(--hole-tab-repeat)]"), mobileTabStrip: (0, r.cx)("pointer-events-none absolute md:hidden", "max-md:[background-image:var(--hole-sm-tab-image)]", "max-md:[background-size:var(--hole-sm-tab-size)]", "max-md:[background-position:var(--hole-sm-tab-position)]", "max-md:[background-repeat:var(--hole-sm-tab-repeat)]"), foldClip: (0, r.cx)("md:[clip-path:var(--hole-fold-clip)]", "max-md:[clip-path:var(--hole-sm-fold-clip)]") } };
  e.s(["HomePanelHoles", 0, ({ variant: e2, className: s2 }) => {
    let i2 = (0, n.useRef)(null), { holes: a2, tabs: l2, folded: o2 } = H[e2], { desktopLayers: c2, mobileLayers: d2, tabStrip: u2, mobileTabStrip: p2, foldClip: x2 } = K["footer" === e2 ? "md" : "lg"];
    (0, n.useLayoutEffect)(() => {
      let t2 = i2.current, r2 = t2?.parentElement, n2 = r2?.parentElement;
      if (!t2 || !r2 || !n2 || "panel" !== e2) return;
      let s3 = new ResizeObserver(([t3]) => {
        let s4 = t3.borderBoxSize[0].blockSize + 2 - k, i3 = Math.max(1, Math.round(s4 / 566.5));
        r2.style.setProperty("--hole-period", `${s4 / i3}px`);
        let a3 = [...n2.children].filter((e3) => e3 !== r2 && e3 instanceof HTMLElement);
        Object.entries(Q(e2, a3.slice(1).map((e3, t4) => {
          let r3 = a3[t4];
          return Math.round((r3.offsetTop + r3.offsetHeight + e3.offsetTop) / 2) - 1;
        }))).forEach(([e3, t4]) => r2.style.setProperty(e3, t4));
      });
      return s3.observe(t2), () => s3.disconnect();
    }, [e2]);
    let g2 = { "--hole-period": "566.5px", ...W("hole-mask", a2("cut")), ...U("hole-ring", a2("ring")), ...U("hole-tab", l2), ...Q(e2, []), "--hole-fold-clip": "inset(0 124px 0 0)", "--hole-sm-fold-clip": "polygon(0 0, 100% 0, 100% calc(100% - 31px), 0 100%)" }, f2 = +!!o2;
    return (0, t.jsxs)("div", { "aria-hidden": "true", className: "contents", style: g2, children: [o2 && (0, t.jsx)("div", { className: (0, r.cx)("pointer-events-none absolute inset-0 -z-10", "border-1 max-md:home-outline md:border-stone-800", x2) }), (0, t.jsx)("div", { ref: i2, className: (0, r.cx)("pointer-events-none absolute -z-10", o2 ? (0, r.cx)("inset-px", x2) : "inset-0", s2, c2, d2) }), o2 && (0, t.jsx)(h, {}), o2 && (0, t.jsx)(v, {}), (0, t.jsx)("div", { className: u2, style: { top: f2, bottom: f2, width: 47, left: -30 + f2 } }), (0, t.jsx)("div", { className: u2, style: { top: f2, bottom: f2, width: 47, right: -30 + f2 } }), (0, t.jsx)("div", { className: p2, style: { top: f2, bottom: f2, width: 30, left: -16 + f2 } }), (0, t.jsx)("div", { className: p2, style: { top: f2, bottom: f2, width: 30, right: -16 + f2 } })] });
  }], 345345);
}, 519082, (e) => {
  "use strict";
  var t = e.i(619882), r = e.i(927612);
  e.s(["HomeRuleCap", 0, ({ className: e2 }) => (0, t.jsx)("span", { "aria-hidden": "true", className: (0, r.cx)("pointer-events-none absolute size-1.25 bg-[#117025] md:size-2", e2) })]);
}, 43989, 206448, (e) => {
  "use strict";
  let t = /* @__PURE__ */ new WeakMap();
  function r(e2) {
    let r2 = t.get(e2);
    if (!r2) throw Error("Invalid Lightbox handle");
    return r2;
  }
  function n(e2) {
    for (let t2 of (e2.version += 1, e2.listeners)) t2();
  }
  function s() {
    let e2 = { host: null, triggers: /* @__PURE__ */ new Map(), version: 0, listeners: /* @__PURE__ */ new Set() }, r2 = { open(t2, r3) {
      e2.host && e2.host.open(t2, r3);
    }, close() {
      e2.host && e2.host.close();
    }, goTo(t2) {
      e2.host && e2.host.goTo(t2);
    }, get isOpen() {
      return e2.host?.getOpen() ?? false;
    } };
    return t.set(r2, e2), r2;
  }
  e.s(["bindLightboxHandle", 0, function(e2, t2) {
    let s2 = r(e2);
    for (let e3 of (s2.host = t2, s2.triggers.values())) t2.syncTrigger(e3);
    n(s2);
  }, "createHandle", 0, s, "getHandleTrigger", 0, function(e2, t2) {
    return r(e2).triggers.get(t2);
  }, "getLightboxHandleSnapshot", 0, function(e2) {
    let t2 = r(e2);
    return { open: t2.host?.getOpen() ?? false, activeIndex: t2.host?.getActiveIndex() ?? 0, version: t2.version };
  }, "getLightboxHandleVersion", 0, function(e2) {
    return r(e2).version;
  }, "notifyLightboxHandle", 0, function(e2) {
    n(r(e2));
  }, "registerHandleTrigger", 0, function(e2, t2) {
    let s2 = r(e2), i2 = s2.triggers.get(t2.id);
    return i2 && i2 !== t2 && s2.host?.unsyncTrigger(i2), s2.triggers.set(t2.id, t2), s2.host?.syncTrigger(t2), n(s2), () => {
      s2.triggers.get(t2.id) === t2 && (s2.triggers.delete(t2.id), s2.host?.unsyncTrigger(t2), n(s2));
    };
  }, "subscribeLightboxHandle", 0, function(e2, t2) {
    let n2 = r(e2);
    return n2.listeners.add(t2), () => {
      n2.listeners.delete(t2);
    };
  }, "touchHandleTrigger", 0, function(e2, t2) {
    let s2 = r(e2);
    s2.triggers.get(t2.id) === t2 && (s2.host?.syncTrigger(t2), n(s2));
  }, "unbindLightboxHandle", 0, function(e2, t2) {
    let s2 = r(e2);
    s2.host === t2 && (s2.host = null, n(s2));
  }], 206448);
  let i = s(), a = null, l = /* @__PURE__ */ new Set();
  e.s(["homeVideoLightbox", 0, i, "homeVideoLightboxInstantOpener", 0, { get: () => a, set: (e2) => {
    a = e2, l.forEach((e3) => e3());
  }, subscribe: (e2) => (l.add(e2), () => {
    l.delete(e2);
  }) }, "homeVideoPlayerPreload", 0, () => {
    e.A(243481);
  }], 43989);
}, 336400, (e) => {
  "use strict";
  var t = e.i(619882), r = e.i(155172), n = e.i(732935), s = e.i(152696), i = e.i(206448), a = e.i(709004), l = e.i(81324), o = e.i(396022), c = e.i(211862), d = e.i(757831), u = e.i(914040);
  function p(e2, t2, r2, n2) {
    e2 ? Promise.allSettled(e2.getAnimations().map((e3) => e3.finished)).then(() => {
      r2.current === t2 && n2();
    }) : n2();
  }
  function x(e2) {
    let { children: x2, license: h2, handle: g2, defaultOpen: f2 = false, open: m2, onOpenChange: b2, onOpenChangeComplete: v2, defaultValue: y2 = 0, value: j2, onValueChange: k2, loop: w2 = false, dir: A2, viewTransition: _2 = true, scrollTriggerIntoView: C2 = null, morphTo: S2 = "active", awaitImageDecode: N2 = true, onBeforeOpen: M2, onBeforeClose: E2 } = e2;
    r.useEffect(() => {
    }, [h2]);
    let R2 = A2 ?? "ltr", D2 = r.useRef(M2);
    r.useEffect(() => {
      D2.current = M2;
    }, [M2]);
    let L2 = r.useRef(E2);
    r.useEffect(() => {
      L2.current = E2;
    }, [E2]);
    let O2 = r.useRef(null), T2 = false === N2 ? 0 : true === N2 ? u.DEFAULT_DECODE_MAX_WAIT : Math.max(0, N2), P2 = void 0 !== m2, [F2, B2] = r.useState(f2), z2 = P2 ? m2 : F2, I2 = r.useRef(b2);
    r.useEffect(() => {
      I2.current = b2;
    }, [b2]);
    let $2 = r.useRef(v2);
    r.useEffect(() => {
      $2.current = v2;
    }, [v2]);
    let H2 = void 0 !== j2, [V2, U2] = r.useState(y2), W2 = H2 ? j2 : V2, [Q2, K2] = r.useState({ index: W2, direction: "forward" }), Z2 = Q2.direction;
    W2 !== Q2.index && (Z2 = W2 > Q2.index ? "forward" : "backward", K2({ index: W2, direction: Z2 }));
    let q2 = r.useRef(k2);
    r.useEffect(() => {
      q2.current = k2;
    }, [k2]);
    let Y2 = r.useRef(false), G2 = r.useCallback((e10, t2) => {
      Y2.current && ("keyboard" === t2 || "thumbnail" === t2 || "button" === t2) || (H2 || U2(e10), q2.current?.(e10, { source: t2 }));
    }, [H2]), J2 = r.useRef({ open: z2, activeIndex: W2 }), X2 = r.useRef(0);
    r.useEffect(() => {
      let e10 = J2.current;
      J2.current = { open: z2, activeIndex: W2 };
      let t2 = (0, o.resolveScrollTriggerOption)(C2, "onChange");
      return t2 && z2 && e10.open && e10.activeIndex !== W2 ? (window.clearTimeout(X2.current), X2.current = window.setTimeout(() => {
        if (!J2.current.open || J2.current.activeIndex !== W2) return;
        let e11 = (0, o.resolveTriggerIndex)(W2, S2, eO.current, eN.current);
        (0, o.scrollTriggerEl)(eN.current.get(e11), t2);
      }, 120), () => window.clearTimeout(X2.current)) : void 0;
    }, [C2, S2, z2, W2]);
    let ee2 = r.useRef(/* @__PURE__ */ new Set()), [et2, er2] = r.useState(0), en2 = r.useCallback((e10) => (ee2.current.add(e10), er2(ee2.current.size), () => {
      ee2.current.delete(e10), er2(ee2.current.size);
    }), []), es2 = r.useId(), ei2 = r.useRef(0), [ea, el] = r.useState(false), eo = r.useCallback(() => (ei2.current += 1, el(true), () => {
      ei2.current = Math.max(0, ei2.current - 1), 0 === ei2.current && el(false);
    }), []), ec = r.useRef(/* @__PURE__ */ new Map()), ed = r.useRef(/* @__PURE__ */ new Set()), eu = r.useCallback((e10) => (ed.current.add(e10), () => {
      ed.current.delete(e10);
    }), []), ep = r.useCallback((e10, t2) => (ec.current.set(e10, t2), ed.current.forEach((e11) => e11()), () => {
      ec.current.delete(e10), ed.current.forEach((e11) => e11());
    }), []), [ex, eh] = r.useState(() => P2 ? !!m2 : f2), [eg, ef] = r.useState(false), em = r.useRef(0), eb = r.useRef(void 0), ev = r.useCallback((e10) => {
      if (!e10) {
        eb.current = void 0;
        return;
      }
      let t2 = { preventScroll: true };
      void 0 !== eb.current && (t2.focusVisible = eb.current), eb.current = void 0, e10.focus(t2);
    }, []), ey = r.useRef(false), ej = r.useRef(/* @__PURE__ */ new Set()), ek = r.useCallback((e10) => (ej.current.add(e10), () => {
      ej.current.delete(e10);
    }), []), ew = r.useCallback(() => {
      ey.current = false, ej.current.forEach((e10) => e10());
    }, []), eA = r.useRef(null), e_ = r.useCallback(() => {
      if (eA.current || "u" < typeof document) return;
      let e10 = document.documentElement, t2 = document.body, r2 = Math.max(0, window.innerWidth - e10.clientWidth), n2 = e10.style.overflow, s2 = t2.style.paddingInlineEnd, i2 = e10.style.userSelect, a2 = e10.style.getPropertyValue("-webkit-user-select");
      if (e10.style.overflow = "hidden", e10.style.userSelect = "none", e10.style.setProperty("-webkit-user-select", "none"), r2 > 0) {
        let e11 = parseFloat(window.getComputedStyle(t2).paddingInlineEnd) || 0;
        t2.style.paddingInlineEnd = `${e11 + r2}px`;
      }
      eA.current = () => {
        e10.style.overflow = n2, t2.style.paddingInlineEnd = s2, e10.style.userSelect = i2, a2 ? e10.style.setProperty("-webkit-user-select", a2) : e10.style.removeProperty("-webkit-user-select");
      };
    }, []), eC = r.useCallback(() => {
      eA.current?.(), eA.current = null;
    }, []), eS = r.useRef(z2), eN = r.useRef(/* @__PURE__ */ new Map()), eM = r.useRef(/* @__PURE__ */ new WeakMap()), eE = r.useRef(null), eR = r.useRef(/* @__PURE__ */ new WeakMap()), eD = r.useRef(null), eL = r.useCallback(() => {
      L2.current?.({ destination: (0, d.findDestinationMorphTarget)(eE.current, eR.current, eD.current) });
    }, []), eO = r.useRef(0), eT = r.useRef(null), eP = r.useRef(null), eF = r.useRef(/* @__PURE__ */ new Map()), eB = r.useRef(/* @__PURE__ */ new Map()), ez = r.useRef(null), eI = r.useRef(null), e$ = r.useRef(null), eH = r.useRef(null), eV = r.useRef({ offsets: [], base: 0, step: 1, count: 0 }), eU = r.useRef(/* @__PURE__ */ new Set()), eW = r.useCallback((e10) => (eU.current.add(e10), () => {
      eU.current.delete(e10);
    }), []), eQ = r.useCallback(() => {
      eU.current.forEach((e10) => e10());
    }, []), eK = r.useRef(null), eZ = r.useCallback((e10, t2) => {
      let r2 = eK.current;
      r2 ? r2(e10, t2) : G2(e10, t2);
    }, [G2]), eq = r.useRef(W2);
    eq.current = W2;
    let eY = r.useRef(z2);
    eY.current = z2;
    let [eG, eJ] = r.useState(null), eX = r.useRef(null);
    r.useEffect(() => {
      eX.current = eG;
    }, [eG]);
    let e0 = r.useCallback((e10) => {
      eJ((t2) => "function" == typeof e10 ? e10(t2) : e10);
    }, []), e1 = r.useMemo(() => ({ publish: e0, activeZoomRef: eX }), [e0]), e22 = r.useCallback(() => {
      eh(true), e_(), P2 || B2(true), I2.current?.(true);
    }, [P2, e_]), e5 = r.useCallback(() => {
      eh(true), ef(true);
    }, []), e4 = r.useCallback(() => {
      ef(false), eh(true), e_(), P2 || B2(true), I2.current?.(true);
    }, [P2, e_]), e6 = r.useCallback(() => {
      ef(false), eh(false);
    }, []), e3 = r.useCallback(() => {
      P2 || B2(false), I2.current?.(false), (0, c.isAndroidBlinkSnapshotRoot)() ? ef(true) : eh(false);
    }, [P2]), e7 = r.useCallback(() => {
      ew(), $2.current?.(true);
    }, [ew]), e8 = r.useCallback((e10) => {
      eC(), ef(false), eh(false), ev(e10), $2.current?.(false);
    }, [eC, ev]), e9 = r.useRef(null), te = r.useRef(null);
    te.current = { morphTo: S2, scrollTriggerIntoView: C2, decodeMaxWait: T2, onBeforeOpenRef: D2, beforeOpenAbortRef: O2, triggerElementsRef: eN, triggerMorphElementsRef: eM, activeItemElementRef: eE, itemMorphElementsRef: eR, destinationMorphElementRef: eD, openingTriggerIndexRef: eO, openingTriggerElementRef: eT, activeIndexRef: eq, transitionPreset: _2, closeGenRef: em, commitPrepare: e5, commitReveal: e4, commitAbortPrepare: e6, commitClose: e3, onOpenComplete: e7, onCloseComplete: e8, activeZoomRef: eX };
    let tt = r.useCallback((e10, t2) => {
      em.current += 1, eb.current = e10 ? void 0 : t2?.focusVisible, O2.current?.abort(), O2.current = null, eS.current = e10, e10 && (0, l.prefetchZoomRuntime)(), e10 ? ey.current = true : (ew(), eL());
      let r2 = _2 && (0, u.supportsViewTransitions)() && !(0, u.isLowEndDevice)(), n2 = () => {
        if (e10) {
          e22();
          let e11 = em.current;
          requestAnimationFrame(() => {
            em.current === e11 && p(ez.current, e11, em, () => {
              let e12 = (0, o.resolveScrollTriggerOption)(C2, "onOpenComplete");
              if (e12) {
                let t3 = (0, o.resolveTriggerIndex)(eq.current, S2, eO.current, eN.current);
                (0, o.scrollTriggerEl)(eN.current.get(t3), e12);
              }
              ew(), $2.current?.(true);
            });
          });
        } else {
          let e11 = (0, o.resolveTriggerIndex)(eq.current, S2, eO.current, eN.current), t3 = (0, o.resolveScrollTriggerOption)(C2, "onClose");
          if (t3) {
            let r4 = eN.current.get(e11);
            (0, o.scrollTriggerEl)(r4, t3);
          }
          P2 || B2(false), I2.current?.(false);
          let r3 = em.current, n3 = eN.current.get(e11);
          p(ez.current, r3, em, () => {
            eh(false), eC(), requestAnimationFrame(() => ev(n3)), $2.current?.(false);
          });
        }
      };
      if (r2) {
        let t3 = em.current, r3 = (r4) => {
          em.current === t3 && (r4.ensureVtStructuralStyles(), e9.current ?? (e9.current = r4.createViewTransitionMorph(() => te.current)), e10 ? e9.current.open() : e9.current.close());
        }, s2 = (0, a.getMorphRuntimeSync)();
        s2 ? r3(s2) : (0, a.loadMorphRuntime)().then(r3, (e11) => {
          em.current === t3 && n2();
        });
      } else n2();
    }, [P2, _2, C2, S2, e22, eC, ew, ev, eL]);
    r.useEffect(() => {
      if (z2 === eS.current) return;
      if (eS.current = z2, z2) {
        eT.current = null, eP.current = null, eh(true), e_();
        return;
      }
      let e10 = ++em.current;
      eL(), p(ez.current, e10, em, () => {
        eh(false), eC();
      });
    }, [z2, e_, eC, eL]), r.useEffect(() => (ex && !eg && e_(), () => eC()), []), r.useEffect(() => {
      if (!(false === _2 || !(0, u.supportsViewTransitions)() || (0, u.isLowEndDevice)())) return function(e10) {
        if ("u" < typeof window) return () => {
        };
        let t2 = window;
        if ("function" == typeof t2.requestIdleCallback) {
          let r3 = t2.requestIdleCallback(e10, { timeout: 1e3 });
          return () => t2.cancelIdleCallback?.(r3);
        }
        let r2 = window.setTimeout(e10, 200);
        return () => window.clearTimeout(r2);
      }(a.prefetchMorphRuntime);
    }, [_2]);
    let tr = r.useCallback((e10, t2) => {
      let r2 = e10, n2 = null, s2 = null;
      if (t2?.triggerId) {
        let a2 = g2 ? (0, i.getHandleTrigger)(g2, t2.triggerId) : void 0, l2 = eB.current.get(t2.triggerId), o2 = a2 ?? l2;
        o2 && (r2 = e10 ?? o2.index, n2 = o2.element, s2 = o2.image);
      }
      void 0 !== r2 && (eO.current = r2, G2(r2, "imperative")), n2 ? (eT.current = n2, eP.current = s2) : void 0 !== r2 ? (eT.current = eN.current.get(r2) ?? null, eP.current = eF.current.get(r2) ?? null) : (eT.current = null, eP.current = null), false !== _2 && (0, a.prefetchMorphRuntime)(), (0, l.prefetchZoomRuntime)(), tt(true);
    }, [g2, G2, tt, _2]), tn = r.useCallback(() => tt(false), [tt]), ts = r.useCallback((e10) => G2(e10, "imperative"), [G2]);
    r.useLayoutEffect(() => {
      if (!g2) return;
      let e10 = { open: tr, close: tn, goTo: ts, getOpen: () => eY.current, getActiveIndex: () => eq.current, syncTrigger: (e11) => {
        eB.current.set(e11.id, { id: e11.id, index: e11.index, element: e11.element, image: e11.image }), e11.element && (eN.current.set(e11.index, e11.element), e11.morphElement ? eM.current.set(e11.element, e11.morphElement) : eM.current.delete(e11.element)), e11.image && eF.current.set(e11.index, e11.image);
      }, unsyncTrigger: (e11) => {
        let t2 = eB.current.get(e11.id);
        t2?.element === e11.element && eB.current.delete(e11.id), e11.element && eN.current.get(e11.index) === e11.element && (eN.current.delete(e11.index), eM.current.delete(e11.element)), e11.image && eF.current.get(e11.index) === e11.image && eF.current.delete(e11.index);
      } };
      return (0, i.bindLightboxHandle)(g2, e10), () => (0, i.unbindLightboxHandle)(g2, e10);
    }, [g2, tr, tn, ts]), r.useEffect(() => {
      g2 && (0, i.notifyLightboxHandle)(g2);
    }, [g2, z2, W2]);
    let ti = r.useMemo(() => ({ open: z2, setOpen: tt, mounted: ex, preparing: eg, openTransitionPendingRef: ey, subscribeOpenComplete: ek, activeIndex: W2, direction: Z2, dir: R2, dirAttribute: A2, setActiveIndex: G2, navigationLockedRef: Y2, itemCount: et2, registerItem: en2, loop: w2, baseId: es2, hasTablist: ea, registerTablist: eo, captionsRef: ec, registerCaption: ep, subscribeCaptions: eu, dialogElementRef: ez, stageElementRef: eI, backdropElementRef: e$ }), [z2, tt, ex, eg, ek, W2, Z2, R2, A2, G2, et2, en2, w2, es2, ea, eo, ep, eu]), ta = r.useMemo(() => ({ viewTransition: false !== _2, transitionPreset: _2, morphTo: S2, triggerElementsRef: eN, triggerMorphElementsRef: eM, activeItemElementRef: eE, itemMorphElementsRef: eR, destinationMorphElementRef: eD, openingTriggerIndexRef: eO, openingTriggerElementRef: eT, openingTriggerImageRef: eP, triggerImageElementsRef: eF, triggerIdsRef: eB }), [_2, S2]), tl = r.useMemo(() => ({ slidesViewportRef: eH, slidesGeometryRef: eV, subscribeSlidesViewport: eW, notifySlidesViewport: eQ, thumbnailStripSelectRef: eK, navigate: eZ }), [eW, eQ, eZ]), to = r.useMemo(() => ({ ...ti, ...ta, ...tl }), [ti, ta, tl]);
    return (0, t.jsx)(n.LightboxContext.Provider, { value: to, children: (0, t.jsx)(s.LightboxZoomPublishContext.Provider, { value: e1, children: (0, t.jsx)(s.LightboxActiveZoomContext.Provider, { value: eG, children: x2 }) }) });
  }
  x.displayName = "LightboxRoot";
  var h = e.i(497286), g = e.i(440066), f = e.i(337122), m = e.i(248097);
  let b = "u" > typeof window ? r.useLayoutEffect : r.useEffect, v = r.createContext({ keepMounted: false });
  function y() {
    return r.useContext(v);
  }
  function j(e2) {
    return null === e2 ? "inplace" : void 0 === e2 ? "u" > typeof document ? document.body : null : "object" == typeof e2 && null !== e2 && "current" in e2 ? e2.current : e2;
  }
  let k = r.forwardRef(function(e2, s2) {
    let { children: i2, container: a2, keepMounted: l2 = false, className: o2, style: c2, ...d2 } = e2, { mounted: u2, transitionPreset: p2, dirAttribute: x2 } = (0, n.useLightboxContext)(), y2 = (0, m.resolveViewTransitionTiming)(p2), k2 = { [f.LightboxDocumentCssVars.vtDuration]: `${y2.duration}ms`, [f.LightboxDocumentCssVars.vtEasing]: y2.cssEasing, [f.LightboxDocumentCssVars.vtRootEasing]: y2.cssRootEasing, ...c2 }, [w2, A2] = r.useState(() => j(a2)), _2 = r.useMemo(() => ({ keepMounted: l2 }), [l2]);
    if (b(() => {
      A2(j(a2));
    }, [a2]), !(u2 || l2) || null === w2) return null;
    let C2 = (0, t.jsx)(v.Provider, { value: _2, children: (0, t.jsx)("div", { ref: s2, className: o2, style: k2, dir: x2, ...d2, ...{ [g.LightboxPortalDataAttributes.portal]: "" }, children: i2 }) });
    return "inplace" === w2 ? C2 : h.createPortal(C2, w2);
  });
  k.displayName = "LightboxPortal";
  var w = e.i(215350), A = e.i(392337), _ = e.i(763324);
  let C = { [g.LightboxBackdropDataAttributes.open]: "" }, S = { [g.LightboxBackdropDataAttributes.closed]: "" }, N = { open: (e2) => e2 ? C : S }, M = r.forwardRef(function(e2, t2) {
    let { render: s2, ...i2 } = e2, { open: a2, mounted: l2, preparing: o2, setOpen: c2, backdropElementRef: d2 } = (0, n.useLightboxContext)(), { keepMounted: u2 } = y(), p2 = l2 || u2, x2 = u2 && !l2, h2 = r.useCallback((e3) => {
      d2.current = e3, "function" == typeof t2 ? t2(e3) : t2 && (t2.current = e3);
    }, [t2, d2]), f2 = r.useCallback(() => {
      l2 && c2(false, { focusVisible: false });
    }, [l2, c2]), m2 = r.useMemo(() => ({ open: a2 }), [a2]), b2 = (0, _.useRender)({ render: s2, ref: h2, state: m2, stateAttributesMapping: N, props: (0, A.mergeProps)({ [g.LightboxBackdropDataAttributes.backdrop]: "", "aria-hidden": true, ...(0, w.inertWhen)(x2), onClick: f2, style: { ...o2 || x2 ? { visibility: "hidden" } : null, ...x2 ? { pointerEvents: "none" } : null } }, i2), defaultTagName: "div" });
    return p2 ? b2 : null;
  });
  M.displayName = "LightboxBackdrop";
  let E = null, R = null;
  var D = e.i(483652);
  function L({ hostRef: e2, disabled: t2 = false }) {
    r.useEffect(() => {
      if (t2) return;
      let r2 = e2.current;
      if (!r2) return;
      let n2 = false, s2 = 0, i2 = 0, a2 = "pending", l2 = () => {
        n2 = false, a2 = "pending";
      }, o2 = (e3) => {
        if (1 !== e3.touches.length) return void l2();
        let t3 = e3.touches[0];
        n2 = true, a2 = "pending", s2 = t3.clientX, i2 = t3.clientY;
      }, c2 = (e3) => {
        if (!n2) return;
        if (1 !== e3.touches.length) {
          a2 = "allow";
          return;
        }
        let t3 = e3.touches[0];
        if ("pending" === a2) {
          let n3 = t3.clientX - s2, l3 = t3.clientY - i2;
          if (6 > Math.max(Math.abs(n3), Math.abs(l3))) return;
          a2 = Math.abs(n3) > Math.abs(l3) ? "allow" : !function(e4, t4, r3) {
            let n4 = e4 instanceof Element ? e4 : null;
            for (; n4 && n4 !== t4; ) {
              if (n4 instanceof HTMLElement && function(e5, t5) {
                var r4;
                return !(e5.scrollHeight <= e5.clientHeight) && ("auto" === (r4 = getComputedStyle(e5).overflowY) || "scroll" === r4) && (t5 > 0 ? e5.scrollTop > 0 : e5.scrollTop < e5.scrollHeight - e5.clientHeight - 1);
              }(n4, r3)) return true;
              n4 = n4.parentElement;
            }
            return false;
          }(e3.target, r2, l3) ? "prevent" : "allow";
        }
        "prevent" === a2 && e3.cancelable && e3.preventDefault();
      }, d2 = (e3) => {
        0 === e3.touches.length && l2();
      };
      return r2.addEventListener("touchstart", o2, { passive: true }), r2.addEventListener("touchmove", c2, { passive: false }), r2.addEventListener("touchend", d2, { passive: true }), r2.addEventListener("touchcancel", d2, { passive: true }), () => {
        r2.removeEventListener("touchstart", o2), r2.removeEventListener("touchmove", c2), r2.removeEventListener("touchend", d2), r2.removeEventListener("touchcancel", d2);
      };
    }, [e2, t2]);
  }
  let O = [f.LightboxContentCssVars.pullProgress, f.LightboxContentCssVars.pullSnapDuration, f.LightboxContentCssVars.pullSnapEasing, f.LightboxContentCssVars.zoomProgress], T = "u" > typeof window ? r.useLayoutEffect : r.useEffect;
  function P(e2) {
    return Array.from(e2.querySelectorAll('a[href],area[href],input:not([disabled]):not([type="hidden"]),select:not([disabled]),textarea:not([disabled]),button:not([disabled]),[tabindex]:not([tabindex="-1"])')).filter((e3) => !e3.hasAttribute("data-focus-guard"));
  }
  function F(e2) {
    return !e2 || e2 === document.body || e2 === document.documentElement;
  }
  let B = { position: "fixed", overflow: "hidden", width: 1, height: 1, top: 0, insetInlineStart: 0, padding: 0, border: 0, clip: "rect(0, 0, 0, 0)", whiteSpace: "nowrap" }, z = r.forwardRef(function(i2, a2) {
    let { className: l2, children: o2, pullToClose: c2 = true, style: d2, ...u2 } = i2, { open: p2, mounted: x2, preparing: h2, setOpen: f2, activeIndex: m2, navigate: b2, itemCount: v2, loop: j2, dialogElementRef: k2, stageElementRef: _2, backdropElementRef: C2, activeItemElementRef: S2, destinationMorphElementRef: N2, navigationLockedRef: M2, baseId: z2, dir: I2 } = (0, n.useLightboxContext)(), { keepMounted: $2 } = y(), H2 = x2 || $2, V2 = $2 && !x2, { activeZoomRef: U2 } = (0, s.useLightboxZoomPublish)(), W2 = r.useRef(null), Q2 = r.useRef(p2);
    Q2.current = p2;
    let K2 = r.useCallback((e2) => {
      W2.current = e2, k2.current = e2, "function" == typeof a2 ? a2(e2) : a2 && (a2.current = e2);
    }, [a2, k2]);
    T(() => {
      x2 && !h2 && W2.current?.focus({ preventScroll: true });
    }, [x2, h2]), r.useEffect(() => {
    }, [x2, V2]), r.useEffect(() => {
      if (!x2) return;
      let e2 = W2.current;
      if (!e2) return;
      let t2 = (t3) => {
        if (!Q2.current) return;
        let r2 = t3.relatedTarget;
        r2 && e2.contains(r2) || (!r2 || F(r2)) && queueMicrotask(() => {
          if (!Q2.current) return;
          let t4 = document.activeElement;
          t4 && e2.contains(t4) || (!t4 || F(t4)) && e2.focus({ preventScroll: true });
        });
      };
      return e2.addEventListener("focusout", t2), () => e2.removeEventListener("focusout", t2);
    }, [x2]), r.useEffect(() => {
      let e2, t2;
      if (!x2) return;
      let r2 = false, n2 = (e3) => {
        (e3.touches.length > 1 || r2) && e3.preventDefault();
      }, s2 = (e3) => {
        e3.touches.length > 1 && (r2 = true);
      }, i3 = (e3) => {
        0 === e3.touches.length && (r2 = false);
      };
      return document.addEventListener("touchmove", n2, { passive: false }), document.addEventListener("touchstart", s2, { passive: true }), document.addEventListener("touchend", i3, { passive: true }), document.addEventListener("touchcancel", i3, { passive: true }), "GestureEvent" in window ? (e2 = (e3) => e3.preventDefault(), document.addEventListener("gesturestart", e2), document.addEventListener("gesturechange", e2)) : (t2 = (e3) => {
        e3.ctrlKey && e3.preventDefault();
      }, document.addEventListener("wheel", t2, { passive: false })), () => {
        document.removeEventListener("touchmove", n2), document.removeEventListener("touchstart", s2), document.removeEventListener("touchend", i3), document.removeEventListener("touchcancel", i3), e2 && (document.removeEventListener("gesturestart", e2), document.removeEventListener("gesturechange", e2)), t2 && document.removeEventListener("wheel", t2);
      };
    }, [x2]);
    let Z2 = r.useCallback(() => U2.current?.getZoom() ?? 1, [U2]), q2 = r.useCallback(() => f2(false, { focusVisible: false }), [f2]), Y2 = E, [G2, J2] = r.useState(() => Y2?.PullToDismiss ?? null);
    r.useEffect(() => {
      if (!c2 || G2) return;
      let t2 = false;
      return (E ? Promise.resolve(E) : (R ?? (R = e.A(818317).then((e2) => E = { PullToDismiss: e2.PullToDismiss }, (e2) => {
        throw R = null, e2;
      })), R)).then((e2) => {
        t2 || J2(() => e2.PullToDismiss);
      }, (e2) => {
      }), () => {
        t2 = true;
      };
    }, [c2, G2]), L({ hostRef: W2, disabled: !x2 }), L({ hostRef: C2, disabled: !x2 });
    let X2 = function({ mounted: e2, contentRef: t2, setOpen: n2, activeZoomRef: s2, stageElementRef: i3, itemCount: a3, loop: l3, activeIndex: o3, navigate: c3, dir: d3, isScrollingRef: u3 }) {
      return r.useCallback((r2) => {
        if (!e2) return;
        let p3 = t2.current, x3 = r2.target;
        if (p3 && x3 && !p3.contains(x3) || r2.defaultPrevented) return;
        if ("Escape" === r2.key) {
          r2.preventDefault(), n2(false, { focusVisible: true });
          return;
        }
        let h3 = x3 instanceof HTMLElement ? x3 : null;
        if (h3 && (h3.isContentEditable || h3.closest('input, textarea, select, [contenteditable]:not([contenteditable="false"])'))) return;
        let g2 = s2.current;
        if (r2.metaKey || r2.ctrlKey || r2.altKey) return;
        let f3 = i3.current, m3 = !!f3 && !!x3 && x3 !== p3 && !f3.contains(x3), b3 = "+" === r2.key || "=" === r2.key, v3 = "-" === r2.key || "_" === r2.key, y2 = "0" === r2.key;
        if (b3 || v3 || y2) {
          if (r2.preventDefault(), u3?.current) return;
          g2 && !m3 && (b3 ? g2.zoomIn() : v3 ? g2.zoomOut() : g2.reset());
          return;
        }
        let j3 = r2.key.startsWith("Arrow");
        if ((j3 || "Home" === r2.key || "End" === r2.key) && m3) return;
        if (j3 && (g2?.getZoom() ?? 1) > 1 && g2) {
          let e3 = g2.keyboardPanDistance;
          switch (r2.key) {
            case "ArrowRight":
              g2.panBy(e3, 0);
              break;
            case "ArrowLeft":
              g2.panBy(-e3, 0);
              break;
            case "ArrowDown":
              g2.panBy(0, e3);
              break;
            case "ArrowUp":
              g2.panBy(0, -e3);
              break;
            default:
              return;
          }
          r2.preventDefault();
          return;
        }
        if (0 === a3) return;
        let k3 = null, w2 = (0, D.arrowKeyIndexDelta)(r2.key, d3);
        if (0 !== w2) k3 = l3 ? (o3 + w2 + a3) % a3 : Math.min(Math.max(o3 + w2, 0), a3 - 1);
        else if ("Home" === r2.key) k3 = 0;
        else {
          if ("End" !== r2.key) return;
          k3 = a3 - 1;
        }
        null !== k3 && k3 !== o3 && (r2.preventDefault(), c3(k3, "keyboard"));
      }, [e2, o3, a3, l3, c3, n2, s2, i3, u3, d3]);
    }({ mounted: x2, contentRef: W2, setOpen: f2, activeZoomRef: U2, stageElementRef: _2, itemCount: v2, loop: j2, activeIndex: m2, navigate: b2, dir: I2, isScrollingRef: M2 }), ee2 = r.useRef(false), et2 = r.useCallback((e2) => {
      ee2.current = e2.target === e2.currentTarget;
    }, []), er2 = r.useCallback((e2) => {
      if (!x2) return;
      let t2 = ee2.current;
      ee2.current = false, t2 && e2.target === e2.currentTarget && f2(false, { focusVisible: false });
    }, [x2, f2]), en2 = r.useCallback(() => {
      let e2 = W2.current;
      if (!e2) return;
      let t2 = P(e2);
      (t2[t2.length - 1] ?? e2).focus();
    }, []), es2 = r.useCallback(() => {
      let e2 = W2.current;
      e2 && (P(e2)[0] ?? e2).focus();
    }, []);
    if (!H2) return null;
    let ei2 = (0, A.mergeProps)({ role: "dialog", id: `${z2}-content`, "aria-modal": V2 ? void 0 : "true", "aria-hidden": !!V2 || void 0, ...(0, w.inertWhen)(V2), className: l2, style: { overflow: "hidden", overscrollBehavior: "contain", userSelect: "none", WebkitUserSelect: "none", ...function(e2) {
      if (!e2) return null;
      let t2 = null;
      for (let r2 of O) {
        let n2 = e2.style.getPropertyValue(r2);
        n2 && (t2 || (t2 = {}), t2[r2] = n2);
      }
      return t2;
    }(W2.current), ...d2, ...h2 || V2 ? { visibility: "hidden" } : null, ...V2 ? { pointerEvents: "none" } : null }, ...p2 ? { [g.LightboxContentDataAttributes.open]: "" } : { [g.LightboxContentDataAttributes.closed]: "" }, onKeyDown: X2, onPointerDown: et2, onClick: er2, tabIndex: V2 ? void 0 : -1 }, { [g.LightboxContentDataAttributes.content]: "" }, u2);
    return (0, t.jsxs)(t.Fragment, { children: [V2 ? null : (0, t.jsx)("span", { tabIndex: 0, "data-focus-guard": "", style: B, onFocus: en2 }), (0, t.jsx)("div", { ref: K2, ...ei2, children: o2 }), c2 && x2 && G2 ? (0, t.jsx)(G2, { contentRef: W2, backdropRef: C2, activeItemRef: S2, destinationMorphElementRef: N2, stageRef: _2, getZoom: Z2, onClose: q2, isScrollingRef: M2 }) : null, V2 ? null : (0, t.jsx)("span", { tabIndex: 0, "data-focus-guard": "", style: B, onFocus: es2 })] });
  });
  z.displayName = "LightboxContent";
  var I = e.i(353401);
  let $ = r.forwardRef(function(e2, t2) {
    let { render: s2, ...i2 } = e2, { setOpen: a2 } = (0, n.useLightboxContext)(), l2 = r.useCallback((e3) => {
      a2(false, { focusVisible: 0 === e3.detail });
    }, [a2]), o2 = r.useMemo(() => ({}), []), c2 = (0, I.useAccessibleNameWarning)("Lightbox.Close", t2);
    return (0, _.useRender)({ render: s2, ref: c2, state: o2, props: (0, A.mergeProps)({ type: "button", [g.LightboxCloseDataAttributes.close]: "", onClick: l2 }, i2), defaultTagName: "button" });
  });
  $.displayName = "LightboxClose";
  var H = e.i(483011), H = H, V = H, U = e.i(472197);
  let W = r.createContext(null), Q = { placeholder: (e2) => e2 ? { "data-placeholder": "" } : null }, K = r.forwardRef(function(e2, n2) {
    let { render: s2, children: i2, style: a2, id: l2, width: o2, height: c2, ...d2 } = e2, u2 = (0, V.useOptionalLightboxItemContext)(), p2 = r.useId(), x2 = l2 ?? p2, h2 = r.useRef(null), [f2, m2] = r.useState(false), [b2, v2] = r.useState(null), [y2, j2] = r.useState(null), k2 = r.useRef(null), w2 = o2 ?? y2?.width, C2 = c2 ?? y2?.height, S2 = !!(w2 && C2 && w2 > 0 && C2 > 0), N2 = r.useCallback((e3) => {
      h2.current = e3, v2(e3), u2?.registerMedia(e3), u2?.registerPlaceholder(e3 ? m2 : null), "function" == typeof n2 ? n2(e3) : n2 && (n2.current = e3), !e3 && k2.current && (u2?.imageRef(null), k2.current = null);
    }, [n2, u2, m2]), M2 = r.useRef(null), E2 = r.useCallback(() => {
      let e3 = M2.current;
      e3 && (e3.remove(), M2.current = null);
    }, []), R2 = r.useCallback(() => {
      let e3 = h2.current;
      if (!e3 || !u2) return;
      let t2 = Array.from(e3.children).find((e4) => e4 instanceof HTMLImageElement && e4 !== M2.current), r2 = Array.from(e3.querySelectorAll("img")).find((e4) => e4 !== M2.current), n3 = t2 ?? r2 ?? null;
      if (n3) {
        let e4, t3;
        E2();
        let r3 = (e4 = Number(n3.getAttribute("width")) || n3.naturalWidth, t3 = Number(n3.getAttribute("height")) || n3.naturalHeight, e4 > 0 && t3 > 0 ? { width: e4, height: t3 } : null);
        j2((e5) => e5?.width === r3?.width && e5?.height === r3?.height ? e5 : r3), n3 !== k2.current && (k2.current = n3, u2.imageRef(n3));
        return;
      }
      let s3 = e3.querySelector("video"), i3 = s3?.getAttribute("poster") || s3?.poster || "";
      if (s3 && i3) {
        let t3 = M2.current;
        if (!t3) {
          (t3 = document.createElement("img")).setAttribute("data-ramka-media-poster", ""), t3.alt = "", t3.setAttribute("aria-hidden", "true");
          let r4 = t3.style;
          r4.position = "absolute", r4.inset = "0", r4.width = "100%", r4.height = "100%", r4.opacity = "0", r4.pointerEvents = "none", e3.insertBefore(t3, e3.firstChild), M2.current = t3;
        }
        let r3 = getComputedStyle(s3);
        t3.style.objectFit = "contain" === r3.objectFit ? "contain" : "cover", t3.style.objectPosition = r3.objectPosition || "center", t3.getAttribute("src") !== i3 && (t3.src = i3), j2((e4) => null === e4 ? e4 : null), t3 !== k2.current && (k2.current = t3, u2.imageRef(t3));
        return;
      }
      E2(), j2(null), k2.current && (u2.imageRef(null), k2.current = null);
    }, [E2, u2]);
    r.useLayoutEffect(() => {
      R2();
      let e3 = h2.current;
      if (!e3) return;
      let t2 = new MutationObserver(R2);
      return t2.observe(e3, { childList: true, subtree: true }), () => {
        t2.disconnect(), E2(), k2.current && (u2?.imageRef(null), k2.current = null);
      };
    }, [E2, u2, R2]);
    let D2 = r.useMemo(() => ({ placeholder: f2 }), [f2]), L2 = r.useMemo(() => ({ element: b2 }), [b2]), O2 = r.useMemo(() => {
      let e3 = { position: "relative", flexShrink: 0, display: "grid", isolation: "isolate" };
      return S2 && w2 && C2 && Object.assign(e3, { width: `min(100cqw, calc(100cqh * ${w2 / C2}))`, aspectRatio: `${w2} / ${C2}` }), e3;
    }, [S2, C2, w2]);
    r.useInsertionEffect(() => {
      let e3, t2 = (0, U.insertLibrarySheet)((e3 = "u" > typeof CSS && "function" == typeof CSS.escape ? CSS.escape(x2) : x2.replace(/([^\w-])/g, "\\$1"), `#${e3} > img:not([data-ramka-media-poster]),#${e3} > video,#${e3} > canvas{width:100%;height:100%;min-width:0;min-height:0;}`), "data-ramka-media-fill");
      return () => t2.release();
    }, [x2]);
    let T2 = (0, _.useRender)({ render: s2, ref: N2, state: D2, stateAttributesMapping: Q, props: (0, A.mergeProps)({ id: x2, [g.LightboxMediaDataAttributes.media]: "", ...S2 && w2 && C2 ? { [g.LightboxMediaDataAttributes.width]: String(w2), [g.LightboxMediaDataAttributes.height]: String(C2) } : null, style: { ...O2, ...a2 } }, d2, { children: i2 }), defaultTagName: "div" });
    return (0, t.jsx)(W.Provider, { value: L2, children: T2 });
  });
  K.displayName = "LightboxMedia";
  var Z = e.i(927612), q = e.i(215504), Y = e.i(15077), G = e.i(130154), J = e.i(906564), X = e.i(923314);
  function ee({ className: e2, render: r2 }) {
    return (0, G.useRender)({ render: r2 ?? (0, t.jsx)(Y.default, { href: X.SIGN_UP_HOME_HREF }), props: { "aria-label": "Close", className: (0, Z.cx)("flex", "after:absolute after:bottom-0 after:left-1/2 after:size-11", "after:-translate-x-1/2", e2), children: (0, t.jsx)(J.Glyph, { children: (0, t.jsx)(et, { className: "size-2.5" }) }) } });
  }
  function et({ className: e2 }) {
    return (0, t.jsx)("svg", { "aria-hidden": "true", viewBox: "0 0 10 10", fill: "currentColor", className: e2, children: (0, t.jsx)("path", { d: "M1.5 10 0 8.5 3.5 5 0 1.5 1.5 0 5 3.5 8.5 0 10 1.5 6.5 5 10 8.5 8.5 10 5 6.5 1.5 10Z" }) });
  }
  var er = e.i(43989), en = e.i(490865);
  let es = (0, Z.cx)("opacity-0 transition-opacity", "duration-(--lightbox-vt-duration) ease-(--lightbox-vt-root-easing)", "data-open:opacity-100 data-open:starting:opacity-0", "in-data-ramka-view-transition:transition-none", "motion-reduce:transition-none"), ei = (0, q.default)(() => e.A(98167), { loadableGenerated: { modules: [953408] }, ssr: false });
  e.s(["HomeVideoLightboxRoot", 0, function({ playbackId: e2, width: n2, height: s2 }) {
    let i2 = (0, r.useRef)(null), a2 = (0, r.useRef)(false), l2 = (0, r.useRef)(null), o2 = (0, r.useRef)(null), c2 = (e3) => o2.current?.toggleAttribute("data-revealed", e3), d2 = () => {
      l2.current && (l2.current.style.visibility = "hidden");
    }, u2 = `https://image.mux.com/${e2}/thumbnail.webp?width=1920&time=0`;
    (0, h.preload)(u2, { as: "image", fetchPriority: "low" }), (0, r.useEffect)(() => {
      let e3 = new Image();
      e3.src = u2, e3.decode().catch(() => {
      });
    }, [u2]);
    let p2 = (0, r.useSyncExternalStore)(er.homeVideoLightboxInstantOpener.subscribe, er.homeVideoLightboxInstantOpener.get, () => null), [g2, f2] = (0, r.useState)(true), m2 = (0, r.useRef)(null), b2 = null !== p2 || !g2;
    return (0, r.useEffect)(() => {
      let e3, t2, r2;
      return e3 = document.documentElement, t2 = 0, (r2 = new MutationObserver(() => {
        if (cancelAnimationFrame(t2), !e3.hasAttribute("data-ramka-view-transition")) return;
        let r3 = 20, n3 = () => {
          !function() {
            let e4 = document.getAnimations().find((e5) => e5.effect?.pseudoElement === "::view-transition-group(lightbox-morph)" && !(e5 instanceof CSSAnimation))?.effect;
            if (!e4) return false;
            let t3 = e4.getKeyframes(), r4 = t3[0], n4 = t3.at(-1);
            return !r4 || !n4 || (e4.setKeyframes([{ transform: r4.transform }, { transform: n4.transform }]), e4.updateTiming({ duration: 300, easing: "cubic-bezier(0.77, 0, 0.175, 1)" }), true);
          }() && --r3 > 0 && (t2 = requestAnimationFrame(n3));
        };
        n3();
      })).observe(e3, { attributeFilter: ["data-ramka-view-transition"] }), () => {
        r2.disconnect(), cancelAnimationFrame(t2);
      };
    }, []), (0, r.useEffect)(() => () => {
      er.homeVideoLightboxInstantOpener.set(null), en.homeVideoLightboxOpen.set(false);
    }, []), (0, r.useEffect)(() => {
      p2 && !er.homeVideoLightbox.isOpen && er.homeVideoLightbox.open(0);
    }, [p2]), (0, t.jsx)(x, { handle: er.homeVideoLightbox, license: "commercial", morphTo: "origin", viewTransition: !b2 && "default", onOpenChange: en.homeVideoLightboxOpen.set, onOpenChangeComplete: (e3) => {
      if (!e3) {
        m2.current?.(), m2.current = null, f2(true), p2 && (requestAnimationFrame(() => p2.focus({ preventScroll: true })), er.homeVideoLightboxInstantOpener.set(null));
        return;
      }
      c2(true);
      let t2 = document.getElementById("home-footer-video");
      if (!p2 && t2) {
        let e4 = () => {
          let { top: e5, bottom: r3, left: n3, right: s3 } = t2.getBoundingClientRect();
          f2(r3 > 0 && e5 < window.innerHeight && s3 > 0 && n3 < window.innerWidth);
        };
        e4(), window.addEventListener("resize", e4), window.addEventListener("scroll", e4, true), m2.current = () => {
          window.removeEventListener("resize", e4), window.removeEventListener("scroll", e4, true);
        };
      }
      let r2 = i2.current;
      r2 ? r2.play()?.catch(d2) : a2.current = true;
    }, onBeforeClose: () => {
      a2.current = false;
      let e3 = i2.current;
      e3 && (e3.pause(), e3.currentTime = 0), l2.current && (l2.current.style.visibility = ""), c2(false);
    }, children: (0, t.jsxs)(k, { children: [(0, t.jsx)(M, { className: (0, Z.cx)("fixed inset-0 z-(--z-dialog) bg-black/70 lg:bg-black/50", "opacity-0 data-open:opacity-[calc(1-var(--lightbox-pull-progress,0))]", "transition-opacity data-pulling:transition-none motion-reduce:transition-none", "ease-[var(--lightbox-pull-snap-easing,var(--lightbox-vt-root-easing))]", b2 ? "duration-[var(--lightbox-pull-snap-duration,0ms)]" : (0, Z.cx)("duration-[var(--lightbox-pull-snap-duration,var(--lightbox-vt-duration))]", "data-open:starting:opacity-0", "in-data-ramka-view-transition:transition-none")) }), (0, t.jsxs)(z, { "aria-label": "Watch the video", className: (0, Z.cx)("fixed inset-0 z-(--z-dialog) outline-none", "grid place-items-center py-[calc(0.75rem+2.75rem)]", "[scrollbar-gutter:stable] overflow-hidden", b2 ? void 0 : es), style: { "--video-aspect-ratio": n2 / s2 }, children: [(0, t.jsx)(ee, { className: (0, Z.cx)("fixed size-11 items-center justify-center text-waitlist-gray", "top-[calc(0.75rem+env(safe-area-inset-top))]", "right-[calc(0.75rem+env(safe-area-inset-right))]"), render: (0, t.jsx)($, {}) }), (0, t.jsx)("div", { ref: o2, className: (0, Z.cx)("group [container-type:size] aspect-(--video-aspect-ratio)", "w-[min(100%,calc((100dvh-7rem)*var(--video-aspect-ratio)))]", "lg:w-[min(calc(min(100%,92.125rem)-100px),calc((100dvh-7rem)*var(--video-aspect-ratio)))]"), children: (0, t.jsx)(H.LightboxItem, { index: 0, children: (0, t.jsxs)(K, { width: n2, height: s2, className: (0, Z.cx)("overflow-hidden bg-[#77AA83]", "outline-1 outline-transparent", "group-data-revealed:outline-waitlist-dark-green", "group-data-revealed:transition-[outline-color] group-data-revealed:duration-250 group-data-revealed:ease-out-quint", "motion-reduce:transition-none"), children: [(0, t.jsx)(ei, { ref: (e3) => {
      i2.current = e3, e3 && a2.current && (a2.current = false, e3.play()?.catch(d2));
    }, className: (0, Z.cx)("col-start-1 row-start-1 size-full", "[--media-background-color:#77AA83]", "[--center-controls:none]", "[&::part(bottom)]:before:opacity-40"), playbackId: e2, poster: u2, minResolution: "720p", onPlaying: d2, accentColor: "#117025", metadata: { video_title: "Operate CRM Demo" } }), (0, t.jsx)("img", { ref: l2, className: "pointer-events-none relative col-start-1 row-start-1 size-full object-cover", src: u2, decoding: "sync", width: 1920, height: Math.round(1920 * s2 / n2), alt: "" })] }) }) })] })] }) });
  }], 336400);
}, 204916, (e) => {
  "use strict";
  var t = e.i(619882), r = e.i(155172), n = e.i(732935), s = e.i(440066), i = e.i(206448), a = e.i(709004), l = e.i(81324), o = e.i(392337), c = e.i(763324);
  let d = r.createContext(null), u = { open: (e2) => e2 ? { [s.LightboxTriggerDataAttributes.open]: "" } : null, active: (e2) => e2 ? { [s.LightboxTriggerDataAttributes.active]: "" } : null, morphTarget: function(e2) {
    return null;
  } }, p = () => () => {
  }, x = r.forwardRef(function(e2, x2) {
    let { render: h2, index: g2, id: f2, handle: m2, crossfade: b2, children: v2, ...y2 } = e2, j2 = r.useContext(n.LightboxContext);
    if (!j2 && !m2) throw Error("Lightbox.Trigger must be used within a Lightbox.Root, or passed a handle from Lightbox.createHandle()");
    let k2 = r.useId(), w2 = f2 ?? k2;
    r.useSyncExternalStore(m2 && !j2 ? (e3) => (0, i.subscribeLightboxHandle)(m2, e3) : p, () => m2 && !j2 ? (0, i.getLightboxHandleVersion)(m2) : 0, () => 0);
    let A2 = !j2 && m2 ? (0, i.getLightboxHandleSnapshot)(m2) : null, _2 = j2?.open ?? A2?.open ?? false, C = j2?.activeIndex ?? A2?.activeIndex ?? 0, S = j2?.morphTo ?? "active", N = j2?.triggerElementsRef, M = j2?.triggerMorphElementsRef, E = j2?.triggerImageElementsRef, R = j2?.triggerIdsRef, D = j2?.openingTriggerIndexRef, L = j2?.openingTriggerElementRef, O = j2?.openingTriggerImageRef, T = j2?.setOpen, P = j2?.setActiveIndex, F = r.useRef(null), B = r.useRef(null), z = r.useRef(null), I = r.useRef(null), $ = r.useCallback(() => {
      let e3 = I.current;
      m2 && e3 && (e3.index = g2, e3.element = F.current, e3.image = B.current, e3.morphElement = z.current, (0, i.touchHandleTrigger)(m2, e3));
    }, [m2, g2]);
    r.useLayoutEffect(() => {
      if (!m2) {
        I.current = null;
        return;
      }
      let e3 = { id: w2, index: g2, element: F.current, image: B.current, morphElement: z.current };
      return I.current = e3, (0, i.registerHandleTrigger)(m2, e3);
    }, [m2, w2, g2]), r.useLayoutEffect(() => {
      if (!f2 || !R) return;
      let e3 = { id: f2, index: g2, element: F.current, image: B.current };
      return R.current.set(f2, e3), () => {
        R.current.get(f2) === e3 && R.current.delete(f2);
      };
    }, [f2, g2, R]);
    let H = r.useCallback(() => {
      let e3 = F.current, t2 = M?.current;
      if (!e3 || !t2) return;
      let r2 = z.current;
      r2 ? t2.set(e3, r2) : t2.delete(e3), $();
    }, [M, $]), V = r.useCallback((e3) => {
      let t2 = F.current;
      if (F.current = e3, N ? e3 ? (N.current.set(g2, e3), H()) : (N.current.delete(g2), t2 && M?.current?.delete(t2)) : $(), f2 && R) {
        let t3 = R.current.get(f2);
        t3 ? t3.element = e3 : R.current.set(f2, { id: f2, index: g2, element: e3, image: B.current });
      }
      "function" == typeof x2 ? x2(e3) : x2 && (x2.current = e3);
    }, [x2, g2, f2, N, M, R, H, $]), U = r.useCallback((e3) => {
      if (B.current = e3, E && (e3 ? E.current.set(g2, e3) : E.current.delete(g2)), f2 && R) {
        let t2 = R.current.get(f2);
        t2 && (t2.image = e3);
      }
      $();
    }, [g2, f2, E, R, $]), W = r.useRef(false), Q = r.useRef(null), K = r.useCallback((e3) => {
      let t2 = F.current, r2 = z.current ?? t2, n2 = Q.current, i2 = s.LightboxTriggerDataAttributes.morphTarget;
      n2 && n2 !== r2 && n2.removeAttribute(i2), e3 && r2 ? (r2.setAttribute(i2, ""), Q.current = r2) : (r2?.removeAttribute(i2), n2 && n2 !== r2 && n2.removeAttribute(i2), Q.current = null);
    }, []), Z = r.useCallback((e3) => {
      z.current = e3, H(), W.current && K(true);
    }, [H, K]), q = r.useCallback(() => {
      if (j2 && T && P && D) {
        D.current = g2, L && (L.current = F.current), O && (O.current = B.current), P(g2, "trigger"), T(true);
        return;
      }
      m2?.open(g2, { triggerId: w2 });
    }, [j2, m2, w2, g2, P, T, D, L, O]), Y = r.useCallback(() => {
      j2?.viewTransition && (0, a.prefetchMorphRuntime)(), (0, l.prefetchZoomRuntime)();
    }, [j2?.viewTransition]), G = _2 && C === g2, J = j2 ? `${j2.baseId}-content` : void 0, X = j2 ? _2 && L?.current === F.current : _2, ee = r.useMemo(() => {
      if (!_2) return false;
      if (!N || !D) return G;
      if ("origin" === S) return g2 === D.current;
      if ("closest" === S) {
        if (N.current.has(C)) return C === g2;
        let e3 = -1, t2 = 1 / 0;
        for (let r2 of N.current.keys()) {
          let n2 = Math.abs(r2 - C);
          n2 < t2 && (t2 = n2, e3 = r2);
        }
        return g2 === e3;
      }
      return G;
    }, [_2, S, C, g2, G, D, N]);
    r.useLayoutEffect(() => (W.current = ee, K(ee), () => {
      W.current = false;
      let e3 = Q.current;
      e3 && (e3.removeAttribute(s.LightboxTriggerDataAttributes.morphTarget), Q.current = null);
    }), [ee, K]);
    let et = r.useMemo(() => ({ open: _2, active: G, morphTarget: ee }), [_2, G, ee]), er = r.useMemo(() => ({ imageRef: U, morphRef: Z, open: _2, active: G }), [U, Z, _2, G]), en = "function" == typeof v2 ? v2(er) : v2, es = (0, c.useRender)({ render: h2, ref: V, state: et, stateAttributesMapping: u, props: (0, o.mergeProps)({ type: "button", id: f2, "aria-haspopup": "dialog", "aria-expanded": X, ..._2 && J ? { "aria-controls": J } : null, onClick: q, onPointerEnter: Y, onFocus: Y, onPointerDown: Y, [s.LightboxTriggerDataAttributes.trigger]: "", ...b2 ? { [s.LightboxTriggerDataAttributes.crossfade]: b2 } : void 0 }, y2, { children: en }), defaultTagName: "button" });
    return (0, t.jsx)(d.Provider, { value: er, children: es });
  });
  x.displayName = "LightboxTrigger";
  var h = e.i(927612), g = e.i(819622), f = e.i(548544);
  let m = ({ bend: e2, side: r2 = "right", radius: n2, className: s2 }) => (0, t.jsx)("svg", { "aria-hidden": "true", className: (0, h.cx)("pointer-events-none absolute overflow-visible", "left" === r2 && "-scale-x-100", s2), fill: "none", stroke: "#117025", style: { width: n2, strokeWidth: "var(--home-rule)" }, children: "bottom" === e2 ? (0, t.jsxs)(t.Fragment, { children: [(0, t.jsx)("line", { x1: n2, x2: n2, y1: n2 - 1, y2: "100%", transform: `translate(0 ${-(n2 - 1)})` }), (0, t.jsx)("svg", { className: "overflow-visible", y: "100%", children: (0, t.jsx)("path", { d: `M${n2} ${-n2}A${n2} ${n2} 0 0 1 0 0` }) })] }) : (0, t.jsxs)(t.Fragment, { children: [(0, t.jsx)("path", { d: `M0 0A${n2} ${n2} 0 0 1 ${n2} ${n2}` }), (0, t.jsx)("line", { x1: n2, x2: n2, y1: n2 - 1, y2: "100%" })] }) });
  var b = e.i(519082);
  let v = { src: e.i(927874).default, width: 540, height: 326, blurWidth: 8, blurHeight: 5, blurDataURL: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAgAAAQABAAD/wAARCAAFAAgDAREAAhEBAxEB/9sAQwAKBwcIBwYKCAgICwoKCw4YEA4NDQ4dFRYRGCMfJSQiHyIhJis3LyYpNCkhIjBBMTQ5Oz4+PiUuRElDPEg3PT47/9sAQwEKCwsODQ4cEBAcOygiKDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD0Lb/pJO5vu9M8VnfU53vY/9k=" }, y = { src: e.i(644112).default, width: 540, height: 326, blurWidth: 8, blurHeight: 5, blurDataURL: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAgAAAQABAAD/wAARCAAFAAgDAREAAhEBAxEB/9sAQwAKBwcIBwYKCAgICwoKCw4YEA4NDQ4dFRYRGCMfJSQiHyIhJis3LyYpNCkhIjBBMTQ5Oz4+PiUuRElDPEg3PT47/9sAQwEKCwsODQ4cEBAcOygiKDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD0hid6nJx0xUX0M2f/2Q==" };
  var j = e.i(43989);
  let k = "(min-width: 48rem) 228px, 174px", { props: { srcSet: w } } = (0, f.getImageProps)({ src: y, sizes: k, alt: "" }), { props: A } = (0, f.getImageProps)({ src: v, sizes: k, alt: "" }), _ = ({ isPlaying: e2 }) => {
    let n2 = (0, r.useRef)(null), s2 = (0, g.useReducedMotion)();
    return (0, r.useEffect)(() => {
      let t2 = n2.current;
      if (t2) {
        if (!e2 || s2) return void t2.pause();
        t2.muted = true, t2.play().catch(() => {
        });
      }
    }, [e2, s2]), (0, t.jsx)("video", { ref: n2, "aria-hidden": "true", className: "absolute inset-0 size-full rounded-[3px] object-cover motion-reduce:hidden max-md:hidden", src: "/home/footer-video-loop.mp4", muted: true, loop: true, playsInline: true, preload: "none", onLoadedMetadata: (e3) => {
      e3.currentTarget.currentTime = 0.25;
    } });
  };
  e.s(["HomeFooterVideo", 0, () => {
    let [e2, n2] = (0, r.useState)(false);
    return (0, t.jsxs)("div", { className: (0, h.cx)("relative", "px-4.25 pt-2.5 pb-11", "home-rule-l", "md:px-7 md:pt-2 md:pb-2.5"), children: [(0, t.jsx)(b.HomeRuleCap, { className: "top-0 right-[calc(85px+var(--home-rule)/2)] md:hidden" }), (0, t.jsx)(m, { bend: "top", radius: 90, className: "top-[calc(var(--home-rule)/2)] right-[calc(var(--home-rule)/2)] h-[calc(100%-var(--home-rule)/2)] md:hidden" }), (0, t.jsx)(b.HomeRuleCap, { className: "bottom-0 left-0 md:hidden" }), (0, t.jsx)(x, { handle: j.homeVideoLightbox, id: "home-footer-video", index: 0, crossfade: "both", onPointerEnter: (e3) => {
      (0, j.homeVideoPlayerPreload)(), "mouse" === e3.pointerType && n2(true);
    }, onPointerLeave: () => n2(false), onPointerDown: j.homeVideoPlayerPreload, onFocus: j.homeVideoPlayerPreload, className: (0, h.cx)("block w-52.5 cursor-pointer text-left", "px-3 pt-[10.5px] pb-2.25", "rounded-[6.5px] bg-[#77AA83]", "md:w-69", "md:px-4.5 md:pt-3.5 md:pb-3"), children: ({ imageRef: r2, morphRef: n3 }) => (0, t.jsxs)(t.Fragment, { children: [(0, t.jsxs)("span", { className: "flex items-center gap-x-[7.5px] md:gap-x-2.5", children: [(0, t.jsx)("span", { className: "size-2.25 rounded-full bg-[#117025] md:size-3" }), (0, t.jsx)("span", { className: (0, h.cx)("font-cinetype text-[11.24px]/[12.5px] tracking-[0.562px] text-[#117025]", "md:text-[14px]/[17px] md:tracking-[0.7px]"), children: "Watch the video" })] }), (0, t.jsx)("span", { ref: n3, className: (0, h.cx)("mt-[7.5px] block", "p-1.5", "bg-[#85C093]", "md:mt-2.25", "md:p-2"), children: (0, t.jsxs)("span", { className: "relative block", children: [(0, t.jsxs)("picture", { children: [(0, t.jsx)("source", { media: "(width < 48rem)", srcSet: w, sizes: k }), (0, t.jsx)("img", { ...A, ref: r2, className: "rounded-[3px]" })] }), (0, t.jsx)(_, { isPlaying: e2 })] }) })] }) })] });
  }], 204916);
}, 37205, (e) => {
  "use strict";
  var t = e.i(619882), r = e.i(43989);
  e.s(["HomeHeroVideoButton", 0, ({ className: e2 }) => (0, t.jsx)("button", { type: "button", "aria-haspopup": "dialog", className: e2, onPointerEnter: r.homeVideoPlayerPreload, onPointerDown: r.homeVideoPlayerPreload, onFocus: r.homeVideoPlayerPreload, onClick: (e3) => r.homeVideoLightboxInstantOpener.set(e3.currentTarget), children: "Watch the video" })]);
}, 47694, (e) => {
  "use strict";
  var t = e.i(619882);
  e.s([], 189517), e.i(189517);
  var r = e.i(231121), n = e.i(550318), s = e.i(848182), i = e.i(906134), a = e.i(712069), l = e.i(697338), o = e.i(493667), c = e.i(704637), d = e.i(854462), u = e.i(920143), p = e.i(499779), x = e.i(105128), h = e.i(108665), g = e.i(76778), f = e.i(376584);
  class m {
    constructor() {
      this.store = new f.PopoverStore();
    }
    open(e2) {
      let t2 = e2 ? this.store.context.triggerElements.getById(e2) ?? void 0 : void 0;
      if (e2 && !t2) throw Error((0, x.default)(80, e2));
      this.store.setOpen(true, (0, h.createChangeEventDetails)(g.REASONS.imperativeAction, void 0, t2));
    }
    close() {
      this.store.setOpen(false, (0, h.createChangeEventDetails)(g.REASONS.imperativeAction, void 0, void 0));
    }
    get isOpen() {
      return this.store.select("open");
    }
  }
  e.s(["Arrow", () => l.PopoverArrow, "Backdrop", () => o.PopoverBackdrop, "Close", () => u.PopoverClose, "Description", () => d.PopoverDescription, "Handle", 0, m, "Popup", () => a.PopoverPopup, "Portal", () => s.PopoverPortal, "Positioner", () => i.PopoverPositioner, "Root", () => r.PopoverRoot, "Title", () => c.PopoverTitle, "Trigger", () => n.PopoverTrigger, "Viewport", () => p.PopoverViewport, "createHandle", 0, function() {
    return new m();
  }], 650758), e.i(650758);
  var b = e.i(927612);
  function v({ children: e2 }) {
    return (0, t.jsxs)(t.Fragment, { children: [(0, t.jsx)("span", { "aria-hidden": "true", className: "pointer-events-none absolute top-[3px] left-0 h-[calc(100%-4px)]", style: { width: "calc(round(100%, 3px) + 1.5px)", borderBottom: "1.5px solid transparent", borderImage: "repeating-linear-gradient(to right, transparent 0 1.5px, #117025 1.5px 3px)", borderImageSlice: "1" }, children: (0, t.jsx)("span", { className: (0, b.cx)("block h-full w-full", "bg-[#117025] opacity-0", "transition-opacity duration-150 ease-out", "group-hover:opacity-100 group-focus-visible:opacity-100 group-data-[popup-open]:opacity-100") }) }), (0, t.jsx)("span", { className: (0, b.cx)("relative", "transition-colors duration-150 ease-out", "group-hover:text-[#E0E0E0] group-focus-visible:text-[#E0E0E0] group-data-[popup-open]:text-[#E0E0E0]"), children: e2 })] });
  }
  e.s(["HomeLeadersTerm", 0, ({ feature: e2, children: r2 }) => {
    let n2 = `home-leaders-feature-${e2}`;
    return (0, t.jsx)("a", { className: "group relative inline outline-none", "data-home-leaders-term": e2, href: `#${n2}`, onClick: (e3) => {
      let t2 = document.getElementById(n2);
      if (!t2) return;
      e3.preventDefault();
      let { top: r3, bottom: s2 } = t2.getBoundingClientRect();
      if (r3 < 0 || s2 > window.innerHeight) {
        let e4 = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        t2.scrollIntoView({ behavior: e4 ? "auto" : "smooth", block: "center" });
      }
      t2.focus({ preventScroll: true });
    }, children: (0, t.jsx)(v, { children: r2 }) });
  }], 47694);
}, 844679, (e) => {
  "use strict";
  var t = e.i(619882), r = e.i(927612), n = e.i(924790), s = e.i(282351), i = e.i(155172);
  let a = [{ title: "The Map", headline: "See your pipeline clearly.", description: "We shadow your sales reps and managers to learn how your team sells. Together, we identify friction worth removing and ideas worth playbooking.", details: { label: "clarity", items: ["Where deals stall", "What wins deals", "Where to focus"] } }, { title: "The Plan", headline: "Give your team more ways to win.", description: "From CRM updates to follow-ups, we decide together what runs on its own, what goes to an agent, and what stays with your reps.", details: { label: "capacity", items: ["More selling time", "Broader coverage", "Consistent follow-through"] } }, { title: "The Build", headline: "Keep every deal moving.", description: "We connect your whole stack (CRM, calls, inbox, and more). Then we bring specialized agents into the deals your team is working, so the right context shows up right when it's needed.", details: { label: "momentum", items: ["Prepared for every call", "Earlier risk signals", "Faster deal progress"] } }, { title: "The Rollout", headline: "Watch the results compound.", description: "We stay involved as Operate learns your business, running it against real deals, fixing what's off, and tracking progress with you as coverage grows.", details: { label: "impact", items: ["More wins", "Stronger adoption", "Better retention"] } }];
  e.s(["HomeOpsSteps", 0, () => {
    let e2 = (0, i.useRef)([]), [l, o] = (0, i.useState)(-1), { scrollY: c } = (0, s.useScroll)(), d = (0, i.useCallback)(() => {
      let t2 = 0.5 * window.innerHeight, r2 = -1;
      e2.current.forEach((e3, n2) => {
        e3 && e3.getBoundingClientRect().top <= t2 && (r2 = n2);
      }), o(r2);
    }, []);
    return (0, n.useMotionValueEvent)(c, "change", d), (0, i.useEffect)(() => {
      let e3 = requestAnimationFrame(d);
      return window.addEventListener("resize", d), () => {
        cancelAnimationFrame(e3), window.removeEventListener("resize", d);
      };
    }, [d]), (0, t.jsx)("ol", { className: (0, r.cx)("flex flex-col gap-y-6.25", "pb-7", "md:pb-9", "md:gap-y-7.5"), children: a.map((n2, s2) => (0, t.jsxs)("li", { ref: (t2) => {
      e2.current[s2] = t2;
    }, children: [(0, t.jsxs)("div", { className: (0, r.cx)("pr-1.25 pl-0.75", "pt-px pb-0.5", "flex items-center gap-x-3.5", "border-y-1 border-stone-800 bg-white/60", "md:pt-[1.5px] md:pr-1.5 md:pb-[0.5px]"), children: [(0, t.jsxs)("span", { className: (0, r.cx)("text-[14.5px]/[1] text-stone-800", "md:text-[18px]/[22px]"), children: [s2 + 1, "."] }), (0, t.jsx)("h3", { className: (0, r.cx)("text-[14.5px]/[1] font-semibold text-[#117025]", "md:text-[18px]/[22px]"), children: n2.title }), (0, t.jsx)("div", { "aria-hidden": "true", className: (0, r.cx)("relative", "ml-auto size-2.5", "shrink-0", "rounded-full border-1 border-stone-800", "md:size-3"), children: (0, t.jsx)("div", { className: (0, r.cx)("absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2", "size-1.5 rounded-full bg-stone-800", "transition-[scale,opacity] duration-200 ease-out-quint", s2 === l ? "scale-100" : "scale-0 opacity-0", "md:size-1.75") }) })] }), (0, t.jsxs)("div", { className: "pt-3.25 pl-1.25 md:pt-3.75", children: [(0, t.jsxs)("p", { className: (0, r.cx)("text-[16px]/[22px] text-stone-800", "md:text-[20px]/[27px]"), children: [(0, t.jsx)("strong", { className: "font-semibold", children: n2.headline }), " ", n2.description] }), (0, t.jsxs)("div", { className: (0, r.cx)("mt-[12.5px]", "flex items-start gap-x-1.25", "text-[#117025]", "md:mt-4", "md:gap-x-1.5"), children: [(0, t.jsxs)("span", { className: (0, r.cx)("flex h-[1lh] shrink-0 items-center gap-x-1.25", "text-[11px]/[calc(14/11)]", "md:gap-x-1.5", "md:text-[14px]/[calc(14/11)]"), children: [(0, t.jsx)("span", { className: (0, r.cx)("px-0.5", "shrink-0", "rounded-[3px] border-1 border-[#117025]", "text-[9.6px]/[11px] font-semibold uppercase", "md:px-0.75", "md:text-[12px]/[14px]"), children: n2.details.label }), (0, t.jsx)("span", { "aria-hidden": "true", className: (0, r.cx)("shrink-0 border-y-[3px] border-l-[3px] border-y-transparent border-l-[#117025]") })] }), (0, t.jsx)("span", { className: "font-cinetype text-[11px]/[calc(14/11)] md:text-[14px]/[calc(14/11)]", children: n2.details.items.join(" \xB7 ") })] })] })] }, n2.title)) });
  }]);
}, 524436, (e) => {
  "use strict";
  var t, r, n, s, i = e.i(619882), a = e.i(927612), l = e.i(155172), o = e.i(81330), c = e.i(145776), d = e.i(242706);
  function u({ children: e10, isValidProp: t10, ...r10 }) {
    t10 && (0, c.loadExternalIsValidProp)(t10), (r10 = { ...(0, l.useContext)(o.MotionConfigContext), ...r10 }).isStatic = (0, d.useConstant)(() => r10.isStatic);
    let n10 = (0, l.useMemo)(() => r10, [JSON.stringify(r10.transition), r10.transformPagePoint, r10.reducedMotion]);
    return (0, i.jsx)(o.MotionConfigContext.Provider, { value: n10, children: e10 });
  }
  var p = e.i(635414), x = e.i(193347), h = e.i(505474), g = e.i(519082);
  let f = () => (0, i.jsxs)(i.Fragment, { children: [(0, i.jsx)("path", { d: "M0.4 16.5V16A15.6 15.6 0 0 1 16 0.4" }), (0, i.jsx)("line", { x1: 32, x2: "100%", y1: 0.4, y2: 0.4, transform: `translate(${-16} 0)` }), (0, i.jsx)("svg", { className: "overflow-visible", x: "100%", children: (0, i.jsx)("path", { d: `M${-16} 0.4A15.6 15.6 0 0 1 -0.4 16V16.5` }) }), (0, i.jsxs)("svg", { className: "overflow-visible", y: "100%", children: [(0, i.jsx)("path", { d: `M0.4 -16.5V${-16}A15.6 15.6 0 0 0 16 -0.4` }), (0, i.jsx)("line", { x1: 32, x2: "100%", y1: -0.4, y2: -0.4, transform: `translate(${-16} 0)` }), (0, i.jsx)("svg", { className: "overflow-visible", x: "100%", children: (0, i.jsx)("path", { d: `M${-16} -0.4A15.6 15.6 0 0 0 -0.4 ${-16}V-16.5` }) })] })] }), m = () => (0, i.jsxs)(i.Fragment, { children: [(0, i.jsx)("line", { x1: 0.4, x2: 0.4, y1: 33, y2: "100%", transform: "translate(0 -16.5)" }), (0, i.jsx)("svg", { className: "overflow-visible", x: "100%", children: (0, i.jsx)("line", { x1: -0.4, x2: -0.4, y1: 33, y2: "100%", transform: "translate(0 -16.5)" }) })] }), b = () => (0, i.jsxs)("svg", { "aria-hidden": "true", className: (0, a.cx)("pointer-events-none absolute -top-px -left-px overflow-visible md:hidden", "h-[calc(100%+2px)] w-[calc(100%+2px)]"), fill: "none", strokeWidth: "0.8", children: [(0, i.jsxs)("g", { className: "stroke-gray-400", children: [(0, i.jsx)(f, {}), (0, i.jsx)(m, {})] }), (0, i.jsx)("g", { className: "stroke-stone-800", children: (0, i.jsx)(f, {}) })] }), v = ({ className: e10, children: t10 }) => (0, i.jsx)("div", { className: (0, a.cx)("h-178.25 md:h-177.75 lg:h-192", e10), children: (0, i.jsxs)("div", { className: (0, a.cx)("relative", "mx-auto max-w-292", "size-full", "rounded-2xl border-1 border-transparent bg-[#FCFCFC]", "shadow-[0_1px_2px_1px_#FFF_inset,0_4px_4px_-4px_rgba(0,0,0,0.14),0_1px_1px_-0.5px_rgba(0,0,0,0.08),0_12px_24px_-6px_rgba(0,0,0,0.08),0_8px_16px_-4px_rgba(0,0,0,0.10)]", "md:rounded-xl md:border-gray-400", "md:shadow-[0_4px_4px_-4px_rgba(0,0,0,0.14),0_1px_1px_-0.5px_rgba(0,0,0,0.08),0_12px_24px_-6px_rgba(0,0,0,0.08),0_8px_16px_-4px_rgba(0,0,0,0.10)]", "lg:p-6"), children: [(0, i.jsx)(b, {}), (0, i.jsx)("div", { className: (0, a.cx)("absolute -top-px -left-px hidden md:block", "h-3 w-[calc(100%+2px)]", "rounded-t-xl border-x-1 border-t-1 border-stone-800") }), (0, i.jsx)("div", { className: (0, a.cx)("absolute -bottom-px -left-px hidden md:block", "h-3 w-[calc(100%+2px)]", "rounded-b-xl border-x-1 border-b-1 border-stone-800") }), (0, i.jsx)("div", { className: (0, a.cx)("size-full", "flex flex-col", "rounded-2xl bg-[#F7F7F7]", "md:rounded-xl lg:border lg:border-gray-200", "lg:rounded-md"), children: t10 })] }) });
  var y = e.i(507502), j = e.i(24034);
  let k = [0.25, 0.46, 0.45, 0.94], w = [0.33, 1, 0.68, 1], A = [0.65, 0, 0.35, 1], _ = ({ className: e10, children: t10 }) => (0, i.jsxs)("div", { className: (0, a.cx)("relative overflow-hidden", "rounded-xl bg-white", "shadow-[0_4px_4px_-4px_rgba(0,0,0,0.14),0_1px_1px_-0.5px_rgba(0,0,0,0.08),0_0_0_0.5px_rgba(0,0,0,0.16)]", "md:rounded-2xl", "md:shadow-[0_4px_4px_-4px_rgba(0,0,0,0.14),0_1px_1px_-0.5px_rgba(0,0,0,0.08),0_0_0_0.5px_rgba(0,0,0,0.16),0_12px_24px_-6px_rgba(0,0,0,0.08),0_8px_16px_-4px_rgba(0,0,0,0.10)]", e10), children: [t10, (0, i.jsx)("div", { className: (0, a.cx)("absolute bottom-0 left-0 h-4 w-full", "from-white-0 bg-linear-180 to-white") })] }), C = () => {
    let e10 = (0, l.useId)();
    return (0, i.jsxs)("svg", { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", fill: "none", viewBox: "0 0 24 24", children: [(0, i.jsx)("path", { fill: `url(#${e10})`, d: "M19 12a7 7 0 1 1-2.05-4.95l-2.532 2.532A3.42 3.42 0 1 0 15.42 12z" }), (0, i.jsx)("path", { stroke: "#5F6D6B", strokeLinecap: "round", strokeLinejoin: "round", d: "M11.989 12.004 18.497 5.5m-1.906 1.905a6.502 6.502 0 0 0-11.04 3.78 6.493 6.493 0 0 0 5.085 7.17 6.504 6.504 0 0 0 7.58-4.453 6.5 6.5 0 0 0-.353-4.702m-3.573.505a3.255 3.255 0 0 0-5.269 3.632 3.253 3.253 0 0 0 5.586.602 3.25 3.25 0 0 0 .632-2.12" }), (0, i.jsx)("defs", { children: (0, i.jsxs)("linearGradient", { id: e10, x1: "7", x2: "17", y1: "7", y2: "17", gradientUnits: "userSpaceOnUse", children: [(0, i.jsx)("stop", { stopColor: "#E0E5E5" }), (0, i.jsx)("stop", { offset: "1", stopColor: "#E0E5E5", stopOpacity: "0" })] }) })] });
  }, S = () => (0, i.jsx)("svg", { width: "16", height: "16", fill: "none", viewBox: "0 0 16 16", children: (0, i.jsx)("path", { stroke: "#9BA8A7", strokeLinecap: "round", strokeLinejoin: "round", d: "M14.5 8A6.5 6.5 0 0 1 8 14.5M14.5 8A6.5 6.5 0 0 0 8 1.5M14.5 8h-2.708M8 14.5A6.5 6.5 0 0 1 1.5 8M8 14.5v-2.708M1.5 8A6.5 6.5 0 0 1 8 1.5M1.5 8h2.708M8 1.5v2.708" }) }), N = [{ color: "#117025", value: "$56k", label: "booked" }, { color: "#85C093", value: "$92k", label: "commit" }, { color: "#4184E7", value: "$121k", label: "best case" }], M = () => (0, i.jsxs)("div", { className: (0, a.cx)("px-2 pt-2 pb-2", "rounded-xl bg-white", "shadow-[0_1px_2px_0_#FFF_inset,0_4px_4px_-2px_rgba(0,0,0,0.02),0_2px_2px_-1px_rgba(0,0,0,0.04),0_1px_1px_-0.5px_rgba(0,0,0,0.04),0_0_0_0.5px_rgba(0,0,0,0.08)]", "md:px-3 md:pt-3"), children: [(0, i.jsxs)("div", { className: "relative", children: [(0, i.jsx)("div", { className: (0, a.cx)("h-3 w-full", "rounded-full", "[background:linear-gradient(180deg,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0.00)_100%),rgba(0,0,0,0.08)]", "shadow-[0_1px_1px_-0.5px_rgba(0,0,0,0.08)_inset,0_0_0_0.5px_rgba(0,0,0,0.06)_inset,0_0_0_1px_#FFF]") }), (0, i.jsxs)("div", { className: "absolute top-0 left-0 h-full w-[93.08%]", children: [(0, i.jsx)("div", { className: (0, a.cx)("relative", "size-full", "rounded-full", "[background:linear-gradient(180deg,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0.00)_100%),#4184E7]", "shadow-[0_-1px_1px_-0.5px_rgba(0,0,0,0.12)_inset,0_0_0_0.5px_rgba(0,0,0,0.12)_inset,0_0_0_1px_#FFF]"), children: (0, i.jsx)("div", { className: (0, a.cx)("absolute top-[calc(100%+6px)] left-0", "text-[12px]/[17px] text-gray-500"), children: "$0" }) }), (0, i.jsx)("div", { className: "absolute top-1/2 right-[25.62%] z-10 translate-x-1/2 -translate-y-1/2", children: (0, i.jsx)("div", { className: (0, a.cx)("h-4 w-0.5", "rounded-full bg-[#F7F7F7]", "shadow-[0_0_1px_0_#FFF_inset,0_0_0_0.5px_rgba(0,0,0,0.25)]") }) }), (0, i.jsx)("div", { className: (0, a.cx)("absolute top-[calc(100%+6px)] right-[25.62%] translate-x-1/2", "text-[12px]/[17px] text-gray-500"), children: "$90k" })] }), (0, i.jsx)("div", { className: "absolute top-0 left-0 h-full w-[74%]", children: (0, i.jsx)("div", { className: (0, a.cx)("size-full", "rounded-full", "[background:linear-gradient(180deg,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0.00)_100%),#85C093]", "shadow-[0_-1px_1px_-0.5px_rgba(0,0,0,0.12)_inset,0_0_0_0.5px_rgba(0,0,0,0.12)_inset,0_0_0_1px_#FFF]") }) }), (0, i.jsxs)("div", { className: "absolute top-0 left-0 h-full w-[43.08%]", children: [(0, i.jsx)("div", { className: (0, a.cx)("size-full", "rounded-full", "[background:linear-gradient(180deg,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0.00)_100%),#117025]", "shadow-[0_-1px_1px_-0.5px_rgba(0,0,0,0.12)_inset,0_0_0_0.5px_rgba(0,0,0,0.12)_inset,0_0_0_1px_#FFF]") }), (0, i.jsx)("div", { className: "absolute top-1/2 right-[19.64%] translate-x-1/2 -translate-y-1/2", children: (0, i.jsx)("div", { className: (0, a.cx)("size-1.5", "rounded-full bg-[#F7F7F7]", "shadow-[0_0_1px_0_#FFF_inset,0_0_0_0.5px_rgba(0,0,0,0.25)]") }) }), (0, i.jsx)("div", { className: (0, a.cx)("absolute top-[calc(100%+6px)] right-[19.64%] translate-x-1/2", "text-[12px]/[17px] text-gray-500"), children: "Pace" })] })] }), (0, i.jsx)("hr", { className: (0, a.cx)("mt-7.5 border-t-[0.5px] border-black/8", "md:mt-8.75") }), (0, i.jsx)("div", { className: (0, a.cx)("mt-2", "flex flex-wrap items-center gap-x-2 gap-y-0.5", "md:gap-x-2.5"), children: N.map(({ color: e10, label: t10, value: r10 }, n10) => (0, i.jsxs)("div", { className: "flex items-center", children: [(0, i.jsx)("div", { className: (0, a.cx)("size-2 shrink-0", "rounded-[3px]", "shadow-[0_-1px_1px_-0.5px_rgba(0,0,0,0.12)_inset,0_0_0_0.5px_rgba(0,0,0,0.12)_inset,0_0_0_1px_#FFF]"), style: { background: `linear-gradient(180deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.00) 100%), ${e10}` } }), (0, i.jsx)("div", { className: (0, a.cx)("ml-1", "text-[11px]/[15px] text-gray-700", "md:text-[12px]/[17px]"), children: r10 }), (0, i.jsx)("div", { className: (0, a.cx)("ml-0.5", "text-[11px]/[15px] text-gray-500", "md:text-[12px]/[17px]"), children: t10 })] }, n10)) })] }), E = ({ title: e10, value: t10, deals: r10 }) => (0, i.jsxs)("div", { children: [(0, i.jsxs)("div", { className: (0, a.cx)("pl-2", "flex items-center gap-x-2", "md:pl-3"), children: [(0, i.jsx)("div", { className: (0, a.cx)("font-book text-gray-800", "text-[12px]/[17px]", "md:text-[14px]/[20px]"), children: e10 }), (0, i.jsx)("div", { className: "text-[12px]/[17px] text-gray-700", children: t10 })] }), (0, i.jsx)("div", { className: "mt-1.5", children: r10.map(({ logo: e11, name: t11, status: r11, stage: n10, value: s2 }, l2) => (0, i.jsxs)("div", { className: (0, a.cx)("px-2 py-1.5", "flex gap-x-2", "md:px-3 md:py-2", "md:gap-x-3"), children: [(0, i.jsx)("div", { className: (0, a.cx)("size-9", "flex items-center justify-center", "rounded-lg bg-black/4", "shadow-[0_0_0_0.5px_rgba(0,0,0,0.04)_inset]", "md:size-10", "md:rounded-[10px]"), children: e11 }), (0, i.jsxs)("div", { className: (0, a.cx)("flex-1", "flex flex-col gap-y-0.75"), children: [(0, i.jsx)("div", { className: (0, a.cx)("text-gray-800", "text-[12px]/[17px]", "md:text-[14px]/[20px]"), children: t11 }), (0, i.jsxs)("div", { className: (0, a.cx)("flex gap-x-1", "text-gray-700", "text-[11px]/[15px]", "md:gap-x-1.5", "md:text-[12px]/[17px]"), children: [(0, i.jsx)("div", { children: r11 }), (0, i.jsx)("div", { children: "\xB7" }), (0, i.jsx)("div", { className: "flex-1 truncate", children: n10 })] })] }), (0, i.jsx)("div", { className: "text-[12px]/[17px] text-gray-800 md:text-[14px]/[20px]", children: s2 })] }, l2)) })] }), R = () => {
    let e10 = (0, l.useId)();
    return (0, i.jsxs)("svg", { className: (0, a.cx)("size-5", "rounded-[7.5px]", "shadow-[0_2.4px_2.4px_-1.2px_rgba(0,0,0,0.02),0_1.2px_1.2px_-0.6px_rgba(0,0,0,0.04),0_0.6px_0.6px_-0.3px_rgba(0,0,0,0.06),0_0_0_0.3px_rgba(0,0,0,0.10)_inset]", "md:size-6"), fill: "none", viewBox: "0 0 24 24", children: [(0, i.jsx)("rect", { width: "24", height: "24", fill: "#F7ED1A", rx: "7.5" }), (0, i.jsx)("rect", { width: "24", height: "24", fill: `url(#${e10})`, fillOpacity: ".02", rx: "7.5" }), (0, i.jsx)("path", { stroke: "#000", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.95", d: "M12 4.781V19.22M5.438 8.063l13.125 7.874m-13.125.001 13.125-7.876" }), (0, i.jsx)("circle", { cx: "12", cy: "12", r: "3", fill: "#000" }), (0, i.jsx)("defs", { children: (0, i.jsxs)("linearGradient", { id: e10, x1: "12", x2: "12", y1: "0", y2: "24", gradientUnits: "userSpaceOnUse", children: [(0, i.jsx)("stop", { stopOpacity: "0" }), (0, i.jsx)("stop", { offset: "1" })] }) })] });
  }, D = () => {
    let e10 = (0, l.useId)();
    return (0, i.jsxs)("svg", { className: (0, a.cx)("size-5", "rounded-[7.5px]", "shadow-[0_2.4px_2.4px_-1.2px_rgba(0,0,0,0.02),0_1.2px_1.2px_-0.6px_rgba(0,0,0,0.04),0_0.6px_0.6px_-0.3px_rgba(0,0,0,0.06),0_0_0_0.3px_rgba(0,0,0,0.10)_inset]", "md:size-6"), fill: "none", viewBox: "0 0 24 24", children: [(0, i.jsx)("rect", { width: "24", height: "24", fill: "#1A2233", rx: "7.5" }), (0, i.jsx)("rect", { width: "24", height: "24", fill: `url(#${e10})`, fillOpacity: ".02", rx: "7.5" }), (0, i.jsx)("g", { transform: "translate(-8 -8)", children: (0, i.jsx)("path", { stroke: "#DCDCDC", strokeLinecap: "round", strokeWidth: "1.91242", d: "M13 23C17.6667 17 22.3333 17 27 23M13 17C17.6667 23 22.3333 23 27 17" }) }), (0, i.jsx)("defs", { children: (0, i.jsxs)("linearGradient", { id: e10, x1: "12", x2: "12", y1: "0", y2: "24", gradientUnits: "userSpaceOnUse", children: [(0, i.jsx)("stop", { stopOpacity: "0" }), (0, i.jsx)("stop", { offset: "1" })] }) })] });
  }, L = () => {
    let e10 = (0, l.useId)();
    return (0, i.jsxs)("svg", { className: (0, a.cx)("size-5", "rounded-[7.5px]", "shadow-[0_2.4px_2.4px_-1.2px_rgba(0,0,0,0.02),0_1.2px_1.2px_-0.6px_rgba(0,0,0,0.04),0_0.6px_0.6px_-0.3px_rgba(0,0,0,0.06),0_0_0_0.3px_rgba(0,0,0,0.10)_inset]", "md:size-6"), fill: "none", viewBox: "0 0 24 24", children: [(0, i.jsx)("rect", { width: "24", height: "24", fill: "#B85827", rx: "7.5" }), (0, i.jsx)("rect", { width: "24", height: "24", fill: `url(#${e10})`, fillOpacity: ".02", rx: "7.5" }), (0, i.jsx)("g", { transform: "translate(-8.25 -7.75)", children: (0, i.jsx)("path", { fill: "#E5B5C9", d: "M20.25 25.75H14.7717C14.6334 25.75 14.5007 25.695 14.4028 25.5972C14.305 25.4993 14.25 25.3666 14.25 25.2283V19.75C14.25 18.1587 14.8821 16.6326 16.0074 15.5074C17.1326 14.3821 18.6587 13.75 20.25 13.75C21.0379 13.75 21.8181 13.9052 22.5461 14.2067C23.2741 14.5083 23.9355 14.9502 24.4926 15.5074C25.0498 16.0645 25.4917 16.7259 25.7933 17.4539C26.0948 18.1819 26.25 18.9621 26.25 19.75C26.25 20.5379 26.0948 21.3181 25.7933 22.0461C25.4917 22.7741 25.0498 23.4355 24.4926 23.9926C23.9355 24.5498 23.2741 24.9917 22.5461 25.2933C21.8181 25.5948 21.0379 25.75 20.25 25.75Z" }) }), (0, i.jsx)("defs", { children: (0, i.jsxs)("linearGradient", { id: e10, x1: "12", x2: "12", y1: "0", y2: "24", gradientUnits: "userSpaceOnUse", children: [(0, i.jsx)("stop", { stopOpacity: "0" }), (0, i.jsx)("stop", { offset: "1" })] }) })] });
  }, O = () => {
    let e10 = (0, l.useId)();
    return (0, i.jsxs)("svg", { className: (0, a.cx)("size-5", "rounded-[7.5px]", "shadow-[0_2.4px_2.4px_-1.2px_rgba(0,0,0,0.02),0_1.2px_1.2px_-0.6px_rgba(0,0,0,0.04),0_0.6px_0.6px_-0.3px_rgba(0,0,0,0.06),0_0_0_0.3px_rgba(0,0,0,0.10)_inset]", "md:size-6"), fill: "none", viewBox: "0 0 24 24", children: [(0, i.jsx)("rect", { width: "24", height: "24", fill: "#6257B6", rx: "7.5" }), (0, i.jsx)("rect", { width: "24", height: "24", fill: `url(#${e10})`, fillOpacity: ".02", rx: "7.5" }), (0, i.jsxs)("g", { transform: "translate(-8 -8)", children: [(0, i.jsx)("path", { fill: "#FFF", d: "M19.5729 22.7483C19.7974 22.4864 20.2026 22.4864 20.4271 22.7483L22.5791 25.2589C22.8918 25.6238 22.6326 26.1875 22.152 26.1875H17.848C17.3674 26.1875 17.1082 25.6238 17.4209 25.2589L19.5729 22.7483Z" }), (0, i.jsx)("path", { fill: "#FFF", d: "M14.375 24.5H14.9375L19.3141 19.9331C19.7661 19.4614 20.5235 19.4727 20.9613 19.9576L25.0625 24.5H25.625C25.9234 24.5 26.2095 24.3815 26.4205 24.1705C26.6315 23.9595 26.75 23.6734 26.75 23.375V15.5C26.75 15.2016 26.6315 14.9155 26.4205 14.7045C26.2095 14.4935 25.9234 14.375 25.625 14.375H14.375C14.0766 14.375 13.7905 14.4935 13.5795 14.7045C13.3685 14.9155 13.25 15.2016 13.25 15.5V23.375C13.25 23.6734 13.3685 23.9595 13.5795 24.1705C13.7905 24.3815 14.0766 24.5 14.375 24.5Z" })] }), (0, i.jsx)("defs", { children: (0, i.jsxs)("linearGradient", { id: e10, x1: "12", x2: "12", y1: "0", y2: "24", gradientUnits: "userSpaceOnUse", children: [(0, i.jsx)("stop", { stopOpacity: "0" }), (0, i.jsx)("stop", { offset: "1" })] }) })] });
  }, T = () => {
    let e10 = (0, l.useId)();
    return (0, i.jsxs)("svg", { className: (0, a.cx)("size-5", "rounded-[7.5px]", "shadow-[0_2.4px_2.4px_-1.2px_rgba(0,0,0,0.02),0_1.2px_1.2px_-0.6px_rgba(0,0,0,0.04),0_0.6px_0.6px_-0.3px_rgba(0,0,0,0.06),0_0_0_0.3px_rgba(0,0,0,0.10)_inset]", "md:size-6"), fill: "none", viewBox: "0 0 24 24", children: [(0, i.jsx)("rect", { width: "24", height: "24", fill: "#DCDCDC", rx: "7.5" }), (0, i.jsx)("rect", { width: "24", height: "24", fill: `url(#${e10})`, fillOpacity: ".02", rx: "7.5" }), (0, i.jsx)("g", { transform: "translate(-8.5 -8)", children: (0, i.jsx)("path", { stroke: "#FB7904", strokeWidth: "5.30845", d: "M15.5 16V20M15.5 24V20M15.5 20H25.5M25.5 16V24" }) }), (0, i.jsx)("defs", { children: (0, i.jsxs)("linearGradient", { id: e10, x1: "12", x2: "12", y1: "0", y2: "24", gradientUnits: "userSpaceOnUse", children: [(0, i.jsx)("stop", { stopOpacity: "0" }), (0, i.jsx)("stop", { offset: "1" })] }) })] });
  };
  var P = e.i(548544);
  let F = (0, l.createContext)({ step: 0, lastStep: 0, settledStep: 0, isPlaying: false, isPaused: false, setIsPaused: () => {
  }, jumpToStep: () => {
  }, isResetting: false, run: 0, setHoveredTarget: () => {
  }, setPressedTarget: () => {
  }, finishCursorAction: () => {
  }, setContentFinished: () => {
  }, contentEnds: /* @__PURE__ */ new Map(), setContentEnd: () => {
  }, registerTarget: () => () => {
  }, getTargetElement: () => null, getTargetAt: () => null }), B = (0, l.createContext)({ hoveredTarget: null, pressedTarget: null }), z = () => (0, l.use)(F), I = () => (0, l.use)(B), $ = (e10) => e10.getBoundingClientRect().width > 0, H = ({ timeline: e10, isActive: t10, children: r10 }) => {
    let [n10, s2] = (0, l.useState)({ step: 0, settledStep: 0, cursorActionStep: null }), { step: a2, settledStep: o2, cursorActionStep: c2 } = n10, [d2, u2] = (0, l.useState)(false), [p2, x2] = (0, l.useState)(false), [h2, g2] = (0, l.useState)(0), [f2, m2] = (0, l.useState)(null), [b2, v2] = (0, l.useState)(null), [y2, j2] = (0, l.useState)(() => /* @__PURE__ */ new Set()), [k2, w2] = (0, l.useState)(() => /* @__PURE__ */ new Map()), A2 = (0, l.useMemo)(() => Math.max(...Object.keys(e10).map(Number)), [e10]), _2 = (0, l.useCallback)((e11) => {
      s2((t11) => t11.step === e11 ? { ...t11, cursorActionStep: e11 } : t11);
    }, []), C2 = (0, l.useCallback)((e11) => {
      x2(false), s2((t11) => t11.step === e11 ? t11 : { step: e11, settledStep: e11, cursorActionStep: null });
    }, []), S2 = (0, l.useCallback)((e11, t11) => {
      j2((r11) => {
        if (r11.has(e11) === t11) return r11;
        let n11 = new Set(r11);
        return t11 ? n11.add(e11) : n11.delete(e11), n11;
      });
    }, []), N2 = (0, l.useCallback)((e11, t11) => {
      w2((r11) => {
        if (null === t11 ? !r11.has(e11) : r11.get(e11) === t11) return r11;
        let n11 = new Map(r11);
        return null === t11 ? n11.delete(e11) : n11.set(e11, t11), n11;
      });
    }, []), M2 = (0, l.useRef)(/* @__PURE__ */ new Map()), E2 = (0, l.useCallback)((e11, t11) => {
      let r11 = M2.current, n11 = r11.get(e11) ?? /* @__PURE__ */ new Set();
      return n11.add(t11), r11.set(e11, n11), () => {
        n11.delete(t11);
      };
    }, []), R2 = (0, l.useCallback)((e11) => [...M2.current.get(e11) ?? []].find($) ?? null, []), D2 = (0, l.useCallback)((e11, t11) => {
      let r11 = document.elementsFromPoint(e11, t11).find((e12) => !e12.closest("[data-home-ui-cursor-layer]"));
      if (!r11) return null;
      for (let [e12, t12] of M2.current) for (let n11 of t12) if (n11.contains(r11)) return e12;
      return null;
    }, []), L2 = t10 && !d2 && (a2 < A2 || void 0 !== e10[A2].duration);
    (0, l.useEffect)(() => {
      if (!L2 || p2) return;
      let { duration: t11, cursor: r11, waitsForContent: n11 } = e10[a2];
      if (r11?.action && c2 !== a2 || void 0 !== n11 && !y2.has(n11) || void 0 === t11) return;
      let i2 = setTimeout(() => {
        a2 >= A2 ? x2(true) : s2((e11) => ({ ...e11, step: e11.step + 1 }));
      }, t11);
      return () => clearTimeout(i2);
    }, [L2, p2, a2, A2, c2, y2, e10]), (0, l.useEffect)(() => {
      if (!p2) return;
      let e11 = setTimeout(() => {
        x2(false), u2(true), s2({ step: 0, settledStep: 0, cursorActionStep: null }), g2((e12) => e12 + 1);
      }, 250);
      return () => clearTimeout(e11);
    }, [p2]);
    let O2 = e10[a2].cursor, T2 = (0, l.useMemo)(() => ({ step: a2, lastStep: A2, settledStep: o2, isPlaying: L2, isPaused: d2, setIsPaused: u2, jumpToStep: C2, isResetting: p2, run: h2, cursor: O2, setHoveredTarget: m2, setPressedTarget: v2, finishCursorAction: _2, setContentFinished: S2, contentEnds: k2, setContentEnd: N2, registerTarget: E2, getTargetElement: R2, getTargetAt: D2 }), [a2, A2, o2, L2, d2, C2, p2, h2, O2, _2, S2, k2, N2, E2, R2, D2]), P2 = (0, l.useMemo)(() => ({ hoveredTarget: f2, pressedTarget: b2 }), [f2, b2]);
    return (0, i.jsx)(F, { value: T2, children: (0, i.jsx)(B, { value: P2, children: (0, i.jsx)("div", { className: "contents select-none", children: r10 }) }) });
  }, V = (e10) => {
    let { registerTarget: t10 } = z(), { hoveredTarget: r10, pressedTarget: n10 } = I(), s2 = (0, l.useRef)(null);
    return (0, l.useEffect)(() => {
      let r11 = s2.current;
      if (e10 && r11) return t10(e10, r11);
    }, [e10, t10]), { ref: s2, isHovered: !!e10 && r10 === e10, isPressed: !!e10 && n10 === e10 };
  }, U = () => {
    let e10 = (0, l.useId)();
    return (0, i.jsxs)("svg", { className: (0, a.cx)("rounded-lg", "shadow-[0_2.4px_2.4px_-1.2px_rgba(0,0,0,0.02),0_1.2px_1.2px_-0.6px_rgba(0,0,0,0.04),0_0.6px_0.6px_-0.3px_rgba(0,0,0,0.06)]"), fill: "none", width: 24, height: 24, viewBox: "0 0 24 24", children: [(0, i.jsx)("rect", { width: "24", height: "24", fill: "#F9ED00", rx: "7.5" }), (0, i.jsx)("rect", { width: "24", height: "24", fill: `url(#${e10})`, fillOpacity: ".02", rx: "7.5" }), (0, i.jsx)("path", { stroke: "#000", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.95", d: "M12 4.781V19.22M5.438 8.063l13.125 7.874m-13.125.001 13.125-7.876" }), (0, i.jsx)("circle", { cx: "12", cy: "12", r: "3", fill: "#000" }), (0, i.jsx)("defs", { children: (0, i.jsxs)("linearGradient", { id: e10, x1: "12", x2: "12", y1: "0", y2: "24", gradientUnits: "userSpaceOnUse", children: [(0, i.jsx)("stop", { stopOpacity: "0" }), (0, i.jsx)("stop", { offset: "1" })] }) }), (0, i.jsx)("rect", { x: ".3", y: ".3", width: "23.4", height: "23.4", rx: "7.2", stroke: "#000", strokeOpacity: ".1", strokeWidth: ".6" })] });
  }, W = () => (0, i.jsx)("svg", { width: "16", height: "16", fill: "none", viewBox: "0 0 16 16", children: (0, i.jsx)("path", { stroke: "#008125", strokeLinecap: "round", strokeLinejoin: "round", d: "M3.542 11.984C2.345 11.525 1.5 10.405 1.5 9.097c0-1.446 1.03-2.66 2.427-3.01a.8.8 0 0 0 .53-.416C5.073 4.389 6.427 3.5 8 3.5s2.926.89 3.544 2.171c.1.207.296.359.528.417C13.47 6.436 14.5 7.65 14.5 9.097c0 1.308-.845 2.428-2.042 2.887M5.94 10.85l1.585 1.65 3.171-3.3" }) }), Q = () => (0, i.jsxs)("svg", { width: "16", height: "16", fill: "none", viewBox: "0 0 16 16", children: [(0, i.jsx)("path", { stroke: "#9BA8A7", strokeLinecap: "round", strokeLinejoin: "round", d: "M8 14.5a6.5 6.5 0 1 0 0-13 6.5 6.5 0 0 0 0 13" }), (0, i.jsx)("path", { stroke: "#9BA8A7", strokeLinecap: "round", strokeLinejoin: "round", d: "M11.25 4.75 6.917 6.917 4.75 11.25l4.333-2.167z" })] }), K = () => (0, i.jsxs)("svg", { width: "16", height: "16", fill: "none", viewBox: "0 0 16 16", children: [(0, i.jsx)("circle", { cx: "8", cy: "8", r: "6.75", fill: "#71807E", stroke: "#000", strokeOpacity: ".05", strokeWidth: ".5" }), (0, i.jsx)("path", { stroke: "#fff", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.25", d: "M5 8.25 6.826 10 11 6" })] }), Z = () => (0, i.jsx)("svg", { width: "16", height: "16", fill: "none", viewBox: "0 0 16 16", children: (0, i.jsx)("circle", { cx: "8", cy: "8", r: "6.75", fill: "#F7F7F7", stroke: "#000", strokeOpacity: ".32", strokeWidth: ".5" }) }), q = { src: e.i(522481).default, width: 80, height: 80, blurWidth: 8, blurHeight: 8, blurDataURL: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAA9klEQVR42h2Ou07CYACF/7eQqzcEy8XSGnTyAiao4AKI2MrUoXvHRhL6ANpBjWEyjQ6kriYaoxAdjfHySB9th7N955xPLGUWiSXmyGSX6Z32qNZ2iSdjJFJx8kUJkZOyhND+QZ2PySfenYeilknNJynJRUShlKesygzOBzw/vXDvPSAra6QXUqjrCiKc2dis4F64/Hz9Yts2UmGVZDoRFcVKLkMlAHRd5/11Qr9/Fs2HDiEoTNNkdDvCsiwcx6HVblHbq+IMh2iahvj7/scf+xiGwfbOFvVAtnPcwb10mb5NEeHv9dUN3ZMujeYhzaNGALSj+ONHZvvwgaBTEHPaAAAAAElFTkSuQmCC" }, Y = { src: e.i(459665).default, width: 64, height: 64, blurWidth: 8, blurHeight: 8, blurDataURL: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAA8klEQVR42iXOS0sCYQCF4flltQ5s4aoCiSiIMnQqstJFQQZG7QplrLyOtohCKTOdYS6Oc/ua+U9vky3O4sDD4UiGNcG0tUUm2oj3wStTfczcs3F9B8nxrKRYfH4NOZZl0ispSnkZy9QJQg/J82d4gYPaeGJQu+Vuf5fyRoYPtUMgEuCH7kK+9VWGDxWahTz1zDaaoiD+FkLhJ8BlZkwxWlXi7j3fhSLzWp0wcJF+YoGIQlzbond1yejmgnGpjN59IYqjBEQieevS6vU53cvxeJSjsnnAVvaEaqP9v6A02yytrnN9VsTsPHOePWQ5tUZ6R+YXYdG5cI1PreUAAAAASUVORK5CYII=" }, G = { src: e.i(770558).default, width: 64, height: 64, blurWidth: 8, blurHeight: 8, blurDataURL: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAABE0lEQVR42gEIAff+AOvo0f/t6tX/xb2J/8q7fP+7rWH/rZ9W/6mdWv/X0az/ALywcv+9rnH/uqdm/5eDU/+bh1T/nY9O/7+1if/Sy6r/AJWFR/+1omH/sZFh/6F0Uf/Al3P/pI1c/6qgdP/m48//ALKgYf+0oF7/yKF3/6R1VP/ClHP/w6uC/7m0kf/v7uH/AMOze/+tlVz/1KiB/8KGX//MnH7/6dzB/+Xiy//19e3/AMa+bP+ek2T/ZlJA/5xsSv/TqYj/9Ozd//Hw5P/8/Pn/AIV/R/9WUkT/JCIj/zgvKP+ek4L/8e/j//z8+v/8/Pr/ACEgIf8nJSf/IiEi/x8fIf83NTH/op6L//Lx6P/7+/r/uhK0Jwmb/xIAAAAASUVORK5CYII=" }, J = { src: e.i(450657).default, width: 64, height: 64, blurWidth: 8, blurHeight: 8, blurDataURL: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAA90lEQVR42h3KTUvCcACA8f8t30pzMzUTDa31sjDZqIYIGWsWdhllklgXC5QyoSCiF1IWXcqdxGsf9al5+F0eHuELzOAP+qZi0hypeIRgyIfXPSIcDqJk4xxoeXbVZTbzKVbTEnI0hN8bKsUc7o3F97WF072gXStjFZbo1baxilnE46nBpFNl0NzHvb/kuVGltJZkWN9h8E+M2iavts55WWXcv+KjcYiaWeDWUhme6YgXW8PWMqykY/RPDJqGgjQforS+SKeiILrmBseGyp6+hdNrcVc3iUZniYQDFDIS4ql1xHjk4H698zv54fPtgURCRpYj5LJJ/gDu7m2MVXrQwQAAAABJRU5ErkJggg==" }, X = { src: e.i(762357).default, width: 64, height: 64, blurWidth: 8, blurHeight: 8, blurDataURL: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAABBklEQVR42j3N0SsDAQDH8fsPlqaWtHM0JWYPxjbjwW5LmhpzslIrunU7TbospIU0hYcle/O0BxLlnvwV5IWs8ObF1eUfuHv5WlZ7+L19+n2FvfUlarsFbi6O+f765PfHwnEcXNf9n3BbO+Dj9YV6ZZsjZZlLfYO3p+cOEhZSMaplDT2T5nwtx5WhU90qYVntJ6FenOVwNcFiNETDUHk8rbCTX8E0zTZolBU2FZnhvl4KqUn2c/MkwiGKmoZt2wgnaholMY6v24vk8xIOiIwGJJKyTLP5jnBtZDlTs/h7fERHBsknY8xExpiOx3m4v2slShnmJoJ0eTz0i34iwSEGJBFJFJlqoT/Qm5fNs+STQwAAAABJRU5ErkJggg==" }, ee = [{ icon: (0, i.jsx)(() => (0, i.jsxs)("svg", { width: "16", height: "16", fill: "none", viewBox: "0 0 16 16", children: [(0, i.jsx)("circle", { cx: "8", cy: "8", r: "6", stroke: "#008125", strokeDasharray: ".05 3", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2" }), (0, i.jsx)("path", { stroke: "#008125", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M8 2a6 6 0 1 1-5.196 9" })] }), {}), label: "Negotiation" }, { icon: (0, i.jsx)(() => (0, i.jsx)("svg", { width: "16", height: "16", fill: "none", viewBox: "0 0 16 16", children: (0, i.jsx)("path", { fill: "#9BA8A7", d: "m2.14 7.9-.353.354zM2 7.561h-.5zM2 2v-.5a.5.5 0 0 0-.5.5zm5.561 0v-.5zm.34.14.353-.353zM13.86 8.1l.353-.354zm0 .678.353.354zM8.78 13.86l.353.353zm-.679 0-.353.353zM2.141 7.9l.353-.353a.02.02 0 0 1 .006.014h-1c0 .26.103.51.287.693zM2 7.561h.5V2h-1v5.561zM2 2v.5h5.561v-1H2zm5.561 0v.5a.02.02 0 0 1-.014-.006L7.9 2.14l.354-.353a.98.98 0 0 0-.692-.287zm.34.14-.354.354 5.959 5.96.354-.354.353-.354-5.96-5.96zM13.86 8.1l-.354.353a.02.02 0 0 1-.006-.014h1a.98.98 0 0 0-.287-.693zm.14.339h-.5a.02.02 0 0 1 .006-.014l.354.353.353.354a.98.98 0 0 0 .287-.693zm-.14.34-.354-.354-5.08 5.081.354.354.354.353 5.08-5.081zm-5.08 5.08-.353-.353a.02.02 0 0 1 .014-.006v1a.98.98 0 0 0 .692-.287zM8.44 14v-.5a.02.02 0 0 1 .015.006l-.354.354-.353.353a.98.98 0 0 0 .693.287zm-.339-.14.354-.354-5.961-5.96-.354.354-.353.354 5.96 5.96zM5.36 4.88h-.5a.02.02 0 0 1 .02-.02v1a.98.98 0 0 0 .98-.98zm-.48.48v-.5a.02.02 0 0 1 .02.02h-1c0 .541.439.98.98.98zm-.48-.48h.5a.02.02 0 0 1-.02.02v-1a.98.98 0 0 0-.98.98zm.48-.48v.5a.02.02 0 0 1-.02-.02h1a.98.98 0 0 0-.98-.98z" }) }), {}), label: "$18k" }, { icon: (0, i.jsx)(() => (0, i.jsx)("svg", { width: "16", height: "16", fill: "none", viewBox: "0 0 16 16", children: (0, i.jsx)("path", { stroke: "#9BA8A7", strokeLinecap: "round", strokeLinejoin: "round", d: "M11 1.5v2m-6-2v2m-2.5 2h11m-7.75 4 1.5 1.5 3-3M3 2.5h10a.5.5 0 0 1 .5.5v10a.5.5 0 0 1-.5.5H3a.5.5 0 0 1-.5-.5V3a.5.5 0 0 1 .5-.5" }) }), {}), label: "6 Aug" }], et = [{ task: "Send final contract to Holloway", isDone: true, due: "3w ago" }, { task: "Confirm legal sign-off", isDone: true, due: "2w ago" }, { task: "Chase signature after Sep 15", isDone: true, due: "2d ago" }, { task: "Book kickoff on signing", isDone: false, due: "Today" }], er = [{ src: Y, name: "Kierra Torres", title: "Co-Founder & COO", label: "Champion", target: "panel-deal-person" }, { src: G, name: "Cooper Franci", title: "Co-Founder & CEO", label: "Decision maker" }, { src: J, name: "Emery Botosh", title: "Senior Revenue Manager" }, { src: X, name: "Alfredo Bergson", title: "Legal" }], en = ({ src: e10, name: t10, title: r10, label: n10, target: s2 }) => {
    let { ref: l2, isHovered: o2, isPressed: c2 } = V(s2);
    return (0, i.jsxs)("div", { ref: l2, "data-hovered": o2 || void 0, "data-pressed": c2 || void 0, className: (0, a.cx)("px-2 py-[7.5px] md:px-3 md:py-2", "flex items-center gap-x-2", "rounded-lg", "transition-colors duration-120", "data-hovered:bg-black/4", "data-pressed:bg-black/6"), children: [(0, i.jsxs)("div", { className: "relative size-4", children: [(0, i.jsx)(P.default, { className: "size-full rounded-full", src: e10, alt: t10 }), (0, i.jsx)("div", { "aria-hidden": "true", className: "pointer-events-none absolute inset-0 rounded-full border-[0.5px] border-black/4" })] }), (0, i.jsxs)("div", { className: (0, a.cx)("min-w-0", "flex items-center gap-x-1.5", "whitespace-nowrap text-gray-600", "text-[11px]/[15px]", "md:text-[12px]/[17px]"), children: [(0, i.jsx)("div", { className: "text-[12px]/[17px] text-gray-700 md:text-[14px]/[24px]", children: t10 }), (0, i.jsx)("div", { children: "\xB7" }), (0, i.jsx)("div", { children: r10 }), !!n10 && (0, i.jsxs)(i.Fragment, { children: [(0, i.jsx)("div", { children: "\xB7" }), (0, i.jsx)("div", { className: "truncate", children: n10 })] })] })] });
  }, es = { task: "Follow up with Kierra after tea", isDone: false, due: "Suggested" }, ei = { duration: 0.4, ease: [0.22, 1, 0.36, 1] }, ea = ({ task: e10, isDone: t10, due: r10, isSuggested: n10 }) => (0, i.jsxs)("div", { className: (0, a.cx)("pt-[6.5px] pr-2 pb-1.5", "flex items-center justify-between", "border-b-[0.5px] border-black/8", "md:pt-2 md:pb-[7.5px]"), children: [(0, i.jsxs)("div", { className: (0, a.cx)("flex items-center gap-x-2"), children: [(0, i.jsxs)("div", { children: [t10 && (0, i.jsx)(K, {}), !t10 && (0, i.jsx)(Z, {})] }), (0, i.jsx)("div", { className: (0, a.cx)("text-[12px]/[19px]", "text-gray-600", "md:text-[14px]/[24px]", t10 && "line-through"), children: e10 })] }), (0, i.jsx)("div", { className: (0, a.cx)("text-[12px]/[16px]", n10 ? "text-[#008125]" : t10 ? "text-gray-500" : "text-gray-700"), children: r10 })] }), el = ({ hasSuggestedTodo: e10 }) => (0, i.jsxs)("div", { className: "pb-2", children: [(0, i.jsxs)("div", { className: "p-3 md:p-4", children: [(0, i.jsxs)("div", { className: "flex items-center gap-x-2.5", children: [(0, i.jsx)(U, {}), (0, i.jsxs)("div", { className: "flex items-center gap-x-1.5", children: [(0, i.jsx)("div", { className: (0, a.cx)("font-medium text-gray-900", "text-[15px]/[24px]", "md:text-[17px]/[24px] md:tracking-[-0.255px]"), children: "Holloway" }), (0, i.jsx)(W, {})] })] }), (0, i.jsxs)("div", { className: (0, a.cx)("mt-3", "flex items-center justify-between", "md:mt-4"), children: [(0, i.jsx)("div", { className: "flex items-center gap-x-1.5", children: ee.map(({ icon: e11, label: t10 }, r10) => (0, i.jsxs)("div", { className: (0, a.cx)("py-[1.5px] pr-[7.5px] pl-[3.5px]", "flex items-center gap-x-1", "rounded-md", "border-[0.5px] border-black/2 bg-black/3", "md:py-[3.5px] md:pr-[7.5px] md:pl-[3.5px]"), children: [e11, (0, i.jsx)("div", { className: (0, a.cx)("font-book text-gray-700", "text-[11px]/[14px]", "md:text-[12px]/[16px]"), children: t10 })] }, t10)) }), (0, i.jsx)(P.default, { className: (0, a.cx)("size-5", "rounded-full", "shadow-[0_2px_2px_-1px_rgba(0,0,0,0.08),0_1px_1px_-0.5px_rgba(0,0,0,0.06),0_0_0_0.5px_rgba(0,0,0,0.08),0_0_2px_0_rgba(0,0,0,0.08),0_8px_16px_-8px_rgba(0,0,0,0.12),0_0_0_1.5px_#FCFCFC]"), src: q, alt: "Marshall Mathers" })] }), (0, i.jsxs)("div", { className: (0, a.cx)("mt-1.5", "p-[3.5px]", "rounded-2xl border border-black/2 bg-black/3", "md:mt-2"), children: [(0, i.jsxs)("div", { className: (0, a.cx)("px-2 pt-[7.5px] pb-2", "flex flex-col gap-y-2.5", "md:px-3 md:pt-2.5 md:pb-3", "md:gap-y-3.5"), children: [(0, i.jsxs)("div", { className: (0, a.cx)("flex items-center justify-between"), children: [(0, i.jsxs)("div", { className: "flex items-center gap-x-1.5 md:gap-x-2", children: [(0, i.jsx)(Q, {}), (0, i.jsx)("div", { className: (0, a.cx)("font-book text-gray-700", "text-[12px]/[17px]", "md:text-[14px]/[20px]"), children: "Deal plan" })] }), (0, i.jsx)("div", { className: "text-[12px]/[17px] text-gray-500", children: "2d ago via slack" })] }), (0, i.jsxs)("div", { className: (0, a.cx)("text-pretty text-gray-800", "text-[12px]/[19px]", "md:text-[14px]/[20px]"), children: [(0, i.jsx)("p", { children: "Holloway is ready to get started. All known checks are clear. The contract is with Cooper for signature." }), (0, i.jsx)("p", { className: "mt-2.5 md:mt-5", children: "Done when: signed contract back and kickoff on the calendar." })] })] }), (0, i.jsx)("div", { className: (0, a.cx)("mt-1", "rounded-xl bg-white", "shadow-[0_1px_2px_0_#FFF_inset,0_4px_4px_-2px_rgba(0,0,0,0.02),0_2px_2px_-1px_rgba(0,0,0,0.04),0_1px_1px_-0.5px_rgba(0,0,0,0.04),0_0_0_0.5px_rgba(0,0,0,0.08)]", "md:mt-0"), children: (0, i.jsxs)("div", { className: (0, a.cx)("px-3", "flex flex-col"), children: [et.map((e11) => (0, i.jsx)(ea, { ...e11 }, e11.task)), (0, i.jsx)(y.AnimatePresence, { initial: false, children: e10 && (0, i.jsx)(j.motion.div, { className: "overflow-hidden", initial: { height: 0, opacity: 0 }, animate: { height: "auto", opacity: 1 }, exit: { height: 0, opacity: 0 }, transition: ei, children: (0, i.jsx)(ea, { ...es, isSuggested: true }) }, "suggested") })] }) })] })] }), (0, i.jsxs)("div", { className: "mt-[12.5px] px-1 md:mt-4", children: [(0, i.jsx)("div", { className: (0, a.cx)("pl-2", "font-book text-gray-800", "text-[12px]/[17px]", "md:pl-3", "md:text-[14px]/[20px]"), children: "People" }), (0, i.jsx)("div", { className: "mt-1.5 md:mt-1.75", children: er.map((e11) => (0, i.jsx)(en, { ...e11 }, e11.name)) })] })] }), eo = ({ className: e10 }) => {
    let t10 = (0, l.useId)();
    return (0, i.jsxs)("svg", { className: (0, a.cx)("rounded-[6.25px]", "shadow-[0_2px_2px_-1px_rgba(0,0,0,0.02),0_1px_1px_-0.5px_rgba(0,0,0,0.04),0_0.5px_0.5px_-0.25px_rgba(0,0,0,0.06)]", "shadow-[0_2.4px_2.4px_-1.2px_rgba(0,0,0,0.02),0_1.2px_1.2px_-0.6px_rgba(0,0,0,0.04),0_0.6px_0.6px_-0.3px_rgba(0,0,0,0.06)]", "md:rounded-[7.5px]", e10), width: "24", height: "24", fill: "none", viewBox: "0 0 24 24", children: [(0, i.jsx)("rect", { width: "24", height: "24", fill: "#F9ED00", rx: "7.5" }), (0, i.jsx)("rect", { width: "24", height: "24", fill: `url(#${t10})`, fillOpacity: ".02", rx: "7.5" }), (0, i.jsx)("path", { stroke: "#000", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.95", d: "M12 4.781V19.22M5.438 8.063l13.125 7.874m-13.125.001 13.125-7.876" }), (0, i.jsx)("circle", { cx: "12", cy: "12", r: "3", fill: "#000" }), (0, i.jsx)("defs", { children: (0, i.jsxs)("linearGradient", { id: t10, x1: "12", x2: "12", y1: "0", y2: "24", gradientUnits: "userSpaceOnUse", children: [(0, i.jsx)("stop", { stopOpacity: "0" }), (0, i.jsx)("stop", { offset: "1" })] }) }), (0, i.jsx)("rect", { x: ".3", y: ".3", width: "23.4", height: "23.4", rx: "7.2", stroke: "#000", strokeOpacity: ".1", strokeWidth: ".6" })] });
  }, ec = () => (0, i.jsx)("svg", { width: "16", height: "16", fill: "none", viewBox: "0 0 16 16", children: (0, i.jsx)("path", { stroke: "#9BA8A7", strokeLinecap: "round", strokeLinejoin: "round", d: "M5.818 5.818h4.364M5.818 8h4.364m-4.364 2.182H8m5.95 0h-3.768v3.768m-.226.05h-7.41A.545.545 0 0 1 2 13.454V2.545A.545.545 0 0 1 2.545 2h10.91a.545.545 0 0 1 .545.545v7.411a.55.55 0 0 1-.16.385l-3.499 3.5a.55.55 0 0 1-.385.159" }) }), ed = [{ icon: (0, i.jsx)(() => (0, i.jsx)("svg", { width: "16", height: "16", fill: "none", viewBox: "0 0 16 16", children: (0, i.jsx)("path", { stroke: "#9BA8A7", strokeLinecap: "round", strokeLinejoin: "round", d: "M9.375 7.1h2.292M9.375 8.9h2.292m-5.5 0c.76 0 1.375-.604 1.375-1.35S6.926 6.2 6.167 6.2c-.76 0-1.375.604-1.375 1.35S5.407 8.9 6.167 8.9m0 0c-.855 0-1.63.574-1.834 1.35M6.167 8.9c.854 0 1.63.573 1.833 1.35M2.958 3.5h10.084c.253 0 .458.201.458.45v8.1c0 .248-.205.45-.458.45H2.958a.454.454 0 0 1-.458-.45v-8.1c0-.249.205-.45.458-.45" }) }), {}), label: "COO" }, { icon: (0, i.jsx)(() => (0, i.jsx)("svg", { width: "16", height: "16", fill: "none", viewBox: "0 0 16 16", children: (0, i.jsx)("path", { stroke: "#9BA8A7", strokeLinecap: "round", strokeLinejoin: "round", d: "m11.6 8.8-2 2-3.2-.8-2.8-2m8 .8-2-1.6c-.95.956-2.139.995-3.014.436a.4.4 0 0 1-.07-.622L8.8 4.8h2m.8 4 .8-.8M3.6 8l-1.38-.69a.4.4 0 0 1-.178-.536l1.276-2.553a.4.4 0 0 1 .537-.178l1.379.688M3.6 8l1.634-3.269m0 0L8 4l2.766.731m0 0 1.379-.688a.4.4 0 0 1 .537.178l1.276 2.553a.4.4 0 0 1-.179.537L12.4 8m-1.634-3.269L12.4 8m-4.597 4-2.086-.521-1.317-.941" }) }), {}), label: "Champion" }, { icon: (0, i.jsx)(() => (0, i.jsx)("svg", { width: "16", height: "16", fill: "none", viewBox: "0 0 16 16", children: (0, i.jsx)("path", { stroke: "#9BA8A7", strokeLinecap: "round", strokeLinejoin: "round", d: "M8 4.792V8h3.208M13.5 8a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" }) }), {}), label: "7:31 AM" }], eu = [{ title: "Sources", items: [{ icon: (0, i.jsx)(() => {
    let e10 = (0, l.useId)();
    return (0, i.jsxs)("svg", { xmlns: "http://www.w3.org/2000/svg", width: "16", height: "20", fill: "none", viewBox: "0 0 16 20", children: [(0, i.jsx)("path", { fill: `url(#${e10}-side)`, d: "M11.976 5.866H15v8.749a.954.954 0 0 1-.955.954h-1.59a.48.48 0 0 1-.478-.477z" }), (0, i.jsx)("path", { fill: "#FC413D", d: "M4.023 5.866H1v8.749c0 .527.427.954.955.954h1.59a.477.477 0 0 0 .478-.477z" }), (0, i.jsx)("path", { fill: `url(#${e10}-chevron)`, d: "M3.484 4.785A1.512 1.512 0 0 0 1.539 7.1l6.052 5.086a.64.64 0 0 0 .818 0L14.461 7.1a1.511 1.511 0 1 0-1.945-2.314L8 8.581z" }), (0, i.jsxs)("defs", { children: [(0, i.jsxs)("linearGradient", { id: `${e10}-side`, x1: "13.488", x2: "13.488", y1: "5.866", y2: "15.569", gradientUnits: "userSpaceOnUse", children: [(0, i.jsx)("stop", { stopColor: "#60D673" }), (0, i.jsx)("stop", { offset: ".17", stopColor: "#42C868" }), (0, i.jsx)("stop", { offset: ".39", stopColor: "#0EBC5F" }), (0, i.jsx)("stop", { offset: ".62", stopColor: "#00A9BB" }), (0, i.jsx)("stop", { offset: ".86", stopColor: "#3C90FF" }), (0, i.jsx)("stop", { offset: "1", stopColor: "#3186FF" })] }), (0, i.jsxs)("linearGradient", { id: `${e10}-chevron`, x1: "1", x2: "15", y1: "6.032", y2: "6.032", gradientUnits: "userSpaceOnUse", children: [(0, i.jsx)("stop", { offset: ".08", stopColor: "#FF63A0" }), (0, i.jsx)("stop", { offset: ".3", stopColor: "#FC413D" }), (0, i.jsx)("stop", { offset: ".5", stopColor: "#FC413D" }), (0, i.jsx)("stop", { offset: ".65", stopColor: "#FC413D" }), (0, i.jsx)("stop", { offset: ".72", stopColor: "#FC5C30" }), (0, i.jsx)("stop", { offset: ".86", stopColor: "#FEB10C" }), (0, i.jsx)("stop", { offset: ".91", stopColor: "#FEC700" }), (0, i.jsx)("stop", { offset: ".96", stopColor: "#FFDB0F" })] })] })] });
  }, {}), title: "Replied on the security summary", meta: "2d" }, { icon: (0, i.jsx)(() => (0, i.jsx)("svg", { width: "16", height: "20", fill: "none", viewBox: "0 0 16 20", children: (0, i.jsx)("path", { fill: "#8039E9", d: "M14.67 8.92h-4.116c-.227 0-.404.25-.328.45l.984 2.531c.051.1-.05.226-.176.226l-1.263-.075q-.075 0-.151.075l-.96 1.378c-.05.075-.15.1-.252.05l-1.464-.977c-.05-.05-.126-.05-.202 0l-2.02 1.353c-.126.1-.303-.025-.252-.176l.58-2.004c.026-.075-.025-.176-.1-.2l-1.06-.427c-.102-.05-.152-.175-.077-.25l.935-1.153c.05-.05.05-.15 0-.2l-.783-1.128c-.076-.1 0-.25.126-.25l1.237-.1c.101 0 .152-.076.152-.176l-.101-1.704c0-.125.126-.2.227-.175l1.515.626c.075.025.151 0 .202-.05l1.06-1.152c.076-.1.227-.075.278.05l.63 1.603c.077.2.329.276.506.15l2.474-1.828c.277-.2.1-.652-.253-.602l-1.59.2c-.076 0-.152-.024-.177-.1l-.858-2.18a.337.337 0 0 0-.556-.1L6.97 4.61c-.05.05-.126.075-.202.05l-2.45-1.027c-.227-.1-.454.05-.48.3l-.1 2.506c0 .1-.076.15-.152.15l-2.247.15a.336.336 0 0 0-.252.527l1.49 2.18c.05.05.05.15 0 .2l-1.515 1.729c-.127.125-.05.4.151.476l1.742.752a.17.17 0 0 1 .101.2l-1.11 4.285c-.076.3.277.526.53.35l4.165-2.956c.05-.05.126-.05.202 0l1.893 1.328c.152.1.38.075.48-.1l1.187-1.804c.025-.05.1-.075.151-.075l2.828.35c.227.025.454-.15.378-.376l-1.186-3.031a.185.185 0 0 1 .1-.226l2.147-1.002c.303-.15.202-.626-.152-.626" }) }), {}), title: "Led the rollout planning call", meta: "1w" }, { icon: (0, i.jsx)(() => (0, i.jsxs)("svg", { width: "16", height: "20", fill: "none", viewBox: "0 0 16 20", children: [(0, i.jsx)("path", { fill: "#E01E5A", d: "M3.942 11.845c0 .809-.662 1.47-1.471 1.47-.81 0-1.47-.661-1.47-1.47 0-.81.66-1.471 1.47-1.471h1.47zm.741 0c0-.81.66-1.471 1.47-1.471s1.47.661 1.47 1.47v3.682c0 .81-.66 1.47-1.47 1.47s-1.47-.66-1.47-1.47z" }), (0, i.jsx)("path", { fill: "#36C5F0", d: "M6.153 5.94c-.81 0-1.47-.661-1.47-1.47 0-.81.66-1.471 1.47-1.471s1.47.661 1.47 1.47V5.94zm0 .74c.81 0 1.47.662 1.47 1.471 0 .81-.66 1.47-1.47 1.47H2.471c-.81 0-1.47-.66-1.47-1.47s.66-1.47 1.47-1.47z" }), (0, i.jsx)("path", { fill: "#2EB67D", d: "M12.058 8.151c0-.81.661-1.47 1.47-1.47.81 0 1.471.66 1.471 1.47s-.66 1.47-1.47 1.47h-1.47zm-.741 0c0 .81-.661 1.47-1.47 1.47-.81 0-1.471-.66-1.471-1.47V4.47c0-.81.661-1.471 1.47-1.471.81 0 1.471.661 1.471 1.47z" }), (0, i.jsx)("path", { fill: "#ECB22E", d: "M9.846 14.06c.81 0 1.471.66 1.471 1.47S10.656 17 9.847 17c-.81 0-1.471-.66-1.471-1.47v-1.47zm0-.745c-.809 0-1.47-.661-1.47-1.47 0-.81.661-1.471 1.47-1.471h3.683c.81 0 1.47.661 1.47 1.47 0 .81-.66 1.471-1.47 1.471z" })] }), {}), title: "Quoted by Cooper in #holloway", meta: "2w" }] }, { title: "Related", items: [{ icon: (0, i.jsx)(() => (0, i.jsxs)("svg", { width: "16", height: "20", fill: "none", viewBox: "0 0 16 20", children: [(0, i.jsx)("circle", { cx: "8", cy: "10", r: "6", stroke: "#008125", strokeDasharray: ".05 3", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2" }), (0, i.jsx)("path", { stroke: "#008125", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M8 4a6 6 0 1 1-5.196 9" })] }), {}), title: "DEAL-132", meta: "$18k" }, { icon: (0, i.jsx)(() => {
    let e10 = (0, l.useId)();
    return (0, i.jsxs)("svg", { className: "rounded-[5px] shadow-[0_1.6px_1.6px_-0.8px_rgba(0,0,0,0.02),0_0.8px_0.8px_-0.4px_rgba(0,0,0,0.04),0_0.4px_0.4px_-0.2px_rgba(0,0,0,0.06)]", width: "16", height: "16", fill: "none", viewBox: "0 0 16 16", children: [(0, i.jsx)("rect", { width: "16", height: "16", fill: "#F9ED00", rx: "5" }), (0, i.jsx)("rect", { width: "16", height: "16", fill: `url(#${e10})`, fillOpacity: ".02", rx: "5" }), (0, i.jsx)("path", { stroke: "#000", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.3", d: "M8 3.188v9.625M3.625 5.375l8.75 5.25m-8.75 0 8.75-5.25" }), (0, i.jsx)("circle", { cx: "8", cy: "8", r: "2", fill: "#000" }), (0, i.jsx)("defs", { children: (0, i.jsxs)("linearGradient", { id: e10, x1: "8", x2: "8", y1: "0", y2: "16", gradientUnits: "userSpaceOnUse", children: [(0, i.jsx)("stop", { stopOpacity: "0" }), (0, i.jsx)("stop", { offset: "1" })] }) }), (0, i.jsx)("rect", { x: ".1", y: ".1", width: "15.8", height: "15.8", rx: "4.9", stroke: "#000", strokeOpacity: ".1", strokeWidth: ".2" })] });
  }, {}), title: "Holloway", meta: "Account" }] }], ep = ["quota", "deal", "person"], ex = (0, i.jsx)(() => (0, i.jsxs)("div", { className: "pb-2", children: [(0, i.jsxs)("div", { className: "p-3 md:p-4", children: [(0, i.jsxs)("div", { className: "flex items-center gap-x-2.5", children: [(0, i.jsx)("div", { className: (0, a.cx)("rounded-md bg-white", "shadow-[0_-1px_0_-0.5px_rgba(0,0,0,0.08)_inset,0_0_0_0.5px_rgba(0,0,0,0.16)_inset,0_2px_2px_-1px_rgba(0,0,0,0.04)]"), children: (0, i.jsx)(C, {}) }), (0, i.jsx)("div", { className: (0, a.cx)("font-medium text-gray-900", "text-[15px]/[24px]", "md:text-[17px]/[24px] md:tracking-[-0.255px]"), children: "Monthly Quota" })] }), (0, i.jsxs)("div", { className: (0, a.cx)("mt-3", "p-[3.5px]", "rounded-2xl border border-black/2 bg-black/3", "md:mt-4"), children: [(0, i.jsxs)("div", { className: (0, a.cx)("px-2 pt-[7.5px] pb-2", "flex flex-col gap-y-2.5", "md:px-3 md:pt-2.5 md:pb-3", "md:gap-y-3.5"), children: [(0, i.jsxs)("div", { className: "flex items-center gap-x-1.5 md:gap-x-2", children: [(0, i.jsx)(S, {}), (0, i.jsx)("div", { className: (0, a.cx)("font-book text-gray-700", "text-[12px]/[17px]", "md:text-[14px]/[20px]"), children: "Objective" })] }), (0, i.jsx)("div", { className: (0, a.cx)("text-pretty text-gray-800", "text-[12px]/[19px]", "md:text-[14px]/[20px]"), children: "Close $90K in new business by the end of September. Track attainment daily and keep the highest-value open deals moving." })] }), (0, i.jsx)(M, {})] })] }), (0, i.jsxs)("div", { className: "mt-[12.5px] px-1 md:mt-4", children: [(0, i.jsx)(E, { title: "Commit", value: "$36k", deals: [{ logo: (0, i.jsx)(R, {}), name: "Holloway", status: "Contract out for signature", stage: "Closes Sep 15", value: "$18k" }, { logo: (0, i.jsx)(D, {}), name: "Tideline", status: "Verbal yes", stage: "In security review", value: "$12k" }, { logo: (0, i.jsx)(L, {}), name: "Bramble", status: "Pricing agreed", stage: "Closes Sep 26", value: "$6k" }] }), (0, i.jsx)("hr", { className: "mx-2 my-[15.5px] border-t-[0.5px] border-black/12 md:mx-0 md:my-6" }), (0, i.jsx)(E, { title: "Best case", value: "$29k", deals: [{ logo: (0, i.jsx)(O, {}), name: "Fielded", status: "Gone quiet 9 days", stage: "Closes Sep 24", value: "$4k" }, { logo: (0, i.jsx)(T, {}), name: "Halden", status: "Champion aligned", stage: "Needs exec sign-off", value: "$25k" }] })] })] }), {}), eh = (0, i.jsx)(() => (0, i.jsxs)("div", { className: "pb-2", children: [(0, i.jsxs)("div", { className: "p-3 md:p-4", children: [(0, i.jsxs)("div", { className: "flex items-center gap-x-2.5", children: [(0, i.jsxs)("div", { className: "relative", children: [(0, i.jsx)(P.default, { className: "size-6 rounded-full", src: Y, alt: "Kierra Torres" }), (0, i.jsx)("div", { className: (0, a.cx)("absolute inset-0 rounded-full", "border-[0.5px] border-black/12") })] }), (0, i.jsx)("div", { className: "flex items-center gap-x-1.5", children: (0, i.jsx)("div", { className: (0, a.cx)("font-medium text-gray-900", "text-[15px]/[24px]", "md:text-[17px]/[24px] md:tracking-[-0.255px]"), children: "Kierra Torres" }) })] }), (0, i.jsxs)("div", { className: (0, a.cx)("mt-3", "flex items-center justify-between", "md:mt-4"), children: [(0, i.jsx)("div", { className: "flex items-center gap-x-1.5", children: ed.map(({ icon: e10, label: t10 }, r10) => (0, i.jsxs)("div", { className: (0, a.cx)("py-[1.5px] pr-[7.5px] pl-[3.5px]", "flex items-center gap-x-1", "rounded-md", "border-[0.5px] border-black/2 bg-black/3", "md:py-[3.5px] md:pr-[7.5px] md:pl-[3.5px]"), children: [e10, (0, i.jsx)("div", { className: (0, a.cx)("font-book text-gray-700", "text-[11px]/[14px]", "md:text-[12px]/[16px]"), children: t10 })] }, t10)) }), (0, i.jsx)(eo, { className: "size-5 md:size-6" })] }), (0, i.jsx)("div", { className: (0, a.cx)("mt-1.5", "p-[3.5px]", "rounded-2xl border border-black/2 bg-black/3", "md:mt-2"), children: (0, i.jsxs)("div", { className: (0, a.cx)("px-2 pt-[7.5px] pb-1", "flex flex-col gap-y-2.5", "md:px-3 md:pt-2.5 md:pb-2", "md:gap-y-3.5"), children: [(0, i.jsxs)("div", { className: (0, a.cx)("flex items-center justify-between"), children: [(0, i.jsxs)("div", { className: "flex items-center gap-x-1.5 md:gap-x-2", children: [(0, i.jsx)(ec, {}), (0, i.jsx)("div", { className: (0, a.cx)("font-book text-gray-700", "text-[12px]/[17px]", "md:text-[14px]/[20px]"), children: "Memory" })] }), (0, i.jsx)("div", { className: "text-[12px]/[17px] text-gray-500", children: "2d ago via slack" })] }), (0, i.jsxs)("ul", { className: (0, a.cx)("space-y-1.5", "text-pretty text-gray-800", "text-[12px]/[17px]", "[&>li]:relative [&>li]:pl-6", "[&>li]:before:absolute [&>li]:before:top-[7.5px] [&>li]:before:left-1.5", "[&>li]:before:size-1 [&>li]:before:rounded-full [&>li]:before:bg-gray-600 [&>li]:before:content-['']", "md:space-y-3", "md:text-[14px]/[20px]", "md:[&>li]:before:top-2"), children: [(0, i.jsx)("li", { children: "Prefers tea to coffee." }), (0, i.jsx)("li", { children: "Prefers Thursday calls \u2014 mornings, before her exec sync." }), (0, i.jsx)("li", { children: "Wants the SSO details in writing before anything goes to IT review." })] })] }) })] }), (0, i.jsx)("div", { className: "mt-[12.5px] px-1 md:mt-4", children: (0, i.jsx)("div", { children: eu.map(({ title: e10, items: t10 }, r10) => (0, i.jsxs)(i.Fragment, { children: [0 !== r10 && (0, i.jsx)("hr", { className: "mx-2 my-3.75 border-[0.5px] border-black/12 md:mx-3 md:my-5.75" }), (0, i.jsxs)("div", { children: [(0, i.jsx)("div", { className: (0, a.cx)("pl-2", "font-book text-gray-800", "text-[12px]/[17px]", "md:pl-3", "md:text-[14px]/[20px]"), children: e10 }), (0, i.jsx)("div", { className: "mt-1.5 md:mt-1.75", children: t10.map(({ icon: e11, title: t11, meta: r11 }) => (0, i.jsxs)("div", { className: (0, a.cx)("px-2 py-1.5", "flex items-center gap-x-2", "md:px-3 md:py-2.5"), children: [e11, (0, i.jsxs)("div", { className: "flex items-center gap-x-1.5 md:gap-x-2", children: [(0, i.jsx)("div", { className: "text-[12px]/[17px] text-gray-700 md:text-[14px]/[20px]", children: t11 }), (0, i.jsx)("div", { className: "text-[12px]/[17px] text-gray-500 md:text-[14px]/[20px]", children: r11 })] })] }, t11)) })] })] }, e10)) }) })] }), {}), eg = { top: { origin: "origin-top", direction: -1, depthOffset: 12, padding: "p-[3.5px]" }, bottom: { origin: "origin-bottom", direction: 1, depthOffset: 6, padding: "px-[3.5px] pt-[3.5px] pb-[15.5px]" } }, ef = ({ activePanel: e10, delay: t10 = 0, deal: r10, peek: n10 = "top" }) => {
    let { origin: s2, direction: o2, depthOffset: c2, padding: d2 } = eg[n10], u2 = -(24 * o2), p2 = ep.indexOf(e10), x2 = { delay: t10, duration: 0.625, ease: w, opacity: { delay: t10, duration: 0.25, ease: w } }, h2 = r10?.hasSuggestedTodo, g2 = { quota: ex, deal: (0, l.useMemo)(() => (0, i.jsx)(el, { hasSuggestedTodo: h2 }), [h2]), person: eh };
    return (0, i.jsx)("div", { className: (0, a.cx)("h-132", d2, "grid grid-rows-[minmax(0,1fr)] *:col-start-1 *:row-start-1", "md:p-0", "md:absolute md:top-12 md:-right-3 md:w-[384px]", "md:h-173", "lg:top-26 lg:-right-14"), children: (0, i.jsx)(y.AnimatePresence, { initial: false, children: ep.slice(0, p2 + 1).map((e11, t11) => {
      let r11 = p2 - t11;
      return (0, i.jsx)(j.motion.div, { className: (0, a.cx)("grid grid-rows-[minmax(0,1fr)]", "will-change-[transform,opacity,filter]", s2), initial: { opacity: 0, y: u2, filter: "blur(0px)" }, animate: { opacity: 1, y: o2 * r11 * c2, scale: 1 - 0.0625 * r11, filter: `blur(${0.25 * r11}px)` }, exit: { opacity: 0, y: u2 }, transition: x2, children: (0, i.jsx)(_, { children: g2[e11] }) }, e11);
    }) }) });
  };
  var em = e.i(288799), eb = e.i(154989), ev = e.i(819622);
  let ey = [0.42, 0, 0.12, 1], ej = ({ variant: e10 = "pointer" }) => {
    let t10 = "touch" === e10, { step: r10, cursor: n10, getTargetElement: s2, getTargetAt: o2, setHoveredTarget: c2, setPressedTarget: d2, finishCursorAction: u2 } = z(), { pressedTarget: p2 } = I(), x2 = (0, ev.useReducedMotion)(), h2 = (0, l.useRef)(null), g2 = (0, l.useRef)(false), f2 = (0, l.useRef)(null), m2 = (0, l.useRef)(null), b2 = (0, eb.useMotionValue)(0), v2 = (0, eb.useMotionValue)(0), y2 = (0, eb.useMotionValue)(0);
    return (0, l.useEffect)(() => {
      let e11, i2 = () => {
        if (t10) return;
        let e12 = h2.current, r11 = e12?.getBoundingClientRect(), n11 = r11 && g2.current ? o2(r11.left + b2.get(), r11.top + v2.get()) : null;
        n11 !== m2.current && (m2.current = n11, c2(n11));
      };
      if (!n10) {
        g2.current = false, f2.current = null, i2();
        let e12 = (0, em.animate)(y2, 0, { duration: 0.2 });
        return () => e12.stop();
      }
      let { target: a2, action: l2 } = n10, p3 = !l2 && g2.current && f2.current === a2;
      f2.current = a2;
      let j2 = false, k2 = 0, w2 = false, A2 = [], _2 = (t11) => new Promise((r11) => {
        e11 = setTimeout(r11, t11);
      }), C2 = () => {
        let e12 = h2.current, t11 = s2(a2);
        if (!e12 || !t11) return null;
        let r11 = e12.getBoundingClientRect(), n11 = t11.getBoundingClientRect();
        return { x: n11.left + n11.width / 2 - r11.left, y: n11.top + n11.height / 2 - r11.top };
      }, S2 = () => {
        let e12;
        w2 && ((e12 = C2()) && (b2.set(e12.x), v2.set(e12.y)), i2());
      };
      return window.addEventListener("resize", S2), (async () => {
        let e12 = p3 ? null : C2();
        if (e12 || "click" !== l2 || (e12 = await new Promise((e13) => {
          performance.now();
          let t11 = (r11) => {
            let n11 = C2();
            if (n11) return e13(n11);
            k2 = requestAnimationFrame(t11);
          };
          k2 = requestAnimationFrame(t11);
        }), !j2)) {
          if (e12) {
            if (!g2.current) {
              g2.current = true;
              let t12 = h2.current?.offsetHeight ?? e12.y;
              b2.set(e12.x + 48), v2.set(t12 + 16);
            }
            A2.push((0, em.animate)(y2, 1, { duration: 0.2 }));
            let t11 = { x: b2.get(), y: v2.get() }, r11 = e12, n11 = Math.hypot(r11.x - t11.x, r11.y - t11.y);
            if (n11 > 1) {
              let e13 = (0, em.animate)(0, 1, { duration: x2 ? 0 : Math.min(Math.max(0.3 + n11 / 850, 0.38), 1.06), ease: ey, onUpdate: (e14) => {
                var n12;
                let s3, a3, l3, o3, c3, d3 = (s3 = (n12 = r11 = C2() ?? r11).x - t11.x, a3 = n12.y - t11.y, l3 = s3 >= 0 ? 0.12 : -0.12, o3 = { x: t11.x + s3 / 2 - a3 * l3, y: t11.y + a3 / 2 + s3 * l3 }, { x: (c3 = 1 - e14) * c3 * t11.x + 2 * c3 * e14 * o3.x + e14 * e14 * n12.x, y: c3 * c3 * t11.y + 2 * c3 * e14 * o3.y + e14 * e14 * n12.y });
                b2.set(d3.x), v2.set(d3.y), i2();
              } });
              if (A2.push(e13), await e13, j2) return;
            }
          }
          if (w2 = true, !t10) {
            let e13 = performance.now() + 1500, t11 = (r11) => {
              i2(), r11 < e13 && (k2 = requestAnimationFrame(t11));
            };
            k2 = requestAnimationFrame(t11);
          }
          "click" !== l2 || (await _2(40), j2 || (d2(a2), await _2(120), j2 || (d2(null), u2(r10))));
        }
      })(), () => {
        j2 = true, A2.forEach((e12) => e12.stop()), clearTimeout(e11), cancelAnimationFrame(k2), window.removeEventListener("resize", S2), d2(null);
      };
    }, [r10, n10, s2, o2, c2, d2, u2, x2, t10, b2, v2, y2]), (0, i.jsx)("div", { ref: h2, "data-home-ui-cursor-layer": true, "aria-hidden": "true", className: "absolute inset-0 z-50", children: (0, i.jsx)(j.motion.div, { className: "pointer-events-none absolute top-0 left-0", style: { x: b2, y: v2, opacity: y2 }, animate: { scale: p2 ? 0.85 : 1 }, transition: { duration: 0.12 }, children: t10 ? (0, i.jsx)("div", { className: (0, a.cx)("absolute -top-2.5 -left-2.5 size-5", "rounded-full border border-black/24", "shadow-[0_0_0_1px_rgba(255,255,255,0.4)]", "transition-colors duration-120", p2 ? "bg-black/32" : "bg-black/16") }) : (0, i.jsx)("svg", { className: "-translate-x-px -translate-y-px drop-shadow-[0_1px_2px_rgba(0,0,0,0.24)]", width: "16", height: "22", viewBox: "0 0 16 22", fill: "none", children: (0, i.jsx)("path", { d: "M1 1v16.5l4.1-3.8 2.7 6.2 2.7-1.2-2.6-6.1H13.5L1 1Z", fill: "#1C1917", stroke: "#fff", strokeWidth: "1.25", strokeLinejoin: "round" }) }) }) });
  };
  e.s([], 930477), e.i(930477);
  var ek = e.i(69049), ew = e.i(536434), eA = e.i(105128);
  let e_ = l.createContext(void 0);
  function eC(e10) {
    let t10 = l.useContext(e_);
    if (void 0 === t10 && !e10) throw Error((0, eA.default)(72));
    return t10;
  }
  var eS = e.i(827064), eN = e.i(256871), eM = e.i(880269), eE = e.i(820222), eR = e.i(429860);
  function eD(e10) {
    return null != e10 && null != e10.clientX;
  }
  var eL = e.i(36154), eO = e.i(108665), eT = e.i(680718), eP = e.i(997552), eF = e.i(385683), eB = e.i(276510), ez = e.i(76778), eI = e.i(586411), e$ = e.i(308915);
  let eH = { ...eI.popupStoreSelectors, disabled: (0, eF.createSelector)((e10) => e10.disabled), instantType: (0, eF.createSelector)((e10) => e10.instantType), isInstantPhase: (0, eF.createSelector)((e10) => e10.isInstantPhase), trackCursorAxis: (0, eF.createSelector)((e10) => e10.trackCursorAxis), disableHoverablePopup: (0, eF.createSelector)((e10) => e10.disableHoverablePopup), lastOpenChangeReason: (0, eF.createSelector)((e10) => e10.openChangeReason), closeOnClick: (0, eF.createSelector)((e10) => e10.closeOnClick), closeDelay: (0, eF.createSelector)((e10) => e10.closeDelay), hasViewport: (0, eF.createSelector)((e10) => e10.hasViewport) };
  class eV extends eB.ReactStore {
    constructor(e10, t10, r10 = false) {
      const n10 = new e$.PopupTriggerMap(), s2 = { ...{ ...(0, eI.createInitialPopupStoreState)(), disabled: false, instantType: void 0, isInstantPhase: false, trackCursorAxis: "none", disableHoverablePopup: false, openChangeReason: null, closeOnClick: true, closeDelay: 0, hasViewport: false }, ...e10 };
      s2.floatingRootContext = (0, eI.createPopupFloatingRootContext)(n10, t10, r10), super(s2, { popupRef: l.createRef(), onOpenChange: void 0, onOpenChangeComplete: void 0, triggerElements: n10 }, eH);
    }
    setOpen = (e10, t10) => {
      (0, eT.applyPopupOpenChange)(this, e10, t10, { extraState: { openChangeReason: t10.reason } });
    };
    cancelPendingOpen(e10) {
      this.state.floatingRootContext.dispatchOpenChange(false, (0, eO.createChangeEventDetails)(ez.REASONS.triggerPress, e10));
    }
    static useStore(e10, t10) {
      return (0, eT.usePopupStore)(e10, (e11, r10) => new eV(t10, e11, r10)).store;
    }
  }
  let eU = (0, ek.fastComponent)(function(e10) {
    let { disabled: t10 = false, defaultOpen: r10 = false, open: n10, disableHoverablePopup: s2 = false, trackCursorAxis: a2 = "none", actionsRef: o2, onOpenChange: c2, onOpenChangeComplete: d2, handle: u2, triggerId: p2, defaultTriggerId: x2 = null, children: h2 } = e10, g2 = eV.useStore(u2?.store, { open: r10, openProp: n10, activeTriggerId: x2, triggerIdProp: p2 });
    (0, eT.useInitialOpenSync)(g2, n10, r10, x2), g2.useControlledProp("openProp", n10), g2.useControlledProp("triggerIdProp", p2), g2.useContextCallback("onOpenChange", c2), g2.useContextCallback("onOpenChangeComplete", d2);
    let f2 = g2.useState("open"), m2 = !t10 && f2, b2 = g2.useState("activeTriggerId"), v2 = g2.useState("mounted"), y2 = g2.useState("payload");
    g2.useSyncedValues({ trackCursorAxis: a2, disableHoverablePopup: s2 }), g2.useSyncedValue("disabled", t10), (0, eT.useImplicitActiveTrigger)(g2, { closeOnActiveTriggerUnmount: true });
    let { forceUnmount: j2, transitionStatus: k2 } = (0, eT.useOpenStateTransitions)(m2, g2), w2 = g2.useState("isInstantPhase"), A2 = g2.useState("instantType"), _2 = g2.useState("lastOpenChangeReason"), C2 = l.useRef(null);
    (0, ew.useIsoLayoutEffect)(() => {
      f2 && t10 && g2.setOpen(false, (0, eO.createChangeEventDetails)(ez.REASONS.disabled));
    }, [f2, t10, g2]), (0, ew.useIsoLayoutEffect)(() => {
      "ending" === k2 && _2 === ez.REASONS.none || "ending" !== k2 && w2 ? ("delay" !== A2 && (C2.current = A2), g2.set("instantType", "delay")) : null !== C2.current && (g2.set("instantType", C2.current), C2.current = null);
    }, [k2, w2, _2, A2, g2]), (0, ew.useIsoLayoutEffect)(() => {
      m2 && null == b2 && g2.set("payload", void 0);
    }, [g2, b2, m2]);
    let S2 = l.useCallback(() => {
      g2.setOpen(false, (0, eO.createChangeEventDetails)(ez.REASONS.imperativeAction));
    }, [g2]);
    l.useImperativeHandle(o2, () => ({ unmount: j2, close: S2 }), [j2, S2]);
    let N2 = m2 || v2 || !t10 && "none" !== a2;
    return (0, i.jsxs)(e_.Provider, { value: g2, children: [N2 && (0, i.jsx)(eW, { store: g2, disabled: t10, trackCursorAxis: a2 }), "function" == typeof h2 ? h2({ payload: y2 }) : h2] });
  });
  function eW({ store: e10, disabled: t10, trackCursorAxis: r10 }) {
    let n10 = e10.useState("floatingRootContext"), s2 = (0, eL.useDismiss)(n10, { enabled: !t10, referencePress: () => e10.select("closeOnClick") }), i2 = function(e11, t11 = {}) {
      let { enabled: r11 = true, axis: n11 = "both" } = t11, s3 = "rootStore" in e11 ? e11.rootStore : e11, i3 = s3.useState("open"), a3 = s3.useState("floatingElement"), o3 = s3.useState("domReferenceElement"), c3 = s3.context.dataRef, d2 = l.useRef(false), u2 = l.useRef(null), [p2, x2] = l.useState(), [h2, g2] = l.useState([]), f2 = (0, eN.useStableCallback)((e12) => {
        s3.set("positionReference", e12);
      }), m2 = (0, eN.useStableCallback)((e12, t12, r12) => {
        if (!d2.current && (!c3.current.openEvent || eD(c3.current.openEvent))) {
          var i4, a4;
          let l2, d3, u3;
          s3.set("positionReference", (i4 = r12 ?? o3, a4 = { x: e12, y: t12, axis: n11, dataRef: c3, pointerType: p2 }, l2 = null, d3 = null, u3 = false, { contextElement: i4 || void 0, getBoundingClientRect() {
            let e13 = i4?.getBoundingClientRect() || { width: 0, height: 0, x: 0, y: 0 }, t13 = "x" === a4.axis || "both" === a4.axis, r13 = "y" === a4.axis || "both" === a4.axis, n12 = ["mouseenter", "mousemove"].includes(a4.dataRef.current.openEvent?.type || "") && "touch" !== a4.pointerType, s4 = e13.width, o4 = e13.height, c4 = e13.x, p3 = e13.y;
            return null == l2 && a4.x && t13 && (l2 = e13.x - a4.x), null == d3 && a4.y && r13 && (d3 = e13.y - a4.y), c4 -= l2 || 0, p3 -= d3 || 0, s4 = 0, o4 = 0, !u3 || n12 ? (s4 = "y" === a4.axis ? e13.width : 0, o4 = "x" === a4.axis ? e13.height : 0, c4 = t13 && null != a4.x ? a4.x : c4, p3 = r13 && null != a4.y ? a4.y : p3) : u3 && !n12 && (o4 = "x" === a4.axis ? e13.height : o4, s4 = "y" === a4.axis ? e13.width : s4), u3 = true, { width: s4, height: o4, x: c4, y: p3, top: p3, right: c4 + s4, bottom: p3 + o4, left: c4 };
          } }));
        }
      }), b2 = (0, eN.useStableCallback)((e12) => {
        i3 ? u2.current || (m2(e12.clientX, e12.clientY, e12.currentTarget), g2([])) : m2(e12.clientX, e12.clientY, e12.currentTarget);
      }), v2 = (0, eR.isMouseLikePointerType)(p2) ? a3 : i3;
      l.useEffect(() => {
        if (!r11) return void f2(o3);
        if (!v2) return;
        function e12() {
          u2.current?.(), u2.current = null;
        }
        let t12 = (0, eM.getWindow)(a3);
        return !c3.current.openEvent || eD(c3.current.openEvent) ? u2.current = (0, eS.addEventListener)(t12, "mousemove", function(t13) {
          let r12 = (0, eE.getTarget)(t13);
          (0, eE.contains)(a3, r12) ? e12() : m2(t13.clientX, t13.clientY);
        }) : f2(o3), e12;
      }, [v2, r11, a3, c3, o3, s3, m2, f2, h2]), l.useEffect(() => () => {
        s3.set("positionReference", null);
      }, [s3]), l.useEffect(() => {
        r11 && !a3 && (d2.current = false);
      }, [r11, a3]), l.useEffect(() => {
        !r11 && i3 && (d2.current = true);
      }, [r11, i3]);
      let y2 = l.useMemo(() => {
        function e12(e13) {
          x2(e13.pointerType);
        }
        return { onPointerDown: e12, onPointerEnter: e12, onMouseMove: b2, onMouseEnter: b2 };
      }, [b2]);
      return l.useMemo(() => r11 ? { reference: y2, trigger: y2 } : {}, [r11, y2]);
    }(n10, { enabled: !t10 && "none" !== r10, axis: "none" === r10 ? void 0 : r10 }), a2 = l.useMemo(() => (0, eP.mergeProps)(i2.reference, s2.reference), [i2.reference, s2.reference]), o2 = l.useMemo(() => (0, eP.mergeProps)(i2.trigger, s2.trigger), [i2.trigger, s2.trigger]), c2 = l.useMemo(() => (0, eP.mergeProps)(eT.FOCUSABLE_POPUP_PROPS, i2.floating, s2.floating), [i2.floating, s2.floating]);
    return (0, eT.usePopupInteractionProps)(e10, { activeTriggerProps: a2, inactiveTriggerProps: o2, popupProps: c2 }), null;
  }
  var eQ = e.i(782868), eK = e.i(204593), eZ = e.i(171199), eq = e.i(758661), eY = e.i(186950);
  let eG = l.createContext(void 0);
  var eJ = e.i(52654), eX = e.i(554208);
  let e0 = l.createContext({ hasProvider: false, timeoutMs: 0, delayRef: { current: 0 }, initialDelayRef: { current: 0 }, timeout: new eQ.Timeout(), currentIdRef: { current: null }, currentContextRef: { current: null } });
  function e1(e10) {
    let { children: t10, delay: r10, timeoutMs: n10 = 0 } = e10, s2 = l.useRef(r10), a2 = l.useRef(r10), o2 = l.useRef(null), c2 = l.useRef(null), d2 = (0, eQ.useTimeout)();
    return (0, ew.useIsoLayoutEffect)(() => {
      if (a2.current = r10, !o2.current) {
        s2.current = r10;
        return;
      }
      s2.current = { open: (0, eX.getDelay)(s2.current, "open"), close: (0, eX.getDelay)(r10, "close") };
    }, [r10, o2, s2, a2]), (0, i.jsx)(e0.Provider, { value: l.useMemo(() => ({ hasProvider: true, delayRef: s2, initialDelayRef: a2, currentIdRef: o2, timeoutMs: n10, currentContextRef: c2, timeout: d2 }), [n10, d2]), children: t10 });
  }
  var e2 = e.i(919240), e5 = e.i(983355), e4 = e.i(310952), e6 = e.i(66859), e3 = e.i(617727);
  let e7 = e2.platform.os.mac && e2.platform.engine.webkit;
  var e8 = e.i(560746);
  let e9 = ((t = {})[t.popupOpen = eZ.CommonTriggerDataAttributes.popupOpen] = "popupOpen", t.triggerDisabled = "data-trigger-disabled", t);
  var te = e.i(622861);
  let tt = "data-base-ui-tooltip-trigger";
  function tr(e10) {
    if ("composedPath" in e10) {
      let t11 = e10.composedPath();
      for (let e11 = 0; e11 < t11.length; e11 += 1) {
        let r10 = t11[e11];
        if ((0, eM.isElement)(r10)) return r10;
      }
    }
    let t10 = e10.target;
    return (0, eM.isElement)(t10) ? t10 : null;
  }
  let tn = (0, ek.fastComponentRef)(function(e10, t10) {
    let { render: r10, className: n10, style: s2, handle: i2, payload: a2, disabled: o2, delay: c2, closeOnClick: d2 = true, closeDelay: u2, id: p2, ...x2 } = e10, h2 = eC(true), g2 = i2?.store ?? h2;
    if (!g2) throw Error((0, eA.default)(82));
    let f2 = (0, eY.useBaseUiId)(p2), m2 = g2.useState("isTriggerActive", f2), b2 = g2.useState("isOpenedByTrigger", f2), v2 = g2.useState("floatingRootContext"), y2 = l.useRef(null), j2 = c2 ?? 600, k2 = u2 ?? 0, { registerTrigger: w2, isMountedByThisTrigger: A2 } = (0, eT.useTriggerDataForwarding)(f2, y2, g2, { payload: a2, closeOnClick: d2, closeDelay: k2 }), _2 = l.useContext(eG), { delayRef: C2, isInstantPhase: S2, hasProvider: N2 } = function(e11, t11 = { open: false }) {
      let { open: r11 } = t11, n11 = "rootStore" in e11 ? e11.rootStore : e11, s3 = n11.useState("floatingId"), { currentIdRef: i3, delayRef: a3, timeoutMs: o3, initialDelayRef: c3, currentContextRef: d3, hasProvider: u3, timeout: p3 } = l.useContext(e0), [x3, h3] = l.useState(false), g3 = l.useRef(r11), f3 = l.useRef(false);
      return (0, ew.useIsoLayoutEffect)(() => {
        g3.current = r11;
      }, [r11]), (0, ew.useIsoLayoutEffect)(() => () => {
        f3.current = true;
      }, []), (0, ew.useIsoLayoutEffect)(() => {
        function e12() {
          f3.current || h3(false), d3.current?.setIsInstantPhase(false), i3.current = null, d3.current = null, a3.current = c3.current, p3.clear();
        }
        if (i3.current && !r11 && i3.current === s3) {
          if (h3(false), o3) return p3.start(o3, () => {
            n11.select("open") || i3.current && i3.current !== s3 || e12();
          }), () => {
            (g3.current || i3.current !== s3) && p3.clear();
          };
          e12();
        }
      }, [r11, s3, i3, a3, o3, c3, d3, p3, n11]), (0, ew.useIsoLayoutEffect)(() => {
        if (!r11) return;
        let e12 = d3.current, t12 = i3.current;
        p3.clear(), d3.current = { onOpenChange: n11.setOpen, setIsInstantPhase: h3 }, i3.current = s3, a3.current = { open: 0, close: (0, eX.getDelay)(c3.current, "close") }, null !== t12 && t12 !== s3 ? (h3(true), e12?.setIsInstantPhase(true), e12?.onOpenChange(false, (0, eO.createChangeEventDetails)(ez.REASONS.none))) : (h3(false), e12?.setIsInstantPhase(false));
      }, [r11, s3, n11, i3, a3, c3, d3, p3]), (0, ew.useIsoLayoutEffect)(() => () => {
        i3.current === s3 && (d3.current = null, g3.current) && (i3.current = null, a3.current = c3.current, p3.clear());
      }, [d3, i3, a3, s3, c3, p3]), l.useMemo(() => ({ hasProvider: u3, delayRef: a3, isInstantPhase: x3 }), [u3, a3, x3]);
    }(v2, { open: b2 }), M2 = (0, te.useHoverInteractionSharedState)(v2);
    g2.useSyncedValue("isInstantPhase", S2);
    let E2 = g2.useState("disabled"), R2 = o2 ?? E2, D2 = (0, eK.useValueAsRef)(R2), L2 = g2.useState("trackCursorAxis"), O2 = g2.useState("disableHoverablePopup"), T2 = l.useRef(false), P2 = (0, eQ.useTimeout)(), F2 = l.useRef(void 0);
    function B2() {
      let e11 = _2?.delay, t11 = "object" == typeof C2.current ? C2.current.open : void 0, r11 = j2;
      return N2 && (r11 = 0 !== t11 ? c2 ?? e11 ?? j2 : 0), r11;
    }
    function z2(e11) {
      let t11 = y2.current;
      if (!t11 || !e11) return false;
      let r11 = function(e12) {
        let t12 = e12;
        for (; t12; ) {
          if (t12.hasAttribute(tt)) return t12;
          let e13 = t12.parentElement;
          if (e13) {
            t12 = e13;
            continue;
          }
          let r12 = t12.getRootNode();
          t12 = "host" in r12 && (0, eM.isElement)(r12.host) ? r12.host : null;
        }
        return null;
      }(e11);
      return null !== r11 && r11 !== t11 && (0, eE.contains)(t11, r11);
    }
    let I2 = (0, e8.useHoverReferenceInteraction)(v2, { enabled: !R2, mouseOnly: true, move: false, handleClose: O2 || "both" === L2 ? null : (0, eJ.safePolygon)(), restMs: B2, delay() {
      let e11 = "object" == typeof C2.current ? C2.current.close : void 0, t11 = k2;
      return null == u2 && N2 && (t11 = e11), { close: t11 };
    }, triggerElementRef: y2, isActiveTrigger: m2, isClosing: () => "ending" === g2.select("transitionStatus"), shouldOpen: () => !T2.current }), $2 = function(e11, t11 = {}) {
      let { enabled: r11 = true, delay: n11 } = t11, s3 = "rootStore" in e11 ? e11.rootStore : e11, { events: i3, dataRef: a3 } = s3.context, o3 = l.useRef(false), c3 = l.useRef(null), d3 = l.useRef(true), u3 = (0, eQ.useTimeout)();
      l.useEffect(() => {
        let e12 = s3.select("domReferenceElement");
        if (!r11) return;
        let t12 = (0, eM.getWindow)(e12);
        return (0, e5.mergeCleanups)((0, eS.addEventListener)(t12, "blur", function() {
          let e13 = s3.select("domReferenceElement");
          !s3.select("open") && (0, eM.isHTMLElement)(e13) && e13 === (0, eE.activeElement)((0, e4.ownerDocument)(e13)) && (o3.current = true);
        }), e7 && (0, eS.addEventListener)(t12, "keydown", function() {
          d3.current = true;
        }, true), e7 && (0, eS.addEventListener)(t12, "pointerdown", function() {
          d3.current = false;
        }, true));
      }, [s3, r11]), l.useEffect(() => {
        if (r11) return i3.on("openchange", e12), () => {
          i3.off("openchange", e12);
        };
        function e12(e13) {
          if (e13.reason === ez.REASONS.triggerPress || e13.reason === ez.REASONS.escapeKey) {
            let e14 = s3.select("domReferenceElement");
            (0, eM.isElement)(e14) && (c3.current = e14, o3.current = true);
          }
        }
      }, [i3, r11, s3]);
      let p3 = l.useMemo(() => {
        function e12() {
          o3.current = false, c3.current = null;
        }
        return { onMouseLeave() {
          e12();
        }, onFocus(t12) {
          let r12 = t12.currentTarget;
          if (o3.current) {
            if (c3.current === r12) return;
            e12();
          }
          let i4 = (0, eE.getTarget)(t12.nativeEvent);
          if ((0, eM.isElement)(i4)) {
            if (e7 && !t12.relatedTarget) {
              if (!d3.current && !(0, e3.isTypeableElement)(i4)) return;
            } else if (!(0, e3.matchesFocusVisible)(i4)) return;
          }
          let a4 = (0, e3.isTargetInsideEnabledTrigger)(t12.relatedTarget, s3.context.triggerElements), { nativeEvent: l2, currentTarget: p4 } = t12, x3 = "function" == typeof n11 ? n11() : n11;
          s3.select("open") && a4 || 0 === x3 || void 0 === x3 ? s3.setOpen(true, (0, eO.createChangeEventDetails)(ez.REASONS.triggerFocus, l2, p4)) : u3.start(x3, () => {
            o3.current || s3.setOpen(true, (0, eO.createChangeEventDetails)(ez.REASONS.triggerFocus, l2, p4));
          });
        }, onBlur(t12) {
          e12();
          let r12 = t12.relatedTarget, n12 = t12.nativeEvent, i4 = (0, eM.isElement)(r12) && r12.hasAttribute((0, e6.createAttribute)("focus-guard")) && "outside" === r12.getAttribute("data-type");
          u3.start(0, () => {
            let e13 = s3.select("domReferenceElement"), t13 = (0, eE.activeElement)((0, e4.ownerDocument)(e13));
            if (!r12 && t13 === e13 || (0, eE.contains)(a3.current.floatingContext?.refs.floating.current, t13) || (0, eE.contains)(e13, t13) || i4) return;
            let l2 = r12 ?? t13;
            (0, e3.isTargetInsideEnabledTrigger)(l2, s3.context.triggerElements) || s3.setOpen(false, (0, eO.createChangeEventDetails)(ez.REASONS.triggerFocus, n12));
          });
        } };
      }, [a3, n11, s3, u3]);
      return l.useMemo(() => r11 ? { reference: p3, trigger: p3 } : {}, [r11, p3]);
    }(v2, { enabled: !R2 }).reference, H2 = g2.useState("triggerProps", A2), V2 = A2 || "none" !== L2;
    return (0, eq.useRenderElement)("button", e10, { state: { open: b2 }, ref: [t10, w2, y2], props: [I2, $2, V2 ? H2 : void 0, { onMouseOver(e11) {
      ((e12) => {
        let t11, r11 = T2.current, n11 = tr(e12), s3 = (T2.current = t11 = z2(n11), t11 && (M2.openChangeTimeout.clear(), M2.restTimeout.clear(), M2.restTimeoutPending = false, P2.clear()), t11), i3 = y2.current, a3 = i3 && n11 && (0, eE.contains)(i3, n11);
        if (s3 && g2.select("open") && g2.select("lastOpenChangeReason") === ez.REASONS.triggerHover) return g2.setOpen(false, (0, eO.createChangeEventDetails)(ez.REASONS.triggerHover, e12));
        if (r11 && !s3 && a3 && !D2.current && !g2.select("open") && i3 && (0, eR.isMouseLikePointerType)(F2.current)) {
          let t12 = () => {
            T2.current || D2.current || g2.select("open") || g2.setOpen(true, (0, eO.createChangeEventDetails)(ez.REASONS.triggerHover, e12, i3));
          }, r12 = B2();
          0 === r12 ? (P2.clear(), t12()) : P2.start(r12, t12);
        }
      })(e11.nativeEvent);
    }, onFocus(e11) {
      z2(tr(e11.nativeEvent)) && e11.preventBaseUIHandler();
    }, onMouseLeave() {
      T2.current = false, P2.clear(), F2.current = void 0;
    }, onPointerEnter(e11) {
      F2.current = e11.pointerType;
    }, onPointerDown(e11) {
      F2.current = e11.pointerType, g2.set("closeOnClick", d2), d2 && !g2.select("open") && g2.cancelPendingOpen(e11.nativeEvent);
    }, onClick(e11) {
      d2 && !g2.select("open") && g2.cancelPendingOpen(e11.nativeEvent);
    }, id: f2, [e9.triggerDisabled]: R2 ? "" : void 0, [tt]: R2 ? void 0 : "" }, x2], stateAttributesMapping: eZ.triggerOpenStateMapping });
  }), ts = l.createContext(void 0);
  var ti = e.i(497286), ta = e.i(987246);
  let tl = l.forwardRef(function(e10, t10) {
    let { children: r10, container: n10, className: s2, render: a2, style: o2, ...c2 } = e10, { portalNode: d2, portalSubtree: u2 } = (0, ta.useFloatingPortalNode)({ container: n10, ref: t10, componentProps: e10, elementProps: c2 });
    return u2 || d2 ? (0, i.jsxs)(l.Fragment, { children: [u2, d2 && ti.createPortal(r10, d2)] }) : null;
  }), to = l.forwardRef(function(e10, t10) {
    let { keepMounted: r10 = false, ...n10 } = e10;
    return eC().useState("mounted") || r10 ? (0, i.jsx)(ts.Provider, { value: r10, children: (0, i.jsx)(tl, { ref: t10, ...n10 }) }) : null;
  }), tc = l.createContext(void 0);
  function td() {
    let e10 = l.useContext(tc);
    if (void 0 === e10) throw Error((0, eA.default)(71));
    return e10;
  }
  var tu = e.i(184736), tp = e.i(521719), tx = e.i(70632), th = e.i(884614);
  let tg = l.forwardRef(function(e10, t10) {
    let { render: r10, className: n10, anchor: s2, positionMethod: a2 = "absolute", side: o2 = "top", align: c2 = "center", sideOffset: d2 = 0, alignOffset: u2 = 0, collisionBoundary: p2 = "clipping-ancestors", collisionPadding: x2 = 5, arrowPadding: h2 = 5, sticky: g2 = false, disableAnchorTracking: f2 = false, collisionAvoidance: m2 = tp.POPUP_COLLISION_AVOIDANCE, style: b2, ...v2 } = e10, y2 = eC(), j2 = function() {
      let e11 = l.useContext(ts);
      if (void 0 === e11) throw Error((0, eA.default)(70));
      return e11;
    }(), k2 = y2.useState("open"), w2 = y2.useState("mounted"), A2 = y2.useState("trackCursorAxis"), _2 = y2.useState("disableHoverablePopup"), C2 = y2.useState("floatingRootContext"), S2 = y2.useState("instantType"), N2 = y2.useState("transitionStatus"), M2 = y2.useState("hasViewport"), E2 = (0, tu.useAnchorPositioning)({ anchor: s2, positionMethod: a2, floatingRootContext: C2, mounted: w2, side: o2, sideOffset: d2, align: c2, alignOffset: u2, collisionBoundary: p2, collisionPadding: x2, sticky: g2, arrowPadding: h2, disableAnchorTracking: f2, keepMounted: j2, collisionAvoidance: m2, adaptiveOrigin: M2 ? tx.adaptiveOrigin : void 0 }), R2 = l.useMemo(() => ({ open: k2, side: E2.side, align: E2.align, anchorHidden: E2.anchorHidden, instant: "none" !== A2 ? "tracking-cursor" : S2 }), [k2, E2.side, E2.align, E2.anchorHidden, A2, S2]), D2 = (0, th.usePositioner)(e10, R2, { styles: E2.positionerStyles, transitionStatus: N2, props: v2, refs: [t10, y2.useStateSetter("positionerElement")], hidden: !w2, inert: !k2 || "both" === A2 || _2 });
    return (0, i.jsx)(tc.Provider, { value: E2, children: D2 });
  });
  var tf = e.i(97733), tm = e.i(737808), tb = e.i(439415), tv = e.i(237570);
  let ty = { ...eZ.popupStateMapping, ...tf.transitionStatusMapping }, tj = l.forwardRef(function(e10, t10) {
    let { render: r10, className: n10, style: s2, ...i2 } = e10, a2 = eC(), { side: l2, align: o2 } = td(), c2 = a2.useState("open"), d2 = a2.useState("instantType"), u2 = a2.useState("transitionStatus"), p2 = a2.useState("popupProps"), x2 = a2.useState("floatingRootContext"), h2 = a2.useState("disabled"), g2 = a2.useState("closeDelay");
    (0, tm.useOpenChangeComplete)({ open: c2, ref: a2.context.popupRef, onComplete() {
      c2 && a2.context.onOpenChangeComplete?.(true);
    } }), (0, tv.useHoverFloatingInteraction)(x2, { enabled: !h2, closeDelay: g2 });
    let f2 = a2.useStateSetter("popupElement");
    return (0, eq.useRenderElement)("div", e10, { state: { open: c2, side: l2, align: o2, instant: d2, transitionStatus: u2 }, ref: [t10, a2.context.popupRef, f2], props: [p2, (0, tb.getDisabledMountTransitionStyles)(u2), i2], stateAttributesMapping: ty });
  }), tk = l.forwardRef(function(e10, t10) {
    let { render: r10, className: n10, style: s2, ...i2 } = e10, a2 = eC(), { arrowRef: l2, side: o2, align: c2, arrowUncentered: d2, arrowStyles: u2 } = td(), p2 = a2.useState("open"), x2 = a2.useState("instantType");
    return (0, eq.useRenderElement)("div", e10, { state: { open: p2, side: o2, align: c2, uncentered: d2, instant: x2 }, ref: [t10, l2], props: [{ style: u2, "aria-hidden": true }, i2], stateAttributesMapping: eZ.popupStateMapping });
  }), tw = ((r = {}).popupWidth = "--popup-width", r.popupHeight = "--popup-height", r);
  var tA = e.i(491561);
  let t_ = { activationDirection: (e10) => e10 ? { "data-activation-direction": e10 } : null }, tC = l.forwardRef(function(e10, t10) {
    let { render: r10, className: n10, style: s2, children: i2, ...a2 } = e10, l2 = eC(), o2 = td(), c2 = l2.useState("instantType"), { children: d2, state: u2 } = (0, tA.usePopupViewport)({ store: l2, side: o2.side, cssVars: tw, children: i2 }), p2 = { activationDirection: u2.activationDirection, transitioning: u2.transitioning, instant: c2 };
    return (0, eq.useRenderElement)("div", e10, { state: p2, ref: t10, props: [a2, { children: d2 }], stateAttributesMapping: t_ });
  });
  class tS {
    constructor() {
      this.store = new eV();
    }
    open(e10) {
      let t10 = e10 ? this.store.context.triggerElements.getById(e10) : void 0;
      if (e10 && !t10) throw Error((0, eA.default)(81, e10));
      this.store.setOpen(true, (0, eO.createChangeEventDetails)(ez.REASONS.imperativeAction, void 0, t10));
    }
    close() {
      this.store.setOpen(false, (0, eO.createChangeEventDetails)(ez.REASONS.imperativeAction, void 0, void 0));
    }
    get isOpen() {
      return this.store.select("open");
    }
  }
  e.s(["Arrow", 0, tk, "Handle", 0, tS, "Popup", 0, tj, "Portal", 0, to, "Positioner", 0, tg, "Provider", 0, function(e10) {
    let { delay: t10, closeDelay: r10, timeout: n10 = 400 } = e10, s2 = l.useMemo(() => ({ delay: t10, closeDelay: r10 }), [t10, r10]), a2 = l.useMemo(() => ({ open: t10, close: r10 }), [t10, r10]);
    return (0, i.jsx)(eG.Provider, { value: s2, children: (0, i.jsx)(e1, { delay: a2, timeoutMs: n10, children: e10.children }) });
  }, "Root", 0, eU, "Trigger", 0, tn, "Viewport", 0, tC, "createHandle", 0, function() {
    return new tS();
  }], 269319);
  var tN = e.i(269319), tN = tN;
  let tM = () => (0, i.jsxs)("svg", { width: "12", height: "12", fill: "none", viewBox: "0 0 12 12", children: [(0, i.jsx)("rect", { width: "12", height: "12", rx: "6", fill: "#29211E" }), (0, i.jsx)("path", { d: "M5.4 3v6H4V3h1.4ZM8 3v6H6.6V3H8Z", fill: "#D9D9D9" })] }), tE = () => (0, i.jsxs)("svg", { width: "12", height: "12", fill: "none", viewBox: "0 0 12 12", children: [(0, i.jsx)("rect", { width: "12", height: "12", rx: "6", fill: "#29211E" }), (0, i.jsx)("path", { d: "m5 3 3 3-3 3V3Z", fill: "#D9D9D9" })] }), tR = 800, tD = { duration: 0.65, ease: A }, tL = (e10) => `translateX(${(e10 - 1) * 20}px)`, tO = { transform: tL(0) }, tT = (e10) => {
    let { transform: t10 } = getComputedStyle(e10);
    return "none" === t10 ? 1 : 1 + new DOMMatrixReadOnly(t10).m41 / 20;
  }, tP = (e10, t10, r10, n10 = "linear", s2 = tT(e10)) => {
    if (e10.getAnimations().forEach((e11) => e11.cancel()), e10.style.transform = tL(t10), r10 <= 0 || s2 === t10) return;
    let i2 = e10.animate([{ transform: tL(s2) }, { transform: tL(t10) }], { duration: r10, easing: n10 });
    document.hidden && i2.pause();
  }, tF = `cubic-bezier(${A.join(", ")})`, tB = ({ duration: e10 = 0, cursor: t10, waitsForContent: r10, contentEstimate: n10 = tR }) => e10 + 700 * !!t10?.action + (void 0 !== r10 ? n10 : 0), tz = (0, a.cx)("group relative block", "rounded-full outline-offset-2 outline-stone-800 focus-visible:outline-1"), tI = ({ tooltip: e10, index: t10, label: r10, isActive: n10, isReducedMotion: s2, registerFill: o2, onClick: c2 }) => {
    let d2 = (0, l.useRef)(null), u2 = (0, l.useCallback)((e11) => {
      d2.current = e11, o2(t10, e11);
    }, [t10, o2]);
    return (0, l.useLayoutEffect)(() => {
      let e11 = d2.current;
      !n10 && e11 && tP(e11, 0, s2 ? 0 : 1e3 * tD.duration, tF);
    }, [n10, s2]), (0, i.jsx)(tN.Trigger, { handle: e10, payload: { type: "chapter", label: r10 }, delay: 0, closeDelay: 200, closeOnClick: false, type: "button", "aria-label": r10, "aria-current": n10 ? "step" : void 0, className: tz, onClick: c2, children: (0, i.jsxs)(j.motion.span, { className: "relative block h-3 overflow-hidden rounded-full border-1 border-stone-800 bg-[#D9D9D9]", initial: false, animate: { width: n10 ? 32 : 12 }, transition: tD, children: [(0, i.jsx)(y.AnimatePresence, { initial: false, children: n10 && (0, i.jsx)(j.motion.span, { className: "absolute inset-px origin-[4px_50%] overflow-hidden rounded-full", initial: { scale: 0.5 }, animate: { scale: 1, opacity: 1 }, exit: { scale: 0.5, opacity: 0 }, transition: tD, children: (0, i.jsx)("span", { ref: u2, className: "absolute top-0 left-0 h-2 w-7 rounded-full bg-stone-800", style: tO }) }) }), !n10 && (0, i.jsx)("span", { className: (0, a.cx)("absolute top-[3px] left-[3px] size-1 rounded-full bg-stone-800", "opacity-0 transition-opacity duration-150", "group-hover:opacity-100 group-focus-visible:opacity-100") })] }) });
  }, t$ = ({ timeline: e10, chapters: t10, className: r10 }) => {
    let { step: n10, lastStep: s2, contentEnds: o2, isPlaying: c2, isPaused: d2, setIsPaused: u2, jumpToStep: p2 } = z(), x2 = n10 >= s2 && void 0 === e10[s2].duration, h2 = Math.max(t10.findLastIndex((e11) => e11.step <= n10), 0), g2 = !!(0, ev.useReducedMotion)(), f2 = (0, l.useRef)([]), m2 = (0, l.useCallback)((e11, t11) => {
      f2.current[e11] = t11;
    }, []);
    (0, l.useEffect)(() => {
      let e11 = () => {
        for (let e12 of f2.current) for (let t11 of e12?.getAnimations() ?? []) document.hidden ? t11.pause() : t11.play();
      };
      return document.addEventListener("visibilitychange", e11), () => document.removeEventListener("visibilitychange", e11);
    }, []);
    let b2 = (0, l.useRef)(n10), v2 = (0, l.useRef)(null);
    (0, l.useLayoutEffect)(() => {
      let r11 = b2.current;
      b2.current = n10;
      let i2 = f2.current[h2];
      if (!i2) return;
      let a2 = t10[h2].step, l2 = t10[h2 + 1]?.step ?? s2 + 1, d3 = tT(i2);
      if (n10 !== r11 && n10 !== r11 + 1) {
        let t11 = 0, r12 = 0;
        for (let s3 = a2; s3 < l2; s3++) {
          let i3 = tB(e10[s3]);
          t11 += i3, s3 < n10 && (r12 += i3);
        }
        d3 = t11 > 0 ? r12 / t11 : 0;
      }
      let u3 = (e11, t11) => tP(i2, e11, g2 ? 0 : t11, "linear", d3);
      if (x2) return void u3(1, 300);
      if (!c2) {
        v2.current = null, u3(d3, 0);
        return;
      }
      v2.current?.step !== n10 && (v2.current = { step: n10, time: performance.now() });
      let p3 = v2.current.time, { duration: m3 = 0, cursor: y3, waitsForContent: j3, contentEstimate: k3 = tR } = e10[n10], w2 = Math.max(Math.max(p3 + 700 * !!y3?.action, void 0 === j3 ? p3 : o2.get(j3) ?? p3 + k3) + m3 - performance.now(), 0);
      for (let t11 = n10 + 1; t11 < l2; t11++) w2 += tB(e10[t11]);
      u3(1, w2);
    }, [n10, h2, t10, e10, s2, x2, c2, g2, o2]);
    let y2 = !d2 && !x2, j2 = y2 ? "Pause" : "Play", [k2] = (0, l.useState)(() => tN.createHandle());
    return (0, i.jsxs)("div", { role: "group", "aria-label": "Demo chapters", className: (0, a.cx)("flex items-center gap-1", "font-denim", r10), children: [(0, i.jsx)(tN.Trigger, { handle: k2, payload: { type: "playback" }, delay: 0, closeDelay: 200, closeOnClick: false, type: "button", "aria-label": j2, className: tz, onClick: () => {
      x2 ? (p2(t10[0].step), u2(false)) : u2(!d2);
    }, children: y2 ? (0, i.jsx)(tM, {}) : (0, i.jsx)(tE, {}) }), t10.map((e11, t11) => (0, i.jsx)(tI, { tooltip: k2, index: t11, label: e11.label, isActive: t11 === h2, isReducedMotion: g2, registerFill: m2, onClick: () => p2(e11.step) }, e11.step)), (0, i.jsx)(tN.Root, { handle: k2, disableHoverablePopup: true, children: ({ payload: e11 }) => (0, i.jsx)(tN.Portal, { children: (0, i.jsx)(tN.Positioner, { side: "bottom", sideOffset: 3, className: "transition-[top,left] duration-250 ease-out-cubic data-instant:transition-none", children: (0, i.jsx)(tN.Popup, { className: (0, a.cx)("rounded-[4px] bg-[#D9D9D9] px-[2.5px] py-px select-none", "font-denim text-xs font-semibold whitespace-nowrap text-stone-800 uppercase", "transition-[width,opacity] duration-150 ease-out-cubic", "data-ending-style:opacity-0 data-instant:transition-none data-starting-style:opacity-0"), children: (0, i.jsx)(tN.Viewport, { className: (0, a.cx)("[&_[data-current]]:transition-opacity [&_[data-current]]:duration-150", "[&_[data-previous]]:transition-opacity [&_[data-previous]]:duration-150", "[&_[data-current][data-starting-style]]:opacity-0", "[&_[data-previous][data-ending-style]]:opacity-0"), children: e11?.type === "playback" ? j2 : e11?.label }) }) }) }) })] });
  }, tH = ({ className: e10, children: t10 }) => {
    let { run: r10, isResetting: n10 } = z();
    return (0, i.jsx)(j.motion.div, { className: e10, initial: 0 !== r10 && { opacity: 0 }, animate: { opacity: +!n10 }, transition: { duration: 0.25, ease: k }, children: t10 }, r10);
  }, tV = () => (0, i.jsx)("svg", { width: "14", height: "17", fill: "none", viewBox: "0 0 14 17", children: (0, i.jsx)("path", { fill: "#1A2233", d: "M0 2.25363C0.000118434 0.381377 2.15395 -0.671261 3.63184 0.478238L5.85547 2.20675V14.0398L3.63184 15.7693C2.15398 16.9187 0.000189312 15.8661 0 13.9939V2.25363ZM8.10547 3.69894C8.27468 3.73911 8.44891 3.76144 8.625 3.76144H9.84375V12.4861H8.625C8.44898 12.4861 8.27461 12.5074 8.10547 12.5476V3.69894ZM13.0879 3.76144C13.3193 3.76145 13.5415 3.8527 13.7051 4.01632C13.7549 4.06615 13.7971 4.12211 13.833 4.18136V12.0652C13.797 12.1247 13.7551 12.1812 13.7051 12.2312C13.5415 12.3948 13.3193 12.486 13.0879 12.4861H12.0938V3.76144H13.0879Z" }) }), tU = () => (0, i.jsx)("svg", { width: "16", height: "16", fill: "none", viewBox: "0 0 16 16", children: (0, i.jsx)("path", { stroke: "#9ba8a7", strokeLinecap: "round", strokeLinejoin: "round", d: "m5 6.5 3 3 3-3" }) }), tW = () => (0, i.jsx)("svg", { width: "16", height: "16", fill: "none", viewBox: "0 0 16 16", children: (0, i.jsx)("path", { stroke: "#9ba8a7", strokeLinecap: "round", strokeLinejoin: "round", d: "M5.817 12.333c0 .575.23 1.126.639 1.532a2.19 2.19 0 0 0 3.087 0c.41-.406.64-.957.64-1.532M3.087 6.375c0-1.293.518-2.533 1.439-3.447A4.93 4.93 0 0 1 7.999 1.5a4.93 4.93 0 0 1 3.473 1.428 4.86 4.86 0 0 1 1.439 3.447c0 2.425.566 4.374 1.016 5.146a.54.54 0 0 1-.47.812H2.541A.55.55 0 0 1 2 11.791c0-.095.025-.188.073-.27.45-.772 1.015-2.721 1.015-5.146" }) }), tQ = () => (0, i.jsx)("svg", { width: "16", height: "16", fill: "none", viewBox: "0 0 16 16", children: (0, i.jsx)("path", { fill: "#9ba8a7", d: "m14.354 13.646-3.13-3.129a5.507 5.507 0 1 0-.707.707l3.13 3.13a.5.5 0 1 0 .707-.708M2.5 7a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0" }) }), tK = () => (0, i.jsxs)("div", { className: "flex items-center justify-between", children: [(0, i.jsxs)("div", { className: (0, a.cx)("py-1.5 pl-2", "flex items-center gap-x-2"), children: [(0, i.jsx)(tV, {}), (0, i.jsxs)("div", { className: (0, a.cx)("flex items-center gap-x-0.5"), children: [(0, i.jsx)("div", { className: (0, a.cx)("font-muoto text-[14px]/[20px] font-book tracking-[-0.14px] text-gray-900"), children: "Quietwork" }), (0, i.jsx)(tU, {})] })] }), (0, i.jsxs)("div", { className: "flex gap-x-1", children: [(0, i.jsx)("div", { className: "p-2", children: (0, i.jsx)(tQ, {}) }), (0, i.jsxs)("div", { className: (0, a.cx)("relative", "p-2"), children: [(0, i.jsx)(tW, {}), (0, i.jsx)("div", { className: (0, a.cx)("absolute top-0.5 right-0.5", "size-3.5", "flex items-center justify-center", "rounded-full", "bg-linear-180 from-[#269600] to-[#008125]", "shadow-[0_1px_2px_0_rgba(255,255,255,0.12)_inset,0_-1px_1px_0_rgba(0,0,0,0.08)_inset,0_0_0_0.5px_rgba(0,0,0,0.16)_inset,0_2px_2px_-1px_rgba(0,0,0,0.06),0_1px_1px_-0.5px_rgba(0,0,0,0.06),0_4px_8px_-4px_rgba(0,129,37,0.32),0_0_0_1px_#F7F7F7]", "font-muoto text-[9px] font-book tracking-[0.09px] text-white"), children: "4" })] })] })] }), tZ = [{ items: [{ icon: (0, i.jsx)(() => (0, i.jsx)("svg", { width: "16", height: "16", fill: "none", viewBox: "0 0 16 16", children: (0, i.jsx)("path", { stroke: "#9ba8a7", strokeLinecap: "round", strokeLinejoin: "round", d: "M1.5 13.5h13M2.893 7.563V13.5h3.714V9.674h2.786V13.5h3.714V7.563m-10.214 0-.929.957m12.072 0-.929-.957L8.328 2.64A.46.46 0 0 0 8 2.5a.45.45 0 0 0-.328.14l-4.78 4.923" }) }), {}), label: "Home" }, { icon: (0, i.jsx)(() => (0, i.jsx)("svg", { width: "16", height: "16", fill: "none", viewBox: "0 0 16 16", children: (0, i.jsx)("path", { fill: "#9BA8A7", d: "M10.854 6.146a.5.5 0 0 1 0 .708l-3.5 3.5a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 9.293l3.146-3.147a.5.5 0 0 1 .708 0M14.5 8A6.5 6.5 0 1 1 8 1.5 6.507 6.507 0 0 1 14.5 8m-1 0A5.5 5.5 0 1 0 8 13.5 5.506 5.506 0 0 0 13.5 8" }) }), {}), label: "Tasks", meta: "10" }, { icon: (0, i.jsx)(() => (0, i.jsx)("svg", { width: "16", height: "16", fill: "none", viewBox: "0 0 16 16", children: (0, i.jsx)("path", { stroke: "#9BA8A7", strokeLinecap: "round", strokeLinejoin: "round", d: "M10 1 9 6l4 1.5L6 15l1-5-4-1.5z" }) }), {}), label: "Skills" }] }, { title: "Private", items: [{ icon: (0, i.jsx)(() => {
    let e10 = (0, l.useId)();
    return (0, i.jsxs)("svg", { width: "16", height: "16", fill: "none", viewBox: "0 0 16 16", children: [(0, i.jsx)("path", { fill: `url(#${e10})`, d: "M15 8a7 7 0 1 1-2.05-4.95l-2.532 2.532A3.42 3.42 0 1 0 11.42 8z" }), (0, i.jsx)("path", { stroke: "#008125", strokeLinecap: "round", strokeLinejoin: "round", d: "M7.989 8.004 14.497 1.5m-1.906 1.905a6.502 6.502 0 0 0-11.04 3.78 6.493 6.493 0 0 0 5.085 7.17 6.504 6.504 0 0 0 7.58-4.453 6.5 6.5 0 0 0-.353-4.702m-3.573.505a3.255 3.255 0 0 0-5.27 3.632 3.253 3.253 0 0 0 5.586.602 3.25 3.25 0 0 0 .632-2.12" }), (0, i.jsx)("defs", { children: (0, i.jsxs)("linearGradient", { id: e10, x1: "3", x2: "13", y1: "3", y2: "13", gradientUnits: "userSpaceOnUse", children: [(0, i.jsx)("stop", { stopColor: "#008125", stopOpacity: ".16" }), (0, i.jsx)("stop", { offset: "1", stopColor: "#008125", stopOpacity: "0" })] }) })] });
  }, {}), label: "Monthly Quota", isActive: true }, { icon: (0, i.jsx)(() => (0, i.jsx)("svg", { width: "16", height: "16", fill: "none", viewBox: "0 0 256 256", children: (0, i.jsx)("path", { fill: "#9BA8A7", d: "M232,56V176a8,8,0,0,1-2.76,6c-15.28,13.23-29.89,18-43.82,18-18.91,0-36.57-8.74-53-16.85C105.87,170,82.79,158.61,56,179.77V224a8,8,0,0,1-16,0V56a8,8,0,0,1,2.77-6h0c36-31.18,68.31-15.21,96.79-1.12C167,62.46,190.79,74.2,218.76,50A8,8,0,0,1,232,56Z" }) }), {}), label: "My renewals" }] }, { title: "Team workspace", items: [{ icon: (0, i.jsx)(() => (0, i.jsx)("svg", { width: "16", height: "16", fill: "none", viewBox: "0 0 256 256", children: (0, i.jsx)("path", { fill: "#9BA8A7", d: "M227.81,66.76l-.08.09L160,139.17v55.49A16,16,0,0,1,152.87,208l-32,21.34A16,16,0,0,1,96,216V139.17L28.27,66.85l-.08-.09A16,16,0,0,1,40,40H216a16,16,0,0,1,11.84,26.76Z" }) }), {}), label: "Inbound ICP review" }, { icon: (0, i.jsx)(() => (0, i.jsx)("svg", { width: "16", height: "16", fill: "none", viewBox: "0 0 256 256", children: (0, i.jsx)("path", { fill: "#9BA8A7", d: "M254.3,107.91,228.78,56.85a16,16,0,0,0-21.47-7.15L182.44,62.13,130.05,48.27a8.14,8.14,0,0,0-4.1,0L73.56,62.13,48.69,49.7a16,16,0,0,0-21.47,7.15L1.7,107.9a16,16,0,0,0,7.15,21.47l27,13.51,55.49,39.63a8.06,8.06,0,0,0,2.71,1.25l64,16a8,8,0,0,0,7.6-2.1l40-40,15.08-15.08,26.42-13.21a16,16,0,0,0,7.15-21.46Zm-54.89,33.37L165,113.72a8,8,0,0,0-10.68.61C136.51,132.27,116.66,130,104,122L147.24,80h31.81l27.21,54.41Zm-41.87,41.86L99.42,168.61l-49.2-35.14,28-56L128,64.28l9.8,2.59-45,43.68-.08.09a16,16,0,0,0,2.72,24.81c20.56,13.13,45.37,11,64.91-5L188,152.66Zm-25.72,34.8a8,8,0,0,1-7.75,6.06,8.13,8.13,0,0,1-1.95-.24L80.41,213.33a7.89,7.89,0,0,1-2.71-1.25L51.35,193.26a8,8,0,0,1,9.3-13l25.11,17.94L126,208.24A8,8,0,0,1,131.82,217.94Z" }) }), {}), label: "Weekly commit" }, { icon: (0, i.jsx)(() => {
    let e10 = (0, l.useId)();
    return (0, i.jsxs)("svg", { className: "rounded-[5px] shadow-[0_1.6px_1.6px_-0.8px_rgba(0,0,0,0.02),0_0.8px_0.8px_-0.4px_rgba(0,0,0,0.04),0_0.4px_0.4px_-0.2px_rgba(0,0,0,0.06)]", width: "16", height: "16", fill: "none", viewBox: "0 0 24 24", children: [(0, i.jsx)("rect", { width: "24", height: "24", fill: "#DCDCDC", rx: "7.5" }), (0, i.jsx)("rect", { width: "24", height: "24", fill: `url(#${e10})`, fillOpacity: ".02", rx: "7.5" }), (0, i.jsx)("path", { stroke: "#FB7904", strokeWidth: "5.30845", d: "M7 8V12M7 16V12M7 12H17M17 8V16" }), (0, i.jsx)("defs", { children: (0, i.jsxs)("linearGradient", { id: e10, x1: "12", x2: "12", y1: "0", y2: "24", gradientUnits: "userSpaceOnUse", children: [(0, i.jsx)("stop", { stopOpacity: "0" }), (0, i.jsx)("stop", { offset: "1" })] }) }), (0, i.jsx)("rect", { x: ".15", y: ".15", width: "23.7", height: "23.7", rx: "7.35", stroke: "#000", strokeOpacity: ".1", strokeWidth: ".3" })] });
  }, {}), label: "Halden", meta: "25K" }] }, { isExpandable: true, items: [{ icon: (0, i.jsx)(() => (0, i.jsx)("svg", { width: "16", height: "16", fill: "none", viewBox: "0 0 16 16", children: (0, i.jsx)("path", { fill: "#008125", d: "M13.825 4.513c-1.064-.13-2.509.74-3.592 2.066-.094.115-.284.067-.309-.078-.094-.55-.425-.92-.978-.988-.848-.103-1.98.536-2.88 1.54-.097.108-.278.058-.304-.082-.09-.484-.388-.809-.879-.869-1.037-.125-2.544.979-3.365 2.467s-.647 2.795.39 2.921c.716.087 1.657-.413 2.441-1.221.103-.106.286-.044.3.1.062.623.4 1.048.997 1.12.839.102 1.955-.523 2.851-1.508.104-.114.297-.049.305.103.046.779.445 1.315 1.171 1.403 1.343.163 3.293-1.266 4.356-3.192 1.064-1.926.838-3.62-.504-3.782" }) }), {}), label: "Operate" }, { label: "Prep for Fielded" }, { label: "Brightline stalled" }, { label: "Draft email follow up" }] }], tq = ({ item: e10 }) => {
    let { icon: t10, label: r10, meta: n10, isActive: s2 } = e10;
    return (0, i.jsxs)("div", { className: (0, a.cx)("px-2 py-1.5", "flex items-center gap-x-2"), children: [(0, i.jsx)("div", { className: "size-4", children: t10 }), (0, i.jsx)("div", { className: (0, a.cx)("font-muoto text-[14px]/[20px] tracking-[-0.14px]", !s2 && "text-gray-700", s2 && "font-book text-[#008125]"), children: r10 }), n10 && (0, i.jsx)("div", { className: "pt-0.5 font-muoto text-[12px]/[17px] text-gray-500", children: n10 })] });
  }, tY = ({ className: e10 }) => (0, i.jsx)("div", { className: e10, children: (0, i.jsx)("div", { className: "flex flex-col gap-y-6", children: tZ.map(({ title: e11, items: t10, isExpandable: r10 }, n10) => (0, i.jsxs)("div", { className: "flex flex-col gap-y-0.5", children: [e11 && (0, i.jsx)("div", { className: (0, a.cx)("px-2 py-[3.5px]", "font-muoto text-[12px]/[17px] font-book tracking-[0.12px] text-gray-500"), children: e11 }), (0, i.jsx)("div", { className: "flex flex-col gap-y-0.5", children: t10.map((e12, t11) => (0, i.jsx)(tq, { item: e12 }, t11)) }), r10 && (0, i.jsx)("div", { className: (0, a.cx)("py-[3.5px] pr-2 pl-8", "font-muoto text-[12px]/[17px] tracking-[-0.12px] text-gray-500"), children: "See all" })] }, n10)) }) }), tG = ({ className: e10 }) => (0, i.jsxs)("div", { className: (0, a.cx)("p-1.75", e10), children: [(0, i.jsx)(tK, {}), (0, i.jsx)(tY, { className: "mt-6" })] });
  function tJ(e10, t10, r10) {
    if (r10 < 1) {
      let n11 = t10 * Math.sqrt(1 - r10 * r10);
      return 1 - Math.exp(-r10 * t10 * e10) * (Math.cos(n11 * e10) + r10 * t10 / n11 * Math.sin(n11 * e10));
    }
    let n10 = Math.sqrt(r10 * r10 - 1), s2 = -t10 * (r10 + n10), i2 = -t10 * (r10 - n10), a2 = -s2 / (i2 - s2);
    return 1 - (1 - a2) * Math.exp(s2 * e10) - a2 * Math.exp(i2 * e10);
  }
  var tX = /* @__PURE__ */ new Map();
  function t0(e10, t10) {
    let r10 = e10.length, n10 = t10.length, s2 = Array.from({ length: r10 + 1 }, () => Array(n10 + 1).fill(0));
    for (let i3 = r10 - 1; i3 >= 0; i3--) for (let r11 = n10 - 1; r11 >= 0; r11--) s2[i3][r11] = e10[i3] === t10[r11] ? s2[i3 + 1][r11 + 1] + 1 : Math.max(s2[i3 + 1][r11], s2[i3][r11 + 1]);
    let i2 = [], a2 = [], l2 = 0, o2 = 0;
    for (; l2 < r10 && o2 < n10; ) e10[l2] === t10[o2] ? (i2.push(l2), a2.push(o2), l2++, o2++) : s2[l2 + 1][o2] >= s2[l2][o2 + 1] ? l2++ : o2++;
    return [i2, a2];
  }
  var t1 = 0;
  function t2() {
    return `\0n${t1++}`;
  }
  function t5(e10) {
    return e10 >= "0" && e10 <= "9";
  }
  function t4(e10) {
    for (let t10 of e10) if (t5(t10)) return true;
    return false;
  }
  function t6(e10) {
    let t10 = "";
    for (let r10 of e10) t5(r10) || t3.includes(r10) || (t10 += r10);
    return t10;
  }
  var t3 = ".,'\xA0\u202F\u2009\u2007", t7 = /\p{Sc}/u;
  function t8(e10, t10) {
    return t10.includes(e10) || t7.test(e10);
  }
  function t9(e10) {
    let t10 = 0, r10 = e10.length;
    for (; t10 < r10 && t8(e10[t10], "+-\u2212(#"); ) t10++;
    for (; r10 > t10 && t8(e10[r10 - 1], `%.,!?:;)"'\u201D\u2019`); ) r10--;
    if (t10 >= r10 || !t5(e10[t10]) || !t5(e10[r10 - 1])) return false;
    for (let n10 = t10; n10 < r10; n10++) {
      let t11 = e10[n10];
      if (!t5(t11) && !t3.includes(t11)) return false;
    }
    return true;
  }
  function re(e10) {
    return t5(e10) ? "digit" : "symbol";
  }
  var rt = /* @__PURE__ */ new Map();
  function rr(e10, t10, r10, n10 = ".") {
    let s2 = e10.split("");
    if (!t10 || 0 === t10.length) return s2.map((e11) => ({ id: t2(), string: " " === e11 ? "\xA0" : e11, kind: re(e11) }));
    let i2 = t10.map((e11) => "\xA0" === e11.string ? " " : e11.string), a2 = null != r10 ? function(e11, t11, r11, n11) {
      let s3 = /* @__PURE__ */ new Map(), i3 = rs(e11, n11), a3 = rs(t11, n11), l3 = (e12, t12) => s3.set(a3[e12], i3[t12]), o3 = 0;
      for (; o3 < a3.length && a3[o3] < r11; ) o3++;
      let c2 = a3.length - i3.length;
      if (c2 > 0) {
        let e12 = o3 - c2;
        for (let t12 = 0; t12 < e12 && t12 < i3.length; t12++) l3(t12, t12);
        for (let e13 = o3; e13 < a3.length; e13++) {
          let t12 = e13 - c2;
          t12 >= 0 && t12 < i3.length && l3(e13, t12);
        }
      } else if (c2 < 0) {
        for (let e12 = 0; e12 < o3 && e12 < a3.length; e12++) l3(e12, e12);
        for (let e12 = o3; e12 < a3.length; e12++) {
          let t12 = e12 - c2;
          t12 >= 0 && t12 < i3.length && l3(e12, t12);
        }
      } else for (let r12 = 0; r12 < a3.length; r12++) t11[a3[r12]] === e11[i3[r12]] && l3(r12, r12);
      let d2 = ri(e11, n11), u2 = ri(t11, n11);
      for (let r12 = 1; r12 <= d2.length && r12 <= u2.length; r12++) {
        let n12 = d2[d2.length - r12], i4 = u2[u2.length - r12];
        e11[n12] === t11[i4] && s3.set(i4, n12);
      }
      return s3;
    }(i2, s2, r10, n10) : function(e11, t11, r11) {
      let n11 = /* @__PURE__ */ new Map(), s3 = 0;
      for (; s3 < e11.length && s3 < t11.length && e11[s3] === t11[s3] && !t5(e11[s3]); ) n11.set(s3, s3), s3++;
      let i3 = e11.length, a3 = t11.length;
      for (; i3 > s3 && a3 > s3 && e11[i3 - 1] === t11[a3 - 1] && !t5(e11[i3 - 1]); ) n11.set(a3 - 1, i3 - 1), i3--, a3--;
      let l3 = rc(e11, s3, i3, r11), o3 = rc(t11, s3, a3, r11), c2 = ro(e11, s3, l3), d2 = ro(t11, s3, o3);
      if (c2 > 0 && d2 > 0 && Math.abs(c2 - d2) >= rl) return n11;
      if (!p2(s3, l3, s3, o3, true)) for (let e12 = 1; l3 - e12 >= s3 && o3 - e12 >= s3; e12++) u2(l3 - e12, o3 - e12);
      if (l3 < i3 && o3 < a3) {
        n11.set(o3, l3);
        for (let e12 = 1; l3 + e12 < i3 && o3 + e12 < a3; e12++) u2(l3 + e12, o3 + e12);
        p2(l3 + 1, i3, o3 + 1, a3, false);
      }
      function u2(r12, s4) {
        let i4 = e11[r12];
        t5(i4) || i4 === t11[s4] && n11.set(s4, r12);
      }
      function p2(r12, s4, i4, a4, l4) {
        let o4 = ra(e11, r12, s4), c3 = ra(t11, i4, a4);
        if (o4.length === c3.length || !l4) {
          let r13 = Math.min(o4.length, c3.length);
          for (let s5 = 0; s5 < r13; s5++) {
            let r14 = o4[s5], i5 = c3[s5];
            e11[r14] === t11[i5] && n11.set(i5, r14);
          }
          return false;
        }
        let [d3, u3] = t0(o4.map((t12) => e11[t12]).reverse(), c3.map((e12) => t11[e12]).reverse());
        for (let e12 = 0; e12 < d3.length; e12++) {
          let t12 = o4[o4.length - 1 - d3[e12]], r13 = c3[c3.length - 1 - u3[e12]];
          n11.set(r13, t12);
        }
        return d3.length > 0;
      }
      return n11;
    }(i2, s2, n10), l2 = /* @__PURE__ */ new Set();
    for (let [, e11] of a2) l2.add(t10[e11].id);
    let o2 = [];
    for (let e11 = 0; e11 < s2.length; e11++) {
      let r11 = s2[e11], n11 = re(r11), i3 = " " === r11 ? "\xA0" : r11;
      if (a2.has(e11)) {
        let r12 = a2.get(e11);
        o2.push({ id: t10[r12].id, string: i3, kind: n11 });
      } else {
        let e12 = t2();
        for (; l2.has(e12); ) e12 = t2();
        l2.add(e12), o2.push({ id: e12, string: i3, kind: n11 });
      }
    }
    return o2;
  }
  function rn(e10, t10) {
    return e10 !== t10 && t3.includes(e10);
  }
  function rs(e10, t10) {
    let r10 = [];
    for (let n10 = 0; n10 < e10.length; n10++) rn(e10[n10], t10) || r10.push(n10);
    return r10;
  }
  function ri(e10, t10) {
    let r10 = [];
    for (let n10 = 0; n10 < e10.length; n10++) rn(e10[n10], t10) && r10.push(n10);
    return r10;
  }
  function ra(e10, t10, r10) {
    let n10 = [];
    for (let s2 = t10; s2 < r10; s2++) t5(e10[s2]) && n10.push(s2);
    return n10;
  }
  var rl = 3;
  function ro(e10, t10, r10) {
    let n10 = 0;
    for (let s2 = t10; s2 < r10; s2++) t5(e10[s2]) && n10++;
    return n10;
  }
  function rc(e10, t10, r10, n10) {
    for (let s2 = r10 - 1; s2 >= t10; s2--) if (e10[s2] === n10) return s2;
    return r10;
  }
  function rd() {
    let e10 = /* @__PURE__ */ new Set();
    return { reserve(t10) {
      e10.add(t10);
    }, has: (t10) => e10.has(t10), take(t10) {
      if (!e10.has(t10)) return e10.add(t10), t10;
      let r10 = 1;
      for (; e10.has(`${t10}~${r10}`); ) r10++;
      let n10 = `${t10}~${r10}`;
      return e10.add(n10), n10;
    } };
  }
  function ru(e10) {
    let t10 = [], r10 = [], n10 = () => {
      if (0 === r10.length) return;
      let e11 = r10.map((e12) => e12.string).join("");
      t9(e11) ? t10.push(...rr(e11)) : t10.push(...r10), r10 = [];
    };
    for (let s2 of e10) "\xA0" === s2.string || s2.string === `
` ? (n10(), t10.push(s2)) : r10.push(s2);
    return n10(), t10;
  }
  function rp(e10, t10, r10 = true) {
    let n10 = e10.includes(`
`), s2 = e10.includes(" ") || n10, i2 = rd();
    if (n10) {
      let n11 = e10.split(`
`), s3 = [], a3 = 0;
      return n11.forEach((e11, r11) => {
        r11 > 0 && (s3.push({ id: i2.take(`newline-${a3}`), string: `
` }), a3 += 1), e11.length > 0 && s3.push(...rx(e11, t10, true, a3, i2)), a3 += e11.length;
      }), r10 ? ru(s3) : s3;
    }
    let a2 = rx(e10, t10, s2, 0, i2);
    return r10 ? ru(a2) : a2;
  }
  function rx(e10, t10, r10, n10, s2) {
    var i2, a2, l2, o2;
    let c2, d2, u2;
    return "u" > typeof Intl.Segmenter ? function(e11, t11, r11) {
      let n11 = [];
      for (let s3 of Array.from(e11)) {
        let e12 = t11 + s3.index;
        " " === s3.segment ? n11.push({ id: r11.take(`space-${e12}`), string: "\xA0" }) : n11.push({ id: rh(s3.segment, e12, r11), string: s3.segment });
      }
      return n11;
    }(new Intl.Segmenter(t10, { granularity: r10 ? "word" : "grapheme" }).segment(e10)[Symbol.iterator](), n10, s2) : (i2 = e10, a2 = r10, l2 = n10, o2 = s2, c2 = a2 ? i2.split(" ") : i2.split(""), d2 = [], u2 = l2, c2.forEach((e11, t11) => {
      a2 && t11 > 0 && (d2.push({ id: o2.take(`space-${u2}`), string: "\xA0" }), u2 += 1), d2.push({ id: rh(e11, u2, o2), string: e11 }), u2 += e11.length;
    }), d2);
  }
  function rh(e10, t10, r10) {
    return r10.has(e10) ? r10.take(`${e10}-${t10}`) : r10.take(e10);
  }
  var rg = "torph-root", rf = "torph-item", rm = "torph-id", rb = "torph-kind", rv = "torph-slot", ry = "torph-exiting", rj = "torph-sr", rk = "torph-debug", rw = "empty", rA = { linear: [0, 0, 1, 1], ease: [0.25, 0.1, 0.25, 1], "ease-in": [0.42, 0, 1, 1], "ease-out": [0, 0, 0.58, 1], "ease-in-out": [0.42, 0, 0.58, 1] }, r_ = (e10, t10, r10) => {
    let n10 = 1 - r10;
    return 3 * n10 * n10 * r10 * e10 + 3 * n10 * r10 * r10 * t10 + r10 * r10 * r10;
  };
  function rC(e10, t10, r10, n10) {
    return (s2) => {
      if (s2 <= 0) return 0;
      if (s2 >= 1) return 1;
      let i2 = 0, a2 = 1;
      for (let t11 = 0; t11 < 24; t11 += 1) {
        let t12 = (i2 + a2) / 2;
        r_(e10, r10, t12) < s2 ? i2 = t12 : a2 = t12;
      }
      return r_(t10, n10, (i2 + a2) / 2);
    };
  }
  function rS(e10, t10) {
    let r10 = Math.min(Math.max(t10, 0), 0.9999);
    return (e10(r10 + 1e-4) - e10(r10)) / 1e-4;
  }
  function rN(e10) {
    let t10 = getComputedStyle(e10).transform;
    if (!t10 || "none" === t10) return { tx: 0, ty: 0 };
    let r10 = t10.match(/matrix\(([^)]+)\)/);
    if (!r10) return { tx: 0, ty: 0 };
    let n10 = r10[1].split(",").map(Number);
    return { tx: n10[4] || 0, ty: n10[5] || 0 };
  }
  function rM(e10) {
    let t10 = getComputedStyle(e10), r10 = parseFloat(t10.width), n10 = parseFloat(t10.height);
    if (Number.isNaN(r10) || Number.isNaN(n10)) {
      let t11 = e10.getBoundingClientRect();
      return { width: t11.width, height: t11.height };
    }
    return { width: r10, height: n10 };
  }
  function rE(e10) {
    let { tx: t10, ty: r10 } = rN(e10), n10 = Number(getComputedStyle(e10).opacity) || 1;
    return e10.getAnimations().forEach((e11) => e11.cancel()), { tx: t10, ty: r10, opacity: n10 };
  }
  function rR(e10, t10, r10, n10, s2, i2, a2, l2) {
    let o2 = (r11, n11, s3, a3, l3) => {
      let o3 = e10.animate([{ [t10]: `${r11}px` }, { [t10]: `${n11}px` }], { duration: i2, easing: s3, fill: "both" });
      return void 0 !== l3 && (o3.currentTime = l3), { anim: o3, from: r11, to: n11, easing: s3, curve: a3, startedAt: performance.now() - (l3 ?? 0) };
    };
    if (s2 && null !== s2.elapsed && 0.5 > Math.abs(s2.to - n10)) return o2(s2.from, s2.to, s2.easing, s2.curve, s2.elapsed);
    let c2 = n10 - r10, d2 = a2, u2 = l2;
    if (l2 && Math.abs(c2) > 0.5) {
      let e11 = function(e12, t11) {
        let r11 = Math.max(0, Math.min(8, t11) - rS(e12, 0));
        if (!(r11 > 0)) return { curve: e12, k: 0 };
        let n11 = Math.max(3, Math.ceil(r11 / (0.1 * Math.E)) - 1);
        return { curve: (t12) => t12 >= 1 ? 1 : e12(t12) + r11 * t12 * Math.pow(1 - t12, n11), k: r11 };
      }(l2, (s2?.velocity ?? 0) * i2 / c2);
      e11.k > 0 && (u2 = e11.curve, d2 = function(e12, t11) {
        let r11 = Math.min(120, Math.max(32, Math.round(t11 / 8))), n11 = [];
        for (let t12 = 0; t12 < r11; t12 += 1) {
          let s3 = t12 / (r11 - 1), i3 = t12 === r11 - 1 ? 1 : e12(s3);
          n11.push(`${Math.round(1e4 * i3) / 1e4}`);
        }
        return `linear(${n11.join(", ")})`;
      }(e11.curve, i2));
    }
    return o2(r10, n10, d2, u2);
  }
  function rD(e10, t10) {
    let r10 = null === e10.anim.currentTime, n10 = performance.now() - e10.startedAt, s2 = r10 || !Number.isFinite(n10) || n10 >= t10 || n10 < 0 ? null : n10;
    return { from: e10.from, to: e10.to, easing: e10.easing, curve: e10.curve, elapsed: s2, velocity: null !== s2 && e10.curve ? (e10.to - e10.from) * rS(e10.curve, s2 / t10) / t10 : 0 };
  }
  var rL = /* @__PURE__ */ new WeakMap();
  function rO(e10) {
    e10.style.width = "", e10.style.height = "", e10.style.transitionProperty = "";
  }
  function rT(e10) {
    let t10 = rL.get(e10);
    t10 && (rL.delete(e10), t10.stop(), t10.onCancel?.());
  }
  function rP(e10) {
    let t10 = Array.from(e10.children), r10 = {}, n10 = e10.getBoundingClientRect();
    return t10.forEach((e11, t11) => {
      if (e11.hasAttribute(ry) || e11.hasAttribute(rj) || "BR" === e11.tagName) return;
      let s2 = e11.getAttribute(rm) || `child-${t11}`, i2 = e11.getBoundingClientRect(), { tx: a2, ty: l2 } = rN(e11);
      r10[s2] = { x: i2.left - n10.left - a2, y: i2.top - n10.top - l2 };
    }), r10;
  }
  function rF(e10, t10, r10) {
    let n10 = e10[r10], s2 = t10[r10];
    return n10 && s2 ? { dx: n10.x - s2.x, dy: n10.y - s2.y } : { dx: 0, dy: 0 };
  }
  function rB(e10, t10, r10, n10 = "backward-first") {
    let [s2, i2] = "backward-first" === n10 ? ["backward", "forward"] : ["forward", "backward"], a2 = (n11) => {
      if ("backward" === n11) {
        for (let n12 = e10 - 1; n12 >= 0; n12--) if (r10.has(t10[n12])) return t10[n12];
      } else for (let n12 = e10 + 1; n12 < t10.length; n12++) if (r10.has(t10[n12])) return t10[n12];
      return null;
    };
    return a2(s2) ?? a2(i2);
  }
  function rz(e10, t10) {
    let r10 = document.createElement(e10);
    return r10.setAttribute(rf, ""), r10.setAttribute(rm, t10), r10.setAttribute("aria-hidden", "true"), r10;
  }
  function rI(e10, t10) {
    if (!t10.kind) {
      e10.removeAttribute(rb), e10.removeAttribute(rv), e10.textContent = t10.string;
      return;
    }
    e10.setAttribute(rb, t10.kind), e10.setAttribute(rv, "");
    let r10 = e10.firstElementChild;
    r10 || (e10.textContent = "", r10 = document.createElement("span"), e10.appendChild(r10)), r10.textContent = t10.string;
  }
  function r$(e10) {
    return e10.hasAttribute(rv) ? e10.firstElementChild ?? e10 : e10;
  }
  function rH(e10, t10) {
    let { deltaX: r10, deltaY: n10, duration: s2, ease: i2 } = t10, { tx: a2, ty: l2 } = rN(e10);
    e10.getAnimations().forEach((e11) => e11.cancel());
    let o2 = r10 + a2, c2 = n10 + l2;
    0 === o2 && 0 === c2 || e10.animate({ transform: `translate(${o2}px, ${c2}px)`, offset: 0 }, { duration: s2, easing: i2, fill: "both" });
  }
  function rV(e10) {
    let t10 = e10.map((e11) => e11.getBoundingClientRect()), r10 = Math.min(...t10.map((e11) => e11.left)), n10 = Math.max(...t10.map((e11) => e11.right)), s2 = Math.min(...t10.map((e11) => e11.top)), i2 = Math.max(...t10.map((e11) => e11.bottom)), a2 = (r10 + n10) / 2, l2 = (s2 + i2) / 2;
    return t10.map((e11) => `${a2 - e11.left}px ${l2 - e11.top}px`);
  }
  function rU(e10, t10) {
    let r10 = [], n10 = [], s2 = () => {
      n10.length >= 6 && r10.push(n10), n10 = [];
    };
    for (let r11 of e10) t10.has(r11) ? n10.push(r11) : s2();
    return s2(), r10;
  }
  function rW(e10, t10) {
    if (1 !== e10.segments.length || e10.word.length <= 1) return e10.segments;
    let r10 = e10.segments[0], n10 = e10.word.split("").map((e11, t11) => ({ id: `${r10.id}:${t11}`, string: e11 }));
    return t10.set(r10.id, n10), n10;
  }
  function rQ(e10, t10) {
    let r10 = [], n10 = 0;
    for (let s2 = 0; s2 < e10; s2++) r10.push(n10), t10.has(s2) && n10++;
    return r10;
  }
  var rK = `
[${rg}] {
  display: inline-block;
  position: relative;
  vertical-align: top;
  will-change: width, height;
  white-space: nowrap;
  text-align: inherit;
}

[${rf}]:not(br) {
  display: inline-block;
  position: relative;
  will-change: opacity, transform;
  transform: none;
  opacity: 1;
}

/*
 * The value once as plain text \u2014 every other child is an aria-hidden fragment.
 * Out of flow, because the engine measures every child of the root. Clipped
 * rather than display: none, which would take it out of the a11y tree as well.
 * user-select: none, or a copied selection pastes the value twice.
 */
[${rj}] {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  border: 0;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: pre;
  -webkit-user-select: none;
  user-select: none;
}

/*
 * A digit slides a whole line box to arrive, so it needs its own box to hide
 * behind. Not the root: that spans every line, so clipping there leaves a digit
 * on a middle line sliding over its neighbour in view. The transform sits on the
 * child, so the slide never touches the slot's rect and the FLIP pass stays
 * oblivious. clip-path, not overflow \u2014 an inline-block whose overflow is
 * anything but visible has its baseline synthesized to the bottom margin edge
 * (CSS 2.1 \xA710.8.1), and engines disagree on whether overflow: clip counts.
 * The inline axis stays open so glyph overhang is not shaved.
 */
[${rv}] {
  clip-path: inset(0 -100vw);
}

[${rv}] > span {
  display: inline-block;
  will-change: opacity, transform;
}

/*
 * Softens the clip above into a gradient, positionally rather than on a timer, so
 * it stays in step with the slide at any duration. The band (--torph-fade, 0 for a
 * hard edge) must eat into the box: the clip trims at the border box, so a ramp
 * reaching past it sits in territory already removed and is never seen. no-clip
 * plus repeat-x is what carries the profile across glyph overhang.
 */
@supports (mask-clip: no-clip) or (-webkit-mask-clip: no-clip) {
  [${rv}] {
    --torph-mask: linear-gradient(
      to bottom,
      transparent,
      #000 var(--torph-fade, 0.15em),
      #000 calc(100% - var(--torph-fade, 0.15em)),
      transparent
    );
    -webkit-mask-image: var(--torph-mask);
    mask-image: var(--torph-mask);
    -webkit-mask-repeat: repeat-x;
    mask-repeat: repeat-x;
    -webkit-mask-clip: no-clip;
    mask-clip: no-clip;
  }
}

[${rg}][${rk}] {
  outline: 2px solid magenta;
  [${rf}] {
    outline: 2px solid cyan;
    outline-offset: -4px;
  }
}`, rZ = null, rq = 0, rY = class e10 {
    instance = null;
    lastText = "";
    lastCursorIndex;
    configKey = "";
    attach(t10, r10) {
      this.instance?.destroy(), this.instance = new rX({ element: t10, ...r10 }), this.configKey = e10.serializeConfig(r10), "" !== this.lastText && this.instance.update(this.lastText, this.lastCursorIndex);
    }
    update(e11, t10) {
      this.lastText = e11, this.lastCursorIndex = t10, this.instance?.update(e11, t10);
    }
    needsRecreate(t10) {
      return e10.serializeConfig(t10) !== this.configKey;
    }
    destroy() {
      this.instance?.destroy(), this.instance = null;
    }
    static serializeConfig(e11) {
      return JSON.stringify({ ease: e11.ease, duration: e11.duration, locale: e11.locale, scale: e11.scale, numbers: e11.numbers, decimals: e11.decimals, debug: e11.debug, disabled: e11.disabled, respectReducedMotion: e11.respectReducedMotion });
    }
  }, rG = "span", rJ = { locale: "en", duration: 400, ease: "cubic-bezier(0.19, 1, 0.22, 1)", disabled: false, respectReducedMotion: true, debug: false, scale: true, numbers: true }, rX = class {
    element;
    options = {};
    data;
    currentMeasures = {};
    prevMeasures = {};
    previousSegments = [];
    isInitialRender = true;
    reducedMotion = null;
    srNode = null;
    hasSetup = false;
    constructor(e10) {
      let t10 = Object.fromEntries(Object.entries(e10).filter(([, e11]) => void 0 !== e11)), { ease: r10, ...n10 } = { ...rJ, ...t10 }, { ease: s2, duration: i2 } = function(e11, t11) {
        if ("object" == typeof e11) {
          let t12 = function(e12) {
            let { stiffness: t13 = 100, damping: r11 = 10, mass: n11 = 1, precision: s3 = 1e-3 } = e12 ?? {}, i3 = `${t13}:${r11}:${n11}:${s3}`, a2 = tX.get(i3);
            if (a2) return a2;
            let l2 = Math.sqrt(t13 / n11), o2 = r11 / (2 * Math.sqrt(t13 * n11)), c2 = function(e13, t14, r12) {
              let n12 = 0;
              for (let s4 = 0; s4 < 10; s4 += 1e-3) if (Math.abs(tJ(s4, e13, t14) - 1) > r12) n12 = 0;
              else if ((n12 += 1e-3) > 0.1) return Math.ceil((s4 - n12 + 1e-3) * 1e3);
              return Math.ceil(1e4);
            }(l2, o2, s3), d2 = Math.min(100, Math.max(32, Math.round(c2 / 15))), u2 = [];
            for (let e13 = 0; e13 < d2; e13++) {
              let t14 = e13 / (d2 - 1) * (c2 / 1e3), r12 = e13 === d2 - 1 ? 1 : tJ(t14, l2, o2);
              u2.push(Math.round(1e4 * r12) / 1e4 + "");
            }
            for (; u2.length > 2 && "1" === u2[u2.length - 2]; ) u2.splice(u2.length - 2, 1);
            let p2 = { easing: `linear(${u2.join(", ")})`, duration: c2 };
            return tX.set(i3, p2), p2;
          }(e11);
          return { ease: t12.easing, duration: t12.duration };
        }
        return { ease: e11, duration: t11 };
      }(r10, n10.duration);
      this.options = { ...n10, ease: s2, duration: i2 }, this.element = e10.element, this.options.respectReducedMotion && (this.reducedMotion = function() {
        if (typeof window > "u") return { prefersReducedMotion: false, destroy: () => {
        } };
        let e11 = window.matchMedia("(prefers-reduced-motion: reduce)"), t11 = { prefersReducedMotion: e11.matches, destroy: function() {
          e11.removeEventListener("change", r11);
        } };
        function r11(e12) {
          t11.prefersReducedMotion = e12.matches;
        }
        return e11.addEventListener("change", r11), t11;
      }()), this.data = "", this.isDisabled() || this.setup();
    }
    setup() {
      this.hasSetup || (this.hasSetup = true, this.element.setAttribute(rg, ""), this.options.debug && this.element.setAttribute(rk, ""), rq++, rZ || ((rZ = document.createElement("style")).dataset.torph = "true", rZ.textContent = rK, document.head.appendChild(rZ)));
    }
    destroy() {
      var e10;
      let t10;
      this.reducedMotion?.destroy(), e10 = this.element, (t10 = rL.get(e10)) && (rL.delete(e10), t10.stop()), rO(e10), this.element.getAnimations().forEach((e11) => e11.cancel()), this.srNode?.remove(), this.srNode = null, this.element.removeAttribute(rg), this.element.removeAttribute(rk), this.hasSetup && (this.hasSetup = false, --rq > 0 || !rZ || (rZ.remove(), rZ = null));
    }
    isDisabled() {
      return !!(this.options.disabled || this.reducedMotion?.prefersReducedMotion);
    }
    update(e10, t10) {
      let r10 = "number" == typeof e10 ? e10.toLocaleString(this.options.locale, { minimumFractionDigits: this.options.decimals, maximumFractionDigits: this.options.decimals }) : e10;
      if (r10 !== this.data) {
        if (this.data = r10, this.isDisabled()) {
          "string" == typeof r10 && (this.srNode = null, this.element.textContent = r10, this.previousSegments = [], this.isInitialRender = true);
          return;
        }
        if (this.setup(), this.data instanceof HTMLElement) throw Error("HTMLElement not yet supported");
        this.options.onAnimationStart && !this.isInitialRender && this.options.onAnimationStart(), this.createTextGroup(this.data, this.element, t10);
      }
    }
    createTextGroup(e10, t10, r10) {
      var n10, s2, i2, a2;
      let l2, o2, c2, d2, u2, { width: p2, height: x2 } = rM(t10), h2 = false !== this.options.numbers;
      if (this.syncAccessibleText(e10), this.previousSegments.length > 0) {
        let t11 = function(e11, t12, r11, n11 = {}) {
          let s3 = t12.includes(" "), i3 = t12.includes(`
`), a3 = function(e12) {
            let t13 = [], r12 = [], n12 = () => {
              0 !== r12.length && (t13.push({ word: r12.map((e13) => e13.string).join(""), segments: r12 }), r12 = []);
            };
            for (let t14 of e12) "\xA0" === t14.string || t14.string === `
` ? n12() : r12.push(t14);
            return n12(), t13;
          }(e11), l3 = false !== n11.numbers, o3 = (e12) => l3 && t9(e12), c3 = (e12) => o3(e12) ? "\0#" : e12, d3 = l3 && (t4(t12) || a3.some((e12) => t4(e12.word)));
          if (a3.length <= 1 && !s3 && !i3 && !d3) return { segments: rp(t12, r11, l3), splits: /* @__PURE__ */ new Map() };
          let u3 = [], p3 = [], x3 = t12.split(/( |\n)/), h3 = [];
          for (let e12 of x3) " " === e12 || e12 === `
` ? h3.push(e12) : e12.length > 0 && (p3.push(h3), u3.push(e12), h3 = []);
          let g3 = h3, f3 = a3.map((e12) => e12.word);
          if (f3.length * u3.length > 1e6) return { segments: rp(t12, r11, l3), splits: /* @__PURE__ */ new Map() };
          let [m3, b3] = t0(f3.map(c3), u3.map(c3)), v3 = new Set(m3), y3 = new Set(b3), j3 = /* @__PURE__ */ new Map();
          for (let e12 = 0; e12 < b3.length; e12++) j3.set(b3[e12], m3[e12]);
          let k3 = f3.map((e12, t13) => t13).filter((e12) => !v3.has(e12)), w3 = u3.map((e12, t13) => t13).filter((e12) => !y3.has(e12)), A3 = /* @__PURE__ */ new Set();
          for (let e12 of w3) for (let t13 of k3) if (!A3.has(t13) && c3(u3[e12]) === c3(f3[t13])) {
            j3.set(e12, t13), A3.add(t13);
            break;
          }
          A3.size > 0 && (k3 = k3.filter((e12) => !A3.has(e12)), w3 = w3.filter((e12) => !j3.has(e12)));
          let _3 = /* @__PURE__ */ new Map(), C3 = /* @__PURE__ */ new Set(), S2 = rQ(f3.length, v3), N2 = rQ(u3.length, y3);
          if (k3.length * w3.length <= 2500) for (let e12 of w3) {
            let t13 = -1, r12 = 0.4;
            for (let n12 of k3) {
              var M2, E2;
              if (C3.has(n12) || S2[n12] !== N2[e12]) continue;
              let s4 = (M2 = f3[n12], E2 = u3[e12], (t4(M2) || t4(E2)) && t6(M2) === t6(E2) ? 1 : function(e13, t14) {
                if (0 === e13.length || 0 === t14.length) return 0;
                let [r13] = t0(e13.split(""), t14.split(""));
                return r13.length / Math.max(e13.length, t14.length);
              }(M2, E2));
              s4 > r12 && (r12 = s4, t13 = n12);
            }
            t13 >= 0 && (_3.set(e12, t13), C3.add(t13));
          }
          let R2 = u3.map((e12, t13) => {
            let r12 = j3.get(t13), n12 = r12 ?? _3.get(t13);
            return void 0 === n12 ? { mode: "fresh" } : o3(e12) ? { mode: "number", oi: n12 } : void 0 !== r12 ? { mode: "reuse", oi: n12 } : { mode: "morph", oi: n12 };
          }), D2 = 1 === R2.filter((e12) => "number" === e12.mode).length ? n11.cursorIndex : void 0, L2 = function(e12) {
            let t13 = String(e12), r12 = rt.get(t13);
            if (r12) return r12;
            let n12 = ".";
            try {
              n12 = new Intl.NumberFormat(e12).formatToParts(1.1).find((e13) => "decimal" === e13.type)?.value ?? ".";
            } catch {
            }
            return rt.set(t13, n12), n12;
          }(r11), O2 = rd();
          for (let e12 of R2) {
            if ("fresh" === e12.mode) continue;
            let t13 = a3[e12.oi];
            if ("reuse" !== e12.mode && 1 === t13.segments.length) {
              let e13 = t13.segments[0];
              for (let r12 = 0; r12 < t13.word.length; r12++) O2.reserve(`${e13.id}:${r12}`);
            } else for (let e13 of t13.segments) O2.reserve(e13.id);
          }
          let T2 = [], P2 = /* @__PURE__ */ new Map(), F2 = 0;
          function B2(e12) {
            for (let t13 of e12) t13 === `
` ? T2.push({ id: O2.take(`newline-${F2}`), string: `
` }) : T2.push({ id: O2.take(`space-${F2}`), string: "\xA0" }), F2++;
          }
          for (let e12 = 0; e12 < u3.length; e12++) {
            B2(p3[e12] ?? (e12 > 0 ? [" "] : []));
            let t13 = R2[e12], r12 = u3[e12];
            if ("reuse" === t13.mode) for (let e13 of a3[t13.oi].segments) T2.push(e13);
            else if ("number" === t13.mode) {
              let e13 = a3[t13.oi];
              T2.push(...rr(r12, rW(e13, P2).map((e14) => ({ ...e14, kind: e14.kind ?? re(e14.string) })), void 0 === D2 ? void 0 : D2 - F2, L2));
            } else if ("morph" === t13.mode) {
              let e13 = a3[t13.oi], n12 = e13.word, s4 = rW(e13, P2), i4 = n12.split(""), l4 = r12.split(""), [o4, c4] = t0(i4, l4), d4 = /* @__PURE__ */ new Map();
              for (let e14 = 0; e14 < c4.length; e14++) {
                let t14 = s4[o4[e14]];
                t14 && d4.set(c4[e14], t14);
              }
              for (let e14 = 0; e14 < l4.length; e14++) if (d4.has(e14)) {
                let t14 = d4.get(e14);
                T2.push({ id: t14.id, string: l4[e14] });
              } else T2.push({ id: O2.take(`${r12}~${e14}`), string: l4[e14] });
            } else o3(r12) ? T2.push(...rr(r12)) : T2.push({ id: O2.take(r12), string: r12 });
            F2 += r12.length;
          }
          return B2(g3), { segments: T2, splits: P2 };
        }(this.previousSegments, e10, this.options.locale, { numbers: h2, cursorIndex: r10 });
        d2 = t11.segments, u2 = t11.splits;
      } else d2 = rp(e10, this.options.locale, h2), u2 = /* @__PURE__ */ new Map();
      let g2 = 0 === d2.length;
      g2 && (d2 = [{ id: rw, string: "\u200B" }]), function(e11, t11) {
        if (0 === t11.size) return;
        let r11 = Array.from(e11.children), n11 = /* @__PURE__ */ new Set();
        for (let e12 of r11) {
          if (e12.hasAttribute(ry)) continue;
          let r12 = e12.getAttribute(rm);
          if (!r12 || n11.has(r12)) continue;
          let s3 = t11.get(r12);
          if (s3) {
            for (let t12 of (n11.add(r12), s3)) {
              let r13 = rz("span", t12.id);
              rI(r13, t12), e12.before(r13);
            }
            e12.remove();
          }
        }
      }(t10, u2), this.prevMeasures = rP(this.element);
      let f2 = Array.from(t10.children).filter((e11) => !e11.hasAttribute(rj)), m2 = new Set(d2.map((e11) => e11.id)), b2 = f2.filter((e11) => !m2.has(e11.getAttribute(rm)) && !e11.hasAttribute(ry)), v2 = new Set(b2), y2 = f2.map((e11) => e11.getAttribute(rm)), j2 = function(e11, t11, r11, n11) {
        let s3 = new Set(r11.filter((r12, s4) => n11.has(r12) && !t11.has(e11[s4]))), i3 = /* @__PURE__ */ new Map();
        for (let n12 = 0; n12 < e11.length; n12++) {
          let a3 = e11[n12];
          t11.has(a3) && i3.set(a3, rB(n12, r11, s3, "forward-first"));
        }
        return i3;
      }(f2, v2, y2, m2);
      (function(e11, t11) {
        let r11 = /* @__PURE__ */ new Map();
        for (let n11 of t11) {
          if ("BR" === n11.tagName) continue;
          let { x: t12, y: s3 } = function(e12, t13) {
            let r12 = 0, n12 = 0;
            for (let s4 = e12; s4 && s4 !== t13; s4 = s4.offsetParent) r12 += s4.offsetLeft, n12 += s4.offsetTop;
            return { x: r12, y: n12 };
          }(n11, e11), { tx: i3, ty: a3 } = rN(n11), { width: l3, height: o3 } = rM(n11), c3 = Number(getComputedStyle(n11).opacity) || 1;
          n11.getAnimations().forEach((e12) => e12.cancel()), r11.set(n11, { left: t12 + i3, top: s3 + a3, width: l3, height: o3, opacity: c3 });
        }
        for (let e12 = t11.length - 1; e12 >= 0; e12--) "BR" === t11[e12].tagName && (t11[e12].remove(), t11.splice(e12, 1));
        t11.forEach((e12) => {
          let t12 = r11.get(e12);
          e12.setAttribute(ry, ""), e12.style.position = "absolute", e12.style.pointerEvents = "none", e12.style.left = `${t12.left}px`, e12.style.top = `${t12.top}px`, e12.style.width = `${t12.width}px`, e12.style.height = `${t12.height}px`, e12.style.opacity = String(t12.opacity);
        });
      })(t10, b2), n10 = d2, l2 = /* @__PURE__ */ new Map(), f2.forEach((e11) => {
        let t11 = e11.getAttribute(rm);
        m2.has(t11) && !e11.hasAttribute(ry) && (l2.set(t11, e11), e11.remove());
      }), Array.from(t10.childNodes).forEach((e11) => {
        e11.nodeType === Node.TEXT_NODE && e11.remove();
      }), n10.forEach((e11) => {
        let r11 = l2.get(e11.id);
        if (r11 && l2.delete(e11.id), e11.string === `
`) return void (r11 && "BR" === r11.tagName ? t10.appendChild(r11) : t10.appendChild(rz("br", e11.id)));
        if (r11 && "BR" !== r11.tagName) r11.style.transformOrigin = "", rI(r11, e11), t10.appendChild(r11);
        else {
          let r12 = rz("span", e11.id);
          rI(r12, e11), t10.appendChild(r12);
        }
      }), this.currentMeasures = rP(this.element);
      let k2 = d2.reduce((e11, t11) => t11.string === `
` ? e11 + 1 : e11, 1), w2 = (t10.offsetHeight || 20 * k2) / k2;
      t10.style.width = `${p2}px`, t10.offsetWidth;
      let A2 = rP(this.element);
      t10.style.width = "", this.updateStyles(d2, A2, w2);
      let _2 = this.isInitialRender ? [] : rU(f2, new Set(b2)), C2 = new Set(_2.flat());
      for (let e11 of _2) !function(e12, t11) {
        let { duration: r11, ease: n11 } = t11, s3 = rV(e12);
        e12.forEach((e13, t12) => {
          e13.getAnimations().forEach((e14) => e14.cancel()), e13.style.transformOrigin = s3[t12], e13.animate({ transform: "scale(0.8)", offset: 1 }, { duration: r11, easing: n11, fill: "both" }), e13.animate({ opacity: 0, offset: 1 }, { duration: 0.45 * r11, easing: "linear", fill: "both" }).onfinish = () => e13.remove();
        });
      }(e11, { duration: this.options.duration, ease: this.options.ease });
      if (b2.forEach((e11) => {
        if (this.isInitialRender || e11.getAttribute(rm) === rw) return void e11.remove();
        if (C2.has(e11)) return;
        let t11 = j2.get(e11), { dx: r11, dy: n11 } = t11 ? rF(this.currentMeasures, this.prevMeasures, t11) : { dx: 0, dy: 0 };
        e11.hasAttribute(rb) ? function(e12, t12) {
          let { dx: r12, dy: n12, slideDistance: s3, duration: i3, ease: a3 } = t12, l3 = r$(e12);
          e12.animate({ transform: `translate(${r12}px, ${n12}px)`, offset: 1 }, { duration: i3, easing: a3, fill: "both" }), l3.animate({ transform: `translate(0px, ${s3}px)`, offset: 1 }, { duration: i3, easing: a3, fill: "both" }), l3.animate({ opacity: 0, offset: 1 }, { duration: 0.45 * i3, easing: "linear", fill: "both" }).onfinish = () => e12.remove();
        }(e11, { dx: r11, dy: n11, slideDistance: w2, duration: this.options.duration, ease: this.options.ease }) : function(e12, t12) {
          let { dx: r12, dy: n12, duration: s3, ease: i3, scale: a3 } = t12;
          e12.animate({ transform: a3 ? `translate(${r12}px, ${n12}px) scale(0.95)` : `translate(${r12}px, ${n12}px)`, offset: 1 }, { duration: s3, easing: i3, fill: "both" }), e12.animate({ opacity: 0, offset: 1 }, { duration: 0.25 * s3, easing: "linear", fill: "both" }).onfinish = () => e12.remove();
        }(e11, { dx: r11, dy: n11, duration: this.options.duration, ease: this.options.ease, scale: this.options.scale });
      }), this.previousSegments = d2, this.isInitialRender) {
        this.isInitialRender = false, t10.style.width = "", t10.style.height = "";
        return;
      }
      g2 ? (s2 = this.options.duration, i2 = this.options.onAnimationComplete, a2 = this.options.onAnimationCancel, rT(t10), t10.style.transitionProperty = "none", t10.style.width = `${p2}px`, t10.style.height = `${x2}px`, o2 = setTimeout(() => {
        rL.delete(t10), rO(t10), i2?.();
      }, s2), c2 = (e11) => ({ from: e11, to: e11, easing: "linear", curve: null, elapsed: null, velocity: 0 }), rL.set(t10, { stop: () => clearTimeout(o2), onCancel: a2, snapshot: () => ({ width: c2(p2), height: c2(x2) }) })) : function(e11, t11, r11, n11, s3, i3, a3) {
        let l3 = rL.get(e11)?.snapshot();
        if (rT(e11), 0 === t11 || 0 === r11) {
          rO(e11), a3?.();
          return;
        }
        e11.style.transitionProperty = "none", e11.style.width = "", e11.style.height = "", e11.offsetWidth;
        let { width: o3, height: c3 } = rM(e11), d3 = function(e12) {
          let t12 = e12.trim().toLowerCase(), r12 = rA[t12];
          if (r12) return rC(...r12);
          let n12 = /^cubic-bezier\(([^)]*)\)$/.exec(t12);
          if (n12) {
            let e13 = n12[1].split(",").map((e14) => Number(e14.trim()));
            return 4 !== e13.length || e13.some((e14) => !Number.isFinite(e14)) ? null : rC(e13[0], e13[1], e13[2], e13[3]);
          }
          let s4 = /^linear\(([^)]*)\)$/.exec(t12);
          return s4 ? function(e13) {
            let t13 = [], r13 = [];
            for (let n14 of e13.split(",")) {
              let e14 = n14.trim().split(/\s+/).filter(Boolean), s5 = Number(e14[0]);
              if (!Number.isFinite(s5)) return null;
              let i4 = e14.slice(1);
              if (i4.length > 2) return null;
              if (0 === i4.length) {
                t13.push(s5), r13.push(null);
                continue;
              }
              for (let e15 of i4) {
                if (!e15.endsWith("%")) return null;
                let n15 = Number(e15.slice(0, -1));
                if (!Number.isFinite(n15)) return null;
                t13.push(s5), r13.push(n15 / 100);
              }
            }
            if (t13.length < 2) return null;
            let n13 = function(e14) {
              let t14 = [...e14];
              (null === t14[0] || void 0 === t14[0]) && (t14[0] = 0), null === t14[t14.length - 1] && (t14[t14.length - 1] = 1);
              for (let e15 = 1; e15 < t14.length; e15 += 1) {
                if (null !== t14[e15]) continue;
                let r14 = e15;
                for (; null === t14[r14]; ) r14 += 1;
                let n14 = t14[e15 - 1], s5 = (t14[r14] - n14) / (r14 - e15 + 1);
                for (let i4 = e15; i4 < r14; i4 += 1) t14[i4] = n14 + s5 * (i4 - e15 + 1);
              }
              return t14.map((e15, t15, r14) => 0 === t15 ? e15 : Math.max(e15, r14[t15 - 1]));
            }(r13);
            return (e14) => {
              if (e14 <= n13[0]) return t13[0];
              let r14 = n13.length - 1;
              if (e14 >= n13[r14]) return t13[r14];
              let s5 = 0;
              for (; s5 < r14 && n13[s5 + 1] < e14; ) s5 += 1;
              let i4 = n13[s5 + 1] - n13[s5];
              return 0 === i4 ? t13[s5 + 1] : t13[s5] + (t13[s5 + 1] - t13[s5]) * (e14 - n13[s5]) / i4;
            };
          }(s4[1]) : null;
        }(s3), u3 = rR(e11, "width", t11, o3, l3?.width, n11, s3, d3), p3 = rR(e11, "height", r11, c3, l3?.height, n11, s3, d3), x3 = () => {
          u3.anim.cancel(), p3.anim.cancel();
        };
        u3.anim.onfinish = () => {
          rL.delete(e11), x3(), rO(e11), i3?.();
        }, rL.set(e11, { stop: x3, onCancel: a3, snapshot: () => ({ width: rD(u3, n11), height: rD(p3, n11) }) });
      }(t10, p2, x2, this.options.duration, this.options.ease, this.options.onAnimationComplete, this.options.onAnimationCancel);
    }
    updateStyles(e10, t10, r10) {
      if (this.isInitialRender) return;
      let n10 = Array.from(this.element.children).filter((e11) => !e11.hasAttribute(rj)), s2 = e10.map((e11) => e11.id), i2 = new Map(e10.map((e11) => [e11.id, e11.kind])), a2 = n10.filter((e11) => !e11.hasAttribute(ry) && "BR" !== e11.tagName && e11.getAttribute(rm) !== rw), l2 = new Set(a2.filter((e11) => !this.prevMeasures[e11.getAttribute(rm)])), o2 = /* @__PURE__ */ new Set();
      for (let e11 of rU(a2, l2)) e11.forEach((e12) => o2.add(e12)), function(e12, t11) {
        let { duration: r11, ease: n11 } = t11, s3 = rV(e12);
        e12.forEach((e13, t12) => {
          let i3 = rE(e13);
          e13.style.transformOrigin = s3[t12], e13.animate({ transform: "scale(0.8)", offset: 0 }, { duration: r11, easing: n11, fill: "both" });
          let a3 = i3.opacity >= 1 ? 0 : i3.opacity;
          e13.animate([{ opacity: a3 }, { opacity: 1 }], { duration: 0.35 * r11, easing: "linear", fill: "both" });
        });
      }(e11, { duration: this.options.duration, ease: this.options.ease });
      let c2 = new Set(s2.filter((e11) => this.prevMeasures[e11]));
      n10.forEach((n11, a3) => {
        if (n11.hasAttribute(ry) || "BR" === n11.tagName || o2.has(n11)) return;
        let l3 = n11.getAttribute(rm) || `child-${a3}`;
        if (l3 === rw) return;
        let d2 = !this.prevMeasures[l3], u2 = d2 ? rB(e10.findIndex((e11) => e11.id === l3), s2, c2) : l3, { dx: p2, dy: x2 } = u2 ? rF(this.prevMeasures, t10, u2) : { dx: 0, dy: 0 }, h2 = i2.get(l3);
        h2 && d2 ? function(e11, t11) {
          let { deltaX: r11, deltaY: n12, slideDistance: s3, kind: i3, duration: a4, ease: l4 } = t11;
          rH(e11, { deltaX: r11, deltaY: n12, duration: a4, ease: l4 });
          let o3 = r$(e11), c3 = rE(o3);
          o3.animate({ transform: `translate(0px, ${c3.ty + ("digit" === i3 ? -s3 : s3)}px)`, offset: 0 }, { duration: a4, easing: l4, fill: "both" });
          let d3 = c3.opacity >= 1 ? 0 : c3.opacity;
          d3 < 1 && o3.animate([{ opacity: d3 }, { opacity: 1 }], { duration: 0.25 * a4, easing: "linear", fill: "both" });
        }(n11, { deltaX: p2, deltaY: x2, slideDistance: r10, kind: h2, duration: this.options.duration, ease: this.options.ease }) : h2 ? rH(n11, { deltaX: p2, deltaY: x2, duration: this.options.duration, ease: this.options.ease }) : function(e11, t11) {
          let { deltaX: r11, deltaY: n12, isNew: s3, duration: i3, ease: a4 } = t11, l4 = rE(e11), o3 = r11 + l4.tx, c3 = n12 + l4.ty, d3 = s3 && l4.opacity >= 1 ? 0 : l4.opacity;
          e11.animate([{ transform: `translate(${o3}px, ${c3}px) scale(${s3 ? 0.95 : 1})` }, { transform: "none" }], { duration: i3, easing: a4, fill: "both" }), d3 < 1 && e11.animate([{ opacity: d3 }, { opacity: 1 }], { duration: i3 * (s3 ? 0.5 : 0.25), delay: s3 ? 0.25 * i3 : 0, easing: "linear", fill: "both" });
        }(n11, { deltaX: p2, deltaY: x2, isNew: d2, duration: this.options.duration, ease: this.options.ease });
      });
    }
    syncAccessibleText(e10) {
      if (!this.srNode || this.srNode.parentNode !== this.element) {
        let e11 = document.createElement("span");
        e11.setAttribute(rj, ""), this.element.prepend(e11), this.srNode = e11;
      }
      this.srNode.textContent = e10;
    }
  }, r0 = ({ children: e10, cursorIndex: t10, className: r10, style: n10, as: s2 = rG, ...i2 }) => {
    var a2;
    let o2, c2, d2, u2, { ref: p2, update: x2 } = (a2 = i2, o2 = l.default.useRef(null), c2 = l.default.useRef(new rY()), d2 = rY.serializeConfig(a2), (u2 = l.default.useRef(a2)).current = a2, l.default.useEffect(() => {
      let e11 = c2.current;
      return o2.current && e11.attach(o2.current, { ...a2, onAnimationStart: () => u2.current.onAnimationStart?.(), onAnimationComplete: () => u2.current.onAnimationComplete?.() }), () => {
        e11.destroy();
      };
    }, [d2]), { ref: o2, update: l.default.useCallback((e11, t11) => {
      c2.current.update(e11, t11);
    }, []) }), h2 = "number" == typeof e10 ? e10 : function e11(t11) {
      if ("string" == typeof t11) return t11;
      if ("number" == typeof t11) return String(t11);
      if (!t11 || "boolean" == typeof t11) return "";
      if (Array.isArray(t11)) return t11.map(e11).join("");
      throw l.default.isValidElement(t11) ? Error("TextMorph only accepts text content. Found a React element \u2014 use strings, numbers, or expressions instead.") : Error(`TextMorph received an unsupported child of type "${typeof t11}".`);
    }(e10), g2 = l.default.useRef(t10);
    g2.current = t10;
    let f2 = l.default.useRef({ __html: String(h2).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;").replace(/\n/g, "<br>") });
    return l.default.useEffect(() => {
      x2(h2, g2.current);
    }, [h2, x2]), l.default.createElement(s2, { ref: p2, className: r10, style: n10, dangerouslySetInnerHTML: f2.current });
  };
  let r1 = { delay: 0.06, duration: 0.24, ease: [0.22, 1, 0.36, 1] }, r2 = { duration: 0.16, ease: "easeOut" }, r5 = ({ label: e10, target: t10 }) => {
    let { ref: r10, isHovered: n10, isPressed: s2 } = V(t10);
    return (0, i.jsx)(j.motion.div, { ref: r10, "data-hovered": n10 || void 0, "data-pressed": s2 || void 0, initial: { opacity: 0, scale: 0.94 }, animate: { opacity: 1, scale: 1, transition: r1 }, exit: { opacity: 0, scale: 0.94, transition: r2 }, className: (0, a.cx)("px-2.5 py-[3.5px]", "rounded-full", "bg-black/3", "shadow-[0_0_0_0.5px_rgba(0,0,0,0.08)_inset]", "text-[11px]/[17px] font-book text-gray-600", "text-shadow-[0_1px_1px_rgba(255,255,255,0.60)]", "text-nowrap", "shrink-0 overflow-hidden", "transition-[background-color,scale] duration-120", "data-hovered:bg-black/6", "data-pressed:scale-[0.96]", "md:shrink md:truncate", "md:text-[12px]/[17px]"), children: (0, i.jsx)(r0, { children: e10 }) });
  }, r4 = ({ items: e10, className: t10 }) => (0, i.jsx)("div", { className: t10, children: (0, i.jsx)("div", { className: "flex items-center gap-x-1.5", children: (0, i.jsx)(y.AnimatePresence, { initial: false, children: e10.map(({ id: e11, ...t11 }) => (0, i.jsx)(r5, { ...t11 }, e11)) }) }) }), r6 = [{ id: "first", label: "Unblock Holloway\u2019s signature", target: "suggestion-deal" }, { id: "second", label: "Review open deals" }, { id: "third", label: "Plan my path to $90k" }], r3 = [{ id: "first", label: "Suggest meeting in person", target: "suggestion-meeting" }, { id: "second", label: "Draft a follow-up" }], r7 = [{ id: "first", label: "Draft an invite" }, { id: "second", label: "Draft a follow-up" }, { id: "third", label: "Review deal history" }], r8 = [{ id: "first", label: "Find a place nearby" }, { id: "second", label: "Review past conversations" }], r9 = [{ id: "first", label: "Find a place nearby" }], ne = [{ id: "first", label: "Make it shorter" }], nt = [{ id: "first", label: "Add to plan" }, { id: "second", label: "Set a reminder" }, { id: "third", label: "Draft the follow-up" }], nr = "Draft a Slack message to Kierra suggesting ", nn = " this week", ns = `${nr}tea${nn}`, ni = { before: nr, after: nn, coffee: `${nr}coffee${nn}`, tea: ns, message: `${ns}, and ask if anything is holding up the kickoff.` }, na = "Hi Kierra! Would you be up for tea sometime this week? I\u2019d love to hear how things are looking on your side, and whether there\u2019s anything I can help move along before kickoff.";
  var nl = ((n = {})[n.Quota = 0] = "Quota", n[n.DealClick = 1] = "DealClick", n[n.DealMessage = 2] = "DealMessage", n[n.DealOpen = 3] = "DealOpen", n[n.DealReply = 4] = "DealReply", n[n.DealSuggestions = 5] = "DealSuggestions", n[n.MeetingClick = 6] = "MeetingClick", n[n.MeetingMessage = 7] = "MeetingMessage", n[n.MeetingReply = 8] = "MeetingReply", n[n.MeetingSuggestions = 9] = "MeetingSuggestions", n[n.DraftClick = 10] = "DraftClick", n[n.DraftFocus = 11] = "DraftFocus", n[n.DraftType = 12] = "DraftType", n[n.PersonClick = 13] = "PersonClick", n[n.PersonOpen = 14] = "PersonOpen", n[n.PersonMorph = 15] = "PersonMorph", n[n.TeaClick = 16] = "TeaClick", n[n.TeaFocus = 17] = "TeaFocus", n[n.TeaType = 18] = "TeaType", n[n.SlackDraftClick = 19] = "SlackDraftClick", n[n.SlackDraftMessage = 20] = "SlackDraftMessage", n[n.SlackDraftReply = 21] = "SlackDraftReply", n[n.SlackDraftSuggestions = 22] = "SlackDraftSuggestions", n[n.SlackDraftOpen = 23] = "SlackDraftOpen", n[n.NextStepClick = 24] = "NextStepClick", n[n.NextStepSent = 25] = "NextStepSent", n[n.NextStepReply = 26] = "NextStepReply", n[n.NextStepSuggestions = 27] = "NextStepSuggestions", n[n.NextStepPlan = 28] = "NextStepPlan", n);
  let no = () => (0, i.jsx)("svg", { width: "16", height: "16", fill: "none", viewBox: "0 0 16 16", children: (0, i.jsx)("path", { stroke: "#5F6D6B", strokeLinecap: "round", strokeLinejoin: "round", d: "M7.989 8.004 14.497 1.5m-1.906 1.905a6.502 6.502 0 0 0-11.04 3.78 6.493 6.493 0 0 0 5.085 7.17 6.504 6.504 0 0 0 7.58-4.453 6.5 6.5 0 0 0-.353-4.702m-3.573.505a3.255 3.255 0 0 0-5.27 3.632 3.253 3.253 0 0 0 5.586.602 3.25 3.25 0 0 0 .632-2.12" }) }), nc = ({ className: e10 }) => (0, i.jsxs)("div", { className: (0, a.cx)("py-1.75", "bg-[#F7F7F7]", e10), children: [(0, i.jsx)("div", { className: (0, a.cx)("absolute top-full left-0 h-6 w-full", "bg-linear-180 from-[#F7F7F7] to-[#F7F7F7]/0", "mask-b-from-0", "backdrop-blur-[1.5px]") }), (0, i.jsxs)("div", { className: (0, a.cx)("py-[6.5px]", "flex items-center gap-x-2"), children: [(0, i.jsx)(no, {}), (0, i.jsx)("div", { className: (0, a.cx)("text-[13px]/[19px] font-book tracking-[-0.13px] text-gray-900"), children: "Quota" })] })] }), nd = { opacity: [1, 1, 0, 0], transition: { duration: 1, times: [0, 0.5, 0.5, 1], repeat: 1 / 0 } }, nu = ({ isBlinking: e10 = true }) => {
    let t10 = (0, ev.useReducedMotion)();
    return (0, i.jsx)(j.motion.span, { "aria-hidden": "true", className: "-mr-px inline-block h-[1.15em] w-px bg-gray-900 align-[-0.2em]", animate: e10 && !t10 ? nd : { opacity: 1 } });
  }, np = () => (0, i.jsx)("svg", { width: "16", height: "16", fill: "none", viewBox: "0 0 16 16", children: (0, i.jsx)("path", { stroke: "#71807E", strokeLinecap: "round", strokeLinejoin: "round", d: "M3 8h10M8 3v10" }) }), nx = () => (0, i.jsx)("svg", { width: "16", height: "16", fill: "none", viewBox: "0 0 16 16", style: { filter: "drop-shadow(0 0.5px 0 rgb(0 0 0 / 28%))" }, children: (0, i.jsx)("path", { stroke: "#EDEFEF", strokeLinecap: "round", strokeLinejoin: "round", d: "M8 13V3m4 4.146L8 3 4 7.146" }) }), nh = { duration: 0.48, ease: [0.22, 1, 0.36, 1] }, ng = { delay: 0.12, duration: 0.42, ease: [0.22, 1, 0.36, 1] }, nf = () => {
    let { ref: e10, isHovered: t10, isPressed: r10 } = V("composer-submit");
    return (0, i.jsx)("div", { ref: e10, "data-hovered": t10 || void 0, "data-pressed": r10 || void 0, className: (0, a.cx)("p-2", "rounded-full", "bg-linear-180 from-[#269600] to-[#008125]", "shadow-[0_1px_2px_0_rgba(255,255,255,0.12)_inset,0_-1px_1px_0_rgba(0,0,0,0.08)_inset,0_0_0_0.5px_rgba(0,0,0,0.16)_inset,0_2px_2px_-1px_rgba(0,0,0,0.06),0_1px_1px_-0.5px_rgba(0,0,0,0.06),0_4px_8px_-4px_rgba(0,129,37,0.32)]", "transition-[filter,scale] duration-120", "data-hovered:brightness-110", "data-pressed:scale-[0.92]"), children: (0, i.jsx)(nx, {}) });
  }, nm = ({ isFocused: e10, draft: t10, takeover: r10, actions: n10 }) => {
    let s2 = V("composer-input");
    return (0, i.jsxs)(j.motion.div, { className: (0, a.cx)("p-2", "flex flex-col", "bg-[#fcfcfc]", "shadow-[0_1px_2px_0_#FFF_inset,0_2px_2px_-1px_rgba(0,0,0,0.08),0_1px_1px_-0.5px_rgba(0,0,0,0.06),0_0_0_0.5px_rgba(0,0,0,0.08),0_0_2px_0_rgba(0,0,0,0.08),0_8px_16px_-8px_rgba(0,0,0,0.12),0_8px_32px_-8px_rgba(0,0,0,0.08)]"), initial: false, animate: { borderRadius: r10 ? 16 : 24 }, transition: nh, children: [(0, i.jsx)(y.AnimatePresence, { initial: false, children: r10 && (0, i.jsx)(j.motion.div, { className: "overflow-hidden", initial: { height: 0 }, animate: { height: "auto" }, exit: { height: 0, opacity: 0 }, transition: nh, children: (0, i.jsx)(j.motion.div, { initial: { opacity: 0, y: 10, filter: "blur(6px)" }, animate: { opacity: 1, y: 0, filter: "blur(0px)" }, transition: ng, children: r10 }) }, "takeover") }), (0, i.jsxs)("div", { className: "flex items-end gap-x-2", children: [(0, i.jsx)("div", { className: "p-2", children: (0, i.jsx)(np, {}) }), (0, i.jsx)("div", { ref: s2.ref, className: (0, a.cx)("min-w-0 flex-1", "py-[5.5px]", "text-[15px]/[21px]", t10 ? "text-gray-900" : "text-gray-500"), children: t10 ?? (0, i.jsxs)("div", { className: "truncate", children: [e10 && (0, i.jsx)(nu, {}), "Ask about Quota..."] }) }), n10 ?? (0, i.jsx)(nf, {})] })] });
  }, nb = (e10) => {
    let { setContentFinished: t10, setContentEnd: r10 } = z(), n10 = e10 < z().settledStep;
    return (0, l.useEffect)(() => () => {
      t10(e10, false), r10(e10, null);
    }, [e10, t10, r10]), { onStart: (0, l.useCallback)((t11) => r10(e10, performance.now() + t11), [e10, r10]), onComplete: (0, l.useCallback)(() => t10(e10, true), [e10, t10]), isSettled: n10 };
  }, nv = (e10, t10 = "") => 32 * Math.max(e10.length - t10.length - 1, 0), ny = ({ text: e10, from: t10 = "", isComplete: r10, onStart: n10, onComplete: s2 }) => {
    let a2 = !!(0, ev.useReducedMotion)() || !!r10, [o2, c2] = (0, l.useState)(t10.length), d2 = a2 ? e10.length : o2;
    return (0, l.useEffect)(() => {
      let r11;
      if (n10?.(a2 ? 0 : nv(e10, t10)), a2) return;
      let s3 = 0, i2 = (n11) => {
        r11 ??= n11;
        let a3 = Math.min(e10.length, t10.length + Math.floor((n11 - r11) / 32) + 1);
        c2(a3), a3 < e10.length && (s3 = requestAnimationFrame(i2));
      };
      return s3 = requestAnimationFrame(i2), () => cancelAnimationFrame(s3);
    }, [a2, e10, t10, n10]), (0, l.useEffect)(() => {
      d2 === e10.length && s2?.();
    }, [d2, e10, s2]), (0, i.jsxs)(i.Fragment, { children: [e10.slice(0, d2), (0, i.jsx)(nu, { isBlinking: d2 === e10.length })] });
  }, nj = ({ step: e10, text: t10, from: r10 }) => {
    let { onStart: n10, onComplete: s2, isSettled: a2 } = nb(e10);
    return (0, i.jsx)(ny, { text: t10, from: r10, isComplete: a2, onStart: n10, onComplete: s2 });
  }, nk = ({ draft: e10, isFocused: t10 }) => "typing" === e10.type ? (0, i.jsx)(nj, { ...e10 }, e10.step) : (0, i.jsxs)(i.Fragment, { children: [e10.before, (0, i.jsx)(r0, { children: e10.word }), e10.after, t10 && (0, i.jsx)(nu, {})] }), nw = () => (0, i.jsx)("svg", { width: "16", height: "16", fill: "none", viewBox: "0 0 16 16", children: (0, i.jsx)("path", { stroke: "#71807E", strokeLinecap: "round", strokeLinejoin: "round", d: "M10.955 10.955H12.5a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2H7.045a2 2 0 0 0-2 2v1.545M3.5 14.5h5.455a2 2 0 0 0 2-2V7.045a2 2 0 0 0-2-2H3.5a2 2 0 0 0-2 2V12.5a2 2 0 0 0 2 2" }) }), nA = () => (0, i.jsxs)("svg", { width: "16", height: "16", fill: "none", viewBox: "0 0 16 16", children: [(0, i.jsx)("path", { fill: "#E01E5A", d: "M3.941 9.844c0 .81-.66 1.47-1.47 1.47S1 10.655 1 9.845s.661-1.47 1.47-1.47h1.471zm.742 0c0-.81.66-1.47 1.47-1.47s1.47.66 1.47 1.47v3.682c0 .81-.66 1.47-1.47 1.47s-1.47-.66-1.47-1.47z" }), (0, i.jsx)("path", { fill: "#36C5F0", d: "M6.153 3.94c-.81 0-1.47-.661-1.47-1.47 0-.81.66-1.471 1.47-1.471s1.47.661 1.47 1.47V3.94zm0 .74c.81 0 1.47.662 1.47 1.471 0 .81-.66 1.47-1.47 1.47H2.471C1.66 7.622 1 6.962 1 6.152s.661-1.47 1.47-1.47z" }), (0, i.jsx)("path", { fill: "#2EB67D", d: "M12.059 6.151c0-.809.66-1.47 1.47-1.47S15 5.342 15 6.15c0 .81-.66 1.47-1.47 1.47h-1.47zm-.742 0c0 .81-.66 1.47-1.47 1.47s-1.471-.66-1.471-1.47V2.47c0-.81.661-1.471 1.47-1.471.81 0 1.471.661 1.471 1.47z" }), (0, i.jsx)("path", { fill: "#ECB22E", d: "M9.847 12.06c.81 0 1.47.661 1.47 1.47 0 .81-.66 1.47-1.47 1.47s-1.471-.66-1.471-1.47v-1.47zm0-.745c-.81 0-1.471-.662-1.471-1.471 0-.81.661-1.47 1.47-1.47h3.683c.81 0 1.47.66 1.47 1.47s-.66 1.47-1.47 1.47z" })] }), n_ = { src: e.i(495941).default, width: 1824, height: 372, blurWidth: 8, blurHeight: 2, blurDataURL: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAACCAYAAABllJ3tAAAAMklEQVR42j3JOQoAQAhDUe9/WnG3ypApLF4IfIkIUHdjdz/+zIS7QzhUVZiZi2YGVcUD/dk959G76z4AAAAASUVORK5CYII=" }, nC = () => (0, i.jsxs)("div", { className: "px-2 pt-1.5 pb-6", children: [(0, i.jsxs)("div", { className: "flex items-center gap-x-2", children: [(0, i.jsx)(nA, {}), (0, i.jsxs)("div", { className: "flex items-center gap-x-1.5", children: [(0, i.jsx)("div", { className: "text-[14px]/[20px] font-book text-gray-800", children: "Direct message to Kierra" }), (0, i.jsx)("div", { className: "font-mono text-[14px]/[20px] tracking-[-0.28px] text-gray-500", children: "draft" })] }), (0, i.jsx)("div", { className: (0, a.cx)("ml-auto"), children: (0, i.jsx)(nw, {}) })] }), (0, i.jsxs)("div", { className: (0, a.cx)("relative", "mt-3.5", "px-4 py-3", "rounded-xl bg-black/3"), children: [(0, i.jsxs)("div", { className: "absolute inset-0", children: [(0, i.jsx)(P.default, { className: "absolute inset-0 size-full rounded-xl bg-black/3 object-cover", src: n_, sizes: "480px", alt: "" }), (0, i.jsx)("div", { className: "absolute inset-0 rounded-xl border-[0.5px] border-black/2" })] }), (0, i.jsx)("p", { className: (0, a.cx)("relative", "text-[14px]/[23px] tracking-[0.14px] text-pretty text-gray-800"), children: na })] })] }), nS = () => {
    let e10 = V("slack-draft-send");
    return (0, i.jsxs)("div", { className: "flex items-center gap-x-1.5", children: [(0, i.jsx)("div", { className: "px-3 py-1.5 text-[14px]/[20px] font-book tracking-[0.14px] text-gray-700", children: "Discard" }), (0, i.jsx)("div", { ref: e10.ref, "data-hovered": e10.isHovered || void 0, "data-pressed": e10.isPressed || void 0, className: (0, a.cx)("px-3 py-1.5", "rounded-full", "transition-[filter,scale] duration-120", "data-hovered:brightness-110", "data-pressed:scale-[0.94]", "bg-linear-180 from-[#269600] to-[#008125]", "shadow-[0_1px_2px_0_rgba(255,255,255,0.12)_inset,0_-1px_1px_0_rgba(0,0,0,0.08)_inset,0_0_0_0.5px_rgba(0,0,0,0.16)_inset,0_2px_2px_-1px_rgba(0,0,0,0.06),0_1px_1px_-0.5px_rgba(0,0,0,0.06),0_4px_8px_-4px_rgba(0,129,37,0.32)]", "text-[14px]/[20px] font-book tracking-[0.14px] text-gray-200"), children: "Send" })] });
  }, nN = () => {
    let e10, t10 = { isFocused: (e10 = z().step) >= nl.DraftFocus && e10 < nl.PersonOpen || e10 >= nl.TeaFocus && e10 < nl.SlackDraftMessage, draft: ((e11) => {
      if (!(e11 >= nl.SlackDraftMessage)) {
        if (e11 >= nl.TeaType) return { type: "typing", step: nl.TeaType, text: ni.message, from: ni.tea };
        if (e11 >= nl.PersonClick) return { type: "morphing", before: ni.before, word: e11 >= nl.PersonMorph ? "tea" : "coffee", after: ni.after };
        if (e11 >= nl.DraftType) return { type: "typing", step: nl.DraftType, text: ni.coffee };
      }
    })(e10), isSlackDraftOpen: e10 >= nl.SlackDraftOpen && e10 < nl.NextStepSent };
    return (0, i.jsx)(nm, { isFocused: t10.isFocused, draft: t10.draft && (0, i.jsx)(nk, { draft: t10.draft, isFocused: t10.isFocused }), takeover: t10.isSlackDraftOpen ? (0, i.jsx)(nC, {}) : void 0, actions: t10.isSlackDraftOpen ? (0, i.jsx)(nS, {}) : void 0 });
  }, nM = [{ icon: (0, i.jsx)(() => (0, i.jsx)("svg", { width: "16", height: "16", fill: "none", viewBox: "0 0 16 16", children: (0, i.jsx)("path", { stroke: "#9BA8A7", strokeLinecap: "round", strokeLinejoin: "round", d: "M4.304 6.548s1.74-1.412 4.348.385C11.395 8.819 13 8.08 13 8.08M7.274 9.604c.969.211 3.552 1.036 3.552 3.896M8.567 6.873C8.237 8.178 6.631 12.107 3 11.74m7.826-7.92c0 .729-.584 1.32-1.304 1.32s-1.305-.591-1.305-1.32.584-1.32 1.305-1.32c.72 0 1.304.591 1.304 1.32" }) }), {}), title: "Ahead of pace", description: "+$11k against $45k pace." }, { icon: (0, i.jsx)(() => (0, i.jsx)("svg", { width: "16", height: "16", fill: "none", viewBox: "0 0 16 16", children: (0, i.jsx)("path", { stroke: "#9BA8A7", strokeLinecap: "round", strokeLinejoin: "round", d: "m3.722 3.417 8.148 9.166M5.352 5.917v4.166m0-4.166H2.907a.4.4 0 0 0-.288.122.42.42 0 0 0-.119.294v3.334c0 .11.043.216.12.294.076.078.18.122.287.122h2.445m0-4.166.347-.276m-.347 4.442L9.018 13V9.375m2.037-2.476c.263.305.407.696.407 1.102s-.144.797-.407 1.102M6.99 4.614 9.019 3v3.897M12.565 5.5c.602.688.934 1.578.934 2.5s-.332 1.812-.934 2.5" }) }), {}), title: "Biggest risk, 9 days quiet", description: "Fielded\u2019s $4k has gone silent since Sep 6." }, { icon: (0, i.jsx)(() => (0, i.jsx)("svg", { width: "16", height: "16", fill: "none", viewBox: "0 0 16 16", children: (0, i.jsx)("path", { stroke: "#9BA8A7", strokeLinecap: "round", strokeLinejoin: "round", d: "M7.577 3v2.083m0 4.167V13m3.83-3.75H2.924a.43.43 0 0 1-.3-.122.4.4 0 0 1-.123-.295V5.5c0-.11.045-.216.124-.295a.43.43 0 0 1 .3-.122h8.484a.43.43 0 0 1 .314.138L13.5 7.167l-1.778 1.945a.42.42 0 0 1-.314.138" }) }), {}), title: "Next decision", description: "Chase Holloway\u2019s signature today, or nudge Fielded first." }], nE = () => (0, i.jsx)("div", { className: (0, a.cx)("p-4", "flex flex-col gap-y-4", "rounded-2xl", "bg-black/2"), children: nM.map(({ icon: e10, title: t10, description: r10 }, n10) => (0, i.jsxs)("div", { className: "flex flex-col gap-y-1", children: [(0, i.jsxs)("div", { className: "flex items-center gap-x-2", children: [e10, (0, i.jsx)("div", { className: "text-[12px]/[17px] text-gray-600", children: t10 })] }), (0, i.jsx)("div", { className: (0, a.cx)("pl-6", "text-[14px]/[20px] text-pretty text-gray-800"), children: r10 })] }, n10)) }), nR = () => (0, i.jsx)("svg", { width: "16", height: "16", fill: "none", viewBox: "0 0 16 16", children: (0, i.jsx)("path", { stroke: "#CAD3D2", strokeLinecap: "round", strokeLinejoin: "round", d: "m11 6.5-3 3-3-3" }) }), nD = [{ icon: (0, i.jsx)(() => (0, i.jsx)("svg", { width: "16", height: "16", fill: "none", viewBox: "0 0 16 16", children: (0, i.jsx)("path", { fill: "#FF4800", fillRule: "evenodd", d: "M10.941 5.369v1.186h-.002c1.125.166 2.024.98 2.254 2.045s-.255 2.152-1.219 2.73a2.83 2.83 0 0 1-3.107-.135l-1.012.966a.8.8 0 0 1 .042.242c0 .468-.398.847-.888.847s-.888-.38-.888-.847c0-.468.398-.847.888-.847a1 1 0 0 1 .254.04l1.022-.977a2.5 2.5 0 0 1-.042-2.93l-3.36-2.496a1.13 1.13 0 0 1-1.364-.218 1.004 1.004 0 0 1-.043-1.319c.317-.393.88-.518 1.347-.299s.705.723.57 1.202L8.812 7.1a2.8 2.8 0 0 1 1.291-.542V5.369a.91.91 0 0 1-.552-.825v-.027c.001-.504.429-.913.957-.914h.03c.527.001.955.41.957.914v.027a.91.91 0 0 1-.553.825M9.124 9.124c-.002.737.623 1.336 1.396 1.338h.003c.773 0 1.4-.598 1.4-1.335 0-.738-.626-1.336-1.398-1.337-.773 0-1.4.596-1.401 1.334", clipRule: "evenodd" }) }), {}), action: "Checked HubSpot", result: "5 open deals, $65k in play" }, { icon: (0, i.jsx)(() => {
    let e10 = (0, l.useId)();
    return (0, i.jsxs)("svg", { width: "16", height: "16", fill: "none", viewBox: "0 0 16 16", children: [(0, i.jsx)("path", { fill: `url(#${e10}-side)`, d: "M10.84 5.047H13v6.249a.68.68 0 0 1-.682.681H11.18a.34.34 0 0 1-.34-.34z" }), (0, i.jsx)("path", { fill: "#FC413D", d: "M5.16 5.047H3v6.249c0 .376.305.681.682.681h1.136a.34.34 0 0 0 .341-.34z" }), (0, i.jsx)("path", { fill: `url(#${e10}-chevron)`, d: "M4.774 4.276a1.08 1.08 0 0 0-1.39 1.653L7.709 9.56a.455.455 0 0 0 .585 0l4.322-3.632a1.08 1.08 0 1 0-1.39-1.653L8 6.987z" }), (0, i.jsxs)("defs", { children: [(0, i.jsxs)("linearGradient", { id: `${e10}-side`, x1: "11.92", x2: "11.92", y1: "5.047", y2: "11.977", gradientUnits: "userSpaceOnUse", children: [(0, i.jsx)("stop", { stopColor: "#60D673" }), (0, i.jsx)("stop", { offset: ".17", stopColor: "#42C868" }), (0, i.jsx)("stop", { offset: ".39", stopColor: "#0EBC5F" }), (0, i.jsx)("stop", { offset: ".62", stopColor: "#00A9BB" }), (0, i.jsx)("stop", { offset: ".86", stopColor: "#3C90FF" }), (0, i.jsx)("stop", { offset: "1", stopColor: "#3186FF" })] }), (0, i.jsxs)("linearGradient", { id: `${e10}-chevron`, x1: "3", x2: "13", y1: "5.167", y2: "5.167", gradientUnits: "userSpaceOnUse", children: [(0, i.jsx)("stop", { offset: ".08", stopColor: "#FF63A0" }), (0, i.jsx)("stop", { offset: ".3", stopColor: "#FC413D" }), (0, i.jsx)("stop", { offset: ".5", stopColor: "#FC413D" }), (0, i.jsx)("stop", { offset: ".65", stopColor: "#FC413D" }), (0, i.jsx)("stop", { offset: ".72", stopColor: "#FC5C30" }), (0, i.jsx)("stop", { offset: ".86", stopColor: "#FEB10C" }), (0, i.jsx)("stop", { offset: ".91", stopColor: "#FEC700" }), (0, i.jsx)("stop", { offset: ".96", stopColor: "#FFDB0F" })] })] })] });
  }, {}), action: "Read Gmail", result: "Holloway contract thread, Fielded quiet since Sep 6" }, { icon: (0, i.jsx)(nA, {}), action: "Read Slack", result: "#holloway" }], nL = () => (0, i.jsxs)("div", { className: "flex flex-col gap-y-1", children: [(0, i.jsxs)("div", { className: "flex items-center gap-x-1", children: [(0, i.jsx)(nR, {}), (0, i.jsx)("div", { className: "text-[12px]/[17px] font-book text-gray-500", children: "Checked 3 sources" })] }), (0, i.jsx)("div", { className: (0, a.cx)("ml-2", "pt-1 pl-3", "flex flex-col gap-y-2", "border-l-[0.5px] border-black/12"), children: nD.map(({ icon: e10, action: t10, result: r10 }, n10) => (0, i.jsxs)("div", { className: "flex items-center gap-x-1", children: [e10, (0, i.jsx)("div", { className: "text-[12px]/[17px] text-nowrap text-gray-600", children: t10 }), (0, i.jsx)("div", { className: "truncate text-[12px]/[17px] text-gray-500", children: r10 })] }, n10)) })] }), nO = ({ children: e10 }) => (0, i.jsx)("div", { className: "flex justify-end", children: (0, i.jsx)("div", { className: (0, a.cx)("max-w-[min(24rem,80%)]", "px-3 py-[7.5px]", "rounded-[10px] border-[0.5px] border-[#008125]/2", "[background:linear-gradient(0deg,rgba(0,129,37,0.05)_0%,rgba(0,129,37,0.05)_100%),#F7F7F7]", "text-[14px]/[23px] text-gray-800"), children: e10 }) }), nT = () => (0, i.jsxs)(i.Fragment, { children: [(0, i.jsx)("div", { className: "text-[14px]/[23px] text-pretty text-gray-800", children: "That takes commit to $36k." }), (0, i.jsx)(nO, { children: "Catch me up on my quota." }), (0, i.jsx)(nL, {}), (0, i.jsxs)("div", { className: "flex flex-col gap-y-3", children: [(0, i.jsx)("div", { className: "text-[14px]/[23px] font-medium text-gray-800", children: "Final stretch" }), (0, i.jsx)("div", { className: "text-[14px]/[23px] text-pretty text-gray-800", children: "You\u2019ve booked $56K toward your $90K September quota. Holloway is close, and Tideline and Fielded are coming up next." }), (0, i.jsx)(nE, {})] })] }), nP = ({ src: e10, alt: t10, className: r10 }) => (0, i.jsxs)("span", { className: (0, a.cx)("relative inline-block rounded-full", r10), children: [(0, i.jsx)(P.default, { className: "block size-full rounded-full", src: e10, alt: t10 }), (0, i.jsx)("span", { "aria-hidden": "true", className: "pointer-events-none absolute inset-0 rounded-full shadow-[inset_0_0_0_0.5px_rgba(0,0,0,0.04)]" })] }), nF = ({ className: e10 }) => {
    let t10 = (0, l.useId)();
    return (0, i.jsxs)("svg", { className: (0, a.cx)("inline-block", "rounded-[5px] shadow-[0_1.6px_1.6px_-0.8px_rgba(0,0,0,0.02),0_0.8px_0.8px_-0.4px_rgba(0,0,0,0.04),0_0.4px_0.4px_-0.2px_rgba(0,0,0,0.06)]", e10), width: "16", height: "16", fill: "none", viewBox: "0 0 16 16", children: [(0, i.jsx)("rect", { width: "16", height: "16", fill: "#F9ED00", rx: "5" }), (0, i.jsx)("rect", { width: "16", height: "16", fill: `url(#${t10})`, fillOpacity: ".02", rx: "5" }), (0, i.jsx)("path", { stroke: "#000", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.3", d: "M8 3.188v9.625M3.625 5.375l8.75 5.25m-8.75 0 8.75-5.25" }), (0, i.jsx)("circle", { cx: "8", cy: "8", r: "2", fill: "#000" }), (0, i.jsx)("defs", { children: (0, i.jsxs)("linearGradient", { id: t10, x1: "8", x2: "8", y1: "0", y2: "16", gradientUnits: "userSpaceOnUse", children: [(0, i.jsx)("stop", { stopOpacity: "0" }), (0, i.jsx)("stop", { offset: "1" })] }) }), (0, i.jsx)("rect", { x: ".1", y: ".1", width: "15.8", height: "15.8", rx: "4.9", stroke: "#000", strokeOpacity: ".1", strokeWidth: ".2" })] });
  }, nB = ({ children: e10 }) => (0, i.jsx)("span", { className: "text-gray-700 underline decoration-wavy decoration-[0.5px] -underline-offset-1 [text-decoration-skip-ink:none] [text-underline-position:from-font]", children: e10 }), nz = () => (0, i.jsxs)("span", { children: [(0, i.jsx)(nF, { className: "mr-[4.5px] mb-[2.5px]" }), (0, i.jsx)(nB, { children: "DEAL-132 \xB7 Holloway" })] }), nI = ({ step: e10, children: t10 }) => {
    let r10 = e10 < z().settledStep;
    return (0, i.jsx)(j.motion.div, { initial: !r10 && { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.05, duration: 0.3, ease: k }, children: t10 });
  };
  var n$ = i;
  let nH = () => (0, i.jsx)("svg", { width: "16", height: "16", fill: "none", viewBox: "0 0 16 16", children: (0, i.jsx)("path", { stroke: "#9BA8A7", strokeLinecap: "round", strokeLinejoin: "round", d: "M5.5 12 3 9.6l2.5-2.4M3 9.6h7.083a2.98 2.98 0 0 0 2.063-.82A2.74 2.74 0 0 0 13 6.8c0-.743-.307-1.455-.854-1.98A2.98 2.98 0 0 0 10.083 4H8" }) }), nV = ({ icon: e10 = (0, n$.jsx)(nH, {}), children: t10 }) => (0, n$.jsxs)("div", { className: "flex items-center gap-x-1.5", children: [e10, (0, n$.jsx)("div", { className: "text-[12px]/[17px] text-gray-500", children: t10 })] }), nU = { duration: 0.3, ease: w }, nW = (0, l.memo)(function({ token: e10, isRevealed: t10, isInstant: r10 }) {
    return (0, i.jsxs)(i.Fragment, { children: [e10.leading, (0, i.jsx)(j.motion.span, { initial: !r10 && { opacity: 0 }, animate: { opacity: +!!t10 }, transition: nU, children: e10.content })] });
  }), nQ = ({ paragraphs: e10, reservesSpace: t10, isComplete: r10, onStart: n10, onComplete: s2, className: a2 }) => {
    let o2 = !!(0, ev.useReducedMotion)() || !!r10, c2 = (0, l.useMemo)(() => {
      let t11;
      return t11 = 0, e10.map((e11, r11) => {
        let n11 = [], s3 = "";
        for (let t12 of e11) {
          if ("string" != typeof t12) {
            n11.push({ id: t12.id, leading: s3, content: t12.node }), s3 = "";
            continue;
          }
          for (let e12 of t12.split(/(\s+)/)) if (e12) {
            if (/^\s+$/.test(e12)) {
              s3 += e12;
              continue;
            }
            n11.push({ id: `text-${r11}.${n11.length}`, leading: s3, content: e12 }), s3 = "";
          }
        }
        let i2 = { id: `${r11}`, tokens: n11, offset: t11 };
        return t11 += n11.length, i2;
      });
    }, [e10]), d2 = c2.reduce((e11, { tokens: t11 }) => e11 + t11.length, 0), [u2, p2] = (0, l.useState)(0), x2 = o2 ? d2 : u2;
    return (0, l.useEffect)(() => {
      let e11;
      if (n10?.(o2 ? 0 : 25 * Math.max(d2 - 1, 0)), o2) return;
      let t11 = 0, r11 = (n11) => {
        e11 ??= n11;
        let s3 = Math.min(d2, Math.floor((n11 - e11) / 25) + 1);
        p2(s3), s3 < d2 && (t11 = requestAnimationFrame(r11));
      };
      return t11 = requestAnimationFrame(r11), () => cancelAnimationFrame(t11);
    }, [o2, d2, n10]), (0, l.useEffect)(() => {
      x2 === d2 && s2?.();
    }, [x2, d2, s2]), (0, i.jsx)("div", { className: a2, children: c2.filter(({ offset: e11 }) => t10 || e11 < x2).map(({ id: e11, tokens: r11, offset: n11 }) => (0, i.jsx)("p", { children: (t10 ? r11 : r11.slice(0, x2 - n11)).map((e12, t11) => (0, i.jsx)(nW, { token: e12, isRevealed: n11 + t11 < x2, isInstant: o2 }, e12.id)) }, e11)) });
  }, nK = ({ step: e10, paragraphs: t10, className: r10 }) => {
    let { onStart: n10, onComplete: s2, isSettled: l2 } = nb(e10);
    return (0, i.jsx)(nQ, { className: (0, a.cx)("pr-5", "flex flex-col gap-y-4", "text-[14px]/[23px] text-gray-800", r10), paragraphs: t10, isComplete: l2, onStart: n10, onComplete: s2 });
  }, nZ = [["The last conversation on ", { id: "deal", node: (0, i.jsx)(nz, {}) }, " went well. The team is ready to get started, but the signature is still outstanding."], ["Legal, security, and procurement are clear, so we\u2019re waiting on the signature and kickoff. ", { id: "kierra-avatar", node: (0, i.jsx)(nP, { className: "size-4 translate-y-[2.5px]", src: Y, alt: "Kierra" }) }, " ", { id: "kierra", node: (0, i.jsx)(nB, { children: "Kierra" }) }, " is your champion; an in-person catch-up could help surface anything still holding things up."]], nq = () => {
    let e10 = z().step;
    return (0, i.jsxs)(i.Fragment, { children: [e10 >= nl.DealMessage && (0, i.jsx)(nI, { step: nl.DealMessage, children: (0, i.jsx)(nO, { children: "Unblock Holloway\u2019s signature." }) }), e10 >= nl.DealOpen && (0, i.jsxs)("div", { children: [(0, i.jsxs)(nV, { children: ["Navigated to ", (0, i.jsx)("span", { className: "text-gray-600", children: "Holloway" })] }), e10 >= nl.DealReply && (0, i.jsx)(nK, { className: "mt-3", step: nl.DealReply, paragraphs: nZ })] })] });
  }, nY = [["Coffee or lunch could work. Tell me what you have in mind and I\u2019ll draft the invite."]], nG = () => {
    let e10 = z().step;
    return (0, i.jsxs)(i.Fragment, { children: [e10 >= nl.MeetingMessage && (0, i.jsx)(nI, { step: nl.MeetingMessage, children: (0, i.jsx)(nO, { children: "Let\u2019s follow up with their team and suggest meeting in person." }) }), e10 >= nl.MeetingReply && (0, i.jsx)(nK, { step: nl.MeetingReply, paragraphs: nY })] });
  }, nJ = () => z().step >= nl.PersonOpen && (0, i.jsxs)(nV, { children: ["Navigated to ", (0, i.jsx)("span", { className: "text-gray-600", children: "Kierra Torres" })] }), nX = [["Here\u2019s a draft for Kierra, ready in the composer. Send it, or change anything first."]], n0 = () => {
    let e10 = z().step;
    return (0, i.jsxs)(i.Fragment, { children: [e10 >= nl.SlackDraftMessage && (0, i.jsx)(nI, { step: nl.SlackDraftMessage, children: (0, i.jsx)(nO, { children: ni.message }) }), e10 >= nl.SlackDraftReply && (0, i.jsx)(nK, { step: nl.SlackDraftReply, paragraphs: nX })] });
  }, n1 = [["Sent. Back on ", { id: "deal", node: (0, i.jsx)(nz, {}) }, ". Once tea is on the calendar, the next step is to follow up with Kierra on the kickoff date and nudge Cooper on the signature. I\u2019ve added it to the deal plan as a suggestion."]], n2 = () => {
    let e10 = z().step;
    return e10 >= nl.NextStepSent && (0, i.jsxs)("div", { children: [(0, i.jsxs)(nV, { icon: (0, i.jsx)(nA, {}), children: ["Sent to ", (0, i.jsx)("span", { className: "text-gray-600", children: "Kierra" }), " on Slack"] }), e10 >= nl.NextStepReply && (0, i.jsx)(nK, { className: "mt-3", step: nl.NextStepReply, paragraphs: n1 })] });
  }, n5 = () => {
    let e10 = z().step;
    return (0, i.jsxs)("div", { className: (0, a.cx)("isolate", "h-full", "px-4", "flex flex-col justify-end", "overflow-hidden", "xl:px-10"), children: [(0, i.jsx)(nc, { className: "sticky top-0 z-1" }), (0, i.jsx)("div", { className: (0, a.cx)("flex-1", "flex flex-col justify-end"), children: (0, i.jsxs)("div", { className: (0, a.cx)("relative", "pb-3.75"), children: [(0, i.jsxs)("div", { className: "flex flex-col gap-y-8", children: [(0, i.jsx)(nT, {}), (0, i.jsx)(nq, {}), (0, i.jsx)(nG, {}), (0, i.jsx)(nJ, {}), (0, i.jsx)(n0, {}), (0, i.jsx)(n2, {})] }), (0, i.jsxs)("div", { className: (0, a.cx)("pt-10", "flex flex-col gap-y-3"), children: [(0, i.jsx)(r4, { items: e10 >= nl.NextStepSuggestions ? nt : e10 >= nl.SlackDraftSuggestions ? ne : e10 >= nl.TeaType ? r9 : e10 >= nl.PersonMorph ? r8 : e10 >= nl.MeetingSuggestions ? r7 : e10 >= nl.DealSuggestions ? r3 : r6, className: "lg:mx-2" }), (0, i.jsx)(nN, {})] })] }) })] });
  }, n4 = [{ label: "Quota", step: nl.Quota }, { label: "Meeting", step: nl.MeetingClick }, { label: "Draft", step: nl.PersonClick }, { label: "Slack", step: nl.SlackDraftClick }, { label: "Next step", step: nl.NextStepClick }], n6 = { [nl.Quota]: { duration: 1200 }, [nl.DealClick]: { duration: 150, cursor: { target: "suggestion-deal", action: "click" } }, [nl.DealMessage]: { duration: 420, cursor: { target: "suggestion-deal" } }, [nl.DealOpen]: { duration: 300, cursor: { target: "suggestion-deal" } }, [nl.DealReply]: { duration: 500, cursor: { target: "suggestion-deal" } }, [nl.DealSuggestions]: { duration: 570, cursor: { target: "suggestion-deal" }, waitsForContent: nl.DealReply }, [nl.MeetingClick]: { duration: 150, cursor: { target: "suggestion-meeting", action: "click" } }, [nl.MeetingMessage]: { duration: 600, cursor: { target: "suggestion-meeting" } }, [nl.MeetingReply]: { duration: 200, cursor: { target: "suggestion-meeting" } }, [nl.MeetingSuggestions]: { duration: 600, cursor: { target: "suggestion-meeting" }, waitsForContent: nl.MeetingReply }, [nl.DraftClick]: { duration: 0, cursor: { target: "composer-input", action: "click" } }, [nl.DraftFocus]: { duration: 400, cursor: { target: "composer-input" } }, [nl.DraftType]: { duration: 300, cursor: { target: "composer-input" }, waitsForContent: nl.DraftType, contentEstimate: nv(ni.coffee) }, [nl.PersonClick]: { duration: 150, cursor: { target: "panel-deal-person", action: "click" } }, [nl.PersonOpen]: { duration: 1e3, cursor: { target: "panel-deal-person" } }, [nl.PersonMorph]: { duration: 700, cursor: { target: "panel-deal-person" } }, [nl.TeaClick]: { duration: 0, cursor: { target: "composer-input", action: "click" } }, [nl.TeaFocus]: { duration: 300, cursor: { target: "composer-input" } }, [nl.TeaType]: { duration: 600, cursor: { target: "composer-input" }, waitsForContent: nl.TeaType, contentEstimate: nv(ni.message, ni.tea) }, [nl.SlackDraftClick]: { duration: 150, cursor: { target: "composer-submit", action: "click" } }, [nl.SlackDraftMessage]: { duration: 600, cursor: { target: "composer-submit" } }, [nl.SlackDraftReply]: { duration: 200, cursor: { target: "composer-submit" } }, [nl.SlackDraftSuggestions]: { duration: 300, cursor: { target: "composer-submit" }, waitsForContent: nl.SlackDraftReply }, [nl.SlackDraftOpen]: { duration: 1600, cursor: { target: "composer-submit" } }, [nl.NextStepClick]: { duration: 150, cursor: { target: "slack-draft-send", action: "click" } }, [nl.NextStepSent]: { duration: 900 }, [nl.NextStepReply]: { duration: 500 }, [nl.NextStepSuggestions]: { duration: 400, waitsForContent: nl.NextStepReply }, [nl.NextStepPlan]: { duration: 3e3 } }, n3 = () => {
    let e10 = z().step;
    return (0, i.jsxs)(i.Fragment, { children: [(0, i.jsxs)("div", { className: (0, a.cx)("grid", "h-full grid-cols-[1fr_372px]", "lg:grid-cols-[1fr_304px]", "xl:grid-cols-[246px_1fr_302px]"), children: [(0, i.jsx)(tG, { className: "hidden xl:block" }), (0, i.jsx)(tH, { className: "h-full min-h-0 min-w-0", children: (0, i.jsx)(n5, {}) }), (0, i.jsx)("div", {})] }), (0, i.jsx)(ef, { activePanel: e10 >= nl.NextStepSent ? "deal" : e10 >= nl.PersonOpen ? "person" : e10 >= nl.DealOpen ? "deal" : "quota", delay: 0.3, deal: { hasSuggestedTodo: e10 >= nl.NextStepPlan } }), (0, i.jsx)(ej, {}), (0, i.jsx)(t$, { className: "absolute top-[calc(100%+1px)] left-1/2 mt-[46px] -translate-x-1/2 xl:mt-4", timeline: n6, chapters: n4 })] });
  }, n7 = ({ isActive: e10 }) => (0, i.jsx)(H, { timeline: n6, isActive: e10, children: (0, i.jsx)(n3, {}) });
  var n8 = ((s = {})[s.Quota = 0] = "Quota", s[s.DealClick = 1] = "DealClick", s[s.DealOpen = 2] = "DealOpen", s[s.DealReply = 3] = "DealReply", s[s.DealSuggestions = 4] = "DealSuggestions", s[s.MeetingClick = 5] = "MeetingClick", s[s.MeetingReply = 6] = "MeetingReply", s[s.MeetingSuggestions = 7] = "MeetingSuggestions", s[s.DraftClick = 8] = "DraftClick", s[s.DraftFocus = 9] = "DraftFocus", s[s.DraftType = 10] = "DraftType", s[s.PersonClick = 11] = "PersonClick", s[s.PersonOpen = 12] = "PersonOpen", s[s.PersonMorph = 13] = "PersonMorph", s[s.TeaClick = 14] = "TeaClick", s[s.TeaFocus = 15] = "TeaFocus", s[s.TeaType = 16] = "TeaType", s[s.SlackDraftClick = 17] = "SlackDraftClick", s[s.SlackDraftOpen = 18] = "SlackDraftOpen", s[s.NextStepClick = 19] = "NextStepClick", s[s.NextStepSent = 20] = "NextStepSent", s[s.NextStepReply = 21] = "NextStepReply", s[s.NextStepSuggestions = 22] = "NextStepSuggestions", s[s.NextStepPlan = 23] = "NextStepPlan", s);
  let n9 = (0, a.cx)("rounded-full", "bg-linear-180 from-[#269600] to-[#008125]", "shadow-[0_1px_2px_0_rgba(255,255,255,0.12)_inset,0_-1px_1px_0_rgba(0,0,0,0.08)_inset,0_0_0_0.5px_rgba(0,0,0,0.16)_inset,0_2px_2px_-1px_rgba(0,0,0,0.06),0_1px_1px_-0.5px_rgba(0,0,0,0.06),0_4px_8px_-4px_rgba(0,129,37,0.32)]", "transition-[scale] duration-120"), se = () => {
    let { ref: e10, isPressed: t10 } = V("composer-submit");
    return (0, i.jsx)("div", { ref: e10, "data-pressed": t10 || void 0, className: (0, a.cx)("p-1.5", n9, "data-pressed:scale-[0.92]"), children: (0, i.jsx)(nx, {}) });
  }, st = () => {
    let { ref: e10, isPressed: t10 } = V("slack-draft-send");
    return (0, i.jsxs)("div", { className: "flex items-center gap-x-1", children: [(0, i.jsx)("div", { className: "px-2.5 py-1.25 text-[12px]/[17px] font-book text-gray-700", children: "Discard" }), (0, i.jsx)("div", { ref: e10, "data-pressed": t10 || void 0, className: (0, a.cx)("px-2.5 py-1.25", n9, "text-[12px]/[17px] font-book text-gray-200", "data-pressed:scale-[0.94]"), children: "Send" })] });
  }, sr = () => {
    let e10, { isFocused: t10, draft: r10, isSlackDraftOpen: n10 } = { isFocused: (e10 = z().step) >= n8.DraftFocus && e10 < n8.PersonOpen || e10 >= n8.TeaFocus && e10 < n8.SlackDraftOpen, draft: ((e11) => {
      if (!(e11 >= n8.SlackDraftOpen)) {
        if (e11 >= n8.TeaType) return { type: "typing", step: n8.TeaType, text: ni.message, from: ni.tea };
        if (e11 >= n8.PersonClick) return { type: "morphing", before: ni.before, word: e11 >= n8.PersonMorph ? "tea" : "coffee", after: ni.after };
        if (e11 >= n8.DraftType) return { type: "typing", step: n8.DraftType, text: ni.coffee };
      }
    })(e10), isSlackDraftOpen: e10 >= n8.SlackDraftOpen && e10 < n8.NextStepSent }, s2 = V("composer-input"), o2 = (0, l.useRef)(null), c2 = r10 && ("typing" === r10.type ? `typing-${r10.step}` : r10.type);
    (0, l.useLayoutEffect)(() => {
      let e11 = o2.current, t11 = s2.ref.current;
      if (!e11 || !t11 || (delete e11.dataset.wrapped, !c2)) return;
      let r11 = new ResizeObserver(() => {
        let n11 = parseFloat(getComputedStyle(t11).lineHeight);
        t11.offsetHeight > 1.5 * n11 && (e11.dataset.wrapped = "", r11.disconnect());
      });
      return r11.observe(t11), () => r11.disconnect();
    }, [s2.ref, c2]);
    let d2 = void 0 !== r10;
    return (0, i.jsxs)("div", { ref: o2, className: (0, a.cx)("group", "pt-1 pr-2.25 pb-1.75 pl-1.75", "grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-x-1.5"), children: [(0, i.jsx)("div", { className: "col-start-1 row-start-1 p-2 group-data-wrapped:row-start-2", children: (0, i.jsx)(np, {}) }), (0, i.jsx)("div", { ref: s2.ref, className: (0, a.cx)("col-start-2 row-start-1", "text-[12px]/[17px]", d2 ? "text-gray-900" : "truncate text-gray-500", "group-data-wrapped:col-span-3 group-data-wrapped:col-start-1", "group-data-wrapped:px-2 group-data-wrapped:pt-1"), children: r10 ? (0, i.jsx)(nk, { draft: r10, isFocused: t10 }) : (0, i.jsxs)(i.Fragment, { children: [t10 && (0, i.jsx)(nu, {}), "Ask about Quota..."] }) }), (0, i.jsx)("div", { className: "col-start-3 row-start-1 group-data-wrapped:row-start-2", children: n10 ? (0, i.jsx)(st, {}) : (0, i.jsx)(se, {}) })] });
  }, sn = ({ step: e10, paragraphs: t10, className: r10 }) => {
    let { onStart: n10, onComplete: s2, isSettled: l2 } = nb(e10);
    return (0, i.jsx)(nQ, { className: (0, a.cx)("flex flex-col gap-y-2", "text-[12px]/[19px] text-pretty text-gray-800", r10), paragraphs: t10, reservesSpace: true, isComplete: l2, onStart: n10, onComplete: s2 });
  }, ss = [[{ id: "deal", node: (0, i.jsx)(nz, {}) }, " is clear to start, just waiting on the signature. ", { id: "kierra-avatar", node: (0, i.jsx)(nP, { className: "size-3.5 translate-y-[2.5px]", src: Y, alt: "Kierra" }) }, " ", { id: "kierra", node: (0, i.jsx)(nB, { children: "Kierra" }) }, " is your champion. Meeting in person could move it."]], si = [["Coffee or lunch could work. Tell me what you have in mind and I\u2019ll draft the invite."]], sa = [[na]], sl = [["Sent. Back on ", { id: "deal", node: (0, i.jsx)(nz, {}) }, ". After tea, confirm kickoff with Kierra and nudge Cooper to sign. It\u2019s in the deal plan as a suggestion."]], so = ({ exchange: e10 }) => {
    let t10 = z().step;
    switch (e10) {
      case "quota":
        return (0, i.jsxs)("div", { className: "pt-0.5", children: [(0, i.jsx)("div", { className: "text-[13px]/[21px] font-medium text-gray-800", children: "Final stretch" }), (0, i.jsx)("div", { className: "mt-1 text-[12px]/[19px] text-pretty text-gray-800", children: "You\u2019ve booked $56K toward your $90K September quota. Holloway is close, and Tideline and Fielded are coming up next." })] });
      case "deal":
        return t10 >= n8.DealReply && (0, i.jsx)(sn, { step: n8.DealReply, paragraphs: ss });
      case "meeting":
        return (0, i.jsx)(sn, { step: n8.MeetingReply, paragraphs: si });
      case "slackDraft":
        return (0, i.jsxs)("div", { className: "pt-2.5", children: [(0, i.jsxs)("div", { className: "flex items-center gap-x-1.5", children: [(0, i.jsx)(nA, {}), (0, i.jsx)("div", { className: "text-[12px]/[17px] font-book text-gray-800", children: "Direct message to Kierra" }), (0, i.jsx)("div", { className: "font-mono text-[12px]/[17px] tracking-[-0.24px] text-gray-500", children: "draft" })] }), (0, i.jsx)(sn, { className: "mt-2", step: n8.SlackDraftOpen, paragraphs: sa })] });
      case "nextStep":
        return t10 >= n8.NextStepReply && (0, i.jsx)(sn, { step: n8.NextStepReply, paragraphs: sl });
    }
  }, sc = { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, transition: { duration: 0.3, ease: k } }, sd = () => {
    let e10 = z().step, t10 = ((e11) => {
      if (e11 >= n8.NextStepSent) return "Holloway";
      if (!(e11 >= n8.SlackDraftOpen)) {
        if (e11 >= n8.PersonOpen) return "Kierra Torres";
        if (e11 >= n8.DealOpen) return "Holloway";
      }
    })(e10), r10 = e10 >= n8.NextStepSent ? "nextStep" : e10 >= n8.SlackDraftOpen ? "slackDraft" : e10 >= n8.MeetingReply ? "meeting" : e10 >= n8.DealOpen ? "deal" : "quota", n10 = e10 >= n8.NextStepSuggestions ? nt : e10 >= n8.SlackDraftOpen ? [] : e10 >= n8.TeaType ? r9 : e10 >= n8.PersonMorph ? r8 : e10 >= n8.MeetingSuggestions ? r7 : e10 >= n8.DealSuggestions ? r3 : r6;
    return (0, i.jsxs)("div", { className: "flex min-h-0 flex-1 flex-col", children: [(0, i.jsx)("div", { className: (0, a.cx)("relative isolate", "min-h-0 flex-1", "px-3.75", "flex flex-col justify-end", "overflow-hidden"), children: (0, i.jsxs)("div", { className: "flex shrink-0 grow flex-col", children: [(0, i.jsx)("div", { className: "sticky top-0 z-1", children: (0, i.jsx)(y.AnimatePresence, { initial: false, mode: "popLayout", children: t10 && (0, i.jsx)(j.motion.div, { className: "bg-[#F7F7F7] pt-1.5 pb-2", ...sc, children: (0, i.jsxs)(nV, { children: ["Navigated to", " ", (0, i.jsx)("span", { className: "text-gray-600", children: t10 })] }) }, t10) }) }), (0, i.jsx)(y.AnimatePresence, { initial: false, mode: "popLayout", children: (0, i.jsx)(j.motion.div, { ...sc, children: (0, i.jsx)(so, { exchange: r10 }) }, r10) }), (0, i.jsx)(r4, { items: n10, className: (0, a.cx)("mt-auto", n10.length > 0 && "pt-2") })] }) }), (0, i.jsx)(sr, {})] });
  }, su = { [n8.Quota]: { duration: 1200 }, [n8.DealClick]: { duration: 150, cursor: { target: "suggestion-deal", action: "click" } }, [n8.DealOpen]: { duration: 300, cursor: { target: "suggestion-deal" } }, [n8.DealReply]: { duration: 500, cursor: { target: "suggestion-deal" } }, [n8.DealSuggestions]: { duration: 570, cursor: { target: "suggestion-deal" }, waitsForContent: n8.DealReply }, [n8.MeetingClick]: { duration: 150, cursor: { target: "suggestion-meeting", action: "click" } }, [n8.MeetingReply]: { duration: 200, cursor: { target: "suggestion-meeting" } }, [n8.MeetingSuggestions]: { duration: 600, cursor: { target: "suggestion-meeting" }, waitsForContent: n8.MeetingReply }, [n8.DraftClick]: { duration: 0, cursor: { target: "composer-input", action: "click" } }, [n8.DraftFocus]: { duration: 400, cursor: { target: "composer-input" } }, [n8.DraftType]: { duration: 300, cursor: { target: "composer-input" }, waitsForContent: n8.DraftType, contentEstimate: nv(ni.coffee) }, [n8.PersonClick]: { duration: 150, cursor: { target: "panel-deal-person", action: "click" } }, [n8.PersonOpen]: { duration: 1e3, cursor: { target: "panel-deal-person" } }, [n8.PersonMorph]: { duration: 700, cursor: { target: "panel-deal-person" } }, [n8.TeaClick]: { duration: 0, cursor: { target: "composer-input", action: "click" } }, [n8.TeaFocus]: { duration: 300, cursor: { target: "composer-input" } }, [n8.TeaType]: { duration: 600, cursor: { target: "composer-input" }, waitsForContent: n8.TeaType, contentEstimate: nv(ni.message, ni.tea) }, [n8.SlackDraftClick]: { duration: 150, cursor: { target: "composer-submit", action: "click" } }, [n8.SlackDraftOpen]: { duration: 1e3, cursor: { target: "composer-submit" }, waitsForContent: n8.SlackDraftOpen }, [n8.NextStepClick]: { duration: 150, cursor: { target: "slack-draft-send", action: "click" } }, [n8.NextStepSent]: { duration: 300 }, [n8.NextStepReply]: { duration: 500 }, [n8.NextStepSuggestions]: { duration: 400, waitsForContent: n8.NextStepReply }, [n8.NextStepPlan]: { duration: 3e3 } }, sp = [{ label: "Quota", step: n8.Quota }, { label: "Meeting", step: n8.MeetingClick }, { label: "Draft", step: n8.PersonClick }, { label: "Slack", step: n8.SlackDraftClick }, { label: "Next step", step: n8.NextStepClick }], sx = () => {
    let e10 = z().step;
    return (0, i.jsxs)(i.Fragment, { children: [(0, i.jsx)(ef, { activePanel: e10 >= n8.NextStepSent ? "deal" : e10 >= n8.PersonOpen ? "person" : e10 >= n8.DealOpen ? "deal" : "quota", deal: { hasSuggestedTodo: e10 >= n8.NextStepPlan }, peek: "bottom" }), (0, i.jsx)(tH, { className: "flex min-h-0 flex-1 flex-col", children: (0, i.jsx)(sd, {}) }), (0, i.jsx)(ej, { variant: "touch" }), (0, i.jsx)(t$, { className: "absolute top-[calc(100%+1px)] left-1/2 mt-4 -translate-x-1/2", timeline: su, chapters: sp })] });
  }, sh = ({ isActive: e10 }) => (0, i.jsx)(H, { timeline: su, isActive: e10, children: (0, i.jsx)(sx, {}) }), sg = ({ isActive: e10 }) => (0, x.useMediaQuery)("(width >= 48rem)") ? (0, i.jsx)(n7, { isActive: e10 }) : (0, i.jsx)(sh, { isActive: e10 });
  e.s(["HomeUi", 0, ({ className: e10 }) => {
    let t10 = (0, l.useRef)(null), r10 = (0, p.useInView)(t10, { once: true, margin: "-30% 0px -48px 0px" });
    return (0, i.jsxs)("section", { className: (0, a.cx)(e10, "relative", "font-muoto", "max-lg:pb-7", "lg:home-rule-l", "lg:pr-11.5 lg:pl-8.5"), children: [(0, i.jsx)(g.HomeRuleCap, { className: "top-0 left-0 hidden lg:block" }), (0, i.jsx)(g.HomeRuleCap, { className: "top-0 right-0 hidden lg:block" }), (0, i.jsx)(u, { reducedMotion: "user", children: (0, i.jsxs)(v, { className: "relative", children: [(0, i.jsx)("div", { ref: t10, "aria-hidden": "true", className: "pointer-events-none absolute inset-x-0 top-1/2 h-px md:top-auto md:bottom-0" }), (0, i.jsx)(h.ClientOnly, { children: (0, i.jsx)(sg, { isActive: r10 }) })] }) })] });
  }], 524436);
}, 709004, 81324, (e) => {
  "use strict";
  let t = null, r = null;
  function n() {
    return t ? Promise.resolve(t) : (r ?? (r = e.A(570217).then((e2) => (t = e2, e2), (e2) => {
      throw r = null, e2;
    })), r);
  }
  e.s(["getMorphRuntimeSync", 0, function() {
    return t;
  }, "loadMorphRuntime", 0, n, "prefetchMorphRuntime", 0, function() {
    n().catch(() => {
    });
  }], 709004);
  let s = null, i = null;
  e.s(["prefetchZoomRuntime", 0, function() {
    (s ? Promise.resolve(s) : (i ?? (i = e.A(151257).then((e2) => s = { ZoomEngine: e2.ZoomEngine }, (e2) => {
      throw i = null, e2;
    })), i)).catch(() => {
    });
  }], 81324);
}, 824299, (e, t, r) => {
  "use strict";
  Object.defineProperty(r, "__esModule", { value: true }), Object.defineProperty(r, "BailoutToCSR", { enumerable: true, get: function() {
    return s;
  } });
  let n = e.r(661812);
  function s({ reason: e2, children: t2 }) {
    if ("u" < typeof window) throw Object.defineProperty(new n.BailoutToCSRError(e2), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
    return t2;
  }
}, 314642, (e, t, r) => {
  "use strict";
  Object.defineProperty(r, "__esModule", { value: true });
  var n = { bindSnapshot: function() {
    return c;
  }, createAsyncLocalStorage: function() {
    return o;
  }, createSnapshot: function() {
    return d;
  } };
  for (var s in n) Object.defineProperty(r, s, { enumerable: true, get: n[s] });
  let i = Object.defineProperty(Error("Invariant: AsyncLocalStorage accessed in runtime where it is not available"), "__NEXT_ERROR_CODE", { value: "E504", enumerable: false, configurable: true });
  class a {
    disable() {
      throw i;
    }
    getStore() {
    }
    run() {
      throw i;
    }
    exit() {
      throw i;
    }
    enterWith() {
      throw i;
    }
    static bind(e2) {
      return e2;
    }
  }
  let l = "u" > typeof globalThis && globalThis.AsyncLocalStorage;
  function o() {
    return l ? new l() : new a();
  }
  function c(e2) {
    return l ? l.bind(e2) : a.bind(e2);
  }
  function d() {
    return l ? l.snapshot() : function(e2, ...t2) {
      return e2(...t2);
    };
  }
}, 753624, (e, t, r) => {
  "use strict";
  Object.defineProperty(r, "__esModule", { value: true }), Object.defineProperty(r, "workAsyncStorageInstance", { enumerable: true, get: function() {
    return n;
  } });
  let n = (0, e.r(314642).createAsyncLocalStorage)();
}, 331405, (e, t, r) => {
  "use strict";
  Object.defineProperty(r, "__esModule", { value: true }), Object.defineProperty(r, "workAsyncStorage", { enumerable: true, get: function() {
    return n.workAsyncStorageInstance;
  } });
  let n = e.r(753624);
}, 26500, (e, t, r) => {
  "use strict";
  function n(e2) {
    return e2.split("/").map((e3) => encodeURIComponent(e3)).join("/");
  }
  Object.defineProperty(r, "__esModule", { value: true }), Object.defineProperty(r, "encodeURIPath", { enumerable: true, get: function() {
    return n;
  } });
}, 744986, (e, t, r) => {
  "use strict";
  Object.defineProperty(r, "__esModule", { value: true }), Object.defineProperty(r, "PreloadChunks", { enumerable: true, get: function() {
    return o;
  } });
  let n = e.r(619882), s = e.r(497286), i = e.r(331405), a = e.r(26500), l = e.r(860135);
  function o({ moduleIds: e2 }) {
    if ("u" > typeof window) return null;
    let t2 = i.workAsyncStorage.getStore();
    if (void 0 === t2) return null;
    let r2 = [];
    if (t2.reactLoadableManifest && e2) {
      let n2 = t2.reactLoadableManifest;
      for (let t3 of e2) {
        if (!n2[t3]) continue;
        let e3 = n2[t3].files;
        r2.push(...e3);
      }
    }
    if (0 === r2.length) return null;
    let c = (0, l.getAssetTokenQuery)();
    return (0, n.jsx)(n.Fragment, { children: r2.map((e3) => {
      let r3 = `${t2.assetPrefix}/_next/${(0, a.encodeURIPath)(e3)}${c}`;
      return e3.endsWith(".css") ? (0, n.jsx)("link", { precedence: "dynamic", href: r3, rel: "stylesheet", as: "style", nonce: t2.nonce }, e3) : ((0, s.preload)(r3, { as: "script", fetchPriority: "low", nonce: t2.nonce }), null);
    }) });
  }
}, 241268, (e, t, r) => {
  "use strict";
  Object.defineProperty(r, "__esModule", { value: true }), Object.defineProperty(r, "default", { enumerable: true, get: function() {
    return c;
  } });
  let n = e.r(619882), s = e.r(155172), i = e.r(824299), a = e.r(744986);
  function l(e2) {
    return { default: e2 && "default" in e2 ? e2.default : e2 };
  }
  let o = { loader: () => Promise.resolve(l(() => null)), loading: null, ssr: true }, c = function(e2) {
    let t2 = { ...o, ...e2 }, r2 = (0, s.lazy)(() => t2.loader().then(l)), c2 = t2.loading;
    function d(e3) {
      let l2 = c2 ? (0, n.jsx)(c2, { isLoading: true, pastDelay: true, error: null }) : null, o2 = !t2.ssr || !!t2.loading, d2 = o2 ? s.Suspense : s.Fragment, u = t2.ssr ? (0, n.jsxs)(n.Fragment, { children: ["u" < typeof window ? (0, n.jsx)(a.PreloadChunks, { moduleIds: t2.modules }) : null, (0, n.jsx)(r2, { ...e3 })] }) : (0, n.jsx)(i.BailoutToCSR, { reason: "next/dynamic", children: (0, n.jsx)(r2, { ...e3 }) });
      return (0, n.jsx)(d2, { ...o2 ? { fallback: l2 } : {}, children: u });
    }
    return d.displayName = "LoadableComponent", d;
  };
}, 215504, (e, t, r) => {
  "use strict";
  Object.defineProperty(r, "__esModule", { value: true }), Object.defineProperty(r, "default", { enumerable: true, get: function() {
    return s;
  } });
  let n = e.r(836437)._(e.r(241268));
  function s(e2, t2) {
    let r2 = {};
    "function" == typeof e2 && (r2.loader = e2);
    let s2 = { ...r2, ...t2 };
    return (0, n.default)({ ...s2, modules: s2.loadableGenerated?.modules });
  }
  ("function" == typeof r.default || "object" == typeof r.default && null !== r.default) && void 0 === r.default.__esModule && (Object.defineProperty(r.default, "__esModule", { value: true }), Object.assign(r.default, r), t.exports = r.default);
}]);

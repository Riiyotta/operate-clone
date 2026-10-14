(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["object" == typeof document ? document.currentScript : void 0, 570222, (e) => {
  e.q("/_next/static/immutable/media/home-background-texture.1xaxybze7_k5w.png");
}, 937912, (e) => {
  "use strict";
  var t, r = e.i(619882), n = e.i(927612), i = e.i(193347), a = e.i(155172), o = e.i(267579), l = e.i(207789), s = e.i(505474);
  function u(e2, t2, r2) {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="${e2 + t2}" height="${e2 + r2}"><rect width="${e2}" height="${e2}" fill="rgb(133, 192, 147)"/></svg>`;
  }
  function c({ children: e2 }) {
    return (0, r.jsx)("div", { className: (0, n.cx)("relative", "[--size:var(--mobileSize)] md:[--size:var(--desktopSize)]", "[--gap:var(--mobileGap)] md:[--gap:var(--desktopGap)]", "[--patternSize:calc(var(--size)+var(--gap))]", "mx-auto h-full", "w-[calc(round(down,calc(100%-var(--size)),var(--patternSize))+var(--size))]", "[background:var(--mobilePattern)] md:[background:var(--desktopPattern)]"), style: { "--mobileSize": "0.8px", "--mobileGap": "19.2px", "--desktopSize": "1.5px", "--desktopGap": "22px", "--mobilePattern": `url('data:image/svg+xml;utf8,${u(0.8, 19.2, 2)}')`, "--desktopPattern": `url('data:image/svg+xml;utf8,${u(1.5, 22, 3)}')` }, children: e2 });
  }
  var d = e.i(145061), f = ((t = {}).Circle = "circle", t.Star = "star", t.StarCircle = "star-circle", t.Dot = "dot", t.Subcircle = "subcircle", t);
  let h = Object.values(f), m = Object.fromEntries(h.map((e2, t2) => [e2, t2])), p = (e2, t2) => 2 * e2 + +!t2, g = [[0, 0], [0.1185, 0.028], [0.225, 0.104], [0.322, 0.216], [0.4125, 0.352], [0.5, 0.5], [0.5875, 0.648], [0.678, 0.784], [0.775, 0.896], [0.8815, 0.972], [1, 1]];
  function b(e2, t2, r2) {
    let n2 = Math.min(Math.max((r2 - e2) / (t2 - e2), 0), 1);
    return n2 * n2 * (3 - 2 * n2);
  }
  function v(e2) {
    return { topStrength: 1 - b(0, 0.35, e2), bottomStrength: b(0.65, 1, e2) };
  }
  function y(e2, t2) {
    return 1 - (1 - b(0.2, 0.5, e2)) * t2;
  }
  function x(e2) {
    let { topStrength: t2, bottomStrength: r2 } = v(e2);
    return t2 > 0 ? "top" : r2 > 0 ? "bottom" : null;
  }
  let w = (e2) => Math.ceil(0.5 * e2);
  function S({ width: e2, height: t2, viewHeight: r2, children: n2 }) {
    let o2 = (0, i.useMediaQuery)("(width < 768px)");
    return n2((0, a.useMemo)(() => {
      let n3 = o2 ? 0.8 : 1.5, i2 = o2 ? 19.2 : 22, a2 = Math.floor(e2 / (n3 + i2)), l2 = (0, d.createSeededRandom)(`${e2}:${t2}:${o2}`), s2 = Math.floor(r2 / 40), u2 = t2 / r2 * 2, c2 = Array.from({ length: a2 }).map(() => {
        let e3, t3;
        return Math.round((e3 = Math.min(5, s2), t3 = Math.min(8, s2), (Math.floor((l2() + l2()) * (t3 - e3) / 2) + e3) * u2));
      }), f2 = n3 + i2, h2 = Math.floor(a2 / 2), m2 = o2 ? 110 : 150, p2 = () => (2 * l2() - 1) * 0.08 * m2, g2 = w(r2), b2 = [];
      for (let e3 of [0, t2 - g2]) for (let t3 = 0; t3 < h2; t3++) {
        let r3 = e3 - m2 + t3 % 2 * (m2 / 2);
        for (; r3 < e3 + g2; ) 0.7 > l2() && b2.push({ x: 2 * t3 * f2 + n3 + 3, y: r3 + p2(), width: 2 * f2 - n3, height: m2 + p2(), opacity: 0.08 + 0.12000000000000001 * l2(), fadesUp: 0.5 > l2(), isFirm: b2.length % 12 == 0 }), r3 += m2;
      }
      return { width: e2, height: t2, viewHeight: r2, lineSize: n3, lineGap: i2, columnsNumber: a2, columnsItems: c2, radius: 6, radiusLarge: o2 ? 7 : 8, minSpeed: 0.2, maxSpeed: 1, rectangles: b2 };
    }, [o2, e2, t2, r2]));
  }
  var k = e.i(548544);
  let E = { src: e.i(570222).default, width: 2940, height: 200, blurWidth: 8, blurHeight: 1, blurDataURL: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAABCAYAAADjAO9DAAAAJUlEQVR42mPYu3fv/23btv3funUrGG/evBnMX7du3f85c+b8BwCZvBip+46kwwAAAABJRU5ErkJggg==" };
  function C({ className: e2 }) {
    let { props: { srcSet: t2 } } = (0, k.getImageProps)({ alt: "", width: 1470, height: 100, src: E });
    return (0, r.jsx)("div", { className: (0, n.cx)("isolate bg-[#005C00]", e2), children: (0, r.jsx)("div", { className: (0, n.cx)("size-full", "bg-repeat opacity-20 mix-blend-overlay"), style: { backgroundImage: function(e3 = "") {
      let t3 = e3.split(", ").map((e4) => {
        let [t4, r2] = e4.split(" ");
        return `url("${t4}") ${r2}`;
      }).join(", ");
      return `image-set(${t3})`;
    }(t2), backgroundSize: "1470px 100px" } }) });
  }
  var A = e.i(288799), M = e.i(154989), L = e.i(819622);
  let T = new Float64Array(16), P = new Uint8Array(16), R = [...Array.from({ length: 15 }).map(() => f.Circle), f.Dot, f.Star, f.StarCircle, f.Subcircle], I = () => Math.min(window.devicePixelRatio || 1, 2);
  function z({ width: e2, height: t2, canvasRef: r2 }) {
    (0, a.useLayoutEffect)(() => {
      let n2 = r2.current;
      if (!n2) return;
      let i2 = I();
      n2.width = e2 * i2, n2.height = t2 * i2, n2.style.width = `${e2}px`, n2.style.height = `${t2}px`;
    }, [e2, t2, r2]);
  }
  let O = [0.455, 0.03, 0.515, 0.955];
  function N({ className: e2, configuration: t2, isPlaying: n2, speedMultiplier: i2 }) {
    let { width: o2, viewHeight: l2, columnsItems: s2 } = t2, u2 = (0, a.useRef)(null), c2 = (0, a.useRef)(null), d2 = (0, M.useMotionValue)(i2), b2 = (0, L.useReducedMotion)();
    (0, a.useEffect)(() => {
      let e3 = d2.get();
      if (e3 === i2) return;
      if (b2) return void d2.set(i2);
      let t3 = (0, A.animate)(d2, i2, { duration: i2 < e3 ? 2.5 : 2, ease: O });
      return () => t3.stop();
    }, [d2, b2, i2]), z({ width: o2, height: w(l2), canvasRef: u2 }), z({ width: o2, height: w(l2), canvasRef: c2 });
    let S2 = (0, a.useRef)([]), k2 = (0, a.useRef)(0);
    return (0, a.useEffect)(() => {
      let e3 = 0, t3 = () => {
        document.querySelector("[data-sign-up-pinned]") || (k2.current = e3 > 0 ? Math.min(Math.max(window.scrollY / e3, 0), 1) : 0);
      }, r2 = () => {
        e3 = document.documentElement.scrollHeight - window.innerHeight, t3();
      };
      r2();
      let n3 = new ResizeObserver(r2);
      return n3.observe(document.body), window.addEventListener("resize", r2), window.addEventListener("scroll", t3, { passive: true }), () => {
        n3.disconnect(), window.removeEventListener("resize", r2), window.removeEventListener("scroll", t3);
      };
    }, []), (0, a.useEffect)(() => {
      S2.current = s2.map((e3, r2) => function({ configuration: e4, index: t3, items: r3 }) {
        let { height: n3, lineSize: i3, lineGap: a2, radiusLarge: o3, minSpeed: l3, maxSpeed: s3 } = e4, u3 = l3 + (s3 - l3) * Math.random(), c3 = -(0.5 * n3), d3 = 1.5 * n3, f2 = [];
        for (let e5 = 0; e5 < r3; e5++) f2.push(function({ minY: e6, maxY: t4, safeRadius: r4, circles: n4, speed: i4 }) {
          var a3;
          let o4 = 0.5 > Math.random() ? 1 : -1, l4 = r4 + 1;
          function s4() {
            return Math.random() * (t4 - e6 - 2 * l4) + e6 + l4;
          }
          let u4 = s4();
          for (; a3 = u4, n4.some((e7) => Math.abs(e7.y - a3) < 2 * l4); ) u4 = s4();
          return { y: u4, speed: i4, initialSpeed: i4, direction: o4, type: R[Math.floor(Math.random() * R.length)] };
        }({ circles: f2, speed: u3, minY: c3, maxY: d3, safeRadius: o3 }));
        return { items: r3, speed: u3, columnX: (t3 + 1) * i3 + (t3 + 0.5) * a2, minY: c3, maxY: d3, circles: f2 };
      }({ configuration: t2, index: r2, items: e3 }));
    }, [s2, t2]), (0, a.useEffect)(() => {
      let e3 = u2.current, r2 = c2.current;
      if (!e3 || !r2) return;
      let i3 = function({ configuration: e4, circlesCanvas: t3, rectanglesCanvas: r3, dpr: n3, hasEdgeFade: i4 }) {
        let a3, o4, l4, s4, u3, c3, d3, { width: b3, height: S3, viewHeight: k3, radiusLarge: E3 } = e4, C3 = t3.getContext("2d"), A3 = r3.getContext("2d"), M3 = (u3 = (s4 = Math.ceil(2 * (e4.radius + 3) * n3)) / n3, (c3 = document.createElement("canvas")).width = s4 * h.length * 2, c3.height = s4, (d3 = c3.getContext("2d")) && h.forEach((t4, r4) => {
          [true, false].forEach((i5) => {
            let a4 = p(r4, i5);
            d3.setTransform(n3, 0, 0, n3, a4 * s4, 0), function({ configuration: e5, context: t5, x: r5, y: n4, type: i6, isBorder: a5 }) {
              let o5 = { configuration: e5, context: t5, x: r5, y: n4, isBorder: a5 };
              switch (i6) {
                case f.Star:
                  return function({ configuration: e6, context: t6, x: r6, y: n5, isBorder: i7 }) {
                    let { radius: a6 } = e6, o6 = a6 + 1, l5 = (a6 + 1) * Math.sin(Math.PI / 4);
                    i7 && (t6.strokeStyle = "#85C093", t6.lineWidth = 1.25, t6.beginPath(), t6.moveTo(r6, n5 - o6), t6.lineTo(r6, n5 + o6), t6.stroke(), t6.beginPath(), t6.moveTo(r6 - o6, n5), t6.lineTo(r6 + o6, n5), t6.stroke(), t6.beginPath(), t6.moveTo(r6 - l5, n5 - l5), t6.lineTo(r6 + l5, n5 + l5), t6.stroke(), t6.beginPath(), t6.moveTo(r6 + l5, n5 - l5), t6.lineTo(r6 - l5, n5 + l5), t6.stroke()), t6.beginPath(), t6.arc(r6, n5, 1.25, 0, 2 * Math.PI), i7 ? (t6.strokeStyle = "#85C093", t6.lineWidth = 2, t6.stroke()) : (t6.fillStyle = "#117025", t6.fill());
                  }(o5);
                case f.StarCircle:
                  return function({ configuration: e6, context: t6, x: r6, y: n5, isBorder: i7 }) {
                    let { radius: a6 } = e6, o6 = a6 + 1, l5 = (a6 + 1) * Math.sin(Math.PI / 4);
                    i7 && (t6.strokeStyle = "#85C093", t6.lineWidth = 1.25, t6.beginPath(), t6.moveTo(r6, n5 - o6), t6.lineTo(r6, n5 + o6), t6.stroke(), t6.beginPath(), t6.moveTo(r6 - o6, n5), t6.lineTo(r6 + o6, n5), t6.stroke(), t6.beginPath(), t6.moveTo(r6 - l5, n5 - l5), t6.lineTo(r6 + l5, n5 + l5), t6.stroke(), t6.beginPath(), t6.moveTo(r6 + l5, n5 - l5), t6.lineTo(r6 - l5, n5 + l5), t6.stroke()), t6.beginPath(), t6.arc(r6, n5, 2.5, 0, 2 * Math.PI), i7 ? (t6.strokeStyle = "#85C093", t6.lineWidth = 2, t6.stroke()) : (t6.fillStyle = "#85C093", t6.fill());
                  }(o5);
                case f.Dot:
                  return function({ configuration: e6, context: t6, x: r6, y: n5, isBorder: i7 }) {
                    let { radius: a6 } = e6;
                    t6.beginPath(), t6.arc(r6, n5, a6, 0, 2 * Math.PI), i7 ? (t6.strokeStyle = "#85C093", t6.lineWidth = 3, t6.stroke()) : (t6.fillStyle = "#85C093", t6.fill()), i7 || (t6.beginPath(), t6.arc(r6, n5, 2, 0, 2 * Math.PI), t6.fillStyle = "#117025", t6.fill());
                  }(o5);
                case f.Subcircle:
                  return function({ configuration: e6, context: t6, x: r6, y: n5, isBorder: i7 }) {
                    let { radius: a6 } = e6;
                    t6.beginPath(), t6.arc(r6, n5, a6, 0, 2 * Math.PI), i7 ? (t6.strokeStyle = "#85C093", t6.lineWidth = 3, t6.stroke()) : (t6.fillStyle = "#85C093", t6.fill()), i7 || (t6.beginPath(), t6.arc(r6, n5, a6 - 1.25, 0, 2 * Math.PI), t6.fillStyle = "#117025", t6.fill());
                  }(o5);
                case f.Circle:
                default:
                  return function({ configuration: e6, context: t6, x: r6, y: n5, isBorder: i7 }) {
                    let { radius: a6 } = e6;
                    t6.beginPath(), t6.arc(r6, n5, a6, 0, 2 * Math.PI), i7 ? (t6.strokeStyle = "#85C093", t6.lineWidth = 2, t6.stroke()) : (t6.fillStyle = "#117025", t6.fill());
                  }(o5);
              }
            }({ configuration: e4, context: d3, x: u3 / 2, y: u3 / 2, type: t4, isBorder: i5 });
          });
        }), { image: c3, pixelSize: s4, size: u3 }), L3 = w(k3), T2 = E3 + 2, P2 = {};
        return (s5, u4) => {
          if (!C3 || !A3) return;
          let c4 = x(u4);
          if (C3.setTransform(1, 0, 0, 1, 0, 0), C3.clearRect(0, 0, t3.width, t3.height), c4 !== o4) {
            for (let e5 of [t3, r3]) e5.style.visibility = c4 ? "" : "hidden", e5.style.top = "bottom" === c4 ? "" : "0", e5.style.bottom = "bottom" === c4 ? "0" : "";
            o4 = c4;
          }
          if (!c4) return;
          let { topStrength: d4, bottomStrength: f2 } = v(u4), h2 = "top" === c4 ? d4 : f2, w2 = "top" === c4 ? 0 : S3 - L3, E4 = w2 + L3;
          (l4?.scrollProgress !== u4 || l4.band !== c4) && (A3.setTransform(1, 0, 0, 1, 0, 0), A3.clearRect(0, 0, r3.width, r3.height), A3.setTransform(n3, 0, 0, n3, 0, -w2 * n3), ((t4, r4, o5, l5, s6) => {
            a3?.band !== r4 && (a3 = { band: r4, layer: function({ width: e5, rectangles: t5 }, r5, { start: n4, height: i5 }) {
              let a4 = () => {
                let t6 = document.createElement("canvas");
                return t6.width = Math.ceil(e5 * r5), t6.height = Math.ceil((i5 + 18) * r5), t6;
              }, o6 = a4(), l6 = { canvas: o6, margin: 9 }, s7 = a4(), u6 = o6.getContext("2d"), c6 = s7.getContext("2d");
              if (!u6 || !c6) return l6;
              for (let { x: e6, y: i6, width: a5, height: o7, opacity: l7, fadesUp: s8, isFirm: u7 } of (c6.setTransform(r5, 0, 0, r5, 0, -(n4 - 9) * r5), t5)) {
                let t6 = s8 ? c6.createLinearGradient(0, i6 + o7, 0, i6) : c6.createLinearGradient(0, i6, 0, i6 + o7);
                t6.addColorStop(0, "rgba(133, 192, 147, 0)"), t6.addColorStop(u7 ? 0.04 : 0.25, "rgba(133, 192, 147, 1)"), t6.addColorStop(0.45, "rgba(133, 192, 147, 1)"), t6.addColorStop(1, "rgba(133, 192, 147, 0)"), c6.globalAlpha = l7, c6.fillStyle = t6, c6.fillRect(e6, i6, a5, o7);
              }
              return u6.setTransform(r5, 0, 0, r5, 0, 0), u6.filter = "blur(3px)", u6.drawImage(s7, 0, 0, s7.width / r5, s7.height / r5), l6;
            }(e4, n3, { start: l5, height: L3 }) });
            let { layer: u5 } = a3;
            t4.drawImage(u5.canvas, 0, u5.margin * n3, u5.canvas.width, L3 * n3, 0, l5, u5.canvas.width / n3, L3);
            let c5 = t4.createLinearGradient(0, l5, 0, s6);
            for (let e5 = 0; e5 <= 32; e5++) {
              let t5 = e5 / 32, n4 = y(("top" === r4 ? t5 : 1 - t5) * L3 / k3, o5);
              c5.addColorStop(t5, `rgba(0, 0, 0, ${n4})`);
            }
            if (t4.globalCompositeOperation = "destination-out", t4.fillStyle = c5, t4.fillRect(0, l5, b3, L3), i4) {
              let e5 = "top" === r4 ? l5 : s6, n4 = "top" === r4 ? e5 + 24 : e5 - 24, i5 = P2[r4];
              if (!i5) {
                for (let [r5, a4] of (i5 = t4.createLinearGradient(0, e5, 0, n4), g)) i5.addColorStop(r5, `rgba(0, 0, 0, ${1 - a4})`);
                P2[r4] = i5;
              }
              t4.fillStyle = i5, t4.fillRect(0, Math.min(e5, n4), b3, 24);
            }
            t4.globalCompositeOperation = "source-over";
          })(A3, c4, h2, w2, E4), l4 = { scrollProgress: u4, band: c4 }), C3.setTransform(n3, 0, 0, n3, 0, -w2 * n3);
          for (let e5 = 0; e5 < 2; e5++) {
            let t4 = 0 === e5;
            for (let e6 = 0; e6 < s5.length; e6++) {
              let { columnX: r4, circles: n4 } = s5[e6];
              for (let e7 = 0; e7 < n4.length; e7++) {
                let { y: a4, type: o5 } = n4[e7];
                if (a4 < w2 - T2 || a4 > E4 + T2) continue;
                let l5 = "top" === c4 ? a4 - w2 : E4 - a4, s6 = 1 - y(l5 / k3, h2);
                i4 && (s6 *= function(e8) {
                  let t5 = e8 / 24;
                  if (t5 <= 0) return 0;
                  if (t5 >= 1) return 1;
                  for (let e9 = 1; e9 < g.length; e9++) {
                    let [r5, n5] = g[e9];
                    if (t5 > r5) continue;
                    let [i5, a5] = g[e9 - 1];
                    return a5 + (n5 - a5) * (t5 - i5) / (r5 - i5);
                  }
                  return 1;
                }(l5)), s6 <= 0 || (C3.globalAlpha = s6, function({ context: e8, sprites: { image: t5, pixelSize: r5, size: n5 }, type: i5, isBorder: a5, x: o6, y: l6 }) {
                  let s7 = p(m[i5], a5);
                  e8.drawImage(t5, s7 * r5, 0, r5, r5, o6 - n5 / 2, l6 - n5 / 2, n5, n5);
                }({ context: C3, sprites: M3, type: o5, isBorder: t4, x: r4, y: a4 }));
              }
            }
          }
          C3.globalAlpha = 1;
        };
      }({ configuration: t2, circlesCanvas: e3, rectanglesCanvas: r2, dpr: I(), hasEdgeFade: CSS.supports("-webkit-touch-callout", "none") }), a2 = () => i3(S2.current, k2.current);
      if (b2) {
        let e4 = 0, t3 = () => {
          cancelAnimationFrame(e4), e4 = requestAnimationFrame(a2);
        };
        return a2(), window.addEventListener("scroll", t3, { passive: true }), () => {
          cancelAnimationFrame(e4), window.removeEventListener("scroll", t3);
        };
      }
      if (!n2) return;
      let o3 = () => null !== x(k2.current), l3 = 0, s3 = false, E2 = 0, C2 = 0, A2 = -1, M2 = (e4) => {
        if (!o3()) {
          s3 = false, a2();
          return;
        }
        let r3 = Math.min(e4 - E2, 66.66666666666667);
        E2 = e4, C2 += r3;
        let n3 = 0;
        for (; C2 >= 16.666666666666668; ) !function({ configuration: e5, columns: t3, speedMultiplier: r4 }) {
          let n4 = e5.radius - 3;
          for (let e6 = 0; e6 < t3.length; e6++) {
            let { circles: i5, minY: a3, maxY: o4 } = t3[e6], l4 = i5.length;
            T.length < l4 && (T = new Float64Array(l4), P = new Uint8Array(l4));
            for (let e7 = 0; e7 < l4; e7++) {
              let t4 = i5[e7];
              T[e7] = t4.y + t4.speed * t4.direction * r4;
            }
            !function({ circles: e7, nextY: t4, reverse: r5, collisionRadius: n5, collisionEdgeBuffer: i6, minY: a4, maxY: o5 }) {
              let l5 = e7.length;
              r5.fill(0, 0, l5);
              for (let e8 = 0; e8 < l5; e8++) (t4[e8] > o5 - n5 - i6 || t4[e8] < a4 + n5 + i6) && (r5[e8] = 1);
              for (let i7 = 0; i7 < l5; i7++) for (let a5 = i7 + 1; a5 < l5; a5++) {
                if (Math.abs(t4[i7] - t4[a5]) >= 2 * n5) continue;
                let o6 = e7[i7], l6 = e7[a5];
                o6.direction === l6.direction ? -1 === o6.direction ? r5[o6.y < l6.y ? a5 : i7] = 1 : 1 === o6.direction && (r5[o6.y > l6.y ? a5 : i7] = 1) : (r5[i7] = 1, r5[a5] = 1);
              }
            }({ circles: i5, nextY: T, reverse: P, collisionRadius: n4, collisionEdgeBuffer: 4, minY: a3, maxY: o4 });
            for (let e7 = 0; e7 < l4; e7++) {
              let t4 = i5[e7];
              P[e7] ? t4.direction = -t4.direction : t4.y = T[e7];
            }
          }
        }({ configuration: t2, columns: S2.current, speedMultiplier: d2.get() }), C2 -= 16.666666666666668, n3++;
        let i4 = k2.current;
        (n3 > 0 || i4 !== A2) && (a2(), A2 = i4), l3 = requestAnimationFrame(M2);
      }, L2 = () => {
        !s3 && o3() && (s3 = true, E2 = performance.now(), C2 = 0, l3 = requestAnimationFrame(M2));
      };
      return a2(), L2(), window.addEventListener("scroll", L2, { passive: true }), () => {
        cancelAnimationFrame(l3), window.removeEventListener("scroll", L2);
      };
    }, [d2, t2, n2, b2]), (0, r.jsxs)("div", { className: e2, children: [(0, r.jsx)("canvas", { ref: c2, className: "absolute left-0" }), (0, r.jsx)("canvas", { ref: u2, className: "absolute left-0" })] });
  }
  var j = e.i(490865);
  e.s(["HomeBackground", 0, function({ speedMultiplier: e2 = 1 }) {
    let [t2, u2] = (0, i.useMeasure)(), [d2, f2] = (0, a.useState)(u2), { width: h2, height: m2 } = d2.width ? d2 : u2;
    (0, a.useEffect)(() => {
      if (!u2.width || !u2.height) return;
      let e3 = setTimeout(() => f2(u2), 150);
      return () => clearTimeout(e3);
    }, [u2]);
    let [p2, g2] = (0, a.useState)(null);
    h2 && m2 && (!p2 || p2.width !== h2 || m2 > p2.height) && g2({ width: h2, height: m2 + 200, viewHeight: m2 });
    let b2 = (0, l.useIsPageInView)(), v2 = (0, a.useSyncExternalStore)(j.homeVideoLightboxOpen.subscribe, j.homeVideoLightboxOpen.get, () => false), y2 = "/sign-up" === (0, o.usePathname)();
    return (0, r.jsxs)(r.Fragment, { children: [(0, r.jsxs)("div", { "aria-hidden": "true", className: "pointer-events-none fixed inset-0 overflow-hidden", children: [(0, r.jsx)(C, { className: (0, n.cx)("absolute inset-0", "supports-[-webkit-touch-callout:none]:mask-edge-fade") }), (0, r.jsx)(c, { children: (0, r.jsx)(s.ClientOnly, { children: (0, r.jsx)("div", { ref: t2, className: "relative h-full w-full", children: p2 && (0, r.jsx)(S, { width: p2.width, height: p2.height, viewHeight: p2.viewHeight, children: (t3) => (0, r.jsx)(N, { className: "absolute top-0 left-0 size-full", configuration: t3, isPlaying: b2 && !v2, speedMultiplier: y2 ? 0.15 : e2 }) }) }) }) })] }), (0, r.jsx)("div", { "aria-hidden": "true", className: "pointer-events-none fixed inset-0 [body:has(&)]:bg-waitlist-deep-green [html:has(&)]:bg-waitlist-deep-green" })] });
  }], 937912);
}, 490865, (e) => {
  "use strict";
  let t = false, r = /* @__PURE__ */ new Set();
  e.s(["homeVideoLightboxOpen", 0, { get: () => t, set: (e2) => {
    e2 !== t && (t = e2, r.forEach((e3) => e3()));
  }, subscribe: (e2) => (r.add(e2), () => {
    r.delete(e2);
  }) }]);
}, 644112, (e) => {
  e.q("/_next/static/immutable/media/home-footer-video-still-mobile.1-2kl0-18s7jy.jpg");
}, 927874, (e) => {
  e.q("/_next/static/immutable/media/home-footer-video-still.2ry83ugok-_d0.jpg");
}, 459665, (e) => {
  e.q("/_next/static/immutable/media/home-ui-kierra-torres.2hhqlbfn-k9ov.png");
}, 762357, (e) => {
  e.q("/_next/static/immutable/media/home-ui-panel-deal-alfredo-bergson.1993zw531q50s.png");
}, 770558, (e) => {
  e.q("/_next/static/immutable/media/home-ui-panel-deal-cooper-franci.3ta7nme9m3qnr.png");
}, 450657, (e) => {
  e.q("/_next/static/immutable/media/home-ui-panel-deal-emery-botosh.23krp6y1kam6i.png");
}, 522481, (e) => {
  e.q("/_next/static/immutable/media/home-ui-panel-deal-eminem.1_l_xhprgvaaz.png");
}, 495941, (e) => {
  e.q("/_next/static/immutable/media/home-ui-desktop-conversation-slack-background.3njqgf4dxgrci.png");
}, 130154, 906564, 923314, (e) => {
  "use strict";
  var t = e.i(758661);
  e.s(["useRender", 0, function(e2) {
    return (0, t.useRenderElement)(e2.defaultTagName ?? "div", e2, e2);
  }], 130154);
  var r = e.i(105128), n = e.i(155172), i = e.i(608305), a = e.i(895921), o = e.i(115553);
  e.i(167718);
  var l = e.i(598964);
  let s = {};
  function u(e2, t2, r2, n2, i2) {
    if (!r2 && !n2 && !i2 && !e2) return c(t2);
    let a2 = c(e2);
    return t2 && (a2 = d(a2, t2)), r2 && (a2 = d(a2, r2)), n2 && (a2 = d(a2, n2)), i2 && (a2 = d(a2, i2)), a2;
  }
  function c(e2) {
    return h(e2) ? { ...m(e2, s) } : function(e3) {
      let t2 = { ...e3 };
      for (let e4 in t2) {
        let r2 = t2[e4];
        f(e4, r2) && (t2[e4] = p(r2));
      }
      return t2;
    }(e2);
  }
  function d(e2, t2) {
    return h(t2) ? m(t2, e2) : function(e3, t3) {
      if (!t3) return e3;
      for (let r2 in t3) {
        let n2 = t3[r2];
        switch (r2) {
          case "style":
            e3[r2] = (0, o.mergeObjects)(e3.style, n2);
            break;
          case "className":
            e3[r2] = b(e3.className, n2);
            break;
          default:
            f(r2, n2) ? e3[r2] = function(e4, t4) {
              return t4 ? e4 ? (...r3) => {
                let n3 = r3[0];
                if (v(n3)) {
                  g(n3);
                  let i3 = t4(...r3);
                  return n3.baseUIHandlerPrevented || e4?.(...r3), i3;
                }
                let i2 = t4(...r3);
                return e4?.(...r3), i2;
              } : p(t4) : e4;
            }(e3[r2], n2) : e3[r2] = n2;
        }
      }
      return e3;
    }(e2, t2);
  }
  function f(e2, t2) {
    let r2 = e2.charCodeAt(0), n2 = e2.charCodeAt(1), i2 = e2.charCodeAt(2);
    return 111 === r2 && 110 === n2 && i2 >= 65 && i2 <= 90 && ("function" == typeof t2 || void 0 === t2);
  }
  function h(e2) {
    return "function" == typeof e2;
  }
  function m(e2, t2) {
    return h(e2) ? e2(t2) : e2 ?? s;
  }
  function p(e2) {
    return e2 ? (...t2) => {
      let r2 = t2[0];
      return v(r2) && g(r2), e2(...t2);
    } : e2;
  }
  function g(e2) {
    return e2.preventBaseUIHandler = () => {
      e2.baseUIHandlerPrevented = true;
    }, e2;
  }
  function b(e2, t2) {
    return t2 ? e2 ? t2 + " " + e2 : t2 : e2;
  }
  function v(e2) {
    return null != e2 && "object" == typeof e2 && "nativeEvent" in e2;
  }
  let y = Symbol.for("react.lazy"), x = (0, e.i(262392).cva)({ base: ["inline-flex size-glyph-frame min-w-0 shrink-0 items-center justify-center", "[:where(&>*)]:size-glyph"] });
  e.s(["Glyph", 0, function({ render: e2, className: t2, ...f2 }) {
    var h2;
    return function(e3, t3, f3 = {}) {
      let h3 = t3.render, m2 = function(e4, t4 = {}) {
        let { className: r2, style: n2, render: f4 } = e4, { state: h4 = l.EMPTY_OBJECT, ref: m3, props: p2, stateAttributesMapping: g2, enabled: v2 = true } = t4, y2 = v2 ? "function" == typeof r2 ? r2(h4) : r2 : void 0, x2 = v2 ? "function" == typeof n2 ? n2(h4) : n2 : void 0, w = v2 ? function(e5, t5) {
          let r3 = {};
          for (let n3 in e5) {
            let i2 = e5[n3];
            if (t5?.hasOwnProperty(n3)) {
              let e6 = t5[n3](i2);
              null != e6 && Object.assign(r3, e6);
              continue;
            }
            true === i2 ? r3[`data-${n3.toLowerCase()}`] = "" : i2 && (r3[`data-${n3.toLowerCase()}`] = i2.toString());
          }
          return r3;
        }(h4, g2) : l.EMPTY_OBJECT, S = v2 && p2 ? function(e5) {
          if (Array.isArray(e5)) {
            if (0 === e5.length) return s;
            if (1 === e5.length) return c(e5[0]);
            let t5 = c(e5[0]);
            for (let r3 = 1; r3 < e5.length; r3 += 1) t5 = d(t5, e5[r3]);
            return t5;
          }
          return u(void 0, e5);
        }(p2) : void 0, k = v2 ? (0, o.mergeObjects)(w, S) ?? {} : l.EMPTY_OBJECT;
        return ("u" > typeof document && (v2 ? Array.isArray(m3) ? k.ref = (0, i.useMergedRefsN)([k.ref, (0, a.getReactElementRef)(f4), ...m3]) : k.ref = (0, i.useMergedRefs)(k.ref, (0, a.getReactElementRef)(f4), m3) : (0, i.useMergedRefs)(null, null)), v2) ? (void 0 !== y2 && (k.className = b(k.className, y2)), void 0 !== x2 && (k.style = (0, o.mergeObjects)(k.style, x2)), k) : l.EMPTY_OBJECT;
      }(t3, f3);
      return false === f3.enabled ? null : function(e4, t4, i2, a2) {
        if (t4) {
          if ("function" == typeof t4) return t4(i2, a2);
          let e5 = u(i2, t4.props);
          e5.ref = i2.ref;
          let r2 = t4;
          return r2?.$$typeof === y && (r2 = n.Children.toArray(t4)[0]), n.cloneElement(r2, e5);
        }
        if (e4 && "string" == typeof e4) {
          var o2, l2;
          return o2 = e4, l2 = i2, "button" === o2 ? (0, n.createElement)("button", { type: "button", ...l2, key: l2.key }) : "img" === o2 ? (0, n.createElement)("img", { alt: "", ...l2, key: l2.key }) : n.createElement(o2, l2);
        }
        throw Error((0, r.default)(8));
      }(e3, h3, m2, f3.state ?? l.EMPTY_OBJECT);
    }((h2 = { defaultTagName: "span", render: e2, props: u({ className: x({ className: t2 }) }, f2), state: { glyph: true } }).defaultTagName ?? "div", h2, h2);
  }], 906564), e.s(["SIGN_UP_HOME_HREF", 0, "/"], 923314);
}, 211862, (e) => {
  "use strict";
  var t = e.i(37329);
  e.s(["isAndroidBlinkSnapshotRoot", 0, function() {
    if ("u" < typeof navigator || "u" < typeof window || "GestureEvent" in window || (0, t.isFirefox)()) return false;
    let e2 = navigator.userAgentData;
    return !!("boolean" == typeof e2?.mobile ? e2.mobile : /Android/i.test(navigator.userAgent)) && ("chrome" in window || /Chrome\//i.test(navigator.userAgent));
  }]);
}, 37329, (e) => {
  "use strict";
  e.s(["isFirefox", 0, function() {
    return !!("u" > typeof document && "MozAppearance" in document.documentElement.style || "u" > typeof CSS && "function" == typeof CSS.supports && CSS.supports("-moz-appearance", "none") || "u" > typeof window && "mozInnerScreenX" in window) || "u" > typeof navigator && /Firefox\//.test(navigator.userAgent);
  }]);
}, 732935, 392337, 215350, 763324, (e) => {
  "use strict";
  var t = e.i(155172);
  let r = t.createContext(void 0);
  function n(...e2) {
    let t2 = { ...e2[0] };
    for (let n2 = 1; n2 < e2.length; n2 += 1) {
      let u = e2[n2];
      if (u) for (let e3 in u) {
        var r2, i2, a2, o2, l2, s2;
        let n3 = u[e3];
        "style" === e3 ? (r2 = t2.style, i2 = n3, t2.style = r2 ? i2 ? { ...r2, ...i2 } : r2 : i2) : "className" === e3 ? (a2 = t2.className, t2.className = (o2 = n3) ? a2 ? `${o2} ${a2}` : o2 : a2) : (l2 = e3, s2 = n3, 111 === l2.charCodeAt(0) && 110 === l2.charCodeAt(1) && l2.charCodeAt(2) >= 65 && 90 >= l2.charCodeAt(2) && ("function" == typeof s2 || void 0 === s2)) ? t2[e3] = /* @__PURE__ */ function(e4, t3) {
          return t3 ? e4 ? (...r3) => {
            let n4 = t3(...r3);
            return e4(...r3), n4;
          } : t3 : e4;
        }(t2[e3], n3) : t2[e3] = n3;
      }
    }
    return t2;
  }
  e.s(["LightboxContext", 0, r, "useLightboxContext", 0, function() {
    let e2 = t.useContext(r);
    if (void 0 === e2) throw Error("Lightbox compound components must be used within a Lightbox.Root");
    return e2;
  }], 732935), e.s(["mergeProps", 0, n], 392337);
  let i = parseInt(t.version, 10), a = { inert: "inert" };
  function o(e2) {
    return t.isValidElement(e2) ? (i >= 19 ? e2.props?.ref : e2.ref) ?? null : null;
  }
  function l() {
    return { callback: null, cleanup: null, refs: [] };
  }
  e.s(["getElementRef", 0, o, "inertWhen", 0, function(e2) {
    return e2 ? a : {};
  }], 215350);
  let s = Object.freeze({});
  e.s(["useRender", 0, function(e2) {
    var r2, i2, a2;
    let u, c, { render: d, ref: f, state: h, stateAttributesMapping: m, props: p, defaultTagName: g = "div" } = e2, b = { ...function(e3, t2) {
      let r3 = {};
      if (!e3) return r3;
      for (let n2 in e3) {
        let i3 = e3[n2];
        if (t2 && Object.prototype.hasOwnProperty.call(t2, n2)) {
          let e4 = t2[n2]?.(i3);
          null != e4 && Object.assign(r3, e4);
          continue;
        }
        true === i3 ? r3[`data-${n2.toLowerCase()}`] = "" : i3 && (r3[`data-${n2.toLowerCase()}`] = String(i3));
      }
      return r3;
    }(h, m), ...p };
    return r2 = b.ref, i2 = o(d), ((c = (a2 = l, null === (u = t.useRef(null)).current && (u.current = a2()), u).current).refs[0] !== r2 || c.refs[1] !== i2 || c.refs[2] !== f) && function(e3, t2) {
      if (e3.refs = t2, t2.every((e4) => null == e4)) {
        e3.callback = null;
        return;
      }
      e3.callback = (r3) => {
        if (e3.cleanup && (e3.cleanup(), e3.cleanup = null), null == r3) return;
        let n2 = t2.map(() => null);
        t2.forEach((e4, t3) => {
          if (null != e4) if ("function" == typeof e4) {
            let i3 = e4(r3);
            "function" == typeof i3 && (n2[t3] = i3);
          } else e4.current = r3;
        }), e3.cleanup = () => {
          t2.forEach((e4, t3) => {
            if (null != e4) if ("function" == typeof e4) {
              let r4 = n2[t3];
              r4 ? r4() : e4(null);
            } else e4.current = null;
          });
        };
      };
    }(c, [r2, i2, f]), b.ref = c.callback, function(e3, r3, i3, a3) {
      if ("function" == typeof r3) return r3(i3, a3);
      if (r3) {
        let e4 = n(i3, r3.props ?? void 0);
        return e4.ref = i3.ref, t.cloneElement(r3, e4);
      }
      return "button" === e3 ? t.createElement("button", { type: "button", ...i3 }) : t.createElement(e3, i3);
    }(g, d, b, h ?? s);
  }], 763324);
}, 337122, (e) => {
  "use strict";
  var t, r, n, i, a = ((t = a || {}).pullProgress = "--lightbox-pull-progress", t.pullSnapDuration = "--lightbox-pull-snap-duration", t.pullSnapEasing = "--lightbox-pull-snap-easing", t.zoomProgress = "--lightbox-zoom-progress", t), o = ((r = o || {}).pullProgress = "--lightbox-pull-progress", r.pullSnapDuration = "--lightbox-pull-snap-duration", r.pullSnapEasing = "--lightbox-pull-snap-easing", r), l = ((n = l || {}).morphBorderRadiusFrom = "--lightbox-morph-border-radius-from", n.morphBorderRadiusTo = "--lightbox-morph-border-radius-to", n.morphOldOpacity = "--lightbox-morph-old-opacity", n.morphNewOpacity = "--lightbox-morph-new-opacity", n.vtDuration = "--lightbox-vt-duration", n.vtEasing = "--lightbox-vt-easing", n.vtCrossfadeCloseEasing = "--lightbox-vt-crossfade-close-easing", n.vtRootEasing = "--lightbox-vt-root-easing", n), s = ((i = s || {}).travel = "--lightbox-thumbnail-strip-travel", i.selectVtDuration = "--lightbox-select-vt-duration", i.selectVtEasing = "--lightbox-select-vt-easing", i);
  e.s(["LightboxContentCssVars", 0, a, "LightboxDocumentCssVars", 0, l, "LightboxThumbnailStripCssVars", 0, s]);
}, 440066, (e) => {
  "use strict";
  var t, r, n, i, a, o, l, s, u, c, d, f, h, m, p, g, b, v, y, x, w, S = ((t = S || {}).trigger = "data-ramka-trigger", t.open = "data-popup-open", t.active = "data-active", t.morphTarget = "data-morph-target", t.crossfade = "data-crossfade", t), k = ((r = k || {}).portal = "data-ramka-portal", r), E = ((n = E || {}).content = "data-ramka-content", n.open = "data-open", n.closed = "data-closed", n.pulling = "data-pulling", n.pullSnapping = "data-pull-snapping", n.pullDismissing = "data-pull-dismissing", n.zooming = "data-zooming", n.zoomed = "data-zoomed", n), C = ((i = C || {}).backdrop = "data-ramka-backdrop", i.open = "data-open", i.closed = "data-closed", i.pulling = "data-pulling", i.pullSnapping = "data-pull-snapping", i), A = ((a = A || {}).close = "data-ramka-close", a), M = ((o = M || {}).stage = "data-ramka-stage", o), L = ((l = L || {}).item = "data-ramka-item", l.active = "data-active", l.index = "data-index", l.skipFade = "data-skip-fade", l), T = ((s = T || {}).slides = "data-ramka-slides", s.activeIndex = "data-active-index", s.direction = "data-direction", s.orientation = "data-orientation", s), P = ((u = P || {}).slide = "data-ramka-slide", u), R = ((c = R || {}).previous = "data-ramka-previous", c.disabled = "data-disabled", c), I = ((d = I || {}).next = "data-ramka-next", d.disabled = "data-disabled", d), z = ((f = z || {}).counter = "data-ramka-counter", f), O = ((h = O || {}).caption = "data-ramka-caption", h.hasCaption = "data-has-caption", h), N = ((m = N || {}).thumbnailGroup = "data-ramka-thumbnail-group", m.focusWithin = "data-focus-within", m), j = ((p = j || {}).thumbnail = "data-ramka-thumbnail", p.active = "data-active", p.index = "data-index", p), D = ((g = D || {}).root = "data-ramka-thumbnail-strip", g.track = "data-ramka-thumbnail-strip-track", g.scrubbing = "data-scrubbing", g), F = ((b = F || {}).media = "data-ramka-media", b.placeholder = "data-placeholder", b.width = "data-width", b.height = "data-height", b), $ = ((v = $ || {}).host = "data-ramka-zoom", v.zoom = "data-zoom", v.dragging = "data-dragging", v), W = ((y = W || {}).zoomIn = "data-ramka-zoom-in", y.disabled = "data-disabled", y), _ = ((x = _ || {}).zoomOut = "data-ramka-zoom-out", x.disabled = "data-disabled", x), B = ((w = B || {}).viewTransition = "data-ramka-view-transition", w.crossfade = "data-ramka-crossfade", w.viewTransitionPreset = "data-ramka-vt-preset", w);
  e.s(["LightboxBackdropDataAttributes", 0, C, "LightboxCloseDataAttributes", 0, A, "LightboxContentDataAttributes", 0, E, "LightboxDocumentDataAttributes", 0, B, "LightboxItemDataAttributes", 0, L, "LightboxMediaDataAttributes", 0, F, "LightboxPortalDataAttributes", 0, k, "LightboxSlideDataAttributes", 0, P, "LightboxSlidesDataAttributes", 0, T, "LightboxTriggerDataAttributes", 0, S]);
}, 483652, (e) => {
  "use strict";
  e.s(["arrowKeyIndexDelta", 0, function(e2, t) {
    switch (e2) {
      case "ArrowRight":
        return "rtl" === t ? -1 : 1;
      case "ArrowLeft":
        return "rtl" === t ? 1 : -1;
      case "ArrowDown":
        return 1;
      case "ArrowUp":
        return -1;
      default:
        return 0;
    }
  }, "readInlineScroll", 0, function(e2, t) {
    return "rtl" === t ? -e2.scrollLeft || 0 : e2.scrollLeft;
  }, "toInlineOffset", 0, function(e2, t, r, n) {
    return "rtl" === n ? r - (e2 + t) : e2;
  }, "writeInlineScroll", 0, function(e2, t, r) {
    e2.scrollLeft = "rtl" === t ? -r || 0 : r;
  }]);
}, 483011, (e) => {
  "use strict";
  e.i(906682);
  var t = e.i(619882), r = e.i(155172), n = e.i(440066), i = e.i(732935), a = e.i(662913), o = e.i(513595), l = e.i(353401), s = e.i(215350), u = e.i(392337), c = e.i(763324);
  let d = r.createContext(null), f = { active: (e2) => e2 ? { "data-active": "" } : null, index: (e2) => ({ "data-index": String(e2) }) }, h = r.forwardRef(function(e2, h2) {
    let { render: m, index: p, caption: g, children: b, style: v, ...y } = e2, { registerCaption: x, registerItem: w, activeIndex: S, loop: k, itemCount: E, activeItemElementRef: C, itemMorphElementsRef: A, openingTriggerIndexRef: M, openingTriggerElementRef: L, openingTriggerImageRef: T, triggerImageElementsRef: P, triggerElementsRef: R, openTransitionPendingRef: I, subscribeOpenComplete: z, baseId: O, hasTablist: N } = (0, i.useLightboxContext)(), j = (0, o.useSlidesPreload)(), D = p === S, F = Math.abs(p - S), $ = (k && E > 0 ? Math.min(F, E - F) : F) <= j, W = r.useRef(null), _ = r.useRef(null), B = r.useRef(null), q = r.useRef(null);
    r.useRef(false);
    let V = r.useCallback(() => {
      let e3 = W.current, t2 = A.current;
      if (!e3 || !t2) return;
      let r2 = B.current ?? q.current ?? _.current;
      r2 ? t2.set(e3, r2) : t2.delete(e3);
    }, [A]), G = r.useCallback((e3) => {
      let t2 = W.current;
      W.current = e3, e3 ? V() : t2 && A.current?.delete(t2), "function" == typeof h2 ? h2(e3) : h2 && (h2.current = e3);
    }, [h2, A, V]), H = (0, l.useAccessibleNameWarning)("Lightbox.Item", G, { namedByContent: false, hint: "A slide is a `group`, so its caption does not name it \u2014 pass `aria-label` carrying the position (the APG carousel pattern puts it in the name, e.g. `${i + 1} of ${photos.length}` in your own wording)." }), U = r.useCallback((e3) => {
      _.current = e3, V();
    }, [V]), Y = r.useCallback((e3) => {
      B.current = e3, V();
    }, [V]), J = r.useCallback((e3) => {
      q.current = e3, V();
    }, [V]), X = r.useRef(null), K = r.useCallback((e3) => {
      X.current = e3;
    }, []);
    r.useLayoutEffect(() => {
      let e3;
      if (!$) return;
      let t2 = _.current;
      if (!t2 || t2.complete && t2.naturalWidth > 0) return;
      let r2 = (M.current === p ? T.current : null) ?? P.current?.get(p) ?? null, n2 = r2?.currentSrc ?? "";
      if (!n2) return;
      let i2 = getComputedStyle(t2), o2 = "contain" === i2.objectFit ? "contain" : "cover", l2 = B.current ?? q.current, s2 = l2 && l2 !== t2 ? (0, a.tryPaintCanvasPlaceholder)({ img: t2, source: r2, fit: o2, objectPosition: i2.objectPosition, host: l2 }) : null;
      if (s2) {
        let t3 = l2 === q.current;
        t3 && X.current?.(true), e3 = () => {
          s2(), t3 && X.current?.(false);
        };
      } else {
        let a2 = { image: t2.style.backgroundImage, size: t2.style.backgroundSize, position: t2.style.backgroundPosition, repeat: t2.style.backgroundRepeat };
        e3 = () => {
          t2.style.backgroundImage = a2.image, t2.style.backgroundSize = a2.size, t2.style.backgroundPosition = a2.position, t2.style.backgroundRepeat = a2.repeat;
        }, t2.style.backgroundImage = `url("${n2}")`;
        let l3 = t2.clientWidth, s3 = t2.clientHeight, u3 = r2?.naturalWidth ?? 0, c3 = r2?.naturalHeight ?? 0;
        if (l3 > 0 && s3 > 0 && u3 > 0 && c3 > 0) {
          let e4 = "contain" === o2 ? Math.min(l3 / u3, s3 / c3) : Math.max(l3 / u3, s3 / c3);
          t2.style.backgroundSize = `${u3 * e4}px ${c3 * e4}px`;
        } else t2.style.backgroundSize = o2;
        t2.style.backgroundPosition = i2.objectPosition || "center", t2.style.backgroundRepeat = "no-repeat";
      }
      let u2 = false, c2 = 0, d2 = 0, f2 = false, h3 = !I.current, m2 = () => {
        !u2 && f2 && h3 && (u2 = true, e3());
      }, g2 = () => {
        f2 = true, m2();
      }, b2 = () => {
        u2 || (c2 = requestAnimationFrame(() => {
          d2 = requestAnimationFrame(g2);
        }));
      }, v2 = () => {
        u2 || ("function" == typeof t2.decode ? t2.decode().then(b2, b2) : b2());
      };
      t2.addEventListener("load", v2);
      let y2 = h3 ? null : z(() => {
        h3 = true, m2();
      });
      return () => {
        t2.removeEventListener("load", v2), y2?.(), c2 && cancelAnimationFrame(c2), d2 && cancelAnimationFrame(d2), u2 || e3();
      };
    }, [$]), r.useLayoutEffect(() => {
      D && W.current && (C.current = W.current);
    }, [D, C]), r.useEffect(() => w(p), [p, w]), r.useEffect(() => {
      if (void 0 !== g) return x(p, g);
    }, [p, g, x]);
    let Z = r.useMemo(() => $ ? "function" == typeof b ? b({ active: D, visible: $, index: p, imageRef: U, morphRef: Y }) : b : null, [$, D, p, b, U, Y]), Q = r.useMemo(() => ({ active: D, index: p }), [D, p]), ee = `${O}-panel-${p}`, et = `${O}-tab-${p}`, er = r.useMemo(() => ({ index: p, active: D, imageRef: U, morphRef: Y, registerMedia: J, registerPlaceholder: K }), [p, D, U, Y, J, K]), en = (0, c.useRender)({ render: m, ref: H, state: Q, stateAttributesMapping: f, props: (0, u.mergeProps)({ [n.LightboxItemDataAttributes.item]: "", id: ee, ...N ? { role: "tabpanel", "aria-labelledby": et } : { role: "group" }, "aria-hidden": !D, ...(0, s.inertWhen)(!D), style: { width: "100%", height: "100%", willChange: D ? "transform" : void 0, ...v } }, y, { children: Z }), defaultTagName: "div" });
    return $ ? (0, t.jsx)(d.Provider, { value: er, children: en }) : null;
  });
  h.displayName = "LightboxItem", e.s(["LightboxItem", 0, h, "useOptionalLightboxItemContext", 0, function() {
    return r.useContext(d);
  }]);
}, 662913, (e) => {
  "use strict";
  e.s(["tryPaintCanvasPlaceholder", 0, function(e2) {
    var t, r;
    let n, i, a, o, { img: l, source: s, fit: u, objectPosition: c, host: d } = e2;
    if (!s) return null;
    let f = s.naturalWidth, h = s.naturalHeight;
    if (!(s.complete && f > 0 && h > 0) || d === l) return null;
    let m = l.clientWidth || d.clientWidth, p = l.clientHeight || d.clientHeight;
    if (!(m > 0 && p > 0)) return null;
    try {
      i = (n = document.createElement("canvas")).getContext("2d");
    } catch {
      return null;
    }
    if (!i) return null;
    let g = Math.min("u" > typeof window && window.devicePixelRatio || 1, 3);
    n.width = Math.max(1, Math.round(m * g)), n.height = Math.max(1, Math.round(p * g)), n.setAttribute("data-ramka-placeholder", "");
    let b = n.style;
    b.position = "absolute", b.top = "0", b.insetInlineStart = "0", b.width = "100%", b.height = "100%", b.zIndex = "-1", b.pointerEvents = "none";
    let v = "cover" === u ? Math.max(m / f, p / h) : Math.min(m / f, p / h), y = f * v, x = h * v, { x: w, y: S } = (t = m - y, r = p - x, { x: t * (a = (e3, t2) => {
      if (!e3 || "center" === e3) return 0.5;
      if (e3 === ("x" === t2 ? "left" : "top")) return 0;
      if (e3 === ("x" === t2 ? "right" : "bottom")) return 1;
      if (e3.endsWith("%")) {
        let t3 = Number.parseFloat(e3);
        return Number.isFinite(t3) ? t3 / 100 : 0.5;
      }
      return 0.5;
    })((o = (c || "").trim().split(/\s+/))[0], "x"), y: r * a(o[1] ?? "center", "y") });
    try {
      i.scale(g, g), i.drawImage(s, w, S, y, x);
    } catch {
      return null;
    }
    let k = d.style.position, E = d.style.isolation;
    return "static" === getComputedStyle(d).position && (d.style.position = "relative"), d.style.isolation = "isolate", d.insertBefore(n, d.firstChild), () => {
      n.remove(), d.style.position = k, d.style.isolation = E;
    };
  }]);
}, 729034, 636517, (e) => {
  "use strict";
  var t = e.i(483652);
  let r = "[data-ramka-slide]";
  e.s(["SLIDE_SELECTOR", 0, r, "measureSlidesGeometry", 0, function(e2, n2 = "ltr") {
    let i = e2.querySelectorAll(r), a = i.length, o = e2.clientWidth || 1;
    if (0 === a) return { offsets: [], base: 0, step: o, count: 0 };
    let l = "rtl" === n2 ? o : 0, s = Array.from(i, (r2) => {
      let i2 = r2.offsetWidth || o;
      return (0, t.toInlineOffset)(r2.offsetParent === e2 ? r2.offsetLeft : r2.offsetParent === e2.offsetParent ? r2.offsetLeft - e2.offsetLeft : r2.getBoundingClientRect().left - e2.getBoundingClientRect().left + e2.scrollLeft, i2, l, n2) + i2 / 2 - o / 2;
    }), u = s[0] ?? 0, c = a > 1 ? s[1] - s[0] : o;
    return { offsets: s, base: u, step: c > 0 ? c : o, count: a };
  }, "slideIndexFromInlinePosition", 0, function(e2, t2) {
    let { offsets: r2, count: n2, base: i, step: a } = t2;
    if (n2 <= 0 || 1 === n2 || 0 === r2.length) return 0;
    if (function(e3) {
      let { offsets: t3, count: r3, base: n3, step: i2 } = e3;
      return r3 < 2 || t3.length !== r3 || t3.every((e4, t4) => 1 > Math.abs(e4 - (n3 + t4 * i2)));
    }(t2) && a > 0) return Math.min(n2 - 1, Math.max(0, Math.round((e2 - i) / a)));
    let o = 0, l = 1 / 0;
    for (let t3 = 0; t3 < r2.length; t3++) {
      let n3 = Math.abs(e2 - r2[t3]);
      n3 < l && (l = n3, o = t3);
    }
    return o;
  }, "slideInlinePositionForIndex", 0, function(e2, t2) {
    let { offsets: r2, count: n2, base: i, step: a } = t2;
    if (n2 <= 0) return 0;
    let o = Math.min(Math.max(0, e2), n2 - 1);
    return r2[o] ?? i + o * a;
  }], 729034);
  var n = e.i(155172);
  e.s(["useDirectionMismatchWarning", 0, function(e2, t2) {
    n.useEffect(() => {
    }, [e2, t2]);
  }], 636517);
}, 513595, (e) => {
  "use strict";
  var t = e.i(619882), r = e.i(155172), n = e.i(440066), i = e.i(732935), a = e.i(729034), o = e.i(483652), l = e.i(37329), s = e.i(636517), u = e.i(152696), c = e.i(392337), d = e.i(763324);
  let f = r.createContext(1 / 0), h = "x mandatory", m = { activeIndex: (e2) => ({ "data-active-index": String(e2) }), direction: (e2) => ({ "data-direction": String(e2) }) };
  r.forwardRef(function(e2, p) {
    let { render: g, preload: b = 1, style: v, ...y } = e2, { activeIndex: x, direction: w, dir: S, setActiveIndex: k, navigationLockedRef: E, itemCount: C, slidesViewportRef: A, slidesGeometryRef: M, notifySlidesViewport: L } = (0, i.useLightboxContext)(), { activeZoomRef: T } = (0, u.useLightboxZoomPublish)(), P = r.useRef(null), R = r.useRef(false), I = r.useRef(0), z = r.useRef(0), O = r.useRef(0), N = r.useRef(false), j = r.useRef(0), D = r.useRef(0), F = r.useRef(0), $ = r.useRef(false), W = r.useRef(x);
    W.current = x;
    let _ = r.useCallback((e3) => {
      let t2 = P.current;
      P.current = e3, e3 ? A.current = e3 : A.current === t2 && (A.current = null), !e3 && t2 && (O.current = 0, t2.style.scrollSnapType = h), L(), "function" == typeof p ? p(e3) : p && (p.current = e3);
    }, [p, A, L]);
    (0, s.useDirectionMismatchWarning)(P, S);
    let B = r.useCallback((e3) => (0, a.slideIndexFromInlinePosition)((0, o.readInlineScroll)(e3, S), M.current), [S]), q = r.useCallback((e3) => {
      let t2 = P.current;
      if (!t2) return;
      let r2 = t2.querySelectorAll(a.SLIDE_SELECTOR)[e3];
      if (!r2) return;
      let n2 = r2.style.visibility;
      r2.style.visibility = "hidden", r2.offsetWidth, r2.style.visibility = n2;
    }, []), V = r.useCallback((e3) => {
      var t2, r2;
      let n2 = P.current;
      if (!n2) return;
      let i2 = n2.scrollWidth - n2.clientWidth, l2 = (t2 = (0, a.slideInlinePositionForIndex)(e3, M.current), r2 = i2 > 0 ? i2 : 0, t2 < 0 ? 0 : t2 > r2 ? r2 : t2);
      if (1 > Math.abs((0, o.readInlineScroll)(n2, S) - l2)) return;
      R.current = true, I.current = l2;
      let s2 = z.current += 1;
      0 === O.current && (n2.style.scrollSnapType = "none"), O.current += 1, (0, o.writeInlineScroll)(n2, S, l2), requestAnimationFrame(() => {
        let t3 = P.current;
        O.current = Math.max(0, O.current - 1), t3 && 0 === O.current && (t3.style.scrollSnapType = h), t3 && s2 === z.current && (Math.abs((0, o.readInlineScroll)(t3, S) - l2) >= 1 && (R.current = true, I.current = l2, (0, o.writeInlineScroll)(t3, S, l2)), requestAnimationFrame(() => {
          s2 === z.current && (R.current = false, window.clearTimeout(D.current), D.current = window.setTimeout(() => {
            s2 === z.current && q(e3);
          }, 120));
        }));
      });
    }, [q, S]);
    r.useLayoutEffect(() => {
      let e3 = P.current;
      if (!e3) return;
      M.current = (0, a.measureSlidesGeometry)(e3, S), L();
      let t2 = new ResizeObserver(() => {
        let t3 = M.current, r2 = (0, a.measureSlidesGeometry)(e3, S);
        if (M.current = r2, t3 && r2.base === t3.base && r2.step === t3.step && r2.count === t3.count && r2.offsets.length === t3.offsets.length && r2.offsets.every((e4, r3) => e4 === t3.offsets[r3])) return;
        let n2 = j.current += 1;
        N.current = true, $.current = false, E.current = false, window.clearTimeout(F.current), F.current = 0, L(), V(W.current), requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            n2 === j.current && (V(W.current), N.current = false);
          });
        });
      });
      return t2.observe(e3), () => t2.disconnect();
    }, [C, V, L, E, S]), r.useLayoutEffect(() => {
      let e3 = P.current;
      e3 && B(e3) !== x && V(x);
    }, [x, B, V]), r.useEffect(() => {
      let e3 = P.current;
      if (!e3) return;
      let t2 = false, r2 = 0, n2 = () => {
        if (0 !== r2 && (cancelAnimationFrame(r2), r2 = 0), window.clearTimeout(F.current), F.current = 0, t2 = false, $.current = false, E.current = false, R.current = false, N.current) return;
        let n3 = B(e3);
        n3 !== W.current && k(n3, "scroll");
      }, i2 = "onscrollend" in window && !(0, l.isFirefox)(), a2 = () => {
        window.clearTimeout(F.current), F.current = 0, (!i2 || $.current) && (F.current = window.setTimeout(n2, 140));
      }, s2 = () => {
        R.current || (E.current || (t2 = false), E.current = true, a2());
      }, u2 = () => 1 > Math.abs((0, o.readInlineScroll)(e3, S) - I.current), c2 = () => {
        if (r2 = 0, R.current || N.current || u2()) {
          t2 = false, $.current = false, E.current = false, window.clearTimeout(F.current), F.current = 0;
          return;
        }
        if (!E.current) return;
        let n3 = B(e3);
        n3 !== W.current && k(n3, "scroll");
      }, d2 = () => {
        R.current || N.current || u2() || (s2(), t2 = true), 0 === r2 && (r2 = requestAnimationFrame(c2));
      }, f2 = 0, h2 = 0, m2 = false, p2 = false, g2 = false, b2 = () => (T.current?.getZoom() ?? 1) <= 1 + 1e-6, v2 = (e4) => {
        if (e4.touches.length > 1) {
          g2 = true, m2 && p2 && b2() && s2();
          return;
        }
        1 === e4.touches.length && (m2 = true, p2 = false, f2 = e4.touches[0].clientX, h2 = e4.touches[0].clientY);
      }, y2 = (e4) => {
        if (g2 || 1 !== e4.touches.length || !m2 || p2) return;
        let t3 = e4.touches[0], r3 = t3.clientX - f2, n3 = t3.clientY - h2;
        !(10 > Math.hypot(r3, n3)) && (p2 = true, b2() && Math.abs(r3) >= Math.abs(n3) && s2());
      }, x2 = (e4) => {
        e4.touches.length > 0 || (m2 = false, p2 = false, g2 = false, E.current && !t2 && n2());
      }, w2 = (e4) => {
        E.current && ("wheel" !== e4.type || e4.ctrlKey || e4.metaKey) && ($.current = true, a2());
      };
      return e3.addEventListener("scroll", d2, { passive: true }), e3.addEventListener("scrollend", n2), e3.addEventListener("wheel", w2, { passive: true, capture: true }), e3.addEventListener("gesturestart", w2, { capture: true }), e3.addEventListener("gesturechange", w2, { capture: true }), e3.addEventListener("touchstart", v2, { passive: true, capture: true }), e3.addEventListener("touchmove", y2, { passive: true, capture: true }), e3.addEventListener("touchend", x2, { passive: true, capture: true }), e3.addEventListener("touchcancel", x2, { passive: true, capture: true }), () => {
        0 !== r2 && cancelAnimationFrame(r2), window.clearTimeout(F.current), window.clearTimeout(D.current), F.current = 0, e3.removeEventListener("scroll", d2), e3.removeEventListener("scrollend", n2), e3.removeEventListener("wheel", w2, true), e3.removeEventListener("gesturestart", w2, true), e3.removeEventListener("gesturechange", w2, true), e3.removeEventListener("touchstart", v2, true), e3.removeEventListener("touchmove", y2, true), e3.removeEventListener("touchend", x2, true), e3.removeEventListener("touchcancel", x2, true);
      };
    }, [B, k, E, T, S]);
    let G = r.useMemo(() => ({ activeIndex: x, direction: w }), [x, w]);
    return (0, t.jsx)(f.Provider, { value: b, children: (0, d.useRender)({ render: g, ref: _, state: G, stateAttributesMapping: m, props: (0, c.mergeProps)({ role: "group", [n.LightboxSlidesDataAttributes.slides]: "", "data-orientation": "horizontal", style: { display: "flex", overflowX: "auto", overflowY: "hidden", overscrollBehaviorX: "contain", scrollSnapType: h, scrollBehavior: "auto", scrollbarWidth: "none", overflowAnchor: "none", ...v, position: "relative", containerType: "size" } }, y), defaultTagName: "div" }) });
  }).displayName = "LightboxSlides", e.s(["useSlidesPreload", 0, function() {
    return r.useContext(f);
  }]);
}, 152696, (e) => {
  "use strict";
  var t = e.i(155172);
  t.createContext(null);
  let r = t.createContext(null), n = t.createContext(null);
  e.s(["LightboxActiveZoomContext", 0, n, "LightboxZoomPublishContext", 0, r, "useLightboxZoomPublish", 0, function() {
    let e2 = t.useContext(r);
    if (!e2) throw Error("Lightbox zoom bridge must be used within a Lightbox.Root");
    return e2;
  }]);
}, 757831, (e) => {
  "use strict";
  function t(e2, t2) {
    return t2?.get(e2) ?? e2;
  }
  e.s(["findDestinationMorphTarget", 0, function(e2, r, n) {
    return n || (e2 ? t(e2, r) : null);
  }, "findItemMorphTarget", 0, t, "findTriggerMorphTarget", 0, function(e2, t2) {
    return t2?.get(e2) ?? e2;
  }]);
}, 396022, (e) => {
  "use strict";
  e.s(["resolveScrollTriggerOption", 0, function(e2, t) {
    if (!e2) return null;
    let r = (Array.isArray(e2) ? e2 : [e2]).find((e3) => e3.type === t);
    return r ? { behavior: r.behavior ?? "smooth", block: r.block ?? "nearest", inline: r.inline ?? "nearest" } : null;
  }, "resolveTriggerIndex", 0, function(e2, t, r, n) {
    if ("origin" === t) return r;
    if ("active" === t || n.has(e2)) return e2;
    let i = -1, a = 1 / 0;
    for (let t2 of n.keys()) {
      let r2 = Math.abs(t2 - e2);
      r2 < a && (a = r2, i = t2);
    }
    return i >= 0 ? i : e2;
  }, "scrollTriggerEl", 0, function(e2, t = { behavior: "smooth", block: "nearest", inline: "nearest" }) {
    e2 && e2.scrollIntoView({ block: t.block, inline: t.inline, behavior: t.behavior });
  }]);
}, 353401, (e) => {
  "use strict";
  e.i(906682);
  var t = e.i(155172);
  e.s(["useAccessibleNameWarning", 0, function(e2, r, n) {
    let { namedByContent: i = true, hint: a } = n ?? {}, o = t.useRef(null), l = t.useCallback((e3) => {
      o.current = e3, "function" == typeof r ? r(e3) : r && (r.current = e3);
    }, [r]);
    return t.useEffect(() => {
    }), l;
  }]);
}, 914040, 248097, 472197, (e) => {
  "use strict";
  e.s(["DEFAULT_DECODE_MAX_WAIT", 0, 200, "VIEW_TRANSITION_NAME", 0, "lightbox-morph", "isLowEndDevice", 0, function() {
    if ("u" < typeof navigator) return false;
    let e2 = navigator.deviceMemory;
    if ("number" == typeof e2 && e2 < 4) return true;
    let t2 = navigator.hardwareConcurrency;
    return "number" == typeof t2 && !!(t2 < 4);
  }, "supportsViewTransitions", 0, function() {
    return "u" > typeof document && "startViewTransition" in document && !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }], 914040);
  var t = e.i(440066);
  let r = "cubic-bezier(0.16, 1, 0.3, 1)", n = "cubic-bezier(0.22, 0, 0.35, 1)", i = (e2, t2, i2, a2, o2) => {
    let l2, s2 = `cubic-bezier(${t2}, ${i2}, ${a2}, ${o2})`;
    return { duration: e2, ease: (l2 = (e3, t3, r2) => (1 - 3 * r2 + 3 * t3) * e3 * e3 * e3 + (3 * r2 - 6 * t3) * e3 * e3 + 3 * t3 * e3, (e3) => {
      if (e3 <= 0) return 0;
      if (e3 >= 1) return 1;
      let r2 = 0, n2 = 1, s3 = e3;
      for (let i3 = 0; i3 < 32; i3++) {
        let i4 = l2(s3, t2, a2);
        if (1e-6 > Math.abs(i4 - e3)) break;
        i4 < e3 ? r2 = s3 : n2 = s3, s3 = (r2 + n2) / 2;
      }
      return l2(s3, i2, o2);
    }), cssEasing: s2, cssCrossfadeCloseEasing: n, cssRootEasing: r };
  }, a = { default: i(360, 0.44, 0.58, 0, 1), snappy: i(340, 0.38, 0.66, 0, 1), relaxed: i(400, 0.48, 0.5, 0, 1), spring: { duration: 450, ease: function() {
    let e2, t2 = 0.16 / 0.22 * 0.78 / 0.92;
    {
      let r2 = 9.2 - t2, n2 = (e3) => Math.exp(-9.2 * e3) * (1 + r2 * e3), i2 = 1 - n2(1);
      e2 = (e3) => (1 - n2(e3)) / i2;
    }
    return (t3) => t3 <= 0 ? 0 : t3 >= 1 ? 1 : t3 < 0.22 ? 0.08 * Math.pow(t3 / 0.22, 2) : 0.08 + 0.92 * e2((t3 - 0.22) / 0.78);
  }(), cssEasing: "cubic-bezier(0.22, 1, 0.36, 1)", cssCrossfadeCloseEasing: n, cssRootEasing: r } };
  function o(e2) {
    return "string" == typeof e2 && e2 in a;
  }
  function l(e2) {
    return o(e2) ? a[e2] : a.default;
  }
  e.s(["VIEW_TRANSITION_PRESETS", 0, a, "isViewTransitionPreset", 0, o, "morphTiming", 0, function() {
    let e2 = "u" > typeof document ? document.documentElement.getAttribute(t.LightboxDocumentDataAttributes.viewTransitionPreset) : null, { duration: r2, ease: n2 } = l(o(e2) ? e2 : void 0);
    return { duration: r2, ease: n2 };
  }, "resolveViewTransitionTiming", 0, l], 248097);
  let s = { release() {
  } };
  function u() {
    return "function" == typeof CSSStyleSheet && "function" == typeof CSSStyleSheet.prototype.replaceSync && null != document.adoptedStyleSheets;
  }
  function c(e2) {
    let t2 = new CSSStyleSheet();
    return t2.replaceSync(e2), document.adoptedStyleSheets = [...document.adoptedStyleSheets, t2], { release() {
      document.adoptedStyleSheets = document.adoptedStyleSheets.filter((e3) => e3 !== t2);
    } };
  }
  function d(e2, t2, r2) {
    let n2 = document.createElement("style");
    return n2.setAttribute(t2, ""), n2.textContent = e2, r2 ? document.head.insertBefore(n2, document.head.firstChild) : document.head.appendChild(n2), { release() {
      n2.remove();
    } };
  }
  e.s(["adopt", 0, c, "appendStyleElement", 0, d, "insertLibrarySheet", 0, function(e2, t2) {
    return "u" < typeof document ? s : u() ? c(e2) : d(e2, t2, false);
  }, "supportsConstructedSheets", 0, u], 472197);
}, 819622, (e) => {
  "use strict";
  e.i(906682);
  var t = e.i(155172), r = e.i(890329), n = e.i(810140);
  e.s(["useReducedMotion", 0, function() {
    n.hasReducedMotionListener.current || (0, r.initPrefersReducedMotion)();
    let [e2] = (0, t.useState)(n.prefersReducedMotion.current);
    return e2;
  }]);
}]);

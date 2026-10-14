// SignUpView (standalone /sign-up page) from chunk 03h63t4las67k.js
    ]);
  },
  332992,
  (e) => {
    "use strict";
    var t = e.i(619882),
      r = e.i(155172),
      n = e.i(267579),
      i = e.i(927612),
      a = e.i(937912),
      l = e.i(332253),
      o = e.i(675325),
      s = e.i(923314);
    e.s([
      "SignUpView",
      0,
      function () {
        let e = (0, r.useRef)(!1),
          [u, c] = (0, r.useState)(!1),
          [d, f] = (0, r.useState)("confirm"),
          h = (0, o.useSignUpCloseConfirm)({
            dismissal: d,
            onBack: () => {
              window.navigation?.canGoBack ? (c(!0), h.back()) : v();
            },
          }),
          { confirming: m } = h,
          g = (0, r.useRef)(null),
          p = (0, n.useRouter)();
        (0, r.useEffect)(() => {
          m && p.prefetch(s.SIGN_UP_HOME_HREF);
        }, [m, p]);
        let v = () => {
            (c(!0), h.home());
          },
          b = () => {
            u || h.confirmClose(v);
          };
        (0, r.useEffect)(() => {
          let e = (e) => {
            "Escape" === e.key && !e.isComposing && (m || b());
          };
          return (
            document.addEventListener("keydown", e),
            () => document.removeEventListener("keydown", e)
          );
        });
        let y = (e) =>
          e.target instanceof Node &&
          e.currentTarget.contains(e.target) &&
          !g.current?.contains(e.target);
        return (0, t.jsxs)("main", {
          className: (0, i.cx)(
            "relative min-h-svh overflow-hidden bg-waitlist-deep-green",
            "font-features-['liga'_off]",
          ),
          onPointerDown: (t) => {
            e.current = y(t);
          },
          onClick: (t) => {
            e.current && y(t) && b();
          },
          children: [
            (0, t.jsx)(a.HomeBackground, {}),
            (0, t.jsx)("div", {
              inert: u,
              className: (0, i.cx)(
                "relative",
                "pt-[calc(1.5rem_+_env(safe-area-inset-top))]",
                "pr-[calc(0.75rem_+_env(safe-area-inset-right))]",
                "pb-[calc(0.75rem_+_env(safe-area-inset-bottom))]",
                "pl-[calc(0.75rem_+_env(safe-area-inset-left))]",
                "md:px-3 md:py-15 lg:py-44.25",
              ),
              children: (0, t.jsx)(l.SignUpForm, {
                ref: g,
                className: "mx-auto max-w-198",
                closeRender: (0, t.jsx)("button", {
                  type: "button",
                  onClick: b,
                }),
                closing: u,
                onSubmitted: v,
                onDismissalChange: f,
              }),
            }),
            h.confirmDialog,
          ],
        });
      },
    ]);
  },
  130154,
  906564,
  923314,
  (e) => {

// SignUpModal (intercepted /sign-up opened from the homepage) from chunk 3fx8on0ui0lyb.js
(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([
  "object" == typeof document ? document.currentScript : void 0,
  770734,
  (e) => {
    "use strict";
    var t = e.i(619882),
      n = e.i(155172),
      r = e.i(694706),
      i = e.i(927612),
      o = e.i(332253),
      a = e.i(675325);
    e.s([
      "SignUpModal",
      0,
      function () {
        let e = (0, n.useRef)(null),
          l = (0, n.useRef)(null),
          s = (0, n.useRef)(!1),
          [u, c] = (0, n.useState)(!1),
          [f, d] = (0, n.useState)("confirm"),
          p = (0, a.useSignUpCloseConfirm)({
            onBack: () => l.current?.close(),
            dismissal: f,
          }),
          m = (0, n.useCallback)((t) => {
            e.current = t;
            let n = document.querySelector("[data-sign-up-page]");
            if (!t || !n) return;
            let r = window.scrollY,
              i = n.getBoundingClientRect().top;
            return (
              n.style.setProperty("--sign-up-page-top", `${i}px`),
              (n.dataset.signUpPinned = ""),
              window.scrollTo({ top: 0, behavior: "instant" }),
              () => {
                (delete n.dataset.signUpPinned,
                  window.scrollTo({ top: r, behavior: "instant" }));
              }
            );
          }, []);
        return (0, t.jsx)(r.Dialog.Root, {
          defaultOpen: !0,
          actionsRef: l,
          modal: "trap-focus",
          onOpenChange: (e, t) => {
            e || "imperative-action" === t.reason
              ? c(!e)
              : (t.cancel(), p.confirmClose(() => l.current?.close()));
          },
          onOpenChangeComplete: (t) => {
            if (!t) return void p.back();
            let n = e.current;
            if (!n || !s.current) return;
            let r = () =>
              window.setTimeout(() => {
                document.activeElement === n &&
                  n.querySelector("input")?.focus();
              }, 25);
            document.activeElement === n
              ? r()
              : n.contains(document.activeElement) ||
                n.addEventListener(
                  "focusin",
                  (e) => {
                    e.target === n && r();
                  },
                  { once: !0 },
                );
          },
          children: (0, t.jsxs)(r.Dialog.Portal, {
            children: [
              (0, t.jsx)(r.Dialog.Backdrop, {
                className: "fixed inset-0 z-50",
              }),
              (0, t.jsx)(r.Dialog.Viewport, {
                className: (0, i.cx)(
                  "absolute inset-x-0 top-0 z-50",
                  "pt-[calc(1.5rem_+_env(safe-area-inset-top))]",
                  "pr-[calc(0.75rem_+_env(safe-area-inset-right))]",
                  "pb-[calc(0.75rem_+_env(safe-area-inset-bottom))]",
                  "pl-[calc(0.75rem_+_env(safe-area-inset-left))]",
                  "md:px-3 md:py-15 lg:py-44.25",
                ),
                children: (0, t.jsxs)(r.Dialog.Popup, {
                  ref: m,
                  "aria-labelledby": "sign-up-title",
                  initialFocus: (t) => (
                    (s.current =
                      "touch" !== t &&
                      !window.matchMedia("(pointer: coarse)").matches),
                    e.current
                  ),
                  "data-sign-up-dialog": "",
                  className: "mx-auto max-w-198 outline-none",
                  children: [
                    (0, t.jsx)(o.SignUpForm, {
                      closeRender: (0, t.jsx)(r.Dialog.Close, {}),
                      closing: u,
                      onSubmitted: () => l.current?.close(),
                      onDismissalChange: d,
                    }),
                    p.confirmDialog,
                  ],
                }),
              }),
            ],
          }),
        });
      },
    ]);

// ThemeColorOnScroll (root layout, all pages) minified from 3o-cevwf7c4-6.js; props on every page: {scrolledColor:'#E0E0E0', threshold:'100svh'} initial = meta content #85C093
function n({initialColor:e,scrolledColor:o,threshold:a=80,restoreOnTop:l=!0}){let c=(0,t.useRef)(null),u=(0,t.useRef)(null),h=(0,t.useRef)("number"==typeof a?a:0),{scrollY:d}=(0,i.useScroll)();return(0,t.useEffect)(()=>{let t=r()?.getAttribute("content")??"#85C093",i=e??t;u.current=i;let n=e=>{(c.current??i)!==e&&(s(e),c.current=e)},p=()=>{h.current="number"==typeof a?a:function(e){let t=document.createElement("div");t.style.position="absolute",t.style.visibility="hidden",t.style.pointerEvents="none",t.style.height=e,document.body.appendChild(t);let i=t.getBoundingClientRect().height;if(document.body.removeChild(t),i>0)return i;let r=e.trim().match(/^(\[\d.\]+)\s*(svh|dvh|lvh|vh|px)$/i)||e.trim().match(/^([\d.]+)\s*(svh|dvh|lvh|vh|px)$/i);if(!r)return 0;let s=parseFloat(r[1]),n=r[2].toLowerCase();return"px"===n?s:s/100*("dvh"===n?window.visualViewport?.height??window.innerHeight:"lvh"===n?Math.max(window.innerHeight,screen.availHeight):"svh"===n?Math.min(window.innerHeight,document.documentElement.clientHeight):window.innerHeight)}(a)},g=e=>{n(("number"==typeof e?e:d.get())>h.current?o:l?i:c.current??i)};n(i),p(),g();let v=d.on("change",g),_=()=>{p(),g()};return window.addEventListener("resize",_),window.visualViewport?.addEventListener("resize",_),()=>{v(),window.removeEventListener("resize",_),window.visualViewport?.removeEventListener("resize",_),l&&u.current&&s(u.current)}},[e,o,a,l,d]),null}e.s(["ThemeColorOnScroll",0,n,"default",0,n])},989590,835676,e=>{"use strict";var t="u">typeof window?window:void 0,i="u">typeof globalThis?globalThis:t;"u"<typeof self&&(i.self=i),"u"<typeof File&&(i.File=function(){});var r=Array.prototype,s=r.forEach,n=r.indexOf,o=null==i?void 0:i.navigator,a=null==i?

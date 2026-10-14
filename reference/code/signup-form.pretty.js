// De-minified from https://operate.so/_next/static/immutable/chunks/0ninj74wr6ybs.js (sign-up form). Excerpts only.
// --- option lists + server action reference (lines 310-345)
    var k = t.i(267579),
      I = t.i(927612);
    let w = [
        "Founder / CEO",
        "Sales leader (VP, Head of Sales)",
        "Account executive",
        "SDR / BDR",
        "RevOps / Sales ops",
        "Other",
      ],
      S = ["0-1", "2–4", "5–50", "51–250", "251+"],
      z = [
        "Keeping up with follow-ups",
        "Finding context across tools",
        "Knowing which deals need attention",
        "Stale CRM data",
        "Visibility into my team’s deals",
        "AI that doesn’t know our deals",
        "Something else",
      ],
      O = "Not using AI yet",
      N = [
        "ChatGPT, Claude, or similar",
        "AI features in our sales tools",
        "Custom agents or workflows",
        "Something else",
        O,
      ];
    var D = t.i(31643);
    let U = (0, D.createServerReference)(
      "4005ae79c0e159cf171abe5af6cfc768222eda86ff",
      D.callServer,
      void 0,
      D.findSourceMapURL,
      "submitSignUp",
    );
// --- zod schema used for normalising answers (lines 21022-21050)
            ...z.filter((t) => "Something else" !== t),
            "Keeping the CRM updated",
            "Seeing what’s happening in my team’s deals",
            "Nothing major right now",
            "other",
          ]),
          dealChallengeOther: fN,
          aiUsage: fz
            .array(fz.enum(N))
            .min(1, "Choose at least one")
            .max(N.length)
            .refine(
              (t) => !t.includes(O) || 1 === t.length,
              "Choose either AI tools or Not using AI yet",
            ),
          aiUsageOther: fz.string().trim().max(2e3).optional(),
        })
        .transform(({ aiUsageOther: t, ...i }) => ({
          ...i,
          roleOther: "other" === i.role ? i.roleOther : "",
          dealChallengeOther:
            "other" === i.dealChallenge ? i.dealChallengeOther : "",
          ...(i.aiUsage.includes("Something else") && t
            ? { aiUsageOther: t }
            : {}),
          aiUsage: N.filter((t) => i.aiUsage.includes(t)),
        }));
    (fz.object({ submissionId: fz.uuid(), answers: fD }),
      t.s([], 77165),
// --- form UI: helpers, fields, choice groups, checkbox SVG, Back button, loading animation wrapper, status row, SignUpForm (lines 22715-24070)
          }),
        });
      }),
      mT = new Set(["text", "email", "url"]);
    function mR(t) {
      if ("Enter" !== t.key || t.nativeEvent.isComposing || 229 === t.keyCode)
        return;
      t.preventDefault();
      let i = t.currentTarget;
      if ("next" !== i.enterKeyHint) return void i.blur();
      let n = Array.from(i.form?.elements ?? []),
        r = n
          .slice(n.indexOf(i) + 1)
          .find(
            (t) =>
              t instanceof HTMLTextAreaElement ||
              (t instanceof HTMLInputElement && mT.has(t.type)),
          );
      r ? r.focus() : i.blur();
    }
    function mL(t) {
      let i = t.target;
      !(i instanceof Element) ||
        i.closest("input, textarea") ||
        (t.preventDefault(),
        i
          .closest("label")
          ?.querySelector('[role="radio"], [role="checkbox"]')
          ?.focus({ focusVisible: !1 }));
    }
    let mM = "focus-within:bg-waitlist-gray/20",
      mV =
        "px-[0.75em] py-[calc(6.5em/18)] rounded-[calc(12em/18)] border-[1.5px] border-waitlist-gray text-[1.125em] leading-[calc(21/18)]",
      mF = "ml-auto shrink-0 pr-2 pl-3 text-right @max-[29em]:basis-full",
      mJ = "rounded-none bg-transparent shadow-none outline-none",
      mB = `truncate ${mJ}`;
    function mK({ className: t, number: i, label: n, required: r, hint: a }) {
      return (0, c.jsxs)("span", {
        className: (0, I.cx)("flex items-baseline", t),
        children: [
          (0, c.jsxs)("span", {
            "aria-hidden": "true",
            className: "w-8.5 shrink-0 ps-2",
            children: [i, "."],
          }),
          (0, c.jsxs)("span", {
            className: "text-pretty",
            children: [
              n,
              r &&
                (0, c.jsx)("span", { "aria-hidden": "true", children: " *" }),
              a,
            ],
          }),
        ],
      });
    }
    let mW = "other";
    function mG({
      number: t,
      name: i,
      label: n,
      options: r,
      required: a,
      otherLabel: o,
    }) {
      let [u, l] = (0, f.useState)(null);
      return (0, c.jsx)(md.Root, {
        name: i,
        className: "group/choice",
        children: (0, c.jsxs)(mm.Root, {
          className: "border-b-1 border-waitlist-gray",
          render: (0, c.jsx)(mC, { value: u, onValueChange: l, required: a }),
          children: [
            (0, c.jsxs)(mm.Legend, {
              className: (0, I.cx)(
                "@container flex min-h-7 flex-wrap items-center justify-between",
                "py-[0.25em]",
                "border-b-1 border-waitlist-gray",
                "group-data-invalid/choice:bg-copper",
                "group-data-invalid/choice:[--selection-color:var(--color-copper)]",
              ),
              children: [
                (0, c.jsx)(mK, { number: t, label: n, required: a }),
                (0, c.jsx)(md.Validity, {
                  children: ({ validity: t }) =>
                    (0, c.jsx)(md.Error, {
                      className: mF,
                      children: t.valueMissing
                        ? "required"
                        : "check your answer",
                    }),
                }),
              ],
            }),
            (0, c.jsx)("div", {
              className: (0, I.cx)("flex flex-col gap-y-1.5 pt-3.25 pb-5", mM),
              onMouseDown: mL,
              children: r.map((t) => {
                let r = t === o;
                return (0, c.jsxs)(
                  md.Item,
                  {
                    className: "flex flex-col gap-y-1.5",
                    children: [
                      (0, c.jsx)(mq, { value: r ? mW : t, label: t }),
                      r &&
                        u === mW &&
                        (0, c.jsxs)(md.Root, {
                          name: `${i}Other`,
                          className: "pr-2 pl-8.5",
                          children: [
                            (0, c.jsx)(md.Control, {
                              render: (0, c.jsx)("textarea", { rows: 1 }),
                              "aria-label": `${n}: ${o} (optional)`,
                              placeholder: "Your answer (optional)",
                              enterKeyHint: "done",
                              onKeyDown: mR,
                              className: (0, I.cx)(
                                "block field-sizing-content w-full min-w-0 resize-none",
                                mJ,
                                "placeholder:text-waitlist-light-green",
                              ),
                            }),
                            (0, c.jsx)(md.Error, { className: mF }),
                          ],
                        }),
                    ],
                  },
                  t,
                );
              }),
            }),
          ],
        }),
      });
    }
    function mq({ value: t, label: i }) {
      return (0, c.jsxs)(md.Label, {
        className:
          "flex items-start gap-x-3.5 pl-2 text-pretty has-data-checked:font-semibold",
        children: [
          (0, c.jsx)(mN.Root, {
            value: t,
            className: (0, I.cx)(
              "flex size-3 shrink-0 items-center justify-center",
              "mt-[0.21875em]",
              "rounded-full border-1 border-waitlist-gray",
              "shadow-none outline-offset-2 outline-waitlist-gray",
              "focus-visible:outline-1",
            ),
            children: (0, c.jsx)(mN.Indicator, {
              className: "size-1.75 rounded-full bg-waitlist-gray",
            }),
          }),
          i,
        ],
      });
    }
    (t.s([], 325340), t.i(325340));
    let mX =
      (((o = {}).checked = "data-checked"),
      (o.unchecked = "data-unchecked"),
      (o.indeterminate = "data-indeterminate"),
      (o.disabled = "data-disabled"),
      (o.readonly = "data-readonly"),
      (o.required = "data-required"),
      (o.valid = "data-valid"),
      (o.invalid = "data-invalid"),
      (o.touched = "data-touched"),
      (o.dirty = "data-dirty"),
      (o.filled = "data-filled"),
      (o.focused = "data-focused"),
      o);
    function mH(t) {
      return f.useMemo(
        () => ({
          checked: (i) =>
            t.indeterminate
              ? {}
              : i
                ? { [mX.checked]: "" }
                : { [mX.unchecked]: "" },
          ...fC,
        }),
        [t.indeterminate],
      );
    }
    let mY = f.createContext(void 0),
      mQ = "data-parent",
      m0 = f.forwardRef(function (t, i) {
        let {
            checked: n,
            className: r,
            defaultChecked: a = !1,
            "aria-labelledby": o,
            disabled: u = !1,
            form: l,
            id: s,
            indeterminate: d = !1,
            inputRef: m,
            name: h,
            onCheckedChange: x,
            parent: k = !1,
            readOnly: I = !1,
            render: w,
            required: S = !1,
            uncheckedValue: z,
            value: O,
            nativeButton: N = !1,
            style: D,
            ...U
          } = t,
          { clearErrors: j } = $(),
          {
            disabled: A,
            name: P,
            setDirty: Z,
            setFilled: E,
            setFocused: C,
            setTouched: T,
            state: R,
            validationMode: L,
            validityData: M,
            validation: V,
          } = fL(),
          F = f9(),
          {
            labelId: J,
            controlId: B,
            registerControlId: K,
            getDescriptionProps: W,
          } = fK(),
          G = ml(),
          q = G?.parent,
          X = q && G.allValues,
          H = A || F.disabled || G?.disabled || u,
          Y = P ?? h,
          Q = O ?? Y,
          ee = (0, fJ.useBaseUiId)(),
          et = (0, fJ.useBaseUiId)(),
          ei = B;
        X ? (ei = k ? et : `${q.id}-${Q}`) : s && (ei = s);
        let en = {};
        X &&
          (k
            ? (en = G.parent.getParentProps())
            : Q && (en = G.parent.getChildProps(Q)));
        let {
            checked: er = n,
            indeterminate: ea = d,
            onCheckedChange: eo,
            ...eu
          } = en,
          el = G?.value,
          es = G?.setValue,
          ed = G?.defaultValue,
          ec = f.useRef(null),
          ef = (0, fF.useRefWithInit)(() => Symbol("checkbox-control")),
          em = f.useRef(!1),
          { getButtonProps: ep, buttonRef: ev } = (0, my.useButton)({
            disabled: H,
            native: N,
          }),
          eg = G?.validation ?? V,
          [eh, e$] = (0, mn.useControlled)({
            controlled: Q && el && !k ? el.includes(Q) : er,
            default: Q && ed && !k ? ed.includes(Q) : a,
            name: "Checkbox",
            state: "checked",
          }),
          ey = X ? !!er : eh,
          eb = (X && ea) || d;
        ((0, b.useIsoLayoutEffect)(() => {
          K !== p.NOOP && ((em.current = !0), K(ef.current, ei));
        }, [ei, K, ef]),
          f.useEffect(() => {
            let t = ef.current;
            return () => {
              em.current && K !== p.NOOP && ((em.current = !1), K(t, void 0));
            };
          }, [K, ef]),
          mr(ec, ee, eh, void 0, !G && !H, h));
        let e_ = f.useRef(null),
          ex = (0, mp.useMergedRefs)(m, e_, eg.inputRef, eg.registerInput),
          ek = mI(o, J, e_, !N, ei ?? void 0);
        ((0, b.useIsoLayoutEffect)(() => {
          e_.current && ((e_.current.indeterminate = eb), eh && E(!0));
        }, [eh, eb, E]),
          _(eh, () => {
            G || (j(Y), E(eh), Z(eh !== M.initialValue), eg.change(eh));
          }));
        let eI = (0, fq.mergeProps)(
          {
            checked: eh,
            disabled: H,
            form: l,
            name: k ? void 0 : Y,
            id: N ? void 0 : (ei ?? void 0),
            required: S,
            ref: ex,
            style: Y ? mv.visuallyHiddenInput : mv.visuallyHidden,
            tabIndex: -1,
            type: "checkbox",
            "aria-hidden": !0,
            onChange(t) {
              if (t.nativeEvent.defaultPrevented) return;
              if (I) return void t.preventDefault();
              let i = t.currentTarget.checked,
                n = (0, v.createChangeEventDetails)(
                  g.REASONS.none,
                  t.nativeEvent,
                );
              (x?.(i, n),
                n.isCanceled ||
                  (eo?.(i, n),
                  !n.isCanceled &&
                    (e$(i),
                    Q &&
                      el &&
                      es &&
                      !k &&
                      !X &&
                      es(i ? [...el, Q] : el.filter((t) => t !== Q), n))));
            },
            onFocus() {
              ec.current?.focus();
            },
          },
          void 0 !== O ? { value: (G ? eh && O : O) || "" } : p.EMPTY_OBJECT,
          W,
          (t) => eg.getValidationProps(H, t),
        );
        f.useEffect(() => {
          if (!q || !Q) return;
          let t = q.disabledStatesRef.current;
          return (
            t.set(Q, H),
            () => {
              t.delete(Q);
            }
          );
        }, [q, H, Q]);
        let ew = f.useMemo(
            () => ({
              ...R,
              checked: ey,
              disabled: H,
              readOnly: I,
              required: S,
              indeterminate: eb,
            }),
            [R, ey, H, I, S, eb],
          ),
          eS = mH(ew),
          ez = (0, y.useRenderElement)("span", t, {
            state: ew,
            ref: [ev, ec, i, G?.registerControlRef],
            props: [
              {
                id: N ? (ei ?? void 0) : ee,
                role: "checkbox",
                "aria-checked": eb ? "mixed" : ey,
                "aria-readonly": I || void 0,
                "aria-required": S || void 0,
                "aria-labelledby": ek,
                [mQ]: k ? "" : void 0,
                onFocus() {
                  H || C(!0);
                },
                onBlur() {
                  let t = e_.current;
                  t &&
                    (T(!0),
                    C(!1),
                    "onBlur" === L && eg.commit(G ? el : t.checked));
                },
                onKeyDown(t) {
                  if (
                    "Enter" !== t.key ||
                    (t.preventBaseUIHandler(), t.defaultPrevented)
                  )
                    return;
                  let i = e_.current?.form ?? null,
                    n = t.currentTarget,
                    r = t.nativeEvent,
                    a = t.preventDefault,
                    o = r.preventDefault,
                    u = !1;
                  ((t.preventDefault = () => {
                    ((u = !0), a.call(t));
                  }),
                    (r.preventDefault = () => {
                      ((u = !0), o.call(r));
                    }),
                    o.call(r),
                    (0, mg.ownerWindow)(n).queueMicrotask(() => {
                      ((t.preventDefault = a),
                        (r.preventDefault = o),
                        u ||
                          (function (t) {
                            if (!t) return null;
                            for (let i of t.elements) {
                              let t = i.tagName;
                              if (
                                ("BUTTON" === t || "INPUT" === t) &&
                                "submit" === i.type
                              )
                                return i;
                            }
                            return null;
                          })(i)?.click());
                    }));
                },
                onClick(t) {
                  if (I || H) return;
                  t.preventDefault();
                  let i = e_.current;
                  i &&
                    i.dispatchEvent(
                      new ((0, mg.ownerWindow)(i).PointerEvent)("click", {
                        bubbles: !0,
                        shiftKey: t.shiftKey,
                        ctrlKey: t.ctrlKey,
                        altKey: t.altKey,
                        metaKey: t.metaKey,
                      }),
                    );
                },
              },
              U,
              eu,
              ep,
              W,
              (t) => eg.getValidationProps(H, t),
            ],
            stateAttributesMapping: eS,
          });
        return (0, c.jsxs)(mY.Provider, {
          value: ew,
          children: [
            ez,
            !eh &&
              !G &&
              Y &&
              !k &&
              void 0 !== z &&
              (0, c.jsx)("input", {
                type: "hidden",
                form: l,
                name: Y,
                value: z,
                disabled: H,
              }),
            (0, c.jsx)("input", { ...eI, suppressHydrationWarning: !0 }),
          ],
        });
      }),
      m1 = f.forwardRef(function (t, i) {
        let {
            render: n,
            className: r,
            style: a,
            keepMounted: o = !1,
            ...u
          } = t,
          l = (function () {
            let t = f.useContext(mY);
            if (void 0 === t) throw Error((0, fU.default)(14));
            return t;
          })(),
          s = l.checked || l.indeterminate,
          {
            mounted: d,
            transitionStatus: c,
            setMounted: m,
          } = (0, f8.useTransitionStatus)(s),
          p = f.useRef(null),
          v = { ...l, transitionStatus: c };
        (0, f3.useOpenChangeComplete)({
          open: s,
          ref: p,
          onComplete() {
            s || m(!1);
          },
        });
        let g = { ...mH(l), ...f7.transitionStatusMapping, ...fC },
          h = (0, y.useRenderElement)("span", t, {
            ref: [i, p],
            state: v,
            stateAttributesMapping: g,
            props: u,
          });
        return o || d ? h : null;
      });
    t.s(["Indicator", 0, m1, "Root", 0, m0], 898145);
    var m4 = t.i(898145),
      m4 = m4;
    let m6 = [],
      m2 = f.forwardRef(function (t, i) {
        let {
            allValues: n,
            className: r,
            defaultValue: a,
            disabled: o = !1,
            id: u,
            onValueChange: l,
            render: s,
            value: d,
            style: v,
            ...g
          } = t,
          {
            disabled: h,
            name: b,
            state: x,
            validation: k,
            setFilled: I,
            setDirty: w,
            validityData: S,
          } = fL(),
          { labelId: z, getDescriptionProps: O } = fK(),
          { clearErrors: N } = $(),
          D = h || o,
          U = f.useMemo(() => {
            if (void 0 === d) return a ?? [];
          }, [d, a]),
          [j, A] = (0, mn.useControlled)({
            controlled: d,
            default: U,
            name: "CheckboxGroup",
            state: "value",
          }),
          P = (0, m.useStableCallback)((t, i) => {
            (l?.(t, i), i.isCanceled || A(t));
          }),
          Z = (function (t) {
            let { allValues: i = m6, value: n = m6, onValueChange: r } = t,
              a = f.useRef(n),
              o = f.useRef(new Map()),
              [u, l] = f.useState("mixed"),
              s = (0, fJ.useBaseUiId)(),
              d = n.length === i.length,
              c = n.length !== i.length && n.length > 0,
              p = (0, m.useStableCallback)(r),
              v = f.useCallback(
                () => ({
                  id: s,
                  indeterminate: c,
                  checked: d,
                  "aria-controls": i.map((t) => `${s}-${t}`).join(" "),
                  onCheckedChange(t, r) {
                    let s = a.current,
                      d = i.filter((t) => o.current.get(t) && s.includes(t)),
                      c = i.filter(
                        (t) =>
                          !o.current.get(t) ||
                          (o.current.get(t) && s.includes(t)),
                      );
                    if (s.length === c.length || 0 === s.length)
                      return void (n.length === c.length ? p(d, r) : p(c, r));
                    let f = "mixed",
                      m = s;
                    ("mixed" === u
                      ? ((f = "on"), (m = c))
                      : "on" === u && ((f = "off"), (m = d)),
                      p(m, r),
                      r.isCanceled || l(f));
                  },
                }),
                [i, d, s, c, p, u, n.length],
              ),
              g = f.useCallback(
                (t) => ({
                  checked: n.includes(t),
                  onCheckedChange(i, r) {
                    let o = n.slice();
                    (i ? o.push(t) : o.splice(o.indexOf(t), 1),
                      p(o, r),
                      r.isCanceled || ((a.current = o), l("mixed")));
                  },
                }),
                [p, n],
              );
            return f.useMemo(
              () => ({
                id: s,
                indeterminate: c,
                getParentProps: v,
                getChildProps: g,
                disabledStatesRef: o,
              }),
              [s, c, v, g],
            );
          })({ allValues: n, value: j, onValueChange: P }),
          E = (0, fJ.useBaseUiId)(u),
          C = f.useRef(null),
          T = f.useCallback((t) => {
            null != C.current ||
              null == t ||
              t.hasAttribute(mQ) ||
              (C.current = t);
          }, []);
        mr(C, E, j, void 0, !!b && !D, b);
        let R = j ?? p.EMPTY_ARRAY;
        _(R, () => {
          b && N(b);
          let t = Array.isArray(S.initialValue)
            ? S.initialValue
            : p.EMPTY_ARRAY;
          (I(R.length > 0),
            w(
              !(function (t, i, n = (t, i) => t === i) {
                return t.length === i.length && t.every((t, r) => n(t, i[r]));
              })(R, t),
            ),
            k.change(R));
        });
        let L = { ...x, disabled: D },
          M = f.useMemo(
            () => ({
              allValues: n,
              value: j,
              defaultValue: U,
              setValue: P,
              parent: Z,
              disabled: D,
              validation: k,
              registerControlRef: T,
            }),
            [n, j, U, P, Z, D, k, T],
          ),
          V = (0, y.useRenderElement)("div", t, {
            state: L,
            ref: i,
            props: [{ id: u, role: "group", "aria-labelledby": z }, g, O],
            stateAttributesMapping: fC,
          });
        return (0, c.jsx)(mu.Provider, { value: M, children: V });
      });
    var md = md,
      mm = mm;
    function m9({ number: t }) {
      let [i, n] = (0, f.useState)([]);
      return (0, c.jsx)(md.Root, {
        name: "aiUsage",
        className: "group/choice",
        validate: (t) =>
          Array.isArray(t) && t.length > 0 ? null : "choose at least one",
        children: (0, c.jsxs)(mm.Root, {
          className: "border-b-1 border-waitlist-gray",
          render: (0, c.jsx)(m2, {
            value: i,
            onValueChange: (t) => {
              n(
                t.includes(O) && !i.includes(O)
                  ? [O]
                  : t.filter((t) => t !== O),
              );
            },
          }),
          children: [
            (0, c.jsxs)(mm.Legend, {
              className: (0, I.cx)(
                "flex min-h-7 flex-wrap items-center justify-between gap-x-2",
                "py-[0.25em]",
                "@container",
                "border-b-1 border-waitlist-gray",
                "group-data-invalid/choice:bg-copper",
                "group-data-invalid/choice:[--selection-color:var(--color-copper)]",
              ),
              children: [
                (0, c.jsx)(mK, {
                  number: t,
                  label: "How is your sales team using AI today?",
                  required: !0,
                  hint: (0, c.jsx)("span", {
                    "aria-hidden": "true",
                    className:
                      "text-white/60 group-data-invalid/choice:hidden @min-[29em]:hidden",
                    children: " (Select all that apply)",
                  }),
                }),
                (0, c.jsx)(md.Description, {
                  className:
                    "ml-auto pr-2 text-white/60 group-data-invalid/choice:hidden @max-[29em]:hidden",
                  children: "Select all that apply",
                }),
                (0, c.jsx)(md.Error, { className: mF }),
              ],
            }),
            (0, c.jsx)("div", {
              className: (0, I.cx)("flex flex-col gap-y-1.5 pt-3.25 pb-5", mM),
              onMouseDown: mL,
              children: N.map((t) =>
                (0, c.jsxs)(
                  md.Item,
                  {
                    className: "flex flex-col gap-y-1.5",
                    children: [
                      (0, c.jsxs)(md.Label, {
                        className:
                          "flex items-start gap-x-3.5 pl-2 text-pretty has-data-checked:font-semibold",
                        children: [
                          (0, c.jsx)(m4.Root, {
                            value: t,
                            className: (0, I.cx)(
                              "relative mt-[0.21875em] flex size-3 shrink-0 items-center justify-center",
                              "rounded-[0.125em] border-1 border-waitlist-gray",
                              "shadow-none outline-offset-2 outline-waitlist-gray",
                              "focus-visible:outline-1",
                            ),
                            children: (0, c.jsx)(m4.Indicator, {
                              className: "absolute -inset-px",
                              children: (0, c.jsx)(m5, {
                                className: "size-full",
                              }),
                            }),
                          }),
                          t,
                        ],
                      }),
                      "Something else" === t &&
                        i.includes(t) &&
                        (0, c.jsxs)(md.Root, {
                          name: "aiUsageOther",
                          className: "ps-8.5 pe-2",
                          children: [
                            (0, c.jsx)(md.Control, {
                              render: (0, c.jsx)("textarea", { rows: 1 }),
                              "aria-label":
                                "AI usage: Something else (optional)",
                              placeholder: "Your answer (optional)",
                              enterKeyHint: "done",
                              onKeyDown: mR,
                              className: (0, I.cx)(
                                "block field-sizing-content w-full min-w-0 resize-none",
                                mJ,
                                "placeholder:text-waitlist-light-green",
                              ),
                            }),
                            (0, c.jsx)(md.Error, { className: mF }),
                          ],
                        }),
                    ],
                  },
                  t,
                ),
              ),
            }),
          ],
        }),
      });
    }
    function m5({ className: t }) {
      let i = (0, f.useId)();
      return (0, c.jsxs)("svg", {
        "aria-hidden": "true",
        viewBox: "0 0 12 12",
        className: t,
        children: [
          (0, c.jsxs)("mask", {
            id: i,
            children: [
              (0, c.jsx)("rect", { width: "12", height: "12", fill: "white" }),
              (0, c.jsx)("path", {
                d: "M2.5 6.25 4.85 8.6 9.5 3.4",
                fill: "none",
                stroke: "black",
                strokeWidth: "1.5",
                strokeLinecap: "square",
              }),
            ],
          }),
          (0, c.jsx)("rect", {
            width: "12",
            height: "12",
            rx: "2",
            fill: "currentColor",
            mask: `url(#${i})`,
          }),
        ],
      });
    }
    var m3 = t.i(15077),
      m7 = t.i(130154),
      m8 = t.i(906564),
      pe = t.i(923314);
    function pt({ className: t, render: i }) {
      return (0, m7.useRender)({
        render: i ?? (0, c.jsx)(m3.default, { href: pe.SIGN_UP_HOME_HREF }),
        props: {
          className: (0, I.cx)(
            "flex w-fit items-center gap-1.5",
            "-mx-2 -my-3 px-2 py-3",
            t,
          ),
          children: (0, c.jsxs)(c.Fragment, {
            children: [
              (0, c.jsx)(m8.Glyph, {
                className: "h-3 w-3.5",
                children: (0, c.jsx)(pi, { className: "size-full" }),
              }),
              "Back",
            ],
          }),
        },
      });
    }
    function pi({ className: t }) {
      return (0, c.jsx)("svg", {
        "aria-hidden": "true",
        viewBox: "0 0 14 12",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "1.5",
        overflow: "visible",
        className: t,
        children: (0, c.jsx)("path", { d: "M14 6H0M6.5 12 0 6l6.5-6" }),
      });
    }
    var pn = t.i(819622),
      pr = t.i(292139),
      pa = t.i(516437),
      po = t.i(207496);
    let pu = { duration: 0.75, ease: [0.23, 1, 0.32, 1] },
      pl = { duration: 0.4, ease: [0.23, 1, 0.32, 1] };
    function ps({ className: t }) {
      let i = (0, pn.useReducedMotion)() ?? !1,
        [n, r] = (0, f.useState)(!0);
      return (
        (0, f.useEffect)(() => {
          if (i) return;
          let t = window.setTimeout(
            () => r((t) => !t),
            n ? 1500 : 1e3 * pu.duration + 400,
          );
          return () => window.clearTimeout(t);
        }, [n, i]),
        (0, c.jsx)(po.HomeFunProvider, {
          children: (0, c.jsx)(pa.HomeFunAnimation, {
            className: t,
            state: pr.HomeFunState.Boom,
            labels: !1,
            still: i,
            logoStill: !0,
            boomRings: n || i,
            boomExit: pu,
            boomEnterOpacity: pl,
            colors: { line: "#E0E0E0", fill: "#117025" },
          }),
        })
      );
    }
    let pd = ({ className: t }) =>
        (0, c.jsx)("svg", {
          className: t,
          width: "32",
          height: "16",
          fill: "none",
          viewBox: "0 0 32 16",
          children: (0, c.jsx)("path", {
            fill: "#117025",
            d: "M28.58.029c-2.37-.295-5.59 1.695-8.004 4.723a.39.39 0 0 1-.688-.179c-.21-1.257-.949-2.104-2.181-2.258-1.89-.235-4.411 1.226-6.42 3.521a.39.39 0 0 1-.675-.188c-.2-1.106-.864-1.849-1.959-1.985-2.31-.287-5.668 2.236-7.499 5.637s-1.441 6.39.87 6.677c1.596.2 3.692-.944 5.439-2.791a.39.39 0 0 1 .67.23c.137 1.423.892 2.393 2.22 2.559 1.87.233 4.358-1.194 6.355-3.448a.39.39 0 0 1 .68.237c.1 1.78.99 3.006 2.61 3.207 2.99.372 7.337-2.895 9.707-7.297S31.571.401 28.58.03",
          }),
        }),
      pc = f.createContext(void 0);
    var pf = t.i(559175);
    let pm = f.createContext(void 0),
      pp =
        (((u = {}).disabled = "data-disabled"),
        (u.orientation = "data-orientation"),
        (u.multiple = "data-multiple"),
        u),
      pv = { multiple: (t) => (t ? { [pp.multiple]: "" } : null) },
      pg = f.forwardRef(function (t, i) {
        let {
            render: n,
            className: r,
            disabled: a = !1,
            focusableWhenDisabled: o = !1,
            nativeButton: u = !0,
            style: l,
            ...s
          } = t,
          { getButtonProps: d, buttonRef: c } = (0, my.useButton)({
            disabled: a,
            focusableWhenDisabled: o,
            native: u,
          });
        return (0, y.useRenderElement)("button", t, {
          state: { disabled: a },
          ref: [i, c],
          props: [s, d],
        });
      }),
      ph = `${mV} opacity-50`;
    function p$({ status: t, bookingUrl: i, onDone: n }) {
      let r = (0, f.useRef)(null);
      return (
        (0, f.useEffect)(() => {
          "idle" !== t && r.current?.focus();
        }, [t]),
        (0, c.jsxs)("div", {
          ref: r,
          tabIndex: -1,
          className:
            "flex items-center justify-end gap-3.75 pe-2 pt-5.5 outline-none",
          children: [
            (0, c.jsx)("p", {
              role: "status",
              "aria-live": "polite",
              className: (0, I.cx)(
                "min-w-0 flex-1 text-right text-waitlist-feedback",
                "sending" === t && "sr-only",
              ),
              children: {
                idle: "",
                sending: "Submitting…",
                received: i
                  ? "Thank you! You sound like a great fit."
                  : "Thank you! We’ll be in touch.",
                error: "Something went wrong.",
              }[t],
            }),
            (0, c.jsxs)("div", {
              className: "shrink-0",
              children: [
                "idle" === t &&
                  (0, c.jsx)(pg, {
                    type: "submit",
                    className: mV,
                    children: "Submit",
                  }),
                "sending" === t &&
                  (0, c.jsx)(pg, {
                    type: "button",
                    disabled: !0,
                    className: ph,
                    children: "Submitting…",
                  }),
                "received" === t &&
                  (i
                    ? (0, c.jsx)("a", {
                        href: i,
                        className: (0, I.cx)("block", ph),
                        children: "Redirecting…",
                      })
                    : (0, c.jsx)(pg, {
                        type: "button",
                        className: mV,
                        onClick: n,
                        children: "Close",
                      })),
                "error" === t &&
                  (0, c.jsx)(pg, {
                    type: "submit",
                    className: mV,
                    children: "Try again",
                  }),
              ],
            }),
          ],
        })
      );
    }
    var md = md;
    function py({
      number: t,
      name: i,
      label: n,
      required: r,
      type: a = "text",
      placeholder: o,
      autoComplete: u,
      autoCapitalize: l,
      autoCorrect: s,
      spellCheck: d,
      enterKeyHint: f = "next",
    }) {
      return (0, c.jsxs)(md.Root, {
        name: i,
        className: (0, I.cx)(
          "@container flex min-h-7 flex-wrap items-center",
          "py-[0.25em]",
          "border-b-1 border-waitlist-gray",
          mM,
          "data-invalid:bg-copper data-invalid:focus-within:bg-copper data-invalid:[--selection-color:var(--color-copper)]",
        ),
        children: [
          (0, c.jsx)(md.Label, {
            className: "mr-2 min-w-32 shrink-0",
            children: (0, c.jsx)(mK, { number: t, label: n, required: r }),
          }),
          (0, c.jsx)(md.Control, {
            type: a,
            required: r,
            placeholder: o,
            autoComplete: u,
            autoCapitalize: l,
            autoCorrect: s,
            spellCheck: d,
            enterKeyHint: f,
            onKeyDown: mR,
            className: (0, I.cx)(
              "min-w-0 flex-1 self-stretch",
              mB,
              "placeholder:text-waitlist-light-green",
              "in-data-invalid:placeholder:text-waitlist-gray/70",
            ),
          }),
          (0, c.jsx)(md.Validity, {
            children: ({ validity: t }) => {
              let i = "check your answer";
              return (
                t.valueMissing
                  ? (i = "required")
                  : t.typeMismatch &&
                    (i = "email" === a ? "check the email" : "check the link"),
                (0, c.jsx)(md.Error, { className: mF, children: i })
              );
            },
          }),
        ],
      });
    }
    let pb = {
      idle: "confirm",
      sending: "blocked",
      received: "free",
      error: "confirm",
    };
    function p_() {
      return (0, c.jsxs)(c.Fragment, {
        children: [
          (0, c.jsx)(py, {
            number: 1,
            name: "name",
            label: "Name",
            placeholder: "Your name",
            autoComplete: "name",
            required: !0,
          }),
          (0, c.jsx)(py, {
            number: 2,
            name: "email",
            label: "Work email",
            type: "email",
            placeholder: "Your work email",
            autoComplete: "email",
            required: !0,
          }),
          (0, c.jsx)(py, {
            number: 3,
            name: "socialHandle",
            label: "Social handle",
            placeholder: "LinkedIn or X",
            autoCapitalize: "none",
            autoCorrect: "off",
            spellCheck: !1,
            enterKeyHint: "done",
          }),
          (0, c.jsx)(mG, {
            number: 4,
            name: "role",
            label: "Your role",
            options: w,
            otherLabel: "Other",
            required: !0,
          }),
          (0, c.jsx)(mG, {
            number: 5,
            name: "salesTeamSize",
            label: "How many people sell at your company?",
            options: S,
            required: !0,
          }),
          (0, c.jsx)(m9, { number: 6 }),
          (0, c.jsx)(mG, {
            number: 7,
            name: "dealChallenge",
            label:
              "What's the hardest part of keeping your deals moving right now?",
            options: z,
            otherLabel: "Something else",
            required: !0,
          }),
        ],
      });
    }
    t.s(
      [
        "SignUpForm",
        0,
        function ({
          ref: t,
          className: i,
          closeRender: n,
          closing: r = !1,
          onSubmitted: a,
          onDismissalChange: o,
        }) {
          let u = (0, k.useRouter)(),
            [l, s] = (0, f.useState)(0),
            [d, m] = (0, f.useState)("idle"),
            [p, v] = (0, f.useState)(null),
            g = "blocked" === pb[d],
            h = "sending" === d || "received" === d,
            $ = (0, f.useRef)(null),
            y = (0, f.useRef)(null),
            [b, _] = (0, f.useState)({}),
            w = (0, f.useRef)(U),
            S = (0, f.useRef)(0),
            [z, O] = (0, f.useState)(null),
            N = (0, f.useRef)(null),
            D = (0, f.useRef)(null),
            [j, A] = (0, f.useState)(0);
          ((0, f.useEffect)(() => {
            o?.(pb[d]);
          }, [d, o]),
            (0, f.useEffect)(() => {
              if (r || "received" !== d || !p) return;
              let t = window.setTimeout(() => window.location.assign(p), 2400);
              return () => window.clearTimeout(t);
            }, [r, d, p, l]));
          let P = async (t, i = U) => {
              var n;
              let r,
                a,
                o = ++S.current;
              (($.current = t),
                (w.current = i),
                (n = y.current),
                (a = (r = fD.safeParse(t)).success ? r.data : t),
                (y.current =
                  n && JSON.stringify(n.answers) === JSON.stringify(a)
                    ? n
                    : { submissionId: crypto.randomUUID(), answers: a }),
                _({}),
                s((t) => t + 1),
                v(null),
                O(null),
                m("sending"));
              try {
                let t = await i(y.current);
                if (o !== S.current) return;
                if ("invalid" === t.status) {
                  (_(t.errors),
                    m("idle"),
                    requestAnimationFrame(() =>
                      D.current
                        ?.querySelector('[aria-invalid="true"]')
                        ?.focus(),
                    ));
                  return;
                }
                if ("accepted" !== t.status) return void m("error");
                (v(t.bookingUrl), m("received"));
              } catch (t) {
                (console.error("Sign-up failed", t),
                  o === S.current && m("error"));
              }
            },
            Z = (0, f.useRef)(null);
          return (0, c.jsxs)(c.Fragment, {
            children: [
              (0, c.jsxs)(x, {
                ref: t,
                actionsRef: N,
                "aria-labelledby": "sign-up-title",
                className: (0, I.cx)(
                  "px-4 pt-3.75 pb-6.75",
                  "rounded-[1px] border-1 border-waitlist-gray bg-waitlist-dark-green",
                  "leading-[1.1875em] text-waitlist-gray",
                  "[--spacing:0.25em]",
                  "text-[1.0625rem] md:text-[1rem]",
                  "font-features-['liga'_off,'lnum','pnum']",
                  "md:px-8.75 md:pt-8",
                  "[--selection-background:white]",
                  "[--selection-color:var(--color-waitlist-dark-green)]",
                  "relative",
                  i,
                ),
                errors: b,
                onFormSubmit: (t) => P(t, "error" === d ? w.current : void 0),
                children: [
                  (0, c.jsxs)("div", {
                    className:
                      "mb-3 flex items-center justify-between ps-1 pe-[0.835em]",
                    children: [
                      (0, c.jsx)("div", {
                        inert: g,
                        children: (0, c.jsx)(pt, { render: n }),
                      }),
                      (0, c.jsx)("span", {
                        "aria-hidden": "true",
                        className: "flex",
                        children: (0, c.jsx)(pd, {
                          className:
                            "h-[0.8013em] w-[1.6026em] [&_path]:fill-waitlist-gray",
                        }),
                      }),
                    ],
                  }),
                  (0, c.jsx)("div", {
                    className: "min-h-5.75 border-y-1 border-waitlist-gray",
                    children: (0, c.jsx)("h1", {
                      id: "sign-up-title",
                      className: (0, I.cx)(
                        "text-[1.125em] leading-[calc(21/18)] text-balance",
                        "ps-2 md:px-2 md:text-center",
                      ),
                      children: "First, tell us a bit about you",
                    }),
                  }),
                  (0, c.jsx)("div", {
                    className: (0, I.cx)(
                      "received" === d && "cursor-not-allowed",
                    ),
                    children: (0, c.jsx)(
                      "div",
                      {
                        ref: D,
                        inert: h,
                        "aria-busy": g,
                        children: (0, c.jsx)(p_, {}),
                      },
                      j,
                    ),
                  }),
                  (0, c.jsx)(p$, {
                    status: d,
                    bookingUrl: p,
                    onDone: () => {
                      a ? a() : u.push(pe.SIGN_UP_HOME_HREF);
                    },
                  }),
                  g &&
                    (0, c.jsx)("div", {
                      "aria-hidden": "true",
                      className: (0, I.cx)(
                        "absolute -inset-px cursor-wait",
                        "rounded-[1px] border-1 border-waitlist-gray bg-[rgb(41_33_30/0.3)]",
                      ),
                      children: (0, c.jsx)(ps, {
                        className:
                          "fixed top-1/2 left-1/2 h-auto w-[14.34em] -translate-1/2",
                      }),
                    }),
                ],
              }),
              !1,
            ],
          });
        },
      ],
      332253,
    );
  },
  675325,
  (t) => {
    "use strict";
    var i = t.i(619882),
      n = t.i(155172),
      r = t.i(267579),
      a = t.i(694706),
      o = t.i(927612);
    let u = function (t) {
        return (0, i.jsx)(a.Dialog.Root, { ...t, modal: !0 });
      },
      l = function ({ className: t, ...n }) {
        return (0, i.jsxs)(a.Dialog.Portal, {
          children: [
            (0, i.jsx)(a.Dialog.Backdrop, {
              forceRender: !0,
              className:
                "fixed inset-0 z-(--z-dialog) before:absolute before:inset-0 before:bg-black/50 before:content-['']",
            }),
            (0, i.jsx)(a.Dialog.Popup, {
              role: "alertdialog",
              className: (0, o.cx)(
                "fixed z-(--z-dialog) flex flex-col gap-y-5 outline-none",
                "rounded-[1px] border-1 border-waitlist-dark-green bg-waitlist-paper",
                "[--selection-background:var(--color-waitlist-dark-green)]",
                "[--selection-color:var(--color-waitlist-paper)]",
                "font-denim text-[1rem] leading-[1.1875em] text-waitlist-dark-green [--spacing:0.25em]",
                "font-features-['liga'_off,'lnum','pnum']",
                "p-7",
                "inset-x-[0.75rem] bottom-[max(0.75rem,env(safe-area-inset-bottom,0px))] mx-auto max-w-[28rem]",
                "md:inset-0 md:m-auto md:h-fit md:max-w-[25rem]",
                t,
              ),
              ...n,
            }),
          ],
        });
      },
      s = function ({ className: t, ...n }) {
        return (0, i.jsx)(a.Dialog.Title, {
          className: (0, o.cx)(
            "text-[1.125em] leading-[calc(21/18)] text-pretty",
            t,
          ),
          ...n,
        });
      },
      d = function ({ className: t, ...n }) {
        return (0, i.jsx)(a.Dialog.Description, {
          className: (0, o.cx)("-mt-3.5 text-pretty", t),
          ...n,
        });
      },
      c = function ({ className: t, ...n }) {
        return (0, i.jsx)("div", {
          className: (0, o.cx)(
            "grid auto-cols-fr grid-flow-col gap-x-2",
            "md:flex md:justify-end",
            t,
          ),
          ...n,
        });
      },
      f = function ({ className: t, variant: n = "outline", ...r }) {
        return (0, i.jsx)(a.Dialog.Close, {
          className: (0, o.cx)(
            "px-[0.75em] py-[calc(6.5em/18)]",
            "rounded-[calc(12em/18)] border-[1.5px] border-waitlist-dark-green",
            "text-[1.125em] leading-[calc(21/18)]",
            "focus-visible:shadow-[0_0_0_2px_var(--color-waitlist-paper),0_0_0_4px_var(--color-waitlist-dark-green)]",
            "solid" === n && [
              "bg-waitlist-dark-green text-waitlist-paper",
              "[--selection-background:var(--color-waitlist-paper)] [--selection-color:var(--color-waitlist-dark-green)]",
            ],
            t,
          ),
          ...r,
        });
      };
    var m = t.i(923314);
    let p = "signUpCloseGuard";
    function v() {
      return !!window.history.state?.[p];
    }
    function g() {
      v() || window.history.pushState({ ...window.history.state, [p]: !0 }, "");
    }
    t.s(
      [
        "useSignUpCloseConfirm",
        0,
        function ({ onBack: t, dismissal: a = "confirm" }) {
          let o = (0, r.useRouter)(),
            [p, h] = (0, n.useState)(null),
            $ = (0, n.useRef)(!1),
            y = (0, n.useRef)(t);
          y.current = t;
// --- confirm-close dialog + useSignUpCloseConfirm (lines 24030-24150)
            "grid auto-cols-fr grid-flow-col gap-x-2",
            "md:flex md:justify-end",
            t,
          ),
          ...n,
        });
      },
      f = function ({ className: t, variant: n = "outline", ...r }) {
        return (0, i.jsx)(a.Dialog.Close, {
          className: (0, o.cx)(
            "px-[0.75em] py-[calc(6.5em/18)]",
            "rounded-[calc(12em/18)] border-[1.5px] border-waitlist-dark-green",
            "text-[1.125em] leading-[calc(21/18)]",
            "focus-visible:shadow-[0_0_0_2px_var(--color-waitlist-paper),0_0_0_4px_var(--color-waitlist-dark-green)]",
            "solid" === n && [
              "bg-waitlist-dark-green text-waitlist-paper",
              "[--selection-background:var(--color-waitlist-paper)] [--selection-color:var(--color-waitlist-dark-green)]",
            ],
            t,
          ),
          ...r,
        });
      };
    var m = t.i(923314);
    let p = "signUpCloseGuard";
    function v() {
      return !!window.history.state?.[p];
    }
    function g() {
      v() || window.history.pushState({ ...window.history.state, [p]: !0 }, "");
    }
    t.s(
      [
        "useSignUpCloseConfirm",
        0,
        function ({ onBack: t, dismissal: a = "confirm" }) {
          let o = (0, r.useRouter)(),
            [p, h] = (0, n.useState)(null),
            $ = (0, n.useRef)(!1),
            y = (0, n.useRef)(t);
          y.current = t;
          let b = (0, n.useRef)(a);
          b.current = a;
          let [_, x] = (0, n.useState)(null);
          return (
            (0, n.useEffect)(() => {
              if (null === _) return;
              let t = () => {
                window.scrollY !== _ &&
                  window.scrollTo({ top: _, behavior: "instant" });
              };
              return (
                t(),
                window.addEventListener("scroll", t),
                () => window.removeEventListener("scroll", t)
              );
            }, [_]),
            (0, n.useEffect)(() => {
              g();
              let t = () => {
                if (!v() && !$.current) {
                  if ("free" === b.current) {
                    (($.current = !0), y.current());
                    return;
                  }
                  (g(),
                    "blocked" !== b.current &&
                      (x(window.scrollY), h(() => y.current)));
                }
              };
              return (
                window.addEventListener("popstate", t),
                () => window.removeEventListener("popstate", t)
              );
            }, []),
            {
              confirming: null !== p,
              confirmClose(t) {
                if ("blocked" !== b.current) {
                  if ("free" === b.current) {
                    (($.current = !0), t());
                    return;
                  }
                  h(() => t);
                }
              },
              back() {
                (($.current = !0), window.history.go(v() ? -2 : -1));
              },
              home() {
                (($.current = !0),
                  v()
                    ? o.replace(m.SIGN_UP_HOME_HREF)
                    : o.push(m.SIGN_UP_HOME_HREF));
              },
              confirmDialog: (0, i.jsx)(u, {
                open: null !== p,
                onOpenChange: (t) => {
                  t || (h(null), x(null));
                },
                children: (0, i.jsxs)(l, {
                  children: [
                    (0, i.jsx)(s, { children: "Leave this form?" }),
                    (0, i.jsx)(d, {
                      children: "Anything you've entered won't be saved.",
                    }),
                    (0, i.jsxs)(c, {
                      children: [
                        (0, i.jsx)(f, { children: "Keep editing" }),
                        (0, i.jsx)(f, {
                          variant: "solid",
                          onClick: () => {
                            (($.current = !0), p?.());
                          },
                          children: "Leave",
                        }),
                      ],
                    }),
                  ],
                }),
              }),

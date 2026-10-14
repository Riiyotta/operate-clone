#!/usr/bin/env bash
# Proves verify_all.py actually catches drift: for each injected defect, copy the repo to a scratch dir,
# mutate it, and require verify_all.py to FAIL; then require the unmodified repo to PASS.
# Usage: extraction/prove_drift.sh [SOURCE_ROOT]   (SOURCE_ROOT = the source project; default: parent of the repo;
#        citation/quote mutations are skipped with a notice when no source tree is available)
set -u
REPO="$(cd "$(dirname "$0")/.." && pwd)"
SRC="${1:-${DESIGN_REPO_SOURCE_ROOT:-$(dirname "$REPO")}}"
HAVE_SRC=0; [ -f "$SRC/CLONE_SPEC.md" ] && HAVE_SRC=1
PY="${PYTHON:-python3}"
RESULT=0
run_case() { # name, python mutation snippet (operates on $R)
  local name="$1" snippet="$2" tmp; tmp="$(mktemp -d)"
  cp -R "$REPO" "$tmp/design-repo"
  R="$tmp/design-repo" "$PY" -c "$snippet" || { echo "SETUP-FAIL  $name"; RESULT=1; rm -rf "$tmp"; return; }
  if [ "$HAVE_SRC" = 1 ]; then "$PY" "$tmp/design-repo/extraction/verify_all.py" --source-root "$SRC" >/dev/null 2>&1; else "$PY" "$tmp/design-repo/extraction/verify_all.py" >/dev/null 2>&1; fi
  if [ $? -ne 0 ]; then echo "CAUGHT  $name"; else echo "MISSED  $name  (verify_all.py did not fail!)"; RESULT=1; fi
  rm -rf "$tmp"
}
J='import json,os;R=os.environ["R"]
def rd(p): return json.load(open(os.path.join(R,p)))
def wr(p,o): json.dump(o,open(os.path.join(R,p),"w"),indent=2)
'
run_case "phantom allowlist entry (section with no contract file)" "$J
a=rd('tokens/llm/component-allowlist.json');a['sections'].append('hero.phantom');wr('tokens/llm/component-allowlist.json',a)"
run_case "orphan contract file (no allowlist entry)" "$J
a=rd('tokens/llm/component-allowlist.json');a['primitives'].remove('button');wr('tokens/llm/component-allowlist.json',a)"
run_case "wrong manifest count" "$J
m=rd('registry.manifest.json');m['counts']['sections']+=1;wr('registry.manifest.json',m)"
run_case "allowlistVersion drift" "$J
m=rd('registry.manifest.json');m['allowlistVersion']='9.9.9';wr('registry.manifest.json',m)"
run_case "pinned policy changed to a different-but-valid value" "$J
a=rd('assets/asset-roles.json');a['roles']['lightbox-video-stream']['generationPolicy']='may-generate-new';wr('assets/asset-roles.json',a)"
run_case "schema assetRole enum drifts from the registry" "$J
s=rd('schema/pagespec.schema.json');s['definitions']['assetRole']['enum'].append('image');wr('schema/pagespec.schema.json',s)"
run_case "schema motion opened (additionalProperties true)" "$J
s=rd('schema/pagespec.schema.json');s['definitions']['motion']['additionalProperties']=True;wr('schema/pagespec.schema.json',s)"
run_case "section contract edited without regenerating the schema branch" "$J
p='sections/hero.headline-integrations.json';d=rd(p);d['content']['properties']['headline']['x-maxWords']=99;wr(p,d)"
run_case "token catalog lists a phantom token" "$J
c=rd('tokens/llm/token-catalog.json');c['tokens']['color'].append('color.green.phantom');wr('tokens/llm/token-catalog.json',c)"
run_case "absolute local path introduced" "$J
open(os.path.join(R,'README.md'),'a').write('\n/Us'+'ers/someone/design-repo\n')"
run_case "entryPoint escaping the package" "$J
m=rd('registry.manifest.json');m['entryPoints']['evidence']='../ia.json';wr('registry.manifest.json',m)"
if [ "$HAVE_SRC" = 1 ]; then
  run_case "out-of-range citation" "$J
p='sections/hero.headline-integrations.json';d=rd(p);d['measuredFrom'].append('src/components/Hero.jsx:9999');wr(p,d)"
  run_case "in-range citation whose quoted text is no longer on that line" "$J
m=rd('extraction/measured-values.json');m['spotChecks'][0]['quote']='this text is not in the cited line';wr('extraction/measured-values.json',m)"
  run_case "citation to a file that does not exist" "$J
p='sections/shell.binder-rails.json';d=rd(p);d['measuredFrom'].append('src/nope.jsx:1');wr(p,d)"
else
  echo "SKIPPED  citation mutations (no source tree at: $SRC)"
fi
# unmodified repo must pass
if [ "$HAVE_SRC" = 1 ]; then "$PY" "$REPO/extraction/verify_all.py" --source-root "$SRC" >/dev/null 2>&1; else "$PY" "$REPO/extraction/verify_all.py" >/dev/null 2>&1; fi
if [ $? -eq 0 ]; then echo "PASS    unmodified repo passes verify_all.py"; else echo "FAIL    unmodified repo does not pass verify_all.py"; RESULT=1; fi
exit $RESULT

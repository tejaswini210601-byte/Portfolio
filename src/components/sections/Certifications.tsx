import { CERTIFICATIONS } from "@/lib/data";

/** Numbered list; each row floods with ink from left to right on hover/focus. */
export default function Certifications() {
  return (
    <section id="certifications" className="certs" aria-labelledby="certs-title">
      <div className="wrap certs-grid">
        <div className="certs-head">
          <p className="tag rv">04 — Certifications</p>
          <h2 className="h2" id="certs-title">
            <span className="rv-mask"><span>Always <span className="accent">learning.</span></span></span>
          </h2>
          <p className="mono certs-count rv">
            {String(CERTIFICATIONS.length).padStart(2, "0")} certifications · both in progress
          </p>
        </div>
        <ol className="certs-list">
          {CERTIFICATIONS.map((c, i) => (
            <li key={c.title} className="rv" style={{ ["--i" as string]: i }}>
              <div className="cert" tabIndex={0}>
                <span className="mono c-n">{String(i + 1).padStart(2, "0")}</span>
                <span className="c-body">
                  <span className="c-title">{c.title}</span>
                  <span className="c-iss">
                    {c.issuer} · {c.status}
                  </span>
                </span>
                <span className="c-arrow" aria-hidden="true">↗</span>
              </div>
            </li>
          ))}
        </ol>
      </div>
      <style>{`
        .certs{background:#fff;border-block:1px solid var(--line);padding-block:clamp(80px,12vh,140px)}
        .certs-grid{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.3fr);gap:clamp(32px,5vw,80px);align-items:start}
        .certs-head{position:sticky;top:110px}
        .certs-count{margin-top:20px;font-size:12px;color:var(--mute)}
        .certs-list{list-style:none;margin:0;padding:0;border-top:1px solid var(--line)}
        .cert{position:relative;display:grid;grid-template-columns:48px 1fr 30px;gap:16px;align-items:center;padding:28px 18px;border-bottom:1px solid var(--line);overflow:hidden;isolation:isolate;outline-offset:-2px}
        .cert::before{content:"";position:absolute;inset:0;background:var(--ink);transform:scaleX(0);transform-origin:0 50%;transition:transform .7s var(--ease);z-index:-1}
        .cert:hover::before,.cert:focus-visible::before{transform:scaleX(1)}
        .cert:hover,.cert:focus-visible{color:#fff}
        .c-n{font-size:12px;color:var(--mute);transition:color .4s}
        .cert:hover .c-n,.cert:hover .c-iss,.cert:focus-visible .c-n,.cert:focus-visible .c-iss{color:#bdbdbd}
        .c-body{display:flex;flex-direction:column;gap:6px}
        .c-title{font-size:clamp(19px,1.8vw,26px);font-weight:700;letter-spacing:-.035em;line-height:1.15;transition:color .4s}
        .c-iss{font-size:14px;color:var(--mute);transition:color .4s}
        .c-arrow{font-size:22px;opacity:0;transform:translateX(-12px);transition:opacity .4s,transform .6s var(--ease)}
        .cert:hover .c-arrow,.cert:focus-visible .c-arrow{opacity:1;transform:none}
        @media (max-width:900px){.certs-grid{grid-template-columns:1fr}.certs-head{position:static}}
      `}</style>
    </section>
  );
}

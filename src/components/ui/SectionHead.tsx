/** "03 — Selected work" tag + big heading whose last word is an Instrument Serif italic accent. */
export default function SectionHead({
  index,
  label,
  title,
  accent,
  id,
}: {
  index: string;
  label: string;
  title: string;
  accent: string;
  id?: string;
}) {
  return (
    <header>
      <p className="tag rv">
        {index} — {label}
      </p>
      <h2 className="h2" id={id}>
        <span className="rv-mask">
          <span>
            {title} <span className="accent">{accent}</span>
          </span>
        </span>
      </h2>
    </header>
  );
}

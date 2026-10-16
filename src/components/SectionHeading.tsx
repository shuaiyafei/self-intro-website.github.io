export function SectionHeading({
  number,
  label,
  aside,
}: {
  number: string;
  label: string;
  aside?: string;
}) {
  return (
    <div className="section-heading">
      <p className="section-label">
        <span>{number} /</span> {label}
      </p>
      {aside && <span className="section-aside">{aside}</span>}
    </div>
  );
}

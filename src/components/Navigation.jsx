export default function Navigation({ sections, activeId, onChange }) {
  return (
    <nav className="tab-nav" role="tablist" aria-label="Secciones de estudio">
      {sections.map((section) => (
        <button
          key={section.id}
          role="tab"
          type="button"
          aria-selected={activeId === section.id}
          className="tab-nav__btn"
          onClick={() => onChange(section.id)}
        >
          <span className="tab-nav__dot" aria-hidden="true" />
          <span aria-hidden="true">{section.icon}</span>
          {section.label}
        </button>
      ))}
    </nav>
  )
}

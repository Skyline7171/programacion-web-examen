import { useEffect, useMemo, useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY
const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null

/* ---------- Datos de la carrera ---------- */

const modalities = [
  { name: 'Diurna', years: '5 años', terms: '10 semestres', schedule: 'Lunes a viernes, 7:00 a. m. a 1:00 p. m.' },
  { name: 'Nocturna', years: '5 años', terms: '10 semestres', schedule: 'Lunes a viernes, 6:00 p. m. a 9:30 p. m.' },
  { name: 'Sabatina', years: '6 años', terms: '12 semestres', schedule: 'Sábados, 7:00 a. m. a 5:00 p. m.' },
]

const profiles = [
  { title: 'Desarrollador de software', text: 'Diseña, programa y mantiene aplicaciones web, móviles y de escritorio.' },
  { title: 'Administrador de redes y sistemas', text: 'Configura y protege infraestructura de redes, servidores y servicios en la nube.' },
  { title: 'Analista de datos e inteligencia artificial', text: 'Procesa datos y construye modelos que apoyan decisiones de organizaciones.' },
  { title: 'Gestor de proyectos tecnológicos', text: 'Planifica, evalúa y dirige proyectos informáticos de principio a fin.' },
]

const areas = [
  { title: 'Matemática y ciencias básicas', text: 'Cálculo, álgebra lineal, geometría analítica, estadística, estructuras discretas, física y análisis numérico.' },
  { title: 'Programación y algoritmos', text: 'Algoritmos, programación, estructuras de datos, programación orientada a objetos y análisis algorítmico avanzado.' },
  { title: 'Bases de datos', text: 'Modelado y administración de datos con Bases de Datos I y II.' },
  { title: 'Ingeniería de software', text: 'Requerimientos, análisis y diseño, Ingeniería del Software I y II, programación web y móvil.' },
  { title: 'Arquitectura y sistemas', text: 'Circuitos eléctricos, sistemas digitales, arquitectura de computadoras, sistemas operativos y compiladores.' },
  { title: 'Redes y sistemas distribuidos', text: 'Redes de computadoras y sistemas distribuidos.' },
  { title: 'Inteligencia artificial y robótica', text: 'Inteligencia artificial, robótica, sistemas de control y simulación por computadoras.' },
  { title: 'Investigación y proyectos', text: 'Metodología de la investigación, prácticas profesionales, formulación y evaluación de proyectos y culminación de estudios.' },
  { title: 'Formación humanística', text: 'Filosofía, historia de Nicaragua, género, cultura de paz, reflexión teológica y comunicación.' },
]

const courses = [
  'Matemática Introductoria', 'Técnicas y Estrategias de Comunicación', 'Filosofía', 'Geometría Analítica', 'Historia de Nicaragua',
  'Algoritmos', 'Composición y Redacción Técnica', 'Género en la Vida Cotidiana', 'Cálculo I', 'Estadística (Descriptiva e Inferencial)',
  'Programación', 'Estructuras Discretas', 'Física I', 'Cálculo II', 'Libre I (Básica)', 'Álgebra Lineal para Computación',
  'Estructura de Datos', 'Bases de Datos I', 'Física II', 'Cálculo III', 'Métodos y Técnicas de Investigación', 'Análisis Numérico para Ingenieros',
  'Programación Orientada a Objetos', 'Bases de Datos II', 'Circuitos Eléctricos', 'Reflexión Teológica', 'Metodología de la Investigación', 'Prácticas de Familiarización y Profesionales I',
  'Ingeniería de Requerimientos', 'Gráfica Asistida por Computadora', 'Sistemas Digitales', 'Simulación por Computadoras', 'Optativa I', 'Prácticas de Familiarización y Profesionales II',
  'Análisis y Diseño', 'Sistemas Operativos', 'Arquitectura de Computadoras I', 'Cultura de Paz', 'Lenguajes, Compiladores e Intérpretes', 'Prácticas de Familiarización y Profesionales III',
  'Ingeniería del Software I', 'Diseño Asistido por Computadoras', 'Arquitectura de Computadoras II', 'Análisis Algorítmico Avanzado', 'Redes de Computadoras',
  'Ingeniería de Software II', 'Programación Móvil', 'Libre II', 'Sistemas Distribuidos', 'Sistemas de Control', 'Optativa II',
  'Formulación y Evaluación de Proyectos Computacionales', 'Programación Web', 'Inteligencia Artificial', 'Robótica', 'Libre III', 'Formas de Culminación de Estudios',
]

const buildPlan = (termCount) => {
  const size = Math.ceil(courses.length / termCount)
  return Array.from({ length: termCount }, (_, i) => courses.slice(i * size, (i + 1) * size)).filter((t) => t.length)
}

const orgChart = {
  top: 'Consejo Universitario',
  rector: 'Rectoría',
  staff: ['Secretaría General', 'Auditoría Interna', 'Planificación Institucional'],
  vice: ['Vicerrectoría Académica', 'Vicerrectoría Administrativa y Financiera', 'Vicerrectoría de Investigación y Posgrado'],
  faculties: ['Facultad de Ciencias Económicas', 'Facultad de Ciencias de la Educación', 'Facultad de Ciencias e Ingeniería'],
  department: 'Departamento de Computación',
  career: 'Carrera de Ingeniería en Computación',
}

/* ---------- Componentes de apoyo ---------- */

function Card({ title, children, className = '' }) {
  return (
    <div className={`rounded-lg border border-[#2e2e2e] bg-[#1c1c1c] p-5 ${className}`}>
      {title && <h4 className="mb-1.5 text-[15px] font-medium text-[#ededed]">{title}</h4>}
      <div className="text-sm leading-relaxed text-[#a0a0a0]">{children}</div>
    </div>
  )
}

function ModalitiesSlide() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {modalities.map((m) => (
        <Card key={m.name} title={`Modalidad ${m.name.toLowerCase()}`}>
          <p className="mb-3 text-2xl font-semibold text-[#3ecf8e]">{m.years}</p>
          <dl className="space-y-2">
            <div><dt className="text-xs text-[#707070]">Duración</dt><dd>{m.terms}</dd></div>
            <div><dt className="text-xs text-[#707070]">Horario</dt><dd>{m.schedule}</dd></div>
          </dl>
        </Card>
      ))}
    </div>
  )
}

function ProfilesSlide() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {profiles.map((p) => <Card key={p.title} title={p.title}>{p.text}</Card>)}
    </div>
  )
}

function AreasSlide() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {areas.map((a) => <Card key={a.title} title={a.title}>{a.text}</Card>)}
    </div>
  )
}

function PlanSlide() {
  const [modality, setModality] = useState(modalities[0].name)
  const current = modalities.find((m) => m.name === modality)
  const plan = useMemo(() => buildPlan(modality === 'Sabatina' ? 12 : 10), [modality])

  return (
    <div>
      <div role="tablist" aria-label="Modalidad" className="mb-4 inline-flex rounded-md border border-[#2e2e2e] bg-[#1c1c1c] p-1">
        {modalities.map((m) => (
          <button
            key={m.name}
            role="tab"
            aria-selected={modality === m.name}
            onClick={() => setModality(m.name)}
            className={`rounded px-3 py-1.5 text-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#3ecf8e] ${
              modality === m.name ? 'bg-[#2e2e2e] text-[#ededed]' : 'text-[#a0a0a0] hover:text-[#ededed]'
            }`}
          >
            {m.name}
          </button>
        ))}
      </div>
      <p className="mb-4 text-sm text-[#a0a0a0]">{current.terms} · {current.schedule}</p>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {plan.map((term, i) => (
          <div key={i} className="rounded-lg border border-[#2e2e2e] bg-[#1c1c1c] p-4">
            <h4 className="mb-2 text-sm font-medium text-[#3ecf8e]">Semestre {i + 1}</h4>
            <ul className="space-y-1 text-sm text-[#a0a0a0]">
              {term.map((c) => <li key={c}>{c}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}

function OrgBox({ children, strong = false }) {
  return (
    <div className={`rounded-md border px-3 py-2 text-center text-sm ${
      strong ? 'border-[#3ecf8e] bg-[#3ecf8e]/10 text-[#ededed]' : 'border-[#2e2e2e] bg-[#1c1c1c] text-[#a0a0a0]'
    }`}>
      {children}
    </div>
  )
}

function OrgLevel({ items, strongIndex = -1 }) {
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {items.map((it, i) => <OrgBox key={it} strong={i === strongIndex}>{it}</OrgBox>)}
    </div>
  )
}

function OrgSlide() {
  const line = <div className="mx-auto h-5 w-px bg-[#2e2e2e]" aria-hidden="true" />
  return (
    <div className="mx-auto max-w-3xl">
      <div className="mx-auto max-w-xs"><OrgBox strong>{orgChart.top}</OrgBox></div>
      {line}
      <div className="mx-auto max-w-xs"><OrgBox strong>{orgChart.rector}</OrgBox></div>
      {line}
      <p className="mb-2 text-center text-xs text-[#707070]">Órganos de apoyo</p>
      <OrgLevel items={orgChart.staff} />
      {line}
      <p className="mb-2 text-center text-xs text-[#707070]">Vicerrectorías</p>
      <OrgLevel items={orgChart.vice} strongIndex={0} />
      {line}
      <p className="mb-2 text-center text-xs text-[#707070]">Facultades</p>
      <OrgLevel items={orgChart.faculties} strongIndex={2} />
      {line}
      <div className="mx-auto max-w-xs"><OrgBox>{orgChart.department}</OrgBox></div>
      {line}
      <div className="mx-auto max-w-sm"><OrgBox strong>{orgChart.career}</OrgBox></div>
    </div>
  )
}

const slides = [
  { id: 'modalidades', label: 'Modalidades y horarios', title: 'Cuándo estudiar', Component: ModalitiesSlide },
  { id: 'perfiles', label: 'Perfiles de salida', title: 'Capacidades esperadas al terminar la carrera', Component: ProfilesSlide },
  { id: 'areas', label: 'Áreas de estudio', title: 'Temas abarcados', Component: AreasSlide },
  { id: 'plan', label: 'Plan de estudio', title: 'Plan de estudio', Component: PlanSlide },
  { id: 'organigrama', label: 'Organigrama UNHSJM', title: 'Organigrama de la universidad', Component: OrgSlide },
]

function Carousel() {
  const [index, setIndex] = useState(0)
  const go = (next) => setIndex((next + slides.length) % slides.length)
  const { Component, title } = slides[index]

  const onKeyDown = (e) => {
    if (e.key === 'ArrowRight') go(index + 1)
    if (e.key === 'ArrowLeft') go(index - 1)
  }

  return (
    <section
      id="carrera"
      aria-roledescription="carrusel"
      aria-label="Información de la carrera"
      onKeyDown={onKeyDown}
      className="mx-auto max-w-6xl px-6 py-16"
    >
      <div role="tablist" aria-label="Secciones" className="mb-8 flex gap-1 overflow-x-auto border-b border-[#2e2e2e] pb-px">
        {slides.map((s, i) => (
          <button
            key={s.id}
            role="tab"
            aria-selected={i === index}
            onClick={() => setIndex(i)}
            className={`-mb-px whitespace-nowrap border-b-2 px-4 py-2.5 text-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#3ecf8e] ${
              i === index ? 'border-[#3ecf8e] text-[#ededed]' : 'border-transparent text-[#a0a0a0] hover:text-[#ededed]'
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      <div className="mb-6 flex items-center justify-between gap-4">
        <h2 className="text-2xl font-semibold tracking-tight text-[#ededed] sm:text-3xl">{title}</h2>
        <div className="flex shrink-0 gap-2">
          {[['Anterior', -1, '‹'], ['Siguiente', 1, '›']].map(([label, step, icon]) => (
            <button
              key={label}
              aria-label={label}
              onClick={() => go(index + step)}
              className="flex h-9 w-9 items-center justify-center rounded-md border border-[#2e2e2e] text-lg text-[#ededed] transition-colors hover:border-[#3ecf8e] hover:text-[#3ecf8e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#3ecf8e]"
            >
              {icon}
            </button>
          ))}
        </div>
      </div>

      <div key={slides[index].id} className="slide-in" role="tabpanel" aria-live="polite">
        <Component />
      </div>

      <div className="mt-8 flex justify-center gap-2" aria-hidden="true">
        {slides.map((s, i) => (
          <span key={s.id} className={`h-1.5 rounded-full transition-all ${i === index ? 'w-6 bg-[#3ecf8e]' : 'w-1.5 bg-[#2e2e2e]'}`} />
        ))}
      </div>
    </section>
  )
}

/* ---------- Resenas ---------- */

function Stars({ value, onChange }) {
  return (
    <div className="flex gap-1" role={onChange ? 'radiogroup' : 'img'} aria-label={`Calificación: ${value} de 5`}>
      {[1, 2, 3, 4, 5].map((n) => {
        const filled = n <= value
        const cls = `text-xl leading-none ${filled ? 'text-[#3ecf8e]' : 'text-[#2e2e2e]'}`
        return onChange ? (
          <button
            key={n}
            type="button"
            role="radio"
            aria-checked={n === value}
            aria-label={`${n} de 5`}
            onClick={() => onChange(n)}
            className={`${cls} focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#3ecf8e]`}
          >
            ★
          </button>
        ) : (
          <span key={n} className={cls}>★</span>
        )
      })}
    </div>
  )
}

function Reviews() {
  const [reviews, setReviews] = useState([])
  const [name, setName] = useState('')
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState('')
  const [status, setStatus] = useState({ type: 'idle', message: '' })

  useEffect(() => {
    if (!supabase) return
    supabase
      .from('reviews')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(50)
      .then(({ data, error }) => {
        if (error) setStatus({ type: 'error', message: 'No se pudieron cargar las reseñas. Revisa la conexión con Supabase.' })
        else setReviews(data)
      })
  }, [])

  const average = reviews.length ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1) : null

  const handleSubmit = async (e) => {
    e.preventDefault()
    const payload = { author_name: name.trim(), rating, comment: comment.trim() }
    if (!payload.author_name || !payload.comment) {
      setStatus({ type: 'error', message: 'Escribe tu nombre y un comentario antes de publicar.' })
      return
    }
    setStatus({ type: 'loading', message: 'Publicando reseña...' })

    if (!supabase) {
      // Modo local
      setReviews((prev) => [{ id: crypto.randomUUID(), created_at: new Date().toISOString(), ...payload }, ...prev])
    } else {
      const { data, error } = await supabase.from('reviews').insert(payload).select().single()
      if (error) {
        setStatus({ type: 'error', message: 'No se pudo publicar la reseña. Inténtalo de nuevo.' })
        return
      }
      setReviews((prev) => [data, ...prev])
    }
    setName('')
    setComment('')
    setRating(5)
    setStatus({ type: 'success', message: 'Reseña publicada.' })
  }

  const fieldCls = 'w-full rounded-md border border-[#2e2e2e] bg-[#121212] px-3 py-2 text-sm text-[#ededed] placeholder-[#707070] focus:border-[#3ecf8e] focus:outline-none'

  return (
    <section id="resenas" className="border-t border-[#2e2e2e] bg-[#161616]">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 lg:grid-cols-5">
        <form onSubmit={handleSubmit} className="space-y-4 lg:col-span-2">
          <h2 className="text-2xl font-semibold tracking-tight text-[#ededed]">Cuéntanos tu experiencia</h2>
          <p className="text-sm text-[#a0a0a0]">Tu opinión ayuda a otros estudiantes a decidir.</p>
          <div>
            <label htmlFor="author" className="mb-1.5 block text-sm text-[#ededed]">Nombre</label>
            <input id="author" value={name} onChange={(e) => setName(e.target.value)} maxLength={80} placeholder="Tu nombre" className={fieldCls} />
          </div>
          <div>
            <span className="mb-1.5 block text-sm text-[#ededed]">Calificación</span>
            <Stars value={rating} onChange={setRating} />
          </div>
          <div>
            <label htmlFor="comment" className="mb-1.5 block text-sm text-[#ededed]">Comentario</label>
            <textarea id="comment" rows={4} value={comment} onChange={(e) => setComment(e.target.value)} maxLength={600} placeholder="¿Qué te pareció la carrera?" className={fieldCls} />
          </div>
          <button
            type="submit"
            disabled={status.type === 'loading'}
            className="rounded-md bg-[#3ecf8e] px-4 py-2 text-sm font-medium text-[#121212] transition-colors hover:bg-[#6ee0ad] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3ecf8e] disabled:opacity-60"
          >
            Publicar reseña
          </button>
          {status.message && (
            <p role="status" className={`text-sm ${status.type === 'error' ? 'text-red-400' : 'text-[#3ecf8e]'}`}>{status.message}</p>
          )}
          {!supabase && (
            <p className="text-xs text-[#707070]">Supabase no está configurado: las reseñas se guardan solo en esta sesión.</p>
          )}
        </form>

        <div className="lg:col-span-3">
          <div className="mb-5 flex items-baseline gap-3">
            <h3 className="text-lg font-medium text-[#ededed]">Reseñas</h3>
            {average && <span className="text-sm text-[#a0a0a0]">{average} de 5 · {reviews.length} {reviews.length === 1 ? 'reseña' : 'reseñas'}</span>}
          </div>
          {reviews.length === 0 ? (
            <p className="rounded-lg border border-dashed border-[#2e2e2e] p-8 text-center text-sm text-[#a0a0a0]">
              Aún no hay reseñas. Escribe la primera desde el formulario.
            </p>
          ) : (
            <ul className="space-y-3">
              {reviews.map((r) => (
                <li key={r.id} className="rounded-lg border border-[#2e2e2e] bg-[#1c1c1c] p-4">
                  <div className="mb-1 flex items-center justify-between gap-3">
                    <span className="text-sm font-medium text-[#ededed]">{r.author_name}</span>
                    <Stars value={r.rating} />
                  </div>
                  <p className="text-sm leading-relaxed text-[#a0a0a0]">{r.comment}</p>
                  <time className="mt-2 block text-xs text-[#707070]" dateTime={r.created_at}>
                    {new Date(r.created_at).toLocaleDateString('es-NI', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </time>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  )
}

/* ---------- Pagina ---------- */

export default function App() {
  return (
    <div className="min-h-screen bg-[#121212] font-sans text-[#ededed] antialiased" style={{ fontFamily: "'Inter', 'Circular', system-ui, -apple-system, 'Segoe UI', sans-serif" }}>
      <style>{`
        @keyframes slideIn { from { opacity: 0; transform: translateX(16px); } to { opacity: 1; transform: none; } }
        .slide-in { animation: slideIn .25s ease-out; }
        @media (prefers-reduced-motion: reduce) { .slide-in { animation: none; } }
      `}</style>

      <header className="sticky top-0 z-10 border-b border-[#2e2e2e] bg-[#121212]/90 backdrop-blur">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3.5">
          <a href="#" className="text-[15px] font-semibold">UNHSJM</a>
          <div className="flex gap-6 text-sm text-[#a0a0a0]">
            <a href="#carrera" className="hover:text-[#ededed]">La carrera</a>
            <a href="#resenas" className="hover:text-[#ededed]">Reseñas</a>
          </div>
        </nav>
      </header>

      <main>
        <section className="mx-auto max-w-6xl px-6 pb-4 pt-20">
          <p className="mb-4 text-sm text-[#3ecf8e]">Universidad Nacional Héroes de San José de las Mulas</p>
          <h1 className="max-w-3xl text-4xl font-semibold leading-tight tracking-tight sm:text-6xl">
            Ingeniería en Computación
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-[#a0a0a0]">
            La Ingeniería en Computación es una carrera universitaria enfocada en el diseño, desarrollo e implementación de soluciones tecnológicas mediante el uso de la informática y la computación. A lo largo de la carrera se adquieren conocimientos sobre programación, desarrollo de software, bases de datos, redes, sistemas operativos, hardware y otras áreas de la tecnología. Es una profesión que combina la lógica, las matemáticas y la creatividad para resolver problemas del mundo real, ofreciendo un amplio campo laboral en empresas tecnológicas, instituciones públicas y privadas, así como oportunidades para emprender y desarrollar proyectos propios.
          </p>
          <div className="mt-8 flex gap-3">
            <a href="#carrera" className="rounded-md bg-[#3ecf8e] px-4 py-2 text-sm font-medium text-[#121212] hover:bg-[#6ee0ad]">Ver la carrera</a>
            <a href="#resenas" className="rounded-md border border-[#2e2e2e] px-4 py-2 text-sm hover:border-[#3ecf8e]">Leer reseñas</a>
          </div>
        </section>

        <Carousel />
        <Reviews />
      </main>

      <footer className="border-t border-[#2e2e2e] px-6 py-8 text-center text-sm text-[#707070]">
        Universidad Nacional Héroes de San José de las Mulas
      </footer>
    </div>
  )
}

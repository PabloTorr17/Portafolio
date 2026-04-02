import { useApp } from '../../context/AppContext';
import { usePlayer } from '../../context/PlayerContext';
import { PROJECTS, CATEGORIES } from '../../data/projects';
import ProjectCard from '../ProjectCard/ProjectCard';
import ListItem from '../ListItem/ListItem';
import styles from './MainContent.module.css';

// ── Home View ────────────────────────────────────────────────────────────────
function HomeView() {
  const { searchQuery, navigateTo } = useApp();
  const { playProject } = usePlayer();
  const query = searchQuery.toLowerCase();

  const filtered = query
    ? PROJECTS.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.tech.join(' ').toLowerCase().includes(query) ||
          p.tags.join(' ').toLowerCase().includes(query)
      )
    : null;

  if (filtered) {
    return (
      <div className={`${styles.section} fade-in`}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Resultados para "{searchQuery}"</h2>
        </div>
        {filtered.length === 0 ? (
          <p style={{ color: 'var(--text3)', marginTop: 20 }}>No se encontraron proyectos.</p>
        ) : (
          <div className={styles.grid}>
            {filtered.map((p) => <ProjectCard key={p.id} project={p} />)}
          </div>
        )}
      </div>
    );
  }

  return (
    <>
      {/* Hero */}
      <div className={`${styles.hero} fade-in`}>
        <div className={styles.heroOverlay} />
        <div className={styles.heroLabel}>Portafolio de Desarrollo</div>
        <h1 className={styles.heroTitle}>Mis proyectos<br />universitarios</h1>
        <p className={styles.heroSub}>
          Proyectos construidos a lo largo de mi carrera en Ingeniería de Software, 
          demostrando habilidades en desarrollo full-stack, análisis de datos, 
          aplicaciones móviles, etc. Cada proyecto refleja mi pasión por la programación 
          y mi compromiso con hacer lo que me gusta.
        </p>
        <div className={styles.heroActions}>
          <button className={styles.btnPrimary} onClick={() => playProject(PROJECTS[0].id)}>
            ▶ Reproducir todo
          </button>
          <button
            className={styles.btnSecondary}
            onClick={() => playProject(PROJECTS[Math.floor(Math.random() * PROJECTS.length)].id)}
          >
            ⇄ Aleatorio
          </button>
        </div>
      </div>

      {/* Featured grid */}
      <div className={`${styles.section} fade-in`}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Destacados</h2>
          <button className={styles.seeAll} onClick={() => navigateTo('category', 'All Projects')}>
            Ver todos →
          </button>
        </div>
        <div className={styles.grid}>
          {PROJECTS.slice(0, 4).map((p) => <ProjectCard key={p.id} project={p} />)}
        </div>
      </div>

      {/* List */}
      <div className={`${styles.section} fade-in`}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Todos los proyectos</h2>
        </div>
        <div className={styles.list}>
          {PROJECTS.map((p, i) => <ListItem key={p.id} project={p} index={i + 1} />)}
        </div>
      </div>
    </>
  );
}

// ── Category View ─────────────────────────────────────────────────────────────
function CategoryView() {
  const { currentCategory } = useApp();
  const { playProject } = usePlayer();
  const cat = CATEGORIES.find((c) => c.name === currentCategory);
  if (!cat) return <HomeView />;
  const projects = cat.projectIds.map((id) => PROJECTS.find((p) => p.id === id)).filter(Boolean);

  return (
    <>
      <div className={`${styles.catHero} fade-in`}>
        <div className={styles.catEmoji}>{cat.emoji}</div>
        <div className={styles.heroLabel}>Colección</div>
        <h1 className={styles.heroTitle}>{cat.name}</h1>
        <p className={styles.heroSub}>{projects.length} proyectos seleccionados</p>
        <div className={styles.heroActions}>
          <button className={styles.btnPrimary} onClick={() => playProject(projects[0]?.id)}>
            ▶ Reproducir
          </button>
        </div>
      </div>
      <div className={`${styles.section} fade-in`}>
        <div className={styles.list}>
          {projects.map((p, i) => <ListItem key={p.id} project={p} index={i + 1} />)}
        </div>
      </div>
    </>
  );
}

// ── About View ────────────────────────────────────────────────────────────────
const SKILLS = ['Java','Python','JavaScript','SQL','Php','C++','Vue.js','React','Laravel','HTML/CSS','AWS/Azure','Git/GitHub','Docker','Agile/Scrum','Nginx/Apache','Linux','REST API','Power BI','Android/IOS'];

function AboutView() {
  return (
    <>
      <div className={`${styles.aboutHero} fade-in`}>
        <div className={styles.aboutAvatar}>PT</div>
        <h1 className={styles.heroTitle}>Pablo Torrecillas</h1>
        <p className={styles.heroSub}>
          Estudiante de Ingeniería de Software con experiencia práctica en desarrollo full-stack, infraestructura en la
nube y sistemas escalables. Apasionado por la tecnología, la innovación y la creación de soluciones que marcan la diferencia.
        </p>
      </div>
      <div className={`${styles.section} fade-in`}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Stack tecnológico</h2>
        </div>
        <div className={styles.techStack}>
          {SKILLS.map((s) => <span key={s} className="tech-badge">{s}</span>)}
        </div>
        <div className={styles.sectionHeader} style={{ marginTop: 32 }}>
          <h2 className={styles.sectionTitle}>Proyectos destacados</h2>
        </div>
        <div className={styles.grid}>
          {PROJECTS.slice(0, 4).map((p) => <ProjectCard key={p.id} project={p} />)}
        </div>
      </div>
    </>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function MainContent() {
  const { view } = useApp();

  return (
    <main className={styles.main}>
      {view === 'home'     && <HomeView />}
      {view === 'search'   && <HomeView />}
      {view === 'category' && <CategoryView />}
      {view === 'about'    && <AboutView />}
    </main>
  );
}

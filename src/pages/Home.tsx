import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

const Home = () => {
  const handleScroll = () => {
    const nextSection = document.getElementById('next-area');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
    <>
  <section className="relative flex flex-col items-center justify-center h-screen gap-4 w-full">
        <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-green-400 mb-2 drop-shadow-[0_0_12px_rgba(34,211,238,0.25)] w-fit">
          Mathys NOURRY
        </h1>
        <span
          className="block mx-auto text-sm md:text-base font-light mb-8 text-center w-fit px-2 bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-gray-400 to-green-300"
          style={{ maxWidth: '55ch' }}
        >
          Etudiant en troisième année de BUT Informatique à l'IUT de Belfort.<br/>Développeur Full-Stack chez SPACE Informatique
        </span>
        <button
          onClick={handleScroll}
          className="absolute left-1/2 -translate-x-1/2 bottom-8 md:bottom-16 lg:bottom-24 px-6 py-3 rounded-full bg-gradient-to-r from-blue-500 via-cyan-400 to-green-400 text-gray-900 font-bold shadow-lg transition flex items-center justify-center hover:scale-110 hover:shadow-[0_0_16px_2px_rgba(34,211,238,0.25)] hover:bg-gradient-to-r hover:from-blue-400 hover:via-cyan-300 hover:to-green-300"
          aria-label="Scroll Down"
        >
          <FontAwesomeIcon icon={faChevronDown} size="2x" />
        </button>
      </section>

      <section className="w-full flex flex-col justify-center min-h-[40vh] px-4 md:px-8 lg:px-24" id="next-area">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-left text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-green-400 drop-shadow-[0_0_12px_rgba(34,211,238,0.25)] w-fit">A propos</h2>
        <p className=" text-base md:text-lg text-gray-200 mb-8 text-justify px-0">
          Passionné par le développement web et les nouvelles technologies, je m'efforce de créer des solutions innovantes et performantes. Toujours curieux et motivé à apprendre, j'aime relever de nouveaux défis et travailler sur des projets variés.
        </p>
        <button className="w-fit px-4 py-2 rounded-lg font-semibold bg-gradient-to-r from-blue-500 via-cyan-400 to-green-400 text-gray-900 shadow transition hover:scale-105 hover:shadow-[0_0_16px_2px_rgba(34,211,238,0.25)] hover:bg-gradient-to-r hover:from-blue-400 hover:via-cyan-300 hover:to-green-300 text-left">
          En savoir plus
        </button>
      </section>

      <section className="w-full flex flex-col justify-center min-h-[40vh] px-4 md:px-8 lg:px-24" id="entreprise-area">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-left text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-green-400 drop-shadow-[0_0_12px_rgba(34,211,238,0.25)] w-fit">Entreprise</h2>
        <div className="flex items-center gap-6">
          <div className="h-60 w-60 flex-shrink-0 flex items-center justify-center">
            <img src="/portfolio/assets/logos/logo_400x400.png" alt="Logo" className="w-full h-full object-contain" />
          </div>
          <p className="text-base md:text-lg text-gray-200 text-justify">
            <a
              href="https://fr.linkedin.com/company/s.p.a.c.e.-informatique"
              target="_blank"
              rel="noopener noreferrer"
                className="inline-block font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-green-400 border-transparent transition duration-200 px-1 hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]"
              style={{
                backgroundImage:
                  'linear-gradient(90deg, #3b82f6, #22d3ee, #22c55e)',
              }}
            >
              SPACE Informatique
            </a>
            {' '}est une entreprise spécialisée dans le développement de solutions informatiques sur mesure, offrant expertise et innovation pour accompagner ses clients dans leur transformation digitale.
          </p>
        </div>
      </section>

      <section className="w-full flex flex-col justify-center min-h-[40vh] px-4 md:px-8 lg:px-24" id="competences-area">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-8 text-left text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-green-400 drop-shadow-[0_0_12px_rgba(34,211,238,0.25)] w-fit">Compétences</h2>
        <div className="flex flex-col gap-8 justify-center items-stretch w-full">
          <button
            className="w-full p-8 rounded-2xl font-semibold shadow-lg transition flex flex-col items-start bg-gray-800/60 text-white backdrop-blur-xl border border-gray-800 hover:bg-gradient-to-r hover:from-blue-400 hover:via-cyan-300 hover:to-green-300 hover:text-gray-900 hover:shadow-[0_0_16px_2px_rgba(34,211,238,0.25)] group"
            onClick={() => window.location.href = '/portfolio/competence1'}
          >
            <span className="text-2xl font-bold mb-2 text-white group-hover:text-gray-900 transition">Compétence 1 - Réaliser un développement d'application</span>
            <span className="text-base text-white group-hover:text-gray-900 transition">Description courte de la compétence 1.</span>
          </button>
          <button
            className="w-full p-8 rounded-2xl font-semibold shadow-lg transition flex flex-col items-start bg-gray-800/60 text-white backdrop-blur-xl border border-gray-800 hover:bg-gradient-to-r hover:from-blue-400 hover:via-cyan-300 hover:to-green-300 hover:text-gray-900 hover:shadow-[0_0_16px_2px_rgba(34,211,238,0.25)] group"
            onClick={() => window.location.href = '/portfolio/competence2'}
          >
            <span className="text-2xl font-bold mb-2 text-white group-hover:text-gray-900 transition">Compétence 2 - Optimiser des applications</span>
            <span className="text-base text-white group-hover:text-gray-900 transition">Description courte de la compétence 2.</span>
          </button>
          <button
            className="w-full p-8 rounded-2xl font-semibold shadow-lg transition flex flex-col items-start bg-gray-800/60 text-white backdrop-blur-xl border border-gray-800 hover:bg-gradient-to-r hover:from-blue-400 hover:via-cyan-300 hover:to-green-300 hover:text-gray-900 hover:shadow-[0_0_16px_2px_rgba(34,211,238,0.25)] group"
            onClick={() => window.location.href = '/portfolio/competence6'}
          >
            <span className="text-2xl font-bold mb-2 text-white group-hover:text-gray-900 transition">Compétence 6 - Collaborer au sein d'une équipe informatique</span>
            <span className="text-base text-white group-hover:text-gray-900 transition">Description courte de la compétence 6.</span>
          </button>
        </div>
      </section>

      <section className="w-full flex flex-col justify-center min-h-[40vh] px-4 md:px-8 lg:px-24" id="projets-area">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-8 text-left text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-green-400 drop-shadow-[0_0_12px_rgba(34,211,238,0.25)] w-fit">Projets</h2>
        <div className="flex flex-col gap-8 justify-center items-stretch w-full">
          <button className="w-full p-8 rounded-2xl font-semibold shadow-lg transition flex flex-col items-start bg-gray-800/60 text-white backdrop-blur-xl border border-gray-800 hover:bg-gradient-to-r hover:from-blue-400 hover:via-cyan-300 hover:to-green-300 hover:text-gray-900 hover:shadow-[0_0_16px_2px_rgba(34,211,238,0.25)] group">
            <span className="text-2xl font-bold mb-2 text-white group-hover:text-gray-900 transition">Nom du projet</span>
            <span className="text-base text-white group-hover:text-gray-900 transition">Courte description du projet.</span>
          </button>
        </div>
      </section>
    </>
  );
}

export default Home;

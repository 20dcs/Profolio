import data from '../data.json';
// const data=JSON.stringify(data.json);
import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import ReactTypingEffect from 'react-typing-effect';
// Project Card
// import ProjectCard from '../components/ProjectCard';
import GitHubProfile from '../components/icons/GitHubProfile';
import TwitterProfile from '../components/icons/TwitterProfile';
import LinkedInProfile from '../components/icons/LinkedInProfile';
import FeaturedProjectCard from '../components/FeaturedProjectCard';

// Blog Components
// import BlogList from '../components/blog/BlogList';
// import BlogItem from '../components/blog/BlogItem';

// Dark Mode
import { useTheme } from 'next-themes';
import SkillSection from '../components/SkillSection';

let Color = `${data.Color}`;
let BColor = `${data.Color}`;

const getDimensions = (ele) => {
  const { height } = ele.getBoundingClientRect();
  const offsetTop = ele.offsetTop;
  const offsetBottom = offsetTop + height;

  return {
    height,
    offsetTop,
    offsetBottom,
  };
};

const scrollTo = (ele) => {
  ele.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  });
};

export default function Home({ publications }) {
  const [visibleSection, setVisibleSection] = useState();
  const [scrolling, setScrolling] = useState(false);
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { systemTheme, theme, setTheme } = useTheme();

  const handleResize = () => {
    if (window.innerWidth < 1024) {
    } else {
      setNavbarOpen(false);
    }
  };

  const headerRef = useRef(null);
  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const skillsRef = useRef(null);
  const myWorkRef = useRef(null);
  const blogRef = useRef(null);
  const contactRef = useRef(null);

  useEffect(() => {
    const sectionRefs = [
      { section: 'home', ref: homeRef, id: 1 },
      { section: 'about', ref: aboutRef, id: 2 },
      { section: 'skills', ref: skillsRef, id: 3 },
      { section: 'my-work', ref: myWorkRef, id: 4 },
      { section: 'blog', ref: blogRef, id: 5 },
      { section: 'contact', ref: contactRef, id: 6 },
    ];

    const handleScroll = () => {
      const { height: headerHeight } = getDimensions(headerRef.current);
      const scrollPosition = window.scrollY + headerHeight;

      const selected = sectionRefs.find(({ section, ref }) => {
        const ele = ref.current;
        if (ele) {
          const { offsetBottom, offsetTop } = getDimensions(ele);
          return scrollPosition >= offsetTop && scrollPosition <= offsetBottom;
        }
      });

      if (selected && selected.section !== visibleSection) {
        setVisibleSection(selected.section);
      } else if (!selected && visibleSection) {
        setVisibleSection(undefined);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [visibleSection]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', () =>
        setScrolling(window.pageYOffset > 110)
      );
    }
  }, []);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme = theme === 'system' ? systemTheme : theme;

  const renderThemeChanger = () => {
    if (!mounted) return null;

    if (currentTheme === 'dark') {
      return (
        <svg
          className='w-6 h-6 transition-all duration-150 ease-in-out dark:flex dark:opacity-50 dark:group-hover:opacity-100 dark:text-white'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'>
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z'
          />
        </svg>
      );
    } else {
      return (
        <svg
          className='w-6 h-6 transition-all duration-150 ease-in-out flex text-mid/50 group-hover:text-dark'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'>
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z'
          />
        </svg>
      );
    }
  };

  return (
    <div className='bg-white dark:bg-darker transition-all duration-150 ease-in-out'>
      <div
        className={`relative w-full dark:bg-dark/20 bg-light bg-opacity-10 overflow-auto min-h-screen transition-all duration-150 ease-in-out ${navbarOpen ? 'overflow-hidden' : 'overflow-auto'
          }`}>
        <Head>
          <title>{data.Head.title} </title>
          <meta name='description' content={data.Head.NavbarName} />
          <link rel='icon' href='/favicon.ico' />
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          <link rel="manifest" href="/site.webmanifest"></link>
        </Head>

        {/* Full-screen Menu */}
        <div
          className={`fixed w-full z-50 h-screen pt-24 bg-white dark:bg-darker bg-opacity-100 transform delay-100 transition-all duration-150 ${navbarOpen
            ? 'opacity-100 translate-x-0'
            : 'opacity-0 -translate-x-full'
            }`}>
          <div className='container relative mx-auto'>
            <nav className='block ml-auto'>
              <ul className='z-50 flex flex-col items-start'>
                <li className='z-50 block py-2 list-none lg:inline-block'>
                  <button
                    href='#'
                    className={`header_link text-xl font-semibold transition-all duration-150 ease-in-out ${visibleSection === 'home'
                      ? 'selected delay-200'
                      : 'text-mid/50 hover:text-mid border-b-2 border-transparent'
                      }`}
                    onClick={() => {
                      setNavbarOpen(false);
                      scrollTo(homeRef.current);
                    }}>
                    Home
                  </button>
                </li>
                <li className='z-50 block py-2 list-none lg:inline-block'>
                  <button
                    href='#'
                    className={`header_link text-xl font-semibold transition-all duration-150 ease-in-out ${visibleSection === 'about'
                      ? 'selected delay-150'
                      : 'text-mid/50 hover:text-mid border-b-2 border-transparent'
                      }`}
                    onClick={() => {
                      setNavbarOpen(false);
                      scrollTo(aboutRef.current);
                    }}>
                    About
                  </button>
                </li>
                <li className='z-50 block py-2 list-none lg:inline-block'>
                  <button
                    href='#'
                    className={`header_link text-xl font-semibold transition-all duration-150 ease-in-out ${visibleSection === 'skills'
                      ? 'selected delay-150'
                      : 'text-mid/50 hover:text-mid border-b-2 border-transparent'
                      }`}
                    onClick={() => {
                      setNavbarOpen(false);
                      scrollTo(skillsRef.current);
                    }}>
                    Skills
                  </button>
                </li>
                <li className='z-50 block py-2 list-none lg:inline-block'>
                  <button
                    href='#'
                    className={`header_link text-xl font-semibold transition-all duration-150 ease-in-out ${visibleSection === 'my-work'
                      ? 'selected delay-150'
                      : 'text-mid/50  hover:text-mid border-b-2 border-transparent'
                      }`}
                    onClick={() => {
                      setNavbarOpen(false);
                      scrollTo(myWorkRef.current);
                    }}>
                    My Work
                  </button>
                </li>
                {/* <li className="z-50 block py-2 list-none lg:inline-block">
                  <button
                    href="#"
                    target="_blank"
                    rel="noreferrer"
                    className={`header_link text-xl font-semibold transition-all duration-150 ease-in-out ${
                      visibleSection === "blog"
                        ? "selected delay-150"
                        : "text-mid/50 hover:text-mid border-b-2 border-transparent"
                    }`}
                    onClick={() => {
                      setNavbarOpen(false);
                      scrollTo(blogRef.current);
                    }}
                  >
                    Blog
                  </button>
                </li> */}
                <li className='z-50 block py-2 list-none lg:inline-block'>
                  <button
                    href='#'
                    className={`header_link text-xl font-semibold transition-all duration-150 ease-in-out ${visibleSection === 'contact'
                      ? 'selected delay-150'
                      : 'text-mid/50 hover:text-mid border-b-2 border-transparent'
                      }`}
                    onClick={() => {
                      setNavbarOpen(false);
                      scrollTo(contactRef.current);
                    }}>
                    Contact
                  </button>
                </li>
                <li className='z-40 block py-2 mt-6 list-none lg:inline-block'>
                  <a
                    href={`mailto:${data.Contact.Email}`}
                    className={`text-white btn-lg group`}
                    style={{ backgroundColor: BColor }}>
                    Contact me
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        {/* Header and Nav */}
        <header
          className={`header top-0 mx-auto flex items-center py-6 z-50 fixed w-full transition-all duration-150 h-20 ${scrolling && !navbarOpen
            ? 'dark:bg-dark bg-white'
            : 'bg-transparent'
            }`}
          ref={headerRef}>
          {/* Logo and Nav container */}
          <div className='container relative flex items-center mx-auto'>
            {/* Text */}
            <div className='flex items-center ml-4'>
              <p className='text-xl font-semibold font-display tracking-tight dark:text-white text-darker mb-0 transition-all duration-150 ease-in-out'>
                {data.Head.NavbarName}
              </p>
            </div>
            {/* Nav */}
            <nav className='block ml-auto h-full'>
              <ul className='z-50 flex items-center'>
                <li className='z-50 hidden mx-5 list-none lg:inline-block'>
                  <button
                    href='#'
                    className={`header_link font-semibold transition-all duration-150 ease-in-out ${visibleSection === 'home'
                      ? 'selected delay-150'
                      : 'opacity-50 hover:opacity-100 dark:text-white text-dark'
                      }`}
                    onClick={() => {
                      scrollTo(homeRef.current);
                    }}>
                    Home
                  </button>
                </li>
                <li className='z-50 hidden mx-5 list-none lg:inline-block'>
                  <button
                    href='#'
                    className={`header_link font-semibold transition-all duration-150 ease-in-out ${visibleSection === 'about'
                      ? 'selected delay-150'
                      : 'opacity-50 hover:opacity-100 border-b-2 border-transparent  dark:text-white text-dark'
                      }`}
                    onClick={() => {
                      scrollTo(aboutRef.current);
                    }}>
                    About
                  </button>
                </li>
                <li className='z-50 hidden mx-5 list-none lg:inline-block'>
                  <button
                    href='#'
                    className={`header_link font-semibold transition-all duration-150 ease-in-out ${visibleSection === 'skills'
                      ? 'selected delay-150'
                      : 'opacity-50 hover:opacity-100 border-b-2 border-transparent dark:text-white text-dark'
                      }`}
                    onClick={() => {
                      scrollTo(skillsRef.current);
                    }}>
                    Skills
                  </button>
                </li>
                <li className='z-50 hidden mx-5 list-none lg:inline-block'>
                  <button
                    href='#'
                    className={`header_link font-semibold transition-all duration-150 ease-in-out ${visibleSection === 'my-work'
                      ? 'selected delay-150'
                      : 'opacity-50 hover:opacity-100 border-b-2 border-transparent dark:text-white text-dark'
                      }`}
                    onClick={() => {
                      scrollTo(myWorkRef.current);
                    }}>
                    My Work
                  </button>
                </li>
                {/* <li className="z-50 hidden mx-5 list-none lg:inline-block">
                  <button
                    href="#"
                    target="_blank"
                    rel="noreferrer"
                    className={`header_link font-semibold transition-all duration-150 ease-in-out ${
                      visibleSection === "blog"
                        ? "selected delay-150"
                        : "opacity-50 hover:opacity-100 border-b-2 border-transparent dark:text-white text-dark"
                    }`}
                    onClick={() => {
                      scrollTo(blogRef.current);
                    }}
                  >
                    Blog
                  </button>
                </li> */}
                <li className='z-50 hidden mx-5 list-none lg:inline-block'>
                  <button
                    href='#'
                    className={`header_link font-semibold transition-all duration-150 ease-in-out ${visibleSection === 'contact'
                      ? 'selected delay-150'
                      : 'opacity-50 hover:opacity-100 border-b-2 border-transparent dark:text-white text-dark'
                      }`}
                    onClick={() => {
                      scrollTo(contactRef.current);
                    }}>
                    Contact
                  </button>
                </li>
                <li className='z-50 hidden ml-5 list-none lg:inline-block'>
                  <a
                    href={`mailto:${data.Contact.Email}`}
                    className={`text-lg text-white btn-md group`}
                    style={{ backgroundColor: BColor }}>
                    Contact me
                  </a>
                </li>
                <li className='z-50 inline-block ml-5 list-none lg:hidden'>
                  <button
                    className={`relative w-10 h-10 text-dark/50 dark:text-white ${navbarOpen
                      ? ''
                      : 'dark:opacity-50 dark:group-hover:opacity-100 text-mid/50 group-hover:text-dark'
                      } focus:outline-none`}
                    onClick={() => setNavbarOpen(!navbarOpen)}>
                    <div className='absolute block w-5 transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2'>
                      <span
                        aria-hidden='true'
                        className={`block absolute h-0.5 w-5 bg-current transform transition duration-200 ease-in-out ${navbarOpen ? 'rotate-45' : '-translate-y-1.5'
                          }`}></span>
                      <span
                        aria-hidden='true'
                        className={`block absolute  h-0.5 w-5 bg-current transform transition duration-200 ease-in-out ${navbarOpen ? 'opacity-0' : 'opacity-100'
                          }`}></span>
                      <span
                        aria-hidden='true'
                        className={`block absolute  h-0.5 w-5 bg-current transform transition duration-200 ease-in-out ${navbarOpen ? '-rotate-45' : 'translate-y-1.5'
                          }`}></span>
                    </div>
                  </button>
                </li>
              </ul>
            </nav>
            <div className='flex mt-auto ml-1.5'>
              {/* Dark mode */}
              <button
                className='flex items-center justify-center w-12 h-12 transition-all duration-150 ease-in rounded-sm focus:outline-none group bg-transparent outline-none'
                onClick={() => {
                  setTheme(theme === 'dark' ? 'light' : 'dark');
                }}>
                {renderThemeChanger()}
              </button>
            </div>
          </div>
        </header>
        {/* pages started from here */}
        {/* Content Container */}
        <div className='container relative z-30 mx-auto'>
          {/* Hero Content */}
          <main className={`flex-col flex h-screen`} id='home' ref={homeRef}>
            {/* Main */}
            <div className='container relative flex flex-col items-start justify-center flex-grow px-0 mx-auto md:px-20 lg:px-24 section'>
              <div className='w-full'>
                <span
                  className={` text-2xl font-semibold `}
                  style={{ color: Color }}>
                  Hello! 👋 My name is
                </span>

                <h1 className='mb-4 text-5xl md:text-7xl dark:text-white text-dark'>
                  {data.HomePage.name}
                </h1>
                <h2 className='mb-4 text-3xl md:text-4xl dark:text-light text-mid'>
                  <ReactTypingEffect
                    typingDelay={200}
                    speed={30}
                    eraseSpeed={30}
                    eraseDelay={1500}
                    text={data.HomePage.Position}
                  />
                </h2>
                <p className='w-4/5 text-xl md:w-full'>
                  {data.HomePage.description}
                </p>
                <button
                  className={`mt-4 btn-lg group`}
                  style={{ backgroundColor: BColor }}
                  onClick={() => {
                    scrollTo(myWorkRef.current);
                  }}>
                  See my Work
                </button>
              </div>
            </div>
          </main>

          {/* About */}
          <section
            className='flex flex-col w-full px-0 md:px-20 lg:px-24 py-28 section'
            id='about'
            ref={aboutRef}>
            <div className='flex flex-col'>
              <h2 className='text-5xl'>About</h2>
              <hr
                className={`w-40 h-1.5 mt-4 mb-6 border-0`}
                style={{ backgroundColor: Color }}></hr>

              <div className='flex flex-col-reverse items-start w-full md:flex-row'>
                <div className='flex flex-col w-full md:pr-8 md:w-3/5'>
                  <p className='text-lg'>{data?.AboutPage?.AboutParagraph}</p>
                </div>
                <div className='flex w-full h-full mb-4 md:pl-8 md:w-2/5 md:mb-0'>
                  <Image
                    src={data?.AboutPage?.ImageLink}
                    className='overflow-hidden rounded-md'
                    width={880}
                    height={880}
                    alt={'Image'}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Skills */}
          <section
            className='flex flex-col w-full px-0 md:px-20 lg:px-24 py-28 section'
            id='skills'
            ref={skillsRef}>
            <h2 className='text-5xl'>Skills</h2>
            <hr
              className={` w-40 h-1.5 mt-4 mb-6 border-0`}
              style={{ backgroundColor: Color }}></hr>

            <SkillSection skills={data.Skills}/>
          </section>

          {/* My Work */}
          <section
            className='flex flex-col w-full px-0 md:px-20 lg:px-24 py-28 section'
            id='my-work'
            ref={myWorkRef}>
            {/* My Work header */}
            <h2 className='text-5xl'>My Work</h2>
            <hr
              className={` w-40 h-1.5 mt-4 mb-6 border-0`}
              style={{ backgroundColor: Color }}></hr>

            <div className='flex flex-col w-full mb-12'>
              {/* Project One */}
              {data.Projects.map(function (project, i) {
                return (
                  <div key={i}>
                    {i % 2 == 0 ? (
                      <FeaturedProjectCard
                        key={i}
                        title={`${project.title}`}
                        status={`${project.Status}`}
                        description={`${project.Description}`}
                        stack={project.Technologies}
                        float={`right-0`}
                        flexDirection={`flex-col lg:flex-row`}
                        imgWidth={'1366'}
                        imgHeight={'666'}
                        imgSrc={project.ImageLink}
                        liveLink={`${project.DemoLink}`}
                        repoLink={null}
                      />
                    ) : (
                      <FeaturedProjectCard
                        key={i}
                        title={`${project.title}`}
                        status={`${project.Status}`}
                        description={`${project.Description}`}
                        stack={project.Technologies}
                        float={`right-0`}
                        flexDirection={`flex-col lg:flex-row-reverse`}
                        imgWidth={'1366'}
                        imgHeight={'666'}
                        imgSrc={project.ImageLink}
                        liveLink={`${project.DemoLink}`}
                        repoLink={null}
                      />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Other Projects header */}
            {/* <h2 className="text-4xl text-center">Other Projects</h2>
            <hr className={`${BColor} w-40 h-1.5 mt-4 mb-6 mx-auto border-0`}></hr>
            <p className="mb-16 text-lg text-center">
              Check out some of the projects I&apos;ve been a part of...
            </p> */}

            {/* Other Projects Container */}
            {/* <div className="grid grid-flow-row grid-rows-2 gap-4 grid-col-1 lg:grid-cols-3">
              {projects.map(function (project, i) {
                return <ProjectCard project={project} key={i} />;
              })}
            </div> */}
          </section>

          {/* Blog */}
          {/* <section
            className="flex flex-col w-full px-0 md:px-20 lg:px-24 py-28 section"
            id="blog"
            ref={blogRef}
          > */}
          {/* Blog header */}
          {/* <h2 className="text-5xl">Blog</h2>
            <hr className={`${BColor} w-40 h-1.5 mt-4 mb-6 border-0`}></hr>

            <BlogList publications={publications} /> */}
          {/* </section> */}

          {/* Contact */}
          <section
            className='flex flex-col w-full px-0 md:px-20 lg:px-24 py-28 section'
            id='contact'
            ref={contactRef}>
            <h2 className='text-5xl'>Contact</h2>
            <hr
              className={` w-40 h-1.5 mt-4 mb-6 border-0`}
              style={{ backgroundColor: Color }}></hr>

            <div className='flex flex-col-reverse w-full md:flex-row'>
              <div className='w-full mb-4 md:pl-0 md:mb-0'>
                <p className='text-lg'>
                  I&apos;m currently available to get involved in new projects,
                  so get in touch if you&apos;d like to work together.
                </p>
                <p className='text-lg'>
                  Email me at{' '}
                  <Link href={`mailto:${data.Contact.Email}`} className='underline-link'>
                    {data.Contact.Email}
                  </Link>
                  and let&apos;s talk about your project!
                </p>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className='flex flex-col w-full px-0 py-16 md:px-20 lg:px-24 section'>
            <hr className='w-full h-1 mb-16 dark:bg-white bg-dark border-0 opacity-10'></hr>

            <div className='flex flex-col items-start md:flex-row'>
              <Link
                passHref
                href={`https://github.com/20dcs/Profolio`}
                className='w-auto mb-4 md:mb-0'>
                &copy; ProFolio
              </Link>
            </div>
          </footer>
        </div>

        {/* Fixed Container */}
        <div className='fixed bottom-0 z-30 w-full'>
          <div className='container relative flex h-full mx-auto'>
            {/* Profile Icons */}
            <div className='absolute bottom-0 items-center hidden mt-auto mr-auto text-white left-8 md:flex md:flex-col'>
              <GitHubProfile marginBottom={'mb-4'} />
              <TwitterProfile marginBottom={'mb-4'} />
              <LinkedInProfile marginBottom={'mb-4'} />
              <div className='w-0.5 dark:bg-white bg-dark h-24 opacity-20 mt-2'></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

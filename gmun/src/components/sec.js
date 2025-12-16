import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md';
import React, { useEffect, useRef, useState, lazy, Suspense } from 'react';
import styles from './sec.module.css';

// Lazy-loaded icons
const FaFacebookF = lazy(() =>
  import('react-icons/fa').then(module => ({ default: module.FaFacebookF }))
);
const FaLinkedinIn = lazy(() =>
  import('react-icons/fa').then(module => ({ default: module.FaLinkedinIn }))
);
const FaInstagram = lazy(() =>
  import('react-icons/fa').then(module => ({ default: module.FaInstagram }))
);

const MAX_ROTATION = 20;
const ANIMATION_DURATION_MS = 1000;

const TeamCard3D = ({ member }) => {
  const cardRef = useRef(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [shine, setShine] = useState({ x: 50, y: 50 });
  const [isHovering, setIsHovering] = useState(false);
  const [socialsHovering, setSocialsHovering] = useState(false);

  const handleMouseMove = e => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const tiltY = (e.clientX - centerX) / (rect.width / 2);
    const tiltX = (e.clientY - centerY) / (rect.height / 2);

    const rotY = tiltY * MAX_ROTATION;
    const rotX = tiltX * MAX_ROTATION * -1;

    setRotation({ x: rotX, y: rotY });

    const shineX = ((e.clientX - rect.left) / rect.width) * 100;
    const shineY = ((e.clientY - rect.top) / rect.height) * 100;
    setShine({ x: shineX, y: shineY });

    if (!isHovering) setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setTimeout(() => {
      if (!socialsHovering) {
        setRotation({ x: 0, y: 0 });
        setShine({ x: 50, y: 50 });
        setIsHovering(false);
      }
    }, 100);
  };

  const handleSocialsEnter = () => {
    setSocialsHovering(true);
    setIsHovering(true);
  };

  const handleSocialsLeave = () => {
    setSocialsHovering(false);
    setTimeout(() => {
      if (cardRef.current && !cardRef.current.matches(':hover')) {
        setIsHovering(false);
      }
    }, 100);
  };

  const cardStyle = {
    '--rotX': `${rotation.x}deg`,
    '--rotY': `${rotation.y}deg`,
    '--shineX': `${shine.x}%`,
    '--shineY': `${shine.y}%`,
    '--imgScale': isHovering ? 1.08 : 1.0,
  };

  return (
    <div
      ref={cardRef}
      className={`${styles.teamCard} ${isHovering ? styles.isHovering : ''}`}
      style={cardStyle}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className={styles.cardRevealBacking}></div>

      <div className={styles.cardContent}>
        <div className={styles.cardShine}></div>
        <div className={styles.image}>
          <img src={member.image} alt={member.name} loading="lazy" />
        </div>

        <div className={styles.textRevealWrapper}>
          <div className={styles.text}>
            <h2 className={styles.reveal}>{member.name}</h2>
            <p>{member.role}</p>
            <div
              className={styles.socialIcons}
              onMouseEnter={handleSocialsEnter}
              onMouseLeave={handleSocialsLeave}
            >
              <Suspense fallback={<span>...</span>}>
                {member.facebook && (
                  <a href={member.facebook} target="_blank" rel="noopener noreferrer">
                    <FaFacebookF />
                  </a>
                )}
                {member.linkedin && (
                  <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                    <FaLinkedinIn />
                  </a>
                )}
                {member.instagram && (
                  <a href={member.instagram} target="_blank" rel="noopener noreferrer">
                    <FaInstagram />
                  </a>
                )}
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Sec = () => {
  const mainSectionRef = useRef(null);
  const USGScrollRef = useRef(null);
  const secretariatScrollRef = useRef(null);

  const [teamData, setTeamData] = useState([]);
  const [secretariatData, setSecretariatData] = useState([]);
  const [USGScrollState, setUSGScrollState] = useState('both');
  const [secretariatScrollState, setSecretariatScrollState] = useState('both');
  const [activeTab, setActiveTab] = useState('usg');
  const [lineAnimationStage, setLineAnimationStage] = useState('none');
  const [isAnimating, setIsAnimating] = useState(false);
  const [showScrollToStart, setShowScrollToStart] = useState(false);

  const handleTabClick = tabName => {
    if (activeTab === tabName) return;

    setIsAnimating(true);
    setLineAnimationStage(`${tabName}-start`);

    setActiveTab(tabName);

    if (mainSectionRef.current) {
      mainSectionRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }

    setTimeout(() => {
      setLineAnimationStage(`${tabName}-end`);
      setTimeout(() => {
        setIsAnimating(false);
        setLineAnimationStage('none');
      }, 300);
    }, 300);
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const usg = await import('./teamData');
        setTeamData(usg.default || []);
        const secretariat = await import('./secretariat');
        setSecretariatData(secretariat.default || []);
      } catch (error) {
        console.error('Failed to load data:', error);
      }
    };
    loadData();
  }, []);


  const updateScrollState = (ref, setState) => {
    if (!ref.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = ref.current;

    // If there is nothing to scroll, hide arrows
    if (scrollWidth <= clientWidth + 5) {
        setState('none');
        return;
    }

    // LEFT edge → disable LEFT arrow
    if (scrollLeft <= 5) {
        setState('start');
    }
    // RIGHT edge → disable RIGHT arrow
    else if (scrollLeft >= scrollWidth - clientWidth - 5) {
        setState('end');
    }
    // Middle → show both
    else {
        setState('both');
    }
};


  useEffect(() => {
    const u = USGScrollRef.current;
    const s = secretariatScrollRef.current;
    const handleU = () => updateScrollState(USGScrollRef, setUSGScrollState);
    const handleS = () =>
      updateScrollState(secretariatScrollRef, setSecretariatScrollState);
    if (u) u.addEventListener('scroll', handleU);
    if (s) s.addEventListener('scroll', handleS);
    return () => {
      if (u) u.removeEventListener('scroll', handleU);
      if (s) s.removeEventListener('scroll', handleS);
    };
  }, [teamData, secretariatData]);

  useEffect(() => {
    const handleScroll = () => {
      if (mainSectionRef.current) {
        const rect = mainSectionRef.current.getBoundingClientRect();
        setShowScrollToStart(rect.top < -100);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const createScrollHandler = (ref, direction) => () => {
    if (ref.current)
      ref.current.scrollBy({ left: 400 * direction, behavior: 'smooth' });
  };

  const handleScrollToStart = () => {
    const activeRef =
      activeTab === 'usg' ? USGScrollRef.current : secretariatScrollRef.current;
    if (activeRef) activeRef.scrollTo({ left: 0, behavior: 'smooth' });
  };

  const renderCarousel = (
    data,
    scrollRef,
    scrollLeftHandler,
    scrollRightHandler,
    scrollState
  ) => (
    <div className={`${styles.cardWrapper} ${styles[`shadow-${scrollState}`]}`}>
      {scrollState !== 'none' && (
        <div className={styles.horizontalNav}>
          <button
            onClick={scrollLeftHandler}
            className={`${styles.arrowBtn} ${styles.left}`}
            disabled={scrollState === 'start'}
          >
            <MdArrowBackIos />
          </button>
          <button
            onClick={scrollRightHandler}
            className={`${styles.arrowBtn} ${styles.right}`}
            disabled={scrollState === 'end'}
          >
            <MdArrowForwardIos />
          </button>
        </div>
      )}
      <div ref={scrollRef} className={styles.cardRow}>
        {data.map((member, index) => (
          <TeamCard3D key={index} member={member} />
        ))}
      </div>
    </div>
  );

  return (
    <div className={styles.gallery}>
      <div className={styles.mainSection} ref={mainSectionRef}>
        <header className={styles.teamHeader}>
          <div
            className={`${styles.animationLine} ${
              styles[lineAnimationStage] || ''
            }`}
          ></div>
          <div className={styles.headerContent}>
            <h1 className={styles.headerTitle}>SECRETARIAT</h1>
            <p className={styles.headerSubtitle}>
              Meet the dedicated individuals at the forefront of the conference.
            </p>
          </div>
        </header>

        <div className={styles.tabContainer}>
          <button
            className={`${styles.tabButton} ${
              activeTab === 'usg' ? styles.activeTab : ''
            }`}
            onClick={() => handleTabClick('usg')}
            disabled={isAnimating}
          >
            Under Secretary Generals
          </button>
          <button
            className={`${styles.tabButton} ${
              activeTab === 'secretariat' ? styles.activeTab : ''
            }`}
            onClick={() => handleTabClick('secretariat')}
            disabled={isAnimating}
          >
            Secretariat
          </button>
        </div>

        <div className={styles.carouselSection}>
          {activeTab === 'usg' &&
            renderCarousel(
              teamData,
              USGScrollRef,
              createScrollHandler(USGScrollRef, -1),
              createScrollHandler(USGScrollRef, 1),
              USGScrollState
            )}
          {activeTab === 'secretariat' &&
            renderCarousel(
              secretariatData,
              secretariatScrollRef,
              createScrollHandler(secretariatScrollRef, -1),
              createScrollHandler(secretariatScrollRef, 1),
              secretariatScrollState
            )}
        </div>
      </div>
      <button
        className={`${styles.scrollToStartBtn} ${
          showScrollToStart ? styles.visible : ''
        }`}
        onClick={handleScrollToStart}
      >
        <MdArrowBackIos />
      </button>
    </div>
  );
};

export default Sec;

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import PropTypes from 'prop-types';
import style from './styles/projectCard.module.css';

const ProjectCard = ({ project, index, onLearnMore }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePosition({ x, y });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Tilt
        className={style.tilt_wrapper}
        tiltMaxAngleX={15}
        tiltMaxAngleY={15}
        perspective={1000}
        scale={1.02}
        transitionSpeed={400}
        gyroscope={true}
      >
        <div
          ref={cardRef}
          className={style.card}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Animated gradient border */}
          <div className={style.gradient_border} />

          {/* Mouse tracking glow effect */}
          <div
            className={style.glow}
            style={{
              opacity: isHovered ? 1 : 0,
              background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(34, 171, 250, 0.15), transparent 40%)`,
            }}
          />

          {/* Card inner content */}
          <div className={style.card_inner}>
            {/* Image Section */}
            <div className={style.image_container}>
              <img
                src={project.img}
                alt={project.name}
                className={style.image}
                loading="lazy"
              />
              {/* Overlay on hover */}
              <motion.div
                className={style.image_overlay}
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovered ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <motion.button
                  type="button"
                  className={style.learn_more_btn}
                  onClick={() => onLearnMore(project)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  <span className={style.btn_icon}>&#10132;</span>
                  View Project
                </motion.button>
              </motion.div>

              {/* Floating tech badge */}
              <div className={style.floating_badge}>
                <span className={style.badge_dot} />
                <span>{project.tech[0]}</span>
              </div>
            </div>

            {/* Info Section */}
            <div className={style.info}>
              <h3 className={style.title}>{project.name}</h3>

              <p className={style.description}>{project.desc}</p>

              {/* Tech Stack */}
              <div className={style.tech_container}>
                {project.tech.slice(0, 4).map((tech, i) => (
                  <motion.span
                    key={tech}
                    className={style.tech_tag}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * i }}
                    whileHover={{ scale: 1.1, y: -2 }}
                    data-index={i}
                  >
                    {tech}
                  </motion.span>
                ))}
                {project.tech.length > 4 && (
                  <span className={style.tech_more}>+{project.tech.length - 4}</span>
                )}
              </div>

              {/* Action links */}
              <div className={style.actions}>
                <a
                  href={project.source_link}
                  target="_blank"
                  rel="noreferrer"
                  className={style.action_link}
                >
                  <svg className={style.action_icon} viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  Code
                </a>
                {project.live_link && (
                  <a
                    href={project.live_link}
                    target="_blank"
                    rel="noreferrer"
                    className={`${style.action_link} ${style.action_link_primary}`}
                  >
                    <svg className={style.action_icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                    Live Demo
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Decorative corner accents */}
          <div className={`${style.corner} ${style.corner_tl}`} />
          <div className={`${style.corner} ${style.corner_br}`} />
        </div>
      </Tilt>
    </motion.div>
  );
};

ProjectCard.propTypes = {
  project: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
    tech: PropTypes.arrayOf(PropTypes.string).isRequired,
    img: PropTypes.string.isRequired,
    source_link: PropTypes.string.isRequired,
    live_link: PropTypes.string,
  }).isRequired,
  index: PropTypes.number.isRequired,
  onLearnMore: PropTypes.func.isRequired,
};

export default ProjectCard;

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import style from './styles/work.module.css';
import SectionWrapper from '../hoc';
import { projects } from '../constants';
import { fadeIn, textVariant } from '../utils/motion';
import Popup from './Popup';

const Work = () => {
  const [isOpen, setOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const handlePopupClick = (project) => {
    setSelectedProject(project);
    setOpen(true);
  };

  const handlePopupClose = () => {
    setSelectedProject(null);
    setOpen(false);
  };

  return (
    <div className="relative">
      <motion.h1 variants={textVariant()} className={style.title}>
        My Recent Works
      </motion.h1>
      <div className={style.project_container}>
        {/* Projects Card */}
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            variants={fadeIn('up', '', index * 0.4, 0.5)}
            index={index}
            className={style.card}
          >
            {/* Image Section with Hover Overlay */}
            <div className={style.card_image_wrapper}>
              <img className={style.img} src={project.img} alt="project sample" loading="lazy" />
              <div className={style.card_overlay}>
                <div className={style.card_text}>
                  <button type="button" className={style.btn_container} onClick={() => handlePopupClick(project)}>
                    <span className={style.btn_hover}>Learn more</span>
                    <span className={style.btn}>Learn more</span>
                  </button>
                </div>
              </div>
            </div>
            {/* Info Section - Always Visible */}
            <div className={style.card_info}>
              <h3 className={style.info_name}>{project.name}</h3>
              <p className={style.info_desc}>{project.desc}</p>
              <div className={style.info_tech}>
                {project.tech.slice(0, 4).map((tech) => (
                  <span key={tech} className={style.info_tech_tag}>{tech}</span>
                ))}
                {project.tech.length > 4 && (
                  <span className={style.info_tech_more}>+{project.tech.length - 4}</span>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      {/* Popup Window */}
      <AnimatePresence>
        {isOpen && (
          <Popup handleClose={handlePopupClose} project={selectedProject} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default SectionWrapper(Work, 'work', 'my-8');

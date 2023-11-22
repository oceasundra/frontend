import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fadeIn } from "../variants";
import { BsArrowUpRight } from 'react-icons/bs'
import axios from "axios";

const Work = () => {
  const [projects, setProjects] = useState([]);
  const [project, setProject] = useState(null);
  const [error, setError] = useState(null);

  const fetchDataProject = async () => {
    try {
      const response = await axios.get("projects");
      const firstProject = response.data.data.data[0];

      setProject(firstProject);
    } catch (error) {
      console.error("Error fetching project:", error);
      setError("An error occurred while fetching project.");
    }
  };

  useEffect(() => {
    fetchDataProject();
  }, []);

  const fetchDataProjects = async () => {
    try {
      const response = await axios.get("projects");
      const projectData = response.data.data.data;

      setProjects(projectData);
    } catch (error) {
      console.error("Error fetching projects:", error);
      setError("An error occurred while fetching projects.");
    }
  };

  useEffect(() => {
    fetchDataProjects();
  }, []);

  return (
    <section className="section" id="work">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row gap-x-10">
          <motion.div
            variants={fadeIn("right", 0.3)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.3 }}
            className="flex-1 flex flex-col gap-y-12 mt-10 lg:mb-0 mb-10"
          >
            <div>
              <h2 className="h2 leading-tight text-accent">
                My Latest <br />
                Work
              </h2>
              <p className="max-w-sm">
                This is the last project I worked on during my work practice in
                the industrial world.
              </p>
            </div>
            <div className="group relative overflow-hidden border-2 border-white/50 rounded-xl">
              <div className="group-hover:bg-black/70 w-full h-full absolute z-40 transition-all duration-300"></div>
              {error ? (
                <div className="bg-red-500 text-white p-4 rounded mb-0">
                  {error}
                </div>
              ) : project ? (
                <div>
                  <img
                    className="group-hover:scale-125 transition-all duration-500"
                    src={project.image}
                    alt={project.title}
                  />
                  <div className="absolute -bottom-full left-12 group-hover:bottom-24 transition-all duration-500 z-50">
                    <span className="text-gradient">{project.title}</span>
                  </div>
                  <div className="absolute -bottom-full left-12 group-hover:bottom-10 transition-all duration-700 z-50">
                    <p className="text-white">{project.desc}</p>
                  </div>
                  <div className="absolute -bottom-full right-6 group-hover:top-10 transition-all duration-500 z-50">
                    <a href={project.url} className="btn w-9 h-9 mb-[42px] flex justify-center items-center" target="_blank">
                      <BsArrowUpRight />
                    </a>
                  </div>
                </div>
              ) : (
                <div className="bg-red-500 text-white p-4 rounded mb-0">
                  Data Belum Tersedia!
                </div>
              )}
            </div>
          </motion.div>
          <motion.div
            variants={fadeIn("left", 0.2)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.3 }}
            className="flex-1 flex flex-col gap-y-10"
          >
            {error ? (
              <div className="bg-red-500 text-white p-4 rounded mb-0">
                {error}
              </div>
            ) : projects.length > 0 ? (
              <div className="grid gap-8">
                {projects.slice(1).map((project, index) => (
                  <div
                    key={index}
                    className="group relative overflow-hidden border-2 border-white/50 rounded-xl"
                  >
                    <div className="group-hover:bg-black/70 w-full h-full absolute z-40 transition-all duration-300"></div>
                    <img
                      className="group-hover:scale-125 transition-all duration-500"
                      src={project.image}
                      alt={project.title}
                    />
                    <div className="absolute -bottom-full left-12 group-hover:bottom-24 transition-all duration-500 z-50">
                      <span className="text-gradient">{project.title}</span>
                    </div>
                    <div className="absolute -bottom-full left-12 group-hover:bottom-10 transition-all duration-700 z-50">
                      <p className="text-white">{project.desc}</p>
                    </div>
                    <div className="absolute -bottom-full right-6 group-hover:top-10 transition-all duration-500 z-50">
                    <a href={project.url} className="btn w-9 h-9 mb-[42px] flex justify-center items-center" target="_blank">
                      <BsArrowUpRight />
                    </a>
                  </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-red-500 text-white p-4 rounded mb-0">
                Data Belum Tersedia!
              </div>
            )}

            {/* <div className="group relative overflow-hidden border-2 border-white/50 rounded-xl">
              <div className="group-hover:bg-black/70 w-full h-full absolute z-40 transition-all duration-300"></div>
              <img
                className="group-hover:scale-125 transition-all duration-500"
                src={Img3}
                alt=""
              />
              <div className="absolute -bottom-full left-12 group-hover:bottom-24 transition-all duration-500 z-50">
                <span className="text-gradient">UI/UX Design</span>
              </div>
              <div className="absolute -bottom-full left-12 group-hover:bottom-14 transition-all duration-700 z-50">
                <span className="text-3xl text-white">Project Title</span>
              </div>
            </div> */}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Work;

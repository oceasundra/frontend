import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NavbarAdmin from "../components/NavbarAdmin";

const Dashboard = () => {

  const [projects, setProjects] = useState([]);

  const fetchDataProjects = async () => {
    await axios.get("projects").then((response) => {
      setProjects(response.data.data.data);
    });
  };

  useEffect(() => {
    fetchDataProjects();
  }, []);

  const deleteProject = async (slug) => {
    await axios.delete(`projects/${slug}`)
      .then(() => {
        fetchDataProjects();
      })
  }

  return (
    <div className="bg-site bg-no-repeat bg-cover overflow-hidden">
      <NavbarAdmin />
      <div className="container mx-auto mt-5">
        <h3 className="h3">My Projects</h3>
      </div>
      <div className="container mx-auto mt-10 mb-5">
        <div className="grid grid-cols-1">
          <div className="col-span-1">
            <Link
              to="/admin/projects/create"
              className="btn rounded shadow px-4 py-2 mb-3"
            >
              Add New Projects
            </Link>
            <div className="rounded shadow">
              <div className="p-4">
                <table className="table-auto w-full border-collapse">
                  <thead className="text-white">
                    <tr>
                      <th className="col">
                        Title
                      </th>
                      <th className="col">
                        Slug
                      </th>
                      <th className="col">
                        Image
                      </th>
                      <th className="col">
                        Url
                      </th>
                      <th className="col">
                        Desciption
                      </th>
                      <th className="col">
                        Aksi
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {projects.length > 0 ? (
                      projects.map((project, index) => (
                        <tr key={index}>
                          <td>
                            {project.title}
                          </td>
                          <td>
                            {project.slug}
                          </td>
                          <td className="text-center">
                            <img
                              src={project.image}
                              alt={project.title}
                              width="200"
                            />
                          </td>
                          <td>
                            {project.url}
                          </td>
                          <td>
                            {project.desc}
                          </td>
                          <td className="text-center">
                          <Link to={`/admin/projects/update/${project.slug}`} className="btn rounded-sm">Update</Link>
                            <button onClick={() => deleteProject(project.slug)} className="btn rounded-sm">
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="text-center">
                          <div className="bg-red-500 text-white p-4 rounded mb-0">
                            Data Belum Tersedia!
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='h-[400px]'></div>
    </div>
  );
};

export default Dashboard;



using System;
using System.Collections.Generic;
using CoverageDashboard.Application.Projects.Dto;
using CoverageDashboard.Mongo.Repositories;
using CoverageDashboard.Mongo.Collections;
using System.Threading.Tasks;
using AutoMapper;
using System.Linq;

namespace CoverageDashboard.Application.Projects
{
    public class ProjectAppService : IProjectAppService
    {
        /// <summary>
        ///  project repository
        /// </summary>
        private readonly IProjectRepository  _projectRepository;


        public Task<int> CreateorUpdateProject(CreateUpdateProject input)
        {
            Project proj = new Project();
            proj.Id = input.Id;
            proj.Name = input.Code;
            proj.Code = input.Code;
            proj.Description = input.Description;
            proj.AssignedTo = input.AssignedTo;

            return _projectRepository.InsertOrUpdateAndGetIdAsync(proj);
        }

        public void DeleteProject(int projectId)
        {
             _projectRepository.Delete(projectId);
        }

        public SelectProject GetProject(int projectId)
        {
            var project = _projectRepository.Get(projectId);
            return Mapper.Map<Project, SelectProject>(project);            
         }

        public IList<SelectProject> GetProjects()
        {
            var prs =  _projectRepository.GetAll();
            return new List<SelectProject>(Mapper.Map<IQueryable<Project>,IList<SelectProject>>(prs));
        }
    }
}

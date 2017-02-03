
using System.Collections.Generic;
using CoverageDashboard.Application.Projects.Dto;
using CoverageDashboard.Mongo.Repositories;
using CoverageDashboard.Mongo.Collections;
using System.Threading.Tasks;
using AutoMapper;
using System.Linq;
using CoverageDashboard.Core.Application;

namespace CoverageDashboard.Application.Projects
{
    public class ProjectAppService : ApplicationService, IProjectAppService
    {
        /// <summary>
        ///  project repository
        /// </summary>
        private readonly IProjectRepository _projectRepository;


        public ProjectAppService(IProjectRepository projectRepository)
        {
            _projectRepository = projectRepository;
        }


        public Task<int> CreateorUpdateProject(ProjectInputDto input)
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

        public ProjectViewDto GetProject(int projectId)
        {
            var project = _projectRepository.Get(projectId);
            return Mapper.Map<Project, ProjectViewDto>(project);
        }

        public IList<ProjectViewDto> GetProjects()
        {
            var prs = _projectRepository.GetAll();
            return new List<ProjectViewDto>(Mapper.Map<IQueryable<Project>, IList<ProjectViewDto>>(prs));
        }
    }
}

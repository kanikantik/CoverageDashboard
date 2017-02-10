
using System.Collections.Generic;
using CoverageDashboard.Application.Projects.Dto;
using CoverageDashboard.Mongo.Repositories;
using CoverageDashboard.Mongo.Collections;
using System.Threading.Tasks;
using AutoMapper;
using System.Linq;
using CoverageDashboard.Core.Application;
using CoverageDashboard.Application.AutoMapper;

namespace CoverageDashboard.Application.Projects
{
    public class ProjectAppService : ApplicationService, IProjectAppService
    {
        /// <summary>
        ///  project repository
        /// </summary>
        private readonly IProjectRepository _projectRepository;
        //shekar DI
        //private readonly IMapping _mapper;

        public ProjectAppService(IProjectRepository projectRepository)
        {
            _projectRepository = projectRepository;

        }

        //shekar DI
        //public ProjectAppService(IProjectRepository projectRepository, IMapping mapper)
        //{
        //    _projectRepository = projectRepository;
        //    _mapper = mapper;
        //}


        //shekar DI
        //public Task<int> CreateorUpdateProject(ProjectInputDto input)
        //{
        //    var proj = _mapper.Map<ProjectInputDto, Project>(input);
        //    return _projectRepository.InsertOrUpdateAndGetIdAsync(proj);
        //}


        public Task<int> CreateorUpdateProject(ProjectInputDto input)
        {
            var proj = AutoMapperConfig.Mapper.Map<Project>(input);
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

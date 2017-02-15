
using System.Collections.Generic;
using CoverageDashboard.Application.Projects.Dto;
using CoverageDashboard.Mongo.Repositories;
using CoverageDashboard.Mongo.Collections;
using System.Threading.Tasks;
using AutoMapper;
using System.Linq;
using CoverageDashboard.Core.Application;
using CoverageDashboard.Application.AutoMapper;
using System;

namespace CoverageDashboard.Application.Projects
{
    public class ProjectAppService : ApplicationService, IProjectAppService
    {
        /// <summary>
        ///  project repository
        /// </summary>
        private readonly IProjectRepository _projectRepository;

        ///
        //private readonly IMapping _mapper;

        public ProjectAppService(IProjectRepository projectRepository)
        {
            _projectRepository = projectRepository;
            //_mapper = mapper;
        }

        public Task<string> CreateorUpdateProject(ProjectInputDto input)
        {
            var proj = AutoMapperConfig.Mapper.Map<ProjectInputDto, Project>(input);
            return _projectRepository.InsertOrUpdateAndGetIdAsync(proj);
        }


        public void DeleteProject(string projectId)
        {
            _projectRepository.Delete(projectId);
        }

        public ProjectViewDto GetProject(string projectId)
        {
            var project = _projectRepository.Get(projectId);
            return AutoMapperConfig.Mapper.Map<Project, ProjectViewDto>(project);
        }

        public IList<ProjectViewDto> GetProjects()
        {
            var prs = _projectRepository.GetAllList();
            return new List<ProjectViewDto>(AutoMapperConfig.Mapper.Map<List<Project>, IList<ProjectViewDto>>(prs));
        }

        public async Task<IList<ProjectViewDto>> GetAllProjectAsync()
        {
            var prs = await _projectRepository.GetAllListAsync();
            return new List<ProjectViewDto>(AutoMapperConfig.Mapper.Map<IList<Project>, IList<ProjectViewDto>>(prs));
        }

    }
}

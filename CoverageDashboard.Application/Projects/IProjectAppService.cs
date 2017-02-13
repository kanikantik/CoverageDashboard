using CoverageDashboard.Application.Projects.Dto;
using System.Collections.Generic;
using System.Threading.Tasks;
using CoverageDashboard.Core.Application;

namespace CoverageDashboard.Application.Projects
{
    public interface IProjectAppService : IApplicationService
    {
        Task<string> CreateorUpdateProject(ProjectInputDto input);

        ProjectViewDto GetProject(string projectId);

        IList<ProjectViewDto> GetProjects();

        void DeleteProject(string projectId); // soft delete

        Task<IList<ProjectViewDto>> GetAllProjectAsync();
    }
}

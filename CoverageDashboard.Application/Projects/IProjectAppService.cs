using CoverageDashboard.Application.Projects.Dto;
using CoverageDashboard.Core.Application;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CoverageDashboard.Application.Projects
{
    public interface IProjectAppService : IApplicationService
    {
        Task<int> CreateorUpdateProject(CreateUpdateProject input);

        SelectProject GetProject(int projectId);

        IList<SelectProject> GetProjects();

        void DeleteProject(int projectId); // soft delete
    }
}

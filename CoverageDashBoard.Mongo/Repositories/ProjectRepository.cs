
using CoverageDashboard.Mongo.Collections;

namespace CoverageDashboard.Mongo.Repositories
{
    public class ProjectRepository : MongoDbRepositoryBase<Project>, IProjectRepository
    {
        public ProjectRepository(IMongoDatabaseProvider databaseProvider) : base(databaseProvider)
        {
        }
    }
}

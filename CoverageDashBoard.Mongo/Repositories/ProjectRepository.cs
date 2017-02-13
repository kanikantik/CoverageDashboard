
using CoverageDashboard.Mongo.Collections;
using MongoDB.Bson;

namespace CoverageDashboard.Mongo.Repositories
{
    public class ProjectRepository : MongoDbRepositoryBase<Project,string>, IProjectRepository
    {
        public ProjectRepository(IMongoDbContextProvider databaseProvider) : base(databaseProvider)
        {
        }
    }
}

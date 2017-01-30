using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
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

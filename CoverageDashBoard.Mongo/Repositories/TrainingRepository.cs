using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CoverageDashboard.Mongo.Collections;

namespace CoverageDashboard.Mongo.Repositories
{
    public class TrainingRepository : MongoDbRepositoryBase<Training, string>, ITrainingRepository
    {
        public TrainingRepository(IMongoDbContextProvider databaseProvider) : base(databaseProvider)
        {
        }
    }
}

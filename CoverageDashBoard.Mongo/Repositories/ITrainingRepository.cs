using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CoverageDashboard.Core.Repositories;
using CoverageDashboard.Mongo.Collections;

namespace CoverageDashboard.Mongo.Repositories
{
    public interface ITrainingRepository : IRepository<Training, string>
    {
    }
}

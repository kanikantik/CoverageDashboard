using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CoverageDashboard.Core.Repositories;
using CoverageDashboard.Mongo.Collections;
using MongoDB.Bson;

namespace CoverageDashboard.Mongo.Repositories
{
    public interface IProjectRepository : IRepository<Project,string>
    {
    }
}

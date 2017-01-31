using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CoverageDashboard.Core.Repositories;

namespace CoverageDashboard.Mongo.Collections
{
    public class Project : IEntity
    {

        public int Id { get; set; }

        public string Code { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public string AssignedTo { get; set; }

        public bool IsTransient()
        {
            return true;
        }

    }
}

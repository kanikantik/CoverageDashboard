using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CoverageDashboard.Core.Repositories;
using MongoDB.Bson.Serialization.Attributes;

namespace CoverageDashboard.Mongo.Collections
{
    public class Project : IEntity
    {
        [BsonElement("projectId")]
        [BsonId]
        public int Id { get; set; }

        [BsonElement("code")]
        public string Code { get; set; }

        [BsonElement("name")]
        public string Name { get; set; }

        [BsonElement("Desc")]
        public string Description { get; set; }

        public string AssignedTo { get; set; }

        public bool IsTransient()
        {
            return true;
        }

    }
}

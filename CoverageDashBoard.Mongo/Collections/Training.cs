using System;
using CoverageDashboard.Core.Repositories;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson.Serialization.IdGenerators;

namespace CoverageDashboard.Mongo.Collections
{
    [BsonIgnoreExtraElements]
    public class Training : IEntity<string>
    {
        [BsonId(IdGenerator = typeof(CustomIdGenerator))]
        public string Id { get; set; }
        [BsonElement("title")]
        public string Title { get; set; }
        [BsonElement("description")]
        public string Description { get; set; }
        [BsonElement("trainer")]
        public string Trainer { get; set; }
        [BsonElement("createdon")]
        public DateTime CreatedOn { get; set; } = DateTime.Now;
        [BsonElement("createdby")]
        public string CreatedBy { get; set; }
        [BsonElement("modifiedon")]
        public DateTime UpdatedOn { get; set; } = DateTime.Now;
        [BsonElement("modifiedby")]
        public string UpdatedBy { get; set; }
        public bool IsTransient()
        {
            return string.IsNullOrEmpty(Id);
        }


    }
}
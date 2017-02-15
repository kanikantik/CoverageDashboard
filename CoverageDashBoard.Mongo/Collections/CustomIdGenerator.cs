using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MongoDB.Bson.Serialization;

namespace CoverageDashboard.Mongo.Collections
{
    public class CustomIdGenerator : IIdGenerator
    {
        public object GenerateId(object container, object document)
        {
            return "Training_" + Guid.NewGuid().ToString();
        }

        public bool IsEmpty(object id)
        {
            return id == null || string.IsNullOrEmpty(Convert.ToString(id));
        }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MongoDB.Driver;
using CoverageDashboard.Core;
using System.Configuration;

namespace CoverageDashboard.Mongo
{
    public class MongoDbContext : IMongoDatabaseProvider
    {
        public IMongoDatabase Database
        {
            get
            {
                var client = new MongoClient(ConfigurationManager.AppSettings["connectionString"].ToString());
                if (client != null)                
                    return client.GetDatabase(ConfigurationManager.AppSettings["Database"].ToString());//test

                return null;
            }
                
        }
    }
}

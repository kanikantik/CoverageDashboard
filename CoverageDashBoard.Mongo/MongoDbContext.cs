using System;

using MongoDB.Driver;
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
                
                return client.GetDatabase(ConfigurationManager.AppSettings["Database"].ToString());//test
            }

        }
    }
}

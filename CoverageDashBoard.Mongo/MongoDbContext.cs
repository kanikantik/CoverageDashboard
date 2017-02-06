using MongoDB.Driver;
using System.Configuration;


namespace CoverageDashboard.Mongo
{
    public class MongoDbContext : IMongoDbContextProvider
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

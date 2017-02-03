namespace CoverageDashboard.Core.Configuration
{
    internal class MongoDbModuleConfiguration : IMongoDbModuleConfiguration
    {
        public string ConnectionString { get; set; }

        public string DatatabaseName { get; set; }
    }
}
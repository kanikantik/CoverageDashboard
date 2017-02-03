namespace CoverageDashboard.Core.Configuration
{
    public interface IMongoDbModuleConfiguration
    {
        string ConnectionString { get; set; }

        string DatatabaseName { get; set; }
    }
}

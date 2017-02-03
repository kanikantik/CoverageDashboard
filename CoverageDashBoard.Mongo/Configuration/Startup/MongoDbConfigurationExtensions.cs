using CoverageDashboard.Core.Configurations;
using CoverageDashboard.Core.Configuration;


namespace CoverageDashboard.Core.Configuration.Startup
{
    /// <summary>
    /// Defines extension methods to <see cref="IModuleConfigurations"/> to allow to configure ABP MongoDb module.
    /// </summary>
    public static class MongoDbConfigurationExtensions
    {
        /// <summary>
        /// Used to configure ABP MongoDb module.
        /// </summary>
        public static IMongoDbModuleConfiguration MongoDbConfig(this IModuleConfigurations configurations)
        {
            return configurations.DefaultConfiguration.Get<IMongoDbModuleConfiguration>();
        }
    }
}
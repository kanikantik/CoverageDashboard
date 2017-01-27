

using CoverageDashboard.Core.Dependency;

namespace CoverageDashboard.Core.Configurations
{
    public class DefaultConfigurations : IDefaultConfigurations
    {

        /// <summary>
        /// Reference to the IocManager.
        /// </summary>
        public IIocManager IocManager { get; }

        /// <summary>
        /// Gets/sets default connection string used by ORM module.
        /// It can be name of a connection string in application's config file or can be full connection string.
        /// </summary>
        public string DefaultNameOrConnectionString { get; set; }

        /// <summary>
        /// Private constructor for singleton pattern.
        /// </summary>
        public DefaultConfigurations(IIocManager iocManager)
        {
            IocManager = iocManager;
        }
    }
}


using System;
using CoverageDashboard.Core.Dependency;
using CoverageDashboard.Core.Configurations;

namespace CoverageDashboard.Core.Configurations
{
    public class DefaultConfigurations : DictionaryBasedConfig, IDefaultConfigurations
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

        public IModuleConfigurations Modules { get; private set; }

        /// <summary>
        /// Private constructor for singleton pattern.
        /// </summary>
        public DefaultConfigurations(IIocManager iocManager)
        {
            IocManager = iocManager;
        }

        public void Initialize()
        {
            Modules = IocManager.Resolve<IModuleConfigurations>();
        }
        
        public T Get<T>()
        {
            return GetOrCreate(typeof(T).FullName, () => IocManager.Resolve<T>());
        }
     }
}

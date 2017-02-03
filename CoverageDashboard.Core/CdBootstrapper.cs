using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Castle.MicroKernel.Registration;
using CoverageDashboard.Core.Configurations;
using CoverageDashboard.Core.Dependency;
using CoverageDashboard.Core.Dependency.Installers;
using CoverageDashboard.Core.Modules;

namespace CoverageDashboard.Core
{
    public class CdBootstrapper : IDisposable
    {
        /// <summary>
        /// Get the startup module of the application which depends on other used modules.
        /// </summary>
        public Type StartupModule { get; }

        /// <summary>
        /// Is this object disposed before?
        /// </summary>
        protected bool IsDisposed;

        /// <summary>
        /// Gets IIocManager object used by this class.
        /// </summary>
        public IIocManager IocManager { get; }

        private ModuleManager _moduleManager;


        public void Dispose()
        {
            if (IsDisposed)
            {
                return;
            }

            IsDisposed = true;

            _moduleManager?.ShutdownModules();
        }

       public virtual void Initialize()
        {
            RegisterBootstrapper();
            IocManager.IocContainer.Install(new CoreInstallers());
            IocManager.Resolve<DefaultConfigurations>().Initialize();

            _moduleManager = IocManager.Resolve<ModuleManager>();
            _moduleManager.Initialize(StartupModule);
            _moduleManager.StartModules();

           

        }

        private void RegisterBootstrapper()
        {
            IocManager iocManager = CoverageDashboard.Core.Dependency.IocManager.Instance;
            if (!iocManager.IsRegistered<CdBootstrapper>())
            {
                iocManager.IocContainer.Register(
                    Component.For<CdBootstrapper>().Instance(this)
                    );
            }
        }

        public static CdBootstrapper Create<TStartupModule>()
           where TStartupModule : MainModule
        {
            return new CdBootstrapper(typeof(TStartupModule));
        }

        /// <summary>
        /// Creates a new <see cref="CdBootstrapper"/> instance.
        /// </summary>
        /// <param name="startupModule">Startup module of the application which depends on other used modules. Should be derived from <see cref="AbpModule"/>.</param>
        private CdBootstrapper(Type startupModule)
            : this(startupModule, Dependency.IocManager.Instance)
        {

        }

        /// <summary>
        /// Creates a new <see cref="CdBootstrapper"/> instance.
        /// </summary>
        /// <param name="startupModule">Startup module of the application which depends on other used modules. Should be derived from <see cref="AbpModule"/>.</param>
        /// <param name="iocManager">IIocManager that is used to bootstrap the ABP system</param>
        private CdBootstrapper(Type startupModule, IIocManager iocManager)
        {
            if (startupModule != null && iocManager != null)
            {


                if (!typeof(MainModule).IsAssignableFrom(startupModule))
                {
                    throw new ArgumentException($"{nameof(startupModule)} should be derived from {nameof(MainModule)}.");
                }

                StartupModule = startupModule;
                IocManager = iocManager;
            }
        }

       

    }
    
}

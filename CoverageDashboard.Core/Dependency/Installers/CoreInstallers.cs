using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Castle.Facilities.Logging;
using Castle.MicroKernel.Registration;
using Castle.MicroKernel.SubSystems.Configuration;
using Castle.Windsor;
using CoverageDashboard.Core.Configurations;
using CoverageDashboard.Core.Logging;
using CoverageDashboard.Core.Modules;

namespace CoverageDashboard.Core.Dependency.Installers
{
  internal class CoreInstallers : IWindsorInstaller
    {
        public void Install(IWindsorContainer container, IConfigurationStore store)
        {
            //TODO: Register to IIocManager to not depend on Castle Windsor
            container.Register(
                 Component.For<IModuleConfigurations, ModuleConfigurations>().ImplementedBy<ModuleConfigurations>().LifestyleSingleton(),
                 Component.For<IDefaultConfigurations, DefaultConfigurations>().ImplementedBy<DefaultConfigurations>().LifestyleSingleton(),
                 Component.For<IModuleManager, ModuleManager>().ImplementedBy<ModuleManager>().LifestyleSingleton()

            );


            container.AddFacility<LoggingFacility>(f => f.LogUsing<Log4NetLoggerFactory>());
        }
    }
}

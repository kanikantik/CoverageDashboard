using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Castle.MicroKernel.Registration;
using CoverageDashboard.Core.Dependency;
using CoverageDashboard.Core.Dependency.Installers;
using CoverageDashboard.Core.Configurations;

namespace CoverageDashboard.Core
{
    public class CdBootstrapper : IDisposable
    {
        
        public void Dispose()
        {
            throw new NotImplementedException();
        }

       public void Bootstrap()
        {
            RegisterBootstrapper();
            IocManager.Instance.IocContainer.Install(new CoreInstallers());
            IocManager.Instance.Resolve<DefaultConfigurations>();
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
    }
}


using System.Reflection;
using CoverageDashboard.Core.Modules;
using CoverageDashboard.Application;
using CoverageDashboard.Core;
using CoverageDashboard.Core.Configuration;
using CoverageDashboard.Core.Configuration.Startup;
using CoverageDashBoard.WebApi;

namespace CoverageDashboard.WebApi
{
    [DependsOn(typeof(ApplicationModule), typeof(CoreModule))]
    public class WebApiModule : MainModule
    {public override void PreInitialize()
        {
            IocManager.AddConventionalRegistrar(new ApiControllerConventionalRegistrar());
            IocManager.Register<IWebApiConfiguration, WebApiConfiguration>();
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(Assembly.GetExecutingAssembly());

            
            //Configuration.Modules.WebApi().DynamicApiControllerBuilder
            //    .ForAll<IApplicationService>(typeof(ApplicationModule).Assembly, "app")
            //    .Build();
        }

        public override void PostInitialize()
        {
           // var httpConfiguration = IocManager.Resolve<IWebApiConfiguration>().HttpConfiguration;
           // Configuration.Modules.WebApi().HttpConfiguration.EnsureInitialized();
        }
    }
}
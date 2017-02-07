
using System.Reflection;
using System.Web.Http;
using Castle.MicroKernel.Registration;
using CoverageDashboard.Core.Modules;
using CoverageDashboard.Application;
using CoverageDashboard.Core;
using CoverageDashboard.Core.Configuration;
using CoverageDashboard.Core.Configuration.Startup;
using CoverageDashboard.WebApi.DependencyResolver;
using CoverageDashBoard.WebApi;

namespace CoverageDashboard.WebApi
{
    [DependsOn(typeof(ApplicationModule), typeof(CoreModule))]
    public class WebApiModule : MainModule
    {
        public override void PreInitialize()
        {
            var dependencyResolver = new WindsorDependencyResolver(IocManager.IocContainer);
            GlobalConfiguration.Configuration.DependencyResolver = dependencyResolver;
            IocManager.Register<IWebApiConfiguration, WebApiConfiguration>();
            IocManager.IocContainer.Register(Classes.FromThisAssembly().BasedOn<ApiController>().LifestylePerWebRequest());
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(Assembly.GetExecutingAssembly());
            var dependencyResolver = new WindsorDependencyResolver(IocManager.IocContainer);
        }

        public override void PostInitialize()
        {
           // var httpConfiguration = IocManager.Resolve<IWebApiConfiguration>().HttpConfiguration;
           // Configuration.Modules.WebApi().HttpConfiguration.EnsureInitialized();
        }
    }
}
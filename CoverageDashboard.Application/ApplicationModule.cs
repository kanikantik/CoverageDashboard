using System.Reflection;
using CoverageDashboard.Application.AutoMapper;
using CoverageDashboard.Core;
using CoverageDashboard.Core.Modules;
using CoverageDashboard.Mongo;

namespace CoverageDashboard.Application
{
    [DependsOn(typeof(CoreModule), typeof(DataModule))]
    public class ApplicationModule : MainModule
    {
        public override void PreInitialize()
        {
            //// Register automappers
            AutoMapperConfig.RegisterMappings();
            //shekar DI
            //MapperConfig.RegisterMapping();
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(Assembly.GetExecutingAssembly());
            //shekar DI
            //IocManager.Register<IMapping, EntityMapper>();
        }
    }
}

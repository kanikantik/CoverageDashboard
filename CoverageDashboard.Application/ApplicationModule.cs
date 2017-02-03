using System.Reflection;
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
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(Assembly.GetExecutingAssembly());
        }
    }
}

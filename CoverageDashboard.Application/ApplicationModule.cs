using System.Reflection;
using CoverageDashboard.Core;
using CoverageDashboard.Core.Modules;

namespace CoverageDashboard.Application
{
    [DependsOn(typeof(CoreModule))]
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

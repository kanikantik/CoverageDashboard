using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using CoverageDashboard.Core;
using CoverageDashboard.Core.Dependency;
using CoverageDashboard.Core.Modules;
using  System.Configuration;

namespace CoverageDashboard.Mongo
{
    [DependsOn(typeof(Core.CoreModule))]
    public class DataModule : Core.Modules.MainModule
    {
        public override void PreInitialize()
        {
            Configuration.DefaultNameOrConnectionString = ConfigurationManager.AppSettings["connectionString"].ToString();
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(Assembly.GetExecutingAssembly());
        }
    }
}

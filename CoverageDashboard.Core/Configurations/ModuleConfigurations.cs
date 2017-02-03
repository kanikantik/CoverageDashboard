using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CoverageDashboard.Core.Configurations
{
   internal class ModuleConfigurations : IModuleConfigurations
    {

        public IDefaultConfigurations DefaultConfiguration { get; private set; }

        public ModuleConfigurations(IDefaultConfigurations configuration)
        {
            DefaultConfiguration = configuration;
        }
    }
}

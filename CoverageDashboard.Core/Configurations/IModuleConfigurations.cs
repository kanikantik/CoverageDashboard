using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CoverageDashboard.Core.Configurations
{
    public interface IModuleConfigurations
    {
        /// <summary>
        /// Gets the base configuration object.
        /// </summary>
        IDefaultConfigurations DefaultConfiguration { get; }
    }
}

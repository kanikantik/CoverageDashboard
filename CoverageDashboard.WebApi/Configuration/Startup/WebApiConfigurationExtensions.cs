using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using CoverageDashboard.Core.Configurations;

namespace CoverageDashboard.Core.Configuration.Startup
{
    public static class WebApiConfigurationExtensions
    {
        /// <summary>
        /// Used to configure CoverageDashboard.Web.Api module.
        /// </summary>
        /// <param name="configurations">The configurations.</param>
        /// <returns>Returns Object of IExtWebApiModuleConfiguration</returns>
        public static IWebApiConfiguration WebApi(
            this IModuleConfigurations configurations)
        {
            return configurations.DefaultConfiguration.Get<IWebApiConfiguration>();
        }
    }
}
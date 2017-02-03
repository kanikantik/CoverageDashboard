using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Routing;
using CoverageDashboard.Core;
using CoverageDashboard.Core.Modules;
using CoverageDashboard.WebApi;

namespace CoverageDashBoard.WebApi
{
    public class WebApiApplication : CdWebApplication<WebApiModule>
    {
        protected override void Application_Start(object sender, EventArgs e)
        {
            GlobalConfiguration.Configure(WebApiConfig.Register);
            base.Application_Start(sender, e);
        }
    }
}

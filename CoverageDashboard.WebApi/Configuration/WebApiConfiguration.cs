using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;


namespace CoverageDashboard.Core.Configuration
{
    public class WebApiConfiguration : IWebApiConfiguration
    {
        public HttpConfiguration HttpConfiguration { get; set; }
        public bool IsValidationEnabledForControllers { get; set; }
        
    }
}
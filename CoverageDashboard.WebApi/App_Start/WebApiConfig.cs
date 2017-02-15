using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using System.Web.Http.Cors;

namespace CoverageDashboard.Core
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            //enable CORS
            var corsAttr = new EnableCorsAttribute(origins: "*", headers: "*", methods: "*", exposedHeaders: "*");
            config.EnableCors(corsAttr);
            // Web API configuration and services

            // Web API routes
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
        }
    }
}

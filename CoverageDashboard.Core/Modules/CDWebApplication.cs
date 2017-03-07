using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using CoverageDashboard.Core.Modules;
using System.IdentityModel.Services;
using CoverageDashboard.Core.Authentication;

namespace CoverageDashboard.Core.Modules
{
    public class CdWebApplication<TStartupModule> : System.Web.HttpApplication
        where TStartupModule : MainModule

    {

        /// <summary>
        /// Gets a reference to the <see cref="CdBootstrapper"/> instance.
        /// </summary>
        public static CdBootstrapper CdBootstrapper { get; } = CdBootstrapper.Create<TStartupModule>();

        /// <summary>
        /// This method is called by ASP.NET system on web application's startup.
        /// </summary>
        protected virtual void Application_Start(object sender, EventArgs e)
        {
            
            CdBootstrapper.Initialize();
           
        }

        /// <summary>
        /// This method is called by ASP.NET system on web application shutdown.
        /// </summary>
        protected virtual void Application_End(object sender, EventArgs e)
        {
           CdBootstrapper.Dispose();
        }

        /// <summary>
        /// This method is called by ASP.NET system when a session starts.
        /// </summary>
        protected virtual void Session_Start(object sender, EventArgs e)
        {

        }

        /// <summary>
        /// This method is called by ASP.NET system when a session ends.
        /// </summary>
        protected virtual void Session_End(object sender, EventArgs e)
        {

        }

        /// <summary>
        /// This method is called by ASP.NET system when a request starts.
        /// </summary>
        protected virtual void Application_BeginRequest(object sender, EventArgs e)
        {
            if (AuthDataManager.IsFederatedAuthResponse(Request))
            {
                AuthDataManager.StoreAuthData(Request, Response);
            }
        }

        /// <summary>
        /// This method is called by ASP.NET system when a request ends.
        /// </summary>
        protected virtual void Application_EndRequest(object sender, EventArgs e)
        {
            if (AuthDataManager.IsFederatedAuthRedirect(Response))
            {
                AuthDataManager.StoreAuthRedirectData(Response);
            }
        }

        protected virtual void Application_AuthenticateRequest(object sender, EventArgs e)
        {
            if (User == null || !User.Identity.IsAuthenticated)
            {
                FederatedAuthentication.WSFederationAuthenticationModule.SignIn("");
            }
        }

        protected virtual void Application_Error(object sender, EventArgs e)
        {

        }
    }
    

}

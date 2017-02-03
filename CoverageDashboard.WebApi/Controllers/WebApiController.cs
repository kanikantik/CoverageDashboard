using System;
using System.Globalization;
using System.Threading.Tasks;
using System.Web.Http;
using Castle.Core.Logging;

namespace CoverageDashboard.Core.Controllers
{
    /// <summary>
    /// Base class for all ApiControllers in web applications those use Abp system.
    /// </summary>
    public abstract class WebApiController : ApiController
    {
        
        /// <summary>
        /// Constructor.
        /// </summary>
        protected WebApiController()
        {
           
        }
       

        /// <summary>
        /// Checks if current user is granted for a permission.
        /// </summary>
        /// <param name="permissionName">Name of the permission</param>
        //protected Task<bool> IsGrantedAsync(string permissionName)
        //{
        //    //return PermissionChecker.IsGrantedAsync(permissionName);
        //    return false;
        //}

        /// <summary>
        /// Checks if current user is granted for a permission.
        /// </summary>
        /// <param name="permissionName">Name of the permission</param>
        protected bool IsGranted(string permissionName)
        {
            //return PermissionChecker.IsGranted(permissionName);
            return false;
        }
        
        /// <summary>
        /// Checks if given feature is enabled for current tenant.
        /// </summary>
        /// <param name="featureName">Name of the feature</param>
        /// <returns></returns>
        //protected virtual Task<bool> IsEnabledAsync(string featureName)
        //{
        //    //return FeatureChecker.IsEnabledAsync(featureName);
        //    return false;
        //}

        /// <summary>
        /// Checks if given feature is enabled for current tenant.
        /// </summary>
        /// <param name="featureName">Name of the feature</param>
        /// <returns></returns>
        protected virtual bool IsEnabled(string featureName)
        {
           // return FeatureChecker.IsEnabled(featureName);
            return false;
        }
    }
}

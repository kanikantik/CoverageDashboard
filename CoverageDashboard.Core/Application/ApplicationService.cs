using System.Collections.Generic;
using System.Threading.Tasks;
using CoverageDashboard.Core.Application;

namespace CoverageDashboard.Core.Application
{
    /// <summary>
    /// This class can be used as a base class for application services. 
    /// </summary>
    public abstract class ApplicationService :  IApplicationService
    {
        public static string[] CommonPostfixes = { "AppService", "ApplicationService" };

        /// <summary>
        /// Gets current session information.
        /// </summary>
        //public IAbpSession AbpSession { get; set; }
        
        /// <summary>
        /// Constructor.
        /// </summary>
        protected ApplicationService()
        {
          
        }

        /// <summary>
        /// Checks if current user is granted for a permission.
        /// </summary>
        /// <param name="permissionName">Name of the permission</param>
        //protected virtual Task<bool> IsGrantedAsync(string permissionName)
        //{
        //    return PermissionChecker.IsGrantedAsync(permissionName);
        //}

        /// <summary>
        /// Checks if current user is granted for a permission.
        /// </summary>
        /// <param name="permissionName">Name of the permission</param>
        protected virtual bool IsGranted(string permissionName)
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
        //    return FeatureChecker.IsEnabledAsync(featureName);
        //}

        /// <summary>
        /// Checks if given feature is enabled for current tenant.
        /// </summary>
        /// <param name="featureName">Name of the feature</param>
        /// <returns></returns>
        protected virtual bool IsEnabled(string featureName)
        {
            //return FeatureChecker.IsEnabled(featureName);
            return false;
        }
    }
}

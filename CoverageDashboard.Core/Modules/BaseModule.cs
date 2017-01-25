using CoverageDashBoard.Core.Dependency;

namespace CoverageDashBoard.Core.Modules
{
    public abstract class BaseModule
    {
        protected internal IIocManager IocManager { get; internal set; }
        //public ILogger Logger { get; set; }

        /// <summary>
        /// This is the first event called on application startup. 
        /// Codes can be placed here to run before dependency injection registrations.
        /// </summary>
        public virtual void PreInitialize()
        {

        }

        /// <summary>
        /// This method is used to register dependencies for this module.
        /// </summary>
        public virtual void Initialize()
        {

        }
    }
}

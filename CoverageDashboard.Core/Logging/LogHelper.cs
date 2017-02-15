using System;
using Castle.Core.Logging;
using CoverageDashboard.Core.Dependency;

namespace CoverageDashboard.Core.Logging
{
    public static class LogHelper
    {
        /// <summary>
        /// A reference to the logger.
        /// </summary>
        public static ILogger Logger { get; private set; }

        static LogHelper()
        {
            Logger = IocManager.Instance.IsRegistered(typeof(ILoggerFactory))
                ? IocManager.Instance.Resolve<ILoggerFactory>().Create(typeof(LogHelper))
                : NullLogger.Instance;
        }

        public static void LogException(Exception ex)
        {
            LogException(Logger, ex);
        }

        public static void LogException(ILogger logger, Exception ex)
        {
            logger.Log(LogSeverity.Error, ex.Message, ex);
        }

        public static void Debug(string message)
        {
            Logger.Log(LogSeverity.Debug, message);
        }
    }
}
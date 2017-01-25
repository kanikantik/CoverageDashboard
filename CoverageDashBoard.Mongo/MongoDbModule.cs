using System.Reflection;
using CoverageDashBoard.Core.Modules;
using CoverageDashBoard.Mongo.Configurations;

namespace CoverageDashBoard.Mongo
{ /// <summary>
  /// This module is used to implement "Data Access Layer" in MongoDB.
  /// </summary>
    
    public class MongoDbModule : BaseModule
    {
        public override void PreInitialize()
        {
            IocManager.Register<IMongoDbModuleConfiguration, MongoDbModuleConfiguration>();
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(Assembly.GetExecutingAssembly());
        }
    }
}

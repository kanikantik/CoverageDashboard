using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CoverageDashBoard.Mongo.Configurations
{
    public interface IMongoDbModuleConfiguration
    {

        string ConnectionString { get; set; }

        string DatatabaseName { get; set; }
    }
}

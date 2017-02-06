
using CoverageDashboard.Core.Dependency;
using MongoDB.Driver;

namespace CoverageDashboard.Mongo
{
    /// <summary>
  /// Defines interface to obtain a <see cref="IMongoDatabase"/> object.
  /// </summary>
    public interface IMongoDbContextProvider : ITransientDependency
    {
        /// <summary>
        /// Gets the <see cref="IMongoDatabase"/>.
        /// </summary>
        IMongoDatabase Database { get; }
    }
}

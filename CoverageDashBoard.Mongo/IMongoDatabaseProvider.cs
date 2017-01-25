
using MongoDB.Driver;

namespace CoverageDashBoard.Mongo
{
    /// <summary>
  /// Defines interface to obtain a <see cref="IMongoDatabase"/> object.
  /// </summary>
    public interface IMongoDatabaseProvider
    {
        /// <summary>
        /// Gets the <see cref="IMongoDatabase"/>.
        /// </summary>
        IMongoDatabase Database { get; }
    }
}

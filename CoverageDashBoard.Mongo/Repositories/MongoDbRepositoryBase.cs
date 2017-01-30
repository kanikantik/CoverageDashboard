using System;
using System.Linq;
using CoverageDashboard.Core.Repositories;
using MongoDB.Driver;
using CoverageDashboard.Mongo;


namespace CoverageDashboard.Mongo.Repositories
{
        /// <summary>
        /// Implements IRepository for MongoDB.
        /// </summary>
        /// <typeparam name="TEntity">Type of the Entity for this repository</typeparam>
        public class MongoDbRepositoryBase<TEntity> : MongoDbRepositoryBase<TEntity, int>, IRepository<TEntity>
            where TEntity : class, IEntity<int>
        {
           
            public MongoDbRepositoryBase(IMongoDatabaseProvider databaseProvider)
                : base(databaseProvider)
            {
            }
        }

        /// <summary>
        /// Implements IRepository for MongoDB.
        /// </summary>
        /// <typeparam name="TEntity">Type of the Entity for this repository</typeparam>
        /// <typeparam name="TPrimaryKey">Primary key of the entity</typeparam>
        public class MongoDbRepositoryBase<TEntity, TPrimaryKey> : RepositoryBase<TEntity, TPrimaryKey>
            where TEntity : class, IEntity<TPrimaryKey>
        {
            private readonly IMongoDatabaseProvider _databaseProvider;

            public virtual IMongoDatabase Database
            {
                get { return _databaseProvider.Database; }
            }

            public virtual IMongoCollection<TEntity> Collection
            {
                get
                {
                    return _databaseProvider.Database.GetCollection<TEntity>(typeof(TEntity).Name);
                }
            }            

            public MongoDbRepositoryBase(IMongoDatabaseProvider databaseProvider)
            {
                _databaseProvider = databaseProvider;
            }

            public override IQueryable<TEntity> GetAll()
            {
                return Collection.AsQueryable();
            }

            public override TEntity Get(TPrimaryKey id)
            {
                var query = Builders<TEntity>.Filter.Eq(e => e.Id, id);
                var entity = Collection.Find(query).FirstOrDefault();
                if (entity == null)
                {
                    throw new Exception("There is no such an entity with given primary key. Entity type: " + typeof(TEntity).FullName + ", primary key: " + id);
                }

                return entity;
            }

            public override TEntity FirstOrDefault(TPrimaryKey id)
            {
                var query = Builders<TEntity>.Filter.Eq(e => e.Id, id);
                return Collection.Find(query).FirstOrDefault();
            }

            public override TEntity Insert(TEntity entity)
            {
                Collection.InsertOneAsync(entity);
                return entity;
            }
            public override TEntity Update(TEntity entity)
            {
                var filter = Builders<TEntity>.Filter.Eq(e => e.Id, entity.Id);
                Collection.ReplaceOneAsync(filter, entity);
                return entity;
            }

            public override void Delete(TEntity entity)
            {
                Delete(entity.Id);
            }

            public override void Delete(TPrimaryKey id)
            {
                var query = Builders<TEntity>.Filter.Eq(e => e.Id, id);
                Collection.FindOneAndDelete(query);
            }
        }
    
}

using GameRental.DBContext;
using GameRental.Helpers;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace GameRental.Repository
{
    public abstract class RepositoryBase<T> : IRepository<T> where T : class
    {
        protected AppDbContext DbContext { get; set; }
        public RepositoryBase(AppDbContext _dbContext)
        {
            DbContext = _dbContext;
        }
        public IQueryable<T> GetAll()
        {
            //return DbContext.Set<T>().Skip((_params.PageNumber - 1) * _params.PageSize).Take(_params.PageSize);
            //return PagedList<T>.ToPagedList(DbContext.Set<T>(), _params.PageNumber, _params.PageSize);
            return DbContext.Set<T>();
        }

        public IQueryable<T> FindByCondition(Expression<Func<T, bool>> expression)
        {
            return DbContext.Set<T>().Where(expression);
        }

        public void Create(T entity)
        {
            DbContext.Set<T>().Add(entity);
        }

        public void Update(T entity)
        {
            DbContext.Set<T>().Update(entity);
        }

        public void Delete(T entity)
        {
            DbContext.Set<T>().Remove(entity);
        }
    }
}

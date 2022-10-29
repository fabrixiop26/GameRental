using GameRental.Helpers;
using System.Linq.Expressions;

namespace GameRental.Repository
{
    public interface IRepository<T>
    {
        IQueryable<T> GetAll();
        IQueryable<T> FindByCondition(Expression<Func<T,bool>> expression);
        void Create(T entity);
        void Update(T entity);
        void Delete(T entity);
    }
}

using System.Linq.Expressions;
using WebApi.Data;

namespace WebApi.Repository.Interfaces
{
    public interface IBaseRepository<T>
    {
        public IQueryable<T> FindAllAsync();
        public IQueryable<T> FindByIdAsync(Expression<Func<T, bool>> expression);
        public Task CreateAsync(T entity);
        public Task UpAsync(T entity);
        public Task DeleteAsync(T entity);
       
    }
}

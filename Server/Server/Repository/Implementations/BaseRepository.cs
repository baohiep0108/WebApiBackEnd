using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using WebApi.Helper;
using WebApi.Repository.Interfaces;

namespace WebApi.Repository.Implementations
{
    public abstract class BaseRepository<T> : IBaseRepository<T> where T : class
    {
        protected readonly ApplicationDBContext RepositoryContext;

        public BaseRepository(ApplicationDBContext repositoryContext)
        {
            RepositoryContext = repositoryContext;
        }

        public IQueryable<T> FindAllAsync() => RepositoryContext.Set<T>().AsNoTracking();

        public IQueryable<T> FindByIdAsync(Expression<Func<T, bool>> expression) =>
            RepositoryContext.Set<T>().Where(expression).AsNoTracking();

        public async Task CreateAsync(T entity)
        {
            await RepositoryContext.Set<T>().AddAsync(entity);
            await RepositoryContext.SaveChangesAsync();
        }

        public async Task UpAsync(T entity)
        {
            RepositoryContext.Set<T>().Update(entity);
            await RepositoryContext.SaveChangesAsync();
        }

        public async Task DeleteAsync(T entity)
        {
            RepositoryContext.Set<T>().Remove(entity);
            await RepositoryContext.SaveChangesAsync();
        }

    }
}

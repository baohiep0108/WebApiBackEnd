using WebApi.Helper;
using WebApi.Model;
using WebApi.Repository.Interfaces;

namespace WebApi.Repository.Implementations
{
    public class CategoryRepository : BaseRepository<Category>, ICategoryRepository
    {
        public CategoryRepository(ApplicationDBContext repositoryContext)
              : base(repositoryContext)
        { }

    }
}

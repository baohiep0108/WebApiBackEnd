using WebApi.Helper;
using WebApi.Model;
using WebApi.Repository.Interfaces;

namespace WebApi.Repository.Implementations
{
    public class ProductRepository : BaseRepository<Product>, IProductRepository
    {
        public ProductRepository(ApplicationDBContext repositoryContext)
           : base(repositoryContext)
        { }


    }
}

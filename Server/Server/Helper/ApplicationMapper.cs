using AutoMapper;
using Microsoft.AspNetCore.Identity;
using ProjectFunctionalTesting.ViewModel;
using WebApi.Data;
using WebApi.Model;

namespace WebApiShopCart.Helper
{
    public class ApplicationMapper : Profile
    {
        public ApplicationMapper()
        {
            CreateMap<Product, ProductVM>().ReverseMap();
        }
    }
}

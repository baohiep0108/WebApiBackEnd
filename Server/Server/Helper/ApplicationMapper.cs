using AutoMapper;
using Server.Model;
using Server.ViewModel;
using WebApi.Data;
using WebApi.Model;

namespace WebApiShopCart.Helper
{
    public class ApplicationMapper : Profile
    {
        public ApplicationMapper()
        {
            CreateMap<Product, ProductVM>().ReverseMap();
            CreateMap<Feedback, FeedbackVM>().ReverseMap();
        }
    }
}

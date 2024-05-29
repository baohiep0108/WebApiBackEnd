using Server.Model;

namespace Server.Repository.Interfaces
{
    public interface IVnPay
    {
        string CreatePaymentUrl(PaymentInformationModel model, HttpContext context);
        PaymentResponseModel PaymentExecute(IQueryCollection collections);
    }
}

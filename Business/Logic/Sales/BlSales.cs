using Business.Logic.Products;
using Business.Services.Exceptions;
using DAO.Databases;
using DAO.Input;
using Repository.Settings;

namespace Business.Logic.Sales
{
    public class BlSales : BlAbstract<Sale>
    {
        protected BlProductsList BlProductsList;
        public BlSales(IMasterPieceDatabaseSettings settings) : base(settings) => BlProductsList = new BlProductsList(settings);

        public void SaveSaleValidation(SaleInput sale)
        {
            if (sale == null)
                throw new ValidationResponseException("Ocorreu um erro ao enviar os dados pro Servidor!");

            if (sale.InvalidAddress())
                throw new ValidationResponseException("Ajuste seus dados de endereço");

        }
    }
}

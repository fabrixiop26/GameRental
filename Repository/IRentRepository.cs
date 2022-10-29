using GameRental.DTOModels;
using GameRental.Helpers;
using GameRental.Models;

namespace GameRental.Repository
{
    public interface IRentRepository : IRepository<Rent>
    {
        Task<PagedList<Rent>> GetAllRents(RentDTOFilter _params);
        Task<RentedGames?> GetLeastRented(int minAge, int maxAge);
    }
}

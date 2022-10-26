using GameRental.Helpers;
using GameRental.Models;

namespace GameRental.Repository
{
    public interface ICharacterRepository : IRepository<Character>
    {
        Task<PagedList<Character>> GetAllCharacters(PagingParameters _params);
    }
}

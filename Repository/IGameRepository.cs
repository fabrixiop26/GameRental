using GameRental.DTOModels;
using GameRental.Helpers;
using GameRental.Models;

namespace GameRental.Repository
{
    public interface IGameRepository : IRepository<Game>
    {
        Task<PagedList<Game>> GetAllGames(GameDTOFilter _params);
    }
}

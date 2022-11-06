using GameRental.DTOModels;
using GameRental.Helpers;
using GameRental.Models;

namespace GameRental.Repository
{
    public interface IPlatformRepository:  IRepository<Platform>
    {
        Task<PagedList<Platform>> GetAllPlataforms(PlatformDTOFilter _params);
        ValueTask<Platform?> GetByIdAsync(int id);
        Platform? GetById(int id);
    }
}

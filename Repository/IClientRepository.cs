using GameRental.DTOModels;
using GameRental.Helpers;
using GameRental.Models;

namespace GameRental.Repository
{
    public interface IClientRepository : IRepository<Client>
    {
        Task<PagedList<Client>> GetAllClients(ClientDTOFilter _params);
        ValueTask<Client?> GetByIdAsync(int id);
        Client? GetById(int id);
    }
}

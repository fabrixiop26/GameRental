using AutoFilterer.Extensions;
using GameRental.Helpers;
using GameRental.Models;
using GameRental.DTOModels;
using GameRental.DBContext;

namespace GameRental.Repository
{
    public class ClientRepository : RepositoryBase<Client>, IClientRepository
    {
        public ClientRepository(AppDbContext _dbContext) : base(_dbContext)
        {
        }

        public Task<PagedList<Client>> GetAllClients(ClientDTOFilter _params)
        {
            return PagedList<Client>.ToPagedList(GetAll().ApplyFilterWithoutPagination(_params), _params.Page, _params.PerPage);
        }
    }
}

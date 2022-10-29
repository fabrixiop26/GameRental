using AutoFilterer.Extensions;
using GameRental.DBContext;
using GameRental.DTOModels;
using GameRental.Helpers;
using GameRental.Models;

namespace GameRental.Repository
{
    public class PlatformRepository : RepositoryBase<Platform>, IPlatformRepository
    {
        public PlatformRepository(AppDbContext appDbContext) : base(appDbContext)
        {

        }
        public Task<PagedList<Platform>> GetAllPlataforms(PlatformDTOFilter _params)
        {
            return PagedList<Platform>.ToPagedList(GetAll().ApplyFilterWithoutPagination(_params), _params.Page, _params.PerPage);
        }
    }
}

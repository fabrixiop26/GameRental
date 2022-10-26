using AutoFilterer.Extensions;
using GameRental.DBContext;
using GameRental.DTOModels;
using GameRental.Helpers;
using GameRental.Models;

namespace GameRental.Repository
{
    public class RentRepository : RepositoryBase<Rent>, IRentRepository
    {
        public RentRepository(AppDbContext appDbContext) : base(appDbContext)
        {

        }
        public Task<PagedList<Rent>> GetAllRents(RentDTOFilter _params)
        {
            return PagedList<Rent>.ToPagedList(GetAll().ApplyFilterWithoutPagination(_params), _params.Page, _params.PerPage);
        }
    }
}

using AutoFilterer.Extensions;
using GameRental.DBContext;
using GameRental.DTOModels;
using GameRental.Helpers;
using GameRental.Models;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;

namespace GameRental.Repository
{
    public class RentedGames
    {
        public int GameId { get; set; }
        public int Quantity { get; set; }
    }
    public class RentRepository : RepositoryBase<Rent>, IRentRepository
    {
        public RentRepository(AppDbContext appDbContext) : base(appDbContext)
        {

        }
        public Task<PagedList<Rent>> GetAllRents(RentDTOFilter _params)
        {
            return PagedList<Rent>.ToPagedList(GetAll().ApplyFilterWithoutPagination(_params), _params.Page, _params.PerPage);
        }

        public Task<RentedGames?> GetLeastRented(int minAge, int maxAge)
        {
            return GetAll().Join(DbContext.Clients, r => r.ClientId, c => c.ClientId, (r, c) => new
            {
                Age = DateTime.Now.Year - c.Dob.Year,
                r.GameId
            }).Where(s => s.Age >= minAge && s.Age <= maxAge)
            .GroupBy(g => g.GameId)
            .Select(g => new
            RentedGames{
                Quantity = g.Count(),
                GameId = g.Key
            }).OrderBy(s => s.Quantity)
            .FirstOrDefaultAsync();
        }
    }
}

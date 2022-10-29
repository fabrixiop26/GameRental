using AutoFilterer.Extensions;
using GameRental.DBContext;
using GameRental.DTOModels;
using GameRental.Helpers;
using GameRental.Models;
using Microsoft.EntityFrameworkCore;

namespace GameRental.Repository
{
    public class GameRepository : RepositoryBase<Game>, IGameRepository
    {
        public GameRepository(AppDbContext _dbContext) : base(_dbContext)
        {
        }

        public Task<PagedList<Game>> GetAllGames(GameDTOFilter _params)
        {
            return PagedList<Game>.ToPagedList(GetAll().ApplyFilterWithoutPagination(_params).Include(g => g.Platforms).Include(g => g.Characters), _params.Page, _params.PerPage);
        }
    }
}

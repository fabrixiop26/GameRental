using AutoFilterer.Extensions;
using GameRental.DBContext;
using GameRental.DTOModels;
using GameRental.Helpers;
using GameRental.Models;
using Microsoft.EntityFrameworkCore;
using NuGet.Protocol.Core.Types;

namespace GameRental.Repository
{
    public class GameRepository : RepositoryBase<Game>, IGameRepository
    {
        public GameRepository(AppDbContext _dbContext) : base(_dbContext)
        {
        }

        public Task<PagedList<Game>> GetAllGames(GameDTOFilter _params)
        {
            var query = GetAll();
            if (_params.PlatformIds != null)
            {
                query = query.Where(g => g.Platforms.Any(gp => _params.PlatformIds.Contains(gp.PlatformId)));
            }
            if (_params.CharacterIds != null)
            {
                query = query.Where(g => g.Characters.Any(gc => _params.CharacterIds.Contains(gc.CharacterId)));
            }

            return PagedList<Game>.ToPagedList(query.ApplyFilterWithoutPagination(_params).Include(g => g.Platforms).Include(g => g.Characters), _params.Page, _params.PerPage);
        }

        public Game? GetById(int id)
        {
            return DbContext.Games.Find(id);
        }

        public Task<Game?> GetByIdAsync(int id)
        { 
            return DbContext.Games.Include(g => g.Platforms).Include(g => g.Characters).Where(g => g.GameId == id).FirstOrDefaultAsync();
        }
    }
}

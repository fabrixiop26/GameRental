using AutoFilterer.Extensions;
using GameRental.DBContext;
using GameRental.DTOModels;
using GameRental.Helpers;
using GameRental.Models;

namespace GameRental.Repository
{
    /// <summary>
    /// Repository for Character Model, it entends the base repository and its corresponding interface
    /// in case of extra (specific) functionality
    /// </summary>
    public class CharacterRepository : RepositoryBase<Character>, ICharacterRepository
    {
        public CharacterRepository(AppDbContext appDbContext) : base(appDbContext)
        {

        }
        public Task<PagedList<Character>> GetAllCharacters(CharacterDTOFilter _params)
        {
            return PagedList<Character>.ToPagedList(GetAll().ApplyFilterWithoutPagination(_params), _params.Page, _params.PerPage);
        }

        public ValueTask<Character?> GetByIdAsync(int id)
        {
            return DbContext.Characters.FindAsync(id);
        }
        public Character? GetById(int id)
        {
            return DbContext.Characters.Find(id);
        }
    }
}

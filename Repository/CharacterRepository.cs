using GameRental.DBContext;
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
        public Task<PagedList<Character>> GetAllCharacters(PagingParameters _params)
        {
            return PagedList<Character>.ToPagedList(GetAll().OrderBy(on => on.CharacterId), _params.PageNumber, _params.PageSize);
        }
    }
}

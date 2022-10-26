using GameRental.DBContext;

namespace GameRental.Repository
{
    public class RepositoryService
    {
        private AppDbContext _dbContext;
        private ICharacterRepository _character;

        public ICharacterRepository Characters
        {
            get
            {
                if (_character == null)
                {
                    _character = new CharacterRepository(_dbContext);   
                }
                return _character;
            }
        }
        public RepositoryService(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task SaveChangesAsync()
        {
            await _dbContext.SaveChangesAsync();
        }
        public void SaveChanges()
        {
            _dbContext.SaveChanges();
        }
    }
}

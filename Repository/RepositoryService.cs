using GameRental.DBContext;

namespace GameRental.Repository
{
    public class RepositoryService
    {
        private AppDbContext _dbContext;

        public ICharacterRepository Characters { get; private set; }
        public IPlatformRepository Platforms { get; private set; }
        public IRentRepository Rents { get; private set; }
        public IClientRepository Clients { get; private set; }
        public IGameRepository Games { get; private set; }
        public RepositoryService(AppDbContext dbContext)
        {
            // Instance All Used Repositories
            _dbContext = dbContext;
            Characters = new CharacterRepository(_dbContext);
            Platforms = new PlatformRepository(_dbContext);
            Rents = new RentRepository(_dbContext);
            Clients = new ClientRepository(_dbContext);
            Games = new GameRepository(_dbContext);
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

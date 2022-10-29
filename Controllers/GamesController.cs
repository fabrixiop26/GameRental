using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GameRental.DBContext;
using GameRental.Models;
using Serilog;
using AutoMapper;
using GameRental.DTOModels;
using GameRental.Repository;
using GameRental.Helpers;
using NuGet.Protocol.Core.Types;

namespace GameRental.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Produces("application/json")]
    public class GamesController : ControllerBase
    {
        private readonly RepositoryService _repository;
        private readonly IMapper _mapper;

        public GamesController(RepositoryService repository, IMapper mapper)
        {
            _mapper = mapper;
            _repository = repository;
        }

        /// <summary>
        /// Returns the list of Games
        /// </summary>
        /// <returns>a list of Games</returns>
        /// <remarks>
        /// Sample request
        /// GET: api/games
        /// </remarks>
        /// <response code="200">Success</response>
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<IEnumerable<GameDTO>>> GetGames([FromQuery] GameDTOFilter _params)
        {
            var games = await _repository.Games.GetAllGames(_params);
            var mappedResults = _mapper.Map<List<GameDTO>>(games);
            return Ok(new PagedResponse<List<GameDTO>>(mappedResults, games.TotalCount));
        }

        [HttpGet("ByCharacters")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<IEnumerable<GameDTO>>> GetGamesByCharacters([FromQuery] List<int> platforms)
        {
            var games = await _repository.Games.FindByCondition(g => g.Platforms.Any(p => platforms.Contains(p.PlatformId))).Include(g => g.Platforms).ToListAsync();
            var mappedResults = _mapper.Map<List<GameDTO>>(games);
            return Ok(mappedResults);
        }

        /// <summary>
        /// Return a Game by its id
        /// </summary>
        /// <param name="id">Id of the Game</param>
        /// <returns>a Game</returns>
        /// <remarks>
        /// Sample request
        /// GET: api/games/5
        /// </remarks>
        /// <response code="200">Returns the Game</response>
        /// <response code="404">If the Game was not found</response>
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<GameDTO>> GetGame(int id)
        {

            var game = await _repository.Games.FindByCondition(g => g.GameId == id).Include(g => g.Platforms).Include(g => g.Characters).FirstOrDefaultAsync();

            if (game == null)
            {
                return NotFound();
            }
            return Ok(_mapper.Map<GameDTO>(game));
        }
        /// <summary>
        /// Return the most rented game
        /// </summary>
        /// <returns>The most rented game</returns>
        /// <response code="200">Returns the most rented Game</response>
        /// <response code="404">If there are not rents</response>
        [HttpGet("MostRented")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<GameDTO>> GetMostRentedGame()
        {
            // count the amounts of clientId 
            var result = await _repository.Rents.GetAll().GroupBy(r => r.GameId, (x, y) => new
            {
                Quantity = y.Count(),
                GameId = x,
            }).OrderByDescending(a => a.Quantity).FirstOrDefaultAsync();
            if (result == null)
            {
                return NotFound();
            }
            var game = await _repository.Games.FindByCondition(g => g.GameId == result.GameId)
                .Include(g => g.Platforms)
                .Include(g => g.Characters).FirstOrDefaultAsync();

            return Ok(_mapper.Map<GameDTO>(game));
        }

        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        /// <summary>
        /// Updates a Game by its id
        /// </summary>
        /// <param name="id">Id of the Game</param>
        /// <param name="game">New Game data</param>
        /// <returns>a Game</returns>
        /// <remarks>
        /// Sample request
        /// PUT: api/games/1
        /// </remarks>
        /// <response code="204">If Game was updated</response>
        /// <response code="400">If the ids don't match</response>
        /// <response code="404">If Game was not found in database</response>
        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> PutGame(int id, GameDTO game)
        {
            var newGame = _mapper.Map<Game>(game);
            if (id != newGame.GameId)
            {
                return BadRequest();
            }

            _repository.Games.Update(newGame);

            try
            {
                await _repository.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!GameExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        /// <summary>
        /// Creates a Game
        /// </summary>
        /// <param name="game">The Game data</param>
        /// <returns>a Game</returns>
        /// <remarks>
        /// Sample request
        /// POST: api/games
        /// </remarks>
        /// <response code="201">If the Game was created</response>
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        public async Task<ActionResult<GameDTO>> PostGame(GameDTO game)
        {
            var newGame = _mapper.Map<Game>(game);
            _repository.Games.Create(newGame);
            await _repository.SaveChangesAsync();
            game.GameId = newGame.GameId;
            return CreatedAtAction("GetGame", new { id = game.GameId }, game);
        }

        /// <summary>
        /// Deletes a Game by its id
        /// </summary>
        /// <param name="id">Id of the Game</param>
        /// <returns>a Game</returns>
        /// <remarks>
        /// Sample request
        /// DELETE: api/games/1
        /// </remarks>
        /// <response code="204">If Game was deleted</response>
        /// <response code="404">If Game was not found</response>
        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> DeleteGame(int id)
        {
            var game = await _repository.Games.FindByCondition(g => g.GameId == id).FirstOrDefaultAsync();
            if (game == null)
            {
                return NotFound();
            }

            _repository.Games.Delete(game);
            await _repository.SaveChangesAsync();

            return NoContent();
        }

        private bool GameExists(int id)
        {
            return _repository.Games.FindByCondition(g => g.GameId == id).FirstOrDefault() != null;
        }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GameRental.DBContext;
using GameRental.Models;
using AutoMapper;
using GameRental.DTOModels;

namespace GameRental.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Produces("application/json")]
    public class CharactersController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;

        public CharactersController(AppDbContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        /// <summary>
        /// Return the list of characters
        /// </summary>
        /// <returns>a list of game's characters</returns>
        /// <remarks>
        /// Sample request
        /// GET: api/characters/
        /// </remarks>
        /// <response code="200">Returns the list of items</response>
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<IEnumerable<CharacterDTO>>> GetCharacters()
        {
            var characters = await _context.Characters.ToListAsync();
            return _mapper.Map<List<CharacterDTO>>(characters);
        }

        /// <summary>
        /// Return a character by its id
        /// </summary>
        /// <param name="id">Id of the Character</param>
        /// <returns>a Character</returns>
        /// <remarks>
        /// Sample request
        /// GET: api/characters/1
        /// </remarks>
        /// <response code="200">Returns the Character</response>
        /// <response code="404">If the Character was not found</response>
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<CharacterDTO>> GetCharacter(int id)
        {
            var character = await _context.Characters.FindAsync(id);

            if (character == null)
            {
                return NotFound();
            }

            return _mapper.Map<CharacterDTO>(character);
        }

        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        /// <summary>
        /// Updates a character by its id
        /// </summary>
        /// <param name="id">Id of the Character</param>
        /// <param name="character">New Character data</param>
        /// <returns>a Character</returns>
        /// <remarks>
        /// Sample request
        /// PUT: api/characters/1
        /// </remarks>
        /// <response code="204">If Character was updated</response>
        /// <response code="400">If the ids don't match</response>
        /// <response code="404">If Character was not found in database</response>
        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> PutCharacter(int id, CharacterDTO character)
        {
            if (id != character.CharacterId)
            {
                return BadRequest();
            }

            var newCharacter = _mapper.Map<Character>(character);

            _context.Entry(newCharacter).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CharacterExists(id))
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
        /// Creates a character
        /// </summary>
        /// <param name="character">The Character data</param>
        /// <returns>a Character</returns>
        /// <remarks>
        /// Sample request
        /// POST: api/characters
        /// </remarks>
        /// <response code="201">If the Character was created</response>
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        public async Task<ActionResult<CharacterDTO>> PostCharacter(CharacterDTO character)
        {
            var newCharacter = _mapper.Map<Character>(character);
            _context.Characters.Add(newCharacter);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCharacter", new { id = character.CharacterId }, character);
        }

        /// <summary>
        /// Deletes a character by its id
        /// </summary>
        /// <param name="id">Id of the Character</param>
        /// <returns>a Character</returns>
        /// <remarks>
        /// Sample request
        /// DELETE: api/characters/1
        /// </remarks>
        /// <response code="204">If Character was deleted</response>
        /// <response code="404">If Character was not found</response>
        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> DeleteCharacter(int id)
        {
            var character = await _context.Characters.FindAsync(id);
            if (character == null)
            {
                return NotFound();
            }

            _context.Characters.Remove(character);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CharacterExists(int id)
        {
            return _context.Characters.Any(e => e.CharacterId == id);
        }
    }
}

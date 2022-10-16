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
    public class PlatformsController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;

        public PlatformsController(AppDbContext context,IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        /// <summary>
        /// Returns the list of Platforms
        /// </summary>
        /// <returns>a list of Platforms</returns>
        /// <remarks>
        /// Sample request
        /// GET: api/platforms
        /// </remarks>
        /// <response code="200">Success</response>
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<IEnumerable<PlatformDTO>>> GetPlatforms()
        {
            var platforms = await _context.Platforms.ToListAsync();
            return Ok(_mapper.Map<List<PlatformDTO>>(platforms));
        }

        /// <summary>
        /// Return a Platform by its id
        /// </summary>
        /// <param name="id">Id of the Platform</param>
        /// <returns>a Platform</returns>
        /// <remarks>
        /// Sample request
        /// GET: api/platforms/5
        /// </remarks>
        /// <response code="200">Returns the Platform</response>
        /// <response code="404">If the Platform was not found</response>
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<PlatformDTO>> GetPlatform(int id)
        {
            var platform = await _context.Platforms.FindAsync(id);

            if (platform == null)
            {
                return NotFound();
            }

            return Ok(_mapper.Map<PlatformDTO>(platform));
        }

        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        /// <summary>
        /// Updates a Platform by its id
        /// </summary>
        /// <param name="id">Id of the Platform</param>
        /// <param name="platform">New Platform data</param>
        /// <returns>a Platform</returns>
        /// <remarks>
        /// Sample request
        /// PUT: api/platforms/1
        /// </remarks>
        /// <response code="204">If Platform was updated</response>
        /// <response code="400">If the ids don't match</response>
        /// <response code="404">If Platform was not found in database</response>
        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> PutPlatform(int id, PlatformDTO platform)
        {
            var newPlatform = _mapper.Map<Platform>(platform);
            if (id != newPlatform.PlatformId)
            {
                return BadRequest();
            }

            _context.Entry(newPlatform).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PlatformExists(id))
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
        /// Creates a Platform
        /// </summary>
        /// <param name="platform">The Platform data</param>
        /// <returns>a Platform</returns>
        /// <remarks>
        /// Sample request
        /// POST: api/platforms
        /// </remarks>
        /// <response code="201">If the Platform was created</response>
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        public async Task<ActionResult<PlatformDTO>> PostPlatform(PlatformDTO platform)
        {
            var newPlatform = _mapper.Map<Platform>(platform);
            _context.Platforms.Add(newPlatform);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPlatform", new { id = platform.PlatformId }, platform);
        }

        /// <summary>
        /// Deletes a Platform by its id
        /// </summary>
        /// <param name="id">Id of the Platform</param>
        /// <returns>a Platform</returns>
        /// <remarks>
        /// Sample request
        /// DELETE: api/platforms/1
        /// </remarks>
        /// <response code="204">If Platform was deleted</response>
        /// <response code="404">If Platform was not found</response>
        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> DeletePlatform(int id)
        {
            var platform = await _context.Platforms.FindAsync(id);
            if (platform == null)
            {
                return NotFound();
            }

            _context.Platforms.Remove(platform);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PlatformExists(int id)
        {
            return _context.Platforms.Any(e => e.PlatformId == id);
        }
    }
}

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
    public class RentsController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;
        public RentsController(AppDbContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        /// <summary>
        /// Returns the list of Rents
        /// </summary>
        /// <returns>a list of Rents</returns>
        /// <remarks>
        /// Sample request
        /// GET: api/rents
        /// </remarks>
        /// <response code="200">Success</response>
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<IEnumerable<RentDTO>>> GetRents()
        {
            var rents = await _context.Rents.ToListAsync();
            return _mapper.Map<List<RentDTO>>(rents);
        }

        /// <summary>
        /// Return a Rent by its id
        /// </summary>
        /// <param name="id">Id of the Rent</param>
        /// <returns>a Rent</returns>
        /// <remarks>
        /// Sample request
        /// GET: api/rents/5
        /// </remarks>
        /// <response code="200">Returns the Rent</response>
        /// <response code="404">If the Rent was not found</response>
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<RentDTO>> GetRent(int id)
        {
            var rent = await _context.Rents.FindAsync(id);

            if (rent == null)
            {
                return NotFound();
            }

            return _mapper.Map<RentDTO>(rent);
        }

        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        /// <summary>
        /// Updates a Rent by its id
        /// </summary>
        /// <param name="id">Id of the Rent</param>
        /// <param name="rent">New Rent data</param>
        /// <returns>a Rent</returns>
        /// <remarks>
        /// Sample request
        /// PUT: api/rents/1
        /// </remarks>
        /// <response code="204">If Rent was updated</response>
        /// <response code="400">If the ids don't match</response>
        /// <response code="404">If Rent was not found in database</response>
        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> PutRent(int id, RentDTO rent)
        {
            var newRent = _mapper.Map<Rent>(rent);
            if (id != rent.RentId)
            {
                return BadRequest();
            }

            _context.Entry(newRent).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RentExists(id))
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
        /// Creates a Rent
        /// </summary>
        /// <param name="rent">The Rent data</param>
        /// <returns>a Rent</returns>
        /// <remarks>
        /// Sample request
        /// POST: api/rents
        /// </remarks>
        /// <response code="201">If the Rent was created</response>
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        public async Task<ActionResult<RentDTO>> PostRent(RentDTO rent)
        {
            var newRent = _mapper.Map<Rent>(rent);
            _context.Rents.Add(newRent);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetRent", new { id = rent.RentId }, rent);
        }

        /// <summary>
        /// Deletes a Rent by its id
        /// </summary>
        /// <param name="id">Id of the Rent</param>
        /// <returns>a Rent</returns>
        /// <remarks>
        /// Sample request
        /// DELETE: api/rents/1
        /// </remarks>
        /// <response code="204">If Rent was deleted</response>
        /// <response code="404">If Rent was not found</response>
        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> DeleteRent(int id)
        {
            var rent = await _context.Rents.FindAsync(id);
            if (rent == null)
            {
                return NotFound();
            }

            _context.Rents.Remove(rent);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool RentExists(int id)
        {
            return _context.Rents.Any(e => e.RentId == id);
        }
    }
}

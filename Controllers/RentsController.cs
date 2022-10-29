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
using GameRental.Repository;
using GameRental.Helpers;

namespace GameRental.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Produces("application/json")]
    public class RentsController : ControllerBase
    {
        private readonly RepositoryService _repository;
        private readonly IMapper _mapper;
        public RentsController(RepositoryService repository, IMapper mapper)
        {
            _mapper = mapper;
            _repository = repository;
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
        public async Task<ActionResult<IEnumerable<RentDTO>>> GetRents([FromQuery] RentDTOFilter _params)
        {
            var rents = await _repository.Rents.GetAllRents(_params);
            var mappedResults = _mapper.Map<List<RentDTO>>(rents);
            return Ok(new PagedResponse<List<RentDTO>>(mappedResults, rents.TotalCount));
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
            var rent = await _repository.Rents.FindByCondition(r => r.RentId == id).FirstOrDefaultAsync();

            if (rent == null)
            {
                return NotFound();
            }

            return Ok(_mapper.Map<RentDTO>(rent));
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

            _repository.Rents.Update(newRent);

            try
            {
                await _repository.SaveChangesAsync();
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
            _repository.Rents.Create(newRent);
            await _repository.SaveChangesAsync();
            rent.RentId = newRent.RentId;
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
            var rent = await _repository.Rents.FindByCondition(r => r.RentId == id).FirstOrDefaultAsync();
            if (rent == null)
            {
                return NotFound();
            }

            _repository.Rents.Delete(rent);
            await _repository.SaveChangesAsync();

            return NoContent();
        }

        private bool RentExists(int id)
        {
            return _repository.Rents.FindByCondition(r => r.RentId == id).FirstOrDefault() != null;
        }
    }
}

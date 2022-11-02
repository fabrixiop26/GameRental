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
    public class ClientsController : ControllerBase
    {
        private readonly RepositoryService _repository;
        private readonly IMapper _mapper;

        public ClientsController(RepositoryService repository, IMapper mapper)
        {
            _mapper = mapper;
            _repository = repository;
        }


        /// <summary>
        /// Returns the list of clients
        /// </summary>
        /// <returns>a list of clients</returns>
        /// <remarks>
        /// Sample request
        /// GET: api/clients
        /// </remarks>
        /// <response code="200">Success</response>
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<IEnumerable<ClientDTO>>> GetClients([FromQuery] ClientDTOFilter _params)
        {
            var clients = await _repository.Clients.GetAllClients(_params);
            var mappedData = _mapper.Map<List<ClientDTO>>(clients);
            return Ok(new PagedResponse<List<ClientDTO>>(mappedData, clients.TotalCount));
        }

        /// <summary>
        /// Return a Client by its id
        /// </summary>
        /// <param name="id">Id of the Client</param>
        /// <returns>a Client</returns>
        /// <remarks>
        /// Sample request
        /// GET: api/clients/5
        /// </remarks>
        /// <response code="200">Returns the Client</response>
        /// <response code="404">If the Client was not found</response>
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<ClientDTO>> GetClient(int id)
        {
            var client = await _repository.Clients.FindByCondition(c => c.ClientId == id).FirstOrDefaultAsync();

            if (client == null)
            {
                return NotFound();
            }

            return Ok(_mapper.Map<ClientDTO>(client));
        }
        /// <summary>
        /// Get the rents from a client
        /// </summary>
        /// <param name="id">Id of the client</param>
        /// <returns>A list of rents</returns>
        /// <response code="200">Returns the list of game rented by this client</response>
        [HttpGet("{id}/rentals")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<IEnumerable<RentDTO>>> GetRents(int id)
        {
            var rents = await _repository.Rents.FindByCondition(r => r.ClientId == id).ToListAsync();
            return Ok(_mapper.Map<List<RentDTO>>(rents));
        }
        /// <summary>
        /// Get the most frecuent client
        /// </summary>
        /// <returns>The client with the most rents</returns>
        /// <response code="200">Returns the list of game rented by this client</response>
        /// <response code="404">If there are no rents</response>
        [HttpGet("MostFrecuent")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<ClientDTO>> GetMostFrecuentClient()
        {
            // count the amounts of clientId 
            var result = await _repository.Rents.GetAll().GroupBy(r => r.ClientId, (x, y) => new
            {
                Quantity = y.Count(),
                ClientId = x,
            }).OrderByDescending(a => a.Quantity).FirstOrDefaultAsync();

            if (result == null)
            {
                return NotFound();
            }

            var client = await _repository.Clients.FindByCondition(c => c.ClientId == result.ClientId).FirstOrDefaultAsync();

            return Ok(_mapper.Map<ClientDTO>(client));
        }

        [HttpGet("GetAgeRange")]
        public async Task<ActionResult> GetAgeRanges()
        {
            // Age = EF.Functions.DateDiffYear()
            // inneficient calculations are made client-side and not in sql
            //var results = await _repository.Clients.GetAll().ToListAsync();

            var groupedResults = await _repository.Clients.GetAll().Select(c => new { Age = DateTime.Now.Year - c.Dob.Year })
                //.GroupBy(p => string.Concat((p.Age - 1) / 10 * 10 + 1,"-", (p.Age - 1) / 10 * 10 + 10))
                //.GroupBy(p => $"{(p.Age - 1) / 10 * 10 + 1}-{(p.Age - 1) / 10 * 10 + 10}")
                .GroupBy(p => ((p.Age - 1) / 10 * 10 + 1).ToString() + "-" + ((p.Age - 1) / 10 * 10 + 10).ToString())
                .Select(g => new { Range = g.Key, Count = g.Count() }).ToListAsync();
            return Ok(groupedResults);
        }


        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        /// <summary>
        /// Updates a Client by its id
        /// </summary>
        /// <param name="id">Id of the Client</param>
        /// <param name="client">New Client data</param>
        /// <returns>a Client</returns>
        /// <remarks>
        /// Sample request
        /// PUT: api/clients/1
        /// </remarks>
        /// <response code="204">If Client was updated</response>
        /// <response code="400">If the ids don't match</response>
        /// <response code="404">If Client was not found in database</response>
        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> PutClient(int id, ClientDTO client)
        {
            var newClient = _mapper.Map<Client>(client);
            if (id != newClient.ClientId)
            {
                return BadRequest();
            }

            _repository.Clients.Update(newClient);

            try
            {
                await _repository.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ClientExists(id))
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
        /// Creates a Client
        /// </summary>
        /// <param name="client">The Client data</param>
        /// <returns>a Client</returns>
        /// <remarks>
        /// Sample request
        /// POST: api/clients
        /// </remarks>
        /// <response code="201">If the Client was created</response>
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        public async Task<ActionResult<ClientDTO>> PostClient(ClientDTO client)
        {
            var newClient = _mapper.Map<Client>(client);
            _repository.Clients.Create(newClient);
            await _repository.SaveChangesAsync();
            client.ClientId = newClient.ClientId;
            return CreatedAtAction("GetClient", new { id = client.ClientId }, client);
        }

        /// <summary>
        /// Deletes a Client by its id
        /// </summary>
        /// <param name="id">Id of the Client</param>
        /// <returns>a Client</returns>
        /// <remarks>
        /// Sample request
        /// DELETE: api/clients/1
        /// </remarks>
        /// <response code="204">If Client was deleted</response>
        /// <response code="404">If Client was not found</response>
        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> DeleteClient(int id)
        {
            var client = await _repository.Clients.FindByCondition(c => c.ClientId == id).FirstOrDefaultAsync();
            if (client == null)
            {
                return NotFound();
            }

            _repository.Clients.Delete(client);
            await _repository.SaveChangesAsync();

            return NoContent();
        }

        private bool ClientExists(int id)
        {
            return _repository.Clients.FindByCondition(c => c.ClientId == id).FirstOrDefault() != null;
        }
    }
}

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
using System.Collections;
using AutoFilterer.Extensions;

namespace GameRental.Controllers
{
    [Route("clients")]
    [ApiController]
    [Produces("application/json")]
    public class ServiceController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly RepositoryService _repository;
        public ServiceController(RepositoryService repository, IMapper mapper)
        {
            _mapper = mapper;
            _repository = repository;
        }
        /// <summary>
        /// Return the balance of a client in his rental history
        /// </summary>
        /// <param name="id">The Id of the client</param>
        /// <param name="rentIds">The list of rent ids</param>
        /// <returns>The balance of a client</returns>
        /// <remarks>
        /// Sample request
        /// GET: clients/1/Balance
        /// </remarks>
        /// <response code="200">Client's balance</response>
        [HttpGet("{id}/Balance")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<decimal>> GetBalance(int id, [FromQuery] List<int> rentIds)
        {

            var balanceQuery =  _repository.Rents.FindByCondition(r => r.ClientId == id);

            if(rentIds.Count > 0)
            {
                balanceQuery = balanceQuery.Where(r => rentIds.Contains(r.RentId));
            }

            var balance = await balanceQuery.SumAsync(s => s.RentedPrice);

            return Ok(balance);
        }
        /// <summary>
        /// Return basic information about client's rents
        /// </summary>
        /// <param name="id">The Id of the client</param>
        /// <param name="rentIds">The list of rent ids</param>
        /// <param name="filter">The filters as query params</param>
        /// <returns>A list of rent information</returns>
        /// <remarks>
        /// Sample request
        /// GET: clients/1/GetRentsInfo
        /// </remarks>
        /// <response code="200">Client's rents</response>
        [HttpGet("{id}/GetRentsInfo")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult> GetRentsInfo(int id, [FromQuery] List<int> rentIds, [FromQuery] RentDTOFilter filter)
        {

            var rentQuery = _repository.Rents.FindByCondition(r => r.ClientId == id);

            if (rentIds.Count > 0)
            {
                rentQuery = rentQuery.Where(r => rentIds.Contains(r.RentId));
            }

            rentQuery = rentQuery.ApplyFilter(filter);

            var finalQuery = rentQuery.Include(r => r.Game).Select(s => new
            {
                rentId = s.RentId,
                returnDate = s.ReturnDate,
                game = s.Game.Name,
                rentedPrice = s.RentedPrice
            });


            var rentInfo = await finalQuery.ToListAsync();
            return Ok(rentInfo);
        }
    }
}

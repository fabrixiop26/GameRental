using AutoMapper;
using GameRental.DTOModels;
using GameRental.Models;

namespace GameRental.Profiles
{
    public class RentProfile : Profile
    {
        public RentProfile()
        {
            CreateMap<Rent, RentDTO>();
        }
    }
}

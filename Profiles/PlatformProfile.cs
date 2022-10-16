using AutoMapper;
using GameRental.DTOModels;
using GameRental.Models;

namespace GameRental.Profiles
{
    public class PlatformProfile : Profile
    {
        public PlatformProfile()
        {
            CreateMap<Platform, PlatformDTO>();
        }
    }
}

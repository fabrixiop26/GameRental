using AutoMapper;
using GameRental.DTOModels;
using GameRental.Models;

namespace GameRental.Profiles
{
    public class GameProfile : Profile
    {
        public GameProfile()
        {
            // Ignored Properties are managed manually
            CreateMap<Game, GameDTO>().ReverseMap()
                .ForPath(s => s.Platforms, opt => opt.Ignore())
                .ForPath(s => s.Characters, opt => opt.Ignore());
        }
    }
}

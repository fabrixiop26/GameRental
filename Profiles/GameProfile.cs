using AutoMapper;
using GameRental.DTOModels;
using GameRental.Models;

namespace GameRental.Profiles
{
    public class GameProfile : Profile
    {
        public GameProfile()
        {
            CreateMap<Game, GameDTO>()
                .ForMember(dest => dest.Platforms, opt => opt.MapFrom(src => src.Platforms.Select(s => s.Name)))
                .ForMember(dest => dest.Characters, opt => opt.MapFrom(src => src.Characters.Select(s => s.Name)))
                .ReverseMap()
                .ForPath(s => s.Platforms, opt => opt.Ignore())
                .ForPath(s => s.Characters, opt => opt.Ignore());
        }
    }
}

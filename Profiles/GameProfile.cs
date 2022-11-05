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
            CreateMap<Game, GameDTO>()
                .ForMember(dst => dst.PlatformIds, opts => opts.MapFrom(src => src.Platforms.Select(s => s.PlatformId)))
                .ForMember(dst => dst.CharacterIds, opts => opts.MapFrom(src => src.Characters.Select(s => s.CharacterId)))
                .ReverseMap()
                .ForPath(s => s.Platforms, opt => opt.Ignore())
                .ForPath(s => s.Characters, opt => opt.Ignore());
        }
    }
}

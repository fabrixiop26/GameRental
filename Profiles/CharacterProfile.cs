using AutoMapper;
using GameRental.DTOModels;
using GameRental.Models;

namespace GameRental.Profiles
{
    public class CharacterProfile : Profile
    {
        public CharacterProfile()
        {
            CreateMap<Character, CharacterDTO>();
        }
    }
}

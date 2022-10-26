using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel;
using AutoFilterer.Types;
using GameRental.Models;
using Microsoft.AspNetCore.Mvc;
using System.Xml.Linq;

namespace GameRental.DTOModels
{
    [GenerateAutoFilter]
    [DisplayName("CharacterViewModel")]
    public class CharacterDTO
    {
        public int CharacterId { get; set; }
        [StringLength(50)]
        [Unicode(false)]
        public string Name { get; set; } = null!;
    }
}

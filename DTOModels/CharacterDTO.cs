using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel;

namespace GameRental.DTOModels
{
    [DisplayName("CharacterViewModel")]
    public class CharacterDTO
    {
        public int CharacterId { get; set; }
        [StringLength(50)]
        [Unicode(false)]
        public string Name { get; set; } = null!;
    }
}

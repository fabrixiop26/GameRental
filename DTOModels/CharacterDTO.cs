using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel;
using Swashbuckle.AspNetCore.Annotations;

namespace GameRental.DTOModels
{
    [DisplayName("CharacterViewModel")]
    public class CharacterDTO
    {
        [SwaggerSchema(ReadOnly = true)]
        public int CharacterId { get; set; }
        [StringLength(50)]
        [Unicode(false)]
        public string Name { get; set; } = null!;
    }
}

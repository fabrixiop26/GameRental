using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel;

namespace GameRental.DTOModels
{
    [DisplayName("GameViewModel")]
    public class GameDTO
    {
        public int GameId { get; set; }
        [StringLength(100)]
        [Unicode(false)]
        public string Name { get; set; } = null!;
        [StringLength(50)]
        [Unicode(false)]
        public string Company { get; set; } = null!;
        [StringLength(50)]
        [Unicode(false)]
        public string Director { get; set; } = null!;
        [StringLength(50)]
        [Unicode(false)]
        public string Producer { get; set; } = null!;
        public DateTime ReleaseDate { get; set; }
        public decimal RentPrice { get; set; }
        public List<string> Characters { get; set; } = new List<string>();
        public List<string> Platforms { get; set; } = new List<string>();
    }
}

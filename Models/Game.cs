using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;

namespace GameRental.Models
{
    [Table("Game")]
    public partial class Game
    {
        public Game()
        {
            Rents = new HashSet<Rent>();
            Characters = new HashSet<Character>();
            Platforms = new HashSet<Platform>();
        }

        [Key]
        [Column("GAME_ID")]
        public int GameId { get; set; }
        [Column("NAME")]
        [StringLength(100)]
        [Unicode(false)]
        public string Name { get; set; } = null!;
        [Column("COMPANY")]
        [StringLength(50)]
        [Unicode(false)]
        public string Company { get; set; } = null!;
        [Column("DIRECTOR")]
        [StringLength(50)]
        [Unicode(false)]
        public string Director { get; set; } = null!;
        [Column("PRODUCER")]
        [StringLength(50)]
        [Unicode(false)]
        public string Producer { get; set; } = null!;
        [Column("RELEASE_DATE", TypeName = "date")]
        public DateTime ReleaseDate { get; set; }
        [Column("RENT_PRICE", TypeName = "decimal(10, 2)")]
        public decimal RentPrice { get; set; }

        [InverseProperty("Game")]
        public virtual ICollection<Rent> Rents { get; set; }

        [ForeignKey("GameId")]
        [InverseProperty("Games")]
        public virtual ICollection<Character> Characters { get; set; }
        [ForeignKey("GameId")]
        [InverseProperty("Games")]
        public virtual ICollection<Platform> Platforms { get; set; }
    }
}

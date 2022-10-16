using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;
using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;

namespace GameRental.Models
{
    [Table("Character")]
    public partial class Character
    {
        public Character()
        {
            Games = new HashSet<Game>();
        }

        [Key]
        [Column("CHARACTER_ID")]
        public int CharacterId { get; set; }
        [Column("NAME")]
        [StringLength(50)]
        [Unicode(false)]
        public string Name { get; set; } = null!;

        [ForeignKey("CharacterId")]
        [InverseProperty("Characters")]
        public virtual ICollection<Game> Games { get; set; }
    }
}

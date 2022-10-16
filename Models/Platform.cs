using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;
using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;

namespace GameRental.Models
{
    [Table("Platform")]
    public partial class Platform
    {
        public Platform()
        {
            Games = new HashSet<Game>();
        }

        [Key]
        [Column("PLATFORM_ID")]
        public int PlatformId { get; set; }
        [Column("NAME")]
        [StringLength(50)]
        [Unicode(false)]
        public string Name { get; set; } = null!;

        [ForeignKey("PlatformId")]
        [InverseProperty("Platforms")]
        public virtual ICollection<Game> Games { get; set; }
    }
}

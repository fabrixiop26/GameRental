using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace GameRental.Models
{
    [Table("Rent")]
    public partial class Rent
    {
        [Key]
        [Column("RENT_ID")]
        public int RentId { get; set; }
        [Column("RENTED_DATE", TypeName = "date")]
        public DateTime RentedDate { get; set; }
        [Column("RETURN_DATE", TypeName = "date")]
        public DateTime ReturnDate { get; set; }
        [Column("RENTED_PRICE", TypeName = "decimal(10, 2)")]
        public decimal RentedPrice { get; set; }
        [Column("CLIENT_ID")]
        public int ClientId { get; set; }
        [Column("GAME_ID")]
        public int GameId { get; set; }

        [ForeignKey("ClientId")]
        [InverseProperty("Rents")]
        public virtual Client Client { get; set; } = null!;
        [ForeignKey("GameId")]
        [InverseProperty("Rents")]
        public virtual Game Game { get; set; } = null!;
    }
}

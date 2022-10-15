using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace GameRental.Models
{
    [Table("Client")]
    [Index("Nit", Name = "IX_Client", IsUnique = true)]
    public partial class Client
    {
        public Client()
        {
            Rents = new HashSet<Rent>();
        }

        [Key]
        [Column("CLIENT_ID")]
        public int ClientId { get; set; }
        [Column("NIT")]
        public int Nit { get; set; }
        [Column("FIRST_NAME")]
        [StringLength(50)]
        [Unicode(false)]
        public string FirstName { get; set; } = null!;
        [Column("LAST_NAME")]
        [StringLength(50)]
        [Unicode(false)]
        public string LastName { get; set; } = null!;
        [Column("ADDRESS")]
        [StringLength(50)]
        [Unicode(false)]
        public string? Address { get; set; }
        [Column("DOB", TypeName = "date")]
        public DateTime Dob { get; set; }

        [InverseProperty("Client")]
        public virtual ICollection<Rent> Rents { get; set; }
    }
}

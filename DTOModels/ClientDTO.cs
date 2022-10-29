using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel;

namespace GameRental.DTOModels
{
    [GenerateAutoFilter]
    [DisplayName("ClientViewModel")]
    public class ClientDTO
    {
        public int ClientId { get; set; }
        public int Nit { get; set; }

        [StringLength(50)]
        [Unicode(false)]
        public string FirstName { get; set; } = null!;
        
        [StringLength(50)]
        [Unicode(false)]
        public string LastName { get; set; } = null!;
       
        [StringLength(50)]
        [Unicode(false)]
        public string? Address { get; set; }

        public DateTime Dob { get; set; }
    }
}

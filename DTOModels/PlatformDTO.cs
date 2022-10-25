using Microsoft.EntityFrameworkCore;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace GameRental.DTOModels
{
    [DisplayName("PlatformViewModel")]
    public class PlatformDTO
    {
        public int PlatformId { get; set; }
        [StringLength(50)]
        [Unicode(false)]
        public string Name { get; set; } = null!;
    }
}

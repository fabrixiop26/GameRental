using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations.Schema;

namespace GameRental.DTOModels
{
    [DisplayName("RentViewModel")]
    public class RentDTO
    {

        public int RentId { get; set; }
        public DateTime RentedDate { get; set; }
        public DateTime ReturnDate { get; set; }
        public decimal RentedPrice { get; set; }
        public int ClientId { get; set; }
        public int GameId { get; set; }
    }
}

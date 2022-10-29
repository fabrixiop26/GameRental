using Microsoft.EntityFrameworkCore;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using AutoFilterer.Attributes;
using AutoFilterer.Enums;

namespace GameRental.DTOModels
{

    [GenerateAutoFilter]
    [DisplayName("PlatformViewModel")]
    public class PlatformDTO
    {
        public int PlatformId { get; set; }
        [StringLength(50)]
        [Unicode(false)]
        [StringFilterOptions(StringFilterOption.Contains)]
        public string Name { get; set; } = null!;
    }
}

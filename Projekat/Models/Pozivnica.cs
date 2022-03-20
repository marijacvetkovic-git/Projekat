using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Models
{
    public class Pozivnica
    {
        [Key]
        public int Id { get; set; }
       
        [Required]
        [MaxLength(50)]
        public string Ime { get; set; }
        [Required]
        [MaxLength(50)]
        public string Prezime { get; set; } 
        [Required]
        public bool Dosao { get; set; }     

        [JsonIgnore]
        public Dogadjaj PozivnicaDogadjaj { get; set; }

    }
}
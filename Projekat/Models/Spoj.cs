using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Models
{
    public class Spoj
    {
        [Key]
        public int ID { get; set; }
        [JsonIgnore]
        public  virtual Dogadjaj Dogadjaj { get; set; }  

        public  Dekoracija Dekoracija { get; set; }

        [Required]
        public int Kolicina { get; set; }
        
    }
}
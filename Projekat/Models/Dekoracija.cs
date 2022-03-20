using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Models
{
    public class Dekoracija
    {
        [Key]
        public int ID { get; set; }
        public string Boja { get; set; }    
        public string  Tip { get; set; }    
        public int Cena { get; set; }
     //  [ForeignKey("SpojID")]
     [JsonIgnore]
        public List< Spoj> DekoracijaDogadjaj {get; set;}

    }
}
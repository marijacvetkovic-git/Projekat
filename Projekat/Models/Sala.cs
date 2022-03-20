using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Models
{
    public class Sala
    {
    
    [Key]
    public int ID { get; set; } 

    [Required]
    public string Naziv { get; set; }

    [Required]
    public int BrojMesta { get; set; }
    public int CenaPoMestu { get; set; }

    [JsonIgnore]
    public List<Dogadjaj> Dogadjaji { get; set; }   
    
    }
}
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Models
{
    public class Dogadjaj
    {
        [Key]
        public int ID { get; set; }
       
        [MaxLength(50)]
        public string Naziv { get; set; }
      //   public float Cena { get; set; }
        public DateTime Datum { get; set; }
        public int BrojGostiju { get; set; }
      //  [JsonIgnore]
        public Sala Salica { get; set; }
        public Klijent Klijentic {get; set;}
        public List<Spoj> DogadjajDekoracija { get; set; }
        public List<Pozivnica> DogadjajPozivnica { get; set; }
    }
}
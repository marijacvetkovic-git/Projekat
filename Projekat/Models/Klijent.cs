 using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Models
{
     public class Klijent
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [MaxLength(50)]
        public string ImeKlijenta { get; set; }
        [Required]
        [MaxLength(50)]
        public string PrezimeKlijenta { get; set; }
        [Required]
        [MaxLength(13)]
        public string BrojTel { get; set; }
        public List<Dogadjaj> KlijentDogadjaj { get; set; }
    }
}
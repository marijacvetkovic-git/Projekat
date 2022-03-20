using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Models;

namespace Projekat.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class KlijentController : ControllerBase
    {
        public ProjectContext Context { get; set; }

        public KlijentController(ProjectContext context)
        {
            Context = context;
        }
        
    [Route("Dodaj Klijenta")]//mozda treba id
    [HttpPost]
    public async Task<ActionResult> DodajKlijenta([FromBody]Klijent kl)
       {
          if (string.IsNullOrWhiteSpace(kl.ImeKlijenta) || kl.ImeKlijenta.Length > 50)
            {
                 return BadRequest("Pogrešno ime!");
            }
            if (string.IsNullOrWhiteSpace(kl.PrezimeKlijenta) || kl.PrezimeKlijenta.Length > 50)
            {
                 return BadRequest("Pogrešno prezime!");
            }
            if (string.IsNullOrWhiteSpace(kl.BrojTel) || kl.BrojTel.Length > 13)
            {
                 return BadRequest("Pogrešan broj telefona!");
            }
             try
            {
                Context.Klijenti.Add(kl);
                await Context.SaveChangesAsync();
                return Ok("Uspesno dodat klijent");//pa onda da se trazi lista dekoracij preko id dogadjaja
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
            
        }
        






    }
}
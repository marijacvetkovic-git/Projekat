using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Models;

namespace Projekat.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class DekoracijaController : ControllerBase
    {
          public ProjectContext Context { get; set; }

        public DekoracijaController(ProjectContext context)
        {
            Context = context;
        }
       
        [Route("VratiTipoveBoje")]
        [HttpGet]
        public async Task<ActionResult> VratiTipoveBoje()//nalupala se na max
        { 
            try
            {
                return Ok(await Context.Dekoracije.Select(p =>
                new
                {
                    p.ID,
                    p.Tip,
                    p.Boja,
                    p.Cena
                   
                  //  Vracam = p.Tip.ToString() +" "+ p.Boja.ToString(),
                    // return Ok(await Context.Sale.Select( p => new {p.ID, p.Naziv,p.BrojMesta }).ToListAsync());

                }).ToListAsync());//drop down...i id
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
       
         
        [Route("VratiDekoracije/{id}")]
        [HttpGet]
        public async Task<ActionResult> Preuzmi(int id)// nalupala gluposti verv
        {
            try
            {
                var  dogadjaji = Context.Spojevi.
                Include(p=>p.Dogadjaj).
                Where(p=>p.Dogadjaj.ID==id)
                .Include(p => p.Dekoracija);  
                var dogadjaj= await dogadjaji.ToListAsync();
                var dog = await dogadjaji.FirstOrDefaultAsync();
                if (dog == null)
                    return StatusCode(202,"Nema dekoracija za taj dogadjaj");
                return Ok
                (
                    dogadjaj.Select(p=>
                new
                {
                   // IdDog=p.Dogadjaj.ID,
                    IdSpoj=p.ID,
                    Tip= p.Dekoracija.Tip,
                    Boja=p.Dekoracija.Boja,
                    Cena=p.Dekoracija.Cena * p.Kolicina,
                    Kolicina = p.Kolicina



                 }).ToList()

                 
                );
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

       [Route("IzbrisiDekoracijuZaDogadjaj/{id}")]
       [HttpDelete]
       public async Task<ActionResult> Izbrisi(int id)
       {
        try{
            var spojic =await  Context.Spojevi.FindAsync(id);
            Context.Spojevi.Remove(spojic);
            await Context.SaveChangesAsync();
            return Ok($"Uspešno izbrisana dekoracija");
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
       }

       [Route("IzmeniKolicinu/{idSpoja}/{kol}")]
       [HttpPut]
       public async Task<ActionResult> Izmeni(int idSpoja, int kol)
       {
           try{
           var spojcina = await Context.Spojevi.FindAsync(idSpoja);
           spojcina.Kolicina=kol;
            await Context.SaveChangesAsync();
                return Ok("Uspesno promenjena kolicina");
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
           
       }


        
        
    }
}
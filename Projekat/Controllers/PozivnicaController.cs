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
    public class PozivnicaController : ControllerBase
    {
        public ProjectContext Context { get; set; }

        public PozivnicaController(ProjectContext context)
        {
            Context = context;
        }
    
    [Route("DodajGosta/{idDog}")]
    [HttpPost]
    public async Task<ActionResult> DodajGosta([FromBody]Pozivnica pozivnica,int idDog)//da li mi i ovde treba id za dogadjaj?
    {
         if (string.IsNullOrWhiteSpace(pozivnica.Ime) || pozivnica.Ime.Length > 50)
        {
            return BadRequest("Pogrešno ime!");
        }

         if (string.IsNullOrWhiteSpace(pozivnica.Prezime) || pozivnica.Prezime.Length > 50)
        {
            return BadRequest("Pogrešno prezime!");
        }

        var dog = await Context.Dogadjaji.Where(p=>p.ID==idDog)
        .Include(p=>p.DogadjajPozivnica).FirstOrDefaultAsync();        
        // if(dog==null)
        // {
        //     return StatusCode(201,"Kuku");
        // }
       // var g = dog.DogadjajPozivnica.Where(p=>p.Ime==pozivnica.Ime && p.Prezime==pozivnica.Prezime).FirstOrDefault();
         var g = dog.DogadjajPozivnica.Where(p=>p.Ime==pozivnica.Ime && p.Prezime==pozivnica.Prezime).FirstOrDefault();    
        if(g != null)
        {
            return StatusCode(202,"Postoji klijent sa tim imenom");
        }
    //    var g = dog.DogadjajPozivnica.Where(p=>p.Ime==pozivnica.Ime).FirstOrDefault();
        pozivnica.Dosao=false;
        // dog.DogadjajPozivnica.Add(pozivnica);
        pozivnica.PozivnicaDogadjaj=dog;
        try
            {
                dog.DogadjajPozivnica.Add(pozivnica);
                Context.Pozivnice.Add(pozivnica);
                await Context.SaveChangesAsync();
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message );
            }
    } 
   /* 
    [Route("Dodaj Gosta1/{ime}/{prezime}")]
    [HttpPost]
        public async Task<ActionResult> DodajGosta1(string ime,string prezime)
    {
         if (string.IsNullOrWhiteSpace(ime) || ime.Length > 50)
        {
            return BadRequest("Pogrešno ime!");
        }

         if (string.IsNullOrWhiteSpace(prezime) || prezime.Length > 50)
        {
            return BadRequest("Pogrešno prezime!");
        }
        Pozivnica pozivnica = new Pozivnica();
        pozivnica.Dosao=false;
        pozivnica.Ime=ime;
        pozivnica.Prezime=prezime;
        try
            {
                Context.Pozivnice.Add(pozivnica);
                await Context.SaveChangesAsync();
                return Ok("Dodato");
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
    } 
    */
    [Route("DosaoGostic/{id}")]
    [HttpPut]
    public async Task<ActionResult> DosaoGostic(int id)
    {
       var posl= await Context.Pozivnice.FindAsync(id);
       posl.Dosao=true;
       try
            {
                await Context.SaveChangesAsync();
                return Ok("DOSAO");
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
    }
    [Route("VratiGoste/{id}")]
    [HttpGet]
     public async Task<ActionResult> VratiGoste(int id)
    {
             try
            {
                var dog = await Context.Pozivnice
                .Include(p=>p.PozivnicaDogadjaj)
                .Where(p=>p.PozivnicaDogadjaj.ID==id).ToListAsync();
                var d = dog.FirstOrDefault();
                if(d==null)
                {
                    return StatusCode(202,"Niste dodali goste !");
                }
                // return Ok(await Context.Pozivnice.Select(p => new { p.Ime, p.Prezime,p.Dosao }).ToListAsync());
                return Ok(dog.Select(p=>
                new{
                    p.Ime,
                    p.Prezime,
                    p.Dosao,
                    p.Id
                }
                )
                
                );
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
    }
     [Route("PromeniDosao/{idG}")]
    [HttpPut]
    public async Task<ActionResult> PromeniDosao(int idG)
    {
        try
        {
            var nst = await Context.Pozivnice.FindAsync(idG);
            nst.Dosao=true;
            await Context.SaveChangesAsync();
            return Ok(nst);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }


    }
    }

   
}
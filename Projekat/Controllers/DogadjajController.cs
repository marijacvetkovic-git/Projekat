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
    public class DogadjajController : ControllerBase
    {
        public ProjectContext Context { get; set; }

        public DogadjajController(ProjectContext context)
        {
            Context = context;
        }
            //DodajDogadjaj 
        [Route("ZakaziDogadjaj/{id}/{ime}/{prezime}/{brtel}")]//mozda treba i ime,prez i br tel i pravi se klijent i ubacuje se
        [HttpPost]
        public async Task<ActionResult> DodajDogadjaj(int id,string ime,string prezime,string brtel,[FromBody]Dogadjaj dog)
        {
            
            var posl= await Context.Sale.FindAsync(id);
           
            
            if(dog.BrojGostiju>posl.BrojMesta)//proveri
            {
              return BadRequest("Preveliki broj gostiju za salu!");
            }  
            if (string.IsNullOrWhiteSpace(ime) || ime.Length > 50)
            {
                 return BadRequest("Pogrešno ime!");
            }
            if (string.IsNullOrWhiteSpace(prezime) || prezime.Length > 50)
            {
                 return BadRequest("Pogrešno prezime!");
            }
            if (string.IsNullOrWhiteSpace(brtel) || brtel.Length > 13)
            {
                 return BadRequest("Pogrešnan broj telefona!");
            }
            dog.Salica=posl;
            /*
            var dogadjaj= new Dogadjaj();
            dogadjaj.ID=5;
            dogadjaj.Salica=posl;
            dogadjaj.BrojGostiju=brojGostiju;
            dogadjaj.Datum=DateTime.Today;
            dogadjaj.Naziv=naziv;   
           */
                    
           var kl= Context.Klijenti.Where(p=> p.BrojTel==brtel).FirstOrDefault();
            if(kl==null )
            {
                Klijent klijent = new Klijent();
                klijent.ImeKlijenta=ime;
                klijent.PrezimeKlijenta=prezime;
                klijent.BrojTel=brtel;
                kl=klijent;
                Context.Klijenti.Add(kl);
            }
            
            dog.Klijentic=kl;
            try
            {
                Context.Dogadjaji.Add(dog);
                await Context.SaveChangesAsync();
                return Ok(/*$"Sve je okej i id je :{dogadjaj.ID}" */);//pa onda da se trazi lista dekoracij preko id dogadjaja
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        } 
        [Route("Dodaj Dekoraciju/{id}/{kol}")]
        [HttpPost]
        public async Task<ActionResult> DodajDekoraciju([FromRoute]int id,int kol,[FromBody] Dekoracija dekoracija)
        {
            var dog= await Context.Dogadjaji.FindAsync(id);
            var dek= await Context.Dekoracije.Where(p=> p.Tip==dekoracija.Tip && p.Boja==dekoracija.Boja).FirstOrDefaultAsync();
            Spoj s =new Spoj();
            s.Dekoracija=dekoracija;
            s.Dogadjaj=dog;
            s.Kolicina=kol;
            Context.Spojevi.Add(s);
         //   dog.DogadjajDekoracija.Add(s);
             try
            {
                await Context.SaveChangesAsync();
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }


        }
          [Route("DodajDekoraciju2/{id}/{id1}/{kolicina}")]
        [HttpPost]
        public async Task<ActionResult> DodajDekoraciju2([FromRoute]int id, int id1,int kolicina)
        {
            var dog= await Context.Dogadjaji.FindAsync(id);
            var dek=await Context.Dekoracije.FindAsync(id1);
            var sp = await Context.Spojevi.Where(p=>p.Dogadjaj.ID==id && p.Dekoracija.ID==id1).FirstOrDefaultAsync();
            // var d=await Context.Dogadjaji.Include(p=>p.DogadjajDekoracija).ThenInclude(p=>p.Dekoracija).Where(p=>p.ID==id).FirstOrDefaultAsync();
            Spoj s =new Spoj();
            s.Dekoracija=dek;
            s.Dogadjaj=dog;
            s.Kolicina=kolicina;
            if(sp != null)
            {
                return StatusCode(202,"Postoji ova dekoracija , mozete je obrisati ili izmeniti velicinu");

            }
            Context.Spojevi.Add(s);
         //   dog.DogadjajDekoracija.Add(s);
             try
            {
                await Context.SaveChangesAsync();
                return Ok("Uspesno dodata dekoracija");
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }


        }
        [Route("VratiSumu/{id}")]
        [HttpGet]
     public async Task<ActionResult> VratiSumu(int id)
    {
        try
        {
            int br=0;
            var poz = await Context.Pozivnice.Where(p=>p.PozivnicaDogadjaj.ID==id).ToListAsync();
            poz.ForEach(p=>{
            if(p.Dosao==true)
            br++;
            }
            );
            var dog= await Context.Dogadjaji.Where(p=>p.ID==id).Include(p=>p.Salica).FirstOrDefaultAsync();
            int cenam=dog.Salica.CenaPoMestu;
            int cena = br*cenam;

            var listaD= await Context.Spojevi.Where(p=>p.Dogadjaj==dog).Include(p=>p.Dekoracija).ToListAsync();
            int cenaD=0;
            if(listaD==null)
            {
                return StatusCode(202,"nema dek");
                
            }
            else{
                listaD.ForEach(
                p=>{
                 cenaD+=p.Kolicina*p.Dekoracija.Cena;

                }
                );
            }
            
            return Ok(
                new
                {
                    CenaDekoracije = cenaD,
                    CenaMesta = cena
                    
                }
                
            );
 
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
    [Route("VratiDogadjaje/{brojT}/{salaid}")]
    [HttpGet]
     public async Task<ActionResult> VratiDogadjaje(string brojT,int salaid)
    {
        try
        {
            var klijent = await Context.Dogadjaji.Where(s=>s.Klijentic.BrojTel==brojT && s.Salica.ID==salaid).FirstOrDefaultAsync();
            if(klijent==null)
            {
                return StatusCode(202,"Ne postoje dogadjaji za klijenta sa tim brojem");
              // return BadRequest("Ne postoje dogadjaji za klijenta sa tim brojem");
            }
        var kldog =  Context.Dogadjaji
        .Include(p=>p.Klijentic)
        .Where(p=>p.Klijentic.BrojTel==brojT && p.Salica.ID==salaid); 
        var dog = await kldog.ToListAsync();
        // if(dog==null)
        // {
        //     return StatusCode(202,"Ne postoje dogadjaji za klijenta sa tim brojem");
        // }
      
        return Ok
        (
           dog.Select(p=>
            new
            {
                Naziv = p.Naziv,
                Datum = p.Datum,
                BrojT= p.Klijentic.BrojTel,
                Id = p.ID

            }).ToList()
         
        ); 
        }
        catch(Exception e)
        {
            return BadRequest(e.Message);
        }

    }
    // }

    [Route("ProveraDatuma/{datum}/{salaId}")]
    [HttpGet]
     public async Task<ActionResult> Provera(DateTime datum,int salaId)
    {
        try{

        var dogadjaj= await Context.Dogadjaji.Where(p=>p.Datum==datum && p.Salica.ID==salaId).FirstOrDefaultAsync();   
        if (dogadjaj!=null)
        {
            return StatusCode(202,"Postoji zakazan dogadjaj za taj datum, molimo Vas izaberite novi datum!");  
        }
        else
        {
            return Ok();

        }
        }
        catch(Exception e)
        {
            return BadRequest(e.Message);
        }


    }

    [Route("IzbrisiDog/{id}")]
    [HttpDelete]
    public async Task<ActionResult> Brisbris(int id)
    {
        try
        {
        var dog = await Context.Dogadjaji.FindAsync(id);
        if(dog==null)
            return StatusCode(202,"pogresan id ");
        
        var spojevi = await Context.Spojevi.Where(p=>p.Dogadjaj.ID==id).ToListAsync();
        var gosti = await Context.Pozivnice.Where(p=>p.PozivnicaDogadjaj.ID==id).ToListAsync();
        //var ap = Context.Spojevi.Where(p=>p.Dogadjaj.ID==id).FirstOrDefault();
        if(spojevi.Count!=0)
        {
            spojevi.ForEach(spoj=>
            {
                Context.Spojevi.Remove(spoj);

            });
        }
        if(gosti.Count!=0)
        {
            gosti.ForEach(gost=>
            {
                Context.Pozivnice.Remove(gost);

            });
        }

        Context.Dogadjaji.Remove(dog);
        await Context.SaveChangesAsync();
        return Ok("Obrisano");

        }
        catch(Exception e)
        {
            return BadRequest(e.InnerException.Message);
        }

    }

    [Route("VratiIdSaleZaDog/{dogid}")]
    [HttpGet]
    public async Task<ActionResult> VratiIdSale(int dogid)
    {
        try{
        var dog= await Context.Dogadjaji
        .Include(p=>p.Salica)
        .Where(p=>p.ID==dogid).FirstOrDefaultAsync();
         return Ok
        (dog.Salica.ID
        //    dog.Select(p=>
        //     new
        //     {
             
        //         SalaId= p.Salica.id

        //     })
         
        ); 
        }
        catch(Exception e)
        {
            return BadRequest(e.Message);
        }
    }
    } 
}

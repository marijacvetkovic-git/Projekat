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
    public class SalaController : ControllerBase
    {
          public ProjectContext Context { get; set; }

        public SalaController(ProjectContext context)
        {
            Context = context;
        }
        

        [Route("VratiSale")]
        [HttpGet]
        public async Task<ActionResult> VratiSale()
        {
          try
          {
            return Ok(await Context.Sale.Select( p => new {p.ID, p.Naziv,p.BrojMesta }).ToListAsync());
          }
          catch (Exception e)
          {
            return BadRequest(e.Message);
          }
          
        }
        
    }
    
}
using Microsoft.EntityFrameworkCore;
namespace Models
{

    public class ProjectContext : DbContext
    {
        public DbSet<Sala> Sale { get; set; }
        public DbSet<Dogadjaj> Dogadjaji { get; set; }  
        public DbSet<Dekoracija> Dekoracije { get; set; }   
        public DbSet<Pozivnica> Pozivnice { get; set; }
        public DbSet<Spoj> Spojevi { get; set; }
        public DbSet<Klijent> Klijenti { get; set; }

        public ProjectContext(DbContextOptions options) : base (options)
        {

        }
      
        
        

        
    }
}
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Data;

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    public DbSet<Campeao> Campeoes { get; set; }
    public DbSet<Reliquia> Reliquias { get; set; }
    public DbSet<Modificador> Modificadores { get; set; }
    public DbSet<TipoBuild> TiposBuilds { get; set; }
    public DbSet<Build> Builds { get; set; }
    public DbSet<MensagemRecrutador> MensagensRecrutadores { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Campeao>(e =>
        {
            e.HasIndex(c => c.Slug).IsUnique();
            e.Property(c => c.Nome).HasMaxLength(100).IsRequired();
            e.Property(c => c.Slug).HasMaxLength(100).IsRequired();
        });

        modelBuilder.Entity<Build>(e =>
        {
            e.HasOne(b => b.Campeao)
                .WithMany(c => c.Builds)
                .HasForeignKey(b => b.CampeaoId)
                .OnDelete(DeleteBehavior.Cascade);

            e.HasOne(b => b.TipoBuild)
                .WithMany(t => t.Builds)
                .HasForeignKey(b => b.TipoBuildId)
                .OnDelete(DeleteBehavior.Restrict);

            // Restrict para evitar múltiplos caminhos de cascade delete
            e.HasOne(b => b.Reliquia1).WithMany().HasForeignKey(b => b.Reliquia1Id).OnDelete(DeleteBehavior.Restrict);
            e.HasOne(b => b.Reliquia2).WithMany().HasForeignKey(b => b.Reliquia2Id).OnDelete(DeleteBehavior.Restrict);
            e.HasOne(b => b.Reliquia3).WithMany().HasForeignKey(b => b.Reliquia3Id).OnDelete(DeleteBehavior.Restrict);
        });

        modelBuilder.Entity<MensagemRecrutador>(e =>
        {
            e.Property(m => m.Nome).HasMaxLength(150).IsRequired();
            e.Property(m => m.Email).HasMaxLength(150).IsRequired();
            e.Property(m => m.Mensagem).HasMaxLength(2000).IsRequired();
        });
    }
}

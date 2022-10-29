using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using GameRental.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using GameRental.Helpers;

namespace GameRental.DBContext
{
    public partial class AppDbContext : DbContext
    {
        public AppDbContext()
        {
        }
        private readonly string _connectionString;
        // inject configuration to avoid using hardcoded values in OnConfiguring
        public AppDbContext(DbContextOptions<AppDbContext> options, IConfiguration config)
        : base(options)
        {
            _connectionString = config.GetConnectionString("DbConnectionString");
        }

        public virtual DbSet<Character> Characters { get; set; } = null!;
        public virtual DbSet<Client> Clients { get; set; } = null!;
        public virtual DbSet<Game> Games { get; set; } = null!;
        public virtual DbSet<Platform> Platforms { get; set; } = null!;
        public virtual DbSet<Rent> Rents { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer(_connectionString);
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Game>(entity =>
            {
                entity.HasMany(d => d.Characters)
                    .WithMany(p => p.Games)
                    .UsingEntity<Dictionary<string, object>>(
                        "GameCharacter",
                        l => l.HasOne<Character>().WithMany().HasForeignKey("CharacterId").OnDelete(DeleteBehavior.ClientSetNull).HasConstraintName("FK_Game_Character_Character"),
                        r => r.HasOne<Game>().WithMany().HasForeignKey("GameId").OnDelete(DeleteBehavior.ClientSetNull).HasConstraintName("FK_Game_Character_Game"),
                        j =>
                        {
                            j.HasKey("GameId", "CharacterId");

                            j.ToTable("Game_Character");

                            j.IndexerProperty<int>("GameId").HasColumnName("GAME_ID");

                            j.IndexerProperty<int>("CharacterId").HasColumnName("CHARACTER_ID");
                        });

                entity.HasMany(d => d.Platforms)
                    .WithMany(p => p.Games)
                    .UsingEntity<Dictionary<string, object>>(
                        "GamePlatform",
                        l => l.HasOne<Platform>().WithMany().HasForeignKey("PlatformId").OnDelete(DeleteBehavior.ClientSetNull).HasConstraintName("FK_Game_Platform_Platform"),
                        r => r.HasOne<Game>().WithMany().HasForeignKey("GameId").OnDelete(DeleteBehavior.ClientSetNull).HasConstraintName("FK_Game_Platform_Game"),
                        j =>
                        {
                            j.HasKey("GameId", "PlatformId");

                            j.ToTable("Game_Platform");

                            j.IndexerProperty<int>("GameId").HasColumnName("GAME_ID");

                            j.IndexerProperty<int>("PlatformId").HasColumnName("PLATFORM_ID");
                        });
            });

            modelBuilder.Entity<Rent>(entity =>
            {
                entity.HasOne(d => d.Client)
                    .WithMany(p => p.Rents)
                    .HasForeignKey(d => d.ClientId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Rent_Client");

                entity.HasOne(d => d.Game)
                    .WithMany(p => p.Rents)
                    .HasForeignKey(d => d.GameId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Rent_Game");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}

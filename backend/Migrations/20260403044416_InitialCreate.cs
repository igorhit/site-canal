using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Campeoes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Nome = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    Slug = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    Regiao1 = table.Column<string>(type: "text", nullable: true),
                    Regiao2 = table.Column<string>(type: "text", nullable: true),
                    Estrelas = table.Column<string>(type: "text", nullable: true),
                    Bonus = table.Column<string>(type: "text", nullable: true),
                    Imagem = table.Column<string>(type: "text", nullable: true),
                    Background = table.Column<string>(type: "text", nullable: true),
                    Carta1 = table.Column<string>(type: "text", nullable: true),
                    Carta2 = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Campeoes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "MensagensRecrutadores",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Nome = table.Column<string>(type: "character varying(150)", maxLength: 150, nullable: false),
                    Email = table.Column<string>(type: "character varying(150)", maxLength: 150, nullable: false),
                    Mensagem = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: false),
                    CriadoEm = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MensagensRecrutadores", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Modificadores",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Nome = table.Column<string>(type: "text", nullable: false),
                    Raridade = table.Column<string>(type: "text", nullable: true),
                    Descricao = table.Column<string>(type: "text", nullable: true),
                    Imagem = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Modificadores", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Reliquias",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Nome = table.Column<string>(type: "text", nullable: false),
                    Raridade = table.Column<string>(type: "text", nullable: true),
                    Descricao = table.Column<string>(type: "text", nullable: true),
                    Imagem = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Reliquias", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "TiposBuilds",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Descricao = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TiposBuilds", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Builds",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Descricao = table.Column<string>(type: "text", nullable: true),
                    CampeaoId = table.Column<int>(type: "integer", nullable: false),
                    TipoBuildId = table.Column<int>(type: "integer", nullable: false),
                    Reliquia1Id = table.Column<int>(type: "integer", nullable: false),
                    Reliquia2Id = table.Column<int>(type: "integer", nullable: false),
                    Reliquia3Id = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Builds", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Builds_Campeoes_CampeaoId",
                        column: x => x.CampeaoId,
                        principalTable: "Campeoes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Builds_Reliquias_Reliquia1Id",
                        column: x => x.Reliquia1Id,
                        principalTable: "Reliquias",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Builds_Reliquias_Reliquia2Id",
                        column: x => x.Reliquia2Id,
                        principalTable: "Reliquias",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Builds_Reliquias_Reliquia3Id",
                        column: x => x.Reliquia3Id,
                        principalTable: "Reliquias",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Builds_TiposBuilds_TipoBuildId",
                        column: x => x.TipoBuildId,
                        principalTable: "TiposBuilds",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Builds_CampeaoId",
                table: "Builds",
                column: "CampeaoId");

            migrationBuilder.CreateIndex(
                name: "IX_Builds_Reliquia1Id",
                table: "Builds",
                column: "Reliquia1Id");

            migrationBuilder.CreateIndex(
                name: "IX_Builds_Reliquia2Id",
                table: "Builds",
                column: "Reliquia2Id");

            migrationBuilder.CreateIndex(
                name: "IX_Builds_Reliquia3Id",
                table: "Builds",
                column: "Reliquia3Id");

            migrationBuilder.CreateIndex(
                name: "IX_Builds_TipoBuildId",
                table: "Builds",
                column: "TipoBuildId");

            migrationBuilder.CreateIndex(
                name: "IX_Campeoes_Slug",
                table: "Campeoes",
                column: "Slug",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Builds");

            migrationBuilder.DropTable(
                name: "MensagensRecrutadores");

            migrationBuilder.DropTable(
                name: "Modificadores");

            migrationBuilder.DropTable(
                name: "Campeoes");

            migrationBuilder.DropTable(
                name: "Reliquias");

            migrationBuilder.DropTable(
                name: "TiposBuilds");
        }
    }
}

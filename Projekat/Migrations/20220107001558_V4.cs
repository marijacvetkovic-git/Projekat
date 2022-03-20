using Microsoft.EntityFrameworkCore.Migrations;

namespace Projekat.Migrations
{
    public partial class V4 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BrojTel",
                table: "Dogadjaji");

            migrationBuilder.DropColumn(
                name: "ImeKlijenta",
                table: "Dogadjaji");

            migrationBuilder.DropColumn(
                name: "PrezimeKlijenta",
                table: "Dogadjaji");

            migrationBuilder.AddColumn<int>(
                name: "KlijenticId",
                table: "Dogadjaji",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Klijenti",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ImeKlijenta = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    PrezimeKlijenta = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    BrojTel = table.Column<string>(type: "nvarchar(13)", maxLength: 13, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Klijenti", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Dogadjaji_KlijenticId",
                table: "Dogadjaji",
                column: "KlijenticId");

            migrationBuilder.AddForeignKey(
                name: "FK_Dogadjaji_Klijenti_KlijenticId",
                table: "Dogadjaji",
                column: "KlijenticId",
                principalTable: "Klijenti",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Dogadjaji_Klijenti_KlijenticId",
                table: "Dogadjaji");

            migrationBuilder.DropTable(
                name: "Klijenti");

            migrationBuilder.DropIndex(
                name: "IX_Dogadjaji_KlijenticId",
                table: "Dogadjaji");

            migrationBuilder.DropColumn(
                name: "KlijenticId",
                table: "Dogadjaji");

            migrationBuilder.AddColumn<string>(
                name: "BrojTel",
                table: "Dogadjaji",
                type: "nvarchar(13)",
                maxLength: 13,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "ImeKlijenta",
                table: "Dogadjaji",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "PrezimeKlijenta",
                table: "Dogadjaji",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: false,
                defaultValue: "");
        }
    }
}

using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class RenameAndAddPhotoColumns : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "is_current",
                table: "photos",
                newName: "is_current_profile_photo");

            migrationBuilder.AddColumn<bool>(
                name: "is_default_avatar",
                table: "photos",
                type: "boolean",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "is_current_profile_photo",
                table: "photos",
                newName: "is_current");

            migrationBuilder.DropColumn(
                name: "is_default_avatar",
                table: "photos");
        }
    }
}

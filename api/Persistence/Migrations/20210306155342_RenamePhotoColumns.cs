using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class RenamePhotoColumns : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "is_default_avatar",
                table: "photos",
                newName: "is_current_user_photo");

            migrationBuilder.RenameColumn(
                name: "is_current_profile_photo",
                table: "photos",
                newName: "is_cloudinary_static_photo");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "is_current_user_photo",
                table: "photos",
                newName: "is_default_avatar");

            migrationBuilder.RenameColumn(
                name: "is_cloudinary_static_photo",
                table: "photos",
                newName: "is_current_profile_photo");
        }
    }
}

using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class RenameMessagesColumn : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "sequential_id",
                table: "messages",
                newName: "cursor_id");

            migrationBuilder.RenameIndex(
                name: "ix_messages_sequential_id",
                table: "messages",
                newName: "ix_messages_cursor_id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "cursor_id",
                table: "messages",
                newName: "sequential_id");

            migrationBuilder.RenameIndex(
                name: "ix_messages_cursor_id",
                table: "messages",
                newName: "ix_messages_sequential_id");
        }
    }
}

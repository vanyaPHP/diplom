<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('Report_chat', function (Blueprint $table) {
            $table->foreign(['admin_id'], 'admin_fk')->references(['admin_id'])->on('Admin')->onUpdate('NO ACTION')->onDelete('NO ACTION');
            $table->foreign(['user_id'], 'user_fk')->references(['user_id'])->on('User')->onUpdate('NO ACTION')->onDelete('NO ACTION');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('Report_chat', function (Blueprint $table) {
            $table->dropForeign('admin_fk');
            $table->dropForeign('user_fk');
        });
    }
};

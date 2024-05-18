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
        Schema::table('Buyer_status', function (Blueprint $table) {
            $table->foreign(['user_id'], 'user_id_fk')->references(['user_id'])->on('User')->onUpdate('NO ACTION')->onDelete('NO ACTION');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('Buyer_status', function (Blueprint $table) {
            $table->dropForeign('user_id_fk');
        });
    }
};

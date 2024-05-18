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
        Schema::table('Seller_status', function (Blueprint $table) {
            $table->foreign(['user_id'], 'seller_user_fk')->references(['user_id'])->on('User')->onUpdate('NO ACTION')->onDelete('NO ACTION');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('Seller_status', function (Blueprint $table) {
            $table->dropForeign('seller_user_fk');
        });
    }
};

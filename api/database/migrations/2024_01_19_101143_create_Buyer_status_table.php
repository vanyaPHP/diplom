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
        Schema::create('Buyer_status', function (Blueprint $table) {
            $table->bigInteger('buyer_status_id', true);
            $table->integer('rating');
            $table->bigInteger('user_id')->index('user_id_idx');
            $table->dateTime('last_change_datetime')->nullable();
            $table->integer('last_change_diff')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('Buyer_status');
    }
};

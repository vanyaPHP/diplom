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
        Schema::create('Bet', function (Blueprint $table) {
            $table->bigInteger('bet_id', true);
            $table->bigInteger('product_id')->index('product_id_idx');
            $table->bigInteger('buyer_id')->index('buyer_id_idx');
            $table->integer('price');
            $table->dateTime('made_datetime');
            $table->tinyInteger('bet_status_id')->nullable()->index('bet_status_id_idx');
            $table->dateTime('accepted_datetime')->nullable();
            $table->boolean('bet_won')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('Bet');
    }
};

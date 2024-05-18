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
        Schema::create('Credit_card', function (Blueprint $table) {
            $table->bigInteger('credit_card_id', true);
            $table->string('card_number', 16);
            $table->string('card_expiration_date', 4);
            $table->string('card_holder', 40);
            $table->string('card_cvv', 3);
            $table->bigInteger('owner_id')->index('owner_id_idx');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('Credit_card');
    }
};

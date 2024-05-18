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
        Schema::create('Address_details', function (Blueprint $table) {
            $table->bigInteger('address_details_id', true);
            $table->integer('city_id')->index('city_id_idx');
            $table->string('street', 45);
            $table->smallInteger('building');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('Address_details');
    }
};

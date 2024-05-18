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
        Schema::table('Address_details', function (Blueprint $table) {
            $table->foreign(['city_id'], 'city_id')->references(['city_id'])->on('City')->onUpdate('NO ACTION')->onDelete('NO ACTION');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('Address_details', function (Blueprint $table) {
            $table->dropForeign('city_id');
        });
    }
};

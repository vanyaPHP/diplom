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
        Schema::create('Product', function (Blueprint $table) {
            $table->bigInteger('product_id', true);
            $table->string('product_name', 45);
            $table->string('product_description', 150);
            $table->integer('product_start_price');
            $table->integer('category_id')->index('category_id_idx');
            $table->bigInteger('ownder_id')->index('owner_id_idx');
            $table->bigInteger('product_reviews');
            $table->bigInteger('address_details_id')->index('address_details_id_idx');
            $table->integer('immediate_buy_price');
            $table->boolean('is_sold');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('Product');
    }
};

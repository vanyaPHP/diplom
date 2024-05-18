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
        Schema::table('Bet', function (Blueprint $table) {
            $table->foreign(['bet_status_id'], 'bet_status_id')->references(['bet_status_id'])->on('Bet_status')->onUpdate('NO ACTION')->onDelete('NO ACTION');
            $table->foreign(['buyer_id'], 'buyer_id')->references(['user_id'])->on('User')->onUpdate('NO ACTION')->onDelete('NO ACTION');
            $table->foreign(['product_id'], 'product_id')->references(['product_id'])->on('Product')->onUpdate('NO ACTION')->onDelete('NO ACTION');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('Bet', function (Blueprint $table) {
            $table->dropForeign('bet_status_id');
            $table->dropForeign('buyer_id');
            $table->dropForeign('product_id');
        });
    }
};

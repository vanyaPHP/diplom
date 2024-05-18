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
        Schema::table('Closed_deal', function (Blueprint $table) {
            $table->foreign(['buyer_id'], 'buyer_fk')->references(['user_id'])->on('User')->onUpdate('NO ACTION')->onDelete('NO ACTION');
            $table->foreign(['deal_status_id'], 'deal_status_fk')->references(['deal_status_id'])->on('Deal_status')->onUpdate('NO ACTION')->onDelete('NO ACTION');
            $table->foreign(['product_id'], 'product_fk')->references(['product_id'])->on('Product')->onUpdate('NO ACTION')->onDelete('NO ACTION');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('Closed_deal', function (Blueprint $table) {
            $table->dropForeign('buyer_fk');
            $table->dropForeign('deal_status_fk');
            $table->dropForeign('product_fk');
        });
    }
};

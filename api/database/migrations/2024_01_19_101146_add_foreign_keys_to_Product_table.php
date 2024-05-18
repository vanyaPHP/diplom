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
        Schema::table('Product', function (Blueprint $table) {
            $table->foreign(['address_details_id'], 'address_details_id')->references(['address_details_id'])->on('Address_details')->onUpdate('NO ACTION')->onDelete('NO ACTION');
            $table->foreign(['category_id'], 'category_id')->references(['category_id'])->on('Category')->onUpdate('NO ACTION')->onDelete('NO ACTION');
            $table->foreign(['ownder_id'], 'owner_id_fk')->references(['user_id'])->on('User')->onUpdate('NO ACTION')->onDelete('NO ACTION');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('Product', function (Blueprint $table) {
            $table->dropForeign('address_details_id');
            $table->dropForeign('category_id');
            $table->dropForeign('owner_id_fk');
        });
    }
};

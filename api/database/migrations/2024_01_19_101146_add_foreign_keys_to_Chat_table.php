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
        Schema::table('Chat', function (Blueprint $table) {
            $table->foreign(['first_user_id'], 'user_one_fk')->references(['user_id'])->on('User')->onUpdate('NO ACTION')->onDelete('NO ACTION');
            $table->foreign(['second_user_id'], 'user_two_fk')->references(['user_id'])->on('User')->onUpdate('NO ACTION')->onDelete('NO ACTION');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('Chat', function (Blueprint $table) {
            $table->dropForeign('user_one_fk');
            $table->dropForeign('user_two_fk');
        });
    }
};

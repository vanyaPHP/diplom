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
        Schema::table('Message', function (Blueprint $table) {
            $table->foreign(['chat_id'], 'chat_fk')->references(['chat_id'])->on('Chat')->onUpdate('NO ACTION')->onDelete('NO ACTION');
            $table->foreign(['sender_id'], 'sender_fk')->references(['user_id'])->on('User')->onUpdate('NO ACTION')->onDelete('NO ACTION');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('Message', function (Blueprint $table) {
            $table->dropForeign('chat_fk');
            $table->dropForeign('sender_fk');
        });
    }
};

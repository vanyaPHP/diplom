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
        Schema::create('Chat', function (Blueprint $table) {
            $table->bigInteger('chat_id', true);
            $table->bigInteger('first_user_id')->unsigned();
            $table->bigInteger('second_user_id')->unsigned();
            $table->foreignId('first_user_id')->references('user_id')->on('User');
            $table->foreignId('second_user_id')->references('user_id')->on('User');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('Chat');
    }
};

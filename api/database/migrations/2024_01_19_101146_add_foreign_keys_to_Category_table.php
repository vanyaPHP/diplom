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
        Schema::table('Category', function (Blueprint $table) {
            $table->foreign(['parent_category_id'], 'parent_category_id')->references(['category_id'])->on('Category')->onUpdate('NO ACTION')->onDelete('NO ACTION');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('Category', function (Blueprint $table) {
            $table->dropForeign('parent_category_id');
        });
    }
};

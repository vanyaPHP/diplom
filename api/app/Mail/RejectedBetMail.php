<?php

namespace App\Mail;

use App\Models\Bet;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class RejectedBetMail extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(private Bet $bet) {}

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Ставка была отклонена',
        );
    }

    public function content(): Content
    {
        $user = $this->bet->buyer()->get()->first();
        $product = $this->bet->product()->get()->first();
        return new Content(
            view: 'emails.rejected',
            with: [
                'user' => $user->first_name . " " . $user->last_name,
                'product_name' => $product->product_name, 
                'link' => 'http://localhost:3000/profile/bets'
            ]
        );
    }

    public function attachments(): array
    {
        return [];
    }
}

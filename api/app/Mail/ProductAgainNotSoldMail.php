<?php

namespace App\Mail;

use App\Models\Bet;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class ProductAgainNotSoldMail extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(private Bet $bet) {}

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Товар снова в продаже'
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        $product = $this->bet->product()->get()->first();
        $user = $this->bet->buyer()->get()->first();

        return new Content(
            view: 'emails.again_not_sold',
            with: [
                'link' => 'http://localhost:3000/product-details/' . $product->product_id,
                'user' => $user->first_name . " " . $user->last_name,
                'product_name' => $product->product_name
            ]
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}

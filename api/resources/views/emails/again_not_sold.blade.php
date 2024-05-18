<!DOCTYPE html>
<html>
    <head>
        <title>Товар снова в продаже</title>
    </head>
    <body>
        <p>Уважаемый {{ $user }}, товар <b>{{ $product_name }}</b>, на который вы ставили, снова в продаже </p>
        <p>Товар вы можете просмотреть здесь: <a href="{{ $link }}">Перейти по ссылке</a></p>
    </body>
</html>
export default function Footer() {
    return (
        <footer className="bg-slate-800 text-white py-12">
            <div className="container mx-auto text-center">
                <p className="text-lg">
                    &copy; 2024 Belbay. Все права защищены.
                    Сайт является коммерческой собственностью и не подлежит копированию и распространению.
                </p>
                <p className="mt-4">Контакт: lavandos@gmail.com</p>
                <ul className="mt-4 list-none">
                    <li>Продажа товаров</li>
                    <li>Покупка товаров</li>
                    <li>Аукцион</li>
                    <li>Безопасные выплаты</li>
                </ul>
            </div>
        </footer>
    );
}